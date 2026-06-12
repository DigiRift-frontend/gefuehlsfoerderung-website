// HTML-E-Mail-Templates für Bestellbestätigung + interne Benachrichtigung.
// Bewusst tabellenbasiert + Inline-CSS (E-Mail-Client-Kompatibilität).

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export type EmailAddress = {
  name?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  country?: string;
};

export type OrderEmailItem = {
  title: string;
  quantity: number;
  totalAmount: number; // Cent
};

export type DownloadLinkInfo = {
  label: string;
  url: string;
  available: boolean;
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function euro(cents: number): string {
  return (cents / 100).toFixed(2).replace(".", ",") + " €";
}

function shell(content: string, preheader: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#FBF7F0;">
<div style="display:none;max-height:0;overflow:hidden;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FBF7F0;padding:24px 0;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="padding:24px 32px 8px 32px;text-align:center;">
  <span style="font-family:'Segoe Script','Bradley Hand',cursive;font-size:26px;color:#8B7BC7;font-weight:bold;">Gef&uuml;hlsf&ouml;rderung</span><br>
  <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;color:#9C8F80;text-transform:uppercase;">von Ewelina Gawlik</span>
</td></tr>
<tr><td style="padding:16px 24px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;border:1px solid #EDE6F7;">
  <tr><td style="padding:36px 40px;font-family:Arial,Helvetica,sans-serif;color:#3D3A36;">
${content}
  </td></tr>
  </table>
</td></tr>
<tr><td style="padding:8px 32px 28px 32px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.7;color:#9C8F80;">
  Gef&uuml;hlsf&ouml;rderung von Ewelina Gawlik &middot; Liegnitzerstr. 23 &middot; 57290 Neunkirchen<br>
  Fragen? Antworte einfach auf diese E-Mail.
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function itemRows(items: OrderEmailItem[]): string {
  return items
    .map(
      (item) => `<tr>
<td style="padding:8px 0;font-size:14px;color:#3D3A36;border-bottom:1px solid #F3EDE4;">${item.quantity}&times; ${esc(item.title)}</td>
<td style="padding:8px 0;font-size:14px;color:#3D3A36;border-bottom:1px solid #F3EDE4;text-align:right;white-space:nowrap;">${euro(item.totalAmount)}</td>
</tr>`
    )
    .join("\n");
}

function addressBlock(address: EmailAddress | null | undefined): string {
  if (!address || (!address.street && !address.city)) return "";
  const lines = [
    address.name,
    address.street,
    [address.postalCode, address.city].filter(Boolean).join(" "),
    address.country,
  ]
    .filter(Boolean)
    .map((l) => esc(l as string))
    .join("<br>");
  return `<p style="margin:18px 0 0 0;font-size:13px;line-height:1.6;color:#6B6258;"><strong style="color:#3D3A36;">Lieferadresse</strong><br>${lines}</p>`;
}

export function customerOrderEmail(options: {
  firstName?: string;
  items: OrderEmailItem[];
  shippingAmount: number;
  totalAmount: number;
  hasPhysical: boolean;
  shippingAddress?: EmailAddress | null;
  downloadLinks: DownloadLinkInfo[];
  orderRef: string;
}): { subject: string; html: string } {
  const {
    firstName,
    items,
    shippingAmount,
    totalAmount,
    hasPhysical,
    shippingAddress,
    downloadLinks,
    orderRef,
  } = options;

  const availableDownloads = downloadLinks.filter((d) => d.available);
  const pendingDownloads = downloadLinks.filter((d) => !d.available);

  const downloadSection = availableDownloads.length
    ? `<h2 style="margin:26px 0 10px 0;font-size:16px;color:#3D3A36;">Deine Downloads</h2>
${availableDownloads
  .map(
    (d) => `<p style="margin:0 0 10px 0;">
<a href="${d.url}" style="display:inline-block;padding:11px 22px;background-color:#8B7BC7;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;border-radius:12px;">${esc(d.label)} herunterladen</a>
</p>`
  )
  .join("\n")}
<p style="margin:6px 0 0 0;font-size:12px;color:#9C8F80;">Die Download-Links sind 30 Tage g&uuml;ltig. Speichere dir die Dateien am besten direkt ab.</p>`
    : "";

  const pendingSection = pendingDownloads.length
    ? `<p style="margin:18px 0 0 0;font-size:13px;line-height:1.6;color:#6B6258;">${pendingDownloads
        .map((d) => esc(d.label))
        .join(", ")}: Du erh&auml;ltst deinen Download in K&uuml;rze in einer separaten E-Mail.</p>`
    : "";

  const shippingNote = hasPhysical
    ? `<p style="margin:18px 0 0 0;font-size:13px;line-height:1.6;color:#6B6258;">Deine physischen Produkte werden innerhalb von 2&ndash;5 Werktagen versandt.</p>`
    : "";

  const widerrufNote = `<p style="margin:18px 0 0 0;font-size:13px;line-height:1.6;color:#6B6258;"><strong style="color:#3D3A36;">Widerrufsrecht</strong><br>Du hast das Recht, deine Bestellung binnen 14 Tagen ab Erhalt der Ware ohne Angabe von Gr&uuml;nden zu widerrufen (Widerruf an <a href="mailto:mail@ewelinagawlik.de" style="color:#8B7BC7;">mail@ewelinagawlik.de</a>). Bei digitalen Inhalten ist das Widerrufsrecht gem&auml;&szlig; deiner ausdr&uuml;cklichen Zustimmung im Bestellprozess mit Bereitstellung des Downloads erloschen (&sect;356 Abs. 5 BGB). Die vollst&auml;ndige Widerrufsbelehrung inkl. Muster-Widerrufsformular findest du unter <a href="${SITE_URL}/agb#widerruf" style="color:#8B7BC7;">${SITE_URL}/agb#widerruf</a>.</p>`;

  const content = `<h1 style="margin:0 0 16px 0;font-size:22px;line-height:1.35;">Danke f&uuml;r deine Bestellung!</h1>
<p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;">Hallo${firstName ? " " + esc(firstName) : ""},</p>
<p style="margin:0 0 22px 0;font-size:15px;line-height:1.6;">deine Bestellung ist eingegangen und die Zahlung wurde best&auml;tigt. Hier die &Uuml;bersicht:</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${itemRows(items)}
${
  shippingAmount > 0
    ? `<tr><td style="padding:8px 0;font-size:14px;color:#6B6258;border-bottom:1px solid #F3EDE4;">Versand</td><td style="padding:8px 0;font-size:14px;color:#6B6258;border-bottom:1px solid #F3EDE4;text-align:right;">${euro(shippingAmount)}</td></tr>`
    : ""
}
<tr><td style="padding:12px 0;font-size:15px;font-weight:bold;">Gesamt</td><td style="padding:12px 0;font-size:15px;font-weight:bold;text-align:right;">${euro(totalAmount)}</td></tr>
</table>
<p style="margin:4px 0 0 0;font-size:11px;color:#9C8F80;">Kein MwSt-Ausweis, Kleinunternehmer gem. &sect;19 UStG. Bestellnummer: ${esc(orderRef)}</p>
${downloadSection}
${pendingSection}
${shippingNote}
${widerrufNote}
${addressBlock(shippingAddress)}
<p style="margin:26px 0 0 0;font-size:15px;line-height:1.6;">Herzliche Gr&uuml;&szlig;e<br>Ewelina</p>`;

  return {
    subject: `Deine Bestellung bei Gefühlsförderung (${orderRef})`,
    html: shell(content, "Deine Bestellung ist eingegangen — alle Details und Downloads."),
  };
}

export function ownerOrderNotification(options: {
  provider: string;
  providerOrderId: string;
  captured: boolean;
  captureError?: string;
  customerEmail?: string | null;
  customerName?: string;
  items: OrderEmailItem[];
  shippingAmount: number;
  totalAmount: number;
  hasPhysical: boolean;
  shippingAddress?: EmailAddress | null;
  billingAddress?: EmailAddress | null;
  missingAssets: string[];
  customerMailSent: boolean;
}): { subject: string; html: string } {
  const {
    provider,
    providerOrderId,
    captured,
    captureError,
    customerEmail,
    customerName,
    items,
    shippingAmount,
    totalAmount,
    hasPhysical,
    shippingAddress,
    billingAddress,
    missingAssets,
    customerMailSent,
  } = options;

  const warnings: string[] = [];
  if (!captured) {
    warnings.push(
      `Zahlung wurde NICHT automatisch eingezogen${captureError ? ` (${esc(captureError)})` : ""} — bitte im ${provider === "klarna" ? "Klarna" : "PayPal"}-Portal manuell pr&uuml;fen/einziehen!`
    );
  }
  if (missingAssets.length) {
    warnings.push(
      `Digitale Produkte ohne hinterlegte Datei — bitte MANUELL an den Kunden senden: ${missingAssets.map(esc).join(", ")}`
    );
  }
  if (!customerMailSent) {
    warnings.push(
      "Bestellbest&auml;tigung an den Kunden konnte NICHT gesendet werden — bitte manuell best&auml;tigen."
    );
  }

  const warningBlock = warnings.length
    ? `<div style="margin:0 0 20px 0;padding:14px 16px;background-color:#FDECEC;border:1px solid #F5C2C0;border-radius:10px;">
${warnings.map((w) => `<p style="margin:0 0 6px 0;font-size:13px;line-height:1.5;color:#A33B36;font-weight:bold;">⚠ ${w}</p>`).join("\n")}
</div>`
    : "";

  const content = `<h1 style="margin:0 0 16px 0;font-size:20px;">Neue Bestellung &uuml;ber ${euro(totalAmount)} 🎉</h1>
${warningBlock}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${itemRows(items)}
${
  shippingAmount > 0
    ? `<tr><td style="padding:8px 0;font-size:14px;color:#6B6258;">Versand</td><td style="padding:8px 0;font-size:14px;color:#6B6258;text-align:right;">${euro(shippingAmount)}</td></tr>`
    : ""
}
<tr><td style="padding:12px 0;font-size:15px;font-weight:bold;">Gesamt</td><td style="padding:12px 0;font-size:15px;font-weight:bold;text-align:right;">${euro(totalAmount)}</td></tr>
</table>
<p style="margin:16px 0 0 0;font-size:13px;line-height:1.7;color:#6B6258;">
<strong style="color:#3D3A36;">Zahlung:</strong> ${esc(provider)} ${captured ? "(eingezogen ✓)" : "(NICHT eingezogen!)"}<br>
<strong style="color:#3D3A36;">Referenz:</strong> ${esc(providerOrderId)}<br>
<strong style="color:#3D3A36;">Kunde:</strong> ${esc(customerName || "—")} &lt;${esc(customerEmail || "unbekannt")}&gt;<br>
<strong style="color:#3D3A36;">Versand n&ouml;tig:</strong> ${hasPhysical ? "JA — bitte Paket packen" : "nein (nur digital)"}
</p>
${addressBlock(shippingAddress)}
${!shippingAddress && billingAddress ? addressBlock(billingAddress).replace("Lieferadresse", "Rechnungsadresse") : ""}`;

  return {
    subject: `🛒 Neue Bestellung: ${euro(totalAmount)} (${provider} ${providerOrderId})`,
    html: shell(content, `Neue Bestellung über ${euro(totalAmount)}`),
  };
}
