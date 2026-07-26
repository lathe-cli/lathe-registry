# Coolify

This recipe generates the `coolify` CLI and agent Skill for
[Coolify](https://github.com/coollabsio/coolify) applications, servers,
deployments, databases, and teams.

## API and authentication

Create an API token in Coolify:

```sh
coolify auth login --hostname <host>
coolify auth status --hostname <host>
```

Use `app.coolify.io` for Coolify Cloud or the hostname of a self-hosted
instance.

## Install the Skill

```sh
coolify skill install --scope user --agent codex --yes
```

## Agent workflow

```sh
coolify commands --json
coolify search "list applications" --json
```

Use the returned command path with `coolify commands show` before execution.
Bump the pin in `specs/sources.yaml` when upgrading the Coolify API.
