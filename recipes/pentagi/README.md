# PentAGI

This recipe generates the `pentagi` CLI and agent Skill for the
[PentAGI](https://github.com/vxcontrol/pentagi) autonomous penetration-testing
platform.

## API and authentication

The recipe uses PentAGI's native Swagger API. It intentionally excludes the
bundled third-party Langfuse specification.

PentAGI uses a bearer access token:

```sh
pentagi auth login --hostname <host>
pentagi auth status --hostname <host>
```

## Install the Skill

```sh
pentagi skill install --scope user --agent codex --yes
```

## Agent workflow

```sh
pentagi commands --json
pentagi search "list flow tasks" --json
```

Use the returned command path with `pentagi commands show` before execution.
Bump the pin in
`specs/sources.yaml` when upgrading the PentAGI API.
