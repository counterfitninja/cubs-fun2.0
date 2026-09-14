"use client";

import { useState } from "react";
import { Dice5 } from "lucide-react";
import type { RandomiserCriteria } from "@/src/domain/types";
import { suggestGame, type RandomiserResult as Result } from "@/src/services/randomiserService";
import { activityTypes } from "@/src/services/gameIndexService";
import { useAppStore } from "@/src/services/AppStoreProvider";
import { RandomiserControls } from "./RandomiserControls";
import { RandomiserResult } from "./RandomiserResult";

export function RandomiserPage() {
  const { games } = useAppStore();
  const [criteria, setCriteria] = useState<RandomiserCriteria>({});
  const [seen, setSeen] = useState<string[]>([]);
  const [result, setResult] = useState<Result>();
  function roll() {
    const next = suggestGame(games, { ...criteria, excludeGameIds: seen });
    if (next.game) setSeen((current) => [...current, next.game!.id]);
    setResult(next.eligibleCount === 0 && seen.length > 0 ? suggestGame(games, criteria) : next);
  }
  return (
    <div className="page stack">
      <section className="hero-band"><h1>Randomiser</h1><p>Let chance choose, but keep the practical meeting criteria in charge.</p></section>
      <RandomiserControls criteria={criteria} activityTypes={activityTypes(games)} onChange={setCriteria} />
      <button className="button secondary" type="button" onClick={roll}><Dice5 size={18} aria-hidden="true" /> Suggest a game</button>
      <RandomiserResult result={result} />
    </div>
  );
}