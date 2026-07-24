# Module `superset`

## Source

- Backend: `openapi3`
- Repository: https://github.com/apache/superset.git
- Pinned tag: `3bdf134aaa2f3cc34739964f7c276506949f0653`
- Files: `docs/static/resources/openapi.json`
- Resolved SHA: `3bdf134aaa2f3cc34739964f7c276506949f0653`

## Advanced Data Type

### `superset superset advanced get-api-v1advanceddatatype-convert`

- Summary: Return an AdvancedDataTypeResponse
- HTTP: `GET /api/v1/advanced_data_type/convert`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `valid_filter_operators`; response media `application/json`

### `superset superset advanced get-api-v1advanceddatatype-types`

- Summary: Return a list of available advanced data types
- HTTP: `GET /api/v1/advanced_data_type/types`
- Auth: required
- Body: none
- Flags: none
- Output: list path `result`; response media `application/json`

## Annotation Layers

### `superset superset annotation delete-api-v1annotationlayer`

- Summary: Delete multiple annotation layers in a bulk operation
- HTTP: `DELETE /api/v1/annotation_layer/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset annotation delete-api-v1annotationlayer-pk`

- Summary: Delete annotation layer (annotation-layer-pk)
- HTTP: `DELETE /api/v1/annotation_layer/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The annotation layer pk for this annotation
- Output: response media `application/json`

### `superset superset annotation delete-api-v1annotationlayer-pk-annotation`

- Summary: Bulk delete annotation layers
- HTTP: `DELETE /api/v1/annotation_layer/{pk}/annotation/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The annotation layer pk for this annotation
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset annotation delete-api-v1annotationlayer-pk-annotation-annotationid`

- Summary: Delete annotation layer (annotation-layer-pk-annotation-annotation-id)
- HTTP: `DELETE /api/v1/annotation_layer/{pk}/annotation/{annotation_id}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The annotation layer pk for this annotation
  - `--annotation_id` (path, required): The annotation pk for this annotation
- Output: response media `application/json`

### `superset superset annotation get-api-v1annotationlayer`

- Summary: Get a list of annotation layers (annotation-layer)
- HTTP: `GET /api/v1/annotation_layer/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset annotation get-api-v1annotationlayer-info`

- Summary: Get metadata information about this API resource (annotation-layer--info)
- HTTP: `GET /api/v1/annotation_layer/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset annotation get-api-v1annotationlayer-pk`

- Summary: Get an annotation layer (annotation-layer-pk)
- HTTP: `GET /api/v1/annotation_layer/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset annotation get-api-v1annotationlayer-pk-annotation`

- Summary: Get a list of annotation layers (annotation-layer-pk-annotation)
- HTTP: `GET /api/v1/annotation_layer/{pk}/annotation/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The annotation layer id for this annotation
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset annotation get-api-v1annotationlayer-pk-annotation-annotationid`

- Summary: Get an annotation layer (annotation-layer-pk-annotation-annotation-id)
- HTTP: `GET /api/v1/annotation_layer/{pk}/annotation/{annotation_id}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The annotation layer pk for this annotation
  - `--annotation_id` (path, required): The annotation pk
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset annotation get-api-v1annotationlayer-related-columnname`

- Summary: Get related fields data (annotation-layer-related-column-name)
- HTTP: `GET /api/v1/annotation_layer/related/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`, `value`; response media `application/json`

### `superset superset annotation post-api-v1annotationlayer`

- Summary: Create an annotation layer (annotation-layer)
- HTTP: `POST /api/v1/annotation_layer/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset annotation post-api-v1annotationlayer-pk-annotation`

- Summary: Create an annotation layer (annotation-layer-pk-annotation)
- HTTP: `POST /api/v1/annotation_layer/{pk}/annotation/`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): The annotation layer pk for this annotation

### `superset superset annotation put-api-v1annotationlayer-pk`

- Summary: Update an annotation layer (annotation-layer-pk)
- HTTP: `PUT /api/v1/annotation_layer/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): The annotation layer pk for this annotation
- Output: response media `application/json`

### `superset superset annotation put-api-v1annotationlayer-pk-annotation-annotationid`

- Summary: Update an annotation layer (annotation-layer-pk-annotation-annotation-id)
- HTTP: `PUT /api/v1/annotation_layer/{pk}/annotation/{annotation_id}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): The annotation layer pk for this annotation
  - `--annotation_id` (path, required): The annotation pk for this annotation
- Output: response media `application/json`

## AsyncEventsRestApi

### `superset superset asynceventsrestapi get-api-v1asyncevent`

- Summary: Read off of the Redis events stream
- HTTP: `GET /api/v1/async_event/`
- Auth: required
- Body: none
- Flags:
  - `--last_id` (query): Last ID received by the client
- Output: list path `result`; response media `application/json`

## Available Domains

### `superset superset available get-api-v1availabledomains`

- Summary: Get all available domains
- HTTP: `GET /api/v1/available_domains/`
- Auth: required
- Body: none
- Flags: none
- Output: response media `application/json`

## CSS Templates

### `superset superset css delete-api-v1csstemplate`

- Summary: Bulk delete CSS templates
- HTTP: `DELETE /api/v1/css_template/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset css delete-api-v1csstemplate-pk`

- Summary: Delete a CSS template
- HTTP: `DELETE /api/v1/css_template/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset css get-api-v1csstemplate`

- Summary: Get a list of CSS templates
- HTTP: `GET /api/v1/css_template/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset css get-api-v1csstemplate-info`

- Summary: Get metadata information about this API resource (css-template--info)
- HTTP: `GET /api/v1/css_template/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset css get-api-v1csstemplate-pk`

- Summary: Get a CSS template
- HTTP: `GET /api/v1/css_template/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset css get-api-v1csstemplate-related-columnname`

- Summary: Get related fields data (css-template-related-column-name)
- HTTP: `GET /api/v1/css_template/related/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`, `value`; response media `application/json`

### `superset superset css post-api-v1csstemplate`

- Summary: Create a CSS template
- HTTP: `POST /api/v1/css_template/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset css put-api-v1csstemplate-pk`

- Summary: Update a CSS template
- HTTP: `PUT /api/v1/css_template/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

## CacheRestApi

### `superset superset cacherestapi post-api-v1cachekey-invalidate`

- Summary: Invalidate cache records and remove the database records
- HTTP: `POST /api/v1/cachekey/invalidate`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

## Charts

### `superset superset charts delete-api-v1chart`

- Summary: Bulk delete charts
- HTTP: `DELETE /api/v1/chart/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset charts delete-api-v1chart-pk`

- Summary: Delete a chart
- HTTP: `DELETE /api/v1/chart/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset charts delete-api-v1chart-pk-favorites`

- Summary: Remove the chart from the user favorite list
- HTTP: `DELETE /api/v1/chart/{pk}/favorites/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset charts get-api-v1chart`

- Summary: Get a list of charts
- HTTP: `GET /api/v1/chart/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset charts get-api-v1chart-data-cachekey`

- Summary: Return payload data response for the given query (chart-data-cache-key)
- HTTP: `GET /api/v1/chart/data/{cache_key}`
- Auth: required
- Body: none
- Flags:
  - `--cache_key` (path, required): cache_key
- Output: list path `result`; columns `cache_key`, `cache_timeout`, `cached_dttm`, `detected_currency`, `error`, `from_dttm`; response media `application/json`

### `superset superset charts get-api-v1chart-export`

- Summary: Download multiple charts as YAML files
- HTTP: `GET /api/v1/chart/export/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/zip`

### `superset superset charts get-api-v1chart-favoritestatus`

- Summary: Check favorited charts for current user
- HTTP: `GET /api/v1/chart/favorite_status/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `result`; columns `id`, `value`; response media `application/json`

### `superset superset charts get-api-v1chart-idoruuid`

- Summary: Get a chart detail information
- HTTP: `GET /api/v1/chart/{id_or_uuid}`
- Auth: required
- Body: none
- Flags:
  - `--id_or_uuid` (path, required): Either the id of the chart, or its uuid
- Output: response media `application/json`

### `superset superset charts get-api-v1chart-info`

- Summary: Get metadata information about this API resource (chart--info)
- HTTP: `GET /api/v1/chart/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset charts get-api-v1chart-pk-cachescreenshot`

- Summary: Compute and cache a screenshot (chart-pk-cache-screenshot)
- HTTP: `GET /api/v1/chart/{pk}/cache_screenshot/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset charts get-api-v1chart-pk-data`

- Summary: Return payload data response for a chart
- HTTP: `GET /api/v1/chart/{pk}/data/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The chart ID
  - `--format` (query): The format in which the data should be returned
  - `--type` (query): The type in which the data should be returned
  - `--force` (query): Should the queries be forced to load from the source
- Output: list path `result`; columns `cache_key`, `cache_timeout`, `cached_dttm`, `detected_currency`, `error`, `from_dttm`; response media `application/json`

### `superset superset charts get-api-v1chart-pk-screenshot-digest`

- Summary: Get a computed screenshot from cache (chart-pk-screenshot-digest)
- HTTP: `GET /api/v1/chart/{pk}/screenshot/{digest}/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--digest` (path, required): digest
- Output: response media `image/*`

### `superset superset charts get-api-v1chart-pk-thumbnail-digest`

- Summary: Get chart thumbnail
- HTTP: `GET /api/v1/chart/{pk}/thumbnail/{digest}/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--digest` (path, required): A hex digest that makes this chart unique
- Output: response media `image/*`

### `superset superset charts get-api-v1chart-related-columnname`

- Summary: Get related fields data (chart-related-column-name)
- HTTP: `GET /api/v1/chart/related/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`, `value`; response media `application/json`

### `superset superset charts post-api-v1chart`

- Summary: Create a new chart
- HTTP: `POST /api/v1/chart/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset charts post-api-v1chart-data`

- Summary: Return payload data response for the given query (chart-data)
- HTTP: `POST /api/v1/chart/data`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: list path `result`; columns `cache_key`, `cache_timeout`, `cached_dttm`, `detected_currency`, `error`, `from_dttm`; response media `application/json`

### `superset superset charts post-api-v1chart-import`

- Summary: Import chart(s) with associated datasets and databases
- HTTP: `POST /api/v1/chart/import/`
- Auth: required
- Body: required; media type `multipart/form-data`
- Flags: none
- Output: response media `application/json`

### `superset superset charts post-api-v1chart-pk-favorites`

- Summary: Mark the chart as favorite for the current user
- HTTP: `POST /api/v1/chart/{pk}/favorites/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset charts put-api-v1chart-pk`

- Summary: Update a chart
- HTTP: `PUT /api/v1/chart/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset charts put-api-v1chart-warmupcache`

- Summary: Warm up the cache for the chart
- HTTP: `PUT /api/v1/chart/warm_up_cache`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: list path `result`; columns `chart_id`, `viz_error`, `viz_status`; response media `application/json`

## Current User

### `superset superset current get-api-v1me`

- Summary: Get the user object
- HTTP: `GET /api/v1/me/`
- Auth: required
- Body: none
- Flags: none
- Output: response media `application/json`

### `superset superset current get-api-v1me-roles`

- Summary: Get the user roles
- HTTP: `GET /api/v1/me/roles/`
- Auth: required
- Body: none
- Flags: none
- Output: response media `application/json`

### `superset superset current put-api-v1me`

- Summary: Update the current user
- HTTP: `PUT /api/v1/me/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: response media `application/json`

## Dashboard Filter State

### `superset superset dashboard delete-api-v1dashboard-pk-filterstate-key`

- Summary: Delete a dashboard's filter state value
- HTTP: `DELETE /api/v1/dashboard/{pk}/filter_state/{key}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--key` (path, required): The value key.
- Output: response media `application/json`

### `superset superset dashboard get-api-v1dashboard-pk-filterstate-key`

- Summary: Get a dashboard's filter state value
- HTTP: `GET /api/v1/dashboard/{pk}/filter_state/{key}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--key` (path, required): key
- Output: response media `application/json`

### `superset superset dashboard post-api-v1dashboard-pk-filterstate`

- Summary: Create a dashboard's filter state
- HTTP: `POST /api/v1/dashboard/{pk}/filter_state`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
  - `--tab_id` (query): tab_id

### `superset superset dashboard put-api-v1dashboard-pk-filterstate-key`

- Summary: Update a dashboard's filter state value
- HTTP: `PUT /api/v1/dashboard/{pk}/filter_state/{key}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
  - `--key` (path, required): key
  - `--tab_id` (query): tab_id
- Output: response media `application/json`

## Dashboard Permanent Link

### `superset superset dashboard get-api-v1dashboard-permalink-key`

- Summary: Get dashboard's permanent link state
- HTTP: `GET /api/v1/dashboard/permalink/{key}`
- Auth: required
- Body: none
- Flags:
  - `--key` (path, required): key
- Output: response media `application/json`

### `superset superset dashboard post-api-v1dashboard-pk-permalink`

- Summary: Create a new dashboard's permanent link
- HTTP: `POST /api/v1/dashboard/{pk}/permalink`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk

## Dashboards

### `superset superset dashboards dashboard_by_id_or_slug_embedded`

- Summary: Update dashboard by id_or_slug embedded
- HTTP: `PUT /api/v1/dashboard/{id_or_slug}/embedded`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--id_or_slug` (path, required): The dashboard id or slug
- Output: response media `application/json`

### `superset superset dashboards delete-api-v1dashboard`

- Summary: Bulk delete dashboards
- HTTP: `DELETE /api/v1/dashboard/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset dashboards delete-api-v1dashboard-idorslug-embedded`

- Summary: Delete a dashboard's embedded configuration
- HTTP: `DELETE /api/v1/dashboard/{id_or_slug}/embedded`
- Auth: required
- Body: none
- Flags:
  - `--id_or_slug` (path, required): The dashboard id or slug
- Output: response media `application/json`

### `superset superset dashboards delete-api-v1dashboard-pk`

- Summary: Delete a dashboard
- HTTP: `DELETE /api/v1/dashboard/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset dashboards delete-api-v1dashboard-pk-favorites`

- Summary: Remove the dashboard from the user favorite list
- HTTP: `DELETE /api/v1/dashboard/{pk}/favorites/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset dashboards get-api-v1dashboard`

- Summary: Get a list of dashboards
- HTTP: `GET /api/v1/dashboard/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset dashboards get-api-v1dashboard-export`

- Summary: Download multiple dashboards as YAML files
- HTTP: `GET /api/v1/dashboard/export/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `text/plain`

### `superset superset dashboards get-api-v1dashboard-favoritestatus`

- Summary: Check favorited dashboards for current user
- HTTP: `GET /api/v1/dashboard/favorite_status/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `result`; columns `id`, `value`; response media `application/json`

### `superset superset dashboards get-api-v1dashboard-idorslug`

- Summary: Get a dashboard detail information
- HTTP: `GET /api/v1/dashboard/{id_or_slug}`
- Auth: required
- Body: none
- Flags:
  - `--id_or_slug` (path, required): Either the id of the dashboard, or its slug
- Output: response media `application/json`

### `superset superset dashboards get-api-v1dashboard-idorslug-charts`

- Summary: Get a dashboard's chart definitions.
- HTTP: `GET /api/v1/dashboard/{id_or_slug}/charts`
- Auth: required
- Body: none
- Flags:
  - `--id_or_slug` (path, required): id_or_slug
- Output: list path `result`; columns `id`, `cache_timeout`, `certification_details`, `certified_by`, `changed_on`, `description`; response media `application/json`

### `superset superset dashboards get-api-v1dashboard-idorslug-datasets`

- Summary: Get dashboard's datasets
- HTTP: `GET /api/v1/dashboard/{id_or_slug}/datasets`
- Auth: required
- Body: none
- Flags:
  - `--id_or_slug` (path, required): Either the id of the dashboard, or its slug
- Output: list path `result`; columns `name`, `type`, `id`, `uid`, `always_filter_main_dttm`, `cache_timeout`; response media `application/json`

### `superset superset dashboards get-api-v1dashboard-idorslug-embedded`

- Summary: Get the dashboard's embedded configuration
- HTTP: `GET /api/v1/dashboard/{id_or_slug}/embedded`
- Auth: required
- Body: none
- Flags:
  - `--id_or_slug` (path, required): The dashboard id or slug
- Output: response media `application/json`

### `superset superset dashboards get-api-v1dashboard-idorslug-tabs`

- Summary: Get dashboard's tabs
- HTTP: `GET /api/v1/dashboard/{id_or_slug}/tabs`
- Auth: required
- Body: none
- Flags:
  - `--id_or_slug` (path, required): Either the id of the dashboard, or its slug
- Output: response media `application/json`

### `superset superset dashboards get-api-v1dashboard-info`

- Summary: Get metadata information about this API resource (dashboard--info)
- HTTP: `GET /api/v1/dashboard/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset dashboards get-api-v1dashboard-pk-exportasexample`

- Summary: Export dashboard as example bundle
- HTTP: `GET /api/v1/dashboard/{pk}/export_as_example/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The dashboard id
  - `--export_data` (query, default `true`): Whether to include Parquet data files
  - `--sample_rows` (query): Limit data export to this many rows per dataset
- Output: response media `application/zip`

### `superset superset dashboards get-api-v1dashboard-pk-screenshot-digest`

- Summary: Get a computed screenshot from cache (dashboard-pk-screenshot-digest)
- HTTP: `GET /api/v1/dashboard/{pk}/screenshot/{digest}/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--digest` (path, required): digest
  - `--download_format` (query, one of: png|pdf): download_format
- Output: response media `image/*`

### `superset superset dashboards get-api-v1dashboard-pk-thumbnail-digest`

- Summary: Get dashboard's thumbnail
- HTTP: `GET /api/v1/dashboard/{pk}/thumbnail/{digest}/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--digest` (path, required): A hex digest that makes this dashboard unique
- Output: response media `image/*`

### `superset superset dashboards get-api-v1dashboard-related-columnname`

- Summary: Get related fields data (dashboard-related-column-name)
- HTTP: `GET /api/v1/dashboard/related/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`, `value`; response media `application/json`

### `superset superset dashboards post-api-v1dashboard`

- Summary: Create a new dashboard
- HTTP: `POST /api/v1/dashboard/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset dashboards post-api-v1dashboard-idorslug-copy`

- Summary: Create a copy of an existing dashboard
- HTTP: `POST /api/v1/dashboard/{id_or_slug}/copy/`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--id_or_slug` (path, required): The dashboard id or slug
- Output: response media `application/json`

### `superset superset dashboards post-api-v1dashboard-idorslug-embedded`

- Summary: Set a dashboard's embedded configuration
- HTTP: `POST /api/v1/dashboard/{id_or_slug}/embedded`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--id_or_slug` (path, required): The dashboard id or slug
- Output: response media `application/json`

### `superset superset dashboards post-api-v1dashboard-import`

- Summary: Import dashboard(s) with associated charts/datasets/databases
- HTTP: `POST /api/v1/dashboard/import/`
- Auth: required
- Body: required; media type `multipart/form-data`
- Flags: none
- Output: response media `application/json`

### `superset superset dashboards post-api-v1dashboard-pk-cachedashboardscreenshot`

- Summary: Compute and cache a screenshot (dashboard-pk-cache-dashboard-screenshot)
- HTTP: `POST /api/v1/dashboard/{pk}/cache_dashboard_screenshot/`
- Auth: required
- Body: optional; media type `application/json`
- Flags:
  - `--pk` (path, required): pk

### `superset superset dashboards post-api-v1dashboard-pk-favorites`

- Summary: Mark the dashboard as favorite for the current user
- HTTP: `POST /api/v1/dashboard/{pk}/favorites/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset dashboards put-api-v1dashboard-pk`

- Summary: Update a dashboard
- HTTP: `PUT /api/v1/dashboard/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset dashboards put-api-v1dashboard-pk-chartcustomizations`

- Summary: Update chart customizations configuration for a dashboard.
- HTTP: `PUT /api/v1/dashboard/{pk}/chart_customizations`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset dashboards put-api-v1dashboard-pk-colors`

- Summary: Update colors configuration for a dashboard.
- HTTP: `PUT /api/v1/dashboard/{pk}/colors`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
  - `--mark_updated` (query): mark_updated
- Output: response media `application/json`

### `superset superset dashboards put-api-v1dashboard-pk-filters`

- Summary: Update native filters configuration for a dashboard.
- HTTP: `PUT /api/v1/dashboard/{pk}/filters`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

## Database

### `superset superset database delete-api-v1database-pk`

- Summary: Delete a database
- HTTP: `DELETE /api/v1/database/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset database get-api-v1database`

- Summary: Get a list of databases
- HTTP: `GET /api/v1/database/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset database get-api-v1database-available`

- Summary: Get names of databases currently available
- HTTP: `GET /api/v1/database/available/`
- Auth: required
- Body: none
- Flags: none
- Output: response media `application/json`

### `superset superset database get-api-v1database-export`

- Summary: Download database(s) and associated dataset(s) as a zip file
- HTTP: `GET /api/v1/database/export/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/zip`

### `superset superset database get-api-v1database-info`

- Summary: Get metadata information about this API resource (database--info)
- HTTP: `GET /api/v1/database/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset database get-api-v1database-oauth2`

- Summary: Receive personal access tokens from OAuth2
- HTTP: `GET /api/v1/database/oauth2/`
- Auth: required
- Body: none
- Flags:
  - `--state` (query): state
  - `--code` (query): code
  - `--scope` (query): scope
  - `--error` (query): error
- Output: response media `text/html`

### `superset superset database get-api-v1database-pk`

- Summary: Get a database
- HTTP: `GET /api/v1/database/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The database id
- Output: response media `application/json`

### `superset superset database get-api-v1database-pk-catalogs`

- Summary: Get all catalogs from a database
- HTTP: `GET /api/v1/database/{pk}/catalogs/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The database id
  - `--q` (query): q
- Output: list path `result`; response media `application/json`

### `superset superset database get-api-v1database-pk-connection`

- Summary: Get a database connection info
- HTTP: `GET /api/v1/database/{pk}/connection`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The database id
- Output: response media `application/json`

### `superset superset database get-api-v1database-pk-functionnames`

- Summary: Get function names supported by a database
- HTTP: `GET /api/v1/database/{pk}/function_names/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: list path `function_names`; response media `application/json`

### `superset superset database get-api-v1database-pk-relatedobjects`

- Summary: Get charts and dashboards count associated to a database
- HTTP: `GET /api/v1/database/{pk}/related_objects/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset database get-api-v1database-pk-schemas`

- Summary: Get all schemas from a database
- HTTP: `GET /api/v1/database/{pk}/schemas/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The database id
  - `--q` (query): q
- Output: list path `result`; response media `application/json`

### `superset superset database get-api-v1database-pk-schemasaccessforfileupload`

- Summary: The list of the database schemas where to upload information
- HTTP: `GET /api/v1/database/{pk}/schemas_access_for_file_upload/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: list path `schemas`; response media `application/json`

### `superset superset database get-api-v1database-pk-selectstar-tablename`

- Summary: Get database select star for table (database-pk-select-star-table-name)
- HTTP: `GET /api/v1/database/{pk}/select_star/{table_name}/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The database id
  - `--table_name` (path, required): Table name
  - `--schema_name` (path, required): Table schema
- Output: response media `application/json`

### `superset superset database get-api-v1database-pk-selectstar-tablename-schemaname`

- Summary: Get database select star for table (database-pk-select-star-table-name-schema-name)
- HTTP: `GET /api/v1/database/{pk}/select_star/{table_name}/{schema_name}/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The database id
  - `--table_name` (path, required): Table name
  - `--schema_name` (path, required): Table schema
- Output: response media `application/json`

### `superset superset database get-api-v1database-pk-table-tablename-schemaname`

- Summary: Get database table metadata
- HTTP: `GET /api/v1/database/{pk}/table/{table_name}/{schema_name}/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The database id
  - `--table_name` (path, required): Table name
  - `--schema_name` (path, required): Table schema
- Output: list path `columns`; columns `name`, `type`, `duplicates_constraint`, `longType`; response media `application/json`

### `superset superset database get-api-v1database-pk-tableextra-tablename-schemaname`

- Summary: Get table extra metadata (database-pk-table-extra-table-name-schema-name)
- HTTP: `GET /api/v1/database/{pk}/table_extra/{table_name}/{schema_name}/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The database id
  - `--table_name` (path, required): Table name
  - `--schema_name` (path, required): Table schema
- Output: response media `application/json`

### `superset superset database get-api-v1database-pk-tablemetadata`

- Summary: Get table metadata
- HTTP: `GET /api/v1/database/{pk}/table_metadata/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The database id
  - `--name` (query, required): Table name
  - `--schema` (query): Optional table schema, if not passed default schema will be used
  - `--catalog` (query): Optional table catalog, if not passed default catalog will be used
- Output: response media `application/json`

### `superset superset database get-api-v1database-pk-tablemetadata-extra`

- Summary: Get table extra metadata (database-pk-table-metadata-extra)
- HTTP: `GET /api/v1/database/{pk}/table_metadata/extra/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The database id
  - `--name` (query, required): Table name
  - `--schema` (query): Optional table schema, if not passed the schema configured in the database will be used
  - `--catalog` (query): Optional table catalog, if not passed the catalog configured in the database will be used
- Output: response media `application/json`

### `superset superset database get-api-v1database-pk-tables`

- Summary: Get a list of tables for given database
- HTTP: `GET /api/v1/database/{pk}/tables/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The database id
  - `--q` (query): q
- Output: list path `result`; columns `type`, `value`; response media `application/json`

### `superset superset database get-api-v1database-related-columnname`

- Summary: Get related fields data (database-related-column-name)
- HTTP: `GET /api/v1/database/related/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`, `value`; response media `application/json`

### `superset superset database post-api-v1database`

- Summary: Create a new database
- HTTP: `POST /api/v1/database/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset database post-api-v1database-import`

- Summary: Import database(s) with associated datasets
- HTTP: `POST /api/v1/database/import/`
- Auth: required
- Body: required; media type `multipart/form-data`
- Flags: none
- Output: response media `application/json`

### `superset superset database post-api-v1database-pk-syncpermissions`

- Summary: Re-sync all permissions for a database connection
- HTTP: `POST /api/v1/database/{pk}/sync_permissions/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The database connection ID
- Output: response media `application/json`

### `superset superset database post-api-v1database-pk-upload`

- Summary: Upload a file to a database table
- HTTP: `POST /api/v1/database/{pk}/upload/`
- Auth: required
- Body: required; media type `multipart/form-data`
- Flags:
  - `--pk` (path, required): pk

### `superset superset database post-api-v1database-pk-validatesql`

- Summary: Validate arbitrary SQL
- HTTP: `POST /api/v1/database/{pk}/validate_sql/`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: list path `result`; columns `end_column`, `line_number`, `message`, `start_column`; response media `application/json`

### `superset superset database post-api-v1database-testconnection`

- Summary: Test a database connection
- HTTP: `POST /api/v1/database/test_connection/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `superset superset database post-api-v1database-uploadmetadata`

- Summary: Upload a file and returns file metadata
- HTTP: `POST /api/v1/database/upload_metadata/`
- Auth: required
- Body: required; media type `multipart/form-data`
- Flags: none
- Output: response media `application/json`

### `superset superset database post-api-v1database-validateparameters`

- Summary: Validate database connection parameters
- HTTP: `POST /api/v1/database/validate_parameters/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `superset superset database put-api-v1database-pk`

- Summary: Change a database
- HTTP: `PUT /api/v1/database/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

## Datasets

### `superset superset datasets delete-api-v1dataset`

- Summary: Bulk delete datasets
- HTTP: `DELETE /api/v1/dataset/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset datasets delete-api-v1dataset-pk`

- Summary: Delete a dataset
- HTTP: `DELETE /api/v1/dataset/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset datasets delete-api-v1dataset-pk-column-columnid`

- Summary: Delete a dataset column
- HTTP: `DELETE /api/v1/dataset/{pk}/column/{column_id}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The dataset pk for this column
  - `--column_id` (path, required): The column id for this dataset
- Output: response media `application/json`

### `superset superset datasets delete-api-v1dataset-pk-metric-metricid`

- Summary: Delete a dataset metric
- HTTP: `DELETE /api/v1/dataset/{pk}/metric/{metric_id}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The dataset pk for this column
  - `--metric_id` (path, required): The metric id for this dataset
- Output: response media `application/json`

### `superset superset datasets get-api-v1dataset`

- Summary: Get a list of datasets
- HTTP: `GET /api/v1/dataset/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset datasets get-api-v1dataset-distinct-columnname`

- Summary: Get distinct values from field data (dataset-distinct-column-name)
- HTTP: `GET /api/v1/dataset/distinct/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`; response media `application/json`

### `superset superset datasets get-api-v1dataset-export`

- Summary: Download multiple datasets as YAML files
- HTTP: `GET /api/v1/dataset/export/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `text/plain`

### `superset superset datasets get-api-v1dataset-idoruuid`

- Summary: Get a dataset
- HTTP: `GET /api/v1/dataset/{id_or_uuid}`
- Auth: required
- Body: none
- Flags:
  - `--id_or_uuid` (path, required): Either the id of the dataset, or its uuid
  - `--q` (query): q
  - `--include_rendered_sql` (query): Should Jinja macros from sql, metrics and columns be rendered and included in the response
- Output: response media `application/json`

### `superset superset datasets get-api-v1dataset-idoruuid-relatedobjects`

- Summary: Get charts and dashboards count associated to a dataset
- HTTP: `GET /api/v1/dataset/{id_or_uuid}/related_objects`
- Auth: required
- Body: none
- Flags:
  - `--id_or_uuid` (path, required): id_or_uuid
- Output: response media `application/json`

### `superset superset datasets get-api-v1dataset-info`

- Summary: Get metadata information about this API resource (dataset--info)
- HTTP: `GET /api/v1/dataset/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset datasets get-api-v1dataset-pk-drillinfo`

- Summary: Get dataset drill info
- HTTP: `GET /api/v1/dataset/{pk}/drill_info/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The dataset ID
- Output: response media `application/json`

### `superset superset datasets get-api-v1dataset-related-columnname`

- Summary: Get related fields data (dataset-related-column-name)
- HTTP: `GET /api/v1/dataset/related/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`, `value`; response media `application/json`

### `superset superset datasets post-api-v1dataset`

- Summary: Create a new dataset
- HTTP: `POST /api/v1/dataset/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset datasets post-api-v1dataset-duplicate`

- Summary: Duplicate a dataset
- HTTP: `POST /api/v1/dataset/duplicate`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset datasets post-api-v1dataset-getorcreate`

- Summary: Retrieve a table by name, or create it if it does not exist
- HTTP: `POST /api/v1/dataset/get_or_create/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `superset superset datasets post-api-v1dataset-import`

- Summary: Import dataset(s) with associated databases
- HTTP: `POST /api/v1/dataset/import/`
- Auth: required
- Body: required; media type `multipart/form-data`
- Flags: none
- Output: response media `application/json`

### `superset superset datasets put-api-v1dataset-pk`

- Summary: Update a dataset
- HTTP: `PUT /api/v1/dataset/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
  - `--override_columns` (query): override_columns
- Output: response media `application/json`

### `superset superset datasets put-api-v1dataset-pk-refresh`

- Summary: Refresh and update columns of a dataset
- HTTP: `PUT /api/v1/dataset/{pk}/refresh`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset datasets put-api-v1dataset-warmupcache`

- Summary: Warm up the cache for each chart powered by the given table
- HTTP: `PUT /api/v1/dataset/warm_up_cache`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: list path `result`; columns `chart_id`, `viz_error`, `viz_status`; response media `application/json`

## Datasources

### `superset superset datasources get-api-v1datasource-datasourcetype-datasourceid-column-columnname-values`

- Summary: Get possible values for a datasource column
- HTTP: `GET /api/v1/datasource/{datasource_type}/{datasource_id}/column/{column_name}/values/`
- Auth: required
- Body: none
- Flags:
  - `--datasource_type` (path, required): The type of datasource
  - `--datasource_id` (path, required): The id of the datasource
  - `--column_name` (path, required): The name of the column to get values for
- Output: list path `result`; response media `application/json`

### `superset superset datasources post-api-v1datasource-datasourcetype-datasourceid-validateexpression`

- Summary: Validate a SQL expression against a datasource
- HTTP: `POST /api/v1/datasource/{datasource_type}/{datasource_id}/validate_expression/`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--datasource_type` (path, required): The type of datasource
  - `--datasource_id` (path, required): The id of the datasource
- Output: list path `result`; response media `application/json`

## Embedded Dashboard

### `superset superset embedded get-api-v1embeddeddashboard-uuid`

- Summary: Get a report schedule log (embedded-dashboard-uuid)
- HTTP: `GET /api/v1/embedded_dashboard/{uuid}`
- Auth: required
- Body: none
- Flags:
  - `--uuid` (path, required): The embedded configuration uuid
  - `--ui-config` (query): The ui config of embedded dashboard (optional).
  - `--show_filters` (query): Show filters (optional).
  - `--expand_filters` (query): Expand filters (optional).
  - `--native_filters_key` (query): Native filters key to apply filters. (optional).
  - `--permalink_key` (query): Permalink key to apply filters. (optional).
- Output: response media `application/json`

## Explore

### `superset superset explore get-api-v1explore`

- Summary: Assemble Explore related information in a single endpoint
- HTTP: `GET /api/v1/explore/`
- Auth: required
- Body: none
- Flags:
  - `--form_data_key` (query): form_data_key
  - `--permalink_key` (query): permalink_key
  - `--slice_id` (query): slice_id
  - `--datasource_id` (query): datasource_id
  - `--datasource_type` (query): datasource_type
- Output: response media `application/json`

## Explore Form Data

### `superset superset explore delete-api-v1explore-formdata-key`

- Summary: Delete a form_data
- HTTP: `DELETE /api/v1/explore/form_data/{key}`
- Auth: required
- Body: none
- Flags:
  - `--key` (path, required): The form_data key.
- Output: response media `application/json`

### `superset superset explore get-api-v1explore-formdata-key`

- Summary: Get a form_data
- HTTP: `GET /api/v1/explore/form_data/{key}`
- Auth: required
- Body: none
- Flags:
  - `--key` (path, required): key
- Output: response media `application/json`

### `superset superset explore post-api-v1explore-formdata`

- Summary: Create a new form_data
- HTTP: `POST /api/v1/explore/form_data`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--tab_id` (query): tab_id

### `superset superset explore put-api-v1explore-formdata-key`

- Summary: Update an existing form_data
- HTTP: `PUT /api/v1/explore/form_data/{key}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--key` (path, required): key
  - `--tab_id` (query): tab_id
- Output: response media `application/json`

## Explore Permanent Link

### `superset superset explore get-api-v1explore-permalink-key`

- Summary: Get chart's permanent link state
- HTTP: `GET /api/v1/explore/permalink/{key}`
- Auth: required
- Body: none
- Flags:
  - `--key` (path, required): key
- Output: response media `application/json`

### `superset superset explore post-api-v1explore-permalink`

- Summary: Create a new permanent link (explore-permalink)
- HTTP: `POST /api/v1/explore/permalink`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

## Import/export

### `superset superset import/export get-api-v1assets-export`

- Summary: Export all assets
- HTTP: `GET /api/v1/assets/export/`
- Auth: required
- Body: none
- Flags: none
- Output: response media `application/zip`

### `superset superset import/export post-api-v1assets-import`

- Summary: Import multiple assets
- HTTP: `POST /api/v1/assets/import/`
- Auth: required
- Body: required; media type `multipart/form-data`
- Flags: none
- Output: response media `application/json`

## LogRestApi

### `superset superset logrestapi get-api-v1log`

- Summary: Get a list of logs
- HTTP: `GET /api/v1/log/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset logrestapi get-api-v1log-pk`

- Summary: Get a log detail information
- HTTP: `GET /api/v1/log/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset logrestapi get-api-v1log-recentactivity`

- Summary: Get recent activity data for a user
- HTTP: `GET /api/v1/log/recent_activity/`
- Auth: required
- Body: none
- Flags:
  - `--user_id` (path, required): The id of the user
  - `--q` (query): q
- Output: list path `result`; columns `action`, `item_title`, `item_type`, `item_url`, `time`, `time_delta_humanized`; response media `application/json`

### `superset superset logrestapi log`

- Summary: Create log
- HTTP: `POST /api/v1/log/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

## Menu

### `superset superset menu menu`

- Summary: Get menu
- HTTP: `GET /api/v1/menu/`
- Auth: required
- Body: none
- Flags: none
- Output: list path `result`; response media `application/json`

## OpenApi

### `superset superset openapi api_by_version__openapi`

- Summary: Get api by version openapi
- HTTP: `GET /api/{version}/_openapi`
- Auth: required
- Body: none
- Flags:
  - `--version` (path, required): version
- Output: response media `application/json`

## Queries

### `superset superset queries delete-api-v1savedquery`

- Summary: Bulk delete saved queries
- HTTP: `DELETE /api/v1/saved_query/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset queries delete-api-v1savedquery-pk`

- Summary: Delete a saved query
- HTTP: `DELETE /api/v1/saved_query/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset queries get-api-v1query`

- Summary: Get a list of queries
- HTTP: `GET /api/v1/query/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset queries get-api-v1query-distinct-columnname`

- Summary: Get distinct values from field data (query-distinct-column-name)
- HTTP: `GET /api/v1/query/distinct/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`; response media `application/json`

### `superset superset queries get-api-v1query-pk`

- Summary: Get query detail information
- HTTP: `GET /api/v1/query/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset queries get-api-v1query-related-columnname`

- Summary: Get related fields data (query-related-column-name)
- HTTP: `GET /api/v1/query/related/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`, `value`; response media `application/json`

### `superset superset queries get-api-v1query-updatedsince`

- Summary: Get a list of queries that changed after last_updated_ms
- HTTP: `GET /api/v1/query/updated_since`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `result`; columns `id`, `changed_on`, `client_id`, `end_result_backend_time`, `end_time`, `error_message`; response media `application/json`

### `superset superset queries get-api-v1savedquery`

- Summary: Get a list of saved queries
- HTTP: `GET /api/v1/saved_query/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset queries get-api-v1savedquery-distinct-columnname`

- Summary: Get distinct values from field data (saved-query-distinct-column-name)
- HTTP: `GET /api/v1/saved_query/distinct/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`; response media `application/json`

### `superset superset queries get-api-v1savedquery-export`

- Summary: Download multiple saved queries as YAML files
- HTTP: `GET /api/v1/saved_query/export/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/zip`

### `superset superset queries get-api-v1savedquery-info`

- Summary: Get metadata information about this API resource (saved-query--info)
- HTTP: `GET /api/v1/saved_query/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset queries get-api-v1savedquery-pk`

- Summary: Get a saved query
- HTTP: `GET /api/v1/saved_query/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset queries get-api-v1savedquery-related-columnname`

- Summary: Get related fields data (saved-query-related-column-name)
- HTTP: `GET /api/v1/saved_query/related/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`, `value`; response media `application/json`

### `superset superset queries post-api-v1query-stop`

- Summary: Manually stop a query with client_id
- HTTP: `POST /api/v1/query/stop`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `superset superset queries post-api-v1savedquery`

- Summary: Create a saved query
- HTTP: `POST /api/v1/saved_query/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset queries post-api-v1savedquery-import`

- Summary: Import saved queries with associated databases
- HTTP: `POST /api/v1/saved_query/import/`
- Auth: required
- Body: required; media type `multipart/form-data`
- Flags: none
- Output: response media `application/json`

### `superset superset queries put-api-v1savedquery-pk`

- Summary: Update a saved query
- HTTP: `PUT /api/v1/saved_query/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

## Report Schedules

### `superset superset report delete-api-v1report`

- Summary: Bulk delete report schedules
- HTTP: `DELETE /api/v1/report/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset report delete-api-v1report-pk`

- Summary: Delete a report schedule
- HTTP: `DELETE /api/v1/report/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The report schedule pk
- Output: response media `application/json`

### `superset superset report get-api-v1report`

- Summary: Get a list of report schedules
- HTTP: `GET /api/v1/report/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset report get-api-v1report-info`

- Summary: Get metadata information about this API resource (report--info)
- HTTP: `GET /api/v1/report/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset report get-api-v1report-pk`

- Summary: Get a report schedule
- HTTP: `GET /api/v1/report/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset report get-api-v1report-pk-log`

- Summary: Get a list of report schedule logs
- HTTP: `GET /api/v1/report/{pk}/log/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The report schedule id for these logs
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset report get-api-v1report-pk-log-logid`

- Summary: Get a report schedule log (report-pk-log-log-id)
- HTTP: `GET /api/v1/report/{pk}/log/{log_id}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The report schedule pk for log
  - `--log_id` (path, required): The log pk
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset report get-api-v1report-related-columnname`

- Summary: Get related fields data (report-related-column-name)
- HTTP: `GET /api/v1/report/related/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`, `value`; response media `application/json`

### `superset superset report get-api-v1report-slackchannels`

- Summary: Get slack channels
- HTTP: `GET /api/v1/report/slack_channels/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `result`; response media `application/json`

### `superset superset report post-api-v1report`

- Summary: Create a report schedule
- HTTP: `POST /api/v1/report/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset report put-api-v1report-pk`

- Summary: Update a report schedule
- HTTP: `PUT /api/v1/report/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): The Report Schedule pk
- Output: response media `application/json`

## Row Level Security

### `superset superset row delete-api-v1rowlevelsecurity`

- Summary: Bulk delete RLS rules
- HTTP: `DELETE /api/v1/rowlevelsecurity/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset row delete-api-v1rowlevelsecurity-pk`

- Summary: Delete an RLS
- HTTP: `DELETE /api/v1/rowlevelsecurity/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset row get-api-v1rowlevelsecurity`

- Summary: Get a list of RLS
- HTTP: `GET /api/v1/rowlevelsecurity/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset row get-api-v1rowlevelsecurity-info`

- Summary: Get metadata information about this API resource (rowlevelsecurity--info)
- HTTP: `GET /api/v1/rowlevelsecurity/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset row get-api-v1rowlevelsecurity-pk`

- Summary: Get an RLS
- HTTP: `GET /api/v1/rowlevelsecurity/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset row get-api-v1rowlevelsecurity-related-columnname`

- Summary: Get related fields data (rowlevelsecurity-related-column-name)
- HTTP: `GET /api/v1/rowlevelsecurity/related/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`, `value`; response media `application/json`

### `superset superset row post-api-v1rowlevelsecurity`

- Summary: Create a new RLS rule
- HTTP: `POST /api/v1/rowlevelsecurity/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset row put-api-v1rowlevelsecurity-pk`

- Summary: Update an RLS rule
- HTTP: `PUT /api/v1/rowlevelsecurity/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): The Rule pk
- Output: response media `application/json`

## SQL Lab

### `superset superset sql get-api-v1sqllab`

- Summary: Get the bootstrap data for SqlLab page
- HTTP: `GET /api/v1/sqllab/`
- Auth: required
- Body: none
- Flags: none
- Output: list path `tab_state_ids`; response media `application/json`

### `superset superset sql get-api-v1sqllab-export-clientid`

- Summary: Export the SQL query results to a CSV
- HTTP: `GET /api/v1/sqllab/export/{client_id}/`
- Auth: required
- Body: none
- Flags:
  - `--client_id` (path, required): The SQL query result identifier
- Output: response media `text/csv`

### `superset superset sql get-api-v1sqllab-results`

- Summary: Get the result of a SQL query execution
- HTTP: `GET /api/v1/sqllab/results/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `data`; response media `application/json`

### `superset superset sql post-api-v1sqllab-estimate`

- Summary: Estimate the SQL query execution cost
- HTTP: `POST /api/v1/sqllab/estimate/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `superset superset sql post-api-v1sqllab-execute`

- Summary: Execute a SQL query
- HTTP: `POST /api/v1/sqllab/execute/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: list path `data`; response media `application/json`

### `superset superset sql post-api-v1sqllab-exportstreaming`

- Summary: Export SQL query results to CSV with streaming
- HTTP: `POST /api/v1/sqllab/export_streaming/`
- Auth: required
- Body: required; media type `application/x-www-form-urlencoded`
- Flags: none
- Output: response media `text/csv`

### `superset superset sql post-api-v1sqllab-formatsql`

- Summary: Format SQL code
- HTTP: `POST /api/v1/sqllab/format_sql/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: response media `application/json`

## SQL Lab Permanent Link

### `superset superset sql get-api-v1sqllab-permalink-key`

- Summary: Get permanent link state for SQLLab editor.
- HTTP: `GET /api/v1/sqllab/permalink/{key}`
- Auth: required
- Body: none
- Flags:
  - `--key` (path, required): key
- Output: response media `application/json`

### `superset superset sql post-api-v1sqllab-permalink`

- Summary: Create a new permanent link (sqllab-permalink)
- HTTP: `POST /api/v1/sqllab/permalink`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

## Security

### `superset superset security get-api-v1security-csrftoken`

- Summary: Get the CSRF token
- HTTP: `GET /api/v1/security/csrf_token/`
- Auth: required
- Body: none
- Flags: none
- Output: response media `application/json`

### `superset superset security post-api-v1security-guesttoken`

- Summary: Get a guest token
- HTTP: `POST /api/v1/security/guest_token/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `superset superset security security_login`

- Summary: Create security login
- HTTP: `POST /api/v1/security/login`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `superset superset security security_refresh`

- Summary: Create security refresh
- HTTP: `POST /api/v1/security/refresh`
- Auth: required
- Body: none
- Flags: none
- Output: response media `application/json`

## Security Groups

### `superset superset security security_groups`

- Summary: Create security groups
- HTTP: `POST /api/v1/security/groups/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset security security_groups-2`

- Summary: Get security groups
- HTTP: `GET /api/v1/security/groups/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset security security_groups__info`

- Summary: Get security groups info
- HTTP: `GET /api/v1/security/groups/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset security security_groups_by_pk`

- Summary: Delete security groups by pk
- HTTP: `DELETE /api/v1/security/groups/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset security security_groups_by_pk-2`

- Summary: Get security groups by pk
- HTTP: `GET /api/v1/security/groups/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset security security_groups_by_pk-3`

- Summary: Update security groups by pk
- HTTP: `PUT /api/v1/security/groups/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

## Security Permissions

### `superset superset security security_permissions`

- Summary: Get security permissions
- HTTP: `GET /api/v1/security/permissions/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset security security_permissions__info`

- Summary: Get security permissions info
- HTTP: `GET /api/v1/security/permissions/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset security security_permissions_by_pk`

- Summary: Get security permissions by pk
- HTTP: `GET /api/v1/security/permissions/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

## Security Permissions on Resources (View Menus)

### `superset superset security security_permissions_resources`

- Summary: Create security permissions resources
- HTTP: `POST /api/v1/security/permissions-resources/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset security security_permissions_resources-2`

- Summary: Get security permissions resources
- HTTP: `GET /api/v1/security/permissions-resources/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset security security_permissions_resources__info`

- Summary: Get security permissions resources info
- HTTP: `GET /api/v1/security/permissions-resources/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset security security_permissions_resources_by_pk`

- Summary: Delete security permissions resources by pk
- HTTP: `DELETE /api/v1/security/permissions-resources/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset security security_permissions_resources_by_pk-2`

- Summary: Get security permissions resources by pk
- HTTP: `GET /api/v1/security/permissions-resources/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset security security_permissions_resources_by_pk-3`

- Summary: Update security permissions resources by pk
- HTTP: `PUT /api/v1/security/permissions-resources/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

## Security Resources (View Menus)

### `superset superset security security_resources`

- Summary: Create security resources
- HTTP: `POST /api/v1/security/resources/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset security security_resources-2`

- Summary: Get security resources
- HTTP: `GET /api/v1/security/resources/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset security security_resources__info`

- Summary: Get security resources info
- HTTP: `GET /api/v1/security/resources/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset security security_resources_by_pk`

- Summary: Delete security resources by pk
- HTTP: `DELETE /api/v1/security/resources/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset security security_resources_by_pk-2`

- Summary: Get security resources by pk
- HTTP: `GET /api/v1/security/resources/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset security security_resources_by_pk-3`

- Summary: Update security resources by pk
- HTTP: `PUT /api/v1/security/resources/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

## Security Roles

### `superset superset security get-api-v1security-roles-search`

- Summary: List roles
- HTTP: `GET /api/v1/security/roles/search/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset security security_roles`

- Summary: Create security roles
- HTTP: `POST /api/v1/security/roles/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset security security_roles-2`

- Summary: Get security roles
- HTTP: `GET /api/v1/security/roles/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset security security_roles__info`

- Summary: Get security roles info
- HTTP: `GET /api/v1/security/roles/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset security security_roles_by_pk`

- Summary: Delete security roles by pk
- HTTP: `DELETE /api/v1/security/roles/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset security security_roles_by_pk-2`

- Summary: Get security roles by pk
- HTTP: `GET /api/v1/security/roles/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset security security_roles_by_pk-3`

- Summary: Update security roles by pk
- HTTP: `PUT /api/v1/security/roles/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset security security_roles_by_role_id_groups`

- Summary: Update security roles by role_id groups
- HTTP: `PUT /api/v1/security/roles/{role_id}/groups`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--role_id` (path, required): role_id
- Output: response media `application/json`

### `superset superset security security_roles_by_role_id_permissions`

- Summary: Create security roles by role_id permissions
- HTTP: `POST /api/v1/security/roles/{role_id}/permissions`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--role_id` (path, required): role_id
- Output: response media `application/json`

### `superset superset security security_roles_by_role_id_permissions-2`

- Summary: Get security roles by role_id permissions
- HTTP: `GET /api/v1/security/roles/{role_id}/permissions/`
- Auth: required
- Body: none
- Flags:
  - `--role_id` (path, required): role_id
- Output: list path `result`; columns `id`, `permission_name`, `view_menu_name`; response media `application/json`

### `superset superset security security_roles_by_role_id_users`

- Summary: Update security roles by role_id users
- HTTP: `PUT /api/v1/security/roles/{role_id}/users`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--role_id` (path, required): role_id
- Output: response media `application/json`

## Security Users

### `superset superset security security_users`

- Summary: Create security users
- HTTP: `POST /api/v1/security/users/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset security security_users-2`

- Summary: Get security users
- HTTP: `GET /api/v1/security/users/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset security security_users__info`

- Summary: Get security users info
- HTTP: `GET /api/v1/security/users/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset security security_users_by_pk`

- Summary: Delete security users by pk
- HTTP: `DELETE /api/v1/security/users/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset security security_users_by_pk-2`

- Summary: Get security users by pk
- HTTP: `GET /api/v1/security/users/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset security security_users_by_pk-3`

- Summary: Update security users by pk
- HTTP: `PUT /api/v1/security/users/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

## Tags

### `superset superset tags delete-api-v1tag`

- Summary: Bulk delete tags
- HTTP: `DELETE /api/v1/tag/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset tags delete-api-v1tag-objecttype-objectid-tag`

- Summary: Delete a tagged object
- HTTP: `DELETE /api/v1/tag/{object_type}/{object_id}/{tag}/`
- Auth: required
- Body: none
- Flags:
  - `--tag` (path, required): tag
  - `--object_type` (path, required): object_type
  - `--object_id` (path, required): object_id
- Output: response media `application/json`

### `superset superset tags delete-api-v1tag-pk`

- Summary: Delete a tag
- HTTP: `DELETE /api/v1/tag/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset tags get-api-v1tag`

- Summary: Get a list of tags
- HTTP: `GET /api/v1/tag/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset tags get-api-v1tag-getobjects`

- Summary: Get all objects associated with a tag
- HTTP: `GET /api/v1/tag/get_objects/`
- Auth: required
- Body: none
- Flags:
  - `--tag_id` (path, required): tag_id
- Output: list path `result`; columns `name`, `type`, `id`, `changed_on`, `creator`, `url`; response media `application/json`

### `superset superset tags get-api-v1tag-info`

- Summary: Get metadata information about tag API endpoints
- HTTP: `GET /api/v1/tag/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset tags get-api-v1tag-pk`

- Summary: Get a tag detail information
- HTTP: `GET /api/v1/tag/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset tags get-api-v1tag-related-columnname`

- Summary: Get related fields data (tag-related-column-name)
- HTTP: `GET /api/v1/tag/related/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`, `value`; response media `application/json`

### `superset superset tags post-api-v1tag`

- Summary: Create a tag
- HTTP: `POST /api/v1/tag/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset tags post-api-v1tag-bulkcreate`

- Summary: Bulk create tags and tagged objects
- HTTP: `POST /api/v1/tag/bulk_create`
- Auth: required
- Body: required; media type `application/json`
- Flags: none
- Output: response media `application/json`

### `superset superset tags post-api-v1tag-objecttype-objectid`

- Summary: Add tags to an object
- HTTP: `POST /api/v1/tag/{object_type}/{object_id}/`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--object_type` (path, required): object_type
  - `--object_id` (path, required): object_id

### `superset superset tags put-api-v1tag-pk`

- Summary: Update a tag
- HTTP: `PUT /api/v1/tag/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset tags tag_by_pk_favorites`

- Summary: Create tag by pk favorites
- HTTP: `POST /api/v1/tag/{pk}/favorites/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset tags tag_by_pk_favorites-2`

- Summary: Delete tag by pk favorites
- HTTP: `DELETE /api/v1/tag/{pk}/favorites/`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset tags tag_favorite_status`

- Summary: Get tag favorite status
- HTTP: `GET /api/v1/tag/favorite_status/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `result`; columns `id`, `value`; response media `application/json`

## Themes

### `superset superset themes delete-api-v1theme`

- Summary: Bulk delete themes
- HTTP: `DELETE /api/v1/theme/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/json`

### `superset superset themes delete-api-v1theme-pk`

- Summary: Delete a theme
- HTTP: `DELETE /api/v1/theme/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset themes delete-api-v1theme-unsetsystemdark`

- Summary: Clear the system dark theme
- HTTP: `DELETE /api/v1/theme/unset_system_dark`
- Auth: required
- Body: none
- Flags: none
- Output: response media `application/json`

### `superset superset themes delete-api-v1theme-unsetsystemdefault`

- Summary: Clear the system default theme
- HTTP: `DELETE /api/v1/theme/unset_system_default`
- Auth: required
- Body: none
- Flags: none
- Output: response media `application/json`

### `superset superset themes get-api-v1theme`

- Summary: Get a list of themes
- HTTP: `GET /api/v1/theme/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset themes get-api-v1theme-export`

- Summary: Download multiple themes as YAML files
- HTTP: `GET /api/v1/theme/export/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: response media `application/zip`

### `superset superset themes get-api-v1theme-info`

- Summary: Get metadata information about this API resource (theme--info)
- HTTP: `GET /api/v1/theme/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset themes get-api-v1theme-pk`

- Summary: Get a theme
- HTTP: `GET /api/v1/theme/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset themes get-api-v1theme-related-columnname`

- Summary: Get related fields data (theme-related-column-name)
- HTTP: `GET /api/v1/theme/related/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`, `value`; response media `application/json`

### `superset superset themes post-api-v1theme`

- Summary: Create a theme
- HTTP: `POST /api/v1/theme/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset themes post-api-v1theme-import`

- Summary: Import themes from a ZIP file
- HTTP: `POST /api/v1/theme/import/`
- Auth: required
- Body: required; media type `multipart/form-data`
- Flags: none
- Output: response media `application/json`

### `superset superset themes put-api-v1theme-pk`

- Summary: Update a theme
- HTTP: `PUT /api/v1/theme/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset themes put-api-v1theme-pk-setsystemdark`

- Summary: Set a theme as the system dark theme
- HTTP: `PUT /api/v1/theme/{pk}/set_system_dark`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The theme id
- Output: response media `application/json`

### `superset superset themes put-api-v1theme-pk-setsystemdefault`

- Summary: Set a theme as the system default theme
- HTTP: `PUT /api/v1/theme/{pk}/set_system_default`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): The theme id
- Output: response media `application/json`

## User

### `superset superset user get-api-v1user-userid-avatarpng`

- Summary: Get the user avatar
- HTTP: `GET /api/v1/user/{user_id}/avatar.png`
- Auth: required
- Body: none
- Flags:
  - `--user_id` (path, required): The ID of the user

## UserRegistrationsRestAPI

### `superset superset userregistrationsrestapi get-api-v1security-userregistrations-distinct-columnname`

- Summary: Get distinct values from field data (security-user-registrations-distinct-column-name)
- HTTP: `GET /api/v1/security/user_registrations/distinct/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`; response media `application/json`

### `superset superset userregistrationsrestapi get-api-v1security-userregistrations-related-columnname`

- Summary: Get related fields data (security-user-registrations-related-column-name)
- HTTP: `GET /api/v1/security/user_registrations/related/{column_name}`
- Auth: required
- Body: none
- Flags:
  - `--column_name` (path, required): column_name
  - `--q` (query): q
- Output: list path `result`; columns `text`, `value`; response media `application/json`

### `superset superset userregistrationsrestapi security_user_registrations`

- Summary: Create security user registrations
- HTTP: `POST /api/v1/security/user_registrations/`
- Auth: required
- Body: required; media type `application/json`
- Flags: none

### `superset superset userregistrationsrestapi security_user_registrations-2`

- Summary: Get security user registrations
- HTTP: `GET /api/v1/security/user_registrations/`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `ids`; response media `application/json`

### `superset superset userregistrationsrestapi security_user_registrations__info`

- Summary: Get security user registrations info
- HTTP: `GET /api/v1/security/user_registrations/_info`
- Auth: required
- Body: none
- Flags:
  - `--q` (query): q
- Output: list path `permissions`; response media `application/json`

### `superset superset userregistrationsrestapi security_user_registrations_by_pk`

- Summary: Delete security user registrations by pk
- HTTP: `DELETE /api/v1/security/user_registrations/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`

### `superset superset userregistrationsrestapi security_user_registrations_by_pk-2`

- Summary: Get security user registrations by pk
- HTTP: `GET /api/v1/security/user_registrations/{pk}`
- Auth: required
- Body: none
- Flags:
  - `--pk` (path, required): pk
  - `--q` (query): q
- Output: list path `show_columns`; response media `application/json`

### `superset superset userregistrationsrestapi security_user_registrations_by_pk-3`

- Summary: Update security user registrations by pk
- HTTP: `PUT /api/v1/security/user_registrations/{pk}`
- Auth: required
- Body: required; media type `application/json`
- Flags:
  - `--pk` (path, required): pk
- Output: response media `application/json`
