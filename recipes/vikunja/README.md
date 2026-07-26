# Vikunja

This recipe generates the `vikunja` CLI and agent Skill for
[Vikunja](https://github.com/go-vikunja/vikunja) tasks, projects, labels,
teams, and users.

## API and authentication

Create a Vikunja API token:

```sh
vikunja auth login --hostname <host>
vikunja auth status --hostname <host>
```

The token is sent as a bearer credential and checked against the current-user
endpoint.

## Install the Skill

```sh
vikunja skill install --scope user --agent codex --yes
```

## Agent workflow

```sh
vikunja commands --json
vikunja search "get user information" --json
```

Use the returned command path with `vikunja commands show` before execution.
Bump the pin in `specs/sources.yaml` when upgrading the Vikunja API.
