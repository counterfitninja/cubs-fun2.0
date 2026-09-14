"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export function PlayedRatingControl({ onRate }: { onRate: (rating: number, feedback?: string) => void }) {
  const [played, setPlayed] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  return (
    <form className="stack" onSubmit={(event) => { event.preventDefault(); if (played) onRate(rating, feedback || undefined); }}>
      <label className="field">
        <span>Played this game?</span>
        <select value={played ? "yes" : "no"} onChange={(event) => setPlayed(event.target.value === "yes")}>
          <option value="no">Not yet</option>
          <option value="yes">Yes, we played it</option>
        </select>
      </label>
      <label className="field">
        <span>Rating</span>
        <select value={rating} onChange={(event) => setRating(Number(event.target.value))} disabled={!played}>
          {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value} stars</option>)}
        </select>
      </label>
      <label className="field">
        <span>Short note</span>
        <textarea value={feedback} onChange={(event) => setFeedback(event.target.value)} disabled={!played} />
      </label>
      <button className="button" type="submit" disabled={!played}><Star size={18} aria-hidden="true" /> Save played rating</button>
      <p className="helper">Ratings are accepted only after play, so favourites stay separate from feedback.</p>
    </form>
  );
}