# Gitea

This recipe generates the `gitea` CLI and agent Skill for
[Gitea](https://github.com/go-gitea/gitea): repositories, issues, pull
requests, releases, organizations, packages, Actions, notifications, and site
administration. It covers all 537 operations in the v28.3.0 API.

## API and authentication

Create an application token under **Settings → Applications** in the web UI,
with the scopes you need (`read:repository`, `write:issue`, …). Site
administration commands require an account with administrator rights.

```sh
gitea auth login --hostname <host> --with-token
gitea auth status --hostname <host>
```

Gitea accepts both `Authorization: token <token>` and
`Authorization: Bearer <token>`, so the default bearer auth works as-is.

## Why `base_path` is required

Gitea does not commit a ready-to-use API spec. It commits a **build-time
template**: `templates/swagger/v1-swagger.generated.json` carries a placeholder
prefix,

```json
{ "basePath": "/GITEA-API-APP-SUBURL/api/v1" }
```

which the server substitutes with the instance's sub-URL at request time.
Generating from that file without an override produces paths like
`/GITEA-API-APP-SUBURL/api/v1/repos/{owner}/{repo}`, which cannot be called.

The recipe sets `base_path: /api/v1`, which replaces the prefix and yields the
correct `/api/v1/...` paths. **Removing it breaks the generated CLI**, so keep
it when bumping the pin.

This needs lathe 0.7.0 or newer ([lathe-cli/lathe#233]).

## Install the Skill

```sh
gitea skill install --scope user --agent codex --yes
```

## Agent workflow

```sh
gitea commands --json
gitea search "list issues" --json
gitea commands show gitea_api issue issue-list-issues --json
```

Read the contract with `commands show` before executing. Mutating commands
report `mutation: write` and support `--dry-run`, which prints the resolved
method, URL and body without sending the request.

## Upgrading

Bump `pinned_tag` in `specs/sources.yaml` when moving to a newer Gitea
release, and update the `as of` date. Check that the spec still carries the
placeholder prefix; if a future release ships a real spec, `base_path` can be
dropped.

[lathe-cli/lathe#233]: https://github.com/lathe-cli/lathe/pull/233
