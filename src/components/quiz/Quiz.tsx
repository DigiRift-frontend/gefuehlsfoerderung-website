"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  quizQuestions,
  quizResults,
  evaluateQuiz,
  type QuizAnswer,
  type QuizResult,
} from "@/lib/quiz";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

type QuizStep = "intro" | "questions" | "email" | "result";

export function Quiz({ headline }: { headline: string }) {
  const [step, setStep] = useState<QuizStep>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState<QuizResult | null>(null);

  function handleStart() {
    setStep("questions");
  }

  function handleAnswer(letter: QuizAnswer) {
    const newAnswers = [...answers, letter];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("email");
    }
  }

  function handleGoBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    } else {
      setStep("intro");
      setAnswers([]);
    }
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const dominant = evaluateQuiz(answers);
    setResult(quizResults[dominant]);
    setStep("result");
    // TODO: Send email + result to DigiLetter API
  }

  function handleSkipEmail() {
    const dominant = evaluateQuiz(answers);
    setResult(quizResults[dominant]);
    setStep("result");
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <IntroStep
              key="intro"
              headline={headline}
              onStart={handleStart}
            />
          )}
          {step === "questions" && (
            <QuestionStep
              key={`q-${currentQuestion}`}
              question={quizQuestions[currentQuestion]}
              questionIndex={currentQuestion}
              totalQuestions={quizQuestions.length}
              onAnswer={handleAnswer}
              onBack={handleGoBack}
            />
          )}
          {step === "email" && (
            <EmailStep
              key="email"
              email={email}
              name={name}
              onEmailChange={setEmail}
              onNameChange={setName}
              onSubmit={handleEmailSubmit}
              onSkip={handleSkipEmail}
            />
          )}
          {step === "result" && result && (
            <ResultStep key="result" result={result} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const fadeVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function IntroStep({
  headline,
  onStart,
}: {
  headline: string;
  onStart: () => void;
}) {
  return (
    <motion.div
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <div className="inline-flex items-center gap-2 bg-lavender/10 text-lavender-dark px-4 py-2 rounded-full text-sm font-semibold mb-6">
        Kostenloser Selbsttest
      </div>
      <h1 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold leading-tight">
        {headline}
      </h1>
      <p className="mt-6 text-lg text-charcoal-light max-w-xl mx-auto leading-relaxed">
        5 ehrliche Fragen. 2 Minuten. Ein persönliches Ergebnis, das dir zeigt,
        wo ihr gerade steht und was euch als Familie weiterbringt.
      </p>
      <div className="mt-10">
        <Button size="lg" onClick={onStart}>
          Jetzt Test starten
        </Button>
      </div>
      <p className="mt-4 text-sm text-charcoal-lighter">
        Keine Anmeldung nötig. Dein Ergebnis bekommst du sofort.
      </p>
    </motion.div>
  );
}

function QuestionStep({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  onBack,
}: {
  question: (typeof quizQuestions)[number];
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (letter: QuizAnswer) => void;
  onBack: () => void;
}) {
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <motion.div
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35 }}
    >
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={onBack}
            className="text-sm text-charcoal-lighter hover:text-lavender-dark transition-colors"
          >
            &larr; Zurück
          </button>
          <span className="text-sm text-charcoal-lighter font-medium">
            Frage {questionIndex + 1} von {totalQuestions}
          </span>
        </div>
        <div className="w-full h-2 bg-lavender/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-lavender to-rose rounded-full"
            initial={{ width: `${((questionIndex) / totalQuestions) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-lavender-dark uppercase tracking-wider mb-2">
          {question.title}
        </p>
        <h2 className="font-heading text-2xl sm:text-3xl text-charcoal font-bold leading-snug">
          {question.subtitle}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, i) => (
          <motion.button
            key={option.letter}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            onClick={() => onAnswer(option.letter)}
            className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-lavender/15 bg-white hover:border-lavender/40 hover:bg-lavender/5 transition-all duration-200 group"
          >
            <span className="text-charcoal group-hover:text-charcoal leading-relaxed">
              {option.text}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function EmailStep({
  email,
  name,
  onEmailChange,
  onNameChange,
  onSubmit,
  onSkip,
}: {
  email: string;
  name: string;
  onEmailChange: (v: string) => void;
  onNameChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSkip: () => void;
}) {
  return (
    <motion.div
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-lavender/20 to-rose/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">&#10024;</span>
      </div>
      <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold">
        Dein Ergebnis ist fertig!
      </h2>
      <p className="mt-4 text-charcoal-light max-w-md mx-auto leading-relaxed">
        Trag deine E-Mail-Adresse ein und erhalte dein persönliches Ergebnis
        mit konkreten Tipps von Kindheitspädagogin Ewelina.
      </p>

      <form onSubmit={onSubmit} className="mt-8 max-w-sm mx-auto space-y-4">
        <input
          type="text"
          placeholder="Dein Vorname"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full px-5 py-3.5 rounded-2xl border-2 border-lavender/20 bg-white text-charcoal placeholder:text-charcoal-lighter focus:outline-none focus:border-lavender/50 transition-colors"
        />
        <input
          type="email"
          required
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full px-5 py-3.5 rounded-2xl border-2 border-lavender/20 bg-white text-charcoal placeholder:text-charcoal-lighter focus:outline-none focus:border-lavender/50 transition-colors"
        />
        <Button type="submit" size="lg" className="w-full">
          Ergebnis anzeigen
        </Button>
      </form>

      <button
        onClick={onSkip}
        className="mt-4 text-sm text-charcoal-lighter hover:text-charcoal transition-colors underline underline-offset-2"
      >
        Ohne E-Mail fortfahren
      </button>

      <p className="mt-6 text-xs text-charcoal-lighter max-w-xs mx-auto">
        Kein Spam. Du kannst dich jederzeit abmelden.
        Lies unsere{" "}
        <a href="/datenschutz" className="underline hover:text-lavender-dark">
          Datenschutzerklärung
        </a>
        .
      </p>
    </motion.div>
  );
}

function ResultStep({ result }: { result: QuizResult }) {
  const recommendedProducts = result.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <motion.div
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {/* Result header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-sage/10 text-sage-dark px-4 py-2 rounded-full text-sm font-semibold mb-6">
          Dein Ergebnis: {result.title}
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-bold leading-tight">
          {result.headline}
        </h2>
        <p className="mt-6 text-charcoal-light max-w-xl mx-auto leading-relaxed text-lg">
          {result.description}
        </p>
      </div>

      {/* Product recommendations */}
      {recommendedProducts.length > 0 && (
        <div className="mt-10">
          <h3 className="font-heading text-2xl text-charcoal font-bold text-center mb-6">
            Ewelinas Empfehlung für dich
          </h3>
          <div
            className={`grid gap-4 ${
              recommendedProducts.length > 1 ? "sm:grid-cols-2" : "max-w-sm mx-auto"
            }`}
          >
            {recommendedProducts.map((product) =>
              product ? (
                <a
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="block rounded-2xl border-2 border-lavender/15 bg-white p-5 hover:border-lavender/40 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-lavender/10 to-rose/10 overflow-hidden relative mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <h4 className="font-bold text-charcoal">{product.title}</h4>
                  <p className="text-sm text-charcoal-light mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-lg font-bold text-lavender-dark">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-charcoal-lighter line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </a>
              ) : null
            )}
          </div>

          <div className="text-center mt-8">
            <Button href="/shop" variant="outline" size="md">
              Alle Produkte ansehen
            </Button>
          </div>
        </div>
      )}

      {/* Share / retake */}
      <div className="mt-12 text-center border-t border-lavender/10 pt-8">
        <p className="text-charcoal-light mb-4">
          Dieses Ergebnis hat dich berührt? Teile den Test mit anderen Eltern.
        </p>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + "/quiz");
          }}
          className="text-sm text-lavender-dark font-semibold hover:text-lavender transition-colors"
        >
          Link kopieren
        </button>
      </div>
    </motion.div>
  );
}
