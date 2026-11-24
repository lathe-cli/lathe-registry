import { test } from "node:test";
import assert from "node:assert/strict";

import { evaluate } from "./rules.mjs";

// 构造一个最小 input：sources 声明 base_path，probe 携带命令列表
function makeInput({ basePath = "/api/v1", commands = [], meta = {} } = {}) {
  const sourcesYaml = basePath
    ? `sources:\n  api:\n    repo_url: https://example.com/api\n    # pinned to v1.0.0 as of 2026-01-01\n    pinned_tag: v1.0.0\n    backend: swagger\n    base_path: ${basePath}\n`
    : `sources:\n  api:\n    repo_url: https://example.com/api\n    # pinned to v1.0.0 as of 2026-01-01\n    pinned_tag: v1.0.0\n    backend: swagger\n`;
  return {
    mode: "gate",
    name: "fixture",
    sources: {
      raw: sourcesYaml,
      parsed: {
        sources: {
          api: {
            repo_url: "https://example.com/api",
            pinned_tag: "v1.0.0",
            backend: "swagger",
            ...(basePath ? { base_path: basePath } : {})
          }
        }
      }
    },
    cli: { auth: { validate: { method: "GET", path: "/api/v1/user" } } },
    meta: { smoke: { intent: "list things", expect: "list-things" }, ...meta },
    probe: {
      generated: true,
      failure: null,
      commandCount: commands.length,
      synthesizedCount: 0,
      searchTop: [{ score: 1, use: "list-things", operationId: "listThings", method: "GET", path: "/api/v1/things" }],
      skillInstallOk: true,
      authHelpOk: true,
      commands
    }
  };
}

// G6 要求 >= 20 条命令。测试只关心 G10，用重复的占位命令把数量补上去，
// 避免无关规则干扰断言。
function pad(commands, count = 22) {
  const padded = [...commands];
  for (let i = padded.length; i < count; i += 1) {
    padded.push({ use: `pad-${i}`, method: "GET", path: "/api/v1/pad", flags: [] });
  }
  return padded;
}

function ruleOf(evaluation, id) {
  return evaluation.rules.find((rule) => rule.id === id);
}

test("G10 passes when methods and paths are consistent", () => {
  const evaluation = evaluate(makeInput({
    commands: pad([
      { use: "list-things", method: "GET", path: "/api/v1/things", flags: [] },
      { use: "get-thing", method: "GET", path: "/api/v1/things/{id}", flags: ["id"] }
    ])
  }));
  const g10 = ruleOf(evaluation, "G10");
  assert.equal(g10.status, "pass");
  assert.equal(evaluation.verdict, "GO");
});

test("G10 fails on an unknown HTTP method", () => {
  const evaluation = evaluate(makeInput({
    commands: pad([{ use: "weird", method: "FETCH", path: "/api/v1/things", flags: [] }])
  }));
  const g10 = ruleOf(evaluation, "G10");
  assert.equal(g10.status, "fail");
  assert.match(g10.detail, /unknown HTTP method/);
  assert.equal(evaluation.verdict, "NO-GO");
});

test("G10 fails when a path variable has no flag", () => {
  const evaluation = evaluate(makeInput({
    commands: pad([{ use: "get-thing", method: "GET", path: "/api/v1/things/{id}", flags: [] }])
  }));
  const g10 = ruleOf(evaluation, "G10");
  assert.equal(g10.status, "fail");
  assert.match(g10.detail, /\{id\} has no flag/);
});

test("G10 fails when a path sits outside the declared base_path", () => {
  const evaluation = evaluate(makeInput({
    basePath: "/api/v1",
    commands: pad([
      { use: "list-things", method: "GET", path: "/api/v1/things", flags: [] },
      { use: "list-other", method: "GET", path: "/version", flags: [] }
    ])
  }));
  const g10 = ruleOf(evaluation, "G10");
  assert.equal(g10.status, "fail");
  assert.match(g10.detail, /outside the declared base_path/);
});

test("G10 does not enforce a prefix when the recipe declares no base_path", () => {
  const evaluation = evaluate(makeInput({
    basePath: null,
    commands: pad([{ use: "list-things", method: "GET", path: "/version", flags: [] }])
  }));
  const g10 = ruleOf(evaluation, "G10");
  assert.equal(g10.status, "pass");
});

test("G10 is skipped when the probe carries no command list", () => {
  const input = makeInput({ commands: [] });
  delete input.probe.commands;
  const evaluation = evaluate(input);
  const g10 = ruleOf(evaluation, "G10");
  assert.equal(g10.status, "skip");
});



test("G10 accepts a path variable whose flag name is normalized", () => {
  // Lathe 把 {runner_id} 暴露成 --runner-id，{pageName} 成 --page-name。
  // 这不是缺 flag，规则必须认这种映射。
  const evaluation = evaluate(makeInput({
    commands: pad([
      { use: "delete-runner", method: "DELETE", path: "/api/v1/runners/{runner_id}", flags: ["runner-id"] },
      { use: "get-wiki-page", method: "GET", path: "/api/v1/wiki/{pageName}", flags: ["page-name"] }
    ])
  }));
  const g10 = ruleOf(evaluation, "G10");
  assert.equal(g10.status, "pass", g10.detail);
});

test("G10 still fails when neither the raw nor the normalized name matches", () => {
  const evaluation = evaluate(makeInput({
    commands: pad([
      { use: "get-thing", method: "GET", path: "/api/v1/things/{thingId}", flags: ["something-else"] }
    ])
  }));
  const g10 = ruleOf(evaluation, "G10");
  assert.equal(g10.status, "fail");
  assert.match(g10.detail, /\{thingId\} has no flag/);
});

test("G10 normalizes acronym variables the way lathe does", () => {
  // {apiID} -> --api-id，{roleUID} -> --role-uid，{kubeSystemID} -> --kube-system-id
  const evaluation = evaluate(makeInput({
    commands: pad([
      { use: "get-api", method: "GET", path: "/api/v1/apis/{apiID}", flags: ["api-id"] },
      { use: "delete-role", method: "DELETE", path: "/api/v1/roles/{roleUID}", flags: ["role-uid"] },
      { use: "get-kube", method: "GET", path: "/api/v1/kube/{kubeSystemID}", flags: ["kube-system-id"] }
    ])
  }));
  const g10 = ruleOf(evaluation, "G10");
  assert.equal(g10.status, "pass", g10.detail);
});