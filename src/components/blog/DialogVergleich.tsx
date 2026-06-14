import { X, Check } from "lucide-react";

type DialogVergleichProps = {
  /** Kurze Beschreibung der Situation, z. B. "Dein Kind will den Fernseher nicht ausmachen" */
  situation?: string;
  /** Typische Sätze, die Eltern in der Situation sagen (werden rot markiert) */
  statt: string[];
  /** Gefühlsstarke Alternativen (werden grün markiert) */
  besser: string[];
};

/**
 * Visueller Vergleich von Kommunikationsbeispielen in Blogartikeln:
 * links die typische Reaktion, rechts die gefühlsstarke Alternative.
 */
export function DialogVergleich({
  situation,
  statt,
  besser,
}: DialogVergleichProps) {
  return (
    <div className="my-8 rounded-2xl border border-cream-dark bg-white overflow-hidden not-prose shadow-sm">
      {situation && (
        <p className="px-5 py-3 bg-cream text-sm font-semibold text-charcoal border-b border-cream-dark">
          Situation: {situation}
        </p>
      )}
      <div className="grid sm:grid-cols-2">
        <div className="p-5 bg-rose/5 border-b sm:border-b-0 sm:border-r border-cream-dark">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-dark mb-3">
            <X className="h-4 w-4" />
            Das hört dein Kind oft
          </p>
          <div className="space-y-2.5">
            {statt.map((satz) => (
              <p
                key={satz}
                className="rounded-2xl rounded-tl-sm bg-rose/10 px-4 py-2.5 text-sm text-charcoal-light leading-relaxed"
              >
                „{satz}“
              </p>
            ))}
          </div>
        </div>
        <div className="p-5 bg-sage/5">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sage-dark mb-3">
            <Check className="h-4 w-4" />
            So erreichst du dein Kind
          </p>
          <div className="space-y-2.5">
            {besser.map((satz) => (
              <p
                key={satz}
                className="rounded-2xl rounded-tl-sm bg-sage/10 px-4 py-2.5 text-sm text-charcoal leading-relaxed"
              >
                „{satz}“
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
