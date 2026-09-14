<!--
Sync Impact Report
Version change: placeholder -> 1.0.0
Modified principles:
- Principle 1 placeholder -> I. Youth-Safe Cub Scout Focus
- Principle 2 placeholder -> II. Fast Evening Game Discovery
- Principle 3 placeholder -> III. Mobile-First Access
- Principle 4 placeholder -> IV. Curated Game Index and Admin Integrity
- Principle 5 placeholder -> V. Engagement Data With Clear Boundaries
Added sections:
- Product Constraints
- Development Workflow and Quality Gates
Removed sections:
- None
Follow-up TODOs:
- None
-->
# Cubs Games Constitution

## Core Principles

### I. Youth-Safe Cub Scout Focus
The site MUST serve UK Cub Scout leaders, helpers, and young people by keeping game content
age-appropriate, inclusive, and suitable for Cub Scout sessions. UK Scout identity, language,
spelling, and iconography MUST be used consistently where the product references locations,
roles, awards, activities, or navigation. Rationale: the product is a practical planning tool for
a UK Cub Scout context, so trust depends on content and presentation matching that community.

### II. Fast Evening Game Discovery
Leaders MUST be able to find a suitable game quickly during or shortly before a meeting. Search,
filtering, favourites, ratings, and random selection MUST prioritise practical criteria such as
available time, group size, location, energy level, equipment, and accessibility needs. Rationale:
the primary user moment is time-constrained session planning, so discovery speed is a core product
quality rather than a secondary enhancement.

### III. Mobile-First Access
Every leader-facing workflow MUST be usable on a phone without relying on desktop-only controls,
wide tables, hover-only interactions, or excessive typing. The game index, game detail pages,
favourites, ratings, and randomiser MUST remain readable and operable on small screens. Rationale:
leaders often plan and adjust activities in halls, fields, and meeting spaces where a phone is the
most available device.

### IV. Curated Game Index and Admin Integrity
The product MUST maintain a complete index of games with consistent metadata, readable details,
and edit history sufficient to correct mistakes. Admin workflows MUST allow authorised users to add
new games and edit existing games without breaking retrieval, filtering, favourites, ratings, or
randomiser criteria. Rationale: the site becomes useful only if game data remains accurate,
structured, and maintainable over time.

### V. Engagement Data With Clear Boundaries
Favourites and ratings MUST help users retrieve and compare games without exposing unnecessary
personal data. Ratings MUST distinguish played-game feedback from unplayed preferences, and any
stored user activity MUST be limited to what is needed for retrieval, moderation, and product
quality. Rationale: engagement features are useful for leaders, but the site operates in a youth
organisation context where privacy and data minimisation matter.

## Product Constraints

The product MUST provide an indexed catalogue of all games, fast search and filtering, phone-ready
layouts, favourites, played-game ratings, and a criteria-based randomiser. Game records MUST include
enough structured fields to support retrieval by practical meeting constraints, including duration,
space, equipment, group size, energy level, and suitability notes.

Admin access MUST be separated from public or leader-facing browsing. Any upload or edit path MUST
validate required game metadata before publishing. UK spelling and terminology MUST be used in user
interface text, content labels, and examples.

## Development Workflow and Quality Gates

Feature specifications MUST state the user role, meeting scenario, and phone usability expectation
for every leader-facing workflow. Implementation plans MUST include tests or validation evidence for
search, filtering, favourites, ratings, randomiser criteria, admin create/edit flows, and responsive
behaviour on phone-sized viewports.

Changes that alter game metadata, retrieval logic, ratings, favourites, or admin publishing MUST
include regression coverage for the affected workflow. UI changes MUST be reviewed against UK Cub
Scout context, small-screen usability, and accessibility expectations before release.

## Governance

This constitution supersedes conflicting project guidance for product scope, quality gates, and
review expectations. Amendments MUST be proposed as explicit documentation changes that include a
summary of governance impact, affected principles or sections, and a semantic version decision.

Versioning follows semantic versioning. MAJOR increments apply to incompatible governance changes or
principle redefinitions. MINOR increments apply when adding principles, sections, or materially
expanding guidance. PATCH increments apply to clarifications, wording fixes, and non-semantic edits.

Every specification, plan, task list, and implementation review MUST verify compliance with these
principles. Any exception MUST be documented with the reason, owner, mitigation, and expiry or review
date before the work proceeds.

**Version**: 1.0.0 | **Ratified**: 2026-09-14 | **Last Amended**: 2026-09-14
