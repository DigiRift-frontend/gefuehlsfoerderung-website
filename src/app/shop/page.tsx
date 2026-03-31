import { Metadata } from "next";
import { ShopContent } from "@/components/shop/ShopContent";
import { NewsletterCompact } from "@/components/sections/NewsletterCompact";
import { QuizBanner } from "@/components/sections/QuizBanner";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Handgemalte Kinderbücher, Emotions-Memory-Spiele und E-Book-Leitfäden zur Gefühlsförderung. Von Kindheitspädagogin Ewelina Gawlik.",
  keywords: [
    "Kinderbuch Gefühle kaufen",
    "Emotions-Memory Kinder",
    "Gefühlsförderung Material",
    "Leitfaden emotionale Entwicklung",
  ],
  alternates: {
    canonical: "https://gefühlsförderung.de/shop",
  },
  openGraph: {
    title: "Shop | Gefühlsförderung",
    description:
      "Handgemalte Kinderbücher, Emotions-Memory-Spiele und Leitfäden zur Gefühlsförderung. Von Kindheitspädagogin entwickelt.",
    url: "https://gefühlsförderung.de/shop",
    type: "website",
    images: [
      {
        url: "https://gefühlsförderung.de/images/products/book-front.webp",
        width: 1200,
        height: 675,
        alt: "Gefühlsförderung Shop – Kinderbücher und Materialien",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | Gefühlsförderung",
    description:
      "Handgemalte Kinderbücher, Emotions-Memory-Spiele und Leitfäden zur Gefühlsförderung.",
    images: ["https://gefühlsförderung.de/images/products/book-front.webp"],
  },
};

export default function ShopPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-lavender/10 to-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl sm:text-6xl text-charcoal font-bold animate-fade-in-up">
            Shop
          </h1>
          <p className="mt-4 text-lg text-charcoal-light max-w-2xl mx-auto animate-fade-in-up stagger-1">
            Werkzeuge für die Gefühlsförderung deines Kindes &mdash;
            von einer Kindheitspädagogin entwickelt.
          </p>
        </div>
      </section>

      <ShopContent />

      <QuizBanner variant="shop" />

      <NewsletterCompact variant="shop" />
    </>
  );
}
