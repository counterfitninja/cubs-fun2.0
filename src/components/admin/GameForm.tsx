"use client";

import { useState } from "react";
import type { EnergyLevel, Game, PublicationStatus, Space } from "@/src/domain/types";
import { validateGameForPublication } from "@/src/validation/gameValidation";

const now = () => new Date().toISOString();

export function emptyGame(): Game {
  return {
    id: `game-${Date.now()}`,
    title: "",
    summary: "",
    aim: "",
    setup: "",
    instructions: "",
    durationMinutesMin: 10,
    durationMinutesMax: 15,
    space: "indoor",
    groupSizeMin: 6,
    groupSizeMax: 24,
    equipment: [],
    energyLevel: "medium",
    activityType: "team",
    safetyNotes: "",
    accessibilityNotes: "",
    suitabilityNotes: "",
    keywords: [],
    publicationStatus: "draft",
    createdAt: now(),
    updatedAt: now()
  };
}

export function GameForm({ initialGame, onSave }: { initialGame?: Game; onSave: (game: Game) => void }) {
  const [game, setGame] = useState<Game>(initialGame ?? emptyGame());
  const [errors, setErrors] = useState<string[]>([]);
  const set = <K extends keyof Game>(key: K, value: Game[K]) => setGame((current) => ({ ...current, [key]: value, updatedAt: now() }));

  function save(status: PublicationStatus) {
    const next = { ...game, publicationStatus: status, publishedAt: status === "published" ? game.publishedAt ?? now() : game.publishedAt };
    if (status === "published") {
      const result = validateGameForPublication(next);
      if (!result.valid) {
        setErrors(result.errors);
        return;
      }
    }
    setErrors([]);
    onSave(next);
  }

  return (
    <form className="panel admin-grid" onSubmit={(event) => { event.preventDefault(); save(game.publicationStatus); }}>
      <div className="stack">
        <label className="field"><span>Title</span><input value={game.title} onChange={(event) => set("title", event.target.value)} /></label>
        <label className="field"><span>Summary</span><textarea value={game.summary} onChange={(event) => set("summary", event.target.value)} /></label>
        <label className="field"><span>Aim</span><textarea value={game.aim} onChange={(event) => set("aim", event.target.value)} /></label>
        <label className="field"><span>Setup</span><textarea value={game.setup} onChange={(event) => set("setup", event.target.value)} /></label>
        <label className="field"><span>Instructions</span><textarea value={game.instructions} onChange={(event) => set("instructions", event.target.value)} /></label>
      </div>
      <div className="stack">
        <label className="field"><span>Duration min</span><input type="number" min="1" value={game.durationMinutesMin} onChange={(event) => set("durationMinutesMin", Number(event.target.value))} /></label>
        <label className="field"><span>Duration max</span><input type="number" min="1" value={game.durationMinutesMax ?? ""} onChange={(event) => set("durationMinutesMax", event.target.value ? Number(event.target.value) : undefined)} /></label>
        <label className="field"><span>Space</span><select value={game.space} onChange={(event) => set("space", event.target.value as Space)}><option value="indoor">Indoor</option><option value="outdoor">Outdoor</option><option value="either">Either</option></select></label>
        <label className="field"><span>Group min</span><input type="number" min="1" value={game.groupSizeMin} onChange={(event) => set("groupSizeMin", Number(event.target.value))} /></label>
        <label className="field"><span>Group max</span><input type="number" min="1" value={game.groupSizeMax ?? ""} onChange={(event) => set("groupSizeMax", event.target.value ? Number(event.target.value) : undefined)} /></label>
        <label className="field"><span>Equipment</span><input value={game.equipment.join(", ")} onChange={(event) => set("equipment", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} placeholder="Leave blank for no equipment" /></label>
        <label className="field"><span>Energy</span><select value={game.energyLevel} onChange={(event) => set("energyLevel", event.target.value as EnergyLevel)}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label>
        <label className="field"><span>Activity type</span><input value={game.activityType} onChange={(event) => set("activityType", event.target.value)} /></label>
        <label className="field"><span>Safety notes</span><textarea value={game.safetyNotes} onChange={(event) => set("safetyNotes", event.target.value)} /></label>
        <label className="field"><span>Accessibility notes</span><textarea value={game.accessibilityNotes} onChange={(event) => set("accessibilityNotes", event.target.value)} /></label>
        <label className="field"><span>Cub suitability</span><textarea value={game.suitabilityNotes} onChange={(event) => set("suitabilityNotes", event.target.value)} /></label>
        <label className="field"><span>Keywords</span><input value={game.keywords.join(", ")} onChange={(event) => set("keywords", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} /></label>
        {errors.length > 0 && <div className="notice" role="alert"><h3>Before publishing</h3><ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
        <button className="button ghost" type="button" onClick={() => save("draft")}>Save draft</button>
        <button className="button" type="button" onClick={() => save("published")}>Publish</button>
      </div>
    </form>
  );
}