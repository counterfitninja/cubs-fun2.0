import type { Favourite, Game, PlayedRating, UserRole } from "@/src/domain/types";

export interface GameRepository {
  list(): Game[];
  get(id: string): Game | undefined;
  save(game: Game): Game;
}

export interface EngagementRepository {
  listFavourites(userId: string): Favourite[];
  saveFavourites(favourites: Favourite[]): void;
  listRatings(): PlayedRating[];
  saveRatings(ratings: PlayedRating[]): void;
}

export interface UserRepository {
  currentRole(): UserRole;
}