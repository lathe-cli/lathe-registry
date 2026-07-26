# Owncast

This recipe generates the `owncast` CLI and agent Skill for
[Owncast](https://github.com/owncast/owncast) live-stream administration,
webhooks, and integrations.

## API and authentication

Owncast admin endpoints use HTTP Basic authentication. Use the admin username
and stream key:

```sh
owncast auth login --hostname <host> --auth-type basic
owncast auth status --hostname <host>
```

## Install the Skill

```sh
owncast skill install --scope user --agent codex --yes
```

## Agent workflow

```sh
owncast commands --json
owncast search "list webhooks" --json
```

Use the returned command path with `owncast commands show` before execution.
Bump the pin in `specs/sources.yaml` when upgrading the Owncast API.
