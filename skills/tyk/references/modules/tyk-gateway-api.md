# Module `Tyk Gateway API`

## Source

- Backend: `openapi3`
- Repository: `unknown`
- Pinned tag: ``unknown``
- Files: `swagger.yml`

## APIs

### `tyk apis create-api`

- Summary: Create an API
- HTTP: `POST /tyk/apis`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--base_api_id` (query): The base API which the new version will be linked to.
  - `--base_api_version_name` (query): The version name of the base API while creating the first version. This doesn't have to be sent for the next versions but if it is set, it will override base API version name.
  - `--new_version_name` (query): The version name of the created version.
  - `--set_default` (query): If true, the new version is set as default version.
- Output: response media `application/json`

### `tyk apis delete-api`

- Summary: Deleting an API definition with ID.
- HTTP: `DELETE /tyk/apis/{apiID}`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): The API ID.
- Output: response media `application/json`

### `tyk apis get-api`

- Summary: Get API definition with it's ID.
- HTTP: `GET /tyk/apis/{apiID}`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): The API ID.
- Output: list path `allowed_ips`; response media `application/json`

### `tyk apis list-api-versions`

- Summary: Listing versions of an API.
- HTTP: `GET /tyk/apis/{apiID}/versions`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): The API ID.
- Output: list path `apis`; columns `name`, `id`, `expirationDate`, `internal`, `isDefaultVersion`, `versionName`; response media `application/json`

### `tyk apis list-apis`

- Summary: Get list of apis
- HTTP: `GET /tyk/apis`
- Auth: required
- Body: none
- Flags: none
- Output: columns `name`, `id`, `active`, `api_id`, `base_identity_provided_by`, `certificate_pinning_disabled`; response media `application/json`

### `tyk apis update-api`

- Summary: Updating an API definition with its ID.
- HTTP: `PUT /tyk/apis/{apiID}`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--api-id` (path, required): The API ID.
- Output: response media `application/json`

## Batch requests

### `tyk batch batch`

- Summary: Run batch request.
- HTTP: `POST /{listen_path}/tyk/batch`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--listen_path` (path, required): API listen path
- Output: columns `body`, `code`, `relative_url`; response media `application/json`

## Cache Invalidation

### `tyk cache invalidate-cache`

- Summary: Invalidate cache.
- HTTP: `DELETE /tyk/cache/{apiID}`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): The API ID.
- Output: response media `application/json`

## Certs

### `tyk certs add-cert`

- Summary: Add a certificate.
- HTTP: `POST /tyk/certs`
- Auth: required
- Body: optional; media type `text/plain`
- Flags:
  - `--org_id` (query): Organisation ID to add the certificate to.
- Output: response media `application/json`

### `tyk certs delete-certs`

- Summary: Delete certificate.
- HTTP: `DELETE /tyk/certs/{certID}`
- Auth: required
- Body: none
- Flags:
  - `--cert-id` (path, required): Certificate ID to be deleted.
  - `--org_id` (query): Organisation ID to delete the certificates from.
- Output: response media `application/json`

### `tyk certs list-certs`

- Summary: List certificates.
- HTTP: `GET /tyk/certs`
- Auth: required
- Body: none
- Flags:
  - `--org_id` (query): Organisation ID to list the certificates.
  - `--mode` (query, one of: detailed): Mode to list the certificate details.
- Output: response media `application/json`

### `tyk certs list-certs-with-i-ds`

- Summary: Return one certificate or list multiple certificates in the Tyk Gateway given a comma separated list of cert IDs.
- HTTP: `GET /tyk/certs/{certID}`
- Auth: required
- Body: none
- Flags:
  - `--cert-id` (path, required): Comma separated list of certificates to list.
- Output: response media `application/json`

## Debug

### `tyk debug debug-api-definition`

- Summary: Test a Tyk Classic or Tyk OAS API definition.
- HTTP: `POST /tyk/debug`
- Auth: required
- Body: optional; media type `application/json`
- Flags: none
- Output: response media `application/json`

## Health Checking

### `tyk health hello`

- Summary: Check the health of the Tyk Gateway.
- HTTP: `GET /hello`
- Auth: required
- Body: none
- Flags: none
- Output: response media `application/json`

## Hot Reload

### `tyk hot hot-reload`

- Summary: Hot-reload a single node.
- HTTP: `GET /tyk/reload`
- Auth: required
- Body: none
- Flags:
  - `--block` (query): Block a response until the reload is performed. This can be useful in scripting environments like CI/CD workflows.
- Output: response media `application/json`

### `tyk hot hot-reload-group`

- Summary: Hot-reload a group of Tyk nodes.
- HTTP: `GET /tyk/reload/group`
- Auth: required
- Body: none
- Flags: none
- Output: response media `application/json`

## JWK cache invalidation

### `tyk jwk invalidate-jwk-cache`

- Summary: Invalidate cache for given API ID.
- HTTP: `DELETE /tyk/cache/jwks/{apiID}`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): The API ID.
- Output: response media `application/json`

### `tyk jwk invalidate-jwk-cache-for-all-ap-is`

- Summary: Invalidate JWK cache for all APIs
- HTTP: `DELETE /tyk/cache/jwks`
- Auth: required
- Body: none
- Flags: none
- Output: response media `application/json`

## Keys

### `tyk keys add-key`

- Summary: Create a key.
- HTTP: `POST /tyk/keys`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--hashed` (query): When set to true the key_hash returned will be similar to the un-hashed key name.
- Output: response media `application/json`

### `tyk keys create-custom-key`

- Summary: Create custom key / Import key
- HTTP: `POST /tyk/keys/{keyID}`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--suppress_reset` (query, one of: 1): Adding the suppress_reset parameter and setting it to 1, will cause Tyk not to reset the quota limit that is in the current live quota manager. By default Tyk will reset the quota in the live quota manager (initialising it) when adding a key. Adding the `suppress_reset` flag to the URL parameters will avoid this behaviour.
  - `--hashed` (query): When set to true the key_hash returned will be similar to the un-hashed key name.
  - `--key-id` (path, required): Name to give the custom key.
- Output: response media `application/json`

### `tyk keys create-key`

- Summary: Create a key.
- HTTP: `POST /tyk/keys/create`
- Auth: required
- Body: optional; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `tyk keys delete-key`

- Summary: Delete a key.
- HTTP: `DELETE /tyk/keys/{keyID}`
- Auth: required
- Body: none
- Flags:
  - `--hashed` (query): Use the hash of the key as input instead of the full key.
  - `--key-id` (path, required): The key ID.
- Output: response media `application/json`

### `tyk keys get-key`

- Summary: Get a key with ID.
- HTTP: `GET /tyk/keys/{keyID}`
- Auth: required
- Body: none
- Flags:
  - `--hashed` (query): Use the hash of the key as input instead of the full key.
  - `--key-id` (path, required): The key ID.
- Output: list path `apply_policies`; response media `application/json`

### `tyk keys list-keys`

- Summary: List keys.
- HTTP: `GET /tyk/keys`
- Auth: required
- Body: none
- Flags: none
- Output: list path `keys`; response media `application/json`

### `tyk keys set-policies-to-hashed-key`

- Summary: Set policies for a hashed key.
- HTTP: `POST /tyk/keys/policy/{keyID}`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--key-id` (path, required): Name to give the custom key.
- Output: response media `application/json`

### `tyk keys update-key`

- Summary: Update key.
- HTTP: `PUT /tyk/keys/{keyID}`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--suppress_reset` (query, one of: 1): Adding the suppress_reset parameter and setting it to 1 will cause Tyk not to reset the quota limit that is in the current live quota manager. By default Tyk will reset the quota in the live quota manager (initialising it) when adding a key. Adding the `suppress_reset` flag to the URL parameters will avoid this behaviour.
  - `--hashed` (query): When set to true the key_hash returned will be similar to the un-hashed key name.
  - `--key-id` (path, required): ID of the key you want to update.
- Output: response media `application/json`

### `tyk keys validate-a-key-definition`

- Summary: This will validate a key definition.
- HTTP: `POST /tyk/keys/preview`
- Auth: required
- Body: optional; media type `application/json`
- Flags: none
- Output: list path `apply_policies`; response media `application/json`

## MCP Proxies

### `tyk mcp create-mcp`

- Summary: Create an MCP Proxy definition.
- HTTP: `POST /tyk/mcps`
- Auth: required
- Body: optional; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `tyk mcp delete-mcp`

- Summary: Delete an MCP Proxy definition.
- HTTP: `DELETE /tyk/mcps/{apiID}`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): The MCP Proxy definition ID.
- Output: response media `application/json`

### `tyk mcp get-mcp`

- Summary: Get an MCP Proxy definition.
- HTTP: `GET /tyk/mcps/{apiID}`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): The MCP Proxy definition ID.
- Output: response media `application/json`

### `tyk mcp list-mc-ps`

- Summary: List MCP Proxy definitions.
- HTTP: `GET /tyk/mcps`
- Auth: required
- Body: none
- Flags: none
- Output: response media `application/json`

### `tyk mcp update-mcp`

- Summary: Update an MCP Proxy definition.
- HTTP: `PUT /tyk/mcps/{apiID}`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--api-id` (path, required): The MCP Proxy definition ID.
- Output: response media `application/json`

## OAuth

### `tyk oauth create-o-auth-client`

- Summary: Create new OAuth client
- HTTP: `POST /tyk/oauth/clients/create`
- Auth: required
- Body: optional; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `tyk oauth delete-o-auth-client`

- Summary: Delete OAuth client
- HTTP: `DELETE /tyk/oauth/clients/{apiID}/{keyName}`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): The API id
  - `--key-name` (path, required): The Client ID
- Output: response media `application/json`

### `tyk oauth get-apis-for-oauth-app`

- Summary: Get API IDs for APIS that use the specified client_id(appID) for OAuth
- HTTP: `GET /tyk/oauth/clients/apis/{appID}`
- Auth: required
- Body: none
- Flags:
  - `--app-id` (path, required): The Client ID
  - `--org-id` (query): The Org Id
- Output: response media `application/json`

### `tyk oauth get-o-auth-client`

- Summary: Get OAuth client
- HTTP: `GET /tyk/oauth/clients/{apiID}/{keyName}`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): The API id
  - `--key-name` (path, required): The Client ID
- Output: response media `application/json`

### `tyk oauth get-o-auth-client-tokens`

- Summary: List tokens for a provided API ID and OAuth-client ID
- HTTP: `GET /tyk/oauth/clients/{apiID}/{keyName}/tokens`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): The API id
  - `--key-name` (path, required): The Client ID
  - `--page` (query, default `1`): Use page query parameter to say which page number you want returned.
- Output: response media `application/json`; pagination `offset`

### `tyk oauth invalidate-o-auth-refresh`

- Summary: Invalidate OAuth refresh token
- HTTP: `DELETE /tyk/oauth/refresh/{keyName}`
- Auth: required
- Body: none
- Flags:
  - `--key-name` (path, required): The Client ID
  - `--api_id` (query, required): The API id
- Output: response media `application/json`

### `tyk oauth list-o-auth-clients`

- Summary: List oAuth clients
- HTTP: `GET /tyk/oauth/clients/{apiID}`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): The API ID
- Output: columns `api_id`, `client_id`, `description`, `policy_id`, `redirect_uri`, `secret`; response media `application/json`

### `tyk oauth purge-lapsed-o-auth-tokens`

- Summary: Purge lapsed OAuth tokens
- HTTP: `DELETE /tyk/oauth/tokens`
- Auth: required
- Body: none
- Flags:
  - `--scope` (query, required, one of: lapsed): purge lapsed tokens
- Output: response media `application/json`

### `tyk oauth revoke-all-tokens`

- Summary: Revoke all client's tokens
- HTTP: `POST /tyk/oauth/revoke_all`
- Auth: required
- Body: optional; media type `application/x-www-form-urlencoded`
- Flags: none
- Output: response media `application/json`

### `tyk oauth revoke-single-token`

- Summary: revoke token
- HTTP: `POST /tyk/oauth/revoke`
- Auth: required
- Body: optional; media type `application/x-www-form-urlencoded`
- Flags: none
- Output: response media `application/json`

### `tyk oauth rotate-oauth-client`

- Summary: Rotate the oath client secret
- HTTP: `PUT /tyk/oauth/clients/{apiID}/{keyName}/rotate`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): The API id
  - `--key-name` (path, required): The Client ID
- Output: response media `application/json`

### `tyk oauth update-o-auth-client`

- Summary: Update OAuth metadata,redirecturi,description and Policy ID
- HTTP: `PUT /tyk/oauth/clients/{apiID}/{keyName}`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--api-id` (path, required): The API id
  - `--key-name` (path, required): The Client ID
- Output: response media `application/json`

## Organisation Quotas

### `tyk organisation add-org-key`

- Summary: Create an organisation key
- HTTP: `POST /tyk/org/keys/{keyID}`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--key-id` (path, required): The Key ID
  - `--reset_quota` (query, one of: 1): Adding the reset_quota parameter and setting it to 1, will cause Tyk reset the organisations quota in the live quota manager, it is recommended to use this mechanism to reset organisation-level access if a monthly subscription is in place.
- Output: response media `application/json`

### `tyk organisation delete-org-key`

- Summary: Delete Key
- HTTP: `DELETE /tyk/org/keys/{keyID}`
- Auth: required
- Body: none
- Flags:
  - `--key-id` (path, required): The Key ID
- Output: response media `application/json`

### `tyk organisation get-org-key`

- Summary: Get an Organisation Key
- HTTP: `GET /tyk/org/keys/{keyID}`
- Auth: required
- Body: none
- Flags:
  - `--org-id` (query): The Org ID
  - `--key-id` (path, required): The Key ID
- Output: list path `apply_policies`; response media `application/json`

### `tyk organisation list-org-keys`

- Summary: List Organisation Keys
- HTTP: `GET /tyk/org/keys`
- Auth: required
- Body: none
- Flags:
  - `--filter` (query): Retrieves all keys starting with the specified filter(filter is a prefix - e.g. default* or default will return all keys starting with default like defaultbd,defaulttwo etc).We don't use filter for hashed keys
- Output: list path `keys`; response media `application/json`

### `tyk organisation update-org-key`

- Summary: Update Organisation Key
- HTTP: `PUT /tyk/org/keys/{keyID}`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--reset_quota` (query, one of: 1): Adding the reset_quota parameter and setting it to 1, will cause Tyk reset the organisations quota in the live quota manager, it is recommended to use this mechanism to reset organisation-level access if a monthly subscription is in place.
  - `--key-id` (path, required): The Key ID
- Output: response media `application/json`

## Policies

### `tyk policies add-policy`

- Summary: Create a policy.
- HTTP: `POST /tyk/policies`
- Auth: required
- Body: optional; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `tyk policies delete-policy`

- Summary: Delete a policy.
- HTTP: `DELETE /tyk/policies/{polID}`
- Auth: required
- Body: none
- Flags:
  - `--pol-id` (path, required): You can retrieve details of a single policy by ID in your Tyk instance.
- Output: response media `application/json`

### `tyk policies get-policy`

- Summary: Get a policy.
- HTTP: `GET /tyk/policies/{polID}`
- Auth: required
- Body: none
- Flags:
  - `--pol-id` (path, required): You can retrieve details of a single policy by ID in your Tyk instance.
- Output: list path `tags`; response media `application/json`

### `tyk policies list-policies`

- Summary: List policies.
- HTTP: `GET /tyk/policies`
- Auth: required
- Body: none
- Flags: none
- Output: columns `name`, `id`, `_id`, `active`, `enable_http_signature_validation`, `hmac_enabled`; response media `application/json`

### `tyk policies update-policy`

- Summary: Update a policy.
- HTTP: `PUT /tyk/policies/{polID}`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--pol-id` (path, required): You can retrieve details of a single policy by ID in your Tyk instance.
- Output: response media `application/json`

## Schema

### `tyk schema get-schema`

- Summary: Get OAS schema.
- HTTP: `GET /tyk/schema`
- Auth: required
- Body: none
- Flags:
  - `--oas-version` (query): The OAS version to fetch.
- Output: response media `application/json`

## Tyk OAS APIs

### `tyk tyk create-api-oas`

- Summary: Create an API with Tyk OAS format.
- HTTP: `POST /tyk/apis/oas`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--base_api_id` (query): The base API which the new version will be linked to.
  - `--base_api_version_name` (query): The version name of the base API while creating the first version. This doesn't have to be sent for the next versions but if it is set, it will override base API version name.
  - `--new_version_name` (query): The version name of the created version.
  - `--set_default` (query): If true, the new version is set as default version.
- Output: response media `application/json`

### `tyk tyk delete-oas-api`

- Summary: Deleting a Tyk OAS API.
- HTTP: `DELETE /tyk/apis/oas/{apiID}`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): The API ID.
- Output: response media `application/json`

### `tyk tyk download-api-oas-public`

- Summary: Download a Tyk OAS format API.
- HTTP: `GET /tyk/apis/oas/{apiID}/export`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): ID of the API you want to fetch.
  - `--mode` (query, one of: public): By default mode is empty which means it will return the Tyk API OAS spec including the x-tyk-api-gateway part.
- Output: response media `application/octet-stream`

### `tyk tyk download-apis-oas-public`

- Summary: Download all Tyk OAS format APIs.
- HTTP: `GET /tyk/apis/oas/export`
- Auth: required
- Body: none
- Flags:
  - `--mode` (query, one of: public): By default mode is empty which means it will return the Tyk API OAS spec including the x-tyk-api-gateway part.
- Output: response media `application/octet-stream`

### `tyk tyk get-oas-api`

- Summary: Get a Tyk OAS API definition.
- HTTP: `GET /tyk/apis/oas/{apiID}`
- Auth: required
- Body: none
- Flags:
  - `--mode` (query, one of: public): By default mode is empty which means it will return the Tyk API OAS spec including the x-tyk-api-gateway part.
  - `--api-id` (path, required): ID of the API you want to fetch
- Output: response media `application/json`

### `tyk tyk import-oas`

- Summary: Import an API in Tyk OAS format.
- HTTP: `POST /tyk/apis/oas/import`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--base_api_id` (query): The base API which the new version will be linked to.
  - `--base_api_version_name` (query): The version name of the base API while creating the first version. This doesn't have to be sent for the next versions but if it is set, it will override base API version name.
  - `--new_version_name` (query): The version name of the created version.
  - `--set_default` (query): If true, the new version is set as default version.
- Output: response media `application/json`

### `tyk tyk list-apis-oas`

- Summary: List all APIs in Tyk OAS API format.
- HTTP: `GET /tyk/apis/oas`
- Auth: required
- Body: none
- Flags:
  - `--mode` (query, one of: public): By default mode is empty which means it will return the Tyk API OAS spec including the x-tyk-api-gateway part.
- Output: response media `application/json`

### `tyk tyk list-oas-api-versions`

- Summary: Listing versions of a Tyk OAS API.
- HTTP: `GET /tyk/apis/oas/{apiID}/versions`
- Auth: required
- Body: none
- Flags:
  - `--api-id` (path, required): ID of the API you want to fetch.
- Output: list path `apis`; columns `name`, `id`, `expirationDate`, `internal`, `isDefaultVersion`, `versionName`; response media `application/json`

### `tyk tyk patch-api-oas`

- Summary: Patch API in Tyk OAS format.
- HTTP: `PATCH /tyk/apis/oas/{apiID}`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--api-id` (path, required): ID of the API you want to fetch.
- Output: response media `application/json`

### `tyk tyk update-api-oas`

- Summary: Update a Tyk OAS API definition.
- HTTP: `PUT /tyk/apis/oas/{apiID}`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--api-id` (path, required): ID of the API you want to fetch
- Output: response media `application/json`
