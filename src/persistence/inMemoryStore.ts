import type { Favourite, Game, PlayedRating, UserRole } from "@/src/domain/types";

export const currentLeaderId = "leader-demo";

export const seedGames: Game[] = [
  {
    id: "torchlight-trails",
    title: "Torchlight Trails",
    summary: "A quick indoor trail game using picture clues around the hall.",
    aim: "Practise observation and teamwork under light time pressure.",
    setup: "Place clue cards around the meeting space before Cubs arrive.",
    instructions: "Split Cubs into small teams. Give each team a starting clue and ask them to follow the trail, collecting a letter at each stop to solve the final word.",
    durationMinutesMin: 10,
    durationMinutesMax: 20,
    space: "indoor",
    groupSizeMin: 8,
    groupSizeMax: 30,
    equipment: ["Clue cards", "Torches"],
    energyLevel: "medium",
    activityType: "team",
    safetyNotes: "Keep walkways clear and remind Cubs not to run with torches.",
    accessibilityNotes: "Clues can be placed at reachable heights and read aloud by a team buddy.",
    suitabilityNotes: "Works well as a UK Cub Scout teamwork challenge during darker evenings.",
    keywords: ["trail", "team", "clues", "torch", "evening"],
    publicationStatus: "published",
    createdAt: "2026-09-14T09:00:00.000Z",
    updatedAt: "2026-09-14T09:00:00.000Z",
    publishedAt: "2026-09-14T09:00:00.000Z"
  },
  {
    id: "foxes-and-rabbits",
    title: "Foxes and Rabbits",
    summary: "A high-energy outdoor chasing game with safe zones.",
    aim: "Burn energy while practising spatial awareness and fair play.",
    setup: "Mark two safe zones and a clear playing boundary.",
    instructions: "Choose two foxes. Rabbits cross the space to collect tokens while foxes tag them. Tagged rabbits do five star jumps before rejoining.",
    durationMinutesMin: 15,
    durationMinutesMax: 25,
    space: "outdoor",
    groupSizeMin: 10,
    groupSizeMax: 36,
    equipment: ["Cones", "Tokens"],
    energyLevel: "high",
    activityType: "active",
    safetyNotes: "Use a flat area, set clear boundaries, and pause if the group becomes crowded.",
    accessibilityNotes: "Use walking pace or buddy roles for Cubs who need lower-impact participation.",
    suitabilityNotes: "Best for a dry evening with enough adult supervision around the boundary.",
    keywords: ["running", "outdoor", "active", "team"],
    publicationStatus: "published",
    createdAt: "2026-09-14T09:05:00.000Z",
    updatedAt: "2026-09-14T09:05:00.000Z",
    publishedAt: "2026-09-14T09:05:00.000Z"
  },
  {
    id: "promise-pairs",
    title: "Promise Pairs",
    summary: "A calm matching game using Cub Scout values and simple actions.",
    aim: "Reinforce Cub Scout values through a quiet group activity.",
    setup: "Prepare pairs of cards with matching words, pictures, or actions.",
    instructions: "Place cards face down. Cubs take turns finding matching pairs and explaining the value shown when they make a match.",
    durationMinutesMin: 10,
    durationMinutesMax: 15,
    space: "either",
    groupSizeMin: 4,
    groupSizeMax: 24,
    equipment: [],
    energyLevel: "low",
    activityType: "quiet",
    safetyNotes: "Use a seated space with enough room for everyone to see the cards.",
    accessibilityNotes: "Use large print cards and picture prompts for mixed reading confidence.",
    suitabilityNotes: "Useful as a settling activity or reflection starter for UK Cub Scouts.",
    keywords: ["promise", "values", "quiet", "cards", "indoor"],
    publicationStatus: "published",
    createdAt: "2026-09-14T09:10:00.000Z",
    updatedAt: "2026-09-14T09:10:00.000Z",
    publishedAt: "2026-09-14T09:10:00.000Z"
  },
  {
    id: "draft-kim-game",
    title: "Kim's Game Variant",
    summary: "Draft observation activity awaiting equipment notes.",
    aim: "Improve memory and observation.",
    setup: "",
    instructions: "Show objects briefly, cover them, then ask Cubs to recall what they saw.",
    durationMinutesMin: 10,
    space: "indoor",
    groupSizeMin: 6,
    equipment: ["Tray", "Objects", "Cloth"],
    energyLevel: "low",
    activityType: "skill-building",
    safetyNotes: "Use age-appropriate objects only.",
    accessibilityNotes: "Objects can be named aloud after the reveal.",
    suitabilityNotes: "",
    keywords: ["memory", "observation"],
    publicationStatus: "draft",
    createdAt: "2026-09-14T09:15:00.000Z",
    updatedAt: "2026-09-14T09:15:00.000Z"
  },
  {
    id: "retired-rope-relay",
    title: "Rope Relay",
    summary: "Retired relay retained for historical ratings.",
    aim: "Practise knots and teamwork.",
    setup: "Set out ropes and cones.",
    instructions: "Teams race to tie simple knots at relay points.",
    durationMinutesMin: 20,
    space: "outdoor",
    groupSizeMin: 8,
    equipment: ["Ropes", "Cones"],
    energyLevel: "medium",
    activityType: "skill-building",
    safetyNotes: "Avoid running with rope loops.",
    accessibilityNotes: "Allow seated knot stations.",
    suitabilityNotes: "Retired pending safer variant.",
    keywords: ["knots", "relay"],
    publicationStatus: "retired",
    createdAt: "2026-09-14T09:20:00.000Z",
    updatedAt: "2026-09-14T09:20:00.000Z",
    publishedAt: "2026-09-14T09:20:00.000Z"
  }
];

export const seedFavourites: Favourite[] = [{ userId: currentLeaderId, gameId: "promise-pairs", createdAt: "2026-09-14T10:00:00.000Z" }];

export const seedRatings: PlayedRating[] = [
  { userId: "akela", gameId: "promise-pairs", rating: 5, playedConfirmed: true, feedback: "Settled the pack nicely.", createdAt: "2026-09-14T10:10:00.000Z", updatedAt: "2026-09-14T10:10:00.000Z" },
  { userId: "baloo", gameId: "foxes-and-rabbits", rating: 4, playedConfirmed: true, feedback: "Great outside, needs space.", createdAt: "2026-09-14T10:20:00.000Z", updatedAt: "2026-09-14T10:20:00.000Z" }
];

export const demoLeaderRole: UserRole = { role: "leader", displayName: "Demo Leader", active: true };
export const demoAdminRole: UserRole = { role: "admin", displayName: "Demo Admin", active: true };