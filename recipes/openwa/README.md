# OpenWA

This recipe generates the `openwa` CLI and agent Skill for
[OpenWA](https://github.com/rmyndharis/OpenWA) WhatsApp sessions, messages,
groups, contacts, and webhooks.

## API and authentication

Use an administrator API key in the `X-API-Key` header:

```sh
openwa auth login --hostname <host> --auth-type apikey
openwa auth status --hostname <host>
```

The default API-key header is `X-API-Key`. A viewer or session-scoped key cannot
pass the administrator settings check used during login.

## Install the Skill

```sh
openwa skill install --scope user --agent codex --yes
```

## Agent workflow

```sh
openwa commands --json
openwa search "send message" --json
```

Use the returned command path with `openwa commands show` before execution.
Bump the release pin in
`specs/sources.yaml` when upgrading the OpenWA API.
