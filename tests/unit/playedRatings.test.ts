import { describe, expect, it } from "vitest";
import { ratingSummary, upsertPlayedRating } from "@/src/domain/playedRatings";

describe("played ratings", () => {
  it("requires played confirmation", () => {
    expect(() => upsertPlayedRating([], { userId: "leader", gameId: "game", rating: 5, playedConfirmed: false })).toThrow("played confirmation");
  });

  it("updates a user's previous rating instead of duplicating it", () => {
    const first = upsertPlayedRating([], { userId: "leader", gameId: "game", rating: 3, playedConfirmed: true });
    const second = upsertPlayedRating(first, { userId: "leader", gameId: "game", rating: 5, playedConfirmed: true });
    expect(second).toHaveLength(1);
    expect(ratingSummary(second, "game")).toEqual({ average: 5, count: 1 });
  });
});