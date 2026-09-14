import { describe, expect, it } from "vitest";
import { createGame, editGame, setGamePublicationStatus } from "@/src/services/adminGameService";
import { demoAdminRole, seedGames } from "../fixtures/games";

describe("admin game maintenance", () => {
  it("blocks publishing incomplete games", () => {
    const draft = { ...seedGames.find((game) => game.id === "draft-kim-game")!, publicationStatus: "published" as const };
    expect(() => createGame(seedGames, { ...draft, id: "new-incomplete" }, demoAdminRole)).toThrow("Suitability notes");
  });

  it("preserves identity when editing and can retire published games", () => {
    const edited = editGame(seedGames, "promise-pairs", { title: "Promise Pair Cards" }, demoAdminRole);
    expect(edited.find((game) => game.id === "promise-pairs")?.title).toBe("Promise Pair Cards");
    const retired = setGamePublicationStatus(edited, "promise-pairs", "retired", demoAdminRole);
    expect(retired.find((game) => game.id === "promise-pairs")?.publicationStatus).toBe("retired");
  });
});
