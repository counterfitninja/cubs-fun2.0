import { describe, expect, it } from "vitest";
import { changePublicationStatus } from "@/src/domain/gameState";
import { validateGameForPublication } from "@/src/validation/gameValidation";
import { seedGames } from "../fixtures/games";

describe("game validation", () => {
  it("requires published games to include required metadata", () => {
    const draft = seedGames.find((game) => game.id === "draft-kim-game")!;
    const result = validateGameForPublication({ ...draft, publicationStatus: "published" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Suitability notes are required");
  });

  it("validates duration and group size ranges", () => {
    const game = { ...seedGames[0], durationMinutesMin: 20, durationMinutesMax: 10, groupSizeMin: 20, groupSizeMax: 10 };
    expect(validateGameForPublication(game).errors).toEqual(expect.arrayContaining([
      "Duration minimum must not exceed duration maximum",
      "Group size minimum must not exceed group size maximum"
    ]));
  });

  it("allows draft to published and published to retired transitions", () => {
    const draft = { ...seedGames[0], publicationStatus: "draft" as const, publishedAt: undefined };
    expect(changePublicationStatus(draft, "published").publicationStatus).toBe("published");
    expect(changePublicationStatus(seedGames[0], "retired").publicationStatus).toBe("retired");
  });
});