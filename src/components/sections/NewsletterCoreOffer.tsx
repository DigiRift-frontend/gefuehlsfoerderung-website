"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

// Core-Offer auf der Newsletter-„Fast geschafft"-Ansicht (Thank-You #1).
// Zeigt das Buch „Was fühlst du?" als sanften Erstkauf, während der Nutzer
// auf die Bestätigungsmail wartet. Bewusst KEIN Streichpreis (keine
// belegte 30-Tage-Preishistorie) und KEINE Fake-Verknappung.
export function NewsletterCoreOffer({ className = "" }: { className?: string }) {
  const buch = products.find((p) => p.id === "was-fuehlst-du");
  if (!buch) return null;

  return (
    <div
      className={`mt-8 text-left rounded-2xl border border-lavender/15 bg-white p-5 sm:p-6 ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-lavender-dark mb-3">
        Während du wartest …
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
        <Link
          href="/shop/was-fuehlst-du"
          className="block relative w-full sm:w-28 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-lavender/10 to-rose/10 flex-shrink-0"
        >
          <Image
            src={buch.images[0]}
            alt={buch.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 112px"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-2xl text-charcoal font-bold leading-tight">
            Das Buch, mit dem so viele Familien angefangen haben
          </h3>
          <p className="mt-2 text-sm text-charcoal-light leading-relaxed">
            Drei Geschichten über den kleinen Julian und seinen Teddy Tobi,
            die Kindern von 6–10 helfen, Traurigkeit, Wut und Freude in Worte
            zu fassen — mit Reflexionsfragen, die das Gespräch von allein in
            Gang bringen.
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-bold text-lavender-dark">
              {formatPrice(buch.price)}
            </span>
            <span className="text-xs text-charcoal-lighter">
              Gesamtpreis · gem. §19 UStG keine USt.
            </span>
          </div>
          <Link
            href="/shop/was-fuehlst-du"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-lavender px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-lavender-dark transition-colors"
          >
            Buch ansehen &amp; sichern
          </Link>
          <p className="mt-2 text-xs text-charcoal-lighter">
            Kein Muss — bestätige in Ruhe zuerst deine E-Mail.
          </p>
        </div>
      </div>
    </div>
  );
}
