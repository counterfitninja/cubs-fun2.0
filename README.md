# Cubs Games

Phone-first game finder for a UK Cub Scout site. Leaders can search the full game index, filter by evening meeting constraints, favourite useful games, rate games after they have been played, and use a criteria-based randomiser. Authorised admins can add, edit, publish, retire, and unpublish game records.

## Seed Data

The initial in-memory data lives in `src/persistence/inMemoryStore.ts` and includes published, draft, and retired games so catalogue, randomiser, and admin states can be validated.

## Demo Access

- Leader/helper workflows use the demo leader identity in the app store.
- Admin pages use the demo admin role for catalogue maintenance validation.

## Commands

```powershell
npm install
npm run dev
npm test
npm run test:e2e
npm run build
```

## Release Checks

- Confirm leader catalogue, detail, favourites, ratings, and randomiser flows on a phone-sized viewport.
- Confirm admin create, edit, publish, retire, and unpublish flows preserve game identity, favourites, and rating summaries.
- Confirm visible labels use UK English and fit the UK Cub Scout context.