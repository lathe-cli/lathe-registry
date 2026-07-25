# Contributing Recipes

Lathe Registry accepts reproducible CLI recipes.

## Required files

Each recipe must live under `recipes/<name>/` and include:

```text
lathe.yaml
cli.yaml
specs/sources.yaml
README.md
```

Optional overlays live under:

```text
overlays/
```

## Rules

- Pin upstream specs.
- Keep generated code out of the recipe.
- Explain auth requirements.
- Add a smoke search intent.
- Keep overlays focused on command polish.
- Make the recipe small enough to review.

## Before you write a recipe

Check the candidate first — it takes one command and saves the work of authoring
a recipe that cannot be accepted:

```bash
npm run preflight -- https://github.com/<owner>/<repo> --intent "<what an agent would search for>"
```

It scans the repo, generates a CLI with a real Lathe, runs the admission rules,
and writes a recipe skeleton under `.local/preflight/<name>/`. `docs/gate.md`
explains every rule and why its threshold sits where it does.

## Generated outputs

Only `recipes/<name>/` belongs in git. Everything else is regenerated:

- `skills/<cli>/` — Skill bundles, rebuilt by the CI gate with a pinned Lathe
- `builds/`, `index.json`, site data and downloads — rebuilt by `npm run generate`

These outputs are not the source of truth.

## Review checklist

CI runs the admission gate (`node scripts/gate.mjs`) on every recipe PR: it
generates the CLI with a pinned Lathe and blocks on the rules in `docs/gate.md`.
What it cannot judge, a reviewer must — answer these in the PR body:

- **H1** — Is this a product, or a framework / scaffold / tutorial / example
  repo? Would an operator actually run a CLI against it?
- **H2** — Is `auth.validate` the right endpoint? If the product has no per-user
  identity, is the status/version fallback honest?
- **H3** — Are `category` and `description` written for a human, or copied from
  the spec's `info.title`?

Plus the basics the gate does not cover:

- `README.md` explains usage and auth.
- The generated Skill points agents back to the runtime catalog.
