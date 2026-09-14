import type { UserRole, UserRoleName } from "./types";

const adminActions = new Set(["create", "edit", "delete", "publish", "retire", "unpublish", "restore"]);

export function canPerform(role: UserRole, action: string): boolean {
  if (!role.active) return false;
  if (adminActions.has(action)) return role.role === "admin";
  return role.role === "leader" || role.role === "admin";
}

export function visibleNavigationFor(roleName: UserRoleName): string[] {
  const base = ["Catalogue", "Favourites", "Randomiser"];
  return roleName === "admin" ? [...base, "Admin"] : base;
}