import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

const SITE_URL = "https://gefühlsförderung.de";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    title: "Gefühlsförderung – Hilf deinem Kind, seine Gefühle zu verstehen",
    description:
      "Kindheitspädagogin Ewelina Gawlik hilft Eltern und Kindern beim Umgang mit Emotionen. Handgemalte Kinderbücher, Memory-Spiele und Leitfäden.",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/images/products/book-front.webp`,
        width: 1200,
        height: 675,
        alt: "Gefühlsförderung – Kinderbücher und Materialien zur emotionalen Entwicklung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gefühlsförderung – Hilf deinem Kind, seine Gefühle zu verstehen",
    description:
      "Handgemalte Kinderbücher, Memory-Spiele und Leitfäden zur Gefühlsförderung.",
    images: [`${SITE_URL}/images/products/book-front.webp`],
  },
};
import { Problem } from "@/components/sections/Problem";
import { Products } from "@/components/sections/Products";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { Newsletter } from "@/components/sections/Newsletter";
import { AppTeaser } from "@/components/sections/AppTeaser";
import { QuizBanner } from "@/components/sections/QuizBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <QuizBanner variant="homepage" />
      <Products />
      <Testimonials />
      <BlogTeaser />
      <Newsletter />
      <AppTeaser />
    </>
  );
}
