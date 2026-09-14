# Tasks: Cub Games Site

**Input**: Design documents from `/specs/001-cub-games-site/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/catalogue-admin-contract.md](contracts/catalogue-admin-contract.md), [quickstart.md](quickstart.md)

**Tests**: Included because the constitution and quickstart require regression coverage for search, filtering, favourites, ratings, randomiser criteria, admin create/edit flows, and phone-sized viewports.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialise the compact full-stack TypeScript web application and shared project structure.

- [X] T001 Create application scaffold and scripts in `package.json`, `tsconfig.json`, and `app/`
- [X] T002 [P] Create test configuration for unit, integration, contract, and browser checks in `tests/unit/`, `tests/integration/`, `tests/contract/`, and `tests/e2e/`
- [X] T003 [P] Create shared source directories from the plan in `src/components/`, `src/domain/`, `src/persistence/`, `src/services/`, and `src/validation/`
- [X] T004 [P] Create responsive UK Cub Scout design foundations in `src/components/design-tokens.ts` and `src/components/AppShell.tsx`
- [X] T005 [P] Create seeded game fixture data covering published, draft, retired, and unpublished games in `tests/fixtures/games.ts`
- [X] T006 [P] Create phone viewport test helpers in `tests/e2e/helpers/phoneViewport.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement shared data contracts, validation, persistence, and role boundaries required by all user stories.

- [X] T007 Define Game, Game Metadata, Favourite, Played Rating, User Role, and Randomiser Criteria types in `src/domain/types.ts`
- [X] T008 Implement Game validation in `src/validation/gameValidation.ts` with constraints: "Published games must include title, summary, instructions, duration, space, group size, equipment value, energy level, and suitability notes"
- [X] T009 Extend Game validation in `src/validation/gameValidation.ts` with constraints: "Duration minimum must be greater than zero and must not exceed duration maximum"
- [X] T010 Extend Game validation in `src/validation/gameValidation.ts` with constraints: "Group size minimum must be greater than zero and must not exceed group size maximum when a maximum is present"
- [X] T011 Extend Game validation in `src/validation/gameValidation.ts` with constraints: "Equipment must explicitly record either required items or no equipment"
- [X] T012 Implement publication-state rules in `src/domain/gameState.ts` with transitions Draft -> Published, Published -> Retired, Published -> Unpublished, and Retired or Unpublished -> Published
- [X] T013 Implement role checks in `src/domain/roles.ts` with constraints: "Only authorised admins may create, edit, publish, retire, or unpublish games" and "Leader/helper access must not expose admin maintenance controls"
- [X] T014 Create persistence interfaces for games, favourites, ratings, and users in `src/persistence/repositories.ts`
- [X] T015 Implement in-memory persistence adapter for initial development and tests in `src/persistence/inMemoryStore.ts`
- [X] T016 [P] Create validation tests for required metadata, duration, group size, equipment, and publication state in `tests/unit/gameValidation.test.ts`
- [X] T017 [P] Create role-boundary tests for leader/helper versus authorised admin access in `tests/unit/roles.test.ts`
- [X] T018 [P] Create app navigation routes for catalogue, game detail, favourites, randomiser, and admin games in `app/layout.tsx`, `app/catalogue/page.tsx`, `app/games/[gameId]/page.tsx`, `app/favourites/page.tsx`, `app/randomiser/page.tsx`, and `app/admin/games/page.tsx`

**Checkpoint**: Shared foundations compile and tests prove metadata validation, publication state, and role boundaries before any user story implementation begins.

---

## Phase 3: User Story 1 - Find a Game for Tonight (Priority: P1)

**Goal**: Leaders can quickly search and filter suitable games by meeting constraints on a phone-sized screen.

**Independent Test**: Open the catalogue on a phone-sized screen, apply a 15-minute indoor no-equipment filter, search by partial title or keyword, and confirm matching or no-match results are clear within 2 seconds from the user's perspective.

### Tests for User Story 1

- [X] T019 [P] [US1] Create unit tests for duration, space, equipment, group size, energy, accessibility, and keyword filtering in `tests/unit/gameSearch.test.ts`
- [X] T020 [P] [US1] Create integration tests for catalogue search, filters, and no-match guidance in `tests/integration/catalogueSearch.test.ts`
- [X] T021 [P] [US1] Create phone viewport end-to-end test for the 60-second evening game discovery scenario in `tests/e2e/find-game-tonight.spec.ts`

### Implementation for User Story 1

- [X] T022 [US1] Implement search and filter domain logic in `src/domain/gameSearch.ts`
- [X] T023 [US1] Implement catalogue query service that returns only published, non-retired games in `src/services/catalogueService.ts`
- [X] T024 [P] [US1] Build phone-first filter controls for duration, space, equipment, group size, energy, and accessibility in `src/components/GameFilters.tsx`
- [X] T025 [P] [US1] Build game result cards with title, duration, space, group size, equipment summary, and rating summary in `src/components/GameCard.tsx`
- [X] T026 [US1] Implement catalogue search and filtering page in `app/catalogue/page.tsx`
- [X] T027 [US1] Implement clear no-match and error states for catalogue search in `src/components/CatalogueStates.tsx`

**Checkpoint**: User Story 1 delivers the MVP: leaders can find a suitable game quickly from a phone without admin functionality.

---

## Phase 4: User Story 2 - Browse the Full Game Index (Priority: P1)

**Goal**: Leaders and helpers can browse all published games, open game details, and return to the index without already knowing a game name.

**Independent Test**: View the all-games index, open multiple game details, confirm required metadata and instructions are readable, then return to the index.

### Tests for User Story 2

- [X] T028 [P] [US2] Create contract test for View Full Game Index outcomes in `tests/contract/publicCatalogue.contract.test.ts`
- [X] T029 [P] [US2] Create integration tests for full index display and game detail retrieval in `tests/integration/gameIndex.test.ts`
- [X] T030 [P] [US2] Create phone viewport end-to-end test for index-to-detail-to-index navigation in `tests/e2e/full-index.spec.ts`

### Implementation for User Story 2

- [X] T031 [US2] Implement full index service with published-game metadata summaries in `src/services/gameIndexService.ts`
- [X] T032 [P] [US2] Build full index list view in `src/components/GameIndex.tsx`
- [X] T033 [P] [US2] Build readable game detail content component with aim, setup, instructions, equipment, duration, space, group size, energy, safety notes, accessibility notes, and suitability context in `src/components/GameDetail.tsx`
- [X] T034 [US2] Implement game detail route and missing-game state in `app/games/[gameId]/page.tsx`
- [X] T035 [US2] Add index navigation and return-to-results behaviour in `app/catalogue/page.tsx` and `app/games/[gameId]/page.tsx`

**Checkpoint**: User Stories 1 and 2 together provide a complete published game catalogue and detail browsing experience.

---

## Phase 5: User Story 3 - Use a Criteria-Based Randomiser (Priority: P2)

**Goal**: Leaders can request a random game suggestion that satisfies selected practical criteria and understand why it matches.

**Independent Test**: Select duration, space, equipment, group size, and energy criteria, request a suggestion, confirm it satisfies every criterion, request another eligible suggestion, and verify no-match guidance when none exist.

### Tests for User Story 3

- [X] T036 [P] [US3] Create unit tests for randomiser eligibility using the rule "Random suggestions must satisfy all selected criteria" in `tests/unit/randomiser.test.ts`
- [X] T037 [P] [US3] Create integration tests for randomiser suggestion, repeat suggestion, limited-match, and no-match behaviour in `tests/integration/randomiserFlow.test.ts`
- [X] T038 [P] [US3] Create phone viewport end-to-end test for criteria selection and random suggestion display in `tests/e2e/randomiser.spec.ts`

### Implementation for User Story 3

- [X] T039 [US3] Implement randomiser domain logic in `src/domain/randomiser.ts` with constraints: "The selected game must be published and not retired or unpublished"
- [X] T040 [US3] Implement randomiser service that filters eligible games before selection in `src/services/randomiserService.ts`
- [X] T041 [P] [US3] Build randomiser criteria controls in `src/components/RandomiserControls.tsx`
- [X] T042 [P] [US3] Build random suggestion display with match explanation and limited/no-match states in `src/components/RandomiserResult.tsx`
- [X] T043 [US3] Implement randomiser page flow in `app/randomiser/page.tsx`

**Checkpoint**: Random suggestions are useful during meeting planning and never ignore selected criteria silently.

---

## Phase 6: User Story 4 - Save Favourites and Rate Played Games (Priority: P2)

**Goal**: Leaders can save useful games as favourites and submit ratings only after confirming the game has been played.

**Independent Test**: Favourite a game, retrieve it from favourites, remove it, confirm a game as played, submit a rating, and verify rating summaries update without exposing unnecessary personal details.

### Tests for User Story 4

- [X] T044 [P] [US4] Create unit tests for Favourite rules including "A user may favourite a game only once" in `tests/unit/favourites.test.ts`
- [X] T045 [P] [US4] Create unit tests for Played Rating rules including "Ratings require played confirmation" and "Rating values must stay within the supported rating scale" in `tests/unit/playedRatings.test.ts`
- [X] T046 [P] [US4] Create integration tests for favourite retrieval, unfavourite, played confirmation, rating update, and privacy-safe summaries in `tests/integration/engagementFlow.test.ts`
- [X] T047 [P] [US4] Create phone viewport end-to-end test for favourite and played-rating flows in `tests/e2e/favourites-ratings.spec.ts`

### Implementation for User Story 4

- [X] T048 [US4] Implement favourites domain logic in `src/domain/favourites.ts`
- [X] T049 [US4] Implement played-rating domain logic in `src/domain/playedRatings.ts` with constraint: "A user's rating update should update their previous rating rather than creating misleading duplicates"
- [X] T050 [US4] Implement engagement service for favourites, played confirmation, ratings, and rating summaries in `src/services/engagementService.ts`
- [X] T051 [P] [US4] Build favourite toggle control and helper text in `src/components/FavouriteToggle.tsx`
- [X] T052 [P] [US4] Build played-confirmation and rating controls in `src/components/PlayedRatingControl.tsx`
- [X] T053 [US4] Implement favourites page and empty state in `app/favourites/page.tsx`
- [X] T054 [US4] Integrate favourite and played-rating controls into game detail pages in `app/games/[gameId]/page.tsx`

**Checkpoint**: Engagement features improve repeat use while preserving the distinction between favourites and played-game feedback.

---

## Phase 7: User Story 5 - Maintain Games Through Admin Pages (Priority: P3)

**Goal**: Authorised admins can create, edit, retire, and unpublish games while preserving catalogue integrity.

**Independent Test**: Sign in as an authorised admin, attempt to publish an incomplete draft, complete required metadata, publish it, edit it, confirm public retrieval still works, then retire or unpublish it.

### Tests for User Story 5

- [X] T055 [P] [US5] Create contract tests for Create Game, Edit Game, and Retire or Unpublish Game outcomes in `tests/contract/adminCatalogue.contract.test.ts`
- [X] T056 [P] [US5] Create integration tests for admin create, validation failure, publish, edit, retire, unpublish, and restore flows in `tests/integration/adminGameMaintenance.test.ts`
- [X] T057 [P] [US5] Create phone viewport end-to-end test for admin game forms and validation messages in `tests/e2e/admin-games.spec.ts`

### Implementation for User Story 5

- [X] T058 [US5] Implement admin game maintenance service for create, edit, publish, retire, unpublish, and restore in `src/services/adminGameService.ts`
- [X] T059 [US5] Implement admin route guard using role checks in `app/admin/games/layout.tsx`
- [X] T060 [P] [US5] Build admin game list and publication-state controls in `src/components/admin/AdminGameList.tsx`
- [X] T061 [P] [US5] Build admin game form covering all required Game and Game Metadata fields in `src/components/admin/GameForm.tsx`
- [X] T062 [US5] Implement admin game index page in `app/admin/games/page.tsx`
- [X] T063 [US5] Implement admin create page in `app/admin/games/new/page.tsx`
- [X] T064 [US5] Implement admin edit page in `app/admin/games/[gameId]/page.tsx`
- [X] T065 [US5] Ensure admin edits preserve stable game identity, favourites, rating summaries, search results, filters, and randomiser eligibility in `src/services/adminGameService.ts`

**Checkpoint**: Admins can maintain catalogue content without breaking leader-facing discovery or engagement workflows.

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Finish accessibility, performance, UK Cub Scout language/iconography review, and release validation.

- [X] T066 [P] Audit UK English labels, terminology, and UK Cub Scout-appropriate iconography across `app/` and `src/components/`
- [X] T067 [P] Add accessibility checks for form labels, touch targets, keyboard navigation, focus states, and error messaging in `tests/e2e/accessibility.spec.ts`
- [X] T068 [P] Add performance regression checks for search/filter feedback under 2 seconds in `tests/e2e/performance.spec.ts`
- [X] T069 [P] Add documentation for seed data and validation accounts in `README.md`
- [X] T070 Run full validation commands from quickstart in `package.json` scripts: `npm test`, `npm run test:e2e`, and `npm run build`
- [X] T071 Record release evidence for phone viewport flows, admin integrity, privacy boundaries, and UK Cub Scout context in `specs/001-cub-games-site/release-evidence.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 Setup must complete before Phase 2 Foundation.
- Phase 2 Foundation blocks all user stories.
- User Story 1 and User Story 2 are both P1; complete User Story 1 first for the MVP search/filter flow, then User Story 2 for the full index/detail browsing flow.
- User Story 3 depends on published game retrieval and filtering from User Story 1.
- User Story 4 depends on game detail browsing from User Story 2.
- User Story 5 depends on foundational validation and role boundaries, but can be implemented after leader-facing flows to reduce MVP scope.
- Final Phase depends on all selected user stories for the release slice.

### Story Completion Order

1. US1 - Find a Game for Tonight
2. US2 - Browse the Full Game Index
3. US3 - Use a Criteria-Based Randomiser
4. US4 - Save Favourites and Rate Played Games
5. US5 - Maintain Games Through Admin Pages

### MVP Scope

The MVP is Phase 1, Phase 2, and Phase 3 (US1). This delivers the core evening-planning value: a leader can find a suitable game quickly on a phone-sized screen using practical criteria.

---

## Parallel Execution Examples

### Setup and Foundation

```text
T002, T003, T004, T005, and T006 can run in parallel after T001 starts.
T016, T017, and T018 can run in parallel after T007-T015 define shared contracts.
```

### User Story 1

```text
T019, T020, and T021 can be written in parallel before implementation.
T024 and T025 can run in parallel after T022-T023 establish catalogue data shape.
```

### User Story 2

```text
T028, T029, and T030 can be written in parallel.
T032 and T033 can run in parallel after T031 defines index summaries.
```

### User Story 3

```text
T036, T037, and T038 can be written in parallel.
T041 and T042 can run in parallel after T039-T040 define randomiser behaviour.
```

### User Story 4

```text
T044, T045, T046, and T047 can be written in parallel.
T051 and T052 can run in parallel after T048-T050 define engagement behaviour.
```

### User Story 5

```text
T055, T056, and T057 can be written in parallel.
T060 and T061 can run in parallel after T058-T059 establish admin services and access control.
```

---

## Implementation Strategy

### MVP First

1. Complete Setup and Foundation tasks.
2. Complete US1 tests and implementation.
3. Validate that a leader can find a suitable game in under 60 seconds on a phone-sized screen.
4. Stop and demo before expanding into additional stories.

### Incremental Delivery

1. Add US2 to complete the all-games index and detail browsing experience.
2. Add US3 for criteria-based random game selection.
3. Add US4 for favourites and played-game ratings.
4. Add US5 for authorised catalogue maintenance.
5. Complete cross-cutting validation before release.

### Quality Gates

- No user story is complete until its unit, integration, contract where applicable, and phone viewport checks pass.
- No published game may bypass required metadata validation.
- No admin controls may appear in leader/helper browsing contexts.
- No rating may be accepted without played confirmation.
- No randomiser result may ignore selected criteria silently.
