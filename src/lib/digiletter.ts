// Server-seitiger DigiLetter-Client (Newsletter-/E-Mail-Infrastruktur).
// Alle Funktionen sind fail-safe: Fehlt die Konfiguration oder ist der
// Dienst nicht erreichbar, wird geloggt und { ok: false } zurückgegeben —
// die Website bricht dadurch nie ab.

const API_URL = process.env.DIGILETTER_API_URL ?? "";
const API_KEY = process.env.DIGILETTER_API_KEY ?? "";

export const DIGILETTER_LISTS = {
  newsletter: process.env.DIGILETTER_LIST_NEWSLETTER ?? "",
  quiz: process.env.DIGILETTER_LIST_QUIZ ?? "",
};

type DlResult = { ok: boolean; status?: number; data?: unknown };

async function dlFetch(path: string, body: unknown): Promise<DlResult> {
  if (!API_URL || !API_KEY) {
    console.warn(`DigiLetter nicht konfiguriert — ${path} übersprungen`);
    return { ok: false };
  }

  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15_000),
    });

    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      // leerer Body ist ok
    }

    if (!res.ok) {
      console.error(`DigiLetter ${path} [${res.status}]:`, JSON.stringify(data).slice(0, 500));
    }
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    console.error(`DigiLetter ${path} nicht erreichbar:`, err);
    return { ok: false };
  }
}

// Double-Opt-in-Anmeldung. Tags steuern das DOI-Template
// ("gefuehlsfoerderung" matcht das Branding-Template).
export function dlSubscribe(options: {
  email: string;
  firstName?: string;
  listId?: string;
  tags?: string[];
  redirectUrl?: string;
}): Promise<DlResult> {
  const { email, firstName, listId, tags, redirectUrl } = options;
  return dlFetch("/api/v1/subscribe", {
    email,
    firstName: firstName || undefined,
    listId: listId || undefined,
    tags: tags?.length ? tags : undefined,
    redirectUrl: redirectUrl || undefined,
  });
}

// Transaktionale Mail (Bestellbestätigung, Kontaktformular, ...).
export function dlSendMail(options: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  fromName?: string;
}): Promise<DlResult> {
  return dlFetch("/api/v1/transactional", {
    ...options,
    fromName: options.fromName ?? "Gefühlsförderung von Ewelina Gawlik",
  });
}
