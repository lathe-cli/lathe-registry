// I/O side of the gate: clone, scan, generate a throwaway Lathe project, build
// it, probe the CLI. Verdict logic lives in rules.mjs.

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import crypto from "node:crypto";
import yaml from "js-yaml";

import { hasCJK, isSynthesizedName } from "./rules.mjs";

// A stale Lathe aborts on the first command-name collision. That is a toolchain
// problem, never a verdict on the candidate.
const STALE_LATHE_SIGNATURE = /conflicts between operationId=/;

export class ToolchainError extends Error {
  constructor(message, hint) {
    super(message);
    this.name = "ToolchainError";
    this.hint = hint;
  }
}

export function run(command, args, options = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: { ...process.env, ...options.env },
      stdio: ["ignore", "pipe", "pipe"]
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", (error) => resolve({ code: -1, stdout, stderr: String(error.message) }));
    child.on("close", (code) => resolve({ code: code ?? -1, stdout, stderr }));
  });
}

// Scanned directly rather than shelling out: `command` is a shell builtin with
// no binary on most Linux distributions, so spawning it works on macOS and
// fails everywhere else.
async function which(bin) {
  for (const dir of (process.env.PATH ?? "").split(path.delimiter)) {
    if (!dir) continue;
    const candidate = path.join(dir, bin);
    try {
      await fs.access(candidate, fsConstants.X_OK);
      return candidate;
    } catch {
      continue;
    }
  }
  return null;
}

export async function resolveBin(name, envVar, hint) {
  const override = process.env[envVar];
  if (override) {
    try {
      await fs.access(override);
      return override;
    } catch {
      throw new ToolchainError(`${envVar}=${override} is not accessible`, hint);
    }
  }
  const found = await which(name);
  if (!found) throw new ToolchainError(`${name} not found on PATH (set ${envVar})`, hint);
  return found;
}

export async function binFingerprint(binPath) {
  const buffer = await fs.readFile(binPath);
  return `sha256:${crypto.createHash("sha256").update(buffer).digest("hex").slice(0, 16)}`;
}

export async function latheVersion(latheBin) {
  const result = await run(latheBin, ["version"]);
  return result.stdout.trim() || "unknown";
}

export async function makeWorkdir(prefix) {
  return fs.mkdtemp(path.join(os.tmpdir(), `${prefix}-`));
}

// Blobless shallow clone: enough for lathe-scan to read specs and resolve HEAD.
export async function cloneCandidate(repoUrl, workdir) {
  const target = path.join(workdir, "src");
  const result = await run("git", ["clone", "--filter=blob:none", "--depth", "1", "--quiet", repoUrl, target]);
  if (result.code !== 0) throw new ToolchainError(`git clone failed: ${result.stderr.trim()}`);
  return target;
}

export async function scanRepo(scanBin, repoDir, workdir) {
  const out = path.join(workdir, "scan");
  const result = await run(scanBin, [repoDir, "--out", out, "--force"]);
  if (result.code === 2) {
    return { report: null, sourcesRaw: null, sourcesParsed: null, message: "lathe-scan found no usable source" };
  }
  if (result.code !== 0) throw new ToolchainError(`lathe-scan failed (exit ${result.code}): ${result.stderr.trim()}`);

  const sourcesRaw = await fs.readFile(path.join(out, "sources.yaml"), "utf8");
  const report = JSON.parse(await fs.readFile(path.join(out, "report.json"), "utf8"));
  return { report, sourcesRaw, sourcesParsed: yaml.load(sourcesRaw), message: null };
}

export async function generateAndProbe({ latheBin, cliName, cliYaml, sourcesYaml, intent, overlayDir, workdir }) {
  const projectDir = path.join(workdir, "project");
  const init = await run(latheBin, [
    "init",
    projectDir,
    "-language",
    "go",
    "-cli-name",
    cliName,
    "-go-module",
    `example.com/lathe-registry-gate/${cliName}`,
    "-license",
    "none"
  ]);
  if (init.code !== 0) throw new ToolchainError(`lathe init failed: ${init.stderr.trim() || init.stdout.trim()}`);

  // Root cli.yaml drives codegen; cmd/<cli>/cli.yaml is embedded and drives
  // runtime auth. A recipe's cli.yaml must land in both.
  await fs.writeFile(path.join(projectDir, "cli.yaml"), cliYaml);
  await fs.writeFile(path.join(projectDir, "cmd", cliName, "cli.yaml"), cliYaml);
  await fs.writeFile(path.join(projectDir, "specs", "sources.yaml"), sourcesYaml);

  // Without overlays this measures a CLI the recipe does not ship.
  const bootstrapArgs = ["bootstrap", "-sources", "specs/sources.yaml", "-skill-root", "skills"];
  if (overlayDir) {
    await fs.cp(overlayDir, path.join(projectDir, "overlays"), { recursive: true });
    bootstrapArgs.push("-overlay", "overlays");
  }

  const bootstrap = await run(latheBin, bootstrapArgs, { cwd: projectDir });
  if (bootstrap.code !== 0) {
    const output = `${bootstrap.stdout}\n${bootstrap.stderr}`;
    if (STALE_LATHE_SIGNATURE.test(output)) {
      throw new ToolchainError(
        "lathe aborted on a command-name collision — this binary predates the codegen collision fix",
        "rebuild lathe from latest main (go build ./cmd/lathe) and set LATHE_BIN"
      );
    }
    return {
      generated: false,
      failure: { kind: "generation", message: output.trim().split("\n").slice(-4).join("\n") },
      projectDir
    };
  }

  const build = await run("go", ["build", "-o", path.join(projectDir, "cli-bin"), `./cmd/${cliName}`], {
    cwd: projectDir
  });
  if (build.code !== 0) {
    return {
      generated: false,
      failure: { kind: "build", message: build.stderr.trim().split("\n").slice(0, 6).join("\n") },
      projectDir
    };
  }

  const cliBin = path.join(projectDir, "cli-bin");
  const probe = { generated: true, failure: null, projectDir, cliBin, skillDir: path.join(projectDir, "skills", cliName) };

  const catalogRun = await run(cliBin, ["commands", "--json"]);
  const catalog = catalogRun.code === 0 ? JSON.parse(catalogRun.stdout) : { commands: [] };
  const operations = (catalog.commands ?? []).filter((command) => command.kind === "operation");
  const synthesized = operations.filter(isSynthesizedName);

  probe.commandCount = operations.length;
  probe.synthesizedCount = synthesized.length;
  probe.synthesizedSamples = synthesized.slice(0, 3).map((command) => command.use);
  probe.cjkSummaries = operations.filter((command) => hasCJK(command.summary)).length;
  const suffixed = operations.filter((command) => /-\d+$/.test(String(command.use ?? "")));
  probe.collisionSuffixed = suffixed.length;
  probe.collisionSamples = suffixed.slice(0, 3).map((command) => command.use);
  probe.groups = [...new Set(operations.map((command) => command.group).filter(Boolean))].length;

  if (intent) {
    const searchRun = await run(cliBin, ["search", intent, "--json"]);
    const hits = searchRun.code === 0 ? JSON.parse(searchRun.stdout) : [];
    probe.searchTop = (Array.isArray(hits) ? hits : []).slice(0, 5).map((hit) => ({
      score: hit.score,
      use: hit.command?.use,
      operationId: hit.command?.operation_id,
      method: hit.command?.http?.method,
      path: hit.command?.http?.path_template
    }));
  } else {
    probe.searchTop = null;
  }

  // --dry-run is mandatory: the real install writes into the user's agent dirs.
  const skill = await run(cliBin, ["skill", "install", "--scope", "user", "--agent", "codex", "--dry-run", "--yes"]);
  probe.skillInstallOk = skill.code === 0;
  const auth = await run(cliBin, ["auth", "--help"]);
  probe.authHelpOk = auth.code === 0;

  return probe;
}

export async function cleanup(workdir, keep) {
  if (keep) return;
  await fs.rm(workdir, { recursive: true, force: true });
}
