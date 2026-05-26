# DaoCloud Enterprise

This recipe generates the `dc` CLI and agent Skill for DaoCloud Enterprise APIs.

The recipe is extracted from the generated
[`DaoCloud/daocloud-skills`](https://github.com/DaoCloud/daocloud-skills)
project and keeps only the reproducible Lathe inputs.

## Modules

- `global-management`: users, groups, workspaces, roles, and audit APIs.
- `container-management`: clusters, namespaces, workloads, and storage APIs.
- `insight`: observability APIs.

## Auth

The generated CLI requires a reachable DCE instance.

Use the generated auth command before executing API operations:

```sh
dc auth login --hostname https://<dce-host>
```

Agents should inspect auth state before executing commands whose catalog detail
has `auth.required=true`:

```sh
dc auth status --hostname https://<dce-host>
```

## Agent workflow

```sh
dc commands schema --json
dc commands --json
dc search "list clusters" --json
dc commands show container-management cluster list-clusters --json
```

Search results are discovery only. Inspect command details before execution.

## Source inputs

The recipe pins DaoCloud OpenAPI specs from:

```text
https://github.com/DaoCloud/daocloud-api-docs.git
```

Recipe overlays live under `overlays/` and are codegen-time polish only.
