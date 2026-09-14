import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GameForm, emptyGame } from "@/src/components/admin/GameForm";
import { AdminGameList } from "@/src/components/admin/AdminGameList";
import { seedGames } from "../fixtures/games";
import { setPhoneViewport } from "./helpers/phoneViewport";

describe("admin games phone flow", () => {
  it("blocks publishing incomplete game forms", async () => {
    setPhoneViewport();
    const onSave = vi.fn();
    render(<GameForm initialGame={{ ...emptyGame(), title: "" }} onSave={onSave} />);
    await userEvent.click(screen.getByRole("button", { name: /Publish/i }));
    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("searches, sorts, and maintains game records from the admin list", async () => {
    setPhoneViewport();
    const user = userEvent.setup();
    const onStatus = vi.fn();
    render(<AdminGameList games={seedGames} onStatus={onStatus} />);

    const search = screen.getByRole("textbox", { name: "Search games" });
    await user.type(search, "  TORCH  ");
    expect(screen.getByRole("heading", { name: "Torchlight Trails" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Foxes and Rabbits" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Edit" })).toHaveAttribute("href", "/admin/games/torchlight-trails");
    expect(screen.getByRole("button", { name: "Retire" })).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "safe zones");
    expect(screen.getByRole("heading", { name: "Foxes and Rabbits" })).toBeInTheDocument();

    await user.clear(search);
    await user.selectOptions(screen.getByRole("combobox", { name: "Sort games" }), "updated-desc");
    expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Rope Relay",
      "Kim's Game Variant",
      "Promise Pairs",
      "Foxes and Rabbits",
      "Torchlight Trails"
    ]);

    await user.type(search, "rope");
    await user.click(screen.getByRole("button", { name: "Publish" }));
    expect(onStatus).toHaveBeenCalledWith("retired-rope-relay", "published");

    await user.clear(search);
    await user.type(search, "not a game");
    expect(screen.getByText("No matching games")).toBeInTheDocument();
    expect(search).toHaveValue("not a game");
  });

  it("distinguishes an empty admin catalogue from no search matches", () => {
    render(<AdminGameList games={[]} onStatus={vi.fn()} />);
    expect(screen.getByText("No games to maintain yet.")).toBeInTheDocument();
  });
});