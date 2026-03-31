import type { Metadata } from "next";
import { Quiz } from "@/components/quiz/Quiz";
import { themaHeadlines, defaultHeadline } from "@/lib/quiz";

export const metadata: Metadata = {
  title: "Gefühls-Quiz für Eltern",
  description:
    "Finde heraus, welche Gefühls-Herausforderung euch als Familie gerade am meisten beschäftigt. 5 Fragen, 2 Minuten, persönliches Ergebnis.",
};

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{ thema?: string }>;
}) {
  const params = await searchParams;
  const thema = params.thema;
  const headline =
    thema && thema in themaHeadlines
      ? themaHeadlines[thema]
      : defaultHeadline;

  return (
    <section className="bg-gradient-to-b from-lavender/10 to-cream min-h-[80vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Quiz headline={headline} />
      </div>
    </section>
  );
}
