import { Button } from "@/components/ui/Button";
import { ClearCart } from "./ClearCart";
import { capturePayPalOrderAndFulfill } from "@/lib/paypal-capture";

export const metadata = {
  title: "Bestellung erfolgreich",
};

// PayPal leitet nach der Freigabe hierher zurück
// (?paypal=true&token=<orderID>). Der Capture passiert serverseitig
// beim Rendern dieser Seite — vorher ist die Zahlung NICHT abgeschlossen.
export default async function ErfolgreichPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const isPayPalReturn = params.paypal === "true";
  const paypalToken = typeof params.token === "string" ? params.token : null;

  let paypalFailed = false;
  if (isPayPalReturn && paypalToken) {
    const result = await capturePayPalOrderAndFulfill(paypalToken);
    paypalFailed = !result.success;
  }

  if (paypalFailed) {
    return (
      <section className="bg-gradient-to-b from-rose/10 to-cream py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl text-charcoal font-bold">
            Da ist etwas schiefgelaufen
          </h1>
          <p className="mt-6 text-lg text-charcoal-light leading-relaxed">
            Deine PayPal-Zahlung konnte nicht abgeschlossen werden. Es wurde
            nichts abgebucht. Bitte versuche es erneut oder melde dich über
            unser{" "}
            <a href="/kontakt" className="text-lavender-dark underline">
              Kontaktformular
            </a>
            .
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/checkout" variant="primary" size="lg">
              Zurück zur Kasse
            </Button>
            <Button href="/shop" variant="outline" size="lg">
              Zum Shop
            </Button>
          </div>
        </div>
      </section>
    );
  }

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
                  <strong>Digitale Produkte:</strong> Deine Download-Links
                  findest du in der Bestätigungs-E-Mail.
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
              <li className="flex gap-2">
                <span className="text-sage font-bold">4.</span>
                <span>
                  <strong>Widerrufsrecht:</strong> 14 Tage bei physischen
                  Produkten. Für digitale Inhalte ist das Widerrufsrecht mit
                  Bereitstellung des Downloads erloschen (deiner Zustimmung im
                  Checkout entsprechend). Details:{" "}
                  <a
                    href="/agb#widerruf"
                    className="text-lavender-dark underline"
                  >
                    Widerrufsbelehrung
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
