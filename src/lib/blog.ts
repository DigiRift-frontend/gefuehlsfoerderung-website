export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  modifiedDate?: string;
  readTime: string;
  categories: string[];
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "12-schluesselfragen-zur-staerkung-der-bindung-mit-deinem-kind",
    title: "12 Schlüsselfragen zur Stärkung der Bindung mit deinem Kind",
    excerpt:
      "Durch sorgfältig ausgewählte Fragen, die echtes Verständnis und Interesse zeigen, kannst du eine Brücke zu deinem Kind bauen.",
    date: "2024-03-21",
    readTime: "8 Min.",
    categories: ["Eltern", "Emotionale Intelligenz", "Erziehung", "Gefühle"],
    image:
      "/images/blog/12-schluesselfragen-zur-staerkung-der-bindung-mit-deinem-kind/featured.jpg",
  },
  {
    slug: "emotionsregulation-bei-kindern",
    title: "Emotionsregulation bei Kindern",
    excerpt:
      "In unserer bunten und oft herausfordernden Welt ist es so wichtig, dass unsere Kinder lernen, ihre Gefühle zu verstehen und zu regulieren.",
    date: "2024-03-12",
    readTime: "9 Min.",
    categories: [
      "Beziehung",
      "Eltern",
      "Emotionale Intelligenz",
      "Erziehung",
      "Gefühle",
      "Gefühlswelt",
    ],
    image: "/images/blog/emotionsregulation-bei-kindern/featured.jpg",
  },
  {
    slug: "wie-du-selbststaendigkeit-bei-kindern-foerdern-kannst",
    title: "Wie du Selbstständigkeit bei Kindern fördern kannst",
    excerpt:
      "Selbstständigkeit bei Kindern fördern: So begleitest du dein Kind Schritt für Schritt dabei, eigenständig und selbstbewusst zu werden.",
    date: "2023-07-07",
    readTime: "6 Min.",
    categories: [
      "Eltern",
      "Familie",
      "Gefühle",
      "Selbstbewusstsein",
      "Selbstständigkeit",
      "Selbstwertgefühl",
    ],
    image:
      "/images/blog/wie-du-selbststaendigkeit-bei-kindern-foerdern-kannst/featured.webp",
  },
  {
    slug: "wieso-will-mein-kind-nicht-mit-mir-reden",
    title: "Wieso will mein Kind nicht mit mir reden?",
    excerpt:
      "Dein Kind redet nicht mit dir? Erfahre die häufigsten Gründe und wie du eine offene, vertrauensvolle Kommunikation aufbauen kannst.",
    date: "2023-05-08",
    readTime: "7 Min.",
    categories: [
      "Beziehung",
      "Erziehung",
      "Gefühlswelt",
      "Selbstwertgefühl",
    ],
    image:
      "/images/blog/wieso-will-mein-kind-nicht-mit-mir-reden/featured.webp",
  },
  {
    slug: "wie-du-am-besten-das-selbstbewusstsein-deines-kindes-unterstuetzt",
    title: "Wie du am besten das Selbstbewusstsein deines Kindes unterstützt",
    excerpt:
      "Erfahre, wie du das Selbstbewusstsein deines Kindes stärkst — mit praktischen Tipps für mehr Selbstsicherheit und ein starkes Selbstwertgefühl.",
    date: "2023-04-07",
    readTime: "6 Min.",
    categories: ["Eltern", "Erziehung", "Selbstbewusstsein"],
    image:
      "/images/blog/wie-du-am-besten-das-selbstbewusstsein-deines-kindes-unterstuetzt/featured.webp",
  },
  {
    slug: "wie-du-lernst-dein-hochsensibles-kind-zu-verstehen",
    title: "Wie du lernst, dein hochsensibles Kind zu verstehen",
    excerpt:
      "Ist dein Kind hochsensibel? Erfahre, woran du Hochsensibilität erkennst und wie du dein feinfühliges Kind liebevoll unterstützen kannst.",
    date: "2023-03-08",
    readTime: "5 Min.",
    categories: [
      "Eltern",
      "Empathie",
      "Erziehung",
      "Gefühle",
      "Hochsensibilität",
    ],
    image:
      "/images/blog/wie-du-lernst-dein-hochsensibles-kind-zu-verstehen/featured.webp",
  },
  {
    slug: "erziehung-braucht-grenzen",
    title: "Erziehung braucht Grenzen",
    excerpt:
      "Warum Grenzen in der Erziehung wichtig sind und wie du sie liebevoll, aber konsequent setzt — für Sicherheit und Orientierung deines Kindes.",
    date: "2023-02-22",
    readTime: "6 Min.",
    categories: ["Beziehung", "Erziehung", "Gefühle", "Grenzen"],
    image: "/images/blog/erziehung-braucht-grenzen/featured.webp",
  },
  {
    slug: "wie-du-auf-wutanfaelle-deiner-kinder-reagierst",
    title: "Wie du auf Wutanfälle deiner Kinder reagierst",
    excerpt:
      "Wutanfälle bei Kindern verstehen und richtig reagieren: 9 hilfreiche Tipps für Eltern, um Wutausbrüche gelassen und liebevoll zu begleiten.",
    date: "2023-01-25",
    readTime: "7 Min.",
    categories: ["Erziehung", "Gefühle", "Wutanfälle"],
    image:
      "/images/blog/wie-du-auf-wutanfaelle-deiner-kinder-reagierst/featured.webp",
  },
  {
    slug: "wie-du-deinem-kind-toleranz-vermittelst",
    title: "Wie du deinem Kind Toleranz vermittelst",
    excerpt:
      "Toleranz und Akzeptanz sind tragende Pfeiler der Gesellschaft und Basis für den respektvollen Umgang mit anderen Menschen.",
    date: "2023-01-11",
    readTime: "5 Min.",
    categories: ["Akzeptanz", "Eltern", "Erziehung", "Gefühle", "Toleranz"],
    image:
      "/images/blog/wie-du-deinem-kind-toleranz-vermittelst/featured.webp",
  },
  {
    slug: "achtsamkeit-bei-kindern-so-kannst-du-dein-kind-dabei-unterstuetzen",
    title:
      "Achtsamkeit bei Kindern. So kannst du dein Kind dabei unterstützen",
    excerpt:
      "Achtsamkeit bei Kindern fördern: So hilfst du deinem Kind, konzentrierter und aufmerksamer zu werden — mit einfachen Übungen für den Alltag.",
    date: "2022-12-28",
    readTime: "7 Min.",
    categories: ["Achtsamkeit", "Beziehung", "Eltern", "Erziehung"],
    image:
      "/images/blog/achtsamkeit-bei-kindern-so-kannst-du-dein-kind-dabei-unterstuetzen/featured.webp",
  },
  {
    slug: "staerke-die-emotionale-intelligenz-deines-kindes",
    title: "Stärke die emotionale Intelligenz deines Kindes!",
    excerpt:
      "Entdecke, wie du die emotionale Intelligenz deines Kindes stärken kannst! Mit praktischen Tipps und einfühlsamen Strategien.",
    date: "2022-11-30",
    readTime: "6 Min.",
    categories: [
      "Eltern",
      "Emotionale Intelligenz",
      "Erziehung",
      "Gefühle",
    ],
    image:
      "/images/blog/staerke-die-emotionale-intelligenz-deines-kindes/featured.webp",
  },
  {
    slug: "starke-gefuehle-bei-kindern-so-hilfst-du-deinem-kind-dabei",
    title: "Starke Gefühle bei Kindern – so hilfst du deinem Kind dabei",
    excerpt:
      "Freude, Ärger, Wut oder Angst – Emotionen bestimmen nicht nur den Alltag der Erwachsenen, sondern auch den von Kindern.",
    date: "2022-11-02",
    readTime: "6 Min.",
    categories: [
      "Beziehung",
      "Erziehung",
      "Gefühlswelt",
      "Selbstwertgefühl",
    ],
    image:
      "/images/blog/starke-gefuehle-bei-kindern-so-hilfst-du-deinem-kind-dabei/featured.webp",
  },
  {
    slug: "wie-du-konflikte-gewaltfrei-loesen-kannst",
    title: "Wie du Konflikte gewaltfrei lösen kannst",
    excerpt:
      "Gerade innerhalb der Familie ist es wichtig, auftretende Probleme rasch zu lösen – und das auf eine friedliche Art und Weise.",
    date: "2022-10-19",
    readTime: "5 Min.",
    categories: [
      "Beziehung",
      "Eltern",
      "Empathie",
      "Erziehung",
      "Gefühle",
      "Gewaltfreie Kommunikation",
    ],
    image:
      "/images/blog/wie-du-konflikte-gewaltfrei-loesen-kannst/featured.webp",
  },
  {
    slug: "wie-du-kinder-ohne-strafen-erziehst",
    title: "Wie du Kinder ohne Strafen erziehst!",
    excerpt:
      "Erziehung ohne Strafen — geht das? Erfahre, wie du mit sinnvollen Konsequenzen statt Bestrafung eine respektvolle Beziehung aufbaust.",
    date: "2022-10-05",
    readTime: "6 Min.",
    categories: ["Beziehung", "Erziehung", "Gefühle"],
    image:
      "/images/blog/wie-du-kinder-ohne-strafen-erziehst/featured.webp",
  },
  {
    slug: "wie-kann-ich-die-emotionale-entwicklung-meines-kindes-unterstutzen",
    title:
      "Wie kann ich die emotionale Entwicklung meines Kindes unterstützen?",
    excerpt:
      "Wie du dein Kind in seiner Entwicklung effektiv förderst, ihm Sicherheit vermittelst und damit seine Beziehung zu dir stärkst.",
    date: "2022-08-10",
    readTime: "6 Min.",
    categories: ["Eltern", "Erziehung", "Familie", "Gefühle"],
    image:
      "/images/blog/wie-kann-ich-die-emotionale-entwicklung-meines-kindes-unterstutzen/featured.webp",
  },
  {
    slug: "wieso-du-ueber-deine-gefuehle-mit-deinem-kind-sprechen-solltest",
    title: "Wieso du über deine Gefühle mit deinem Kind sprechen solltest?",
    excerpt:
      "Warum du offen über deine Gefühle mit deinem Kind sprechen solltest — und wie du damit emotionale Intelligenz und Empathie förderst.",
    date: "2022-07-20",
    readTime: "7 Min.",
    categories: ["Eltern", "Familie", "Gefühle"],
    image:
      "/images/blog/wieso-du-ueber-deine-gefuehle-mit-deinem-kind-sprechen-solltest/featured.webp",
  },
  {
    slug: "so-erklaerst-du-ihn-deinem-kind",
    title: "Krieg in der Ukraine – so erklärst du ihn deinem Kind",
    excerpt:
      "Längst sind die Krisen dieser Welt in den Kinderzimmern und Schulklassen angekommen. Wie erklärst du dieses Geschehen deinem Kind?",
    date: "2022-04-04",
    readTime: "7 Min.",
    categories: ["Erziehung", "Gefühle", "Krieg"],
    image: "/images/blog/so-erklaerst-du-ihn-deinem-kind/featured.webp",
  },
  {
    slug: "gefuehle-von-kindern-ernst-nehmen-und-verstehen",
    title: "Gefühle von Kindern ernst nehmen und verstehen",
    excerpt:
      "Erfahre, warum es so wichtig ist, die Gefühle deines Kindes ernst zu nehmen — und wie du durch aktives Zuhören Vertrauen aufbaust.",
    date: "2022-03-23",
    readTime: "6 Min.",
    categories: ["Beziehung", "Gefühle"],
    image:
      "/images/blog/gefuehle-von-kindern-ernst-nehmen-und-verstehen/featured.webp",
  },
];

export const blogCategories = [
  "Alle",
  "Achtsamkeit",
  "Akzeptanz",
  "Beziehung",
  "Eltern",
  "Emotionale Intelligenz",
  "Empathie",
  "Erziehung",
  "Familie",
  "Gefühle",
  "Gefühlswelt",
  "Gewaltfreie Kommunikation",
  "Grenzen",
  "Hochsensibilität",
  "Krieg",
  "Selbstbewusstsein",
  "Selbstständigkeit",
  "Selbstwertgefühl",
  "Toleranz",
  "Wutanfälle",
];

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post) return [];

  return blogPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.categories.filter((c) => post.categories.includes(c)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}
