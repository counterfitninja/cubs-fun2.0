# Data Model: Cub Games Site

## Entity: Game

Represents a Cub Scout game or activity in draft, published, retired, or unpublished state.

**Fields**:

- `id`: Stable unique identifier for preserving favourites and ratings across edits
- `title`: Public game title in UK English
- `summary`: Short index description for quick scanning
- `aim`: What the game helps achieve
- `setup`: Preparation instructions before play starts
- `instructions`: Step-by-step play instructions
- `durationMinutesMin`: Minimum expected duration
- `durationMinutesMax`: Maximum expected duration when flexible
- `space`: Indoor, outdoor, or either
- `groupSizeMin`: Minimum suitable group size
- `groupSizeMax`: Maximum suitable group size when applicable
- `equipment`: List of required items, empty when no equipment is needed
- `energyLevel`: Low, medium, or high
- `activityType`: Catalogue grouping such as icebreaker, team, active, quiet, or skill-building
- `safetyNotes`: Risks, supervision notes, or adaptations needed for safe play
- `accessibilityNotes`: Inclusion and adaptation guidance
- `suitabilityNotes`: UK Cub Scout context, age suitability, and meeting-fit notes
- `keywords`: Search terms and alternate names
- `publicationStatus`: Draft, published, retired, or unpublished
- `createdAt`: Date the game record was created
- `updatedAt`: Date the game record was last edited
- `publishedAt`: Date the game first became visible in the public index

**Validation Rules**:

- Published games must include title, summary, instructions, duration, space, group size, equipment value, energy level, and suitability notes.
- Duration minimum must be greater than zero and must not exceed duration maximum.
- Group size minimum must be greater than zero and must not exceed group size maximum when a maximum is present.
- Equipment must explicitly record either required items or no equipment.
- Retired and unpublished games must not appear in the normal public index or randomiser results.

**State Transitions**:

- Draft -> Published when all required metadata is valid.
- Published -> Retired when the game should remain historically identifiable but not normally suggested.
- Published -> Unpublished when the game should be hidden pending correction.
- Retired or Unpublished -> Published when an admin restores valid content.

## Entity: Game Metadata

Represents structured attributes used for search, filtering, index display, randomiser eligibility, and admin validation.

**Fields**:

- Duration range
- Space suitability
- Group size range
- Equipment requirement
- Energy level
- Activity type
- Safety notes
- Accessibility notes
- Suitability notes
- Search keywords

**Relationships**:

- Belongs to one game.
- Drives catalogue filters and randomiser criteria.

## Entity: User Role

Represents the permissions available to a user of the site.

**Fields**:

- `role`: Leader/helper or authorised admin
- `displayName`: Optional human-readable name for admin accountability
- `active`: Whether the role assignment may be used

**Validation Rules**:

- Only authorised admins may create, edit, publish, retire, or unpublish games.
- Leader/helper access must not expose admin maintenance controls.

## Entity: Favourite

Represents a user's saved reference to a game for quick retrieval.

**Fields**:

- `userId`: User reference required to keep favourites personal
- `gameId`: Stable game reference
- `createdAt`: Date the game was favourited

**Validation Rules**:

- A user may favourite a game only once.
- Removing a favourite deletes the saved reference but does not affect the game or ratings.

## Entity: Played Rating

Represents feedback submitted after a user confirms that a game has been played.

**Fields**:

- `userId`: User reference used to prevent duplicate or abusive submissions where required
- `gameId`: Stable game reference
- `rating`: Bounded rating value
- `playedConfirmed`: Confirmation that the game was played
- `feedback`: Optional short note for catalogue quality review
- `createdAt`: Date the rating was submitted
- `updatedAt`: Date the rating was last changed

**Validation Rules**:

- Ratings require played confirmation.
- Rating values must stay within the supported rating scale.
- Rating summaries must not expose unnecessary personal details.
- A user's rating update should update their previous rating rather than creating misleading duplicates.

## Entity: Randomiser Criteria

Represents the filters used to choose an eligible random game.

**Fields**:

- Duration range
- Space
- Group size
- Equipment preference
- Energy level
- Activity type
- Accessibility or suitability constraints

**Validation Rules**:

- Random suggestions must satisfy all selected criteria.
- When no game matches, the user must receive clear no-match guidance.
- The selected game must be published and not retired or unpublished.
