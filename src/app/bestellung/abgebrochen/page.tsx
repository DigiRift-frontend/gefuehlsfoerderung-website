import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Bestellung abgebrochen",
};

export default function AbgebrochenPage() {
  return (
    <section className="bg-gradient-to-b from-rose/10 to-cream py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-20 h-20 bg-rose/15 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="h-10 w-10 text-rose-dark" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="font-heading text-5xl text-charcoal font-bold">
          Bestellung abgebrochen
        </h1>
        <p className="mt-6 text-lg text-charcoal-light leading-relaxed">
          Keine Sorge — es wurde nichts berechnet. Dein Warenkorb ist noch
          gespeichert, du kannst jederzeit fortfahren.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/shop" variant="primary" size="lg">
            Zurück zum Shop
          </Button>
          <Button href="/kontakt" variant="outline" size="lg">
            Hilfe benötigt?
          </Button>
        </div>
      </div>
    </section>
  );
}
