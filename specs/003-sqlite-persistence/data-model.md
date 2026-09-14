# Data Model: Shared SQLite Game Persistence

## Overview

The product already has a strong domain model for games; the change is in the storage layer, not the public domain contract. The database must preserve the same `Game` fields while giving the app an authoritative shared store for create, read, update, and status transitions.

## Entities

### Game

| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | TEXT | Primary key, required | Stable identifier used by UI and references |
| title | TEXT | Required | Human-readable title |
| summary | TEXT | Required | Short catalogue summary |
| aim | TEXT | Optional | Activity objective |
| setup | TEXT | Optional | Setup detail |
| instructions | TEXT | Required | Core activity rules |
| durationMinutesMin | INTEGER | Optional | Minimum duration |
| durationMinutesMax | INTEGER | Optional | Maximum duration |
| space | TEXT | Required | indoor, outdoor, or either |
| groupSizeMin | INTEGER | Optional | Minimum group size |
| groupSizeMax | INTEGER | Optional | Maximum group size |
| equipment | TEXT | Optional | JSON array or pipe-delimited values |
| energyLevel | TEXT | Optional | low, medium, or high |
| activityType | TEXT | Optional | team, active, quiet, skill-building |
| safetyNotes | TEXT | Optional | Safety guidance |
| accessibilityNotes | TEXT | Optional | Inclusion guidance |
| suitabilityNotes | TEXT | Optional | Use context |
| keywords | TEXT | Optional | JSON array or text list |
| publicationStatus | TEXT | Required | draft, published, retired |
| createdAt | TEXT | Required | ISO-8601 timestamp |
| updatedAt | TEXT | Required | ISO-8601 timestamp |
| publishedAt | TEXT | Optional | ISO-8601 timestamp |

### Schema metadata

| Field | Type | Constraints | Notes |
|---|---|---|---|
| schema_version | INTEGER | Required | Tracks current persistence schema version |
| updated_at | TEXT | Required | Last database migration or maintenance timestamp |

## Relationships

- One `Game` row maps to one catalogue item used by search, filters, favourites, ratings, and randomiser logic.
- The `Game` table is the authoritative persistent representation; the UI should read from it rather than from browser-only state.
- Seed or imported content may populate the database once, after which the application updates records in place.

## Validation rules

- `id` and `title` must be present before a record can be saved.
- `publicationStatus` must be one of the supported values.
- Structured arrays such as `equipment` and `keywords` should be stored in a stable, query-friendly format (JSON text or a normalised table if necessary).
- `updatedAt` must be refreshed whenever a record changes.
- `publishedAt` is only required when a game is published.

## State transitions

- `draft` -> `published` when an admin approves and publishes the record.
- `published` -> `retired` when the record is no longer current.
- Any state change must update `updatedAt` and set `publishedAt` when relevant.

## Persistence decisions

- A single `games` table is the minimum viable schema for this feature.
- Additional tables for favourites or ratings may be introduced later if the project expands beyond game persistence; they are out of scope for this feature.
