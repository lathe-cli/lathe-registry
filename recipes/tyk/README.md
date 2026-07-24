# Tyk Gateway

This recipe generates the `tyk` CLI and agent Skill for the
[Tyk Gateway](https://github.com/TykTechnologies/tyk) management API.

It keeps only the reproducible Lathe inputs: the OpenAPI spec is pinned from the
Tyk repository, and generated code is not the source of truth.

## Modules

- `tyk`: the Tyk Gateway management API — APIs, keys, policies, certificates,
  OAuth clients, org quotas, cache invalidation, hot reload, and health
  (65 commands across 18 groups).

## Auth

The Tyk Gateway management API authenticates with a shared secret sent in the
`X-Tyk-Authorization` header (the gateway `secret`). It is a gateway secret, not
a per-user token.

```sh
tyk auth login --hostname <gateway-host>
```

`auth status` validates the secret against `GET /hello`:

```sh
tyk auth status --hostname <gateway-host>
```

## Install the Skill

The recipe enables the bundled Agent Skill (`skill.bundle` in `cli.yaml`):

```sh
tyk skill install --scope user --agent codex --yes
```

## Agent workflow

```sh
tyk commands schema --json
tyk commands --json
tyk search "list apis" --json
tyk commands show apis list-apis --json
```

Search results are discovery only. Inspect command details before execution.

## Source inputs

The recipe pins the Tyk Gateway OpenAPI spec from:

```text
https://github.com/TykTechnologies/tyk.git   swagger.yml
```

Bump `pinned_tag` in `specs/sources.yaml` when upgrading the Tyk version.
