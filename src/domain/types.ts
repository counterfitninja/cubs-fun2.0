export type Space = "indoor" | "outdoor" | "either";
export type EnergyLevel = "low" | "medium" | "high";
export type PublicationStatus = "draft" | "published" | "retired" | "unpublished";
export type UserRoleName = "leader" | "admin";

export interface Game {
  id: string;
  title: string;
  summary: string;
  aim: string;
  setup: string;
  instructions: string;
  durationMinutesMin: number;
  durationMinutesMax?: number;
  space: Space;
  groupSizeMin: number;
  groupSizeMax?: number;
  equipment: string[];
  energyLevel: EnergyLevel;
  activityType: string;
  safetyNotes: string;
  accessibilityNotes: string;
  suitabilityNotes: string;
  keywords: string[];
  publicationStatus: PublicationStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Favourite {
  userId: string;
  gameId: string;
  createdAt: string;
}

export interface PlayedRating {
  userId: string;
  gameId: string;
  rating: number;
  playedConfirmed: boolean;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRole {
  role: UserRoleName;
  displayName?: string;
  active: boolean;
}

export interface GameFilters {
  query?: string;
  durationMinutes?: number;
  space?: Space | "any";
  groupSize?: number;
  equipment?: "any" | "none" | "some";
  energyLevel?: EnergyLevel | "any";
  activityType?: string;
  accessibility?: string;
}

export interface RandomiserCriteria extends GameFilters {
  excludeGameIds?: string[];
}

export interface RatingSummary {
  average: number;
  count: number;
}

export interface GameWithSummary extends Game {
  ratingSummary?: RatingSummary;
  favourite?: boolean;
}