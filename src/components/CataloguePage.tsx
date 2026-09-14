"use client";

import { useState } from "react";
import { activityTypes } from "@/src/services/gameIndexService";
import { listCatalogueGames } from "@/src/services/catalogueService";
import { useAppStore } from "@/src/services/AppStoreProvider";
import type { GameFilters as Filters } from "@/src/domain/types";
import { EmptyState } from "./CatalogueStates";
import { GameCard } from "./GameCard";
import { GameFilters } from "./GameFilters";

export function CataloguePage() {
  const { games, ratings, favourites, userId, toggleFavourite } = useAppStore();
  const [filters, setFilters] = useState<Filters>({});
  const results = listCatalogueGames(games, ratings, favourites, userId, filters);

  return (
    <div className="page stack">
      <section className="hero-band catalogue-hero">
        <p className="helper">UK Cub Scout games for every occasion</p>
        <h1>Find a game whenever you need one.</h1>
        <p>Search by time, space, equipment, group size, and energy level.</p>
      </section>
      <GameFilters filters={filters} activityTypes={activityTypes(games)} onChange={setFilters} />
      {results.length === 0 ? (
        <EmptyState title="No matching games" message="Broaden the time, space, equipment, or energy filters to see more choices." />
      ) : (
        <section className="grid" aria-label="Matching games">
          {results.map((game) => <GameCard key={game.id} game={game} onFavourite={toggleFavourite} />)}
        </section>
      )}
    </div>
  );
}