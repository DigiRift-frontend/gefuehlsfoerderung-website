import type { Metadata } from "next";
import { UeberEwelinaContent } from "./UeberEwelinaContent";

const SITE_URL = "https://gefühlsförderung.de";

export const metadata: Metadata = {
  title: "Über Ewelina Gawlik – Kindheitspädagogin & Autorin",
  description:
    "Lerne Ewelina Gawlik kennen: Kindheitspädagogin B.A., Mutter von zwei Kindern und Gründerin von Gefühlsförderung. Ihre Mission: Kindern helfen, Gefühle zu verstehen.",
  keywords: [
    "Ewelina Gawlik",
    "Kindheitspädagogin",
    "Gefühlsförderung",
    "Autorin Kinderbuch",
  ],
  alternates: {
    canonical: `${SITE_URL}/ueber-ewelina`,
  },
  openGraph: {
    type: "profile",
    title: "Über Ewelina Gawlik – Kindheitspädagogin & Autorin",
    description:
      "Kindheitspädagogin B.A., Mutter und Gründerin von Gefühlsförderung. Ihre Mission: Kindern helfen, Gefühle zu verstehen.",
    url: `${SITE_URL}/ueber-ewelina`,
    images: [
      {
        url: `${SITE_URL}/images/author/ewelina-ueber-mich.jpeg`,
        width: 800,
        height: 1067,
        alt: "Ewelina Gawlik - Kindheitspädagogin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über Ewelina Gawlik – Kindheitspädagogin & Autorin",
    description:
      "Kindheitspädagogin B.A., Mutter und Gründerin von Gefühlsförderung.",
    images: [`${SITE_URL}/images/author/ewelina-ueber-mich.jpeg`],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ewelina Gawlik",
  jobTitle: "Kindheitspädagogin B.A.",
  url: `${SITE_URL}/ueber-ewelina`,
  image: `${SITE_URL}/images/author/ewelina-ueber-mich.jpeg`,
  description:
    "Kindheitspädagogin, Mutter von zwei Kindern, Autorin und Illustratorin. Gründerin von Gefühlsförderung.",
  worksFor: {
    "@type": "Organization",
    name: "Gefühlsförderung",
    url: SITE_URL,
  },
};

export default function UeberEwelinaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <UeberEwelinaContent />
    </>
  );
}
