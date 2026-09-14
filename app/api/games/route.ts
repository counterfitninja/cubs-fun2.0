import { createSqliteGameRepository } from "@/src/persistence/database";
import { loadMarkdownGames } from "@/src/persistence/gameMarkdown";
import { createGame, editGame, setGamePublicationStatus } from "@/src/services/adminGameService";
import { demoAdminRole } from "@/src/persistence/inMemoryStore";

export async function GET() {
  try {
    const repo = createSqliteGameRepository();
    const games = repo.list();
    if (games.length > 0) return Response.json(games);

    const initialGames = await loadMarkdownGames();
    for (const game of initialGames) {
      repo.save(game);
    }
    return Response.json(repo.list());
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to load games" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const repo = createSqliteGameRepository();
    const payload = await request.json() as {
      action?: "create" | "update" | "status";
      game?: any;
      gameId?: string;
      changes?: Partial<any>;
      status?: any;
    };

    if (!payload.action) {
      return Response.json({ error: "Missing action" }, { status: 400 });
    }

    if (payload.action === "create") {
      const current = repo.list();
      const next = createGame(current, payload.game, demoAdminRole);
      for (const game of next) {
        repo.save(game);
      }
      return Response.json({ games: repo.list() }, { status: 201 });
    }

    if (payload.action === "update") {
      const current = repo.list();
      const next = editGame(current, payload.gameId ?? "", payload.changes ?? {}, demoAdminRole);
      for (const game of next) {
        repo.save(game);
      }
      return Response.json({ games: repo.list() });
    }

    if (payload.action === "status") {
      const current = repo.list();
      const next = setGamePublicationStatus(current, payload.gameId ?? "", payload.status ?? "draft", demoAdminRole);
      for (const game of next) {
        repo.save(game);
      }
      return Response.json({ games: repo.list() });
    }

    return Response.json({ error: "Unsupported action" }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to save game" }, { status: 500 });
  }
}