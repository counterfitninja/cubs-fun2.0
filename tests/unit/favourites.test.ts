import { describe, expect, it } from "vitest";
import { addFavourite, isFavourite, removeFavourite } from "@/src/domain/favourites";

describe("favourites", () => {
  it("allows a user to favourite a game only once", () => {
    const once = addFavourite([], "leader", "game");
    const twice = addFavourite(once, "leader", "game");
    expect(twice).toHaveLength(1);
  });

  it("removes favourites without touching game data", () => {
    const favourites = addFavourite([], "leader", "game");
    expect(isFavourite(favourites, "leader", "game")).toBe(true);
    expect(removeFavourite(favourites, "leader", "game")).toHaveLength(0);
  });
});