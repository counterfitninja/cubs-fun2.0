# Contract: Admin Game List Search and Sort

## Purpose

Defines observable behaviour for authorised admins reviewing game records on the maintenance page.

## Inputs

| Input | Required behaviour |
| --- | --- |
| Search text | Search all admin-visible identifying text using trimmed, case-insensitive substring matching. |
| Sort selection | Order the current matching set by title, publication status, or last updated. |
| Edit, publish, retire action | Target the displayed record's stable id and refresh the derived view using the active search and sort settings. |

## Required Outcomes

- The default view presents every available game record in the selected default order.
- Search applies immediately to the displayed list and never alters source records.
- Selecting a sort order preserves the search query; changing the query preserves the selected order.
- Results have a deterministic order when primary sort values are equal.
- Each displayed result preserves its existing edit, publish, or retire action.
- An empty catalogue communicates that there are no game records.
- A no-match result communicates that no records match the current search and leaves the current query available to amend or clear.
- The controls are labelled, keyboard-operable, and usable at a phone-sized viewport.

## Out of Scope

- Public catalogue search and sort changes.
- Persisting or sharing admin search and sort preferences.
- Multi-column, saved, or user-configurable sorting.
- New game fields, API endpoints, or storage migrations.