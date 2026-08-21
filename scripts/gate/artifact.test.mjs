import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import * as tar from "tar";

import { CLI_TARGETS, createCliArchive } from "./artifact.mjs";

test("CLI artifact matrix covers supported desktop platforms", () => {
  assert.deepEqual(CLI_TARGETS, [
    { os: "darwin", arch: "arm64" },
    { os: "darwin", arch: "amd64" },
    { os: "linux", arch: "amd64" },
    { os: "linux", arch: "arm64" },
    { os: "windows", arch: "amd64" },
    { os: "windows", arch: "arm64" }
  ]);
});

test("createCliArchive preserves an executable CLI payload", async () => {
  const workdir = await fs.mkdtemp(path.join(os.tmpdir(), "lathe-artifact-"));
  const binary = path.join(workdir, "cli-bin");
  const archive = path.join(workdir, "answer-darwin-arm64.tar.gz");
  const extracted = path.join(workdir, "extracted");

  await fs.writeFile(binary, "#!/bin/sh\n", { mode: 0o644 });
  const artifact = await createCliArchive(binary, archive, "answer");
  await fs.mkdir(extracted);
  await tar.x({ file: archive, cwd: extracted });

  assert.equal((await fs.stat(path.join(extracted, "answer"))).mode & 0o111, 0o111);
  assert.match(artifact.sha256, /^sha256:[0-9a-f]{64}$/);
  assert.equal(artifact.size, (await fs.stat(archive)).size);
});
