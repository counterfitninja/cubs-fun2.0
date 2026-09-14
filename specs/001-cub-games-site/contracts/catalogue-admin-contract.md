# Contract: Cub Games Site User and Admin Workflows

## Purpose

Defines the observable behaviours that implementation and tests must preserve for the Cub Scout games catalogue, leader workflows, and admin maintenance.

## Public Catalogue Contract

### View Full Game Index

**Actor**: Leader/helper

**Inputs**: Optional search term and filter criteria

**Required Outcome**:

- Shows all published games that match the current search and filters.
- Shows title, duration, space, group size, equipment summary, and rating summary where available.
- Keeps labels in UK English and suitable for a UK Cub Scout site.
- Provides clear no-match guidance when no games match.

### View Game Detail

**Actor**: Leader/helper

**Inputs**: Selected published game

**Required Outcome**:

- Shows aim, setup, instructions, equipment, duration, space, group size, energy level, safety notes, accessibility notes, and suitability context.
- Allows favouriting from the game context.
- Allows played-game rating only after played confirmation.

### Retrieve Favourites

**Actor**: Leader/helper

**Inputs**: Current user's saved favourites

**Required Outcome**:

- Shows favourited games that are still available to the user.
- Allows removing a favourite without changing game content or rating summaries.
- Handles an empty favourites list with clear guidance.

## Randomiser Contract

### Suggest Matching Game

**Actor**: Leader/helper

**Inputs**: Duration, space, equipment, group size, energy level, and optional suitability criteria

**Required Outcome**:

- Chooses from published games that satisfy every selected criterion.
- Shows why the suggestion matches the chosen criteria.
- Allows another suggestion using the same criteria when another eligible game exists.
- Explains when too few or no games match.

## Admin Catalogue Contract

### Create Game

**Actor**: Authorised admin

**Inputs**: Game content and required metadata

**Required Outcome**:

- Saves draft content when publication requirements are not complete.
- Publishes only when required metadata is valid.
- Makes published games available to the index, search, filters, and randomiser.

### Edit Game

**Actor**: Authorised admin

**Inputs**: Existing game and changed content or metadata

**Required Outcome**:

- Preserves the stable game identity.
- Preserves existing favourites and rating summaries when edits are non-destructive.
- Updates index, search, filters, detail pages, and randomiser eligibility consistently.

### Retire or Unpublish Game

**Actor**: Authorised admin

**Inputs**: Published game and chosen non-public state

**Required Outcome**:

- Removes the game from normal public index and randomiser eligibility.
- Preserves historical rating information needed for catalogue integrity.
- Allows restoration when content and metadata are valid.

## Cross-Cutting Contract

- Leader-facing workflows must be operable on phone-sized screens without hover-only controls.
- Admin workflows must not appear in leader/helper browsing contexts.
- Favourites and ratings must not expose unnecessary personal details.
- Required metadata validation must run before publication.
