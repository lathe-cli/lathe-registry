import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const schema = JSON.parse(fs.readFileSync("schema/index.schema.json", "utf8"));
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

const index = {
  $schema: "https://lathe-cli.github.io/lathe-registry/schema/index.schema.json",
  schema_version: 1,
  generated_at: "2026-07-27T00:00:00.000Z",
  recipes: [
    {
      name: "answer",
      display_name: "Apache Answer",
      cli_name: "answer",
      category: "knowledge-base",
      description: "Apache Answer CLI",
      auth: { type: "bearer", notes: "Requires a token." },
      gate: {
        verdict: "GO",
        generated_at: "2026-07-27T00:00:00.000Z",
        lathe_version: "lathe v0.5.2",
        command_count: 199,
        group_count: 31,
        skill_included: true,
        warnings: []
      },
      source_refs: [],
      artifacts: [
        {
          os: "darwin",
          arch: "arm64",
          format: "tar.gz",
          binary: "answer",
          url: "downloads/answer-darwin-arm64.tar.gz",
          size: 123,
          sha256: `sha256:${"a".repeat(64)}`
        }
      ]
    }
  ]
};

test("registry index schema accepts the public client contract", () => {
  assert.equal(validate(index), true, ajv.errorsText(validate.errors));
});

test("registry index schema requires a full artifact digest", () => {
  const invalid = structuredClone(index);
  invalid.recipes[0].artifacts[0].sha256 = "sha256:abcd";
  assert.equal(validate(invalid), false);
});
