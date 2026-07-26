# Apache Answer

This recipe generates the `answer` CLI and agent Skill for
[Apache Answer](https://github.com/apache/answer) questions, answers, users,
notifications, moderation, and site administration.

## API and authentication

Use an Apache Answer access token or API key:

```sh
answer auth login --hostname <host>
answer auth status --hostname <host>
```

The login check uses an authenticated notification endpoint. The public
current-user endpoint is intentionally not used because it returns HTTP 200 for
anonymous requests.

## Install the Skill

```sh
answer skill install --scope user --agent codex --yes
```

## Agent workflow

```sh
answer commands --json
answer search "list questions" --json
```

Use the returned command path with `answer commands show` before execution.
Bump the release pin in
`specs/sources.yaml` when upgrading the Apache Answer API.
