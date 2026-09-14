# Research: Shared SQLite Game Persistence

## Decision

Use a server-side SQLite database as the single durable source of truth for the game catalogue. The app will keep the current Game type and admin validation rules, but move create/update/read flows from browser `localStorage` into a repository that writes to SQLite through API routes and server-side data access.

## Rationale

- The current app stores game edits in browser `localStorage` only, so different users do not see the same shared catalogue.
- The project already has a clean persistence/service layering pattern and a clear Game data model, so the smallest viable improvement is to preserve that structure and replace the in-browser store with a backed database.
- SQLite is a good fit for this codebase because it is lightweight, local-first, and easy to initialise in a single Next.js application without deploying a separate database service.

## Alternatives considered

1. Keep `localStorage` for all game writes.
   - Rejected because it does not persist across users and fails the requirement for shared access.

2. Use a remote database service such as Postgres.
   - Rejected for this phase because the project does not currently include hosting or infrastructure for a separate managed database and the requirement is a lightweight shared store.

3. Store a JSON file on disk instead of SQLite.
   - Rejected because SQLite provides a clearer schema, safer writes, and better migration support than plain file JSON for concurrent access and future growth.

## Technical findings

- The existing app uses `AppStoreProvider` to manage the `games`, `favourites`, and `ratings` state and writes it to `localStorage` with the key `cubs-games-state`.
- The admin service already centralises create/edit/status write logic, which makes it a good place to add persistence through a server repository rather than rewriting the whole UI.
- A shared SQLite database should be initialised at application startup and expose a small CRUD layer for `games` records, including timestamps and publication status.
- The current imported markdown content can remain as an initial seed source, but the live data store should be the database once the migration is active.

## Open points resolved

- Shared persistence is achieved by moving the authoritative game store to SQLite.
- The UI continues to use the existing `Game` data shape, preserving search, filtering, and randomiser expectations.
- The database can create its own schema on first run while maintaining compatibility with the current metadata fields.
