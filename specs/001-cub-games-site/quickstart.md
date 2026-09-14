# Quickstart: Cub Games Site Validation

## Prerequisites

- Current active Node.js LTS installed
- Project dependencies installed after implementation
- Test seed data containing published, draft, retired, and unpublished games
- At least one leader/helper account and one authorised admin account available for validation

## Setup

```powershell
npm install
npm run dev
```

Open the local site shown by the development command.

## Validation Scenarios

### 1. Find a Game for Tonight

1. Open the catalogue on a phone-sized viewport.
2. Filter for a 15-minute indoor game with no equipment and a medium energy level.
3. Confirm matching results appear in under 2 seconds from the user's perspective.
4. Open a result and confirm duration, space, equipment, group size, safety notes, accessibility notes, and instructions are readable.

**Expected Outcome**: A leader can choose a suitable game in under 60 seconds without desktop-only controls.

### 2. Browse the Full Index

1. Open the all-games index.
2. Confirm every published game appears with title, duration, space, group size, equipment summary, and rating summary where available.
3. Search by a partial title and by an activity keyword.
4. Clear search and filters to return to the full index.

**Expected Outcome**: Published games are easy to retrieve and compare, with clear empty or no-match guidance.

### 3. Use the Randomiser

1. Open the randomiser.
2. Select duration, space, equipment, group size, and energy criteria.
3. Request a suggestion.
4. Confirm the suggested game satisfies every criterion and explains the match.
5. Request another suggestion with the same criteria.

**Expected Outcome**: Suggestions are eligible games only, or the site explains that no eligible games exist.

### 4. Favourite and Rate Played Games

1. Open a game detail as a leader/helper.
2. Mark the game as a favourite.
3. Confirm the game appears in favourites.
4. Confirm the game as played and submit a rating.
5. Confirm the rating summary updates without exposing unnecessary personal details.

**Expected Outcome**: Favourites remain personal retrieval aids and ratings represent played-game feedback.

### 5. Maintain Games as an Admin

1. Sign in as an authorised admin.
2. Create a draft game with missing required metadata and attempt to publish it.
3. Confirm publication is blocked with clear validation guidance.
4. Complete required metadata and publish.
5. Confirm the game appears in the public index, search, filters, and randomiser eligibility.
6. Edit the game and confirm existing favourites and rating summaries stay attached.
7. Retire or unpublish the game and confirm it is removed from normal index and randomiser results.

**Expected Outcome**: Admin changes maintain catalogue integrity and do not break leader workflows.

## Regression Commands

```powershell
npm test
npm run test:e2e
npm run build
```

## Required Evidence Before Release

- Unit coverage for filtering, randomiser eligibility, publication validation, favourites, and played-rating rules
- Integration coverage for catalogue retrieval, admin create/edit, retire/unpublish, and metadata consistency
- End-to-end phone viewport coverage for catalogue, game detail, favourites, ratings, randomiser, and admin forms
- Review evidence that labels use UK English and UK Cub Scout-appropriate language and iconography
