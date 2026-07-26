# Grafana

This recipe generates the `grafana` CLI and agent Skill for
[Grafana](https://github.com/grafana/grafana) dashboards, data sources, alerts,
service accounts, and administration APIs.

## API and authentication

Create a Grafana service-account token:

```sh
grafana auth login --hostname <host>
grafana auth status --hostname <host>
```

The login check resolves the current authenticated Grafana user.

## Install the Skill

```sh
grafana skill install --scope user --agent codex --yes
```

## Agent workflow

```sh
grafana commands --json
grafana search "list public dashboards" --json
```

Use the returned command path with `grafana commands show` before execution.
Bump the pin in `specs/sources.yaml` when upgrading the Grafana HTTP API.
