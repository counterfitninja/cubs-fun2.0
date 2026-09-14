import { loadMarkdownGames } from "@/src/persistence/gameMarkdown";

export async function GET() {
  return Response.json(await loadMarkdownGames());
}