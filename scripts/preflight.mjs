// Candidate triage: is this repo worth turning into a recipe?
//
//   node scripts/preflight.mjs <repo-path-or-url> [--intent "list dashboards"]
//   node scripts/preflight.mjs --recipe <name>
//
// Runs the same rules the CI gate runs, so a candidate that passes here cannot
// be rejected later by a different bar. Exits non-zero on NO-GO.

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import yaml from "js-yaml";

import { evaluate, HUMAN_QUESTIONS } from "./gate/rules.mjs";
import {
  ToolchainError,
  binFingerprint,
  cleanup,
  cloneCandidate,
  generateAndProbe,
  latheVersion,
  makeWorkdir,
  resolveBin,
  scanRepo
} from "./gate/toolchain.mjs";

const root = process.cwd();

function parseArgs(argv) {
  const options = { keep: false, json: false, target: null, recipe: null, intent: null, name: null, emit: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--keep") options.keep = true;
    else if (arg === "--json") options.json = true;
    else if (arg === "--recipe") options.recipe = argv[++i];
    else if (arg === "--intent") options.intent = argv[++i];
    else if (arg === "--name") options.name = argv[++i];
    else if (arg === "--emit") options.emit = argv[++i];
    else if (!arg.startsWith("-")) options.target = arg;
  }
  return options;
}

function goSafe(name) {
  const safe = String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return /^[a-z]/.test(safe) ? safe : `s_${safe}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

// lathe-scan emits neither Go-safe keys nor the dated pin comment G2 wants.
function renderSources(parsed) {
  const lines = ["sources:"];
  for (const [rawName, source] of Object.entries(parsed.sources ?? {})) {
    const name = goSafe(rawName);
    lines.push(`  ${name}:`);
    if (source.display_name) lines.push(`    display_name: ${source.display_name}`);
    if (source.default_hostname) lines.push(`    default_hostname: ${source.default_hostname}`);
    if (source.repo_url) {
      lines.push(`    repo_url: ${source.repo_url}`);
      lines.push(`    # pinned to HEAD as of ${today()}; bump when upgrading`);
      lines.push(`    pinned_tag: ${source.pinned_tag}`);
    } else if (source.local_path) {
      lines.push(`    local_path: ${source.local_path}`);
    }
    lines.push(`    backend: ${source.backend}`);
    for (const key of ["openapi3", "swagger", "graphql", "proto"]) {
      if (!source[key]) continue;
      lines.push(`    ${key}:`);
      for (const [field, value] of Object.entries(source[key])) {
        if (Array.isArray(value)) {
          lines.push(`      ${field}:`);
          for (const item of value) lines.push(`        - ${typeof item === "string" ? item : JSON.stringify(item)}`);
        } else if (typeof value === "object" && value !== null) {
          lines.push(`      ${field}: ${JSON.stringify(value)}`);
        } else {
          lines.push(`      ${field}: ${value}`);
        }
      }
    }
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

function draftCliYaml(cliName, short) {
  return `cli:
  name: ${cliName}
  short: "${short}"

skill:
  bundle: true

# TODO(H2): an authenticated endpoint that proves the token works.
# Delete this block only if the API genuinely needs no auth (then set
# auth.type: none in lathe.yaml).
# auth:
#   validate:
#     method: GET
#     path: /api/…/me
#     display:
#       username_field: email
#       fallback_field: name
`;
}

function draftLatheYaml({ name, cliName, homepage, intent }) {
  return `name: ${name}
display_name: TODO(H3)
cli_name: ${cliName}
category: TODO(H3)
homepage: ${homepage ?? "TODO"}
description: TODO(H3) — written for a human, not copied from the spec title.
maintainers:
  - github: TODO
auth:
  type: TODO(H2) # none | bearer | custom
  notes: TODO(H2) — how to obtain a token and which header carries it.
smoke:
  intent: ${intent ?? "TODO — a real intent an agent would search for"}
`;
}

function draftReadme(name, repoUrl) {
  return `# ${name}

Generated CLI and agent Skill for ${repoUrl ?? "TODO"}.

## Modules

TODO — what the CLI covers.

## Auth

TODO(H2) — how to get a token, and what \`${name} auth status\` validates against.

## Agent workflow

\`\`\`
${name} search "<intent>" --json
${name} commands show <path...> --json
${name} auth status --hostname <host>
\`\`\`
`;
}

function statusMark(status) {
  return { pass: "PASS", fail: "FAIL", warn: "WARN", skip: "SKIP" }[status] ?? status.toUpperCase();
}

function printReport(report) {
  const { subject, verdict, evaluation, probe, toolchain } = report;
  console.log(`\npreflight: ${subject}`);
  console.log(`toolchain: lathe ${toolchain.latheVersion} (${toolchain.latheFingerprint})`);
  if (probe?.generated) {
    console.log(
      `generated : ${probe.commandCount} commands in ${probe.groups} groups, ` +
        `${probe.synthesizedCount} synthesized names`
    );
  }
  console.log("");
  for (const rule of evaluation.rules) {
    console.log(`  [${statusMark(rule.status).padEnd(4)}] ${rule.id} ${rule.title}`);
    if (rule.status !== "pass") console.log(`         ${rule.detail}`);
  }
  const extra = evaluation.warnings.filter((warning) => warning.id.startsWith("W"));
  if (extra.length > 0) {
    console.log("");
    for (const warning of extra) {
      console.log(`  [WARN] ${warning.id} ${warning.title}`);
      console.log(`         ${warning.detail}`);
    }
  }
  console.log(`\n  VERDICT: ${verdict}`);
  if (verdict === "GO") {
    console.log("\n  Still requires a human answer in the PR body:");
    for (const question of HUMAN_QUESTIONS) console.log(`    ${question.id}. ${question.question}`);
  }
  if (report.emitted) console.log(`\n  recipe skeleton: ${report.emitted}`);
  console.log("");
}

async function readRecipe(name) {
  const dir = path.join(root, "recipes", name);
  const sourcesRaw = await fs.readFile(path.join(dir, "specs", "sources.yaml"), "utf8");
  const cliRaw = await fs.readFile(path.join(dir, "cli.yaml"), "utf8");
  let meta = null;
  try {
    meta = yaml.load(await fs.readFile(path.join(dir, "lathe.yaml"), "utf8"));
  } catch {
    meta = null;
  }
  const overlayDir = path.join(dir, "overlays");
  let hasOverlays = false;
  try {
    hasOverlays = (await fs.readdir(overlayDir)).length > 0;
  } catch {
    hasOverlays = false;
  }
  return {
    dir,
    sourcesRaw,
    sourcesParsed: yaml.load(sourcesRaw),
    cliRaw,
    cli: yaml.load(cliRaw),
    meta,
    overlayDir: hasOverlays ? overlayDir : null
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options.target && !options.recipe) {
    console.error("usage: node scripts/preflight.mjs <repo-path-or-url> [--intent \"…\"] | --recipe <name>");
    process.exit(2);
  }

  const latheBin = await resolveBin("lathe", "LATHE_BIN", "build it from the lathe repo: go build -o bin/lathe ./cmd/lathe");
  const toolchain = {
    latheVersion: await latheVersion(latheBin),
    latheFingerprint: await binFingerprint(latheBin)
  };
  const workdir = await makeWorkdir("lathe-preflight");

  try {
    let input;
    let subject;
    let emitted = null;

    if (options.recipe) {
      const recipe = await readRecipe(options.recipe);
      subject = `recipes/${options.recipe}`;
      const cliName = recipe.cli?.cli?.name ?? options.recipe;
      const probe = await generateAndProbe({
        latheBin,
        cliName,
        cliYaml: recipe.cliRaw,
        sourcesYaml: recipe.sourcesRaw,
        intent: options.intent ?? recipe.meta?.smoke?.intent,
        overlayDir: recipe.overlayDir,
        workdir
      });
      input = {
        mode: "gate",
        name: options.recipe,
        sources: { raw: recipe.sourcesRaw, parsed: recipe.sourcesParsed },
        cli: recipe.cli,
        meta: recipe.meta,
        intent: options.intent,
        probe
      };
    } else {
      const scanBin = await resolveBin(
        "lathe-scan",
        "LATHE_SCAN_BIN",
        "build it from the lathe-scan repo: go build -o bin/lathe-scan ."
      );
      const isUrl = /^(https?:|git@)/.test(options.target);
      subject = options.target;
      const repoDir = isUrl ? await cloneCandidate(options.target, workdir) : path.resolve(options.target);
      const scan = await scanRepo(scanBin, repoDir, workdir);
      if (!scan.sourcesParsed) throw new ToolchainError(scan.message ?? "no sources found");

      const name = options.name ?? goSafe(path.basename(repoDir)).replace(/_/g, "-");
      const cliName = name;
      const sourcesYaml = renderSources(scan.sourcesParsed);
      const cliYaml = draftCliYaml(cliName, `Command-line tool for ${name}`);
      const probe = await generateAndProbe({
        latheBin,
        cliName,
        cliYaml,
        sourcesYaml,
        intent: options.intent,
        workdir
      });

      input = {
        mode: "preflight",
        name,
        sources: { raw: scan.sourcesRaw, parsed: scan.sourcesParsed },
        cli: yaml.load(cliYaml),
        meta: null,
        intent: options.intent,
        probe
      };

      const emitDir = options.emit ?? path.join(root, ".local", "preflight", name);
      await fs.mkdir(path.join(emitDir, "specs"), { recursive: true });
      await fs.writeFile(path.join(emitDir, "specs", "sources.yaml"), sourcesYaml);
      await fs.writeFile(path.join(emitDir, "cli.yaml"), cliYaml);
      const firstSource = Object.values(scan.sourcesParsed.sources ?? {})[0] ?? {};
      await fs.writeFile(
        path.join(emitDir, "lathe.yaml"),
        draftLatheYaml({ name, cliName, homepage: firstSource.repo_url, intent: options.intent })
      );
      await fs.writeFile(path.join(emitDir, "README.md"), draftReadme(cliName, firstSource.repo_url));
      emitted = path.relative(root, emitDir);
    }

    const evaluation = evaluate(input);
    if (input.probe?.failure) {
      evaluation.blocking.push({
        id: "GEN",
        title: "generation",
        status: "fail",
        detail: `${input.probe.failure.kind}: ${input.probe.failure.message}`
      });
      evaluation.rules.unshift(evaluation.blocking.at(-1));
      evaluation.verdict = "NO-GO";
    }

    const report = { subject, verdict: evaluation.verdict, evaluation, probe: input.probe, toolchain, emitted };
    if (options.json) console.log(JSON.stringify(report, null, 2));
    else printReport(report);
    process.exitCode = evaluation.verdict === "GO" ? 0 : 1;
  } catch (error) {
    if (error instanceof ToolchainError) {
      console.error(`\ntoolchain error: ${error.message}`);
      if (error.hint) console.error(`hint: ${error.hint}`);
      console.error("(this is a toolchain problem, not a verdict on the candidate)\n");
      process.exitCode = 3;
      return;
    }
    throw error;
  } finally {
    await cleanup(workdir, options.keep);
  }
}

await main();
