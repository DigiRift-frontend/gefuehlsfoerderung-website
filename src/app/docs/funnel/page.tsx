"use client";

import { useState } from "react";

/* ─── data ─── */

const products = {
  quiz: { name: "Gefühls-Quiz", price: "Kostenlos", type: "lead", color: "#9B7FBF" },
  leitfadenEmotional: { name: "Leitfaden emot. Entwicklung", price: "10,99€", type: "digital", color: "#E8B84D" },
  leitfadenKinderwut: { name: "Leitfaden Kinderwut", price: "14,99€", type: "digital", color: "#E8B84D" },
  leitfadenKindRedet: { name: "Leitfaden Kind redet nicht", price: "14,99€", type: "digital", color: "#E8B84D" },
  leitfadenMuster: { name: "Leitfaden Eigene Muster", price: "14,99€", type: "digital", color: "#E8B84D" },
  leitfadenAngst: { name: "Leitfaden Kinderangst", price: "14,99€", type: "digital", color: "#E8B84D" },
  buch: { name: '"Was fühlst du?" Buch', price: "17,90€", type: "physical", color: "#E8A0B0" },
  memory1: { name: "Emotions-Memory Teil 1", price: "14,99€", type: "physical", color: "#E8A0B0" },
  memory2: { name: "Emotions-Memory Teil 2", price: "19,99€", type: "physical", color: "#E8A0B0" },
  bundleEmotionen: { name: '"Emotionen Entdecken" Bundle', price: "24,99€", type: "bundle", color: "#5A9E6E" },
  bundleKompass: { name: "Gefühlskompass Bundle", price: "45,99€", type: "bundle", color: "#5A9E6E" },
};

type ProductKey = keyof typeof products;

const quizResults: { letter: string; label: string; color: string; tripwire: ProductKey; core: ProductKey }[] = [
  { letter: "A", label: "Gefühlschaos", color: "#9B7FBF", tripwire: "leitfadenEmotional", core: "buch" },
  { letter: "B", label: "Wut-Explosion", color: "#C4707E", tripwire: "leitfadenKinderwut", core: "buch" },
  { letter: "C", label: "Mauer des Schweigens", color: "#3D7A50", tripwire: "leitfadenKindRedet", core: "buch" },
  { letter: "D", label: "Eigene Muster", color: "#C49030", tripwire: "leitfadenMuster", core: "buch" },
  { letter: "E", label: "Angst & Unsicherheit", color: "#7B5FA0", tripwire: "leitfadenAngst", core: "buch" },
];

const adAngles = [
  { text: "Dein Kind hat Wutanfälle?", target: "B", color: "#C4707E" },
  { text: "Dein Kind redet nicht mehr?", target: "C", color: "#3D7A50" },
  { text: "Gefühle nicht ausdrücken?", target: "A", color: "#9B7FBF" },
  { text: "Muster deiner Eltern?", target: "D", color: "#C49030" },
  { text: "Kind zu ängstlich?", target: "E", color: "#7B5FA0" },
];

const orderBumps: { when: string; offer: string; price: string }[] = [
  { when: "Buch im Warenkorb", offer: "Leitfaden emot. Entw. dazu", price: "7,09€ statt 10,99€" },
  { when: "Memory Teil 1", offer: "Teil 2 dazu", price: "16,99€ statt 19,99€" },
  { when: "Beliebiger Leitfaden", offer: "Kinderwut-Leitfaden dazu", price: "9,99€ statt 14,99€" },
  { when: "E-Book im Warenkorb", offer: 'Buch "Was fühlst du?" dazu', price: "15,90€ statt 17,90€" },
];

const emailSequences = [
  {
    name: "Nach Quiz (kein Kauf)",
    color: "#9B7FBF",
    steps: [
      { day: "Tag 0", subject: "Quiz-Ergebnis + Empfehlung" },
      { day: "Tag 1", subject: "Tipp passend zum Ergebnis" },
      { day: "Tag 3", subject: "Tripwire-Angebot" },
      { day: "Tag 5", subject: "Ewelinas Geschichte" },
      { day: "Tag 7", subject: "Core Offer + Rabatt" },
      { day: "Tag 14", subject: "Bundle-Angebot" },
    ],
  },
  {
    name: "Nach Kauf",
    color: "#5A9E6E",
    steps: [
      { day: "Tag 0", subject: "Bestellbestätigung + Download" },
      { day: "Tag 3", subject: "Wie gefällt dir…? + Upsell" },
      { day: "Tag 7", subject: "Bewertung anfragen" },
      { day: "Tag 14", subject: "Nächstes Produkt empfehlen" },
    ],
  },
  {
    name: "Warenkorb-Abbrecher",
    color: "#C4707E",
    steps: [
      { day: "1h", subject: "Du hast etwas vergessen" },
      { day: "24h", subject: "Noch unsicher? + Testimonials" },
      { day: "72h", subject: "Letzter Hinweis + Rabatt" },
    ],
  },
];

/* ─── styles ─── */
const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #F5F0EB; }
  .funnel { font-family: "Nunito", system-ui, sans-serif; color: #1A1A1A; max-width: 1200px; margin: 0 auto; padding: 32px 20px; }
  .funnel h1 { font-family: "Caveat", cursive; font-size: 48px; text-align: center; margin-bottom: 8px; }
  .funnel .subtitle { text-align: center; color: #666; font-size: 15px; margin-bottom: 48px; }

  /* section */
  .f-section { margin-bottom: 56px; }
  .f-section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .f-section-num { width: 36px; height: 36px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; color: white; flex-shrink: 0; }
  .f-section-title { font-family: "Caveat", cursive; font-size: 32px; font-weight: 700; }
  .f-section-desc { color: #666; font-size: 14px; margin-bottom: 20px; line-height: 1.6; }

  /* flow arrow */
  .f-arrow { display: flex; justify-content: center; margin: 20px 0; }
  .f-arrow svg { color: #C4B3D9; }

  /* cards */
  .f-card { background: white; border-radius: 20px; padding: 24px; border: 1px solid rgba(155,127,191,0.1); margin-bottom: 12px; }
  .f-card-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }

  /* ad angles */
  .f-ad { background: white; border-radius: 16px; padding: 16px 20px; border: 2px solid; display: flex; align-items: center; gap: 12px; }
  .f-ad-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: white; flex-shrink: 0; }
  .f-ad-text { font-weight: 700; font-size: 14px; }
  .f-ad-target { font-size: 12px; color: #666; }

  /* quiz results */
  .f-quiz-result { background: white; border-radius: 16px; padding: 16px 20px; border-left: 4px solid; display: flex; flex-direction: column; gap: 6px; }
  .f-quiz-letter { font-weight: 800; font-size: 20px; }
  .f-quiz-label { font-weight: 700; font-size: 14px; }
  .f-quiz-rec { font-size: 12px; color: #666; }
  .f-quiz-rec strong { color: #1A1A1A; }

  /* product badge */
  .f-product { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 10px; font-size: 12px; font-weight: 700; white-space: nowrap; }
  .f-product-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

  /* funnel flow */
  .f-flow { position: relative; }
  .f-flow-step { display: flex; gap: 16px; margin-bottom: 0; }
  .f-flow-line { display: flex; flex-direction: column; align-items: center; width: 40px; flex-shrink: 0; }
  .f-flow-dot { width: 16px; height: 16px; border-radius: 50%; border: 3px solid; flex-shrink: 0; z-index: 1; background: white; }
  .f-flow-connector { width: 2px; flex: 1; min-height: 20px; }
  .f-flow-content { flex: 1; padding-bottom: 20px; }
  .f-flow-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
  .f-flow-card { background: white; border-radius: 16px; padding: 16px 20px; border: 1px solid rgba(155,127,191,0.1); }
  .f-flow-card h4 { font-family: "Caveat", cursive; font-size: 22px; margin-bottom: 6px; }
  .f-flow-card p { font-size: 13px; color: #666; line-height: 1.5; }

  /* branch */
  .f-branch { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; }
  .f-branch-yes { background: rgba(90,158,110,0.06); border: 1px solid rgba(90,158,110,0.2); border-radius: 14px; padding: 14px 16px; }
  .f-branch-no { background: rgba(196,112,126,0.06); border: 1px solid rgba(196,112,126,0.2); border-radius: 14px; padding: 14px 16px; }
  .f-branch-label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
  .f-branch-text { font-size: 12px; color: #3D3D3D; line-height: 1.5; }

  /* order bump */
  .f-bump { background: rgba(232,184,77,0.06); border: 1.5px dashed rgba(232,184,77,0.3); border-radius: 14px; padding: 14px 16px; display: flex; align-items: center; gap: 12px; }
  .f-bump-check { width: 18px; height: 18px; border: 2px solid #C49030; border-radius: 5px; flex-shrink: 0; }
  .f-bump-text { font-size: 13px; color: #3D3D3D; }
  .f-bump-text strong { color: #C49030; }
  .f-bump-when { font-size: 11px; color: #999; margin-top: 2px; }

  /* email sequences */
  .f-email-seq { border-radius: 16px; padding: 20px; margin-bottom: 16px; }
  .f-email-name { font-family: "Caveat", cursive; font-size: 24px; font-weight: 700; margin-bottom: 12px; }
  .f-email-step { display: flex; align-items: center; gap: 10px; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.04); }
  .f-email-day { font-size: 11px; font-weight: 800; width: 48px; text-align: right; flex-shrink: 0; }
  .f-email-subject { font-size: 13px; color: #3D3D3D; }

  /* value ladder */
  .f-ladder { display: flex; flex-direction: column; gap: 0; align-items: center; }
  .f-ladder-step { width: 100%; max-width: 600px; text-align: center; padding: 16px 24px; border-radius: 16px; font-weight: 700; font-size: 14px; position: relative; }
  .f-ladder-price { font-size: 12px; font-weight: 600; opacity: 0.8; }
  .f-ladder-arrow { font-size: 20px; color: #C4B3D9; margin: 4px 0; }

  /* bundle contains */
  .f-bundle-contains { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
  .f-bundle-item { font-size: 11px; background: rgba(0,0,0,0.05); padding: 3px 8px; border-radius: 6px; }

  /* legend */
  .f-legend { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 32px; justify-content: center; }
  .f-legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #666; }
  .f-legend-dot { width: 10px; height: 10px; border-radius: 50%; }

  /* highlight box */
  .f-highlight { background: linear-gradient(135deg, rgba(155,127,191,0.08), rgba(232,160,176,0.08)); border-radius: 16px; padding: 20px 24px; border-left: 4px solid #9B7FBF; margin: 20px 0; }
  .f-highlight p { font-size: 14px; line-height: 1.6; color: #3D3D3D; }
  .f-highlight strong { color: #1A1A1A; }

  /* tabs */
  .f-tabs { display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; }
  .f-tab { padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; transition: all 0.2s; }
  .f-tab-active { color: white; }
  .f-tab-inactive { background: rgba(0,0,0,0.04); color: #666; }
  .f-tab-inactive:hover { background: rgba(0,0,0,0.08); }
`;

function Arrow() {
  return (
    <div className="f-arrow">
      <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
        <path d="M12 0v24m0 0l-7-7m7 7l7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function FunnelVisualization() {
  const [activeResult, setActiveResult] = useState(0);
  const r = quizResults[activeResult];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="funnel">
        <h1>Sales Funnel — Gefühlsförderung</h1>
        <p className="subtitle">Kompletter Upsell-Flow nach DotCom Secrets (Russell Brunson)</p>

        {/* Legend */}
        <div className="f-legend">
          <div className="f-legend-item"><div className="f-legend-dot" style={{ background: "#9B7FBF" }} /> Lead Magnet</div>
          <div className="f-legend-item"><div className="f-legend-dot" style={{ background: "#E8B84D" }} /> Digital (Tripwire)</div>
          <div className="f-legend-item"><div className="f-legend-dot" style={{ background: "#E8A0B0" }} /> Physisch (Core)</div>
          <div className="f-legend-item"><div className="f-legend-dot" style={{ background: "#5A9E6E" }} /> Bundle (Profit Max)</div>
        </div>

        {/* ── 1. AD ANGLES ── */}
        <div className="f-section">
          <div className="f-section-header">
            <div className="f-section-num" style={{ background: "#9B7FBF" }}>1</div>
            <span className="f-section-title">Ad-Winkel → Quiz</span>
          </div>
          <p className="f-section-desc">5 verschiedene Schmerzpunkte als Ads, alle führen zum selben Quiz.</p>
          <div className="f-card-row">
            {adAngles.map((ad) => (
              <div key={ad.target} className="f-ad" style={{ borderColor: ad.color + "30" }}>
                <div className="f-ad-icon" style={{ background: ad.color }}>{ad.target}</div>
                <div>
                  <div className="f-ad-text" style={{ color: ad.color }}>{ad.text}</div>
                  <div className="f-ad-target">/quiz?thema=...</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Arrow />

        {/* ── 2. QUIZ ── */}
        <div className="f-section">
          <div className="f-section-header">
            <div className="f-section-num" style={{ background: "#9B7FBF" }}>2</div>
            <span className="f-section-title">Quiz → E-Mail → Ergebnis</span>
          </div>
          <p className="f-section-desc">5 Fragen, E-Mail-Eingabe, personalisiertes Ergebnis mit Produktempfehlung.</p>

          <div className="f-tabs">
            {quizResults.map((qr, i) => (
              <button
                key={qr.letter}
                className={`f-tab ${i === activeResult ? "f-tab-active" : "f-tab-inactive"}`}
                style={i === activeResult ? { background: qr.color } : {}}
                onClick={() => setActiveResult(i)}
              >
                {qr.letter}: {qr.label}
              </button>
            ))}
          </div>

          <div className="f-quiz-result" style={{ borderColor: r.color }}>
            <div className="f-quiz-letter" style={{ color: r.color }}>{r.letter}</div>
            <div className="f-quiz-label">{r.label}</div>
            <div className="f-quiz-rec">
              <strong>Tripwire:</strong> {products[r.tripwire].name} ({products[r.tripwire].price})
            </div>
            <div className="f-quiz-rec">
              <strong>Core Offer:</strong> {products[r.core].name} ({products[r.core].price})
            </div>
          </div>
        </div>

        <Arrow />

        {/* ── 3. TRIPWIRE ── */}
        <div className="f-section">
          <div className="f-section-header">
            <div className="f-section-num" style={{ background: "#E8B84D" }}>3</div>
            <span className="f-section-title">Tripwire-Angebot</span>
          </div>
          <p className="f-section-desc">Günstiger Einstieg auf der Quiz-Ergebnisseite. Baut Kaufvertrauen auf.</p>

          <div className="f-flow">
            <div className="f-flow-step">
              <div className="f-flow-line">
                <div className="f-flow-dot" style={{ borderColor: "#E8B84D" }} />
                <div className="f-flow-connector" style={{ background: "#E8B84D30" }} />
              </div>
              <div className="f-flow-content">
                <div className="f-flow-label" style={{ color: "#C49030" }}>Ergebnisseite</div>
                <div className="f-flow-card">
                  <h4>Sofort loslegen?</h4>
                  <p>Passender Leitfaden zum Quiz-Ergebnis als sofortige Lösung.<br />Preis: 10,99–14,99€</p>
                  <div className="f-branch">
                    <div className="f-branch-yes">
                      <div className="f-branch-label" style={{ color: "#3D7A50" }}>→ Kauft</div>
                      <div className="f-branch-text">Weiter zum Checkout mit Order Bump</div>
                    </div>
                    <div className="f-branch-no">
                      <div className="f-branch-label" style={{ color: "#C4707E" }}>→ Kauft nicht</div>
                      <div className="f-branch-text">E-Mail-Sequenz startet (Tag 1, 3, 5, 7...)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Arrow />

        {/* ── 4. ORDER BUMPS ── */}
        <div className="f-section">
          <div className="f-section-header">
            <div className="f-section-num" style={{ background: "#C49030" }}>4</div>
            <span className="f-section-title">Order Bumps im Checkout</span>
          </div>
          <p className="f-section-desc">Checkbox-Angebote direkt auf der Checkout-Seite, vor der Zahlung.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {orderBumps.map((b, i) => (
              <div key={i} className="f-bump">
                <div className="f-bump-check" />
                <div>
                  <div className="f-bump-text">{b.offer} — <strong>{b.price}</strong></div>
                  <div className="f-bump-when">Wenn: {b.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Arrow />

        {/* ── 5. CHECKOUT ── */}
        <div className="f-section">
          <div className="f-section-header">
            <div className="f-section-num" style={{ background: "#3D7A50" }}>5</div>
            <span className="f-section-title">Checkout → Zahlung</span>
          </div>
          <p className="f-section-desc">Stripe Checkout (Kreditkarte, Apple/Google Pay, SEPA, Klarna) + PayPal.</p>

          <div className="f-card" style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <div className="f-product"><div className="f-product-dot" style={{ background: "#635BFF" }} /> Stripe Checkout</div>
              <div className="f-product"><div className="f-product-dot" style={{ background: "#003087" }} /> PayPal</div>
            </div>
            <p style={{ fontSize: 13, color: "#666", marginTop: 12 }}>Kreditkarte · Apple Pay · Google Pay · SEPA · Klarna · PayPal</p>
          </div>
        </div>

        <Arrow />

        {/* ── 6. POST-PURCHASE UPSELL ── */}
        <div className="f-section">
          <div className="f-section-header">
            <div className="f-section-num" style={{ background: "#C4707E" }}>6</div>
            <span className="f-section-title">Post-Purchase Upsell → Downsell</span>
          </div>
          <p className="f-section-desc">Direkt nach der Zahlung: One-Time-Offer. Bei Ablehnung: günstigere Alternative.</p>

          <div className="f-flow">
            <div className="f-flow-step">
              <div className="f-flow-line">
                <div className="f-flow-dot" style={{ borderColor: "#E8A0B0" }} />
                <div className="f-flow-connector" style={{ background: "#E8A0B030" }} />
              </div>
              <div className="f-flow-content">
                <div className="f-flow-label" style={{ color: "#C4707E" }}>Upsell-Seite</div>
                <div className="f-flow-card">
                  <h4>Exklusiv nur jetzt!</h4>
                  <p>Passendes Upgrade basierend auf dem Kauf. Bundle-aware: kein Doppelverkauf, dynamischer Aufpreis.</p>
                  <div className="f-branch">
                    <div className="f-branch-yes">
                      <div className="f-branch-label" style={{ color: "#3D7A50" }}>Ja, upgraden!</div>
                      <div className="f-branch-text">
                        Leitfaden gekauft → Buch für 14,90€<br />
                        Buch gekauft → Bundle für 7,09€ Aufpreis<br />
                        Bundle gekauft → Gefühlskompass
                      </div>
                    </div>
                    <div className="f-branch-no">
                      <div className="f-branch-label" style={{ color: "#C4707E" }}>Nein danke</div>
                      <div className="f-branch-text">
                        <strong>Downsell:</strong><br />
                        „Wie wäre es mit dem Memory-Spiel für 14,99€?"<br />
                        Günstigere Alternative anbieten.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="f-flow-step">
              <div className="f-flow-line">
                <div className="f-flow-dot" style={{ borderColor: "#5A9E6E" }} />
                <div className="f-flow-connector" style={{ background: "#5A9E6E30" }} />
              </div>
              <div className="f-flow-content">
                <div className="f-flow-label" style={{ color: "#3D7A50" }}>Erfolgsseite</div>
                <div className="f-flow-card">
                  <h4>Danke für deine Bestellung!</h4>
                  <p>Bestellbestätigung + Download-Button für digitale Produkte + E-Mail-Sequenz wird gestartet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Arrow />

        {/* ── 7. BUNDLE LOGIC ── */}
        <div className="f-section">
          <div className="f-section-header">
            <div className="f-section-num" style={{ background: "#5A9E6E" }}>7</div>
            <span className="f-section-title">Bundle-Aware Upsell-Logik</span>
          </div>
          <p className="f-section-desc">Kein Produkt doppelt verkaufen! Dynamische Aufpreis-Berechnung.</p>

          <div className="f-card">
            <h4 style={{ fontFamily: "Caveat, cursive", fontSize: 22, marginBottom: 12 }}>&quot;Emotionen Entdecken&quot; Bundle — 24,99€</h4>
            <div className="f-bundle-contains">
              <span className="f-bundle-item">📖 Buch &quot;Was fühlst du?&quot; (17,90€)</span>
              <span className="f-bundle-item">📄 Leitfaden emot. Entwicklung (10,99€)</span>
            </div>
            <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
              <strong>Aufpreis wenn Buch schon gekauft:</strong> nur 7,09€ (statt 24,99€)
            </div>
          </div>

          <div className="f-card" style={{ marginTop: 12 }}>
            <h4 style={{ fontFamily: "Caveat, cursive", fontSize: 22, marginBottom: 12 }}>Gefühlskompass Bundle — 45,99€</h4>
            <div className="f-bundle-contains">
              <span className="f-bundle-item">📖 Buch (17,90€)</span>
              <span className="f-bundle-item">🃏 Memory Teil 1 (14,99€)</span>
              <span className="f-bundle-item">🃏 Memory Teil 2 (19,99€)</span>
              <span className="f-bundle-item">📄 Leitfaden emot. Entw. (10,99€)</span>
            </div>
            <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
              <strong>Aufpreis wenn Buch schon gekauft:</strong> 28,09€<br />
              <strong>Aufpreis wenn Buch + Leitfaden:</strong> 18,10€<br />
              <strong>Einzelwert:</strong> 63,87€ → <strong style={{ color: "#3D7A50" }}>Spare 37%</strong>
            </div>
          </div>
        </div>

        <Arrow />

        {/* ── 8. EMAIL SEQUENCES ── */}
        <div className="f-section">
          <div className="f-section-header">
            <div className="f-section-num" style={{ background: "#E8A0B0" }}>8</div>
            <span className="f-section-title">E-Mail-Sequenzen (DigiLetter)</span>
          </div>
          <p className="f-section-desc">Automatisierte E-Mail-Ketten nach Quiz, Kauf und Warenkorbabbruch.</p>

          {emailSequences.map((seq) => (
            <div key={seq.name} className="f-email-seq" style={{ background: seq.color + "08", border: `1px solid ${seq.color}15` }}>
              <div className="f-email-name" style={{ color: seq.color }}>{seq.name}</div>
              {seq.steps.map((step, i) => (
                <div key={i} className="f-email-step">
                  <div className="f-email-day" style={{ color: seq.color }}>{step.day}</div>
                  <div className="f-email-subject">{step.subject}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <Arrow />

        {/* ── 9. VALUE LADDER ── */}
        <div className="f-section">
          <div className="f-section-header">
            <div className="f-section-num" style={{ background: "#1A1A1A" }}>9</div>
            <span className="f-section-title">Value Ladder — Gesamtübersicht</span>
          </div>

          <div className="f-ladder">
            <div className="f-ladder-step" style={{ background: "#1A1A1A15", color: "#1A1A1A", maxWidth: 500 }}>
              🚀 ZUKUNFT: App / Online-Kurs / 1:1 Beratung
              <div className="f-ladder-price">Backend Offer — höchster Wert</div>
            </div>
            <div className="f-ladder-arrow">↑</div>
            <div className="f-ladder-step" style={{ background: "#5A9E6E15", color: "#3D7A50", maxWidth: 540 }}>
              🎁 Gefühlskompass Bundle — 45,99€
              <div className="f-ladder-price">Profit Maximizer</div>
            </div>
            <div className="f-ladder-arrow">↑</div>
            <div className="f-ladder-step" style={{ background: "#5A9E6E10", color: "#3D7A50", maxWidth: 580 }}>
              📦 &quot;Emotionen Entdecken&quot; Bundle — 24,99€
              <div className="f-ladder-price">Upsell Bundle</div>
            </div>
            <div className="f-ladder-arrow">↑</div>
            <div className="f-ladder-step" style={{ background: "#E8A0B015", color: "#C4707E", maxWidth: 620 }}>
              📖 &quot;Was fühlst du?&quot; Buch — 17,90€
              <div className="f-ladder-price">Core Offer (Bestseller)</div>
            </div>
            <div className="f-ladder-arrow">↑</div>
            <div className="f-ladder-step" style={{ background: "#E8B84D15", color: "#C49030", maxWidth: 660 }}>
              📄 Leitfäden (E-Books) — 10,99–14,99€
              <div className="f-ladder-price">Tripwire</div>
            </div>
            <div className="f-ladder-arrow">↑</div>
            <div className="f-ladder-step" style={{ background: "#9B7FBF15", color: "#7B5FA0", maxWidth: 700 }}>
              🧠 Kostenloser Gefühls-Quiz
              <div className="f-ladder-price">Lead Magnet — Einstieg</div>
            </div>
          </div>
        </div>

        <div className="f-highlight">
          <p>
            <strong>Zahlungsmethoden:</strong> Stripe Checkout (Kreditkarte, Apple Pay, Google Pay, SEPA, Klarna) + PayPal<br />
            <strong>E-Mail-Tool:</strong> DigiLetter (eigenes Tool, Automation geplant)<br />
            <strong>Checkout-Typ:</strong> Stripe Checkout (gehostete Seite) — einfachste Integration
          </p>
        </div>

      </div>
    </>
  );
}
