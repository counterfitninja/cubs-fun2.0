import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GameForm, emptyGame } from "@/src/components/admin/GameForm";
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
});