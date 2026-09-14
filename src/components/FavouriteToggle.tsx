"use client";

import { Heart } from "lucide-react";

export function FavouriteToggle({ favourite, onToggle }: { favourite: boolean; onToggle: () => void }) {
  return (
    <div className="stack">
      <button className="icon-button secondary" type="button" aria-pressed={favourite} onClick={onToggle}>
        <Heart size={18} fill={favourite ? "currentColor" : "none"} aria-hidden="true" />
        {favourite ? "Remove favourite" : "Add favourite"}
      </button>
      <p className="helper">Favourites are personal shortcuts for games you expect to use again.</p>
    </div>
  );
}