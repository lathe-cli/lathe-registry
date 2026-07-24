---
name: superset
description: >
  Use when operating the superset generated CLI. Discover commands, inspect parameters,
  check auth state, and execute API operations safely.
---

# superset CLI

Use this skill when a user asks you to operate `superset`, inspect its API commands, or find the right generated command for an API task.

## Workflow

1. Search for candidates with `superset search "<intent>" --json`; use `--limit` when needed. Search is only candidate discovery.
2. Inspect the exact command with `superset commands show <path...> --json` before executing an unfamiliar command.
3. If the command detail has `auth.required=true`, run `superset auth status --hostname <host>` before execution. Use `http.default_hostname` when present unless the user provides `--hostname` or `$SUPERSET_HOST`.
4. Execute only after flags, body, auth, HTTP path, and output hints are clear from `commands show`.

## General Commands

- `superset commands --json`: full generated command catalog.
- `superset commands --include-hidden --json`: include hidden generated commands.
- `superset commands show <path...> --json`: source of truth for one command.
- `superset commands schema --json`: catalog schema version for parser compatibility.
- `superset search "<intent>" --json`: ranked candidate commands.

## Maintenance Commands

- `superset --version` or `superset -v`: print CLI build version.

## References

- Read `references/catalog.md` for the command discovery protocol and catalog field meanings.
- Read `references/modules/superset.md` for the `superset` module command index.

## Rules

- Do not guess flags or request body shape from command names.
- Do not execute directly from search results; confirm with `commands show` first.
- Prefer `-o json` for machine-readable command output unless the user asks for human-readable output.
- Use `--file`, `--set`, or `--set-str` for JSON request bodies according to `commands show` body requirements.
- For sensitive flags, prefer safe modes from `flags[].input_modes`: `--<flag>-env`, `--<flag>-file`, or `--<flag>-stdin`.
