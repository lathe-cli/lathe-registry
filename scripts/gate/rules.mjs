// Recipe admission rules, shared by `preflight` and the CI gate so a candidate
// that passes one cannot be rejected by the other. Thresholds are calibrated in
// docs/gate.md.

export const COMMAND_FLOOR = 20;
export const SYNTH_NAME_CEILING = 0.2;

// Spec files living under these directories describe a test, not the product.
const FORBIDDEN_DIR_SEGMENTS = new Set([
  "test",
  "tests",
  "__tests__",
  "testdata",
  "fixture",
  "fixtures",
  "sample",
  "samples",
  "example",
  "examples",
  "integration",
  "third_party",
  "thirdparty",
  "vendor",
  "node_modules"
]);

const FORBIDDEN_FILE_STEMS = new Set(["test", "sample", "example", "fixture", "demo"]);

const GO_IDENTIFIER = /^[a-z][a-z0-9_]*$/;
const SHA40 = /^[0-9a-f]{40}$/;
const RELEASE_TAG = /^v?\d+(?:\.\d+)*(?:[-.][0-9A-Za-z.-]+)?$/;
const PIN_DATE = /as of (\d{4}-\d{2}-\d{2})/;
const CJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af]/;

function result(id, title, status, detail) {
  return { id, title, status, detail };
}

function sourceEntries(input) {
  return Object.entries(input.sources?.parsed?.sources ?? {});
}

function specFilesOf(source) {
  const block = source.openapi3 ?? source.swagger ?? source.graphql ?? source.proto ?? {};
  const files = block.files ?? (block.schema ? [block.schema] : []) ?? [];
  const entries = block.entries ?? [];
  return [...files, ...entries];
}

// Defects a human fixes while authoring (kebab source names, a missing pin
// comment) warn at preflight and fail at the gate, where the recipe is finished.
function severity(mode, gateStatus, preflightStatus) {
  return mode === "gate" ? gateStatus : preflightStatus;
}

function g1NativeOrigin(input) {
  const sources = sourceEntries(input);
  if (sources.length === 0) return result("G1", "native spec origin", "fail", "sources.yaml declares no sources");

  const local = sources.filter(([, source]) => !source.repo_url);
  if (local.length > 0) {
    return result(
      "G1",
      "native spec origin",
      "fail",
      `not pinnable upstream specs (no repo_url): ${local.map(([name]) => name).join(", ")}. ` +
        "L2-extracted / bundled / local_path drafts cannot be a recipe."
    );
  }
  return result("G1", "native spec origin", "pass", `${sources.length} source(s), all repo_url`);
}

function g2ImmutablePin(input) {
  const sources = sourceEntries(input);
  const bad = [];
  for (const [name, source] of sources) {
    const tag = String(source.pinned_tag ?? "");
    if (!tag) bad.push(`${name}: no pinned_tag`);
    else if (!SHA40.test(tag) && !RELEASE_TAG.test(tag)) bad.push(`${name}: "${tag}" is not a SHA or release tag`);
  }
  if (bad.length > 0) return result("G2", "immutable pin", "fail", bad.join("; "));

  const raw = input.sources?.raw ?? "";
  const pinLines = raw.split("\n").filter((line) => /^\s*pinned_tag:/.test(line)).length;
  const dated = datedPinCount(raw);
  if (dated < pinLines) {
    return result(
      "G2",
      "immutable pin",
      severity(input.mode, "fail", "warn"),
      `${pinLines - dated} pinned_tag(s) lack an "# pinned to ... as of YYYY-MM-DD" comment ` +
        "(the comment is what tells a future maintainer when to re-pin)"
    );
  }
  return result("G2", "immutable pin", "pass", `${pinLines} pin(s), all dated`);
}

function datedPinCount(raw) {
  const lines = raw.split("\n");
  let dated = 0;
  for (let i = 0; i < lines.length; i += 1) {
    if (!/^\s*pinned_tag:/.test(lines[i])) continue;
    for (let back = 1; back <= 3 && i - back >= 0; back += 1) {
      if (PIN_DATE.test(lines[i - back])) {
        dated += 1;
        break;
      }
    }
  }
  return dated;
}

function g3SpecPath(input) {
  const offenders = [];
  for (const [name, source] of sourceEntries(input)) {
    for (const file of specFilesOf(source)) {
      const parts = String(file).split("/").filter(Boolean);
      const dirs = parts.slice(0, -1).map((part) => part.toLowerCase());
      const stem = (parts.at(-1) ?? "").toLowerCase().replace(/\.[^.]+$/, "");
      const hitDir = dirs.find((dir) => FORBIDDEN_DIR_SEGMENTS.has(dir));
      if (hitDir) offenders.push(`${name}: ${file} (under "${hitDir}/")`);
      else if (FORBIDDEN_FILE_STEMS.has(stem)) offenders.push(`${name}: ${file} (filename "${stem}")`);
    }
  }
  if (offenders.length > 0) {
    return result(
      "G3",
      "spec is the product API",
      "fail",
      `spec path indicates a test/sample artifact, not the product API: ${offenders.join("; ")}`
    );
  }
  return result("G3", "spec is the product API", "pass", "no test/sample/fixture path segments");
}

function g4MultiSource(input) {
  const sources = sourceEntries(input);
  if (sources.length <= 1) return result("G4", "per-source review", "pass", "single source");
  const listed = sources.map(([name, source]) => `${name} -> ${specFilesOf(source).join(", ")}`);
  return result(
    "G4",
    "per-source review",
    "warn",
    `${sources.length} sources; confirm every one belongs to this product and none is a vendored ` +
      `third-party spec: ${listed.join(" | ")}`
  );
}

function g5GoSafeName(input) {
  const bad = sourceEntries(input)
    .map(([name]) => name)
    .filter((name) => !GO_IDENTIFIER.test(name));
  if (bad.length > 0) {
    return result(
      "G5",
      "Go-safe source name",
      severity(input.mode, "fail", "warn"),
      `source name(s) become Go package names and must match ${GO_IDENTIFIER}: ${bad.join(", ")} ` +
        "(lathe-scan emits kebab-case; rename before authoring)"
    );
  }
  return result("G5", "Go-safe source name", "pass", "all source names are Go identifiers");
}

function unavailableProbe(probe) {
  if (!probe?.generated) return "generation did not run";
  if (probe.failure) return `${probe.failure.kind} probe failed at ${probe.failure.stage ?? "unknown stage"}`;
  return null;
}

function g6CommandFloor(input) {
  const { probe } = input;
  const unavailable = unavailableProbe(probe);
  if (unavailable) return result("G6", `>= ${COMMAND_FLOOR} commands`, "skip", unavailable);
  const count = probe.commandCount ?? 0;
  if (count < COMMAND_FLOOR) {
    return result(
      "G6",
      `>= ${COMMAND_FLOOR} commands`,
      "fail",
      `generated ${count} commands; below the floor. In the 100-repo corpus every spec under ~20 ` +
        "commands was a partial or toy API."
    );
  }
  return result("G6", `>= ${COMMAND_FLOOR} commands`, "pass", `${count} commands`);
}

function g7SmokeSearch(input) {
  const { probe } = input;
  const unavailable = unavailableProbe(probe);
  if (unavailable) return result("G7", "smoke intent resolves", "skip", unavailable);
  const intent = input.meta?.smoke?.intent ?? input.intent;
  if (!intent) {
    return result("G7", "smoke intent resolves", "skip", "no smoke intent supplied (pass --intent to check)");
  }
  const top = probe.searchTop ?? [];
  if (top.length === 0) {
    return result("G7", "smoke intent resolves", "fail", `search "${intent}" returned nothing`);
  }

  const expect = input.meta?.smoke?.expect;
  if (!expect) {
    return result(
      "G7",
      "smoke intent resolves",
      "warn",
      `search "${intent}" returns ${top.length} hits, top-1 = ${top[0].method} ${top[0].path} (${top[0].use}). ` +
        "No smoke.expect declared, so relevance is unverified — confirm the top hit is the operation you meant."
    );
  }
  const hit = top.findIndex((entry) => entry.use === expect || entry.operationId === expect);
  if (hit < 0) {
    return result(
      "G7",
      "smoke intent resolves",
      "fail",
      `search "${intent}" does not surface "${expect}" in the top ${top.length}; top-1 = ${top[0].use}`
    );
  }
  return result("G7", "smoke intent resolves", "pass", `"${expect}" ranks #${hit + 1} for "${intent}"`);
}

function g8AgentSurface(input) {
  const { probe } = input;
  const unavailable = unavailableProbe(probe);
  if (unavailable) return result("G8", "agent surface", "skip", unavailable);

  const problems = [];
  if (!probe.skillInstallOk) problems.push('`skill install --dry-run` failed — set "skill: { bundle: true }" in cli.yaml');
  if (!probe.authHelpOk) problems.push("`auth --help` failed");
  if (problems.length > 0) return result("G8", "agent surface", "fail", problems.join("; "));

  // Lathe mounts `auth` unconditionally, so its presence proves nothing; the
  // recipe must say how to prove a token, or that none is needed.
  const hasValidate = Boolean(input.cli?.auth?.validate);
  const declaredNoAuth = input.meta?.auth?.type === "none";
  if (!hasValidate && !declaredNoAuth) {
    const detail =
      "cli.yaml declares no auth.validate and lathe.yaml does not say auth.type: none — " +
      "an agent cannot tell whether its token works";
    if (input.mode === "gate") return result("G8", "agent surface", "fail", detail);
    return result("G8", "agent surface", "warn", `${detail} (expected at preflight: see H2)`);
  }

  return result("G8", "agent surface", "pass", hasValidate ? "skill install + auth.validate declared" : "skill install; auth.type: none");
}

// Provenance, not readability: Lathe now derives readable names from the path,
// so an unnamed spec no longer means an unusable CLI. Reports, does not block.
function g9NameQuality(input) {
  const { probe } = input;
  const unavailable = unavailableProbe(probe);
  if (unavailable) return result("G9", "derived command names", "skip", unavailable);
  const total = probe.commandCount ?? 0;
  if (total === 0) return result("G9", "derived command names", "skip", "no commands");
  const synth = probe.synthesizedCount ?? 0;
  const ratio = synth / total;
  const pct = Math.round(ratio * 100);
  if (ratio > SYNTH_NAME_CEILING) {
    return result(
      "G9",
      "derived command names",
      "warn",
      `${synth}/${total} (${pct}%) commands are named from method+path because the upstream spec ` +
        `declares no operationId — e.g. ${(probe.synthesizedSamples ?? []).slice(0, 2).join(", ")}. ` +
        "Read the generated names before merging; an overlay can rename the ones that matter."
    );
  }
  return result("G9", "derived command names", "pass", `${pct}% derived names`);
}

function warnings(input) {
  const out = [];
  const { probe } = input;
  const sources = sourceEntries(input);

  if (probe?.generated && probe.cjkSummaries > 0) {
    out.push(
      result(
        "W1",
        "non-English spec text",
        "warn",
        `${probe.cjkSummaries} command summaries contain CJK text; the CLI help will not be English`
      )
    );
  }
  const shaPinned = sources.filter(([, source]) => SHA40.test(String(source.pinned_tag ?? "")));
  if (shaPinned.length > 0) {
    out.push(
      result(
        "W2",
        "pinned to a commit, not a release",
        "warn",
        `${shaPinned.map(([name]) => name).join(", ")} pinned to a HEAD SHA; prefer a release tag when the ` +
          "product publishes one"
      )
    );
  }
  if ((probe?.commandCount ?? 0) > 300) {
    out.push(result("W3", "very large surface", "warn", `${probe.commandCount} commands; consider overlay grouping`));
  }
  // `chunk-2` tells nobody what it does; an overlay rename is the remedy.
  if ((probe?.collisionSuffixed ?? 0) > 0) {
    const pct = Math.round((probe.collisionSuffixed / probe.commandCount) * 100);
    out.push(
      result(
        "W5",
        "collision-suffixed names",
        "warn",
        `${probe.collisionSuffixed}/${probe.commandCount} (${pct}%) commands carry a disambiguation suffix — ` +
          `e.g. ${(probe.collisionSamples ?? []).join(", ")}. These are indistinguishable without \`commands show\`; ` +
          "consider an overlay rename."
      )
    );
  }

  const noHost = sources.filter(([, source]) => !source.default_hostname);
  if (noHost.length > 0) {
    out.push(
      result(
        "W4",
        "no default hostname",
        "warn",
        `${noHost.map(([name]) => name).join(", ")} has no default_hostname (expected for self-hosted products)`
      )
    );
  }
  return out;
}

export const HUMAN_QUESTIONS = [
  {
    id: "H1",
    question:
      "Is this a product, or a framework / scaffold / tutorial / example repo? Would an operator actually run a CLI against it?"
  },
  {
    id: "H2",
    question:
      "Is auth.validate the right endpoint? If the product has no per-user identity (a gateway), is the status/version fallback honest?"
  },
  {
    id: "H3",
    question: "Are category and description written for a human, or copied from the spec's info.title?"
  }
];

export function evaluate(input) {
  const rules = [
    g1NativeOrigin(input),
    g2ImmutablePin(input),
    g3SpecPath(input),
    g4MultiSource(input),
    g5GoSafeName(input),
    g6CommandFloor(input),
    g7SmokeSearch(input),
    g8AgentSurface(input),
    g9NameQuality(input)
  ];
  const warns = [...rules.filter((rule) => rule.status === "warn"), ...warnings(input)];
  const blocking = rules.filter((rule) => rule.status === "fail");
  const skipped = rules.filter((rule) => rule.status === "skip");

  return {
    rules,
    warnings: warns,
    blocking,
    skipped,
    verdict: blocking.length > 0 ? "NO-GO" : "GO",
    questions: HUMAN_QUESTIONS
  };
}

// Keyed on operation_id, not on the command name: the stand-in id stays stable
// as name derivation changes, so the rule cannot silently stop firing.
export function isSynthesizedName(command) {
  const method = String(command.http?.method ?? "").toLowerCase();
  const template = String(command.http?.path_template ?? "");
  if (!method) return false;
  const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  return normalize(String(command.operation_id ?? "")) === normalize(method + template.replace(/[{}]/g, ""));
}

export function hasCJK(text) {
  return CJK.test(String(text ?? ""));
}
