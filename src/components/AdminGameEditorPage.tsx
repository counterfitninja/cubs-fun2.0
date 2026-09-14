"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useAppStore } from "@/src/services/AppStoreProvider";
import { EmptyState } from "./CatalogueStates";
import { emptyGame, GameForm } from "./admin/GameForm";

export function AdminGameEditorPage({ gameId }: { gameId?: string }) {
  const router = useRouter();
  const { games, saveGame, updateGame } = useAppStore();
  const existing = gameId ? games.find((game) => game.id === gameId) : undefined;
  if (gameId && !existing) return <div className="page"><EmptyState title="Admin game not found" message="Choose another game from the admin list." /></div>;
  const initial = existing ?? emptyGame();
  return (
    <div className="page stack">
      <Link className="button ghost" href="/admin/games"><ChevronLeft size={18} aria-hidden="true" /> Back to admin</Link>
      <section className="hero-band"><h1>{existing ? "Edit game" : "Add game"}</h1><p>Required metadata keeps search, filters, and the randomiser reliable.</p></section>
      <GameForm initialGame={initial} onSave={(game) => { existing ? updateGame(existing.id, game) : saveGame(game); router.push("/admin/games"); }} />
    </div>
  );
}