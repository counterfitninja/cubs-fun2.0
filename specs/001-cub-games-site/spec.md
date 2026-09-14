# Feature Specification: Cub Games Site

**Feature Branch**: `001-cub-games-site`

**Created**: 2026-09-14

**Status**: Draft

**Input**: User description: "Build a site to store games for a UK based Cub Scout site, with quick evening game search, full game index, phone usability, admin upload/edit pages, favourites, played-game ratings, and criteria-based randomiser."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Find a Game for Tonight (Priority: P1)

As a Cub Scout leader preparing for an evening meeting, I want to quickly find suitable games by practical constraints so that I can choose an activity that fits the available time, place, group size, equipment, and energy level.

**Why this priority**: Fast evening game discovery is the primary value of the site and is required by the project constitution.

**Independent Test**: Can be fully tested by opening the game catalogue on a phone-sized screen, applying meeting constraints, and confirming that suitable games are discoverable and readable without using admin features.

**Acceptance Scenarios**:

1. **Given** the catalogue contains games with duration, space, equipment, group size, and energy metadata, **When** a leader filters for a 15-minute indoor game with no equipment, **Then** the results show only matching games with enough summary information to choose one.
2. **Given** a leader knows part of a game name or activity type, **When** they search from the catalogue, **Then** matching games appear quickly with clear titles and key meeting constraints.
3. **Given** no games match the selected criteria, **When** the leader views the results, **Then** the site explains that no matching games were found and offers a clear way to adjust criteria.

---

### User Story 2 - Browse the Full Game Index (Priority: P1)

As a leader or helper, I want a complete index of all games so that I can browse, retrieve, and compare available activities without already knowing the exact game name.

**Why this priority**: The game index is the foundation for retrieval, filtering, favourites, ratings, and random selection.

**Independent Test**: Can be fully tested by viewing the all-games index, opening several game details, and confirming every listed game has consistent metadata and readable instructions.

**Acceptance Scenarios**:

1. **Given** the site contains published games, **When** a user opens the game index, **Then** every published game is listed with title, duration, space, group size, equipment summary, and rating summary where available.
2. **Given** a user opens a game from the index, **When** the detail page loads, **Then** the user can read the aim, setup, instructions, equipment, safety or accessibility notes, and suitability metadata.

---

### User Story 3 - Use a Criteria-Based Randomiser (Priority: P2)

As a leader needing a quick choice, I want a randomiser that respects selected criteria so that I can get an appropriate game suggestion without manually reviewing the full catalogue.

**Why this priority**: Random selection supports time-pressured meeting planning once the catalogue and core filtering are available.

**Independent Test**: Can be fully tested by selecting criteria such as duration, space, equipment, and energy level, then confirming each random suggestion satisfies those criteria.

**Acceptance Scenarios**:

1. **Given** matching games exist for selected criteria, **When** a leader runs the randomiser, **Then** the site suggests one matching game and shows why it matches the selected criteria.
2. **Given** the leader does not like a suggestion, **When** they request another suggestion with the same criteria, **Then** the site offers another eligible game when one is available.
3. **Given** no games match the selected criteria, **When** the randomiser runs, **Then** the site explains that no eligible games are available and identifies which criteria can be broadened.

---

### User Story 4 - Save Favourites and Rate Played Games (Priority: P2)

As a leader, I want to favourite useful games and rate games after they have been played so that I can quickly return to trusted activities and help compare what works well.

**Why this priority**: Favourites and ratings improve retrieval and usefulness over repeated meetings while requiring clear privacy boundaries.

**Independent Test**: Can be fully tested by favouriting a game, finding it through a favourites view or filter, marking a game as played, submitting a rating, and confirming the rating is reflected without exposing unnecessary personal details.

**Acceptance Scenarios**:

1. **Given** a leader is viewing a game, **When** they mark it as a favourite, **Then** it appears in their favourites view or favourite-filtered catalogue.
2. **Given** a leader has played a game, **When** they submit a rating, **Then** the game records played-game feedback and updates its rating summary.
3. **Given** a leader has not marked a game as played, **When** they try to rate it, **Then** the site asks them to confirm it has been played before accepting the rating.

---

### User Story 5 - Maintain Games Through Admin Pages (Priority: P3)

As an authorised admin, I want to add new games and edit existing games so that the catalogue stays complete, accurate, and useful for leaders.

**Why this priority**: Admin maintenance is essential for long-term catalogue quality but can be delivered after leader-facing retrieval is defined.

**Independent Test**: Can be fully tested by signing in as an authorised admin, creating a game with all required metadata, editing it, and confirming the public catalogue, search, filters, favourites, ratings, and randomiser continue to work with the updated record.

**Acceptance Scenarios**:

1. **Given** an authorised admin has a new game, **When** they complete all required game fields and publish it, **Then** the game appears in the index and is available to search, filters, and the randomiser.
2. **Given** an authorised admin edits an existing game, **When** they save valid changes, **Then** users see the updated details without losing existing favourites or rating summaries.
3. **Given** a required field is missing or invalid, **When** the admin attempts to publish, **Then** the site identifies the missing or invalid information and keeps the game from being published until corrected.

---

### Edge Cases

- A search term has spelling differences or UK/US wording differences; the site presents relevant UK-labelled matches where possible and keeps user-facing labels in UK English.
- A game has no equipment, flexible duration, or variable group size; the catalogue still records those values in a filterable, understandable form.
- A user loses connectivity or navigates away while entering admin changes; the site prevents accidental publication of incomplete games and explains whether changes were saved.
- A game is edited after users have favourited or rated it; existing favourites and rating summaries remain attached to the same game unless an admin intentionally retires or replaces it.
- A phone screen is narrow or used in a busy meeting space; core browsing, filtering, favourites, ratings, and randomiser controls remain usable without hover-only actions.
- A randomiser has too few matching games to avoid repeats; the site explains that available suggestions are limited.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a complete index of all published games.
- **FR-002**: Each listed game MUST show enough summary information for quick selection, including title, duration, space, group size, equipment summary, and rating summary where available.
- **FR-003**: Users MUST be able to search games by title, keywords, activity type, and relevant game text.
- **FR-004**: Users MUST be able to filter games by duration, indoor or outdoor suitability, group size, equipment needs, energy level, and accessibility or suitability notes.
- **FR-005**: Users MUST be able to open a game detail view containing the aim, setup, instructions, equipment, duration, space, group size, energy level, safety notes, accessibility notes, and UK Cub Scout suitability context.
- **FR-006**: The system MUST use UK English spelling, terminology, and UK Cub Scout-appropriate iconography in user-facing labels and navigation.
- **FR-007**: Leader-facing catalogue, search, detail, favourites, ratings, and randomiser workflows MUST be usable on phone-sized screens.
- **FR-008**: Users MUST be able to mark and unmark games as favourites.
- **FR-009**: Users MUST be able to retrieve favourited games from the catalogue or a dedicated favourites view.
- **FR-010**: Users MUST be able to rate a game only after confirming it has been played.
- **FR-011**: The system MUST distinguish played-game ratings from favourites and unplayed preferences.
- **FR-012**: Game rating summaries MUST be visible where they help users compare games, without exposing unnecessary personal details.
- **FR-013**: Users MUST be able to request a random game suggestion using criteria including duration, space, equipment, group size, and energy level.
- **FR-014**: Random game suggestions MUST satisfy all selected criteria or explain that no eligible games are available.
- **FR-015**: Authorised admins MUST be able to create new game records with all required metadata.
- **FR-016**: Authorised admins MUST be able to edit existing game records without breaking existing favourites, rating summaries, search results, filters, or randomiser eligibility.
- **FR-017**: The system MUST prevent publication of games that are missing required catalogue metadata.
- **FR-018**: The system MUST separate admin maintenance workflows from leader-facing browsing workflows.
- **FR-019**: The system MUST minimise stored personal activity data for favourites and ratings to what is needed for retrieval, moderation, and product quality.
- **FR-020**: The system MUST provide clear empty, error, and no-match states for search, filters, favourites, ratings, randomiser, and admin publishing.
- **FR-021**: The system MUST preserve access to published games when an admin edits non-destructive details such as instructions, metadata, or suitability notes.
- **FR-022**: The system MUST support retiring or unpublishing a game without deleting historical rating information needed for catalogue integrity.

### Key Entities *(include if feature involves data)*

- **Game**: A published or draft activity record with title, description, aim, setup, instructions, duration, space suitability, group size, equipment, energy level, safety notes, accessibility notes, category or activity type, publication status, and UK Cub Scout suitability context.
- **Game Metadata**: Structured fields used for search, filtering, randomiser criteria, index display, and admin validation.
- **Favourite**: A user-specific saved reference to a game for quick retrieval.
- **Played Rating**: Feedback recorded after a user confirms a game has been played, including a rating value and optional short feedback suitable for catalogue quality review.
- **User Role**: A distinction between leader/helper browsing access and authorised admin maintenance access.
- **Randomiser Criteria**: User-selected constraints such as duration, space, equipment, group size, energy level, and suitability notes that determine eligible game suggestions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 90% of leaders can find a suitable game for a specified evening scenario in under 60 seconds on a phone-sized screen.
- **SC-002**: 95% of searches or filter changes show relevant results, no-match guidance, or an error recovery path in under 2 seconds from the user's perspective.
- **SC-003**: 100% of published games include required metadata for duration, space, group size, equipment, energy level, and suitability notes.
- **SC-004**: 90% of first-time leader users can open the full index, view a game detail, and return to results without assistance.
- **SC-005**: 90% of randomiser suggestions satisfy all selected criteria in user acceptance testing, with the remaining cases explained by limited catalogue availability or broadened criteria.
- **SC-006**: 95% of authorised admins can create and publish a complete game record without leaving required metadata blank.
- **SC-007**: 95% of rating submissions are associated with games users confirm they have played.
- **SC-008**: 90% of surveyed leaders agree that the site uses language, iconography, and labels that feel appropriate for a UK Cub Scout setting.

## Assumptions

- Primary users are UK Cub Scout leaders and helpers planning regular evening meetings.
- Young people may see game content during meetings, so public game content must be age-appropriate and inclusive.
- Admin users are trusted authorised adults responsible for maintaining catalogue quality.
- Phone usability is in scope for the first release; desktop and tablet layouts remain supported but are not the primary design constraint.
- The first release covers storing, finding, favouriting, rating, randomising, creating, editing, retiring, and unpublishing games, but does not include event scheduling or attendance tracking.
- Ratings are intended to improve game selection and catalogue quality, not to rank individual leaders or young people.
- Favourites are personal retrieval aids and are not assumed to be visible to other users.
