import { filterGames } from "@/src/domain/gameSearch";
import { isFavourite } from "@/src/domain/favourites";
import { ratingSummary } from "@/src/domain/playedRatings";
import type { Favourite, Game, GameFilters, GameWithSummary, PlayedRating } from "@/src/domain/types";

export function listCatalogueGames(
  games: Game[],
  ratings: PlayedRating[],
  favourites: Favourite[],
  userId: string,
  filters: GameFilters = {}
): GameWithSummary[] {
  return filterGames(games, filters).map((game) => ({
    ...game,
    ratingSummary: ratingSummary(ratings, game.id),
    favourite: isFavourite(favourites, userId, game.id)
  }));
}

export function getPublishedGame(games: Game[], gameId: string): Game | undefined {
  return games.find((game) => game.id === gameId && game.publicationStatus === "published");
}