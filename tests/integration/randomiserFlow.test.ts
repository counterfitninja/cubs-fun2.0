import { describe, expect, it } from "vitest";
import { suggestGame } from "@/src/services/randomiserService";
import { seedGames } from "../fixtures/games";

describe("randomiser flow", () => {
  it("suggests an eligible game and explains the match", () => {
    const result = suggestGame(seedGames, { durationMinutes: 15, space: "indoor", equipment: "none" }, () => 0);
    expect(result.game?.id).toBe("promise-pairs");
    expect(result.reasons.join(" ")).toContain("no equipment");
  });

  it("explains no matches", () => {
    const result = suggestGame(seedGames, { durationMinutes: 60, space: "outdoor", equipment: "none" });
    expect(result.game).toBeUndefined();
    expect(result.message).toContain("No eligible games");
  });
});