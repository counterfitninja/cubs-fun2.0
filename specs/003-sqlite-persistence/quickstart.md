# Quickstart: Validate Shared SQLite Persistence

## Prerequisites

- Node.js and npm installed
- The repository checked out locally
- A writable local filesystem path for the SQLite database file

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app in development mode:
   ```bash
   npm run dev
   ```
3. Ensure the application can create the database file at a known local path such as `data/cubs-games.sqlite` or another configured path in the app environment.

## Validation scenarios

### 1. First-run database creation

- Start the app with no existing SQLite file.
- Open the admin games page.
- Confirm the app creates the required tables and loads the catalogue without crashing.

Expected outcome: the database file exists and the app lists games without errors.

### 2. Create and persist a game

- Open the admin form and add a new game.
- Save the record.
- Refresh the page or open a second browser session.

Expected outcome: the new game remains visible after reload and in the second session.

### 3. Edit an existing game

- Update a saved game title or publication status.
- Refresh the page.

Expected outcome: the edited values remain in the database-backed catalog.

### 4. Failed database bootstrap

- Temporarily point the app at an invalid or unwritable database path.
- Start the app and open the admin page.

Expected outcome: the app surfaces a clear error state instead of silently losing data.

## Expected result

The shared SQLite store allows different users to see the same durable game list while preserving the project’s existing admin rules and search/filter behaviour.
