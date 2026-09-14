# Feature Specification: Admin Search and Sort

**Feature Branch**: `002-admin-search-sort`

**Created**: 2026-09-14

**Status**: Draft

**Input**: User description: "add search and sort to the admin pages"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Find an Admin Game Record (Priority: P1)

As an authorised admin, I want to search the game maintenance list so that I can quickly locate a game to review or edit.

**Why this priority**: Finding a known record is the primary purpose of adding search to the admin area.

**Independent Test**: Can be fully tested by entering full and partial game titles and relevant record text, then confirming only matching records remain available for editing and status changes.

**Acceptance Scenarios**:

1. **Given** the admin game list contains multiple records, **When** an admin enters a full or partial game title, **Then** the list shows matching records without requiring an exact case match.
2. **Given** an admin enters a term that appears in a game's summary or other identifying catalogue text, **When** they search, **Then** that game is included in the matching results.
3. **Given** an admin's search has no matches, **When** the list updates, **Then** the page clearly states that no records match and retains the search term so it can be corrected or cleared.

---

### User Story 2 - Order Admin Game Records (Priority: P1)

As an authorised admin, I want to sort the game maintenance list by useful record attributes so that I can review records in a deliberate order.

**Why this priority**: Sorting makes routine checks such as identifying drafts or reviewing recently relevant records practical without changing the records themselves.

**Independent Test**: Can be fully tested by selecting each available ordering and verifying the resulting record order while record actions remain available.

**Acceptance Scenarios**:

1. **Given** an admin views the game list, **When** they select a supported sort order, **Then** the displayed records are ordered consistently by that selected attribute.
2. **Given** an admin has entered a search term, **When** they change the sort order, **Then** only matching records are reordered and the search term remains active.
3. **Given** two records have the same value for the selected sort attribute, **When** the list is ordered, **Then** their ordering is stable and predictable.

---

### User Story 3 - Maintain Records from a Filtered List (Priority: P2)

As an authorised admin, I want search and sorting to leave record management actions intact so that I can edit, publish, or retire the right game without losing my place.

**Why this priority**: Search and sort provide little value if they interfere with the primary maintenance actions.

**Independent Test**: Can be fully tested by searching for a record, changing its publication status or opening it for editing, and confirming the list controls and selected view remain understandable afterward.

**Acceptance Scenarios**:

1. **Given** an admin is viewing searched or sorted results, **When** they edit, publish, or retire a displayed game, **Then** the action applies to that game and the list remains consistent with the active controls.
2. **Given** an admin has no game records, **When** they open the maintenance page, **Then** the page presents a clear empty state and does not imply that a search error occurred.

### Edge Cases

- Search ignores leading and trailing spaces and treats uppercase and lowercase characters equivalently.
- A record with a missing title or summary remains discoverable through its available identifying information and is presented with its existing fallback label.
- Changing a sort order while the list is empty or has no search matches does not cause an error.
- Search and sort controls remain usable with keyboard-only navigation and on narrow screens.
- Publication-status updates immediately affect both the displayed status and any active sort order that depends on status.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide authorised admins with a search control on the game maintenance list.
- **FR-002**: The system MUST match search terms against game titles, summaries, and other identifying catalogue text available to admins.
- **FR-003**: The system MUST treat searches as case-insensitive and ignore unintended leading and trailing whitespace.
- **FR-004**: The system MUST update the displayed list to include only records matching the active search term.
- **FR-005**: The system MUST provide a clear no-match state that distinguishes a failed search from an empty catalogue and allows the admin to revise or clear the search.
- **FR-006**: The system MUST provide admins with a clearly labelled set of supported sort orders for the game maintenance list.
- **FR-007**: The system MUST order the currently displayed search results according to the selected sort order without changing the underlying game records.
- **FR-008**: The system MUST use a stable, predictable order when records share the selected sort value.
- **FR-009**: The system MUST preserve the active search term when an admin changes the sort order and preserve the selected sort order when the search term changes.
- **FR-010**: The system MUST retain access to edit, publish, and retire actions for each record displayed after search or sorting.
- **FR-011**: The system MUST update results and ordering to reflect record changes made by an admin while controls are active.
- **FR-012**: The system MUST keep admin search and sorting accessible by keyboard and usable on phone-sized screens.

### Key Entities *(include if feature involves data)*

- **Admin Game List**: The set of game records available to authorised admins for review and maintenance.
- **Search Query**: The temporary text an admin uses to limit the visible records; it does not alter a game record.
- **Sort Preference**: The temporary ordering selected by an admin for the visible records; it does not alter a game record.
- **Game Record**: An existing catalogue entry with identifying text and publication status that can be edited, published, or retired.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In usability testing, 90% of authorised admins can locate a known game from a catalogue of 100 records in under 30 seconds using search.
- **SC-002**: In usability testing, 90% of authorised admins can apply a supported sort order and identify the first matching record without assistance.
- **SC-003**: 100% of records returned by a search continue to expose their available maintenance actions.
- **SC-004**: 95% of search or sort changes show the updated list or a clear no-match state within 2 seconds from the admin's perspective.
- **SC-005**: Keyboard-only testing can complete searching, selecting a sort order, and opening a returned record without requiring a pointer.

## Assumptions

- The feature applies to the existing authorised admin game-maintenance list; it does not add search or sort to leader-facing catalogue pages.
- Existing game fields provide sufficient identifying text for search, with title and summary as the primary expected matches.
- The first release offers a concise set of practical sort orders based on information already visible or maintained for each game, rather than configurable multi-column sorting.
- Search text and sort preference apply only to the current admin list session and do not modify game records or require personal preference storage.