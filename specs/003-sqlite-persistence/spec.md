# Feature Specification: Shared SQLite Game Persistence

**Feature Branch**: `003-sqlite-persistence`

**Created**: 2026-09-14

**Status**: Draft

**Input**: User description: "the site needs to store the games in a sqllite data format so it persists when different people access it"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Shared Game Data Persists (Priority: P1)

As a Cub Scout leader or admin, I want game entries to be stored in a shared SQLite database so that my changes remain available when different people access the site.

**Why this priority**: Without server-side persistence, edits are isolated to one browser and cannot be relied on across users.

**Independent Test**: Create or edit a game in one browser session, reload in another browser or session, and confirm the game remains available.

**Acceptance Scenarios**:

1. **Given** the app has a populated game catalogue, **When** an admin creates or edits a game, **Then** the change is saved to a persistent database and remains after a page reload.
2. **Given** a second user opens the site in a different browser or session, **When** they view the catalogue, **Then** the shared data is available without relying on local browser storage.
3. **Given** the database is unavailable or empty, **When** the app starts, **Then** it fails gracefully and explains that game data cannot be retrieved until the database is initialised.

---

### User Story 2 - Admin Can Maintain Shared Records (Priority: P1)

As an authorised admin, I want the game maintenance workflow to write to the database rather than browser localStorage so that updates are consistent for everyone using the site.

**Why this priority**: Admin actions need to produce durable records that remain accurate across visits and users.

**Independent Test**: Save a new game, change publication status, then verify the updated values are persisted and visible in a fresh session.

**Acceptance Scenarios**:

1. **Given** an admin creates a new game, **When** they save it, **Then** the record is inserted into the shared database and appears in future sessions.
2. **Given** an admin edits an existing record, **When** they save the changes, **Then** the updated fields persist and replace the old values.
3. **Given** an admin changes publication status, **When** the list reloads, **Then** the status reflects the latest record in the shared database.

---

### User Story 3 - The Site Uses a Stable Shared Schema (Priority: P2)

As a maintainer, I want the persistence layer to use a predictable SQLite schema so the data can be queried reliably and evolves without breaking the app.

**Why this priority**: A shared schema reduces inconsistency and makes future data migration safer.

**Independent Test**: Check the DB schema and confirm canonical tables and fields exist for games, metadata, and default records.

**Acceptance Scenarios**:

1. **Given** the application starts for the first time, **When** it boots, **Then** it creates the required SQLite tables and indexes if they do not already exist.
2. **Given** a persisted record includes structured fields, **When** the app reads it, **Then** it returns the same schema-backed values expected by the UI and APIs.
3. **Given** a schema change is required, **When** the application updates, **Then** migration handling ensures old data remains readable or is intentionally migrated.

### Edge Cases

- Existing browser-only data must not silently overwrite database content when the shared persistence layer is enabled.
- Searches and filters continue to work when games are stored in SQLite rather than in-memory arrays.
- The app handles missing database files or lock errors with clear server-side feedback.
- Empty or partial records still validate according to the existing admin integrity rules before they are saved.
- Game IDs stay stable so favourites, ratings, and related references do not break across user sessions.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST persist game records in SQLite so the catalogue survives browser refreshes and multiple user sessions.
- **FR-002**: The system MUST create the SQLite schema when the application starts for the first time if the database file does not already exist.
- **FR-003**: The system MUST support create, read, update, and publication-status changes for game records through server-side persistence.
- **FR-004**: The system MUST stop depending on browser localStorage for shared game data once the SQLite-backed persistence layer is active.
- **FR-005**: The system MUST return persisted content through API routes that the front end can consume consistently.
- **FR-006**: The system MUST preserve the game record identity and metadata required by search, filtering, favourites, user ratings, and randomiser logic.
- **FR-007**: The system MUST validate required fields before saving a record so admin integrity rules are retained.
- **FR-008**: The system MUST expose enough persistence metadata to support auditing fields such as created and updated timestamps.
- **FR-009**: The system MUST handle database initialisation failures gracefully and present a clear error state without breaking the public page.
- **FR-010**: The system MUST support migration-friendly table design so future schema changes can be managed without losing existing game content.

### Key Entities *(include if feature involves data)*

- **Game Record**: A single catalogue item with title, summary, instructions, metadata, publication status, and timestamps.
- **SQLite Database**: The shared persistence layer that stores game records and supports read/write operations for multiple users.
- **Admin Persistence Layer**: The server-side data access boundary that validates and writes game records to the database.
- **Migration Metadata**: Versioning information used to version the database schema and handle future upgrades safely.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new or edited game remains visible after a page reload and in a different browser session within 2 seconds of the save action.
- **SC-002**: 100% of admin game actions that previously mutated local state are backed by SQLite writes through the server persistence layer.
- **SC-003**: The application creates a working SQLite database file on first startup without manual database setup steps.
- **SC-004**: The system retains all required game metadata used by search, randomiser, and admin workflows after persistence migration.
- **SC-005**: A failed database connection or schema creation results in a clear, user-visible error rather than silent data loss.

## Assumptions

- The site is a single Next.js application without a separate backend service.
- SQLite is appropriate for local or shared-server deployments where a lightweight database is preferred over a full external database service.
- The feature is focused on durable game storage, not a general user-authentication or multi-tenant system.
- Existing admin validation and UI workflows remain the same; the main change is where the data is stored and retrieved.
