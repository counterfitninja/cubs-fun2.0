# Implementation Plan: Shared SQLite Game Persistence

**Branch**: `003-sqlite-persistence` | **Date**: 2026-09-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-sqlite-persistence/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Replace browser-local game storage with a shared SQLite-backed persistence layer so game content remains available across browser sessions and multiple users. The solution will keep the existing admin validation rules and UI flows while moving the durable data source from `localStorage` to server-side database access through a repository boundary and API routes.

## Technical Context

**Language/Version**: TypeScript with React and Next.js; repository-managed Node.js runtime

**Primary Dependencies**: Next.js, React, Vitest, SQLite driver such as `better-sqlite3` or `sqlite3`

**Storage**: SQLite file database with schema migration support and a server-side repository boundary

**Testing**: Vitest unit/integration tests for repository and API contracts; browser tests for admin save/reload flows

**Target Platform**: Modern browsers and a local/shared Node host running the Next.js app

**Project Type**: Web application with local SQLite persistence

**Performance Goals**: Game reads and writes complete within normal request latency; catalogue queries return in sub-second intervals for typical game counts

**Constraints**: Keep admin metadata validation; maintain compatibility with existing game search and randomiser logic; no reliance on browser localStorage for shared game data; support graceful database startup failure

**Scale/Scope**: One application, one SQLite database file, and CRUD access for the game catalogue with metadata fields already used by the app

## Constitution Check

*GATE: Passed before Phase 0 research. Re-checked after Phase 1 design: passed.*

- **Youth-Safe Cub Scout Focus**: Pass. This change does not alter the content or safety guidance; it preserves the existing game catalog and admin integrity rules.
- **Fast Evening Game Discovery**: Pass. The feature keeps the same retrieval semantics while making the game catalogue durable and shared, which improves reliability without changing leader-facing discovery quality.
- **Mobile-First Access**: Pass. The shared persistence layer is server-side and does not change the phone-first UI requirements.
- **Curated Game Index and Admin Integrity**: Pass. The database-backed design preserves structured metadata and makes admin edits durable without weakening validation.
- **Engagement Data With Clear Boundaries**: Pass. The change is limited to game persistence and does not broaden handling of personal data beyond the existing favourites and ratings model.

## Project Structure

### Documentation (this feature)

```text
specs/003-sqlite-persistence/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
app/
├── api/
│   └── games/
│       └── route.ts                 # existing GET route to be expanded for shared persistence
src/
├── domain/
│   └── types.ts                     # shared game schema used across APIs and UI
├── persistence/
│   ├── database.ts                  # SQLite connection and migration bootstrap
│   ├── repositories.ts              # CRUD repository for game records
│   ├── inMemoryStore.ts             # deprecated or retained only for fallback seed data
│   └── gameMarkdown.ts              # import path for markdown-backed initial content
├── services/
│   ├── adminGameService.ts          # validation and admin write operations
│   └── AppStoreProvider.tsx         # provider updated to use server-backed data
└── validation/
    └── gameValidation.ts            # persists the current admin checks

tests/
├── contract/
│   └── publicCatalogue.contract.test.ts
├── integration/
│   └── adminGameMaintenance.test.ts
├── unit/
│   └── gameValidation.test.ts
└── e2e/
    └── admin-games.spec.tsx
```

**Structure Decision**: Keep the existing Next.js app structure and add SQLite persistence behind the current repository/service boundary. The shared database will be initialised server-side and all game CRUD flows will route through a single repository so the UI code remains close to the current admin logic.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitution violations identified.
