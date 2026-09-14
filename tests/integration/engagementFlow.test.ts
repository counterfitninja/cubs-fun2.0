import { describe, expect, it } from "vitest";
import { currentLeaderId, seedFavourites, seedRatings } from "../fixtures/games";
import { ratePlayedGame, ratingSummary, toggleFavourite } from "@/src/services/engagementService";

describe("engagement flow", () => {
  it("favourites and unfavourites games", () => {
    const removed = toggleFavourite(seedFavourites, currentLeaderId, "promise-pairs");
    expect(removed).toHaveLength(0);
    const added = toggleFavourite(removed, currentLeaderId, "torchlight-trails");
    expect(added).toHaveLength(1);
  });

  it("records played ratings and exposes summary only", () => {
    const ratings = ratePlayedGame(seedRatings, { userId: currentLeaderId, gameId: "torchlight-trails", rating: 4, playedConfirmed: true });
    expect(ratingSummary(ratings, "torchlight-trails")).toEqual({ average: 4, count: 1 });
  });
});