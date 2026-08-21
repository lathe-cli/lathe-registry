import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import fg from "fast-glob";
import yaml from "js-yaml";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = process.cwd();
const recipesRoot = path.join(root, "recipes");
const siteDataPath = path.join(root, "site", "src", "data", "registry.json");
const publicDataPath = path.join(root, "site", "public", "data", "registry.json");
const publicIndexPath = path.join(root, "site", "public", "index.json");
const publicSchemaPath = path.join(root, "site", "public", "schema", "index.schema.json");
const downloadsRoot = path.join(root, "site", "public", "downloads");
const latheSchema = JSON.parse(await fs.readFile(path.join(root, "schema", "lathe.schema.json"), "utf8"));
const indexSchema = JSON.parse(await fs.readFile(path.join(root, "schema", "index.schema.json"), "utf8"));
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validateLathe = ajv.compile(latheSchema);
const validateIndex = ajv.compile(indexSchema);

function reproducibleDate() {
  const epoch = process.env.SOURCE_DATE_EPOCH;
  if (epoch === undefined || epoch === "") return new Date(0);

  const seconds = Number(epoch);
  if (!Number.isInteger(seconds) || seconds < 0) {
    throw new Error("SOURCE_DATE_EPOCH must be a non-negative integer");
  }

  return new Date(seconds * 1000);
}

const generatedDate = reproducibleDate();
const generatedAt = generatedDate.toISOString();
await fs.mkdir(downloadsRoot, { recursive: true });

function loadYaml(text, filePath) {
  try {
    return yaml.load(text);
  } catch (error) {
    throw new Error(`failed to parse ${filePath}: ${error.message}`);
  }
}

async function readYaml(filePath) {
  return loadYaml(await fs.readFile(filePath, "utf8"), filePath);
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function languageFor(filePath) {
  if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) return "yaml";
  if (filePath.endsWith(".json")) return "json";
  if (filePath.endsWith(".md")) return "markdown";
  if (filePath.endsWith(".toml")) return "toml";
  return "text";
}

async function collectFiles(patterns) {
  const entries = await fg(patterns, {
    cwd: root,
    dot: true,
    onlyFiles: true,
    ignore: ["**/.DS_Store", "**/node_modules/**", "site/dist/**"]
  });

  return Promise.all(
    entries.sort().map(async (relativePath) => ({
      path: relativePath,
      name: path.basename(relativePath),
      language: languageFor(relativePath),
      content: await fs.readFile(path.join(root, relativePath), "utf8")
    }))
  );
}

function sourceRefsFrom(specs) {
  return Object.entries(specs.sources ?? {}).map(([name, source]) => ({
    name,
    display_name: source.display_name ?? name,
    backend: source.backend ?? "",
    repo_url: source.repo_url ?? "",
    pinned_tag: source.pinned_tag ?? "",
    files: source[source.backend]?.files ?? []
  }));
}

async function readGateEvidence(recipeName) {
  try {
    return JSON.parse(await fs.readFile(path.join(root, ".gate", `${recipeName}.json`), "utf8"));
  } catch {
    return null;
  }
}

async function buildRecipe(recipeName) {
  const recipePath = path.join(recipesRoot, recipeName);
  const lathePath = path.join(recipePath, "lathe.yaml");
  const cliPath = path.join(recipePath, "cli.yaml");
  const sourcesPath = path.join(recipePath, "specs", "sources.yaml");
  const readmePath = path.join(recipePath, "README.md");
  const lathe = await readYaml(lathePath);

  if (!validateLathe(lathe)) {
    throw new Error(`invalid ${path.relative(root, lathePath)}: ${ajv.errorsText(validateLathe.errors)}`);
  }

  const cli = await readYaml(cliPath);
  const specs = await readYaml(sourcesPath);
  const cliName = lathe.cli_name || cli?.cli?.name;
  const sourceRefs = sourceRefsFrom(specs);
  const buildPath = path.join(root, "builds", `${lathe.name}.json`);
  const catalogPath = path.join(root, "catalogs", `${lathe.name}.json`);
  const skillPath = path.join(root, "skills", cliName);
  const hasSkill = await exists(skillPath);
  const hasCatalog = await exists(catalogPath);
  await fs.rm(path.join(downloadsRoot, `${lathe.name}-skill.tar.gz`), { force: true });
  await fs.rm(path.join(downloadsRoot, `${cliName}-${process.platform}-${process.arch}`), { force: true });

  // A placeholder version and a 1970 timestamp on a public page are worse than
  // none; without gate evidence the record says so rather than inventing one.
  const gateEvidence = await readGateEvidence(lathe.name);
  const cliArtifacts = gateEvidence?.cli_artifacts ?? [];

  const build = {
    schema_version: 1,
    recipe: lathe.name,
    cli_name: cliName,
    generated_at: gateEvidence?.generated_at ?? generatedAt,
    lathe_version: gateEvidence?.lathe_version ?? "not-recorded",
    gate: gateEvidence
      ? {
          verdict: gateEvidence.verdict,
          generated_at: gateEvidence.generated_at,
          lathe_version: gateEvidence.lathe_version,
          command_count: gateEvidence.command_count,
          group_count: gateEvidence.group_count,
          skill_included: gateEvidence.skill_included,
          warnings: gateEvidence.warnings ?? []
        }
      : null,
    source_refs: sourceRefs,
    outputs: {
      catalog: hasCatalog ? `catalogs/${lathe.name}.json` : null,
      skill: hasSkill ? `skills/${cliName}` : null,
      cli_artifacts: cliArtifacts
    }
  };

  await fs.mkdir(path.dirname(buildPath), { recursive: true });
  await fs.writeFile(buildPath, `${JSON.stringify(build, null, 2)}\n`);

  const filePatterns = [
    `recipes/${recipeName}/**/*`,
    `builds/${lathe.name}.json`
  ];

  if (hasCatalog) filePatterns.push(`catalogs/${lathe.name}.json`);
  if (hasSkill) filePatterns.push(`skills/${cliName}/**/*`);

  const files = await collectFiles(filePatterns);
  const readmeMarkdown = await fs.readFile(readmePath, "utf8");

  return {
    name: lathe.name,
    display_name: lathe.display_name,
    cli_name: cliName,
    category: lathe.category,
    homepage: lathe.homepage ?? "",
    description: lathe.description,
    maintainers: lathe.maintainers,
    auth: lathe.auth,
    smoke: lathe.smoke,
    recipe_path: `recipes/${recipeName}`,
    readme_path: `recipes/${recipeName}/README.md`,
    catalog_path: hasCatalog ? `catalogs/${lathe.name}.json` : "",
    skill_path: hasSkill ? `skills/${cliName}` : "",
    build_path: `builds/${lathe.name}.json`,
    generated_at: build.generated_at,
    lathe_version: build.lathe_version,
    gate: build.gate,
    outputs: build.outputs,
    source_refs: sourceRefs,
    artifacts: cliArtifacts.map((artifact) => ({
      kind: "cli",
      label: "Download CLI",
      ...artifact
    })),
    readme_markdown: readmeMarkdown,
    files
  };
}

const recipeDirs = (await fs.readdir(recipesRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const recipes = await Promise.all(recipeDirs.map(buildRecipe));
const indexGeneratedAt = recipes
  .map((recipe) => recipe.generated_at)
  .sort()
  .at(-1) ?? generatedAt;
const index = {
  $schema: "https://lathe-cli.github.io/lathe-registry/schema/index.schema.json",
  schema_version: 1,
  generated_at: indexGeneratedAt,
  recipes: recipes.map((recipe) => ({
    name: recipe.name,
    display_name: recipe.display_name,
    cli_name: recipe.cli_name,
    category: recipe.category,
    description: recipe.description,
    auth: recipe.auth,
    gate: recipe.gate,
    artifacts: recipe.artifacts.map((artifact) => ({
      os: artifact.os,
      arch: artifact.arch,
      format: artifact.format,
      binary: artifact.binary,
      url: artifact.path,
      size: artifact.size,
      sha256: artifact.sha256
    })),
    source_refs: recipe.source_refs
  }))
};

if (!validateIndex(index)) {
  throw new Error(`invalid index: ${ajv.errorsText(validateIndex.errors)}`);
}

const siteData = {
  ...index,
  recipes
};

await fs.mkdir(path.dirname(siteDataPath), { recursive: true });
await fs.mkdir(path.dirname(publicDataPath), { recursive: true });
await fs.mkdir(path.dirname(publicSchemaPath), { recursive: true });
await fs.writeFile(path.join(root, "index.json"), `${JSON.stringify(index, null, 2)}\n`);
await fs.writeFile(publicIndexPath, `${JSON.stringify(index, null, 2)}\n`);
await fs.copyFile(path.join(root, "schema", "index.schema.json"), publicSchemaPath);
await fs.writeFile(siteDataPath, `${JSON.stringify(siteData, null, 2)}\n`);
await fs.writeFile(publicDataPath, `${JSON.stringify(siteData, null, 2)}\n`);
console.log(`generated ${recipes.length} recipe page${recipes.length === 1 ? "" : "s"}`);
