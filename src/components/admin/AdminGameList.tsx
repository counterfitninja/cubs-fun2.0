"use client";

import Link from "next/link";
import { Edit, EyeOff, RotateCcw } from "lucide-react";
import type { Game, PublicationStatus } from "@/src/domain/types";

export function AdminGameList({ games, onStatus }: { games: Game[]; onStatus: (gameId: string, status: PublicationStatus) => void }) {
  return (
    <section className="stack" aria-label="Admin game list">
      {games.map((game) => (
        <article className="admin-row" key={game.id}>
          <div>
            <h3>{game.title || "Untitled game"}</h3>
            <p>{game.summary || "Draft needs a summary before publishing."}</p>
            <div className="meta"><span className="pill">{game.publicationStatus}</span><span className="pill">{game.durationMinutesMin} mins</span><span className="pill">{game.space}</span></div>
          </div>
          <div className="stack">
            <Link className="button ghost" href={`/admin/games/${game.id}`}><Edit size={18} aria-hidden="true" /> Edit</Link>
            {game.publicationStatus === "published" ? (
              <button className="button secondary" type="button" onClick={() => onStatus(game.id, "retired")}><EyeOff size={18} aria-hidden="true" /> Retire</button>
            ) : (
              <button className="button secondary" type="button" onClick={() => onStatus(game.id, "published")}><RotateCcw size={18} aria-hidden="true" /> Publish</button>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}