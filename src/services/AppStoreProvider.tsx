"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Favourite, Game, PlayedRating, PublicationStatus } from "@/src/domain/types";
import { currentLeaderId, demoAdminRole, seedFavourites, seedGames, seedRatings } from "@/src/persistence/inMemoryStore";
import { clearGames, createGame, editGame, importGames, setGamePublicationStatus } from "./adminGameService";
import { ratePlayedGame, toggleFavourite } from "./engagementService";

interface AppStore {
  userId: string;
  games: Game[];
  favourites: Favourite[];
  ratings: PlayedRating[];
  toggleFavourite: (gameId: string) => void;
  rateGame: (gameId: string, rating: number, feedback?: string) => void;
  saveGame: (game: Game) => void;
  updateGame: (gameId: string, changes: Partial<Game>) => void;
  changeStatus: (gameId: string, status: PublicationStatus) => void;
  importGames: () => Promise<number>;
  clearAllGames: () => void;
}

const StoreContext = createContext<AppStore | undefined>(undefined);

const storageKey = "cubs-games-state";

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [games, setGames] = useState(seedGames);
  const [favourites, setFavourites] = useState(seedFavourites);
  const [ratings, setRatings] = useState(seedRatings);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as Pick<AppStore, "games" | "favourites" | "ratings">;
      setGames(saved.games ?? seedGames);
      setFavourites(saved.favourites ?? seedFavourites);
      setRatings(saved.ratings ?? seedRatings);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ games, favourites, ratings }));
  }, [games, favourites, ratings]);

  const value: AppStore = {
    userId: currentLeaderId,
    games,
    favourites,
    ratings,
    toggleFavourite: (gameId) => setFavourites((current) => toggleFavourite(current, currentLeaderId, gameId)),
    rateGame: (gameId, rating, feedback) =>
      setRatings((current) =>
        ratePlayedGame(current, { userId: currentLeaderId, gameId, rating, playedConfirmed: true, feedback })
      ),
    saveGame: (game) => setGames((current) => createGame(current, game, demoAdminRole)),
    updateGame: (gameId, changes) => setGames((current) => editGame(current, gameId, changes, demoAdminRole)),
    changeStatus: (gameId, status) => setGames((current) => setGamePublicationStatus(current, gameId, status, demoAdminRole)),
    importGames: async () => {
      const response = await fetch("/api/games");
      if (!response.ok) throw new Error("Could not load games.md");
      const markdownGames = await response.json() as Game[];
      const next = importGames(games, markdownGames, demoAdminRole);
      setGames(next);
      const importedCount = next.length - games.length;
      return importedCount;
    },
    clearAllGames: () => {
      setGames(() => clearGames(demoAdminRole));
      setFavourites([]);
      setRatings([]);
    }
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useAppStore(): AppStore {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useAppStore must be used inside AppStoreProvider");
  return context;
}