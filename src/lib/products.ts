export type Product = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: "buch" | "memory" | "ebook" | "bundle";
  type: "physical" | "digital" | "mixed";
  images: string[];
  badge?: string;
  ageRange?: string;
  features: string[];
  specs?: { label: string; value: string }[];
  emotions?: string[];
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "was-fuehlst-du",
    slug: "was-fuehlst-du",
    title: 'Was fühlst du?',
    subtitle: "Liebevolle und vertraute Geschichten für Kinder",
    description:
      "Ein wundervoll illustriertes Kinderbuch, das deinem Kind hilft, seine Gefühle zu benennen und zu verstehen.",
    longDescription:
      "Dieses liebevoll handgemalte Kinderbuch führt Kinder behutsam in die Welt der Emotionen ein. In drei Geschichten begleitet der Junge Julian zusammen mit seinem Teddybären Tobi alltägliche Situationen, in denen Traurigkeit, Wut und Freude eine Rolle spielen. Gezielte Reflexionsfragen nach jeder Geschichte helfen deinem Kind, die Gefühle einzuordnen und über eigene Erlebnisse zu sprechen.",
    price: 17.9,
    originalPrice: 22.9,
    category: "buch",
    type: "physical",
    images: [
      "/images/products/book-front.webp",
      "/images/products/book-back.webp",
      "/images/products/book-front-back.webp",
      "/images/products/book-spread.png",
    ],
    badge: "Bestseller",
    ageRange: "3-8 Jahre",
    features: [
      "100% handgemalte Illustrationen",
      "Gezielte Reflexionsfragen zu jeder Geschichte",
      "3 Kapitel: Traurigkeit, Wut & Freude",
      "Gedruckt auf umweltfreundlichem FSC-Papier",
      "Von Kindheitspädagogin entwickelt",
    ],
    specs: [
      { label: "Format", value: "Hardcover" },
      { label: "Material", value: "FSC-zertifiziertes Papier" },
      { label: "Kapitel", value: "3 Geschichten" },
      { label: "Geeignet für", value: "Eltern, Kitas & Grundschulen" },
    ],
    inStock: true,
  },
  {
    id: "emotions-memory-1",
    slug: "emotions-memory-teil-1",
    title: "Emotions-Memory Teil 1",
    subtitle: "Entdeckungsreise der Emotionen",
    description:
      "Spielerisch Gefühle erkennen und zuordnen. 24 handgemalte Karten mit liebevollen Illustrationen.",
    longDescription:
      "Das Emotions-Memory \"Entdeckungsreise der Emotionen\" ist ein einfühlsames Lernspiel mit 24 handgemalten Karten (12 Paare). Dein Kind lernt spielerisch, verschiedene Gefühle zu erkennen und zu benennen. Ideal für Familienabende und als pädagogisches Werkzeug in Kitas und Therapie.",
    price: 14.99,
    originalPrice: 24.99,
    category: "memory",
    type: "physical",
    images: [
      "/images/products/memory-1.jpg",
      "/images/products/memory-1-cover.webp",
      "/images/products/memory-1-all.webp",
      "/images/products/memory-1-excerpt.webp",
      "/images/products/memory-back.webp",
    ],
    badge: "Limitierter Preis",
    ageRange: "4-10 Jahre",
    features: [
      "24 handgemalte Emotions-Karten (12 Paare)",
      "Spielerisches Lernen",
      "Fördert Empathie und Emotionserkennung",
      "Ideal für Familien, Kitas und Therapie",
      "Kombinierbar mit Teil 2 zu 48 Karten",
    ],
    specs: [
      { label: "Umfang", value: "24 Karten (12 Paare)" },
      { label: "Geeignet für", value: "Familien, Kitas & Therapie" },
    ],
    emotions: [
      "Ruhig", "Dankbar", "Beschämt", "Unkonzentriert", "Neugierig", "Besorgt",
      "Mutig", "Traurig", "Erschöpft", "Gelangweilt", "Glücklich", "Wütend",
    ],
    inStock: true,
  },
  {
    id: "emotions-memory-2",
    slug: "emotions-memory-teil-2",
    title: "Emotions-Memory Teil 2",
    subtitle: "Kaleidoskop der Gefühle",
    description:
      "Die Erweiterung mit 24 neuen Karten und weiteren Gefühlen. Ergänzt perfekt Teil 1.",
    longDescription:
      "Das Emotions-Memory \"Kaleidoskop der Gefühle\" erweitert das Set um 24 neue handgemalte Karten (12 Paare) mit weiteren Emotionen und Alltagssituationen. Zusammen mit Teil 1 entsteht ein umfassendes Set von 48 Karten zur Gefühlsförderung.",
    price: 19.99,
    originalPrice: 24.99,
    category: "memory",
    type: "physical",
    images: [
      "/images/products/memory-2.jpg",
      "/images/products/memory-2-cover.webp",
      "/images/products/memory-2-all.webp",
      "/images/products/memory-2-excerpt.webp",
      "/images/products/memory-back.webp",
    ],
    ageRange: "4-10 Jahre",
    features: [
      "24 handgemalte Emotions-Karten (12 Paare)",
      "Perfekte Ergänzung zu Teil 1",
      "Handgemalte Illustrationen",
      "Erweitert das emotionale Vokabular",
    ],
    specs: [
      { label: "Umfang", value: "24 Karten (12 Paare)" },
      { label: "Geeignet für", value: "Familien, Kitas & Therapie" },
    ],
    emotions: [
      "Sauer", "Verwirrt", "Durcheinander", "Neidisch", "Aufgeregt", "Überrascht",
      "Stolz", "Unsicher", "Gleichgültig", "Ängstlich", "Verspielt", "Enttäuscht",
    ],
    inStock: true,
  },
  {
    id: "gefuehlskompass-bundle",
    slug: "gefuehlskompass-bundle",
    title: "Gefühlskompass Bundle",
    description:
      "Das komplette Set: Kinderbuch + beide Memory-Spiele + Leitfaden. Alles zum Sparpreis.",
    longDescription:
      "Das ultimative Bundle für die Gefühlsförderung deines Kindes. Enthält das Kinderbuch 'Was fühlst du?', beide Emotions-Memory-Spiele und den Leitfaden zur emotionalen Entwicklung. Spare über 37% gegenüber dem Einzelkauf.",
    price: 45.99,
    originalPrice: 72.88,
    category: "bundle",
    type: "mixed",
    images: [
      "/images/products/kompass-bundle-cover.jpg",
      "/images/products/kompass-bundle-limited.jpg",
      "/images/products/kompass-book-front.jpg",
      "/images/products/kompass-book-front-back.jpg",
      "/images/products/kompass-teil1-all.webp",
      "/images/products/kompass-teil2-all.webp",
      "/images/products/kompass-memory-banner.jpg",
    ],
    badge: "Spare 37%",
    features: [
      "Kinderbuch 'Was fühlst du?'",
      "Emotions-Memory Teil 1 & 2",
      "Leitfaden zur emotionalen Entwicklung (E-Book)",
      "Über 37% Ersparnis",
      "Perfektes Geschenk",
    ],
    inStock: true,
  },
  {
    id: "emotionen-entdecken-bundle",
    slug: "emotionen-entdecken-bundle",
    title: '"Emotionen Entdecken" Bundle: Buch & Leitfaden',
    description:
      "Das Kinderbuch kombiniert mit dem E-Book-Leitfaden zur emotionalen Entwicklung.",
    longDescription:
      "Fundiertes Wissen und spielerisches Lernen vereint. Das Bundle enthält das Kinderbuch 'Was fühlst du?' und den digitalen Leitfaden zur emotionalen Entwicklung.",
    price: 24.99,
    originalPrice: 33.89,
    category: "bundle",
    type: "mixed",
    images: [
      "/images/products/bundle-emotionen-entdecken.jpg",
      "/images/products/bundle-gefuehle-detail.jpg",
      "/images/products/bundle-gefuehle-5.jpg",
      "/images/products/bundle-buch-offen.png",
      "/images/products/bundle-gefuehle-17.jpg",
      "/images/products/bundle-gefuehle-2.jpg",
      "/images/products/bundle-gefuehle-1.jpg",
    ],
    badge: "Neu",
    features: [
      "Kinderbuch 'Was fühlst du?'",
      "Leitfaden zur emotionalen Entwicklung (E-Book)",
      "Kombiangebot zum Sparpreis",
    ],
    inStock: true,
  },
  {
    id: "leitfaden-kind-redet-nicht",
    slug: "leitfaden-hilfe-mein-kind-redet-nicht-mehr-mit-mir",
    title: "Leitfaden: Hilfe, mein Kind redet nicht mehr mit mir",
    description:
      "Praxisnaher E-Book-Leitfaden wenn dein Kind sich verschließt und nicht mehr kommunizieren möchte.",
    longDescription:
      "Dieser Leitfaden hilft dir zu verstehen, warum dein Kind sich zurückzieht und gibt dir konkrete Werkzeuge an die Hand, um die Kommunikation wieder herzustellen.",
    price: 14.99,
    category: "ebook",
    type: "digital",
    images: [
      "/images/products/leitfaden-kind-redet-nicht.webp",
      "/images/products/leitfaden-kind-redet-nicht-cover.webp",
      "/images/products/leitfaden-kind-redet-nicht-produktbild.webp",
      "/images/products/leitfaden-kind-redet-nicht-warum.webp",
      "/images/products/leitfaden-kind-redet-nicht-2.webp",
      "/images/products/leitfaden-kind-redet-nicht-3.webp",
      "/images/products/leitfaden-kind-redet-nicht-12.webp",
      "/images/products/leitfaden-kind-redet-nicht-15.webp",
      "/images/products/leitfaden-kind-redet-nicht-20.webp",
    ],
    features: [
      "Sofort als PDF verfügbar",
      "Praxisnahe Tipps und Übungen",
      "Wissenschaftlich fundiert",
      "Von Kindheitspädagogin entwickelt",
    ],
    inStock: true,
  },
  {
    id: "leitfaden-kinderwut",
    slug: "leitfaden-kinderwut-verstehen-und-meistern",
    title: "Leitfaden: Kinderwut Verstehen und Meistern",
    description:
      "Verstehe die Wut deines Kindes und lerne, konstruktiv damit umzugehen.",
    longDescription:
      "Wut ist ein normales und wichtiges Gefühl. Dieser Leitfaden hilft dir, die Wut deines Kindes zu verstehen und konstruktive Wege zu finden, damit umzugehen.",
    price: 14.99,
    category: "ebook",
    type: "digital",
    images: [
      "/images/products/leitfaden-kinderwut.webp",
      "/images/products/leitfaden-kinderwut-cover.jpg",
      "/images/products/leitfaden-kinderwut-1.jpg",
      "/images/products/leitfaden-kinderwut-2.webp",
      "/images/products/leitfaden-kinderwut-14.jpg",
      "/images/products/leitfaden-kinderwut-26.jpg",
    ],
    features: [
      "Sofort als PDF verfügbar",
      "Wut verstehen und begleiten",
      "Konkrete Handlungsstrategien",
      "Wissenschaftlich fundiert",
    ],
    inStock: true,
  },
  {
    id: "leitfaden-emotionale-entwicklung",
    slug: "leitfaden-zur-emotionalen-entwicklung",
    title: "Leitfaden zur emotionalen Entwicklung",
    description:
      "Umfassender E-Book-Leitfaden über die emotionale Entwicklung von Kindern.",
    longDescription:
      "Ein informatives und nützliches Werkzeug, das dir eine ganz neue Perspektive auf die Gefühlswelt deines Kindes gibt. Verstehe die emotionale Entwicklung und wie du sie optimal fördern kannst.",
    price: 10.99,
    category: "ebook",
    type: "digital",
    images: [
      "/images/products/leitfaden-emotionale-entwicklung.jpg",
      "/images/products/leitfaden-emotionale-cover.webp",
      "/images/products/leitfaden-emotionale-mockup.webp",
      "/images/products/bundle-gefuehle-1.jpg",
      "/images/products/bundle-gefuehle-2.jpg",
      "/images/products/bundle-gefuehle-5.jpg",
      "/images/products/bundle-gefuehle-17.jpg",
    ],
    features: [
      "Sofort als PDF verfügbar",
      "Umfassendes Wissen zur emotionalen Entwicklung",
      "Altersgerechte Förderungstipps",
      "Wissenschaftlich fundiert",
    ],
    inStock: true,
  },
];

export const categories = [
  { id: "all", name: "Alle Produkte" },
  { id: "buch", name: "Bücher" },
  { id: "memory", name: "Memory-Spiele" },
  { id: "ebook", name: "E-Books" },
  { id: "bundle", name: "Bundles" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}
