import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Schreib mir eine Nachricht — ich freue mich über Fragen, Feedback und Kooperationsanfragen rund um Gefühlsförderung.",
  alternates: {
    canonical: "https://gefühlsförderung.de/kontakt",
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
