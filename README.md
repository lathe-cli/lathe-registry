# Lathe Registry

Lathe Registry is a community registry for reproducible Lathe CLI recipes.

Contributors submit pinned recipe inputs, not generated code as the source of
truth. The registry builds generated catalogs, Skill bundles, and static site
pages from those recipes.

## First recipe

The first registry recipe is `daocloud-dce`, extracted from
`DaoCloud/daocloud-skills`.

It generates the `dc` CLI and Skill for DaoCloud Enterprise APIs.

## Local development

```sh
npm install
npm run generate
npm run build
npm run dev
```

The static site lives under `site/`. Generated website data is written to:

- `index.json`
- `site/src/data/registry.json`
- `site/public/data/registry.json`
- `site/public/downloads/`

## Source of truth

Recipe inputs live under `recipes/<name>/`.

Generated outputs such as catalog snapshots, Skill bundles, build metadata, and
site data are evidence and distribution material. They must be reproducible from
the recipe.

## License

[Apache License 2.0](LICENSE) © lathe-cli
