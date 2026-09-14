import type { Game, GameFilters } from "./types";

export function isPublishedAvailable(game: Game): boolean {
  return game.publicationStatus === "published";
}

export function matchesFilters(game: Game, filters: GameFilters = {}): boolean {
  if (!isPublishedAvailable(game)) return false;

  const query = filters.query?.trim().toLowerCase();
  if (query) {
    const haystack = [
      game.title,
      game.summary,
      game.aim,
      game.instructions,
      game.activityType,
      game.suitabilityNotes,
      ...game.keywords
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  if (filters.durationMinutes && !durationMatches(game, filters.durationMinutes)) return false;
  if (filters.space && filters.space !== "any" && game.space !== filters.space && game.space !== "either") return false;
  if (filters.groupSize && !groupSizeMatches(game, filters.groupSize)) return false;
  if (filters.equipment === "none" && game.equipment.length > 0) return false;
  if (filters.equipment === "some" && game.equipment.length === 0) return false;
  if (filters.energyLevel && filters.energyLevel !== "any" && game.energyLevel !== filters.energyLevel) return false;
  if (filters.activityType && game.activityType !== filters.activityType) return false;
  if (filters.accessibility) {
    const term = filters.accessibility.toLowerCase();
    if (!game.accessibilityNotes.toLowerCase().includes(term) && !game.suitabilityNotes.toLowerCase().includes(term)) return false;
  }

  return true;
}

export function filterGames(games: Game[], filters: GameFilters = {}): Game[] {
  return games.filter((game) => matchesFilters(game, filters)).sort((a, b) => a.title.localeCompare(b.title, "en-GB"));
}

function durationMatches(game: Game, minutes: number): boolean {
  const max = game.durationMinutesMax ?? game.durationMinutesMin;
  return game.durationMinutesMin <= minutes && max >= minutes;
}

function groupSizeMatches(game: Game, groupSize: number): boolean {
  const max = game.groupSizeMax ?? Number.POSITIVE_INFINITY;
  return game.groupSizeMin <= groupSize && max >= groupSize;
}