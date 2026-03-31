import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  BookOpen,
  Heart,
  MessageCircle,
  Star,
  Check,
  Sparkles,
  Leaf,
} from "lucide-react";

const SITE_URL = "https://gefühlsförderung.de";

export const metadata: Metadata = {
  title: "Was fühlst du? – Das Kinderbuch zur Gefühlsförderung",
  description:
    "Ein handgemaltes Kinderbuch, das Kindern hilft, ihre Gefühle zu verstehen. 3 Geschichten über Traurigkeit, Wut und Freude. Von Kindheitspädagogin entwickelt.",
  keywords: [
    "Kinderbuch Gefühle",
    "Emotionen Kinder",
    "Gefühlsförderung",
    "Was fühlst du",
    "Kinderbuch Wut Traurigkeit Freude",
  ],
  alternates: {
    canonical: `${SITE_URL}/buch`,
  },
  openGraph: {
    type: "website",
    title: "Was fühlst du? – Das Kinderbuch zur Gefühlsförderung",
    description:
      "Ein handgemaltes Kinderbuch, das Kindern hilft, ihre Gefühle zu verstehen. 3 Geschichten über Traurigkeit, Wut und Freude.",
    url: `${SITE_URL}/buch`,
    images: [
      {
        url: `${SITE_URL}/images/products/book-front.webp`,
        width: 1200,
        height: 675,
        alt: "Was fühlst du? – Kinderbuch zur Gefühlsförderung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Was fühlst du? – Das Kinderbuch zur Gefühlsförderung",
    description:
      "Ein handgemaltes Kinderbuch, das Kindern hilft, ihre Gefühle zu verstehen.",
    images: [`${SITE_URL}/images/products/was-fuehlst-du/cover.webp`],
  },
};

const chapters = [
  {
    number: 1,
    emotion: "Traurigkeit",
    color: "from-lavender/20 to-lavender/5",
    borderColor: "border-lavender/20",
    iconColor: "text-lavender-dark",
    description:
      "Julian wird zu Hause mit einer neuen Situation konfrontiert. Desillusionierung und Traurigkeit kommen zum Vorschein — doch durch die Hilfe seines Freundes Tobi lernt er, über seine Gefühle zu sprechen.",
  },
  {
    number: 2,
    emotion: "Wut",
    color: "from-rose/20 to-rose/5",
    borderColor: "border-rose/20",
    iconColor: "text-rose-dark",
    description:
      "Ein Konflikt in der Schule bringt Julian aus der Fassung. Er lässt seine Wut an seinen Mitschülern aus. Teddy Tobi hilft ihm, die Situation zu reflektieren und konstruktiv mit Wut umzugehen.",
  },
  {
    number: 3,
    emotion: "Freude",
    color: "from-gold/20 to-gold/5",
    borderColor: "border-gold/20",
    iconColor: "text-gold-dark",
    description:
      "Julian erlebt neue Abenteuer: den ersten Schulweg allein und eine besondere Freundschaft. Die angesammelten positiven Erfahrungen verwandeln sich in echte Freude.",
  },
];

const benefits = [
  {
    icon: Heart,
    title: "Emotionale Intelligenz",
    text: "Entwicklung einer umfassenden sozio-emotionalen Kompetenz",
  },
  {
    icon: MessageCircle,
    title: "Bessere Kommunikation",
    text: "Verbesserter Ausdruck und Wahrnehmung von Emotionen",
  },
  {
    icon: Sparkles,
    title: "Stärkeres Emotionswissen",
    text: "Tieferes Verständnis für eigene und fremde Gefühle",
  },
  {
    icon: BookOpen,
    title: "Empathieentwicklung",
    text: "Verständnisvoller Umgang mit Bezugspersonen und Freunden",
  },
];

const testimonials = [
  {
    text: "Greifbare Geschichten in Kombination mit den richtigen Fragen. Wundervolle Illustrationen.",
    author: "Marion Sander",
  },
  {
    text: "Dieses Buch öffnete die Türen zu den Gefühlswelten meiner Sandmänchengruppe. Tolles Buch!",
    author: "Julia Siebert",
  },
  {
    text: "Ein hervorragendes Mittel, um ins Gespräch über die Gefühle meiner Tochter zu kommen.",
    author: "Nina Reinschmidt",
  },
];

const buchJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Was fühlst du?",
  description:
    "Ein handgemaltes Kinderbuch, das Kindern hilft, ihre Gefühle zu verstehen. 3 Geschichten über Traurigkeit, Wut und Freude.",
  image: `${SITE_URL}/images/products/book-front.webp`,
  brand: { "@type": "Brand", name: "Gefühlsförderung" },
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/buch`,
    priceCurrency: "EUR",
    price: "24.99",
    availability: "https://schema.org/InStock",
  },
  audience: { "@type": "PeopleAudience", suggestedAge: "3-8" },
};

export default function BuchLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buchJsonLd) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-lavender/10 to-cream py-16 md:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex gap-2 mb-6">
                <Badge variant="handmade">100% handgemalt</Badge>
                <Badge variant="expert">Von Kindheitspädagogin</Badge>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-charcoal font-bold leading-tight">
                Hilf deinem Kind, seine{" "}
                <span className="text-lavender-dark">Gefühle zu verstehen</span>
              </h1>
              <p className="mt-6 text-lg text-charcoal-light leading-relaxed max-w-lg">
                Das liebevoll handgemalte Kinderbuch, das Kindern behutsam die
                Welt der Emotionen eröffnet — durch vertraute Geschichten und
                gezielte Reflexionsfragen.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button href="/shop/was-fuehlst-du" variant="secondary" size="lg">
                  Jetzt bestellen — 17,90 &euro;
                </Button>
                <Button href="#kapitel" variant="outline" size="lg">
                  Mehr erfahren
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-4 text-sm text-charcoal-lighter">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold text-gold"
                    />
                  ))}
                </div>
                <span>5.0 von 5 Sternen</span>
                <span className="text-charcoal-lighter">|</span>
                <span className="flex items-center gap-1">
                  <Leaf className="h-3.5 w-3.5" />
                  FSC-Papier
                </span>
              </div>
            </div>

            {/* Book Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-lavender/15 to-rose/10 border border-lavender/10 overflow-hidden relative">
                <Image
                  src="/images/products/book-front.webp"
                  alt="Was fühlst du? — Kinderbuch zur Gefühlsförderung"
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Pain */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lavender-dark font-semibold text-sm uppercase tracking-wider mb-3">
            Die Herausforderung
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold">
            Viele Kinder können ihre Gefühle nicht einordnen
          </h2>
          <p className="mt-6 text-lg text-charcoal-light leading-relaxed">
            Viele psychische Probleme resultieren daraus, dass man sich mit
            seinen eigenen Gefühlen nicht ausreichend auseinandergesetzt hat.
            Kinder brauchen eine Brücke, um über komplexe Themen wie Wut,
            Traurigkeit und Freude sprechen zu können — und genau das bietet
            dieses Buch.
          </p>
        </div>
      </section>

      {/* Book Spread Image */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-lavender/10 shadow-lg">
            <Image
              src="/images/landing/book-spread-open.png"
              alt="Was fühlst du? — Blick ins Buch"
              width={1500}
              height={784}
              className="w-full h-auto"
              sizes="(max-width: 1200px) 100vw, 1100px"
            />
          </div>
          <p className="mt-4 text-center text-sm text-charcoal-lighter">
            Jede Seite wurde von Ewelina Gawlik persönlich mit der Hand gemalt
            und geschrieben.
          </p>
        </div>
      </section>

      {/* Chapters */}
      <section id="kapitel" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-lavender-dark font-semibold text-sm uppercase tracking-wider mb-3">
              Über das Buch
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold">
              3 Geschichten, 3 Gefühle
            </h2>
            <p className="mt-4 text-charcoal-light max-w-2xl mx-auto">
              Julian und sein Teddybär Tobi begleiten dein Kind durch
              alltägliche Situationen und helfen, Gefühle zu verstehen und
              einzuordnen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {chapters.map((chapter) => (
              <div
                key={chapter.number}
                className={`bg-gradient-to-b ${chapter.color} rounded-3xl p-8 border ${chapter.borderColor}`}
              >
                <div
                  className={`w-12 h-12 rounded-full bg-white/60 flex items-center justify-center mb-4`}
                >
                  <span
                    className={`text-lg font-bold ${chapter.iconColor}`}
                  >
                    {chapter.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-charcoal">
                  {chapter.emotion}
                </h3>
                <p className="mt-3 text-charcoal-light leading-relaxed text-sm">
                  {chapter.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-lavender-dark font-semibold text-sm uppercase tracking-wider mb-3">
              Das lernt dein Kind
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold">
              Was dein Kind aus diesem Buch mitnimmt
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-lavender/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-lavender-dark" />
                  </div>
                  <h3 className="font-bold text-charcoal">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-charcoal-light">
                    {benefit.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-lavender/10 relative">
              <Image
                src="/images/landing/book-illustration.png"
                alt="Gefühlsförderung — Illustration"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-lavender-dark font-semibold text-sm uppercase tracking-wider mb-3">
                Für wen ist das Buch?
              </p>
              <h2 className="font-heading text-3xl text-charcoal font-bold">
                Für Eltern, Kitas &amp; Grundschulen
              </h2>
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="font-bold text-charcoal">Für Eltern</h3>
                  <p className="mt-1 text-charcoal-light leading-relaxed">
                    Dieses Buch hilft dir, durch komplizierte Gefühle und
                    Emotionen auf sanfte Weise dein Kind zu unterstützen und es
                    zu einem offenen Gespräch einzuladen.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal">Für Pädagogen</h3>
                  <p className="mt-1 text-charcoal-light leading-relaxed">
                    Die lebensnahen Geschichten eignen sich als hervorragendes
                    Mittel, um die Aufmerksamkeit des Kindes zu gewinnen und ein
                    Gespräch über seine eigenen Gefühle anzustoßen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-lavender-dark font-semibold text-sm uppercase tracking-wider mb-3">
              Bewertungen
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold">
              Was Leser sagen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="bg-white rounded-3xl p-8 border border-lavender/10 shadow-sm"
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

      {/* Product Specs + CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-lavender/5 to-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-lavender/10 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-lavender/10 to-rose/10 overflow-hidden relative">
                <Image
                  src="/images/products/book-front-back.webp"
                  alt="Was fühlst du? — Vorder- und Rückseite"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div>
                <Badge variant="sale" className="mb-4">
                  -22% Angebot
                </Badge>
                <h2 className="font-heading text-2xl text-charcoal font-bold">
                  Was fühlst du?
                </h2>
                <p className="mt-1 text-charcoal-light italic">
                  Liebevolle und vertraute Geschichten für Kinder
                </p>

                <div className="mt-6 space-y-2">
                  {[
                    "Hardcover, FSC-zertifiziertes Papier",
                    "3 Geschichten: Traurigkeit, Wut & Freude",
                    "Gezielte Reflexionsfragen",
                    "100% handgemalt & handgeschrieben",
                    "Empfohlenes Alter: 6–10 Jahre",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-sage shrink-0" />
                      <span className="text-sm text-charcoal">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-sage-dark">
                    17,90 &euro;
                  </span>
                  <span className="text-lg text-charcoal-lighter line-through">
                    22,90 &euro;
                  </span>
                </div>

                <Button
                  href="/shop/was-fuehlst-du"
                  variant="secondary"
                  size="lg"
                  className="mt-6 w-full"
                >
                  Jetzt bestellen
                </Button>
                <p className="mt-2 text-xs text-charcoal-lighter text-center">
                  Kein MwSt-Ausweis, Kleinunternehmer nach &sect;19 UStG. zzgl.
                  Versandkosten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Upsell */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-heading text-2xl text-charcoal font-bold">
            Noch mehr Gefühlsförderung?
          </h3>
          <p className="mt-2 text-charcoal-light">
            Hol dir das Gefühlskompass Bundle: Kinderbuch + beide
            Memory-Spiele + Leitfaden &mdash;{" "}
            <strong className="text-sage-dark">spare über 37%</strong>
          </p>
          <Button
            href="/shop/gefuehlskompass-bundle"
            variant="primary"
            className="mt-6"
          >
            Zum Bundle (45,99 &euro;)
          </Button>
        </div>
      </section>
    </>
  );
}
