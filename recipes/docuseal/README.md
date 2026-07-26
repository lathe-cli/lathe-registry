# DocuSeal

This recipe generates the `docuseal` CLI and agent Skill for
[DocuSeal](https://github.com/docusealco/docuseal) templates, submissions, and
document-signing workflows.

## API and authentication

Create an API key in DocuSeal, then authenticate with the `X-Auth-Token` header:

```sh
docuseal auth login --hostname api.docuseal.com --auth-type apikey
docuseal auth status --hostname api.docuseal.com
```

Enter `X-Auth-Token` when the login command asks for the header name.

## Install the Skill

```sh
docuseal skill install --scope user --agent codex --yes
```

## Agent workflow

```sh
docuseal commands --json
docuseal search "list templates" --json
```

Use the returned command path with `docuseal commands show` before execution.
Bump the release pin in
`specs/sources.yaml` when upgrading the DocuSeal API.
