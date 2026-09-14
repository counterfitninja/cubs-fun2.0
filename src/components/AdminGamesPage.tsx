"use client";

import Link from "next/link";
import { Database, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/src/services/AppStoreProvider";
import { AdminGameList } from "./admin/AdminGameList";

export function AdminGamesPage() {
  const { games, changeStatus, importGames, clearAllGames } = useAppStore();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleImport() {
    setBusy(true);
    setMessage("");
    try {
      const importedCount = await importGames();
      setMessage(importedCount ? `Imported ${importedCount} new game${importedCount === 1 ? "" : "s"}.` : "No new games found.");
    } catch {
      setMessage("Games could not be imported.");
    } finally {
      setBusy(false);
    }
  }

  function handleClear() {
    if (!window.confirm("Clear every game, favourite, and rating? This cannot be undone.")) return;
    clearAllGames();
    setMessage("All games cleared.");
  }

  return (
    <div className="page stack">
      <section className="hero-band">
        <p className="helper">Authorised admin area</p>
        <h1>Maintain the game index.</h1>
        <p>Draft, publish, retire, and correct games without losing favourites or played ratings.</p>
        <div className="button-row">
          <Link className="button secondary" href="/admin/games/new"><Plus size={18} aria-hidden="true" /> Add game</Link>
          <button className="button secondary" type="button" onClick={() => void handleImport()} disabled={busy}>
            <Database size={18} aria-hidden="true" /> {busy ? "Importing..." : "Import games.md"}
          </button>
          <button className="button danger" type="button" onClick={handleClear} disabled={busy || games.length === 0}>
            <Trash2 size={18} aria-hidden="true" /> Clear all games
          </button>
        </div>
        {message ? <p role="status">{message}</p> : null}
      </section>
      <AdminGameList games={games} onStatus={changeStatus} />
    </div>
  );
}