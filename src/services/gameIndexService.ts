import { listCatalogueGames } from "./catalogueService";
import type { Favourite, Game, GameWithSummary, PlayedRating } from "@/src/domain/types";

export function fullGameIndex(games: Game[], ratings: PlayedRating[], favourites: Favourite[], userId: string): GameWithSummary[] {
  return listCatalogueGames(games, ratings, favourites, userId);
}

export function activityTypes(games: Game[]): string[] {
  return Array.from(new Set(games.filter((game) => game.publicationStatus === "published").map((game) => game.activityType))).sort();
}