import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BookPromo() {
  return (
    <div className="my-12 rounded-2xl overflow-hidden border border-gold/20 shadow-sm bg-white not-prose">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-2/5 relative bg-gold/5">
          <div className="aspect-[4/3] sm:aspect-auto sm:h-full relative">
            <Image
              src="/images/products/bundle-gefuehle.jpg"
              alt="Emotionen Entdecken – Buch und Leitfaden Bundle"
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) 100vw, 40vw"
            />
          </div>
        </div>

        {/* Content */}
        <div className="sm:w-3/5 p-6 sm:p-8 flex flex-col justify-center">
          <p className="text-xs font-semibold text-gold-dark uppercase tracking-wider">
            Empfehlung
          </p>
          <h3 className="mt-2 text-xl font-bold text-charcoal">
            Emotionen Entdecken
          </h3>
          <p className="mt-2 text-sm text-charcoal-light leading-relaxed">
            Das Buch mit praktischen Übungen und Strategien, das deinem Kind
            hilft, seine Gefühle zu verstehen und auszudrücken. Inkl.
            Leitfaden für Eltern.
          </p>
          <Link
            href="/shop"
            className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gold-dark transition-colors"
          >
            Zum Shop
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
