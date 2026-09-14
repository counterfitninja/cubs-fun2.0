# Research: Cub Games Site

## Decision: Use a compact full-stack TypeScript web application

**Rationale**: The feature needs phone-first pages, shared catalogue persistence, authenticated admin maintenance, and user-specific favourites/ratings. A single full-stack web app keeps these workflows together while still allowing domain rules, validation, persistence, and UI to remain separated.

**Alternatives considered**:

- Static site with editable files: rejected because admin upload/edit workflows and shared favourites/ratings require persistent multi-user state.
- Separate frontend and backend projects: rejected for initial delivery because it increases coordination and deployment complexity without a clear current need.
- Mobile-native app: rejected because the requirement is a site and leaders/helpers need broad device access without app installation.

## Decision: Store catalogue and engagement data in server-side relational storage

**Rationale**: Games have structured metadata, publication states, favourites, played ratings, and admin edits that need relationships and validation. Relational storage gives reliable filtering, rating summaries, and preservation of game identity after edits.

**Alternatives considered**:

- Browser-only storage: rejected because favourites and ratings would not support shared or multi-device use reliably.
- Flat JSON files only: rejected because admin editing, validation, rating aggregation, and retire/unpublish states would become fragile.
- Document-only storage: rejected for initial delivery because filtering and required metadata validation are central workflows.

## Decision: Treat admin access as role-gated and separate from leader browsing

**Rationale**: The constitution requires admin maintenance to be separated from leader-facing browsing. Admins need create, edit, publish, retire, and unpublish controls, while leaders need fast retrieval without maintenance controls in the way.

**Alternatives considered**:

- Shared editing controls on public game pages: rejected because it risks accidental edits and clutters phone-first leader workflows.
- Anonymous admin changes: rejected because catalogue integrity requires accountable authorised maintenance.

## Decision: Define game metadata around meeting-planning constraints

**Rationale**: Duration, indoor/outdoor space, equipment, group size, energy level, accessibility, safety, and suitability notes directly support quick evening game discovery and the randomiser.

**Alternatives considered**:

- Free-text-only descriptions: rejected because they cannot reliably power filters or criteria-based randomisation.
- Excessive taxonomy before launch: rejected because leaders need quick entry and retrieval; metadata must be useful but not burdensome.

## Decision: Require played confirmation before accepting ratings

**Rationale**: The specification and constitution distinguish played-game feedback from unplayed preferences. Confirmation keeps rating summaries closer to real meeting experience and avoids mixing ratings with favourites.

**Alternatives considered**:

- Let any user rate any game: rejected because it weakens the meaning of ratings.
- Use favourites as ratings: rejected because favourites are a personal retrieval aid, not feedback on played quality.

## Decision: Criteria-based randomiser filters before selection

**Rationale**: Random suggestions must satisfy selected criteria or explain that no eligible games exist. Filtering first makes the result testable and lets the site show why a suggestion matches.

**Alternatives considered**:

- Pick a random game and then warn about mismatches: rejected because it wastes time in the primary evening-planning workflow.
- Pure random pick with no criteria: rejected because the user specifically requested criteria and the constitution prioritises practical constraints.

## Decision: Validate phone usability with browser end-to-end scenarios

**Rationale**: The constitution makes phone-first access a release gate. Browser validation at phone-sized viewports can prove catalogue, detail, favourites, ratings, randomiser, and admin controls remain usable.

**Alternatives considered**:

- Desktop-only manual review: rejected because it misses the primary use context.
- Unit tests only: rejected because layout, navigation, and touch-friendly controls require user-flow validation.
