"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Game, RatingSummary } from "@/src/domain/types";
import { FavouriteToggle } from "./FavouriteToggle";
import { PlayedRatingControl } from "./PlayedRatingControl";

export function GameDetail({ game, favourite, ratingSummary, onFavourite, onRate }: { game: Game; favourite: boolean; ratingSummary: RatingSummary; onFavourite: () => void; onRate: (rating: number, feedback?: string) => void }) {
  const [message, setMessage] = useState("");
  return (
    <div className="page stack">
      <Link className="button ghost" href="/catalogue"><ChevronLeft size={18} aria-hidden="true" /> Back to catalogue</Link>
      <section className="hero-band">
        <p className="helper">{game.activityType} · {game.energyLevel} energy</p>
        <h1>{game.title}</h1>
        <p>{game.summary}</p>
        <div className="meta">
          <span className="pill">{game.durationMinutesMin}{game.durationMinutesMax ? `-${game.durationMinutesMax}` : ""} mins</span>
          <span className="pill">{game.space}</span>
          <span className="pill">{game.groupSizeMin}{game.groupSizeMax ? `-${game.groupSizeMax}` : "+"} Cubs</span>
          <span className="pill">{ratingSummary.count ? `${ratingSummary.average}/5 from played ratings` : "No played ratings yet"}</span>
        </div>
      </section>
      <div className="detail-grid">
        <section className="detail-section stack">
          <h2>Run the Game</h2>
          <p><strong>Aim:</strong> {game.aim}</p>
          <p><strong>Setup:</strong> {game.setup || "No setup recorded."}</p>
          <p><strong>Instructions:</strong> {game.instructions}</p>
          <p><strong>Equipment:</strong> {game.equipment.length ? game.equipment.join(", ") : "No equipment"}</p>
        </section>
        <aside className="detail-section stack">
          <h2>Leader Notes</h2>
          <p><strong>Safety:</strong> {game.safetyNotes}</p>
          <p><strong>Accessibility:</strong> {game.accessibilityNotes}</p>
          <p><strong>Cub suitability:</strong> {game.suitabilityNotes}</p>
          <FavouriteToggle favourite={favourite} onToggle={onFavourite} />
          <PlayedRatingControl onRate={(rating, feedback) => { onRate(rating, feedback); setMessage("Played rating saved."); }} />
          {message && <p className="helper" role="status">{message}</p>}
        </aside>
      </div>
    </div>
  );
}