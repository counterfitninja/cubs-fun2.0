# Game Storage Contract

## Overview

The application exposes a server-backed API for reading and writing the game catalogue. The storage layer is SQLite-backed and must preserve the current `Game` model so the UI and existing search logic remain unchanged.

## Endpoints

### GET /api/games

**Purpose**: Returns the current list of stored games.

**Response**:
```json
[
  {
    "id": "torchlight-trails",
    "title": "Torchlight Trails",
    "summary": "A quick indoor trail game using picture clues around the hall.",
    "publicationStatus": "published",
    "createdAt": "2026-09-14T09:00:00.000Z",
    "updatedAt": "2026-09-14T09:00:00.000Z"
  }
]
```

### POST /api/games

**Purpose**: Creates a new game record.

**Request body**: A valid `Game` payload with all required fields.

**Success response**: HTTP 201 with the created game object.

### PUT /api/games/:id

**Purpose**: Updates an existing game record.

**Request body**: Partial or full `Game` update payload that preserves the required validation contract.

**Success response**: HTTP 200 with the updated game object.

### PATCH /api/games/:id/status

**Purpose**: Updates only the publication status for an existing game.

**Request body**:
```json
{ "publicationStatus": "published" }
```

**Success response**: HTTP 200 with the updated game object.

## Error handling

- Missing or invalid request data returns HTTP 400.
- Database startup or write failures return HTTP 500 with a clear server error message.
- Missing records return HTTP 404.

## Contract notes

- The API contract remains compatible with the existing `Game` domain model and current UI expectations.
- The database-backed implementation is internal to the server; the front end should consume the same shape it already uses for game display and editing.
