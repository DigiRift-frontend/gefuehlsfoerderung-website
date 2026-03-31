import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Puzzle,
  Heart,
  Users,
  Star,
  Check,
  Sparkles,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const SITE_URL = "https://gefühlsförderung.de";

export const metadata: Metadata = {
  title: "Emotions-Memory – Spielerisch Gefühle erkennen lernen",
  description:
    "Handgemalte Emotions-Memory-Karten für Kinder von 4–10 Jahren. 24 illustrierte Karten pro Set. Ideal für Familien, Kitas und Therapie.",
  keywords: [
    "Emotions-Memory",
    "Gefühle Spiel Kinder",
    "Memory Emotionen",
    "Gefühlsförderung Spiel",
  ],
  alternates: {
    canonical: `${SITE_URL}/memory`,
  },
  openGraph: {
    title: "Emotions-Memory – Spielerisch Gefühle erkennen lernen",
    description:
      "Handgemalte Emotions-Memory-Karten für Kinder von 4–10 Jahren. 24 illustrierte Karten pro Set.",
    url: `${SITE_URL}/memory`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/products/memory-1-cover.webp`,
        width: 1200,
        height: 675,
        alt: "Emotions-Memory – Gefühlsförderung Kartenspiel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emotions-Memory – Spielerisch Gefühle erkennen lernen",
    description:
      "Handgemalte Emotions-Memory-Karten für Kinder. 24 illustrierte Karten pro Set.",
    images: [`${SITE_URL}/images/products/memory-1-cover.webp`],
  },
};

const emotionsTeil1 = [
  "Ruhig",
  "Dankbar",
  "Beschämt",
  "Unkonzentriert",
  "Neugierig",
  "Besorgt",
  "Mutig",
  "Traurig",
  "Erschöpft",
  "Gelangweilt",
  "Glücklich",
  "Wütend",
];

const emotionsTeil2 = [
  "Sauer",
  "Verwirrt",
  "Durcheinander",
  "Neidisch",
  "Aufgeregt",
  "Überrascht",
  "Stolz",
  "Unsicher",
  "Gleichgültig",
  "Ängstlich",
  "Verspielt",
  "Enttäuscht",
];

const useCases = [
  {
    icon: Users,
    title: "Familienabende",
    text: "Spielerisch über Gefühle ins Gespräch kommen und als Familie emotionale Kompetenz aufbauen.",
  },
  {
    icon: GraduationCap,
    title: "Kitas & Grundschulen",
    text: "Ein pädagogisches Werkzeug, das Kindern hilft, Emotionen zu erkennen und zu benennen.",
  },
  {
    icon: Heart,
    title: "Therapie & Beratung",
    text: "Als Einstieg, Vertiefung oder reflektierender Abschluss einer therapeutischen Stunde einsetzbar.",
  },
];

const testimonials = [
  {
    text: "Das Spiel hat bei uns zuhause eine neue Art der Kommunikation eröffnet. Plötzlich sprechen wir alle mehr über unsere Gefühle.",
    author: "Familie Bauer",
  },
  {
    text: "Mein Sohn kann Emotionen nun klarer benennen und verstehen. Jede Karte regt zum Austausch über unsere Gefühle an.",
    author: "Michaela Neumann",
  },
  {
    text: "Das Spiel hat nicht nur ihr Verständnis für Emotionen verbessert, sondern auch ihre Empathiefähigkeit. Die Detailverliebtheit ist bemerkenswert.",
    author: "Stefan Groß",
  },
];

export default function MemoryLandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-rose/10 to-cream py-16 md:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex gap-2 mb-6">
                <Badge variant="handmade">100% handgemalt</Badge>
                <Badge variant="sale">Limitierter Preis</Badge>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-charcoal font-bold leading-tight">
                Spielerisch{" "}
                <span className="text-rose-dark">Gefühle erkennen</span> lernen
              </h1>
              <p className="mt-6 text-lg text-charcoal-light leading-relaxed max-w-lg">
                Handgemalte Emotions-Memory-Karten, die deinem Kind helfen,
                verschiedene Gefühle zu erkennen, zu benennen und zu verstehen.
                Für Familien, Kitas und Therapie.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  href="/shop/emotions-memory-teil-1"
                  variant="secondary"
                  size="lg"
                >
                  Teil 1 — 14,99 &euro;
                </Button>
                <Button
                  href="/shop/emotions-memory-teil-2"
                  variant="outline"
                  size="lg"
                >
                  Teil 2 — 19,99 &euro;
                </Button>
              </div>

              <p className="mt-4 text-sm text-charcoal-lighter">
                Je 24 Karten (12 Paare) &middot; Empfohlenes Alter: 4–10 Jahre
              </p>
            </div>

            {/* Memory Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-rose/15 to-gold/10 border border-rose/10 overflow-hidden relative">
                <Image
                  src="/images/landing/memory-both-sets.jpg"
                  alt="Emotions-Memory Teil 1 und Teil 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-rose-dark font-semibold text-sm uppercase tracking-wider mb-3">
            Mehr als ein Spiel
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold">
            Ein pädagogisches Werkzeug für emotionale Kompetenz
          </h2>
          <p className="mt-6 text-lg text-charcoal-light leading-relaxed">
            Das Emotions-Memory vermittelt auf unterhaltsame Weise wichtige
            soziale und emotionale Kompetenzen. Jede Karte zeigt eine
            handgemalte Illustration einer Emotion — so lernt dein Kind
            spielerisch, Gefühle zu erkennen und zuzuordnen.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-rose-dark font-semibold text-sm uppercase tracking-wider mb-3">
              Vielseitig einsetzbar
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold">
              Für jeden Einsatzbereich
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={useCase.title}
                  className="bg-white rounded-3xl p-8 border border-rose/10 shadow-sm"
                >
                  <div className="w-14 h-14 rounded-2xl bg-rose/10 flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-rose-dark" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal">
                    {useCase.title}
                  </h3>
                  <p className="mt-2 text-charcoal-light leading-relaxed text-sm">
                    {useCase.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teil 1 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-rose/15 to-gold/10 border border-rose/10 overflow-hidden relative">
              <Image
                src="/images/landing/memory-1-all-cards.webp"
                alt="Emotions-Memory Teil 1 — Alle Karten"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <Badge variant="sale" className="mb-4">
                Limitierter Preis
              </Badge>
              <h2 className="font-heading text-3xl text-charcoal font-bold">
                Teil 1: Entdeckungsreise der Emotionen
              </h2>
              <p className="mt-4 text-charcoal-light leading-relaxed">
                24 handgemalte Karten (12 Paare) mit den grundlegenden
                Emotionen. Der perfekte Einstieg in die Welt der Gefühle.
              </p>

              <div className="mt-6">
                <p className="text-sm font-semibold text-charcoal mb-3">
                  Enthaltene Gefühle:
                </p>
                <div className="flex flex-wrap gap-2">
                  {emotionsTeil1.map((emotion) => (
                    <span
                      key={emotion}
                      className="inline-block bg-rose/10 text-charcoal-light text-xs font-medium px-3 py-1.5 rounded-full border border-rose/15"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-sage-dark">
                  14,99 &euro;
                </span>
                <span className="text-lg text-charcoal-lighter line-through">
                  24,99 &euro;
                </span>
                <Badge variant="sale">-40%</Badge>
              </div>

              <Button
                href="/shop/emotions-memory-teil-1"
                variant="secondary"
                size="lg"
                className="mt-6"
              >
                Teil 1 bestellen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Teil 2 */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <Badge variant="new" className="mb-4">
                Erweiterung
              </Badge>
              <h2 className="font-heading text-3xl text-charcoal font-bold">
                Teil 2: Kaleidoskop der Gefühle
              </h2>
              <p className="mt-4 text-charcoal-light leading-relaxed">
                24 weitere handgemalte Karten (12 Paare) mit neuen Emotionen
                und Alltagssituationen. Zusammen mit Teil 1 entsteht ein
                umfassendes Set von 48 Karten.
              </p>

              <div className="mt-6">
                <p className="text-sm font-semibold text-charcoal mb-3">
                  Enthaltene Gefühle:
                </p>
                <div className="flex flex-wrap gap-2">
                  {emotionsTeil2.map((emotion) => (
                    <span
                      key={emotion}
                      className="inline-block bg-gold/10 text-charcoal-light text-xs font-medium px-3 py-1.5 rounded-full border border-gold/15"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-sage-dark">
                  19,99 &euro;
                </span>
                <span className="text-lg text-charcoal-lighter line-through">
                  24,99 &euro;
                </span>
                <Badge variant="sale">-20%</Badge>
              </div>

              <Button
                href="/shop/emotions-memory-teil-2"
                variant="secondary"
                size="lg"
                className="mt-6"
              >
                Teil 2 bestellen
              </Button>
            </div>
            <div className="order-1 md:order-2 aspect-square rounded-3xl bg-gradient-to-br from-gold/15 to-rose/10 border border-gold/10 overflow-hidden relative">
              <Image
                src="/images/landing/memory-2-all-cards.webp"
                alt="Emotions-Memory Teil 2 — Alle Karten"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Combine CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-rose/5 to-gold/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-10 w-10 text-gold-dark mx-auto mb-4" />
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold">
            Beide Teile kombinieren
          </h2>
          <p className="mt-4 text-lg text-charcoal-light max-w-2xl mx-auto">
            Verbinde Teil 1 und 2 zu einem vollständigen Set von 48 Karten und
            entdecke 24 verschiedene Gefühle. Schenke deinem Kind den
            Schlüssel zu einer tieferen emotionalen Welt.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="bg-white rounded-2xl p-6 border border-rose/10 shadow-sm text-center min-w-48">
              <p className="text-sm font-semibold text-charcoal-lighter">
                Teil 1
              </p>
              <p className="text-2xl font-bold text-charcoal mt-1">
                14,99 &euro;
              </p>
            </div>
            <span className="text-2xl font-bold text-charcoal-lighter">+</span>
            <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm text-center min-w-48">
              <p className="text-sm font-semibold text-charcoal-lighter">
                Teil 2
              </p>
              <p className="text-2xl font-bold text-charcoal mt-1">
                19,99 &euro;
              </p>
            </div>
            <span className="text-2xl font-bold text-charcoal-lighter">=</span>
            <div className="bg-white rounded-2xl p-6 border border-sage/20 shadow-sm text-center min-w-48">
              <p className="text-sm font-semibold text-charcoal-lighter">
                48 Karten
              </p>
              <p className="text-2xl font-bold text-sage-dark mt-1">
                34,98 &euro;
              </p>
            </div>
          </div>

          <p className="mt-8 text-charcoal-light">
            Oder spare noch mehr mit dem Gefühlskompass Bundle:
          </p>
          <Button
            href="/shop/gefuehlskompass-bundle"
            variant="primary"
            size="lg"
            className="mt-4"
          >
            Zum Bundle — spare über 37%
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-rose-dark font-semibold text-sm uppercase tracking-wider mb-3">
              Bewertungen
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold">
              Was Kunden sagen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="bg-cream rounded-3xl p-8 border border-rose/10"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold text-gold"
                    />
                  ))}
                </div>
                <p className="text-charcoal leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold text-charcoal">
                  {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs Summary */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-rose/10 shadow-lg">
            <h2 className="font-heading text-2xl text-charcoal font-bold text-center mb-8">
              Auf einen Blick
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "24 handgemalte Karten pro Set (12 Paare)",
                "Empfohlenes Alter: 4–10 Jahre",
                "Teil 1 + Teil 2 = 48 Karten, 24 Gefühle",
                "Ideal für Familien, Kitas und Therapie",
                "100% handgemalt von Ewelina Gawlik",
                "Hochwertige Kartenqualität",
                "Fördert Empathie und Emotionserkennung",
                "Von Kindheitspädagogin entwickelt",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-sage shrink-0 mt-0.5" />
                  <span className="text-charcoal text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/shop/emotions-memory-teil-1" variant="secondary">
                Teil 1 bestellen (14,99 &euro;)
              </Button>
              <Button href="/shop/emotions-memory-teil-2" variant="outline">
                Teil 2 bestellen (19,99 &euro;)
              </Button>
            </div>
            <p className="mt-3 text-xs text-charcoal-lighter text-center">
              Kein MwSt-Ausweis, Kleinunternehmer nach &sect;19 UStG. zzgl.
              Versandkosten.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
