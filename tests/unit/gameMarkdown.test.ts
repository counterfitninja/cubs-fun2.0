import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parseMarkdownGames } from "@/src/persistence/gameMarkdown";

describe("markdown game import", () => {
  it("recognises numbered entries with or without a space after the number", () => {
    const games = parseMarkdownGames("### 15.Bench Ball\nA ball game.\n\n15.Bench Ball\nAnother ball game.");

    expect(games.map((game) => game.title)).toEqual(["Bench Ball", "Bench Ball"]);
  });

  it("turns the game collection into distinct published game records", async () => {
    const markdown = await readFile(path.join(process.cwd(), "games.md"), "utf8");
    const games = parseMarkdownGames(markdown);

    expect(games.length).toBeGreaterThan(200);
    expect(games.find((game) => game.title === "Spud")?.instructions).toContain("secret");
    expect(games.find((game) => game.title === "Dodge Ball")?.equipment).toContain("ball");
    expect(games.some((game) => game.title === "Sin Bin")).toBe(false);
  });
});