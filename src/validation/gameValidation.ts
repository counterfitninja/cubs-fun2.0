import type { Game } from "@/src/domain/types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateGameForPublication(game: Game): ValidationResult {
  const errors: string[] = [];
  const requiredText: Array<[keyof Game, string]> = [
    ["title", "Title is required"],
    ["summary", "Summary is required"],
    ["instructions", "Instructions are required"],
    ["suitabilityNotes", "Suitability notes are required"]
  ];

  requiredText.forEach(([field, message]) => {
    if (typeof game[field] !== "string" || String(game[field]).trim().length === 0) errors.push(message);
  });
  if (game.durationMinutesMin <= 0) errors.push("Duration minimum must be greater than zero");
  if (game.durationMinutesMax !== undefined && game.durationMinutesMin > game.durationMinutesMax) {
    errors.push("Duration minimum must not exceed duration maximum");
  }
  if (game.groupSizeMin <= 0) errors.push("Group size minimum must be greater than zero");
  if (game.groupSizeMax !== undefined && game.groupSizeMin > game.groupSizeMax) {
    errors.push("Group size minimum must not exceed group size maximum");
  }
  if (!game.space) errors.push("Space suitability is required");
  if (!game.energyLevel) errors.push("Energy level is required");
  if (!Array.isArray(game.equipment)) errors.push("Equipment must explicitly record required items or no equipment");

  return { valid: errors.length === 0, errors };
}