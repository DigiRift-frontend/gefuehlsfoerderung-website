import { dlSendMail } from "@/lib/digiletter";
import { tryAcquireFulfillment } from "@/lib/fulfillment-lock";
import { createDownloadToken } from "@/lib/download-token";
import {
  assetFileExists,
  getAssetsForProducts,
} from "@/lib/digital-assets";
import {
  customerOrderEmail,
  ownerOrderNotification,
  type DownloadLinkInfo,
  type EmailAddress,
  type OrderEmailItem,
} from "@/lib/order-emails";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
const NOTIFY_EMAIL = process.env.ORDER_NOTIFY_EMAIL ?? "";

export type FulfillmentInput = {
  provider: "klarna" | "paypal";
  providerOrderId: string;
  items: OrderEmailItem[]; // ohne Versandzeile
  shippingAmount: number; // Cent
  totalAmount: number; // Cent
  hasPhysical: boolean;
  productIds: string[];
  customerEmail?: string | null;
  customerFirstName?: string;
  customerName?: string;
  shippingAddress?: EmailAddress | null;
  billingAddress?: EmailAddress | null;
  captured: boolean;
  captureError?: string;
};

export type FulfillmentResult = {
  customerMailSent: boolean;
  ownerMailSent: boolean;
  downloadLinks: DownloadLinkInfo[];
  skippedDuplicate?: boolean;
};

// Zentrale Bestell-Abwicklung nach erfolgreicher Zahlung:
// 1. Download-Links für digitale Produkte erzeugen (signierte Tokens)
// 2. Bestellbestätigung an den Kunden senden
// 3. Interne Benachrichtigung an Ewelina senden (inkl. Warnungen)
// Fehler werden geloggt, aber nie geworfen — die Zahlung ist zu diesem
// Zeitpunkt bereits erfolgt, der Kunde darf keinen Fehler mehr sehen.
export async function fulfillOrder(
  input: FulfillmentInput
): Promise<FulfillmentResult> {
  const {
    provider,
    providerOrderId,
    items,
    shippingAmount,
    totalAmount,
    hasPhysical,
    productIds,
    customerEmail,
    customerFirstName,
    customerName,
    shippingAddress,
    billingAddress,
    captured,
    captureError,
  } = input;

  const orderRef = `${provider}:${providerOrderId}`;

  // Idempotenz: läuft das Fulfillment für diese Bestellung gerade schon /
  // lief es bereits (Webhook vs. synchroner Pfad vs. Seiten-Reload),
  // wird hier abgebrochen — keine doppelten Mails/Tokens.
  if (!tryAcquireFulfillment(orderRef)) {
    console.log(`Bestellung ${orderRef}: Fulfillment bereits gelaufen — übersprungen`);
    return {
      customerMailSent: false,
      ownerMailSent: false,
      downloadLinks: [],
      skippedDuplicate: true,
    };
  }

  // 1. Download-Links
  const assets = getAssetsForProducts(productIds);
  let downloadLinks: DownloadLinkInfo[] = [];
  if (assets.length) {
    try {
      const token = createDownloadToken(productIds, orderRef);
      downloadLinks = assets.map((asset) => ({
        label: asset.label,
        url: `${SITE_URL}/api/download/${token}?file=${encodeURIComponent(asset.fileName)}`,
        available: assetFileExists(asset),
      }));
    } catch (err) {
      console.error("Download-Token konnte nicht erzeugt werden:", err);
      downloadLinks = assets.map((asset) => ({
        label: asset.label,
        url: "",
        available: false,
      }));
    }
  }
  const missingAssets = downloadLinks
    .filter((d) => !d.available)
    .map((d) => d.label);

  // 2. Kundenmail
  let customerMailSent = false;
  if (customerEmail) {
    const mail = customerOrderEmail({
      firstName: customerFirstName,
      items,
      shippingAmount,
      totalAmount,
      hasPhysical,
      shippingAddress,
      downloadLinks,
      orderRef,
    });
    const result = await dlSendMail({
      to: customerEmail,
      subject: mail.subject,
      html: mail.html,
      replyTo: NOTIFY_EMAIL || undefined,
    });
    customerMailSent = result.ok;
  } else {
    console.error(`Bestellung ${orderRef}: keine Kunden-E-Mail bekannt`);
  }

  // 3. Interne Benachrichtigung
  let ownerMailSent = false;
  if (NOTIFY_EMAIL) {
    const mail = ownerOrderNotification({
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
    });
    const result = await dlSendMail({
      to: NOTIFY_EMAIL,
      subject: mail.subject,
      html: mail.html,
      replyTo: customerEmail || undefined,
    });
    ownerMailSent = result.ok;
  } else {
    console.error("ORDER_NOTIFY_EMAIL nicht gesetzt — keine interne Benachrichtigung");
  }

  console.log(
    `Bestellung ${orderRef}: captured=${captured} kundenmail=${customerMailSent} benachrichtigung=${ownerMailSent} downloads=${downloadLinks.length} fehlend=${missingAssets.length}`
  );

  return { customerMailSent, ownerMailSent, downloadLinks };
}
