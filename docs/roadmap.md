# Lathe Registry Roadmap

## Product boundary

Lathe Registry is a recipe registry, not a binary marketplace.

Lathe core owns generation, runtime behavior, catalog contracts, Skill rendering,
and recipe validation rules.

Lathe Registry owns community recipes, generated indexes, build proof, generated
catalog snapshots, Skill bundles, and static discovery pages.

## Phase 1: local registry foundation

- Create the `lathe-cli/lathe-registry` repository.
- Add the `daocloud-dce` recipe.
- Add schema files for recipe metadata and index data.
- Generate static site data from repository files.
- Build a local static website with a CLI registry home page, detail pages,
  rendered README content, file tree, Skill download, and install prompts.

## Phase 2: reproducible generation

- Generate catalogs from recipes in a temporary workspace.
- Generate Skill bundles from recipes.
- Write build metadata for each recipe.
- Fail when generated outputs are stale.

## Phase 3: CI and Pages deployment

- Validate recipe metadata on pull requests.
- Build the static website on pull requests.
- Deploy the static website from `main`.
- Rebuild the website when recipes, generated outputs, or site files change.

## Phase 4: contribution loop

- Publish the Submit page as the canonical contribution guide.
- Add recipe review checks.
- Add a pull request template for recipe submissions.
- Keep `daocloud-dce` as the reference implementation.

## Phase 5: Lathe CLI helpers

- Add read-only registry discovery to Lathe core after the registry has a stable
  index.
- Start with `lathe registry search`, `lathe registry show`, and
  `lathe registry init`.
- Keep binary installation out until artifact provenance rules exist.

## Phase 6: artifact distribution

- Define checksums, provenance, platform support, retention, and signing.
- Publish CLI artifacts only when those rules are enforced.
- Keep Skill distribution available independently from binary distribution.
