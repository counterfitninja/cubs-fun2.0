# Data Model: Admin Search and Sort

## Existing Entity: Game Record

The feature uses the existing game record without a schema change.

| Field | Feature usage | Validation or display rule |
| --- | --- | --- |
| `id` | Stable final tie-breaker and action target | Must not be changed by searching or sorting. |
| `title` | Primary search field and alphabetical sort field | Display the existing untitled fallback when blank. |
| `summary` | Search field and list context | Display the existing draft-summary fallback when blank. |
| `aim`, `instructions`, `activityType`, `suitabilityNotes`, `keywords` | Additional identifying search fields | Participates in normalised text matching. |
| `publicationStatus` | Status sort field and existing maintenance action state | Status updates must be reflected in the derived result view. |
| `updatedAt` | Recency sort field | Most recently updated records appear first for the recency order. |

## View-State Entities

### Search Query

Temporary text entered by the admin. Leading and trailing whitespace is ignored and matching is case-insensitive. It filters visible records but does not persist or change a game record.

### Sort Preference

Temporary choice for the current list view.

| Sort value | Primary order | Tie-breaker |
| --- | --- | --- |
| `title-asc` | Title, ascending in UK English | Record id, ascending |
| `status-asc` | Publication status in a documented consistent order | Title then record id, ascending |
| `updated-desc` | Last updated, newest first | Title then record id, ascending |

## Derived View

The admin game list is derived in this order:

1. Normalise the query and match every supplied game record against the searchable fields.
2. Copy the matching records.
3. Apply the selected ordering and its tie-breakers.
4. Render the resulting records with the existing edit and status actions.

An empty source collection produces the catalogue-empty state. A non-empty source collection with no derived records produces the no-match state and retains the query.