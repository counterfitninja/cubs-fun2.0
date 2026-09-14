# Research: Admin Search and Sort

## Decision: Keep query and sort state in `AdminGameList`

**Rationale**: The component already receives the complete game collection and renders the maintenance actions. Local state gives immediate derived results without changing store data, route state, or persistence.

**Alternatives considered**:

- Store query and sorting globally: rejected because they are temporary page-view preferences with no cross-page value.
- Add query parameters: rejected for the initial scope because shareable admin views were not requested.

## Decision: Reuse normalised substring matching over admin-visible fields

**Rationale**: The public catalogue already trims input, compares case-insensitively, and searches title, summary, descriptive text, activity type, suitability notes, and keywords. Applying the same normalisation to records visible to admins meets the search requirements and preserves consistent expectations.

**Alternatives considered**:

- Exact title matching: rejected because it slows routine record discovery.
- New fuzzy-search dependency: rejected because substring matching satisfies the stated scope and existing catalogue pattern.

## Decision: Provide title, publication-status, and last-updated sort options

**Rationale**: Alphabetical title order supports lookup, status order supports draft/publish review, and last-updated order supports recent maintenance review. Each field already exists, needs no new data, and is meaningful to admins.

**Alternatives considered**:

- Configurable multi-column sorting: rejected as disproportionate to the list's maintenance purpose.
- Duration and space sorting: rejected because they are leader-planning criteria rather than the main admin review priorities.

## Decision: Make ordering deterministic and non-mutating

**Rationale**: A copied, filtered collection avoids modifying the source game array. Each comparator uses a title-and-id fallback so equal primary values do not produce unstable orders.

**Alternatives considered**:

- Sort the supplied array in place: rejected because it mutates shared application data and risks unexpected ordering elsewhere.
- Rely only on engine sort stability: rejected because explicit tie-breakers provide a predictable user outcome.

## Decision: Extend the existing admin UI test file

**Rationale**: The project places page interaction coverage under `tests/e2e`, runs it through Vitest/jsdom, and already has an admin game workflow file. The test can render `AdminGameList` using seeded records and verify the complete interaction contract cheaply.

**Alternatives considered**:

- Browser automation: rejected because the existing project has no browser-runner dependency and this component can be fully exercised in jsdom.