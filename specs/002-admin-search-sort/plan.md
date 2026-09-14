# Implementation Plan: Admin Search and Sort

**Branch**: `002-admin-search-sort` | **Date**: 2026-09-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-admin-search-sort/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add client-side search and single-select sorting to the authorised admin game-maintenance list. Search will reuse the catalogue's normalised text matching approach over admin-visible identifying fields. The list will retain its existing game records and status actions; sorting will use deterministic title, publication-status, and last-updated options. A focused component test will cover matching, no-match feedback, ordering, and status-action availability.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript with strict checking; React and Next.js versions are repository-managed

**Primary Dependencies**: React, Next.js, lucide-react, Vitest, Testing Library

**Storage**: Existing in-memory game store; no persistence or schema changes

**Testing**: Vitest in jsdom with Testing Library and user-event; `npm test`, `npm run test:e2e`, and `npm run build`

**Target Platform**: Modern browsers, including phone-sized viewports

**Project Type**: Next.js web application

**Performance Goals**: Results or an informative no-match state update within 2 seconds of a search or sort change

**Constraints**: Authorised admin list only; UK English; keyboard-accessible native controls; preserve edit/publish/retire actions; no mutation of source records or leader catalogue behaviour

**Scale/Scope**: One existing admin list component and focused coverage for list interactions; expected catalogue size is at least 100 records

## Constitution Check

*GATE: Passed before Phase 0 research. Re-checked after Phase 1 design: passed.*

- **Youth-Safe Cub Scout Focus**: Pass. No game content is altered; visible labels remain appropriate and use UK English.
- **Fast Evening Game Discovery**: Pass. The work improves a separate, authorised admin workflow and does not change leader-facing discovery.
- **Mobile-First Access**: Pass. The new controls use existing responsive toolbar and native keyboard-operable inputs.
- **Curated Game Index and Admin Integrity**: Pass. Search and sort are derived views only; game identity, metadata, and maintenance actions remain intact.
- **Engagement Data With Clear Boundaries**: Pass. The feature neither collects nor exposes favourites, ratings, or personal data.

## Project Structure

### Documentation (this feature)

```text
specs/002-admin-search-sort/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
app/
└── admin/games/page.tsx                # Route entry point

src/
├── components/
│   ├── AdminGamesPage.tsx               # Admin page composition and store actions
│   └── admin/AdminGameList.tsx          # Search, sort, results, and per-record actions
├── domain/
│   └── types.ts                         # Existing Game and PublicationStatus types
└── persistence/
  └── inMemoryStore.ts                 # Existing game data only

tests/
└── e2e/admin-games.spec.tsx             # Admin UI interaction coverage
```

**Structure Decision**: Extend the existing admin list component because it directly renders the records and record actions. Keep query and sort preferences local to that component; no new service, route, store property, or persistence artefact is warranted.

