import { describe, expect, it } from "vitest";
import { clearGames, createGame, editGame, importGames, setGamePublicationStatus } from "@/src/services/adminGameService";
import { demoAdminRole, demoLeaderRole, seedGames } from "../fixtures/games";

describe("admin catalogue contract", () => {
  it("creates, edits, retires, unpublishes, and restores valid games", () => {
    const game = { ...seedGames[0], id: "new-game", title: "New Hall Game", publicationStatus: "draft" as const, publishedAt: undefined };
    const created = createGame(seedGames, game, demoAdminRole);
    const edited = editGame(created, "new-game", { summary: "Updated summary" }, demoAdminRole);
    const published = setGamePublicationStatus(edited, "new-game", "published", demoAdminRole);
    const retired = setGamePublicationStatus(published, "new-game", "retired", demoAdminRole);
    const restored = setGamePublicationStatus(retired, "new-game", "published", demoAdminRole);
    expect(restored.find((item) => item.id === "new-game")?.publicationStatus).toBe("published");
  });

  it("imports each title once and only lets admins clear the catalogue", () => {
    const imported = { ...seedGames[0], id: "spud", title: "  Spud  " };
    const withImport = importGames([], [imported, { ...imported, id: "spud-copy" }], demoAdminRole);

    expect(withImport).toHaveLength(1);
    expect(clearGames(demoAdminRole)).toEqual([]);
    expect(() => clearGames(demoLeaderRole)).toThrow("Only authorised admins");
  });
});