import type { PlayedRating, RatingSummary } from "./types";

export function upsertPlayedRating(
  ratings: PlayedRating[],
  input: Omit<PlayedRating, "createdAt" | "updatedAt">
): PlayedRating[] {
  if (!input.playedConfirmed) throw new Error("Ratings require played confirmation");
  if (input.rating < 1 || input.rating > 5) throw new Error("Rating values must stay within the supported rating scale");

  const now = new Date().toISOString();
  const existing = ratings.find((rating) => rating.userId === input.userId && rating.gameId === input.gameId);
  if (!existing) return [...ratings, { ...input, createdAt: now, updatedAt: now }];

  return ratings.map((rating) =>
    rating.userId === input.userId && rating.gameId === input.gameId
      ? { ...rating, rating: input.rating, feedback: input.feedback, playedConfirmed: true, updatedAt: now }
      : rating
  );
}

export function ratingSummary(ratings: PlayedRating[], gameId: string): RatingSummary {
  const gameRatings = ratings.filter((rating) => rating.gameId === gameId && rating.playedConfirmed);
  if (gameRatings.length === 0) return { average: 0, count: 0 };
  const average = gameRatings.reduce((total, rating) => total + rating.rating, 0) / gameRatings.length;
  return { average: Math.round(average * 10) / 10, count: gameRatings.length };
}