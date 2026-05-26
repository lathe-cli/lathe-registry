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

## Generated outputs

Registry automation may generate:

- catalog snapshots
- Skill bundles
- build metadata
- static website data
- release artifacts when provenance rules exist

These outputs are not the source of truth.

## Review checklist

- `lathe.yaml` describes the recipe.
- `cli.yaml` matches the generated CLI.
- `specs/sources.yaml` uses pinned refs.
- `README.md` explains usage and auth.
- The smoke intent finds useful catalog results.
- The generated Skill points agents back to the runtime catalog.
