import { eligibleRandomGames, explainMatch, selectRandomGame } from "@/src/domain/randomiser";
import type { Game, RandomiserCriteria } from "@/src/domain/types";

export interface RandomiserResult {
  game?: Game;
  reasons: string[];
  eligibleCount: number;
  message: string;
}

export function suggestGame(games: Game[], criteria: RandomiserCriteria, random = Math.random): RandomiserResult {
  const eligible = eligibleRandomGames(games, criteria);
  const game = selectRandomGame(games, criteria, random);
  if (!game) {
    return {
      eligibleCount: 0,
      reasons: [],
      message: "No eligible games match those criteria. Try broadening time, space, equipment, or energy."
    };
  }
  return {
    game,
    eligibleCount: eligible.length,
    reasons: explainMatch(game, criteria),
    message: eligible.length === 1 ? "Only one game matches, so repeats may happen." : "Suggestion fits every selected criterion."
  };
}