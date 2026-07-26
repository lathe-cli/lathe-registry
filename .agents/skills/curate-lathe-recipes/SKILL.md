---
name: curate-lathe-recipes
description: >-
  Discover active or trending GitHub product repositories, qualify them with
  Lathe Registry's product-fit rules, run the existing lathe-scan and Lathe
  preflight, expose capability gaps in Lathe and lathe-scan, write a local
  tooling capability review, author at most one reproducible recipe, and verify
  the repository gate and build. Use when hunting for new Lathe Registry
  candidates, maintaining the candidate funnel, stress-testing the Lathe
  toolchain against real repositories, or adding a vetted GitHub project under
  recipes/.
---

# Curate Lathe Recipes

Add at most one recipe per run. Examine at most five candidates with preflight.
A run that admits nothing is valid.

Treat every run as both recipe curation and a black-box stress test of
`lathe-scan -> Lathe -> registry gate`. A tool capability finding is a valid
outcome even when no recipe is admitted.

Do not stage, commit, push, open a PR, release, or deploy.

## Establish the contract

1. Run from the Lathe Registry root.
2. Read `CONTRIBUTING.md`, `docs/gate.md`, and
   `.github/workflows/validate.yml`. Treat them as the live contract.
3. Inspect `git status --short --branch`. Preserve unrelated changes. Stop if
   existing changes overlap the recipe selected for admission.
4. Keep tracked output limited to `recipes/<name>/`. Do not vendor the upstream
   repository or track generated catalogs, Skills, build evidence, site data,
   downloads, candidate reports, or tool binaries.
5. Use `.local/curate-lathe-recipes.md` for the candidate ledger,
   `.local/preflight/` for drafts, `.local/diagnostics/` for retained minimal
   reproductions, `.local/bin/` for the toolchain, and
   `.local/lathe-tooling-capability-review-YYYY-MM-DD.md` for the run's tooling
   analysis.

## Prepare the toolchain

Use the exact Lathe ref declared as `LATHE_REF` in
`.github/workflows/validate.yml`. Install it into `.local/bin`, not the global
Go bin directory.

Resolve the current `lathe-cli/lathe-scan` `main` SHA through `gh`, install that
exact SHA into `.local/bin`, and record the SHA in the ledger. Do not use an
unidentified stale binary from `PATH`.

Equivalent setup:

```bash
mkdir -p .local/bin
GOBIN="$PWD/.local/bin" go install "github.com/lathe-cli/lathe/cmd/lathe@<LATHE_REF>"
GOBIN="$PWD/.local/bin" go install "github.com/lathe-cli/lathe-scan@<LATHE_SCAN_SHA>"
export LATHE_REF="<LATHE_REF>"
export LATHE_BIN="$PWD/.local/bin/lathe"
export LATHE_SCAN_BIN="$PWD/.local/bin/lathe-scan"
```

Verify `gh auth status`, `$LATHE_BIN version`, and
`$LATHE_SCAN_BIN --version`. Treat setup failures as toolchain failures, not
candidate verdicts.

If dependencies are absent, use the repository lockfiles:

```bash
npm ci
npm --prefix site ci
```

## Build the candidate pool

Derive two UTC dates for each run: 30 days ago for recent activity and 180 days
ago for rising projects.

Use `gh search repos` to collect up to 20 results from each lane:

```text
topic:self-hosted stars:>=1000 pushed:>=<30-days-ago> archived:false fork:false
created:>=<180-days-ago> stars:>=500 pushed:>=<30-days-ago> archived:false fork:false
```

Sort by stars, request structured fields, and deduplicate by `owner/name`. If a
web browsing tool is available, add the official GitHub Trending daily or
weekly list as a volatile seed only. Do not treat Trending placement, total
stars, or recent pushes as admission evidence.

Exclude:

- repositories already represented by a `recipes/*/lathe.yaml` homepage;
- the same repository at the same HEAD SHA already recorded in the ledger;
- lists, SDKs, libraries, frameworks, templates, tutorials, examples, docs-only
  repositories, model or dataset repositories, client-only applications, and
  agent-skill collections;
- projects without a plausible operator or agent workflow against a product
  API.

Prefer maintained server products with clear API and authentication
documentation. Choose candidates by product fit before popularity. Do not add a
custom scoring system.

## Run preflight

For each selected candidate:

1. Resolve and record its current default-branch HEAD SHA and discovery lane.
2. Read enough upstream product documentation to state one concrete intent an
   operator or agent would search for. Do not use a generic placeholder.
3. Run the existing workflow and capture its JSON output:

   ```bash
   node scripts/preflight.mjs "https://github.com/<owner>/<repo>" \
     --name "<recipe-name>" \
     --intent "<concrete intent>" \
     --json
   ```

4. Inspect `verdict`, every blocking rule and warning, generation failure,
   command count, derived names, collisions, and the top five search results.
5. Never promote `.local/preflight/<name>/` unless the preflight verdict is
   `GO`.
6. Record the attempt in `.local/curate-lathe-recipes.md` with date, repository,
   HEAD SHA, lane, stars, verdict, decisive reason, Lathe ref, and lathe-scan
   SHA.

`preflight` may emit a draft even for `NO-GO`; the draft is not admission
evidence. If it reports `lathe-scan found no usable source`, record
`no-usable-source` and continue. Treat other exit-code-3 results as toolchain
failures rather than rejecting the candidate, then diagnose them as described
below before deciding whether the run can safely continue.

Stop after one candidate clears preflight and the human questions, or after
five completed candidate attempts.

## Diagnose tool capability gaps

Do not let a tool failure become a candidate verdict. Investigate any
disagreement between scan output, generated command count, CLI behavior, and
gate output.

For each suspected tool failure:

1. Preserve the pinned repository HEAD, exact Lathe ref, exact lathe-scan SHA,
   command, exit code, and bounded stderr under `.local/`.
2. Retain the generated project when needed and run its CLI directly. A
   successful code generation or build does not prove that the CLI starts.
3. Reduce the case to the smallest source set or path variation that preserves
   the failure. Compare equivalent inputs when path, source selection, or
   format handling is suspect.
4. Assign the failure to one boundary:
   - upstream repository or spec;
   - lathe-scan discovery, provenance, source selection, or manifest output;
   - Lathe sync, parsing, code generation, runtime, auth, or search;
   - registry policy or gate/preflight observability.
5. Separate observed behavior, confirmed root cause, hypotheses, blast radius,
   missing evidence, and the smallest regression check. Do not call a
   hypothesis confirmed.
6. Correct the ledger when deeper evidence overturns the initial verdict.

Inspect tool source only as far as needed to prove the failing invariant. Do
not modify Lathe, lathe-scan, or the gate in this workflow unless the user
explicitly asks for those fixes.

## Author one recipe

Before promotion, answer the repository's three human questions from upstream
evidence:

- H1: confirm this is a real product an operator would control, not a framework,
  scaffold, tutorial, or example;
- H2: confirm the authentication type and a safe `auth.validate` endpoint, or
  prove that `auth.type: none` is honest;
- H3: write a human-facing category and description instead of copying the spec
  title.

If H1 or H2 cannot be proven, record the candidate as deferred and continue
while the five-attempt budget remains.

Complete the draft:

- keep immutable upstream pins and dated pin comments;
- make every source name a valid Go identifier;
- set `skill.bundle: true`;
- add a real `smoke.intent` and the correct `smoke.expect` found in the top five
  generated search results;
- document modules, authentication, Skill installation, and the agent
  `search -> commands show -> auth status -> execute` workflow;
- add an overlay only when required to fix important command usability.

Create a new `recipes/<name>/` containing only:

```text
lathe.yaml
cli.yaml
specs/sources.yaml
README.md
```

Include `overlays/` only when used. Never overwrite an existing recipe.

## Verify admission

Run the narrow gate first:

```bash
node scripts/gate.mjs --recipes "<name>"
```

Fix the recipe rather than weakening the gate. Then run the repository's CI
shape:

```bash
node scripts/gate.mjs --write
npm run build
git diff --check
git status --short
```

Inspect the final tracked diff. It must contain only the new recipe plus
pre-existing user changes. Generated outputs may remain under ignored paths.

Do not claim live API execution without credentials and a real endpoint.
Passing means the pinned recipe reproduced, the CLI built, catalog and search
probes passed, Skill installation dry-run passed, authentication was honestly
declared, and the site built.

## Write the capability review

Create or update
`.local/lathe-tooling-capability-review-YYYY-MM-DD.md` at the end of every run.
Its purpose is to turn real repository failures into actionable product
feedback for Lathe and lathe-scan, not merely to explain why candidates were
rejected.

Include:

- tool versions, candidate count, admission count, and evidence locations;
- a corrected table of initial verdicts versus tooling-aware conclusions;
- confirmed issues grouped by Lathe, lathe-scan, cross-tool contract, and
  registry harness;
- for each issue: observation, root cause or explicit hypothesis, impact,
  priority, and smallest acceptance check;
- systemic patterns across multiple candidates instead of repeated raw logs;
- positive capabilities that held under stress;
- upstream limitations that are not tool defects;
- unverified claims, especially authentication without live credentials;
- a converged Now/Next/Later order that fixes result integrity before
  convenience or search quality.

Rank false success, runtime panic, provenance corruption, and producer/consumer
contract mismatches ahead of ergonomics. Prefer the smallest root-cause fix;
do not invent a framework, compatibility layer, or speculative telemetry
system in the review.

## Report the run

Report:

- discovery lanes and candidate count;
- each attempted repository and decisive verdict;
- the admitted recipe, if any;
- exact verification commands and results;
- the capability review path and its highest-priority Lathe/lathe-scan
  findings;
- any live behavior that remains unverified.

When no candidate passes, leave tracked files unchanged and say so plainly.
