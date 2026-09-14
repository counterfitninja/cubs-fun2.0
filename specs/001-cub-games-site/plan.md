# Implementation Plan: Cub Games Site

**Branch**: `001-cub-games-site` | **Date**: 2026-09-14 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-cub-games-site/spec.md`

## Summary

Build a phone-first UK Cub Scout games catalogue that lets leaders quickly find, filter,
favourite, rate, and randomly select games for evening meetings, while authorised admins can
create, edit, retire, and unpublish structured game records. The implementation will use a compact
full-stack TypeScript web application with persistent server-side storage, responsive leader-facing
screens, separated admin workflows, and regression coverage for discovery, metadata integrity,
ratings, favourites, randomiser criteria, and phone-sized viewports.

## Technical Context

**Language/Version**: TypeScript 5.x on current active Node.js LTS

**Primary Dependencies**: React-based full-stack web framework, schema validation, accessible UI
primitives/icons, authentication/session support, and server-side persistence adapter

**Storage**: Server-side relational storage for games, metadata, favourites, played ratings, and
admin publication state

**Testing**: Unit tests for filtering/randomiser/domain rules, integration tests for catalogue and
admin flows, and browser end-to-end checks for phone-sized leader workflows

**Target Platform**: Responsive web application for modern mobile and desktop browsers

**Project Type**: Full-stack web application

**Performance Goals**: Search/filter feedback visible to users in under 2 seconds; 90% of leaders
find a matching game in under 60 seconds on a phone-sized screen

**Constraints**: UK English and UK Cub Scout context throughout; admin workflows separated from
leader browsing; required metadata validation before publication; no hover-only or desktop-only
leader interactions; stored personal activity data limited to retrieval, moderation, and product
quality needs

**Scale/Scope**: Single-site catalogue for one Cub Scout community, expected to handle hundreds of
games, multiple leaders/helpers, and a small number of authorised admins

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Youth-safe Cub Scout focus: PASS. The plan keeps content age-appropriate, inclusive, and UK Cub
  Scout-specific, with UK English labels and iconography as explicit constraints.
- Fast evening game discovery: PASS. Search, filtering, metadata, favourites, ratings, and
  randomiser criteria are primary workflows with measurable speed targets.
- Mobile-first access: PASS. Phone-sized catalogue, detail, favourites, ratings, and randomiser
  validation is required before release.
- Curated game index and admin integrity: PASS. Admin create/edit/retire/unpublish flows preserve
  retrieval, metadata validity, favourites, ratings, and randomiser eligibility.
- Engagement data boundaries: PASS. Favourites and played ratings are limited to retrieval,
  comparison, moderation, and product quality without unnecessary personal exposure.

**Post-Design Re-check**: PASS. `research.md`, `data-model.md`, `contracts/`, and
`quickstart.md` preserve the same gates: phone-first discovery remains primary, game metadata is
structured for retrieval and randomisation, admin state transitions preserve catalogue integrity,
and favourites/played ratings avoid unnecessary personal exposure.

## Project Structure

### Documentation (this feature)

```text
specs/001-cub-games-site/
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
├── catalogue/
├── games/[gameId]/
├── favourites/
├── randomiser/
└── admin/games/

src/
├── components/
├── domain/
├── persistence/
├── services/
└── validation/

tests/
├── contract/
├── e2e/
├── integration/
└── unit/
```

**Structure Decision**: Use a single full-stack web application structure so catalogue UI, admin
screens, domain rules, and persistence contracts stay in one deployable project while remaining
separated by route, service, and domain boundaries.

## Complexity Tracking

No constitution violations identified.
