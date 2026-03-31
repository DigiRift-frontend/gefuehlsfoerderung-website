import { Button } from "@/components/ui/Button";
import { ClearCart } from "./ClearCart";

export const metadata = {
  title: "Bestellung erfolgreich",
};

export default function ErfolgreichPage() {
  return (
    <>
      <ClearCart />
      <section className="bg-gradient-to-b from-sage/10 to-cream py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-sage/15 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="h-10 w-10 text-sage" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h1 className="font-heading text-5xl text-charcoal font-bold">
            Vielen Dank!
          </h1>
          <p className="mt-6 text-lg text-charcoal-light leading-relaxed">
            Deine Bestellung ist bei uns eingegangen. Du erhältst in Kürze
            eine Bestätigungs-E-Mail mit allen Details.
          </p>

          <div className="mt-8 bg-white rounded-2xl border border-sage/15 p-6 text-left">
            <h2 className="font-semibold text-charcoal mb-3">
              Wie geht es weiter?
            </h2>
            <ul className="space-y-2 text-sm text-charcoal-light">
              <li className="flex gap-2">
                <span className="text-sage font-bold">1.</span>
                <span>
                  <strong>Digitale Produkte:</strong> Du erhältst deine
                  Downloads per E-Mail.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-sage font-bold">2.</span>
                <span>
                  <strong>Physische Produkte:</strong> Deine Bestellung wird
                  in 2–5 Werktagen versandt.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-sage font-bold">3.</span>
                <span>
                  <strong>Fragen?</strong> Schreib uns jederzeit über unser{" "}
                  <a href="/kontakt" className="text-lavender-dark underline">
                    Kontaktformular
                  </a>
                  .
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/shop" variant="primary" size="lg">
              Weiter einkaufen
            </Button>
            <Button href="/blog" variant="outline" size="lg">
              Blog lesen
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
