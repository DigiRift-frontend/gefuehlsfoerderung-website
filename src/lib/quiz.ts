export type QuizAnswer = "A" | "B" | "C" | "D" | "E";

export type QuizQuestion = {
  id: number;
  title: string;
  subtitle: string;
  options: { letter: QuizAnswer; text: string }[];
};

export type QuizResultType =
  | "gefuehlschaos"
  | "wut"
  | "schweigen"
  | "eigene-muster"
  | "angst";

export type QuizResult = {
  type: QuizResultType;
  letter: QuizAnswer;
  title: string;
  headline: string;
  description: string;
  productIds: string[];
  ctaText: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: "Der Alltags-Moment",
    subtitle:
      "Stell dir vor: Dein Kind kommt von der Kita/Schule und ist sichtlich aufgewühlt. Was passiert dann meistens?",
    options: [
      {
        letter: "A",
        text: "Es kann mir nicht sagen was los ist \u2013 ihm fehlen die Worte dafür",
      },
      {
        letter: "B",
        text: "Es explodiert \u2013 wirft Sachen, schreit, weint unkontrolliert",
      },
      {
        letter: "C",
        text: 'Es zieht sich zurück, sagt "nichts" und will nicht reden',
      },
      {
        letter: "D",
        text: "Ich merke, dass ICH selbst unsicher werde wie ich reagieren soll",
      },
      {
        letter: "E",
        text: "Es klammert sich an mich und will mich nicht mehr loslassen",
      },
    ],
  },
  {
    id: 2,
    title: "Die größte Sorge",
    subtitle:
      "Wenn du nachts wach liegst und an dein Kind denkst \u2013 was beschäftigt dich am meisten?",
    options: [
      {
        letter: "A",
        text: "Dass es seine Gefühle nicht einordnen kann und darunter leidet",
      },
      {
        letter: "B",
        text: "Dass die Wutanfälle schlimmer werden und ich sie nicht in den Griff bekomme",
      },
      {
        letter: "C",
        text: "Dass wir uns immer weiter voneinander entfernen",
      },
      {
        letter: "D",
        text: "Dass ich Fehler mache, die mein Kind später belasten werden",
      },
      {
        letter: "E",
        text: "Dass es zu ängstlich ist für die Welt da draußen",
      },
    ],
  },
  {
    id: 3,
    title: "Die Beziehung",
    subtitle:
      "Wie würdest du eure Kommunikation über Gefühle beschreiben?",
    options: [
      {
        letter: "A",
        text: "Mein Kind kennt kaum Worte für Gefühle \u2013 wir reden aneinander vorbei",
      },
      {
        letter: "B",
        text: "In ruhigen Momenten geht es gut, aber bei starken Gefühlen bricht alles zusammen",
      },
      {
        letter: "C",
        text: "Mein Kind blockt ab \u2013 ich komme einfach nicht an es heran",
      },
      {
        letter: "D",
        text: "Ich weiß selbst oft nicht, was ich sagen soll \u2013 mir wurde das nie beigebracht",
      },
      {
        letter: "E",
        text: "Mein Kind traut sich vieles nicht und ich weiß nicht wie ich es stärken kann",
      },
    ],
  },
  {
    id: 4,
    title: "Der Wunsch",
    subtitle: "Was wünschst du dir am sehnlichsten?",
    options: [
      {
        letter: "A",
        text: "Dass mein Kind lernt, seine Gefühle zu verstehen und auszudrücken",
      },
      {
        letter: "B",
        text: "Einen Weg, mit den emotionalen Ausbrüchen umzugehen \u2013 für uns beide",
      },
      {
        letter: "C",
        text: "Dass mein Kind sich mir wieder öffnet und wir wieder im Gespräch sind",
      },
      {
        letter: "D",
        text: "Mehr Sicherheit in meiner Rolle als Elternteil \u2013 weniger Selbstzweifel",
      },
      {
        letter: "E",
        text: "Dass mein Kind mutiger wird und Vertrauen in sich selbst gewinnt",
      },
    ],
  },
  {
    id: 5,
    title: "Die Vergangenheit",
    subtitle:
      "Wenn du ehrlich bist \u2013 wie wurde in deiner eigenen Kindheit mit Gefühlen umgegangen?",
    options: [
      {
        letter: "A",
        text: "Gefühle waren kein Thema \u2013 ich will es bei meinem Kind besser machen",
      },
      {
        letter: "B",
        text: "Wut war tabu \u2013 und jetzt bin ich hilflos wenn mein Kind wütend wird",
      },
      {
        letter: "C",
        text: "Ich habe selbst gelernt, Gefühle runterzuschlucken",
      },
      {
        letter: "D",
        text: "Ich merke, dass ich Muster meiner Eltern wiederhole \u2013 und das will ich nicht",
      },
      {
        letter: "E",
        text: "Ich wurde als Kind oft allein gelassen mit meinen Ängsten",
      },
    ],
  },
];

export const quizResults: Record<QuizAnswer, QuizResult> = {
  A: {
    type: "gefuehlschaos",
    letter: "A",
    title: "Gefühlschaos",
    headline:
      "Die Gefühlswelt deines Kindes wartet darauf, entdeckt zu werden",
    description:
      "Dein Kind spürt so viel, aber ihm fehlen die Worte und das Verständnis für seine Gefühlswelt. Das ist ganz normal \u2013 und die gute Nachricht: Du kannst ihm helfen, seine Gefühle zu entdecken und zu benennen. Mit den richtigen Werkzeugen wird aus dem Gefühlschaos eine spannende Entdeckungsreise.",
    productIds: ["was-fuehlst-du", "leitfaden-emotionale-entwicklung"],
    ctaText: "Die Gefühlswelt entdecken",
  },
  B: {
    type: "wut",
    letter: "B",
    title: "Wut verstehen",
    headline: "Wut ist nicht der Feind \u2013 sie ist ein Hilferuf",
    description:
      "Die Wutanfälle deines Kindes sind kein Zeichen von schlechter Erziehung. Wut ist eine wichtige Emotion \u2013 dein Kind braucht nur Unterstützung, um damit umzugehen. Und du verdienst Werkzeuge, die euch beiden helfen, diese intensiven Momente gemeinsam zu meistern.",
    productIds: ["leitfaden-kinderwut"],
    ctaText: "Wut gemeinsam meistern",
  },
  C: {
    type: "schweigen",
    letter: "C",
    title: "Wieder ins Gespräch kommen",
    headline:
      "Dein Kind redet nicht weniger \u2013 es braucht nur eine andere Tür",
    description:
      "Wenn Kinder sich verschließen, fühlt sich das für Eltern oft wie Zurückweisung an. Aber hinter dem Schweigen steckt meist ein Kind, das nicht weiß WIE es sich ausdrücken soll \u2013 nicht eines, das nicht WILL. Du kannst lernen, diese andere Tür zu finden.",
    productIds: ["leitfaden-kind-redet-nicht"],
    ctaText: "Den Zugang wiederfinden",
  },
  D: {
    type: "eigene-muster",
    letter: "D",
    title: "Eigene Muster erkennen",
    headline:
      "Du bist nicht deine Eltern \u2013 und das ist deine Superkraft",
    description:
      "Dass du deine eigenen Muster erkennst, zeigt wie reflektiert du bist. Viele von uns haben nie gelernt, mit Gefühlen umzugehen \u2013 und trotzdem wollen wir es bei unseren Kindern besser machen. Das ist mutig. Und der erste Schritt ist bereits getan.",
    productIds: ["was-fuehlst-du", "leitfaden-emotionale-entwicklung"],
    ctaText: "Den ersten Schritt machen",
  },
  E: {
    type: "angst",
    letter: "E",
    title: "Mut fördern",
    headline: "Angst ist Mut, der noch eine Umarmung braucht",
    description:
      'Dein Kind ist nicht "zu empfindlich" oder "zu schüchtern". Angst bei Kindern ist eine natürliche Reaktion \u2013 und du kannst deinem Kind helfen, Schritt für Schritt mutiger zu werden, ohne es zu überfordern. Jedes Kind hat seinen eigenen Weg zur Stärke.',
    productIds: ["was-fuehlst-du"],
    ctaText: "Mut Schritt für Schritt aufbauen",
  },
};

export const themaHeadlines: Record<string, string> = {
  wut: "Wutanfälle verstehen \u2013 mach den kostenlosen Test",
  stille: "Warum dein Kind schweigt \u2013 finde es heraus",
  gefuehle: "Versteht dein Kind seine Gefühle? Finde es heraus",
  muster: "Wiederholst du die Muster deiner Eltern? Mach den Test",
  angst: "Ist dein Kind zu ängstlich? Der kostenlose Test",
};

export const defaultHeadline =
  "Welche Gefühls-Herausforderung beschäftigt euch gerade am meisten?";

export function evaluateQuiz(answers: QuizAnswer[]): QuizAnswer {
  const counts: Record<QuizAnswer, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  for (const answer of answers) {
    counts[answer]++;
  }
  let maxLetter: QuizAnswer = "A";
  let maxCount = 0;
  for (const letter of ["A", "B", "C", "D", "E"] as QuizAnswer[]) {
    if (counts[letter] > maxCount) {
      maxCount = counts[letter];
      maxLetter = letter;
    }
  }
  return maxLetter;
}
