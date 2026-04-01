import type { Metadata, Viewport } from "next";
import { Caveat, Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { NewsletterPopup } from "@/components/layout/NewsletterPopup";
import { Providers } from "@/components/providers/Providers";
import { CartDrawer } from "@/components/shop/CartDrawer";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gefühlsförderung.de"),
  title: {
    default: "Gefühlsförderung - Hilf deinem Kind, seine Gefühle zu verstehen",
    template: "%s | Gefühlsförderung",
  },
  description:
    "Kindheitspädagogin Ewelina Gawlik hilft Eltern und Kindern beim Umgang mit Emotionen. Handgemalte Kinderbücher, Memory-Spiele und Leitfäden zur Gefühlsförderung.",
  keywords: [
    "Gefühle Kinder",
    "Emotionen Kind",
    "Kinderbuch Gefühle",
    "Gefühlsförderung",
    "emotionale Entwicklung",
    "Wut bei Kindern",
    "Kindheitspädagogin",
  ],
  authors: [{ name: "Ewelina Gawlik" }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Gefühlsförderung",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gefühlsförderung",
    url: "https://gefühlsförderung.de",
    description:
      "Hilf deinem Kind, seine Gefühle zu verstehen. Handgemalte Kinderbücher, Memory-Spiele und Leitfäden zur Gefühlsförderung.",
    founder: {
      "@type": "Person",
      name: "Ewelina Gawlik",
      url: "https://gefühlsförderung.de/ueber-ewelina",
      jobTitle: "Kindheitspädagogin B.A.",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gefühlsförderung",
    url: "https://gefühlsförderung.de",
    inLanguage: "de",
    publisher: {
      "@type": "Organization",
      name: "Gefühlsförderung",
    },
  };

  return (
    <html lang="de" className={`${caveat.variable} ${nunito.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <CookieBanner />
          <NewsletterPopup />
        </Providers>
      </body>
    </html>
  );
}
