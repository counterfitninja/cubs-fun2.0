import type { Metadata } from "next";
import { AppShell } from "@/src/components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cubs Games",
  description: "Phone-first game finder for UK Cub Scout evenings"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}