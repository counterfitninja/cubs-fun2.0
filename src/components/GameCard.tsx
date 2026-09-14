"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import type { GameWithSummary } from "@/src/domain/types";

export function GameCard({ game, onFavourite }: { game: GameWithSummary; onFavourite: (gameId: string) => void }) {
  const equipment = game.equipment.length === 0 ? "No equipment" : game.equipment.join(", ");
  const rating = game.ratingSummary && game.ratingSummary.count > 0 ? `${game.ratingSummary.average}/5 (${game.ratingSummary.count})` : "No ratings yet";
  return (
    <article className="game-card">
      <h3><Link href={`/games/${game.id}`}>{game.title}</Link></h3>
      <p>{game.summary}</p>
      <div className="meta" aria-label="Game summary">
        <span className="pill">{game.durationMinutesMin}{game.durationMinutesMax ? `-${game.durationMinutesMax}` : ""} mins</span>
        <span className="pill">{game.space}</span>
        <span className="pill">{game.groupSizeMin}{game.groupSizeMax ? `-${game.groupSizeMax}` : "+"} Cubs</span>
        <span className="pill">{equipment}</span>
      </div>
      <p className="helper"><Star size={16} aria-hidden="true" /> {rating}</p>
      <button className="icon-button secondary" type="button" onClick={() => onFavourite(game.id)} aria-pressed={game.favourite}>
        <Heart size={18} fill={game.favourite ? "currentColor" : "none"} aria-hidden="true" />
        {game.favourite ? "Favourited" : "Favourite"}
      </button>
    </article>
  );
}