import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { createDownloadToken } from "@/lib/download-token";

export const metadata = {
  title: "Newsletter-Anmeldung bestätigt",
};

// Pro Request rendern, damit der Freebie-Download-Token frisch erzeugt wird
// (statt eines bei `next build` eingefrorenen Tokens).
export const dynamic = "force-dynamic";

const FREEBIE_FILE = "newsletter-mini-guide.pdf";

// Hierher führt der Bestätigungslink aus der Double-Opt-in-Mail
// (DigiLetter DOI). Erst ab jetzt ist die Anmeldung wirklich aktiv —
// und erst ab jetzt ist On-Page-Werbung zulässig (Einwilligung erteilt).
//
// Diese Seite ist die „zweite Dankesseite": Sie liefert das Freebie aus
// und macht ein Bundle-Angebot (Set-Preis, keine Fake-Verknappung).
//
// Hinweis: Der Download-Token wird beim Rendern erzeugt. Echte
// Lead-Bindung (nur wer wirklich bestätigt hat) kommt mit dem
// Confirm-Token aus DigiLetter (Roadmap Phase 1) — bis dahin ist das
// kostenlose PDF für Besucher dieser Seite erreichbar.
export default function NewsletterBestaetigtPage() {
  const bundle = products.find((p) => p.id === "gefuehlskompass-bundle");

  let freebieUrl: string | null = null;
  try {
    const token = createDownloadToken(["freebie-newsletter"], "newsletter:freebie");
    freebieUrl = `/api/download/${token}?file=${FREEBIE_FILE}`;
  } catch {
    // DOWNLOAD_TOKEN_SECRET fehlt → Download-Button ausblenden,
    // Freebie kommt dann per E-Mail.
    freebieUrl = null;
  }

  return (
    <section className="bg-gradient-to-b from-sage/10 to-cream py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-20 h-20 bg-sage/15 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="h-10 w-10 text-sage" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="font-heading text-5xl text-charcoal font-bold">
          Da bist du — herzlich willkommen!
        </h1>
        <p className="mt-6 text-lg text-charcoal-light leading-relaxed">
          Schön, dass du dabei bist. Ab jetzt bekommst du alle ein bis zwei
          Wochen einen kleinen, warmen Impuls zur Gefühlsförderung. Und weil
          du bestätigt hast, gehört dein Willkommensgeschenk jetzt dir:
        </p>

        {/* Block 1 — Freebie-Auslieferung */}
        <div className="mt-8 rounded-2xl border border-gold/25 bg-white p-6 text-left">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center flex-shrink-0">
              <svg className="h-6 w-6 text-gold-dark" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13.5m0 0l-4-4m4 4l4-4M4.5 19.5h15" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-2xl text-charcoal font-bold leading-tight">
                Dein Mini-Guide: „5 Sätze, die jedes Kind beruhigen"
              </h2>
              <p className="mt-1 text-sm text-charcoal-light">
                Speicher ihn dir gleich aufs Handy — dann hast du die Sätze
                griffbereit, wenn der nächste Sturm kommt.
              </p>
              {freebieUrl ? (
                <a
                  href={freebieUrl}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-dark px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                >
                  Mini-Guide herunterladen (PDF)
                </a>
              ) : (
                <p className="mt-4 text-sm text-charcoal-light">
                  Dein Mini-Guide kommt in den nächsten Minuten per E-Mail zu dir.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Block 2 — Bundle-Angebot mit Wert-Stack */}
        {bundle && (
          <div className="mt-6 rounded-2xl border border-lavender/15 bg-white p-6 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-lavender-dark mb-3">
              Wenn du tiefer einsteigen möchtest …
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="relative w-full sm:w-36 aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-sage/10 to-lavender/10 flex-shrink-0">
                <Image
                  src={bundle.images[0]}
                  alt={bundle.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 144px"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-2xl text-charcoal font-bold leading-tight">
                  Das Gefühlskompass-Bundle
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-charcoal-light">
                  <li>Buch „Was fühlst du?" — einzeln 22,90 €</li>
                  <li>Emotions-Memory Teil 1 — einzeln 24,99 €</li>
                  <li>Emotions-Memory Teil 2 — einzeln 24,99 €</li>
                  <li>Leitfaden zur emotionalen Entwicklung — einzeln 10,99 €</li>
                </ul>
                <p className="mt-3 text-sm text-charcoal">
                  Einzeln zusammen{" "}
                  <span className="text-charcoal-lighter line-through">
                    72,88 €
                  </span>{" "}
                  · im Bundle{" "}
                  <span className="text-lg font-bold text-sage-dark">
                    {formatPrice(bundle.price)}
                  </span>{" "}
                  <span className="text-xs text-charcoal-lighter">
                    (Gesamtpreis · gem. §19 UStG keine USt.)
                  </span>
                </p>
                <Button href={`/shop/${bundle.slug}`} variant="secondary" size="md" className="mt-4">
                  Das Bundle ansehen
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/blog" variant="outline" size="lg">
            Zum Blog
          </Button>
          <Button href="/shop" variant="ghost" size="lg">
            Im Shop stöbern
          </Button>
        </div>
      </div>
    </section>
  );
}
