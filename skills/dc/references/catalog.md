# Catalog Protocol

Use the runtime catalog as the source of truth. Generated references are a fast index; command execution details come from the CLI itself.

## Search

Run `dc search "<intent>" --json` to find candidate commands. Use `--limit` to control result count. Treat search output as candidates only.

## Full Catalog

Run `dc commands --json` to inspect the generated command catalog. Use `--include-hidden` only when hidden commands are relevant.

Key fields:

- `path`: command path to pass to `commands show` or execute after the CLI name.
- `http`: HTTP method and path template.
- `flags`: CLI flags, parameter location, type, required state, defaults, enum values, format, and help.
- `body`: request body requirement and media type.
- `auth`: whether auth is required and which scopes are declared.
- `output`: list path, default columns, response media type, pagination, and streaming hints.

## Command Detail

Run `dc commands show <path...> --json` before executing an unfamiliar command. This is the source of truth for flags, body, auth, HTTP path, and output hints.

## Schema

Run `dc commands schema --json` to read the catalog schema version before parsing catalog JSON with durable tooling.

## Request Bodies

- `--file path`: read a JSON body from a file.
- `--file -`: read a JSON body from stdin.
- `--set key.path=value`: build JSON with type inference for booleans, null, integers, and floats.
- `--set-str key.path=value`: build JSON while forcing the value to remain a string.

## Output

Use `-o json` for machine-readable command output. Other supported formats are `table`, `yaml`, and `raw`.

## Auth

If command detail returns `auth.required=true`, run `dc auth status --hostname <host>` before execution. If no matching host is logged in, stop and ask the user to authenticate.
