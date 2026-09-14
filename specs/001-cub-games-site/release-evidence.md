# Release Evidence: Cub Games Site

## Validation Commands

- `npm test`: unit, integration, and contract checks for search, filtering, metadata validation, role boundaries, favourites, played ratings, randomiser logic, and admin maintenance.
- `npm run test:e2e`: phone-viewport component flows for catalogue discovery, full index browsing, randomiser, favourites, ratings, admin validation, accessibility smoke checks, and search performance.
- `npm run build`: production build validation.

## Constitution Coverage

- UK Cub Scout context: UI labels use UK English, Cub Scout wording, and activity metadata suitable for leaders/helpers.
- Fast evening discovery: catalogue filters and tests cover time, space, equipment, group size, energy, accessibility, search, and no-match states.
- Mobile-first access: phone viewport helpers validate leader and admin flows at a narrow screen size.
- Curated index/admin integrity: admin services validate publishable metadata and preserve stable game identity across edits and state changes.
- Engagement boundaries: favourites are personal retrieval aids; ratings require played confirmation and expose aggregate summaries only.

## Evidence Status

- Unit, integration, and contract tests: completed.
- Phone-viewport checks: completed.
- Production build: completed.