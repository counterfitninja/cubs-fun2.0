import { describe, expect, it } from "vitest";
import { filterGames } from "@/src/domain/gameSearch";
import { seedGames } from "../fixtures/games";

describe("game search", () => {
  it("filters by practical evening constraints", () => {
    const results = filterGames(seedGames, { durationMinutes: 15, space: "indoor", equipment: "none", energyLevel: "low" });
    expect(results.map((game) => game.id)).toEqual(["promise-pairs"]);
  });

  it("searches titles, keywords, and game text", () => {
    expect(filterGames(seedGames, { query: "torch" }).map((game) => game.id)).toContain("torchlight-trails");
    expect(filterGames(seedGames, { query: "values" }).map((game) => game.id)).toContain("promise-pairs");
  });

  it("excludes draft and retired games from leader retrieval", () => {
    const ids = filterGames(seedGames, {}).map((game) => game.id);
    expect(ids).not.toContain("draft-kim-game");
    expect(ids).not.toContain("retired-rope-relay");
  });
});