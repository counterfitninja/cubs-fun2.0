import { readFile } from "node:fs/promises";
import path from "node:path";
import type { EnergyLevel, Game, Space } from "@/src/domain/types";

const excludedTitles = new Set([
  "Sin Bin",
  "How To Get Equal Size/Weight Teams",
  "Motion Detectors",
  "Emergency Games Box"
]);

interface MarkdownEntry {
  title: string;
  body: string;
}

export async function loadMarkdownGames(): Promise<Game[]> {
  const markdown = await readFile(path.join(process.cwd(), "games.md"), "utf8");
  return parseMarkdownGames(markdown);
}

export function parseMarkdownGames(markdown: string): Game[] {
  const entries = splitEntries(markdown);
  return entries.map((entry, index) => toGame(entry, index));
}

function splitEntries(markdown: string): MarkdownEntry[] {
  const entries: MarkdownEntry[] = [];
  let current: MarkdownEntry | undefined;

  for (const line of markdown.split(/\r?\n/)) {
    const title = extractTitle(line);
    if (title) {
      if (current && !excludedTitles.has(current.title)) entries.push(current);
      current = { title, body: "" };
    } else if (current) {
      current.body += `${line}\n`;
    }
  }

  if (current && !excludedTitles.has(current.title)) entries.push(current);
  return entries.filter((entry) => entry.body.trim().length > 0);
}

function extractTitle(line: string): string | undefined {
  const markdownMatch = line.match(/^#{2,}\s+(.+?)\s*$/);
  const numberedMatch = line.match(/^\s*\d{1,3}\.\s+(.+?)\s*$/);
  const rawTitle = markdownMatch?.[1] ?? numberedMatch?.[1];
  if (!rawTitle) return undefined;

  const title = rawTitle
    .replace(/^\d+(?:\s*#+)?\s*[.]?\s*/, "")
    .replace(/:+$/, "")
    .trim();
  return title.length > 1 ? title : undefined;
}

function toGame(entry: MarkdownEntry, index: number): Game {
  const instructions = entry.body.replace(/\s+/g, " ").trim();
  const duration = durationFrom(instructions);
  const groupSize = groupSizeFrom(instructions);
  const space = spaceFrom(instructions);
  const energyLevel = energyFrom(instructions);
  const equipment = equipmentFrom(entry.body);
  const id = `${slugify(entry.title)}-${index + 1}`;
  const timestamp = "2026-09-14T12:00:00.000Z";

  return {
    id,
    title: entry.title,
    summary: truncate(instructions, 180),
    aim: "Build confidence, cooperation, and enjoyment through an active Cub Scout game.",
    setup: equipment.length ? `Gather: ${equipment.join(", ")}.` : "Set a clear playing area and explain the rules before starting.",
    instructions,
    durationMinutesMin: duration.min,
    durationMinutesMax: duration.max,
    space,
    groupSizeMin: groupSize.min,
    groupSizeMax: groupSize.max,
    equipment,
    energyLevel,
    activityType: activityTypeFrom(instructions, energyLevel),
    safetyNotes: "Check the space and equipment, set clear boundaries, and adapt the activity for the group.",
    accessibilityNotes: "Offer an equivalent role, pace, or team responsibility so everyone can take part.",
    suitabilityNotes: "Review the instructions and make age-appropriate adjustments before running the game.",
    keywords: keywordList(entry.title, instructions),
    publicationStatus: "published",
    createdAt: timestamp,
    updatedAt: timestamp,
    publishedAt: timestamp
  };
}

function durationFrom(text: string): { min: number; max: number } {
  const range = text.match(/(?:playing time[\s:]*)(?:from\s+)?(\d+)\s*(?:to|-)\s*(\d+)\s*minutes?/i);
  if (range) return { min: Number(range[1]), max: Number(range[2]) };
  return { min: 10, max: 20 };
}

function groupSizeFrom(text: string): { min: number; max: number } {
  const range = text.match(/(?:number of players[\s:]*)(?:from\s+)?(\d+)\s*(?:to|-)\s*(\d+)/i);
  if (range) return { min: Number(range[1]), max: Number(range[2]) };
  return { min: 4, max: 30 };
}

function spaceFrom(text: string): Space {
  const indoor = /indoors?|hall|room|den/i.test(text);
  const outdoor = /outdoors?|field|wood|park|locality/i.test(text);
  if (indoor && outdoor) return "either";
  return outdoor ? "outdoor" : "indoor";
}

function energyFrom(text: string): EnergyLevel {
  if (/run|race|relay|chase|active|energy release/i.test(text)) return "high";
  if (/sit|quiet|memory|guess/i.test(text)) return "low";
  return "medium";
}

function equipmentFrom(text: string): string[] {
  const match = text.match(/(?:gear required|equipment)\s*[:=]\s*([^\r\n]+)/i);
  if (!match || /^none$/i.test(match[1].trim())) return [];
  return match[1]
    .split(/[,;•]/)
    .map((item) => item.replace(/^\d+\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 6);
}

function activityTypeFrom(text: string, energyLevel: EnergyLevel): string {
  if (/team|patrol|six/i.test(text)) return "team";
  if (energyLevel === "high") return "active";
  if (energyLevel === "low") return "quiet";
  return "skill-building";
}

function keywordList(title: string, text: string): string[] {
  return Array.from(new Set(`${title} ${text}`.toLowerCase().match(/[a-z]{4,}/g) ?? [])).slice(0, 12);
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function truncate(value: string, length: number): string {
  return value.length <= length ? value : `${value.slice(0, length - 3).trimEnd()}...`;
}