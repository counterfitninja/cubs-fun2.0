import { describe, expect, it } from "vitest";
import { createGame, editGame, setGamePublicationStatus } from "@/src/services/adminGameService";
import { demoAdminRole, seedGames } from "../fixtures/games";

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
});