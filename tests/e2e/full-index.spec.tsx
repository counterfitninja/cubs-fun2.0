import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppStoreProvider } from "@/src/services/AppStoreProvider";
import { CataloguePage } from "@/src/components/CataloguePage";
import { setPhoneViewport } from "./helpers/phoneViewport";

describe("full index phone flow", () => {
  it("shows published games with index summaries", () => {
    setPhoneViewport();
    render(<AppStoreProvider><CataloguePage /></AppStoreProvider>);
    expect(screen.getByText("Torchlight Trails")).toBeInTheDocument();
    expect(screen.getByText("Foxes and Rabbits")).toBeInTheDocument();
    expect(screen.queryByText("Rope Relay")).not.toBeInTheDocument();
  });
});