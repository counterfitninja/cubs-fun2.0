import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AppStoreProvider } from "@/src/services/AppStoreProvider";
import { CataloguePage } from "@/src/components/CataloguePage";
import { setPhoneViewport } from "./helpers/phoneViewport";

describe("phone game discovery", () => {
  it("filters to a no-equipment evening game", async () => {
    setPhoneViewport();
    render(<AppStoreProvider><CataloguePage /></AppStoreProvider>);
    await userEvent.type(screen.getByLabelText(/Minutes/i), "15");
    await userEvent.selectOptions(screen.getByLabelText(/Space/i), "indoor");
    await userEvent.selectOptions(screen.getByLabelText(/Equipment/i), "none");
    expect(screen.getByText("Promise Pairs")).toBeInTheDocument();
  });
});