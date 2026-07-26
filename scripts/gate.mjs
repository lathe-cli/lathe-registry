// CI gate: generate every recipe with a real Lathe, run the admission rules
// against the built CLI, and refresh the Skill bundle. Same rules as
// `npm run preflight` — see docs/gate.md.
//
//   node scripts/gate.mjs                 # check every recipe
//   node scripts/gate.mjs --recipes a,b   # check a subset
//   node scripts/gate.mjs --write         # also refresh skills/ and .gate/ evidence
//
// Exits non-zero if any recipe fails a blocking rule.

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import yaml from "js-yaml";

import { evaluate } from "./gate/rules.mjs";
import {
  ToolchainError,
  binFingerprint,
  cleanup,
  generateAndProbe,
  latheVersion,
  makeWorkdir,
  resolveBin
} from "./gate/toolchain.mjs";

const root = process.cwd();
const recipesRoot = path.join(root, "recipes");
const evidenceRoot = path.join(root, ".gate");

function parseArgs(argv) {
  const options = { recipes: null, write: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--recipes") options.recipes = argv[++i].split(",").filter(Boolean);
    else if (argv[i] === "--write") options.write = true;
  }
  return options;
}

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function loadRecipe(name) {
  const dir = path.join(recipesRoot, name);
  const sourcesRaw = await fs.readFile(path.join(dir, "specs", "sources.yaml"), "utf8");
  const cliRaw = await fs.readFile(path.join(dir, "cli.yaml"), "utf8");
  const meta = yaml.load(await fs.readFile(path.join(dir, "lathe.yaml"), "utf8"));
  const overlayDir = path.join(dir, "overlays");
  return {
    name,
    dir,
    sourcesRaw,
    sourcesParsed: yaml.load(sourcesRaw),
    cliRaw,
    cli: yaml.load(cliRaw),
    meta,
    overlayDir: (await exists(overlayDir)) ? overlayDir : null
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const latheBin = await resolveBin("lathe", "LATHE_BIN", "go install github.com/lathe-cli/lathe/cmd/lathe@main");
  const toolchain = {
    latheVersion: await latheVersion(latheBin),
    latheFingerprint: await binFingerprint(latheBin)
  };

  const names =
    options.recipes ??
    (await fs.readdir(recipesRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();

  console.log(`gate: ${names.length} recipe(s) with lathe ${toolchain.latheVersion} (${toolchain.latheFingerprint})`);

  let failed = 0;
  for (const name of names) {
    const workdir = await makeWorkdir(`lathe-gate-${name}`);
    try {
      let recipe;
      try {
        recipe = await loadRecipe(name);
      } catch (error) {
        // A failing recipe, not a crash that hides every recipe after it.
        console.log(`  [FAIL] ${name}: incomplete recipe — ${error.message}`);
        failed += 1;
        continue;
      }
      const cliName = recipe.meta?.cli_name ?? recipe.cli?.cli?.name ?? name;
      const probe = await generateAndProbe({
        latheBin,
        cliName,
        cliYaml: recipe.cliRaw,
        sourcesYaml: recipe.sourcesRaw,
        intent: recipe.meta?.smoke?.intent,
        overlayDir: recipe.overlayDir,
        workdir
      });
      if (probe.failure?.kind === "runtime") {
        throw new ToolchainError(probe.failure.message);
      }

      const evaluation = evaluate({
        mode: "gate",
        name,
        sources: { raw: recipe.sourcesRaw, parsed: recipe.sourcesParsed },
        cli: recipe.cli,
        meta: recipe.meta,
        probe
      });
      if (probe.failure) {
        evaluation.verdict = "NO-GO";
        evaluation.blocking.push({
          id: "GEN",
          title: "generation",
          status: "fail",
          detail: `${probe.failure.kind}: ${probe.failure.message}`
        });
      }

      const marker = evaluation.verdict === "GO" ? "ok  " : "FAIL";
      console.log(`  [${marker}] ${name}: ${probe.commandCount ?? 0} commands, ${evaluation.warnings.length} warning(s)`);
      for (const rule of evaluation.blocking) console.log(`         ${rule.id} ${rule.title}: ${rule.detail}`);
      for (const rule of evaluation.warnings) console.log(`         (warn) ${rule.id} ${rule.title}: ${rule.detail}`);

      if (evaluation.verdict !== "GO") failed += 1;

      if (options.write && evaluation.verdict === "GO" && probe.generated) {
        // The one artifact the site cannot rebuild without Lathe.
        const target = path.join(root, "skills", cliName);
        await fs.rm(target, { recursive: true, force: true });
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.cp(probe.skillDir, target, { recursive: true });

        await fs.mkdir(evidenceRoot, { recursive: true });
        await fs.writeFile(
          path.join(evidenceRoot, `${name}.json`),
          `${JSON.stringify(
            {
              recipe: name,
              cli_name: cliName,
              verdict: evaluation.verdict,
              // What the binary is, and what CI asked for: they differ on a
              // moving ref like `main`.
              lathe_version: toolchain.latheVersion,
              lathe_ref: process.env.LATHE_REF ?? "local",
              lathe_fingerprint: toolchain.latheFingerprint,
              generated_at: new Date().toISOString(),
              command_count: probe.commandCount,
              group_count: probe.groups,
              derived_names: probe.synthesizedCount,
              collision_suffixed: probe.collisionSuffixed,
              warnings: evaluation.warnings.map((rule) => rule.id)
            },
            null,
            2
          )}\n`
        );
      }
    } catch (error) {
      if (error instanceof ToolchainError) {
        console.error(`\ntoolchain error on ${name}: ${error.message}`);
        if (error.hint) console.error(`hint: ${error.hint}`);
        process.exitCode = 3;
        return;
      }
      throw error;
    } finally {
      await cleanup(workdir, false);
    }
  }

  if (failed > 0) {
    console.error(`\ngate: ${failed} recipe(s) failed a blocking rule — see docs/gate.md`);
    process.exitCode = 1;
  } else {
    console.log("\ngate: all recipes pass");
  }
}

await main();
