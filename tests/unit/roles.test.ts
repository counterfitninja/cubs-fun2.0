import { describe, expect, it } from "vitest";
import { canPerform, visibleNavigationFor } from "@/src/domain/roles";
import { demoAdminRole, demoLeaderRole } from "../fixtures/games";

describe("role boundaries", () => {
  it("allows only admins to maintain games", () => {
    expect(canPerform(demoAdminRole, "publish")).toBe(true);
    expect(canPerform(demoLeaderRole, "publish")).toBe(false);
  });

  it("keeps admin navigation out of leader browsing", () => {
    expect(visibleNavigationFor("leader")).not.toContain("Admin");
    expect(visibleNavigationFor("admin")).toContain("Admin");
  });
});