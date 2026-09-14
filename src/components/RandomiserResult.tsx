"use client";

import Link from "next/link";
import type { RandomiserResult as Result } from "@/src/services/randomiserService";

export function RandomiserResult({ result }: { result?: Result }) {
  if (!result) return <section className="panel notice"><h2>Ready when you are</h2><p>Choose your criteria and ask for a game.</p></section>;
  if (!result.game) return <section className="panel notice"><h2>No eligible games</h2><p>{result.message}</p></section>;
  return (
    <section className="panel stack" aria-live="polite">
      <p className="helper">{result.message}</p>
      <h2>{result.game.title}</h2>
      <p>{result.game.summary}</p>
      <div className="meta">{result.reasons.map((reason) => <span className="pill" key={reason}>{reason}</span>)}</div>
      <Link className="button" href={`/games/${result.game.id}`}>Open game</Link>
    </section>
  );
}