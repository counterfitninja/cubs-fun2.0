import { addFavourite, removeFavourite } from "@/src/domain/favourites";
import { ratingSummary, upsertPlayedRating } from "@/src/domain/playedRatings";
import type { Favourite, PlayedRating } from "@/src/domain/types";

export function toggleFavourite(favourites: Favourite[], userId: string, gameId: string): Favourite[] {
  const exists = favourites.some((item) => item.userId === userId && item.gameId === gameId);
  return exists ? removeFavourite(favourites, userId, gameId) : addFavourite(favourites, userId, gameId);
}

export function ratePlayedGame(
  ratings: PlayedRating[],
  input: Omit<PlayedRating, "createdAt" | "updatedAt">
): PlayedRating[] {
  return upsertPlayedRating(ratings, input);
}

export { ratingSummary };