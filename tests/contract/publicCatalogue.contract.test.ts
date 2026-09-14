import { describe, expect, it } from "vitest";
import { fullGameIndex } from "@/src/services/gameIndexService";
import { currentLeaderId, seedFavourites, seedGames, seedRatings } from "../fixtures/games";

describe("public catalogue contract", () => {
  it("shows required published game summaries", () => {
    const index = fullGameIndex(seedGames, seedRatings, seedFavourites, currentLeaderId);
    expect(index.every((game) => game.title && game.durationMinutesMin && game.space && game.groupSizeMin)).toBe(true);
    expect(index.every((game) => game.publicationStatus === "published")).toBe(true);
  });
});