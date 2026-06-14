import type { Metadata } from "next";
import { SqueezeOptIn } from "@/components/sections/SqueezeOptIn";

export const metadata: Metadata = {
  title: "5 Sätze, die jedes Kind beruhigen — kostenloser Mini-Guide",
  description:
    "Trag dich ein und erhalte Ewelinas kostenlosen Mini-Guide „5 Sätze, die jedes Kind beruhigen“ — plus warme Impulse zur Gefühlsförderung deines Kindes.",
  alternates: { canonical: "https://gefühlsförderung.de/impulse" },
};

// Squeeze-/Opt-in-Landingpage (Funnel-Einstieg, z. B. für Ads).
export default function ImpulsePage() {
  return <SqueezeOptIn />;
}
