# Quickstart: Validate Admin Search and Sort

## Prerequisites

- Node.js and project dependencies installed with `npm install`.
- Seeded in-memory game data available through the application store.

## Automated Validation

Run focused admin interaction coverage:

```powershell
npm run test:e2e -- tests/e2e/admin-games.spec.tsx
```

Expected outcome: the suite passes checks for trimmed, case-insensitive matching, no-match feedback, selected ordering, and retained actions on matching records.

Run the regression suites and production build:

```powershell
npm test
npm run test:e2e
npm run build
```

Expected outcome: all commands complete successfully.

## Manual Validation

1. Start the site with `npm run dev` and open `/admin/games`.
2. Search for a full title, a partial title, and descriptive text from a record. Confirm the results are case-insensitive and leading/trailing spaces do not prevent a match.
3. Search for text with no matches. Confirm the no-match message differs from the empty-catalogue message and the search text remains editable.
4. Choose each sort option and verify the matching records are ordered as stated in [admin-list-contract.md](./contracts/admin-list-contract.md).
5. With an active search and sort, edit a matching record and publish or retire another. Confirm the correct game changes and the active view remains coherent.
6. Repeat steps 2-5 using keyboard-only navigation and a browser viewport at or below 720px wide.

See [data-model.md](./data-model.md) for ordering and derived-view rules.