import { describe, expect, it } from "vitest";
import { fullGameIndex } from "@/src/services/gameIndexService";
import { getPublishedGame } from "@/src/services/catalogueService";
import { currentLeaderId, seedFavourites, seedGames, seedRatings } from "../fixtures/games";

describe("game index", () => {
  it("lists every published game and excludes non-public records", () => {
    const index = fullGameIndex(seedGames, seedRatings, seedFavourites, currentLeaderId);
    expect(index.map((game) => game.id)).toEqual(["foxes-and-rabbits", "promise-pairs", "torchlight-trails"]);
  });

  it("retrieves readable game details", () => {
    const game = getPublishedGame(seedGames, "torchlight-trails");
    expect(game?.instructions).toContain("Split Cubs");
    expect(game?.accessibilityNotes).toContain("reachable heights");
  });
});