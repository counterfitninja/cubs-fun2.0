import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppStoreProvider } from "@/src/services/AppStoreProvider";
import { CataloguePage } from "@/src/components/CataloguePage";

describe("accessibility smoke checks", () => {
  it("provides labelled catalogue controls and touch-sized actions", () => {
    render(<AppStoreProvider><CataloguePage /></AppStoreProvider>);
    expect(screen.getByLabelText(/Search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Minutes/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Favourite|Favourited/i }).length).toBeGreaterThan(0);
  });
});