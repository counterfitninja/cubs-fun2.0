import { describe, expect, it } from "vitest";
import { filterGames } from "@/src/domain/gameSearch";
import { seedGames } from "../fixtures/games";

describe("search performance", () => {
  it("filters catalogue data well under the user-facing two second goal", () => {
    const start = performance.now();
    const results = filterGames(seedGames, { query: "team", durationMinutes: 15 });
    const elapsed = performance.now() - start;
    expect(results.length).toBeGreaterThan(0);
    expect(elapsed).toBeLessThan(2000);
  });
});