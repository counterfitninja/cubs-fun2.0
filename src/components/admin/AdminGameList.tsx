"use client";

import Link from "next/link";
import { Edit, EyeOff, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { Game, PublicationStatus } from "@/src/domain/types";

type AdminGameSort = "title-asc" | "status-asc" | "updated-desc";

export function AdminGameList({ games, onStatus }: { games: Game[]; onStatus: (gameId: string, status: PublicationStatus) => void }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<AdminGameSort>("title-asc");
  const matchingGames = games.filter((game) => matchesQuery(game, query));
  const visibleGames = [...matchingGames].sort((firstGame, secondGame) => compareGames(firstGame, secondGame, sort));

  return (
    <section className="stack" aria-label="Admin game list">
      <div className="panel toolbar">
        <label className="field">
          <span>Search games</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, summary, keyword..." />
        </label>
        <label className="field">
          <span>Sort games</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as AdminGameSort)}>
            <option value="title-asc">Title A to Z</option>
            <option value="status-asc">Publication status</option>
            <option value="updated-desc">Last updated</option>
          </select>
        </label>
      </div>
      {games.length === 0 ? <p className="notice">No games to maintain yet.</p> : null}
      {games.length > 0 && visibleGames.length === 0 ? <p className="notice">No matching games</p> : null}
      {visibleGames.map((game) => (
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

function matchesQuery(game: Game, query: string): boolean {
  const normalisedQuery = query.trim().toLowerCase();
  if (!normalisedQuery) return true;

  return [
    game.title,
    game.summary,
    game.aim,
    game.instructions,
    game.activityType,
    game.suitabilityNotes,
    ...game.keywords
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalisedQuery);
}

function compareGames(firstGame: Game, secondGame: Game, sort: AdminGameSort): number {
  if (sort === "updated-desc") {
    const updatedComparison = secondGame.updatedAt.localeCompare(firstGame.updatedAt);
    return updatedComparison || compareTitles(firstGame, secondGame) || firstGame.id.localeCompare(secondGame.id);
  }

  if (sort === "status-asc") {
    const statusComparison = publicationStatusRank(firstGame.publicationStatus) - publicationStatusRank(secondGame.publicationStatus);
    return statusComparison || compareTitles(firstGame, secondGame) || firstGame.id.localeCompare(secondGame.id);
  }

  return compareTitles(firstGame, secondGame) || firstGame.id.localeCompare(secondGame.id);
}

function compareTitles(firstGame: Game, secondGame: Game): number {
  return firstGame.title.localeCompare(secondGame.title, "en-GB");
}

function publicationStatusRank(status: PublicationStatus): number {
  return ["draft", "unpublished", "published", "retired"].indexOf(status);
}