# Apache Superset

This recipe generates the `superset` CLI and agent Skill for the
[Apache Superset](https://github.com/apache/superset) analytics and BI API.

It keeps only the reproducible Lathe inputs: the OpenAPI spec is pinned from the
Superset repository, and generated code is not the source of truth.

## Module

- `superset`: dashboards, charts, datasets, databases, queries, reports,
  security, and other Superset API operations (276 commands across 28 groups).

## Auth

Superset uses JWT bearer tokens. Obtain an access token from
`POST /api/v1/security/login`, then:

```sh
superset auth login --hostname <superset-host>
```

`auth status` validates the token against `GET /api/v1/me/`:

```sh
superset auth status --hostname <superset-host>
```

## Install the Skill

The recipe enables the bundled Agent Skill (`skill.bundle` in `cli.yaml`):

```sh
superset skill install --scope user --agent codex --yes
```

## Agent workflow

```sh
superset commands schema --json
superset commands --json
superset search "list dashboards" --json
superset commands show superset dashboards get-api-v1dashboard --json
```

Search results are discovery only. Inspect command details before execution.

## Source inputs

The recipe pins the Superset OpenAPI spec from:

```text
https://github.com/apache/superset.git   docs/static/resources/openapi.json
```

Bump `pinned_tag` in `specs/sources.yaml` when upgrading the Superset API
version.
