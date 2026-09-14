"use client";

import Link from "next/link";
import { BookOpen, Dice5, Heart, ShieldCheck, TentTree } from "lucide-react";
import { AppStoreProvider } from "@/src/services/AppStoreProvider";

const nav = [
  { href: "/catalogue", label: "Catalogue", icon: BookOpen },
  { href: "/favourites", label: "Favourites", icon: Heart },
  { href: "/randomiser", label: "Randomiser", icon: Dice5 },
  { href: "/admin/games", label: "Admin", icon: ShieldCheck }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppStoreProvider>
      <div className="site-shell">
        <header className="topbar">
          <Link href="/catalogue" className="brand" aria-label="Cubs Games home">
            <TentTree aria-hidden="true" />
            <span>Cubs Games</span>
          </Link>
          <nav className="nav" aria-label="Main navigation">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="nav-link">
                <Icon aria-hidden="true" size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </AppStoreProvider>
  );
}