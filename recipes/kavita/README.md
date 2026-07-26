# Kavita

This recipe generates the `kavita` CLI and agent Skill for
[Kavita](https://github.com/Kareadita/Kavita) reading libraries, series,
collections, and users.

## API and authentication

Create an authentication key in Kavita and store it in the `x-api-key` header:

```sh
kavita auth login --hostname <host> --auth-type apikey
kavita auth status --hostname <host>
```

The default API-key header is case-insensitively equivalent to `x-api-key`.

## Install the Skill

```sh
kavita skill install --scope user --agent codex --yes
```

## Agent workflow

```sh
kavita commands --json
kavita search "get user libraries" --json
```

Use the returned command path with `kavita commands show` before execution.
Bump the pin in `specs/sources.yaml` when upgrading the Kavita API.
