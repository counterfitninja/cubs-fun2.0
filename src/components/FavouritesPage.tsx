"use client";

import { listCatalogueGames } from "@/src/services/catalogueService";
import { useAppStore } from "@/src/services/AppStoreProvider";
import { EmptyState } from "./CatalogueStates";
import { GameCard } from "./GameCard";

export function FavouritesPage() {
  const { games, ratings, favourites, userId, toggleFavourite } = useAppStore();
  const ids = new Set(favourites.filter((item) => item.userId === userId).map((item) => item.gameId));
  const favouriteGames = listCatalogueGames(games, ratings, favourites, userId).filter((game) => ids.has(game.id));
  return (
    <div className="page stack">
      <section className="hero-band"><h1>Favourite games</h1><p>Your quick return list for reliable Cub nights.</p></section>
      {favouriteGames.length === 0 ? <EmptyState title="No favourites yet" message="Mark games as favourites from the catalogue or game detail pages." /> : <section className="grid">{favouriteGames.map((game) => <GameCard key={game.id} game={game} onFavourite={toggleFavourite} />)}</section>}
    </div>
  );
}