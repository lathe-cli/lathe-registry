import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import * as tar from "tar";

export const CLI_TARGETS = [
  { os: "darwin", arch: "arm64" },
  { os: "darwin", arch: "amd64" },
  { os: "linux", arch: "amd64" },
  { os: "linux", arch: "arm64" },
  { os: "windows", arch: "amd64" },
  { os: "windows", arch: "arm64" }
];

export async function createCliArchive(binaryPath, archivePath, binaryName) {
  const stagingDir = path.join(path.dirname(binaryPath), "artifact");
  const stagedBinary = path.join(stagingDir, binaryName);

  await fs.mkdir(stagingDir, { recursive: true });
  await fs.copyFile(binaryPath, stagedBinary);
  await fs.chmod(stagedBinary, 0o755);
  await tar.c({ file: archivePath, cwd: stagingDir, gzip: true, portable: true }, [binaryName]);
  const archive = await fs.readFile(archivePath);
  return {
    sha256: `sha256:${crypto.createHash("sha256").update(archive).digest("hex")}`,
    size: archive.length
  };
}
