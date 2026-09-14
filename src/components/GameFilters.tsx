"use client";

import type { EnergyLevel, GameFilters as Filters, Space } from "@/src/domain/types";

interface Props {
  filters: Filters;
  activityTypes: string[];
  onChange: (filters: Filters) => void;
}

export function GameFilters({ filters, activityTypes, onChange }: Props) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => onChange({ ...filters, [key]: value });
  return (
    <section className="panel toolbar" aria-label="Game filters">
      <label className="field">
        <span>Search</span>
        <input value={filters.query ?? ""} onChange={(event) => set("query", event.target.value)} placeholder="Name, clue, team..." />
      </label>
      <label className="field">
        <span>Minutes</span>
        <input type="number" min="1" value={filters.durationMinutes ?? ""} onChange={(event) => set("durationMinutes", event.target.value ? Number(event.target.value) : undefined)} />
      </label>
      <label className="field">
        <span>Space</span>
        <select value={filters.space ?? "any"} onChange={(event) => set("space", event.target.value as Space | "any")}>
          <option value="any">Any space</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
          <option value="either">Either</option>
        </select>
      </label>
      <label className="field">
        <span>Group size</span>
        <input type="number" min="1" value={filters.groupSize ?? ""} onChange={(event) => set("groupSize", event.target.value ? Number(event.target.value) : undefined)} />
      </label>
      <label className="field">
        <span>Equipment</span>
        <select value={filters.equipment ?? "any"} onChange={(event) => set("equipment", event.target.value as Filters["equipment"])}>
          <option value="any">Any equipment</option>
          <option value="none">No equipment</option>
          <option value="some">Equipment OK</option>
        </select>
      </label>
      <label className="field">
        <span>Energy</span>
        <select value={filters.energyLevel ?? "any"} onChange={(event) => set("energyLevel", event.target.value as EnergyLevel | "any")}>
          <option value="any">Any energy</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <label className="field">
        <span>Activity</span>
        <select value={filters.activityType ?? ""} onChange={(event) => set("activityType", event.target.value || undefined)}>
          <option value="">All activities</option>
          {activityTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Accessibility</span>
        <input value={filters.accessibility ?? ""} onChange={(event) => set("accessibility", event.target.value)} placeholder="large print, seated..." />
      </label>
    </section>
  );
}