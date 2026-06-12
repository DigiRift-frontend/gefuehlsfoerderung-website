import createMDX from "@next/mdx";

/** Blogposts der alten WordPress-Seite lagen auf Root-Ebene → /blog/<slug> */
const oldBlogSlugs = [
  "wieso-will-mein-kind-nicht-mit-mir-reden",
  "wie-du-selbststaendigkeit-bei-kindern-foerdern-kannst",
  "12-schluesselfragen-zur-staerkung-der-bindung-mit-deinem-kind",
  "gefuehle-von-kindern-ernst-nehmen-und-verstehen",
  "so-erklaerst-du-ihn-deinem-kind",
  "wieso-du-ueber-deine-gefuehle-mit-deinem-kind-sprechen-solltest",
  "wie-kann-ich-die-emotionale-entwicklung-meines-kindes-unterstutzen",
  "wie-foerdert-man-empathie-bei-kindern",
  "wie-du-kinder-ohne-strafen-erziehst",
  "wie-du-konflikte-gewaltfrei-loesen-kannst",
  "starke-gefuehle-bei-kindern-so-hilfst-du-deinem-kind-dabei",
  "staerke-die-emotionale-intelligenz-deines-kindes",
  "achtsamkeit-bei-kindern-so-kannst-du-dein-kind-dabei-unterstuetzen",
  "wie-du-deinem-kind-toleranz-vermittelst",
  "wie-du-auf-wutanfaelle-deiner-kinder-reagierst",
  "wie-du-lernst-dein-hochsensibles-kind-zu-verstehen",
  "wie-du-am-besten-das-selbstbewusstsein-deines-kindes-unterstuetzt",
  "emotionsregulation-bei-kindern",
  "erziehung-braucht-grenzen",
];

/** Produkte der alten WordPress-Seite: /produkt/<alt> → /shop/<neu> */
const oldProductSlugs = [
  ["was-fuehlst-du", "was-fuehlst-du"],
  ["emotions-memory-teil-1", "emotions-memory-teil-1"],
  ["emotions-memory-teil-2", "emotions-memory-teil-2"],
  [
    "leitfaden-kinderwut-verstehen-und-meistern-pdf",
    "leitfaden-kinderwut-verstehen-und-meistern",
  ],
  [
    "leitfaden-zur-emotionalen-entwicklung",
    "leitfaden-zur-emotionalen-entwicklung",
  ],
  [
    "leitfaden-hilfe-mein-kind-redet-nicht-mehr-mit-mir-pdf",
    "leitfaden-hilfe-mein-kind-redet-nicht-mehr-mit-mir",
  ],
  [
    "nur-noch-kurze-zeit-gefuehlskompass-bundle-zum-einmaligen-sonderpreis",
    "gefuehlskompass-bundle",
  ],
  [
    "emotionen-entdecken-bundle-buch-leitfaden",
    "emotionen-entdecken-bundle",
  ],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      // Blogposts: Root-Ebene → /blog/<slug>
      ...oldBlogSlugs.map((slug) => ({
        source: `/${slug}`,
        destination: `/blog/${slug}`,
        permanent: true,
      })),

      // Produkte: /produkt/<alt> → /shop/<neu>
      ...oldProductSlugs.map(([oldSlug, newSlug]) => ({
        source: `/produkt/${oldSlug}`,
        destination: `/shop/${newSlug}`,
        permanent: true,
      })),
      // Catch-all für alle übrigen alten Produkt-URLs (muss NACH den
      // spezifischen Einträgen stehen)
      {
        source: "/produkt/:slug",
        destination: "/shop",
        permanent: true,
      },

      // Seiten
      { source: "/ueber-mich", destination: "/ueber-ewelina", permanent: true },
      { source: "/wishlist", destination: "/shop", permanent: true },
      { source: "/anmeldung", destination: "/", permanent: true },
      { source: "/newsletter", destination: "/", permanent: true },
      {
        source: "/danke-fuer-deine-anmeldung",
        destination: "/newsletter/bestaetigt",
        permanent: true,
      },
      {
        source: "/danke-fuer-deine-anmeldung-zum-newsletter",
        destination: "/newsletter/bestaetigt",
        permanent: true,
      },
      {
        source: "/fast-geschafft-newsletter",
        destination: "/newsletter/bestaetigt",
        permanent: true,
      },
      {
        source: "/fast-geschafft-ebook",
        destination: "/newsletter/bestaetigt",
        permanent: true,
      },
      {
        source: "/bezahlmoeglichkeiten",
        destination: "/zahlungsarten",
        permanent: true,
      },
      { source: "/versandarten", destination: "/versand", permanent: true },
      {
        source: "/widerrufsbelehrung",
        destination: "/agb#widerruf",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
