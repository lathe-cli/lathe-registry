# SigNoz

This recipe generates the `signoz` CLI and agent Skill for
[SigNoz](https://github.com/SigNoz/signoz) dashboards, alerts, traces, logs,
metrics, and related observability APIs.

## API and authentication

Create a SigNoz API key and use the `SigNoz-Api-Key` header:

```sh
signoz auth login --hostname <host> --auth-type apikey
signoz auth status --hostname <host>
```

Enter `SigNoz-Api-Key` when the login command asks for the header name.

## Install the Skill

```sh
signoz skill install --scope user --agent codex --yes
```

## Agent workflow

```sh
signoz commands --json
signoz search "list dashboards" --json
```

Use the returned command path with `signoz commands show` before execution.
Bump the pin in `specs/sources.yaml` when upgrading the SigNoz API.
