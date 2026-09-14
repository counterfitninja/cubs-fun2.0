import { describe, expect, it } from "vitest";
import { eligibleRandomGames, selectRandomGame } from "@/src/domain/randomiser";
import { seedGames } from "../fixtures/games";

describe("randomiser", () => {
  it("returns only games satisfying selected criteria", () => {
    const eligible = eligibleRandomGames(seedGames, { durationMinutes: 15, space: "indoor", equipment: "none" });
    expect(eligible).toHaveLength(1);
    expect(eligible[0].id).toBe("promise-pairs");
  });

  it("does not select retired or unpublished games", () => {
    const selected = selectRandomGame(seedGames, { query: "rope" }, () => 0);
    expect(selected).toBeUndefined();
  });
});