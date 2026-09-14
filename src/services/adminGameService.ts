import { changePublicationStatus } from "@/src/domain/gameState";
import { canPerform } from "@/src/domain/roles";
import type { Game, PublicationStatus, UserRole } from "@/src/domain/types";
import { validateGameForPublication } from "@/src/validation/gameValidation";

export function createGame(games: Game[], draft: Game, role: UserRole): Game[] {
  if (!canPerform(role, "create")) throw new Error("Only authorised admins may create games");
  if (games.some((game) => game.id === draft.id)) throw new Error("Game ID must be unique");
  if (draft.publicationStatus === "published") {
    const result = validateGameForPublication(draft);
    if (!result.valid) throw new Error(result.errors.join("; "));
  }
  return [...games, draft];
}

export function editGame(games: Game[], gameId: string, changes: Partial<Game>, role: UserRole): Game[] {
  if (!canPerform(role, "edit")) throw new Error("Only authorised admins may edit games");
  return games.map((game) => (game.id === gameId ? { ...game, ...changes, id: game.id, updatedAt: new Date().toISOString() } : game));
}

export function setGamePublicationStatus(games: Game[], gameId: string, status: PublicationStatus, role: UserRole): Game[] {
  const action = status === "published" ? "publish" : status;
  if (!canPerform(role, action)) throw new Error("Only authorised admins may change publication state");
  return games.map((game) => (game.id === gameId ? changePublicationStatus(game, status) : game));
}

export function importGames(games: Game[], importedGames: Game[], role: UserRole): Game[] {
  if (!canPerform(role, "create")) throw new Error("Only authorised admins may import games");

  const existingTitles = new Set(games.map((game) => normaliseTitle(game.title)));
  const imported = importedGames.filter((game) => {
    const title = normaliseTitle(game.title);
    if (existingTitles.has(title)) return false;
    existingTitles.add(title);
    return true;
  });

  return [...games, ...imported];
}

export function clearGames(role: UserRole): Game[] {
  if (!canPerform(role, "delete")) throw new Error("Only authorised admins may clear games");
  return [];
}

function normaliseTitle(title: string): string {
  return title.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}