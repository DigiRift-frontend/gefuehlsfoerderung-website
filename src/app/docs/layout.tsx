import type { Metadata } from "next";

// Interne Doku-Seiten (z. B. /docs/funnel) — nicht für Suchmaschinen.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
