# Module `Trieve API`

## Source

- Backend: `openapi3`
- Default hostname: `api.trieve.ai`
- Repository: `unknown`
- Pinned tag: ``unknown``
- Files: `openapi.json`

## Analytics

### `trieve Trieve API analytics all_events`

- Summary: Get All User Events
- HTTP: `POST /api/analytics/events/all`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags: none
- Output: list path `events`; columns `id`, `created_at`, `dataset_id`, `event_name`, `event_type`, `is_conversion`; response media `application/json`

### `trieve Trieve API analytics analytics`

- Summary: Get Analytics
- HTTP: `POST /api/analytics`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API analytics cluster_analytics`

- Summary: Get Cluster Analytics
- HTTP: `POST /api/analytics/search/cluster`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API analytics component_analytics`

- Summary: Get Component Analytics
- HTTP: `POST /api/analytics/events/component`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API analytics ctr_analytics`

- Summary: Get CTR Analytics
- HTTP: `POST /api/analytics/events/ctr`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API analytics ctr_data`

- Summary: Send CTR Data
- HTTP: `PUT /api/analytics/ctr`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.

### `trieve Trieve API analytics event_by_id`

- Summary: Get User Event By ID
- HTTP: `GET /api/analytics/events/{event_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--event_id` (path, required, uuid): The event id to use for the request
- Output: list path `items`; response media `application/json`

### `trieve Trieve API analytics event_data`

- Summary: Send User Event Data
- HTTP: `PUT /api/analytics/events`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.

### `trieve Trieve API analytics rag_analytics`

- Summary: Get RAG Analytics
- HTTP: `POST /api/analytics/rag`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API analytics rag_query_rating`

- Summary: Rate RAG
- HTTP: `PUT /api/analytics/rag`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.

### `trieve Trieve API analytics recommendation_analytics`

- Summary: Get Recommendation Analytics
- HTTP: `POST /api/analytics/recommendations`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API analytics search_analytics`

- Summary: Get Search Analytics
- HTTP: `POST /api/analytics/search`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API analytics search_query_rating`

- Summary: Rate Search
- HTTP: `PUT /api/analytics/search`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.

### `trieve Trieve API analytics top_datasets`

- Summary: Get Top Datasets
- HTTP: `POST /api/analytics/top`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
- Output: columns `dataset_id`, `dataset_tracking_id`, `total_queries`; response media `application/json`

## Auth

### `trieve Trieve API auth api_only_user`

- Summary: create_api_only_user
- HTTP: `POST /api/auth/create_api_only_user`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `trieve Trieve API auth callback`

- Summary: OpenID Connect callback
- HTTP: `GET /api/auth/callback`
- Auth: required
- Body: none
- Flags: none
- Output: list path `orgs`; columns `name`, `id`, `created_at`, `deleted`, `partner_configuration`, `registerable`; response media `application/json`

### `trieve Trieve API auth login`

- Summary: Login
- HTTP: `GET /api/auth`
- Auth: required
- Body: none
- Flags:
  - `--organization_id` (query, uuid): ID of organization to authenticate into
  - `--redirect_uri` (query): URL to redirect to after successful login
  - `--inv_code` (query, uuid): Code sent via email as a result of successful call to send_invitation

### `trieve Trieve API auth logout`

- Summary: Logout
- HTTP: `DELETE /api/auth`
- Auth: required
- Body: none
- Flags: none

### `trieve Trieve API auth me`

- Summary: Get Me
- HTTP: `GET /api/auth/me`
- Auth: required; scopes: `readonly`
- Body: none
- Flags: none
- Output: list path `orgs`; columns `name`, `id`, `created_at`, `deleted`, `partner_configuration`, `registerable`; response media `application/json`

## Chunk

### `trieve Trieve API chunk autocomplete`

- Summary: Autocomplete
- HTTP: `POST /api/chunk/autocomplete`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--x-api-version` (header): The API version to use for this request. Defaults to V2 for orgs created after July 12, 2024 and V1 otherwise.
- Output: response media `application/json`

### `trieve Trieve API chunk chunk`

- Summary: Create or Upsert Chunk or Chunks
- HTTP: `POST /api/chunk`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API chunk chunk-2`

- Summary: Delete Chunk
- HTTP: `DELETE /api/chunk/{chunk_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--chunk_id` (path, required, uuid): Id of the chunk you want to fetch.

### `trieve Trieve API chunk chunk-3`

- Summary: Update Chunk
- HTTP: `PUT /api/chunk`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.

### `trieve Trieve API chunk chunk_by_id`

- Summary: Get Chunk By Id
- HTTP: `GET /api/chunk/{chunk_id}`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--x-api-version` (header): The API version to use for this request. Defaults to V2 for orgs created after July 12, 2024 and V1 otherwise.
  - `--chunk_id` (path, required, uuid): Id of the chunk you want to fetch.
- Output: response media `application/json`

### `trieve Trieve API chunk chunk_by_tracking_id`

- Summary: Delete Chunk By Tracking Id
- HTTP: `DELETE /api/chunk/tracking_id/{tracking_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--tracking_id` (path, required): tracking_id of the chunk you want to delete

### `trieve Trieve API chunk chunk_by_tracking_id-2`

- Summary: Get Chunk By Tracking Id
- HTTP: `GET /api/chunk/tracking_id/{tracking_id}`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--x-api-version` (header): The API version to use for this request. Defaults to V2 for orgs created after July 12, 2024 and V1 otherwise.
  - `--tracking_id` (path, required): tracking_id of the chunk you want to fetch
- Output: response media `application/json`

### `trieve Trieve API chunk chunk_by_tracking_id-3`

- Summary: Update Chunk By Tracking Id
- HTTP: `PUT /api/chunk/tracking_id/update`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.

### `trieve Trieve API chunk chunks`

- Summary: Count chunks above threshold
- HTTP: `POST /api/chunk/count`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API chunk chunks-2`

- Summary: Search
- HTTP: `POST /api/chunk/search`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--x-api-version` (header): The API version to use for this request. Defaults to V2 for orgs created after July 12, 2024 and V1 otherwise.
- Output: response media `application/json`

### `trieve Trieve API chunk chunks_by_ids`

- Summary: Get Chunks By Ids
- HTTP: `POST /api/chunks`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--x-api-version` (header): The API version to use for this request. Defaults to V2 for orgs created after July 12, 2024 and V1 otherwise.
- Output: response media `application/json`

### `trieve Trieve API chunk chunks_by_tracking_ids`

- Summary: Get Chunks By Tracking Ids
- HTTP: `POST /api/chunks/tracking`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--x-api-version` (header): The API version to use for this request. Defaults to V2 for orgs created after July 12, 2024 and V1 otherwise.
- Output: response media `application/json`

### `trieve Trieve API chunk dataset_chunks`

- Summary: Scroll Chunks
- HTTP: `POST /api/chunks/scroll`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: list path `chunks`; columns `id`, `chunk_html`, `created_at`, `dataset_id`, `link`, `location`; response media `application/json`

### `trieve Trieve API chunk delete_chunk`

- Summary: Bulk Delete Chunks
- HTTP: `DELETE /api/chunk`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.

### `trieve Trieve API chunk html_content`

- Summary: Split HTML Content into Chunks
- HTTP: `POST /api/chunk/split`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: list path `chunks`; columns `body`; response media `application/json`

### `trieve Trieve API chunk off_chunks`

- Summary: RAG on Specified Chunks
- HTTP: `POST /api/chunk/generate`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `text/plain`

### `trieve Trieve API chunk recommended_chunks`

- Summary: Get Recommended Chunks
- HTTP: `POST /api/chunk/recommend`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--x-api-version` (header): The API version to use for this request. Defaults to V2 for orgs created after July 12, 2024 and V1 otherwise.
- Output: response media `application/json`

### `trieve Trieve API chunk suggested_queries`

- Summary: Generate suggested queries
- HTTP: `POST /api/chunk/suggestions`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: list path `queries`; response media `application/json`

## Chunk Group

### `trieve Trieve API chunk chunk_from_group`

- Summary: Remove Chunk from Group
- HTTP: `DELETE /api/chunk_group/chunk/{group_id}`
- Auth: required; scopes: `admin`
- Body: optional; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--group_id` (path, required, uuid): Id of the group you want to remove the chunk from.
  - `--chunk_id` (query, uuid): Id of the chunk you want to remove from the group

### `trieve Trieve API chunk chunk_group`

- Summary: Create or Upsert Group or Groups
- HTTP: `POST /api/chunk_group`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API chunk chunk_group-2`

- Summary: Delete Group
- HTTP: `DELETE /api/chunk_group/{group_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--group_id` (path, required, uuid): Id of the group you want to fetch.
  - `--delete_chunks` (query, required): Delete the chunks within the group

### `trieve Trieve API chunk chunk_group-3`

- Summary: Get Group
- HTTP: `GET /api/chunk_group/{group_id}`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--group_id` (path, required, uuid): Id of the group you want to fetch.
- Output: list path `tag_set`; response media `application/json`

### `trieve Trieve API chunk chunk_group-4`

- Summary: Update Group
- HTTP: `PUT /api/chunk_group`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.

### `trieve Trieve API chunk chunk_to_group`

- Summary: Add Chunk to Group
- HTTP: `POST /api/chunk_group/chunk/{group_id}`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--group_id` (path, required, uuid): Id of the group to add the chunk to as a bookmark

### `trieve Trieve API chunk chunk_to_group_by_tracking_id`

- Summary: Add Chunk to Group by Tracking ID
- HTTP: `POST /api/chunk_group/tracking_id/{tracking_id}`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--tracking_id` (path, required): Tracking id of the group to add the chunk to as a bookmark

### `trieve Trieve API chunk chunks_in_group`

- Summary: Get Chunks in Group
- HTTP: `GET /api/chunk_group/{group_id}/{page}`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--group_id` (path, required, uuid): Id of the group you want to fetch.
  - `--x-api-version` (header): The version of the API to use for the request
  - `--page` (path, required, int64): The page of chunks to get from the group
- Output: response media `application/json`

### `trieve Trieve API chunk chunks_in_group_by_tracking_id`

- Summary: Get Chunks in Group by Tracking ID
- HTTP: `GET /api/chunk_group/tracking_id/{group_tracking_id}/{page}`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--group_tracking_id` (path, required): The id of the group to get the chunks from
  - `--x-api-version` (header): The version of the API to use for the request
  - `--page` (path, required, int64): The page of chunks to get from the group
- Output: response media `application/json`

### `trieve Trieve API chunk group_by_tracking_id`

- Summary: Delete Group by Tracking ID
- HTTP: `DELETE /api/chunk_group/tracking_id/{tracking_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--tracking_id` (path, required): Tracking id of the chunk_group to delete
  - `--delete_chunks` (query, required): Delete the chunks within the group

### `trieve Trieve API chunk group_by_tracking_id-2`

- Summary: Get Group by Tracking ID
- HTTP: `GET /api/chunk_group/tracking_id/{tracking_id}`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--tracking_id` (path, required): The tracking id of the group to fetch.
- Output: list path `tag_set`; response media `application/json`

### `trieve Trieve API chunk group_chunks`

- Summary: Count Chunks in a Group
- HTTP: `POST /api/chunk_group/count`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API chunk groups_for_chunks`

- Summary: Get Groups for Chunks
- HTTP: `POST /api/chunk_group/chunks`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: columns `chunk_uuid`; response media `application/json`

### `trieve Trieve API chunk groups_for_dataset`

- Summary: Get Groups for Dataset
- HTTP: `GET /api/dataset/groups/{dataset_id}/{page}`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--dataset_id` (path, required, uuid): The id of the dataset to fetch groups for.
  - `--page` (path, required, int64): The page of groups to fetch. Page is 1-indexed. Only used if `use_cursor` = `false`.
  - `--use_cursor` (query): Flag to enable `cursor` mode, this runs faster for large scroll operations. Defaults to false
  - `--cursor` (query, uuid): The cursor offset for. Requires `use_cursor` = True. Defaults to `00000000-00000000-00000000-00000000`. Group ids are compared to the cursor using a greater than or equal to.
- Output: list path `groups`; columns `name`, `id`, `created_at`, `dataset_id`, `description`, `file_id`; response media `application/json`; pagination `cursor`

### `trieve Trieve API chunk over_groups`

- Summary: Search Over Groups
- HTTP: `POST /api/chunk_group/group_oriented_search`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--x-api-version` (header): The API version to use for this request. Defaults to V2 for orgs created after July 12, 2024 and V1 otherwise.
- Output: response media `application/json`

### `trieve Trieve API chunk recommended_groups`

- Summary: Get Recommended Groups
- HTTP: `POST /api/chunk_group/recommend`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--x-api-version` (header): The API version to use for this request. Defaults to V2 for orgs created after July 12, 2024 and V1 otherwise.
- Output: response media `application/json`

### `trieve Trieve API chunk search_over_groups`

- Summary: Autocomplete Search Over Groups
- HTTP: `POST /api/chunk_group/group_oriented_autocomplete`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--x-api-version` (header): The API version to use for this request. Defaults to V2 for orgs created after July 12, 2024 and V1 otherwise.
- Output: list path `results`; columns `file_id`; response media `application/json`

### `trieve Trieve API chunk within_group`

- Summary: Search Within Group
- HTTP: `POST /api/chunk_group/search`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--x-api-version` (header): The API version to use for this request. Defaults to V2 for orgs created after July 12, 2024 and V1 otherwise.
- Output: response media `application/json`

## Crawl

### `trieve Trieve API crawl crawl`

- Summary: Create a new crawl request
- HTTP: `POST /api/crawl`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id to use for the request
- Output: response media `application/json`

### `trieve Trieve API crawl crawl_request`

- Summary: Delete a crawl request
- HTTP: `DELETE /api/crawl/{crawl_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id to use for the request
  - `--crawl_id` (path, required, uuid): The id of the crawl to delete

### `trieve Trieve API crawl crawl_request-2`

- Summary: Update a crawl request
- HTTP: `PUT /api/crawl`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id to use for the request
- Output: response media `application/json`

### `trieve Trieve API crawl crawl_requests_for_dataset`

- Summary: Get all crawl requests for a dataset
- HTTP: `GET /api/crawl`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id to use for the request
  - `--page` (query, int64): The page number to retrieve
  - `--limit` (query, int64): The number of items to retrieve per page
- Output: columns `id`, `attempt_number`, `crawl_type`, `created_at`, `dataset_id`, `interval`; response media `application/json`; pagination `offset`

## Dataset

### `trieve Trieve API dataset all_tags`

- Summary: Get All Tags
- HTTP: `POST /api/dataset/get_all_tags`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: list path `tags`; columns `count`, `tag`; response media `application/json`

### `trieve Trieve API dataset create_datasets`

- Summary: Batch Create Datasets
- HTTP: `POST /api/dataset/batch_create_datasets`
- Auth: required; scopes: `owner`
- Body: required; media type `application/json`
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
- Output: columns `name`, `id`, `created_at`, `deleted`, `organization_id`, `server_configuration`; response media `application/json`

### `trieve Trieve API dataset dataset`

- Summary: Clear Dataset
- HTTP: `PUT /api/dataset/clear/{dataset_id}`
- Auth: required; scopes: `owner`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--dataset_id` (path, required, uuid): The id of the dataset you want to clear.

### `trieve Trieve API dataset dataset-2`

- Summary: Clone Dataset
- HTTP: `POST /api/dataset/clone`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
- Output: response media `application/json`

### `trieve Trieve API dataset dataset-3`

- Summary: Create Dataset
- HTTP: `POST /api/dataset`
- Auth: required; scopes: `owner`
- Body: required; media type `application/json`
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
- Output: response media `application/json`

### `trieve Trieve API dataset dataset-4`

- Summary: Delete Dataset
- HTTP: `DELETE /api/dataset/{dataset_id}`
- Auth: required; scopes: `owner`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--dataset_id` (path, required, uuid): The id of the dataset you want to delete.

### `trieve Trieve API dataset dataset-5`

- Summary: Get Dataset By ID
- HTTP: `GET /api/dataset/{dataset_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--dataset_id` (path, required, uuid): The id of the dataset you want to retrieve.
- Output: response media `application/json`

### `trieve Trieve API dataset dataset-6`

- Summary: Update Dataset by ID or Tracking ID
- HTTP: `PUT /api/dataset`
- Auth: required; scopes: `owner`
- Body: required; media type `application/json`
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
- Output: response media `application/json`

### `trieve Trieve API dataset dataset_by_tracking_id`

- Summary: Delete Dataset by Tracking ID
- HTTP: `DELETE /api/dataset/tracking_id/{tracking_id}`
- Auth: required; scopes: `owner`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--tracking_id` (path, required): The tracking id of the dataset you want to delete.

### `trieve Trieve API dataset dataset_by_tracking_id-2`

- Summary: Get Dataset by Tracking ID
- HTTP: `GET /api/dataset/tracking_id/{tracking_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
  - `--tracking_id` (path, required): The tracking id of the dataset you want to retrieve.
- Output: response media `application/json`

### `trieve Trieve API dataset dataset_queue_lengths`

- Summary: Get file and chunk creation queue lengths
- HTTP: `GET /api/dataset/get_dataset_queue_lengths`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API dataset datasets_from_organization`

- Summary: Get Datasets from Organization
- HTTP: `GET /api/dataset/organization/{organization_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
  - `--organization_id` (path, required, uuid): id of the organization you want to retrieve datasets for
  - `--limit` (query, int64): The number of records to return
  - `--offset` (query, int64): The number of records to skip
- Output: response media `application/json`; pagination `offset`

### `trieve Trieve API dataset etl_job`

- Summary: Create ETL Job
- HTTP: `POST /api/etl/create_job`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id to use for the request

### `trieve Trieve API dataset events`

- Summary: Get events for the dataset
- HTTP: `POST /api/dataset/events`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: list path `event_types`; response media `application/json`

### `trieve Trieve API dataset pagefind_index_for_dataset`

- Summary: Create Pagefind Index for Dataset
- HTTP: `PUT /api/dataset/pagefind`
- Auth: required; scopes: `owner`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.

### `trieve Trieve API dataset pagefind_index_for_dataset-2`

- Summary: Get Pagefind Index Url for Dataset
- HTTP: `GET /api/dataset/pagefind`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API dataset usage_by_dataset_id`

- Summary: Get Usage By Dataset ID
- HTTP: `GET /api/dataset/usage/{dataset_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--dataset_id` (path, required, uuid): The id of the dataset you want to retrieve usage for.
- Output: response media `application/json`

## Experiment

### `trieve Trieve API experiment experiment`

- Summary: Create Experiment
- HTTP: `POST /api/experiment`
- Auth: required; scopes: `owner`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id to use for the request
- Output: response media `application/json`

### `trieve Trieve API experiment experiment-2`

- Summary: Delete Experiment
- HTTP: `DELETE /api/experiment/{experiment_id}`
- Auth: required; scopes: `owner`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id to use for the request
  - `--experiment_id` (path, required, uuid): experiment_id

### `trieve Trieve API experiment experiment-3`

- Summary: Get Experiment by ID
- HTTP: `GET /api/experiment/{experiment_id}`
- Auth: required; scopes: `owner`
- Body: none
- Flags:
  - `--experiment_id` (path, required, uuid): The experiment id to use for the request
  - `--tr-dataset` (header, required, uuid): The dataset id to use for the request
- Output: response media `application/json`

### `trieve Trieve API experiment experiment-4`

- Summary: Update Experiment
- HTTP: `PUT /api/experiment`
- Auth: required; scopes: `owner`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id to use for the request
- Output: response media `application/json`

### `trieve Trieve API experiment experiments`

- Summary: Get Experiments
- HTTP: `GET /api/experiment`
- Auth: required; scopes: `owner`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id to use for the request
- Output: columns `name`, `id`, `area`, `control_name`, `control_split`, `created_at`; response media `application/json`

### `trieve Trieve API experiment test`

- Summary: Ab Test
- HTTP: `POST /api/experiment/ab-test`
- Auth: required; scopes: `owner`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id to use for the request
- Output: response media `application/json`

## File

### `trieve Trieve API file dataset_files_and_group_ids_handler`

- Summary: Get Files and Group IDs for Dataset
- HTTP: `GET /api/dataset/files/{dataset_id}/{page}`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--dataset_id` (path, required, uuid): The id of the dataset to fetch files for.
  - `--page` (path, required, int64): The page number of files you wish to fetch. Each page contains at most 10 files.
- Output: list path `file_and_group_ids`; columns `group_id`; response media `application/json`

### `trieve Trieve API file file_handler`

- Summary: Delete File
- HTTP: `DELETE /api/file/{file_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--file_id` (path, required, uuid): The id of the file to delete
  - `--delete_chunks` (query, required): Delete the chunks within the group

### `trieve Trieve API file file_handler-2`

- Summary: Get File with Signed URL
- HTTP: `GET /api/file/{file_id}`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--file_id` (path, required, uuid): The id of the file to fetch
  - `--ttl` (query, int32): The time to live of the signed url in seconds
  - `--content_type` (query): Optional field to override the presigned url's Content-Type header
- Output: list path `tag_set`; response media `application/json`

### `trieve Trieve API file file_handler-3`

- Summary: Upload File
- HTTP: `POST /api/file`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API file files_cursor_handler`

- Summary: Scroll Files with Groups
- HTTP: `GET /api/dataset/scroll_files`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--cursor` (query, uuid): The cursor to fetch files from. If not specified, will fetch from the beginning. File ids are compared to the cursor using a greater than or equal to.
  - `--page_size` (query, int64): The page size of files you wish to fetch. Defaults to 10.
- Output: list path `file_with_chunk_groups`; columns `id`, `created_at`, `dataset_id`, `file_name`, `link`, `metadata`; response media `application/json`; pagination `cursor`

### `trieve Trieve API file html_page`

- Summary: Upload HTML Page
- HTTP: `POST /api/file/html_page`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `trieve Trieve API file presigned_url_for_csv_jsonl`

- Summary: Create Presigned CSV/JSONL S3 PUT URL
- HTTP: `POST /api/file/csv_or_jsonl`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

## Health

### `trieve Trieve API health check`

- Summary: Health Check
- HTTP: `GET /api/health`
- Auth: required
- Body: none
- Flags: none

## Invitation

### `trieve Trieve API invitation invitation`

- Summary: Delete Invitation
- HTTP: `DELETE /api/invitation/{invitation_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
  - `--invitation_id` (path, required, uuid): The id of the invitation to delete

### `trieve Trieve API invitation invitation-2`

- Summary: Send Invitation
- HTTP: `POST /api/invitation`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request

### `trieve Trieve API invitation invitations`

- Summary: Get Invitations
- HTTP: `GET /api/invitations/{organization_id}`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
  - `--organization_id` (path, required, uuid): The organization id to get invitations for
- Output: columns `id`, `created_at`, `email`, `organization_id`, `role`, `updated_at`; response media `application/json`

## Message

### `trieve Trieve API message all_topic_messages`

- Summary: Get all messages for a given topic
- HTTP: `GET /api/messages/{messages_topic_id}`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--messages_topic_id` (path, required, uuid): The ID of the topic to get messages for.
- Output: columns `id`, `completion_tokens`, `content`, `created_at`, `dataset_id`, `deleted`; response media `application/json`

### `trieve Trieve API message audio`

- Summary: Transcribe Audio
- HTTP: `POST /api/message/transcribe_audio`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `text/plain`

### `trieve Trieve API message image`

- Summary: Edit Image
- HTTP: `POST /api/message/edit_image`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: list path `image_urls`; response media `application/json`

### `trieve Trieve API message message`

- Summary: Create message
- HTTP: `POST /api/message`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `text/plain`

### `trieve Trieve API message message-2`

- Summary: Edit message
- HTTP: `PUT /api/message`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.

### `trieve Trieve API message message-3`

- Summary: Regenerate message
- HTTP: `DELETE /api/message`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `text/plain`

### `trieve Trieve API message message_by_id`

- Summary: Get a message by its ID
- HTTP: `GET /api/message/{message_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--message_id` (path, required, uuid): The ID of the message to get.
- Output: response media `application/json`

### `trieve Trieve API message message_completions`

- Summary: Generate Message Completions
- HTTP: `POST /api/message/generate_message_completions`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `text/plain`

### `trieve Trieve API message message_patch`

- Summary: Regenerate message
- HTTP: `PATCH /api/message`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `text/plain`

### `trieve Trieve API message tool_function_params`

- Summary: Get tool function parameters
- HTTP: `POST /api/message/get_tool_function_params`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

## Metrics

### `trieve Trieve API metrics metrics`

- Summary: Get Prometheus Metrics
- HTTP: `POST /metrics`
- Auth: required
- Body: none
- Flags: none
- Output: response media `text/plain`

## Organization

### `trieve Trieve API organization all_org_dataset_configs`

- Summary: Update All Dataset Configurations
- HTTP: `POST /api/organization/update_dataset_configs`
- Auth: required; scopes: `owner`
- Body: required; media type `application/json`
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request

### `trieve Trieve API organization organization`

- Summary: Create Organization
- HTTP: `POST /api/organization`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `trieve Trieve API organization organization-2`

- Summary: Delete Organization
- HTTP: `DELETE /api/organization/{organization_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
  - `--organization_id` (path, required, uuid): The id of the organization you want to fetch.

### `trieve Trieve API organization organization-3`

- Summary: Get Organization
- HTTP: `GET /api/organization/{organization_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
  - `--organization_id` (path, required, uuid): The id of the organization you want to fetch.
- Output: response media `application/json`

### `trieve Trieve API organization organization-4`

- Summary: Update Organization
- HTTP: `PUT /api/organization`
- Auth: required; scopes: `owner`
- Body: required; media type `application/json`
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
- Output: response media `application/json`

### `trieve Trieve API organization organization_api_key`

- Summary: Create Organization Api Key
- HTTP: `POST /api/organization/api_key`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request.
- Output: response media `application/json`

### `trieve Trieve API organization organization_api_key-2`

- Summary: Delete Organization Api Key
- HTTP: `DELETE /api/organization/api_key/{api_key_id}`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--api_key_id` (path, required, uuid): The id of the api key to delete
  - `--tr-organization` (header, required, uuid): The organization id to use for the request.

### `trieve Trieve API organization organization_api_keys`

- Summary: Get Organization Api Keys
- HTTP: `GET /api/organization/api_key`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request.
  - `--cursor` (query): The cursor to start the pagination from.
  - `--limit` (query, int32): The number of items to return per page.
- Output: columns `name`, `id`, `created_at`, `organization_id`, `role`, `updated_at`; response media `application/json`; pagination `cursor`

### `trieve Trieve API organization organization_usage`

- Summary: Get Organization Usage
- HTTP: `POST /api/organization/usage/{organization_id}`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
  - `--organization_id` (path, required, uuid): The id of the organization you want to fetch the usage of.
- Output: response media `application/json`

### `trieve Trieve API organization organization_users`

- Summary: Get Organization Users
- HTTP: `GET /api/organization/users/{organization_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
  - `--organization_id` (path, required, uuid): The id of the organization you want to fetch the users of.
- Output: columns `name`, `id`, `created_at`, `email`; response media `application/json`

## Public

### `trieve Trieve API public page`

- Summary: public_page
- HTTP: `GET /api/public_page/{dataset_id}`
- Auth: required
- Body: none
- Flags:
  - `--dataset_id` (path, required): The id or tracking_id of the dataset you want to get the demo page for.

### `trieve Trieve API public shopify_user_event`

- Summary: Send a Shopify user event
- HTTP: `POST /api/shopify/user_event`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

## Shopify

### `trieve Trieve API shopify shopify_plan_change`

- Summary: handle_shopify_plan_change
- HTTP: `POST /api/shopify/plan_change`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

## Stripe

### `trieve Trieve API stripe all_invoices`

- Summary: Get All Invoices
- HTTP: `GET /api/stripe/invoices/{organization_id}`
- Auth: required; scopes: `owner`
- Body: none
- Flags:
  - `--organization_id` (path, required, uuid): The id of the organization to get invoices for.
- Output: columns `id`, `created_at`, `hosted_invoice_url`, `org_id`, `status`, `stripe_id`; response media `application/json`

### `trieve Trieve API stripe all_plans`

- Summary: Get All Plans
- HTTP: `GET /api/stripe/plans`
- Auth: required
- Body: none
- Flags: none
- Output: columns `name`, `id`, `amount`, `chunk_count`, `created_at`, `dataset_count`; response media `application/json`

### `trieve Trieve API stripe all_usage_plans`

- Summary: Get All Usage Plans
- HTTP: `GET /api/stripe/usage_plans`
- Auth: required
- Body: none
- Flags: none
- Output: columns `name`, `id`, `analytics_events_price_id`, `bytes_ingested_price_id`, `chunks_stored_price_id`, `created_at`; response media `application/json`

### `trieve Trieve API stripe bill_from_range`

- Summary: Estimate Bill From Range
- HTTP: `GET /api/stripe/estimate_bill/{plan_id}`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--plan_id` (path, required, uuid): plan_id
- Output: list path `items`; columns `name`, `amount`, `clean_name`, `usage_amount`; response media `application/json`

### `trieve Trieve API stripe payment_method`

- Summary: Update Payment Method
- HTTP: `POST /api/stripe/checkout/setup/{organization_id}`
- Auth: required; scopes: `owner`
- Body: none
- Flags:
  - `--organization_id` (path, required, uuid): The id of the organization to create setup checkout session for.
- Output: response media `application/json`

### `trieve Trieve API stripe subscription`

- Summary: Cancel Subscription
- HTTP: `DELETE /api/stripe/subscription/{subscription_id}`
- Auth: required; scopes: `owner`
- Body: none
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
  - `--subscription_id` (path, required, uuid): id of the subscription you want to cancel

### `trieve Trieve API stripe subscription_plan`

- Summary: Update Subscription Plan
- HTTP: `PATCH /api/stripe/subscription_plan/{subscription_id}/{plan_id}`
- Auth: required; scopes: `owner`
- Body: none
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request
  - `--subscription_id` (path, required, uuid): id of the subscription you want to update
  - `--plan_id` (path, required, uuid): id of the plan you want to subscribe to

### `trieve Trieve API stripe to_payment_link`

- Summary: Checkout
- HTTP: `GET /api/stripe/payment_link/{plan_id}/{organization_id}`
- Auth: required
- Body: none
- Flags:
  - `--plan_id` (path, required, uuid): id of the plan you want to subscribe to
  - `--organization_id` (path, required, uuid): id of the organization you want to subscribe to the plan

## Topic

### `trieve Trieve API topic all_topics_for_owner_id`

- Summary: Get All Topics for Owner ID
- HTTP: `GET /api/topic/owner/{owner_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--owner_id` (path, required): The owner_id to get topics of; A common approach is to use a browser fingerprint or your user's id
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: columns `name`, `id`, `created_at`, `dataset_id`, `deleted`, `owner_id`; response media `application/json`

### `trieve Trieve API topic topic`

- Summary: Clone Topic
- HTTP: `POST /api/topic/clone`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API topic topic-2`

- Summary: Create Topic
- HTTP: `POST /api/topic`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
- Output: response media `application/json`

### `trieve Trieve API topic topic-3`

- Summary: Delete Topic
- HTTP: `DELETE /api/topic/{topic_id}`
- Auth: required; scopes: `admin`
- Body: none
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.
  - `--topic_id` (path, required, uuid): The id of the topic you want to delete.

### `trieve Trieve API topic topic-4`

- Summary: Update Topic
- HTTP: `PUT /api/topic`
- Auth: required; scopes: `admin`
- Body: required; media type `application/json`
- Flags:
  - `--tr-dataset` (header, required, uuid): The dataset id or tracking_id to use for the request. We assume you intend to use an id if the value is a valid uuid.

## User

### `trieve Trieve API user user`

- Summary: Update User Org Role
- HTTP: `PUT /api/user`
- Auth: required; scopes: `readonly`
- Body: required; media type `application/json`
- Flags:
  - `--tr-organization` (header, required, uuid): The organization id to use for the request

### `trieve Trieve API user user_api_key`

- Summary: Delete User Api Key
- HTTP: `DELETE /api/user/api_key/{api_key_id}`
- Auth: required; scopes: `readonly`
- Body: none
- Flags:
  - `--api_key_id` (path, required, uuid): The id of the api key to delete

### `trieve Trieve API user user_api_keys`

- Summary: Get User Api Keys
- HTTP: `GET /api/user/api_key`
- Auth: required; scopes: `readonly`
- Body: none
- Flags: none
- Output: columns `name`, `id`, `created_at`, `organization_id`, `role`, `updated_at`; response media `application/json`
