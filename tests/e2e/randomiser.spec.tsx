import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AppStoreProvider } from "@/src/services/AppStoreProvider";
import { RandomiserPage } from "@/src/components/RandomiserPage";
import { setPhoneViewport } from "./helpers/phoneViewport";

describe("randomiser phone flow", () => {
  it("suggests a matching game from selected criteria", async () => {
    setPhoneViewport();
    render(<AppStoreProvider><RandomiserPage /></AppStoreProvider>);
    await userEvent.type(screen.getByLabelText(/Minutes/i), "15");
    await userEvent.selectOptions(screen.getByLabelText(/Equipment/i), "none");
    await userEvent.click(screen.getByRole("button", { name: /Suggest a game/i }));
    expect(screen.getByText("Promise Pairs")).toBeInTheDocument();
  });
});