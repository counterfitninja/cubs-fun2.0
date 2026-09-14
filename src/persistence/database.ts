import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { Game } from "@/src/domain/types";

const DEFAULT_DB_PATH = path.join(process.cwd(), "data", "cubs-games.sqlite");

export interface GameRecordRepository {
  list(): Game[];
  get(id: string): Game | undefined;
  save(game: Game): Game;
  clear(): void;
}

export function createSqliteGameRepository(dbPath = DEFAULT_DB_PATH): GameRecordRepository {
  mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new DatabaseSync(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      aim TEXT NOT NULL,
      setup TEXT NOT NULL,
      instructions TEXT NOT NULL,
      durationMinutesMin INTEGER NOT NULL,
      durationMinutesMax INTEGER,
      space TEXT NOT NULL,
      groupSizeMin INTEGER NOT NULL,
      groupSizeMax INTEGER,
      equipment TEXT NOT NULL,
      energyLevel TEXT NOT NULL,
      activityType TEXT NOT NULL,
      safetyNotes TEXT NOT NULL,
      accessibilityNotes TEXT NOT NULL,
      suitabilityNotes TEXT NOT NULL,
      keywords TEXT NOT NULL,
      publicationStatus TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      publishedAt TEXT
    );
  `);

  return {
    list() {
      const rows = db.prepare("SELECT * FROM games ORDER BY lower(title) ASC").all() as Record<string, unknown>[];
      return rows.map(parseGameRow);
    },
    get(id: string) {
      const row = db.prepare("SELECT * FROM games WHERE id = ?").get(id) as Record<string, unknown> | undefined;
      return row ? parseGameRow(row) : undefined;
    },
    save(game: Game) {
      const normalised = normaliseGame(game);
      db.prepare(`
        INSERT INTO games (
          id, title, summary, aim, setup, instructions, durationMinutesMin, durationMinutesMax,
          space, groupSizeMin, groupSizeMax, equipment, energyLevel, activityType,
          safetyNotes, accessibilityNotes, suitabilityNotes, keywords, publicationStatus,
          createdAt, updatedAt, publishedAt
        ) VALUES (
          @id, @title, @summary, @aim, @setup, @instructions, @durationMinutesMin, @durationMinutesMax,
          @space, @groupSizeMin, @groupSizeMax, @equipment, @energyLevel, @activityType,
          @safetyNotes, @accessibilityNotes, @suitabilityNotes, @keywords, @publicationStatus,
          @createdAt, @updatedAt, @publishedAt
        )
        ON CONFLICT(id) DO UPDATE SET
          title = excluded.title,
          summary = excluded.summary,
          aim = excluded.aim,
          setup = excluded.setup,
          instructions = excluded.instructions,
          durationMinutesMin = excluded.durationMinutesMin,
          durationMinutesMax = excluded.durationMinutesMax,
          space = excluded.space,
          groupSizeMin = excluded.groupSizeMin,
          groupSizeMax = excluded.groupSizeMax,
          equipment = excluded.equipment,
          energyLevel = excluded.energyLevel,
          activityType = excluded.activityType,
          safetyNotes = excluded.safetyNotes,
          accessibilityNotes = excluded.accessibilityNotes,
          suitabilityNotes = excluded.suitabilityNotes,
          keywords = excluded.keywords,
          publicationStatus = excluded.publicationStatus,
          createdAt = excluded.createdAt,
          updatedAt = excluded.updatedAt,
          publishedAt = excluded.publishedAt
      `).run({
        ...normalised,
        equipment: JSON.stringify(normalised.equipment),
        keywords: JSON.stringify(normalised.keywords)
      });
      return normalised;
    },
    clear() {
      db.prepare("DELETE FROM games").run();
    }
  };
}

function normaliseGame(game: Game): Game {
  const now = new Date().toISOString();
  return {
    ...game,
    equipment: Array.isArray(game.equipment) ? game.equipment : [],
    keywords: Array.isArray(game.keywords) ? game.keywords : [],
    createdAt: game.createdAt || now,
    updatedAt: game.updatedAt || now,
    publicationStatus: game.publicationStatus || "draft"
  };
}

function parseGameRow(row: Record<string, unknown>): Game {
  const equipment = parseStringArray(row.equipment);
  const keywords = parseStringArray(row.keywords);

  return {
    id: String(row.id ?? ""),
    title: String(row.title ?? ""),
    summary: String(row.summary ?? ""),
    aim: String(row.aim ?? ""),
    setup: String(row.setup ?? ""),
    instructions: String(row.instructions ?? ""),
    durationMinutesMin: Number(row.durationMinutesMin ?? 0),
    durationMinutesMax: row.durationMinutesMax == null ? undefined : Number(row.durationMinutesMax),
    space: String(row.space ?? "indoor") as Game["space"],
    groupSizeMin: Number(row.groupSizeMin ?? 0),
    groupSizeMax: row.groupSizeMax == null ? undefined : Number(row.groupSizeMax),
    equipment,
    energyLevel: String(row.energyLevel ?? "medium") as Game["energyLevel"],
    activityType: String(row.activityType ?? ""),
    safetyNotes: String(row.safetyNotes ?? ""),
    accessibilityNotes: String(row.accessibilityNotes ?? ""),
    suitabilityNotes: String(row.suitabilityNotes ?? ""),
    keywords,
    publicationStatus: String(row.publicationStatus ?? "draft") as Game["publicationStatus"],
    createdAt: String(row.createdAt ?? new Date().toISOString()),
    updatedAt: String(row.updatedAt ?? new Date().toISOString()),
    publishedAt: row.publishedAt == null ? undefined : String(row.publishedAt),
  };
}

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item));
  if (typeof value !== "string" || value.trim().length === 0) return [];

  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.map((item) => String(item)) : [value];
  } catch {
    return value
      .split(/[,;|]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
}
