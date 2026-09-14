import type { Game, PublicationStatus } from "./types";
import { validateGameForPublication } from "@/src/validation/gameValidation";

const transitions: Record<PublicationStatus, PublicationStatus[]> = {
  draft: ["published"],
  published: ["retired", "unpublished"],
  retired: ["published"],
  unpublished: ["published"]
};

export function canTransition(from: PublicationStatus, to: PublicationStatus): boolean {
  return transitions[from].includes(to);
}

export function changePublicationStatus(game: Game, to: PublicationStatus): Game {
  if (game.publicationStatus === to) return game;
  if (!canTransition(game.publicationStatus, to)) throw new Error(`Cannot move ${game.publicationStatus} to ${to}`);
  if (to === "published") {
    const result = validateGameForPublication(game);
    if (!result.valid) throw new Error(result.errors.join("; "));
  }
  const now = new Date().toISOString();
  return {
    ...game,
    publicationStatus: to,
    updatedAt: now,
    publishedAt: to === "published" ? game.publishedAt ?? now : game.publishedAt
  };
}