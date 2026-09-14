"use client";

import { isFavourite } from "@/src/domain/favourites";
import { ratingSummary } from "@/src/domain/playedRatings";
import { useAppStore } from "@/src/services/AppStoreProvider";
import { EmptyState } from "./CatalogueStates";
import { GameDetail } from "./GameDetail";

export function GameDetailPage({ gameId }: { gameId: string }) {
  const { games, favourites, ratings, userId, toggleFavourite, rateGame } = useAppStore();
  const game = games.find((item) => item.id === gameId && item.publicationStatus === "published");
  if (!game) return <div className="page"><EmptyState title="Game not available" message="This game may have been retired, unpublished, or moved." /></div>;
  return (
    <GameDetail
      game={game}
      favourite={isFavourite(favourites, userId, game.id)}
      ratingSummary={ratingSummary(ratings, game.id)}
      onFavourite={() => toggleFavourite(game.id)}
      onRate={(rating, feedback) => rateGame(game.id, rating, feedback)}
    />
  );
}