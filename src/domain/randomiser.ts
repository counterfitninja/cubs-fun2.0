import { filterGames } from "./gameSearch";
import type { Game, RandomiserCriteria } from "./types";

export function eligibleRandomGames(games: Game[], criteria: RandomiserCriteria): Game[] {
  const excluded = new Set(criteria.excludeGameIds ?? []);
  return filterGames(games, criteria).filter((game) => !excluded.has(game.id));
}

export function selectRandomGame(games: Game[], criteria: RandomiserCriteria, random = Math.random): Game | undefined {
  const eligible = eligibleRandomGames(games, criteria);
  if (eligible.length === 0) return undefined;
  return eligible[Math.floor(random() * eligible.length)];
}

export function explainMatch(game: Game, criteria: RandomiserCriteria): string[] {
  const reasons = [
    `${game.durationMinutesMin}${game.durationMinutesMax ? `-${game.durationMinutesMax}` : ""} minutes`,
    game.space === "either" ? "works indoors or outdoors" : `${game.space} game`,
    game.equipment.length === 0 ? "no equipment" : `${game.equipment.length} equipment item${game.equipment.length === 1 ? "" : "s"}`,
    `${game.energyLevel} energy`
  ];
  if (criteria.groupSize) reasons.push(`fits ${criteria.groupSize} Cubs`);
  return reasons;
}