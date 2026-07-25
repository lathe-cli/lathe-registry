# Recipe admission gate

A recipe pins a real product's API spec and ships a generated CLI plus agent
Skill. This document is the bar it has to clear, and why each threshold sits
where it does.

The same rules run in two places, from one implementation
(`scripts/gate/rules.mjs`):

- **`npm run preflight -- <repo>`** — before any work, decides whether a
  candidate is worth turning into a recipe.
- **CI, on every recipe PR** — decides whether it can merge.

A candidate that passes preflight cannot be rejected later by a different bar.

## Why thresholds, not taste

Numbers below are calibrated against two datasets, not chosen by feel:

- a 100-repo scan+generate corpus (`lathe-scan/.local/corpus/`), and
- the recipes already merged, which the gate must keep passing.

Of the 100 repos, 30 produced a native (pinnable) spec and 18 generated a CLI
with commands. Their command counts:

```
1, 2, 3, 3, 6, 12, 12 | 23, 35, 36, 52, 65, 73, 86, 133, 151, 245, 553
                       ^ everything left of the break is a partial or toy API
```

Command-name quality is bimodal — a spec either carries human `operationId`s or
none at all, and Lathe then synthesizes names from method+path:

| recipe / repo | commands | synthesized names |
| --- | --- | --- |
| trieve (merged) | 133 | 0% |
| tyk (merged) | 65 | 0% |
| pentagi | 86 | 0% |
| apache/superset | 276 | **81%** |
| gin-vue-admin | 245 | 100% |
| go8 | 12 | 100% |

## Blocking rules

| ID | Rule | Threshold / check |
| --- | --- | --- |
| G1 | Native spec origin | every source has `repo_url`. L2-extracted, bundled, or `local_path` drafts are not pinnable and cannot be a recipe |
| G2 | Immutable pin | `pinned_tag` is a 40-char SHA or a release tag, never a branch; each pin carries an `# pinned to … as of YYYY-MM-DD` comment |
| G3 | Spec is the product API | spec path contains no `test/ tests/ fixtures/ samples/ examples/ integration/ third_party/ vendor/` segment. This one rule rejects metersphere (553 "commands" from `src/test/resources/`), bruno, nestjs, and actix/examples |
| G5 | Go-safe source name | matches `^[a-z][a-z0-9_]*$` — the source name becomes a Go package name, so `mall-admin` breaks codegen |
| G6 | Command floor | ≥ 20 generated commands, measured by really running `commands --json` — never from a static estimate |
| G7 | Smoke intent resolves | `smoke.expect` must rank in the top 5 for `search "<smoke.intent>"`. Without `expect` the rule can only prove the search returned something, so it warns instead |
| G8 | Agent surface | `skill install --dry-run` works (`skill: { bundle: true }`), and the recipe declares `auth.validate` or states `auth.type: none`. `auth --help` alone proves nothing — Lathe mounts `auth` unconditionally |

G6–G8 require really generating and running the CLI, with the recipe's overlays
applied. Schema validation cannot catch a bad recipe; only the built artifact
can.

## Reported, not blocking

| ID | Signal |
| --- | --- |
| G4 | multi-source recipe — every source passes G1–G3, but a human must confirm each one belongs to *this* product (a vendored third-party spec is the trap) |
| G9 | share of commands whose name is derived from method+path because the upstream spec declares no `operationId` |
| W1 | non-English command help |
| W2 | pinned to a commit rather than a release |
| W3 | >300 commands — consider overlay grouping |
| W4 | no `default_hostname` |
| W5 | commands carrying a `-2` / `-3` disambiguation suffix |

G9 blocked at first, when a spec without `operationId`s produced names like
`get-api-v1dashboard`. Lathe now derives names from the path with the shared
noise prefix removed (`get-dashboard`), so an unnamed upstream spec no longer
means an unusable CLI — the signal is worth reading, not worth rejecting on.
Raise it back to blocking by flipping the status in `g9NameQuality` if the
registry decides it wants author-named specs only.

W5 has the same history: Lathe used to drop the leading segment of an
`operationId`, collapsing `create_chunk` / `update_chunk` / `delete_chunk` onto
one name and shipping `chunk`, `chunk-2`, `chunk-3`. It now drops that segment
only when it repeats the group, so the suffixes are rare; when they do appear,
an overlay rename is the remedy.

## Calibration

Measured by really generating each CLI, with overlays applied:

| recipe | commands | verdict |
| --- | --- | --- |
| trieve | 133 | GO |
| tyk | 65 | GO |
| daocloud-dce | 731 | GO (G4 multi-source, W1 CJK) |
| superset | 276 | GO (G9 — 81% derived names) |

The naming fixes moved two of these measurably: superset's commands went from
`get-api-v1dashboard` to `get-dashboard`, and trieve's collision suffixes went
from 32/133 to 0 — its smoke intent now resolves to `search-chunks` at score
280 instead of `chunks-2` at 90.

## Evidence

`scripts/gate.mjs --write` records what it measured in `.gate/<recipe>.json`,
and `npm run generate` folds that into `builds/<recipe>.json`: which Lathe ref
built the recipe, when, how many commands and groups, and which warnings fired.
Without it the build record says `not-recorded` rather than inventing a version.

## CI

`.github/workflows/validate.yml` installs a pinned Lathe, runs
`node scripts/gate.mjs --write`, and only then builds the site. Two consequences:

- A recipe PR that fails a blocking rule fails the build.
- `skills/` is generated in CI rather than committed, so a recipe PR contains
  only `recipes/<name>/`. The pinned-spec cache keeps the upstream clones off
  the critical path.

## Human questions

Three judgments no rule can make. They must be answered in the PR body:

- **H1** — Is this a product, or a framework / scaffold / tutorial / example
  repo? Would an operator actually run a CLI against it?
- **H2** — Is `auth.validate` the right endpoint? If the product has no per-user
  identity (a gateway), is the status/version fallback honest?
- **H3** — Are `category` and `description` written for a human, or copied from
  the spec's `info.title`?

## Toolchain

The gate needs Lathe v0.5.1 or newer — earlier releases abort on the first
command-name collision, and v0.5.0's `lathe init` rejects its own version.
preflight detects the collision signature and reports a **toolchain error**,
never a verdict on the candidate. CI pins the version in
`.github/workflows/validate.yml`; locally, `LATHE_BIN` / `LATHE_SCAN_BIN`
override `PATH`.
