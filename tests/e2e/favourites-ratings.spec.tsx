import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AppStoreProvider } from "@/src/services/AppStoreProvider";
import { GameDetailPage } from "@/src/components/GameDetailPage";
import { setPhoneViewport } from "./helpers/phoneViewport";

describe("favourites and ratings phone flow", () => {
  it("saves a played rating after confirmation", async () => {
    setPhoneViewport();
    render(<AppStoreProvider><GameDetailPage gameId="torchlight-trails" /></AppStoreProvider>);
    await userEvent.selectOptions(screen.getByLabelText(/Played this game/i), "yes");
    await userEvent.selectOptions(screen.getByLabelText(/Rating/i), "4");
    await userEvent.click(screen.getByRole("button", { name: /Save played rating/i }));
    expect(screen.getByText("Played rating saved.")).toBeInTheDocument();
  });
});