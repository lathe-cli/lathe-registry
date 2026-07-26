import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { evaluate } from "./rules.mjs";
import { generateAndProbe } from "./toolchain.mjs";

test("generateAndProbe preserves a CLI runtime failure", async () => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), "lathe-toolchain-test-"));
  const binDir = path.join(temp, "bin");
  const latheBin = path.join(binDir, "lathe");
  const goBin = path.join(binDir, "go");
  const oldPath = process.env.PATH;

  try {
    await fs.mkdir(binDir);
    await fs.writeFile(
      latheBin,
      `#!/bin/sh
if [ "$1" = "init" ]; then
  mkdir -p "$2/cmd/demo" "$2/specs"
fi
exit 0
`
    );
    await fs.writeFile(
      goBin,
      `#!/bin/sh
while [ "$1" != "" ]; do
  if [ "$1" = "-o" ]; then
    shift
    output="$1"
    break
  fi
  shift
done
cat > "$output" <<'EOF'
#!/bin/sh
echo "panic: catalog exploded" >&2
echo "stack 1" >&2
echo "stack 2" >&2
echo "stack 3" >&2
echo "stack 4" >&2
echo "stack 5" >&2
echo "stack 6" >&2
echo "stack 7" >&2
echo "stack tail" >&2
exit 17
EOF
chmod +x "$output"
`
    );
    await fs.chmod(latheBin, 0o755);
    await fs.chmod(goBin, 0o755);
    process.env.PATH = `${binDir}${path.delimiter}${oldPath}`;

    const probe = await generateAndProbe({
      latheBin,
      cliName: "demo",
      cliYaml: "cli:\n  name: demo\n",
      sourcesYaml: "sources: {}\n",
      workdir: path.join(temp, "work")
    });

    assert.equal(probe.generated, true);
    assert.equal(probe.failure?.kind, "runtime");
    assert.equal(probe.failure?.stage, "commands --json");
    assert.equal(probe.failure?.exitCode, 17);
    assert.match(probe.failure?.message ?? "", /panic: catalog exploded/);
    assert.match(probe.failure?.message ?? "", /stack tail/);
  } finally {
    process.env.PATH = oldPath;
    await fs.rm(temp, { recursive: true, force: true });
  }
});

test("runtime probe failures skip generated-artifact rules", () => {
  const evaluation = evaluate({
    mode: "preflight",
    sources: { raw: "sources: {}\n", parsed: { sources: {} } },
    cli: {},
    meta: null,
    intent: "list resources",
    probe: {
      generated: true,
      failure: { kind: "runtime", stage: "commands --json", exitCode: 17, message: "catalog exploded" }
    }
  });

  for (const id of ["G6", "G7", "G8", "G9"]) {
    assert.equal(evaluation.rules.find((rule) => rule.id === id)?.status, "skip", `${id} should be skipped`);
  }
});

test("G8 reports probe failures before preflight auth guidance", () => {
  const evaluation = evaluate({
    mode: "preflight",
    sources: { raw: "sources: {}\n", parsed: { sources: {} } },
    cli: {},
    meta: null,
    probe: { generated: true, failure: null, skillInstallOk: false, authHelpOk: false }
  });

  const g8 = evaluation.rules.find((rule) => rule.id === "G8");
  assert.equal(g8?.status, "fail");
  assert.match(g8?.detail ?? "", /skill install --dry-run/);
  assert.match(g8?.detail ?? "", /auth --help/);
});

test("G8 still rejects a gate recipe without an auth declaration", () => {
  const evaluation = evaluate({
    mode: "gate",
    sources: { raw: "sources: {}\n", parsed: { sources: {} } },
    cli: {},
    meta: {},
    probe: { generated: true, failure: null, skillInstallOk: true, authHelpOk: true }
  });

  const g8 = evaluation.rules.find((rule) => rule.id === "G8");
  assert.equal(g8?.status, "fail");
  assert.match(g8?.detail ?? "", /auth\.validate/);
});
