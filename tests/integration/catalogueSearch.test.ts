import { describe, expect, it } from "vitest";
import { listCatalogueGames } from "@/src/services/catalogueService";
import { currentLeaderId, seedFavourites, seedGames, seedRatings } from "../fixtures/games";

describe("catalogue search flow", () => {
  it("returns summaries and privacy-safe rating aggregates", () => {
    const results = listCatalogueGames(seedGames, seedRatings, seedFavourites, currentLeaderId, { query: "promise" });
    expect(results).toHaveLength(1);
    expect(results[0].ratingSummary).toEqual({ average: 5, count: 1 });
    expect(results[0].favourite).toBe(true);
  });

  it("returns an empty list for no-match guidance", () => {
    expect(listCatalogueGames(seedGames, seedRatings, seedFavourites, currentLeaderId, { query: "canoe" })).toHaveLength(0);
  });
});