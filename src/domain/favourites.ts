import type { Favourite } from "./types";

export function addFavourite(favourites: Favourite[], userId: string, gameId: string, now = new Date().toISOString()): Favourite[] {
  if (favourites.some((item) => item.userId === userId && item.gameId === gameId)) return favourites;
  return [...favourites, { userId, gameId, createdAt: now }];
}

export function removeFavourite(favourites: Favourite[], userId: string, gameId: string): Favourite[] {
  return favourites.filter((item) => !(item.userId === userId && item.gameId === gameId));
}

export function isFavourite(favourites: Favourite[], userId: string, gameId: string): boolean {
  return favourites.some((item) => item.userId === userId && item.gameId === gameId);
}