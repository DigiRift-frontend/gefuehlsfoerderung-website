import { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";
import { NewsletterCompact } from "@/components/sections/NewsletterCompact";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tipps und Wissen zur Gefühlsförderung, emotionalen Entwicklung und Erziehung. Von Kindheitspädagogin Ewelina Gawlik.",
  keywords: [
    "Erziehungstipps",
    "emotionale Entwicklung Kind",
    "Gefühle Kinder",
    "Kindheitspädagogik Blog",
    "Gefühlsförderung",
  ],
  alternates: {
    canonical: "https://gefühlsförderung.de/blog",
  },
  openGraph: {
    title: "Blog | Gefühlsförderung",
    description:
      "Tipps und Wissen zur Gefühlsförderung, emotionalen Entwicklung und Erziehung. Von Kindheitspädagogin Ewelina Gawlik.",
    url: "https://gefühlsförderung.de/blog",
    type: "website",
    images: [
      {
        url: "https://gefühlsförderung.de/images/author/ewelina-ueber-mich.jpeg",
        width: 800,
        height: 1067,
        alt: "Gefühlsförderung Blog – Erziehungstipps von Ewelina Gawlik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Gefühlsförderung",
    description:
      "Tipps und Wissen zur Gefühlsförderung und Erziehung. Von Kindheitspädagogin Ewelina Gawlik.",
    images: ["https://gefühlsförderung.de/images/author/ewelina-ueber-mich.jpeg"],
  },
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-rose/10 to-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl sm:text-6xl text-charcoal font-bold animate-fade-in-up">
            Blog
          </h1>
          <p className="mt-4 text-lg text-charcoal-light max-w-2xl mx-auto animate-fade-in-up stagger-1">
            Wissen, Tipps und Anregungen zur Förderung der emotionalen
            Entwicklung deines Kindes.
          </p>
        </div>
      </section>

      <BlogList />

      <NewsletterCompact />
    </>
  );
}
