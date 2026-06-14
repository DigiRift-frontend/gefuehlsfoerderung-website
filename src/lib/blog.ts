export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  modifiedDate?: string;
  readTime: string;
  categories: string[];
  image: string;
  /** Entwurf: nur lokal (next dev) sichtbar, nie in Production, Sitemap oder RSS. */
  draft?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "gewaltfreie-kommunikation-mit-kindern",
    title:
      "Gewaltfreie Kommunikation mit Kindern: Die 4 Schritte für den Familienalltag",
    excerpt:
      "Gewaltfreie Kommunikation mit Kindern: Wie du mit den 4 Schritten nach Marshall Rosenberg im Familienalltag klar, verständlich und liebevoll sprichst.",
    date: "2026-06-14",
    readTime: "8 Min.",
    categories: ["Beziehung", "Eltern", "Gefühle", "Gewaltfreie Kommunikation"],
    image: "/images/blog/gewaltfreie-kommunikation-mit-kindern/featured.jpg",
    draft: true,
  },
  {
    slug: "ich-botschaften-statt-du-botschaften",
    title:
      "Ich-Botschaften statt Vorwürfe: So sagst du deinem Kind, was du brauchst",
    excerpt:
      "Ich-Botschaften statt Vorwürfe: So sagst du deinem Kind klar, was du fühlst und brauchst, ohne zu beschuldigen. Mit vielen Beispielsätzen für den Alltag.",
    date: "2026-06-14",
    readTime: "7 Min.",
    categories: ["Eltern", "Erziehung", "Gewaltfreie Kommunikation"],
    image: "/images/blog/ich-botschaften-statt-du-botschaften/featured.jpg",
    draft: true,
  },
  {
    slug: "aktiv-zuhoeren-bei-kindern",
    title: "Aktiv zuhören: Wie sich dein Kind wirklich verstanden fühlt",
    excerpt:
      "Aktiv zuhören lässt dein Kind sich wirklich verstanden fühlen. Wie du Gefühle spiegelst statt vorschnell zu lösen, mit konkreten Dialogbeispielen.",
    date: "2026-06-13",
    readTime: "8 Min.",
    categories: ["Beziehung", "Eltern", "Gewaltfreie Kommunikation"],
    image: "/images/blog/aktiv-zuhoeren-bei-kindern/featured.jpg",
    draft: true,
  },
  {
    slug: "grenzen-setzen-die-halt-geben",
    title: "Grenzen setzen, die Halt geben: liebevoll und klar zugleich",
    excerpt:
      "Grenzen setzen, die Halt geben: Warum klare Grenzen deinem Kind Sicherheit schenken und wie du sie liebevoll formulierst. Mit vielen Praxisbeispielen.",
    date: "2026-06-13",
    readTime: "9 Min.",
    categories: ["Beziehung", "Erziehung", "Grenzen"],
    image: "/images/blog/grenzen-setzen-die-halt-geben/featured.jpg",
    draft: true,
  },
  {
    slug: "beduerfnisorientierte-erziehung",
    title:
      "Bedürfnisorientierte Erziehung: Was wirklich hinter dem Verhalten steckt",
    excerpt:
      "Bedürfnisorientierte Erziehung einfach erklärt: Wie du das Bedürfnis hinter dem Verhalten erkennst und liebevoll begleitest, ohne zu verwöhnen.",
    date: "2026-06-12",
    readTime: "7 Min.",
    categories: ["Beziehung", "Erziehung", "Gefühle"],
    image: "/images/blog/beduerfnisorientierte-erziehung/featured.jpg",
    draft: true,
  },
  {
    slug: "nein-sagen-ohne-schlechtes-gewissen",
    title:
      "Nein sagen ohne schlechtes Gewissen: deinem Kind liebevoll Grenzen zeigen",
    excerpt:
      "Nein sagen ohne schlechtes Gewissen: Warum ein klares, liebevolles Nein eure Beziehung stärkt und wie du Grenzen zeigst, die dein Kind versteht.",
    date: "2026-06-12",
    readTime: "7 Min.",
    categories: ["Eltern", "Erziehung", "Grenzen"],
    image: "/images/blog/nein-sagen-ohne-schlechtes-gewissen/featured.jpg",
    draft: true,
  },
  {
    slug: "kinder-richtig-loben",
    title: "Kinder richtig loben: Warum „gut gemacht“ oft nicht hilft",
    excerpt:
      "Kinder richtig loben: Warum „gut gemacht“ oft nicht hilft und wie beschreibendes Lob den Selbstwert deines Kindes echt stärkt. Mit vielen Lob-Sätzen.",
    date: "2026-06-11",
    readTime: "8 Min.",
    categories: ["Eltern", "Erziehung", "Selbstwertgefühl"],
    image: "/images/blog/kinder-richtig-loben/featured.jpg",
    draft: true,
  },
  {
    slug: "kind-luegt-was-tun",
    title:
      "Mein Kind lügt: Warum Kinder schwindeln und wie du gelassen reagierst",
    excerpt:
      "Mein Kind lügt: Warum Kinder schwindeln, was altersgerecht normal ist und wie du gelassen und ohne Beschämung reagierst. Mit konkreten Beispielen.",
    date: "2026-06-11",
    readTime: "8 Min.",
    categories: ["Beziehung", "Erziehung", "Gefühle"],
    image: "/images/blog/kind-luegt-was-tun/featured.jpg",
    draft: true,
  },
  {
    slug: "kind-sagt-schimpfwoerter",
    title: "Kind sagt Schimpfwörter: Gelassen reagieren statt schimpfen",
    excerpt:
      "Kind sagt Schimpfwörter? Warum Kinder fluchen und wie du gelassen statt schimpfend reagierst und klare Grenzen setzt. Mit Beispielen für den Alltag.",
    date: "2026-06-10",
    readTime: "8 Min.",
    categories: ["Erziehung", "Gefühle", "Gewaltfreie Kommunikation"],
    image: "/images/blog/kind-sagt-schimpfwoerter/featured.jpg",
    draft: true,
  },
  {
    slug: "gefuehle-benennen-lernen",
    title: "Gefühle benennen lernen: Wie du deinem Kind Gefühlswörter schenkst",
    excerpt:
      "Gefühle benennen lernen: Wie du deinem Kind einen Gefühlswortschatz schenkst, damit es Emotionen ausdrücken statt ausagieren kann. Mit Spielideen.",
    date: "2026-06-10",
    readTime: "7 Min.",
    categories: ["Emotionale Intelligenz", "Gefühle", "Gefühlswelt"],
    image: "/images/blog/gefuehle-benennen-lernen/featured.jpg",
    draft: true,
  },
  {
    slug: "kind-hoert-nicht-zu",
    title: "Kind hört nicht zu: 5 Schritte, wie du dein Kind erreichst",
    excerpt:
      "Dein Kind hört nicht? Erfahre die echten Gründe aus der Entwicklungspsychologie und 5 einfache Schritte, mit denen du dein Kind wirklich erreichst.",
    date: "2026-06-13",
    readTime: "7 Min.",
    categories: ["Beziehung", "Eltern", "Erziehung", "Gefühle"],
    image: "/images/blog/kind-hoert-nicht-zu/featured.jpg",
    draft: true,
  },
  {
    slug: "mein-kind-schlaegt-mich",
    title: "Mein Kind schlägt mich: Warum es passiert und was wirklich hilft",
    excerpt:
      "Mein Kind schlägt mich: Warum kleine Kinder hauen und wie du in 4 Schritten ruhig reagierst, ohne zu strafen. Mit Soforthilfe und Tipps zur Vorbeugung.",
    date: "2026-06-12",
    readTime: "7 Min.",
    categories: ["Eltern", "Erziehung", "Gefühle", "Grenzen", "Wutanfälle"],
    image: "/images/blog/mein-kind-schlaegt-mich/featured.jpg",
    draft: true,
  },
  {
    slug: "wieso-schlaeft-mein-kind-nicht-ein",
    title: "Wieso schläft mein Kind nicht ein? Gefühle als Schlafblocker",
    excerpt:
      "Wieso schläft mein Kind nicht ein? Oft blockieren Gefühle den Schlaf. Wie du mit Abendroutine und Gefühlsrunde ohne Machtkampf zur Ruhe findest.",
    date: "2026-06-11",
    readTime: "7 Min.",
    categories: ["Beziehung", "Eltern", "Gefühle", "Schlaf"],
    image: "/images/blog/wieso-schlaeft-mein-kind-nicht-ein/featured.jpg",
    draft: true,
  },
  {
    slug: "kind-beruhigen-co-regulation",
    title: "Kind beruhigen: Co-Regulation einfach erklärt (5 Schritte)",
    excerpt:
      "Kind beruhigen mit Co-Regulation: Warum dein Kind deine Ruhe braucht und wie der 5-Schritte-Plan in Wut und Tränen hilft. Mit Atemspielen für den Alltag.",
    date: "2026-06-10",
    readTime: "7 Min.",
    categories: ["Eltern", "Gefühle", "Gefühlswelt", "Wutanfälle"],
    image: "/images/blog/kind-beruhigen-co-regulation/featured.jpg",
    draft: true,
  },
  {
    slug: "trotzphase-autonomiephase",
    title: "Trotzphase verstehen: Warum die Autonomiephase so wichtig ist",
    excerpt:
      "Trotzphase oder Autonomiephase? Warum Wutanfälle ein wichtiger Entwicklungsschritt sind und wie du dein Kind liebevoll begleitest. Mit Praxistipps.",
    date: "2026-06-09",
    readTime: "8 Min.",
    categories: ["Erziehung", "Gefühle", "Grenzen", "Wutanfälle"],
    image: "/images/blog/trotzphase-autonomiephase/featured.jpg",
    draft: true,
  },
  {
    slug: "kind-sagt-ich-hasse-dich",
    title: "Kind sagt ich hasse dich: Was dahinter steckt und was hilft",
    excerpt:
      "Dein Kind sagt ich hasse dich? Was wirklich hinter den verletzenden Worten steckt und wie du in 4 Schritten ruhig und liebevoll reagierst.",
    date: "2026-06-06",
    readTime: "7 Min.",
    categories: ["Beziehung", "Erziehung", "Gefühle", "Wutanfälle"],
    image: "/images/blog/kind-sagt-ich-hasse-dich/featured.jpg",
    draft: true,
  },
  {
    slug: "kind-weint-wegen-jeder-kleinigkeit",
    title: "Kind weint wegen jeder Kleinigkeit: Ist das normal?",
    excerpt:
      "Dein Kind weint wegen jeder Kleinigkeit? Warum Tränen gesunde Emotionsregulation sind und wie du dein Kind in 4 Schritten liebevoll begleitest.",
    date: "2026-06-05",
    readTime: "7 Min.",
    categories: ["Eltern", "Gefühle", "Gefühlswelt", "Hochsensibilität"],
    image: "/images/blog/kind-weint-wegen-jeder-kleinigkeit/featured.jpg",
    draft: true,
  },
  {
    slug: "wut-auf-das-eigene-kind",
    title: "Wut auf das eigene Kind: Ruhig bleiben in 5 Schritten",
    excerpt:
      "Wut auf das eigene Kind ist normal und kein Versagen. Mit 5-Schritte-Notfallplan und ehrlicher Reparatur nach dem Anschreien stärkst du sogar eure Bindung.",
    date: "2026-06-04",
    readTime: "8 Min.",
    categories: ["Beziehung", "Eltern", "Gefühle", "Wutanfälle"],
    image: "/images/blog/wut-auf-das-eigene-kind/featured.jpg",
    draft: true,
  },
  {
    slug: "geschwisterstreit-wann-eingreifen",
    title: "Geschwisterstreit: Wann eingreifen und wie richtig begleiten?",
    excerpt:
      "Geschwisterstreit nervt? Erfahre, warum Streit unter Geschwistern normal ist, wann du eingreifen solltest und wie du Konflikte fair begleitest.",
    date: "2026-06-03",
    readTime: "7 Min.",
    categories: [
      "Beziehung",
      "Erziehung",
      "Geschwister",
      "Gewaltfreie Kommunikation",
    ],
    image: "/images/blog/geschwisterstreit-wann-eingreifen/featured.jpg",
    draft: true,
  },
  {
    slug: "aengste-bei-kindern-begleiten",
    title: "Ängste bei Kindern: So begleitest du dein Kind durch die Angst",
    excerpt:
      "Ängste bei Kindern sind normal: Hier erfährst du, welche Ängste in welchem Alter typisch sind und wie du dein Kind liebevoll durch die Angst begleitest.",
    date: "2026-06-02",
    readTime: "7 Min.",
    categories: ["Angst", "Beziehung", "Eltern", "Gefühle"],
    image: "/images/blog/aengste-bei-kindern-begleiten/featured.jpg",
    draft: true,
  },
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
    slug: "wie-foerdert-man-empathie-bei-kindern",
    title: "Wie fördert man Empathie bei Kindern?",
    excerpt:
      "Empathie ist ein wertvoller Begleiter durchs Leben. Erfahre, wie sich das Einfühlungsvermögen deines Kindes entwickelt und wie du es mit fünf Tipps förderst.",
    date: "2022-08-10",
    readTime: "5 Min.",
    categories: ["Eltern", "Empathie", "Erziehung", "Gefühle"],
    image:
      "/images/blog/gefuehle-von-kindern-ernst-nehmen-und-verstehen/featured.webp",
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

/** Veröffentlichte Posts (ohne Entwürfe) — für Sitemap und RSS-Feed. */
export const publishedPosts: BlogPost[] = blogPosts.filter((p) => !p.draft);

/** Sichtbare Posts: lokal (next dev) inkl. Entwürfe, in Production nur veröffentlichte. */
export const visiblePosts: BlogPost[] =
  process.env.NODE_ENV === "production" ? publishedPosts : blogPosts;

export const blogCategories = [
  "Alle",
  "Achtsamkeit",
  "Akzeptanz",
  "Angst",
  "Beziehung",
  "Eltern",
  "Emotionale Intelligenz",
  "Empathie",
  "Erziehung",
  "Familie",
  "Gefühle",
  "Gefühlswelt",
  "Geschwister",
  "Gewaltfreie Kommunikation",
  "Grenzen",
  "Hochsensibilität",
  "Krieg",
  "Schlaf",
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

  return visiblePosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.categories.filter((c) => post.categories.includes(c)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}
