# Trieve

This recipe generates the `trieve` CLI and agent Skill for the
[Trieve](https://github.com/devflowinc/trieve) search and RAG API.

It keeps only the reproducible Lathe inputs: the OpenAPI spec is pinned from the
Trieve repository, and generated code is not the source of truth.

## Modules

- `trieve`: the full Trieve API — chunks, datasets, groups, files, analytics,
  organizations, users, and more (133 commands across 20 groups).

## Auth

Trieve uses an API key. The runtime sends it in the `Authorization` header
(Trieve also accepts `X-API-KEY`). Create a key in the Trieve dashboard, then:

```sh
trieve auth login --hostname api.trieve.ai
```

Agents should inspect auth state before executing commands whose catalog detail
has `auth.required=true`:

```sh
trieve auth status --hostname api.trieve.ai
```

## Agent workflow

```sh
trieve commands schema --json
trieve commands --json
trieve search "search chunks" --json
trieve commands show trieve chunk chunks-2 --json
```

Search results are discovery only. Inspect command details before execution.

## Source inputs

The recipe pins the Trieve OpenAPI spec from:

```text
https://github.com/devflowinc/trieve.git   clients/ts-sdk/openapi.json
```

Bump `pinned_tag` in `specs/sources.yaml` when upgrading the Trieve API version.
