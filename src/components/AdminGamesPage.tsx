"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useAppStore } from "@/src/services/AppStoreProvider";
import { AdminGameList } from "./admin/AdminGameList";

export function AdminGamesPage() {
  const { games, changeStatus } = useAppStore();
  return (
    <div className="page stack">
      <section className="hero-band">
        <p className="helper">Authorised admin area</p>
        <h1>Maintain the game index.</h1>
        <p>Draft, publish, retire, and correct games without losing favourites or played ratings.</p>
        <Link className="button secondary" href="/admin/games/new"><Plus size={18} aria-hidden="true" /> Add game</Link>
      </section>
      <AdminGameList games={games} onStatus={changeStatus} />
    </div>
  );
}