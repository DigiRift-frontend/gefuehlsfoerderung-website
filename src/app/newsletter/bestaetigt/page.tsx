import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Newsletter-Anmeldung bestätigt",
};

// Hierher führt der Bestätigungslink aus der Double-Opt-in-Mail
// (DigiLetter DOI). Erst ab jetzt ist die Anmeldung wirklich aktiv.
export default function NewsletterBestaetigtPage() {
  return (
    <section className="bg-gradient-to-b from-sage/10 to-cream py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-20 h-20 bg-sage/15 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="h-10 w-10 text-sage" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="font-heading text-5xl text-charcoal font-bold">
          Deine Anmeldung ist bestätigt!
        </h1>
        <p className="mt-6 text-lg text-charcoal-light leading-relaxed">
          Schön, dass du dabei bist! Ab jetzt bekommst du Tipps zur
          Gefühlsförderung, neue Blogartikel und exklusive Inhalte direkt in
          dein Postfach. Du kannst dich jederzeit mit einem Klick wieder
          abmelden.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/blog" variant="primary" size="lg">
            Zum Blog
          </Button>
          <Button href="/shop" variant="outline" size="lg">
            Zum Shop
          </Button>
        </div>
      </div>
    </section>
  );
}
