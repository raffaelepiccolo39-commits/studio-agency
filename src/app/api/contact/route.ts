import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const FORMSPREE_IDS = {
  contact: 'xlgwaygp',
  consulenza: 'mbdaqvyj',
  // Il questionario riusa la casella Formspree della consulenza: è solo la copia
  // di riserva, l'oggetto lo distingue comunque.
  questionario: 'mbdaqvyj',
} as const;

const ETICHETTE = {
  contact: 'Contatti',
  consulenza: 'Consulenza',
  questionario: 'Questionario',
} as const;

type FormType = keyof typeof FORMSPREE_IDS;

function isFormType(v: unknown): v is FormType {
  return typeof v === 'string' && v in FORMSPREE_IDS;
}

function esc(s: string) {
  return String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));
}

const EMAIL_VALIDA = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Tetti di lunghezza per campo. Servono a impedire che una richiesta gonfiata
// riempia la casella o il CRM, non a giudicare cosa scrive chi ci contatta.
// ⚠️ `message` è alto di proposito: il questionario ci infila TUTTE le risposte
// concatenate (vedi QuestionarioForm), un limite basso spezzerebbe quel form.
const TETTI: Record<string, number> = {
  name: 120, surname: 120, company: 200, email: 254, phone: 40,
  service: 200, budget: 100, esito: 40, message: 8000,
};

type EsitoCampo = { ok: true; valore: string } | { ok: false; errore: string };

/** Ripulisce un campo e ne verifica tipo e lunghezza. */
function campo(valore: unknown, chiave: string): EsitoCampo {
  if (valore === undefined || valore === null) return { ok: true, valore: '' };
  if (typeof valore !== 'string') {
    return { ok: false, errore: `Il campo ${chiave} non è valido` };
  }
  const pulito = valore.trim();
  if (pulito.length > TETTI[chiave]) {
    return { ok: false, errore: `Il campo ${chiave} è troppo lungo` };
  }
  return { ok: true, valore: pulito };
}

export async function POST(request: NextRequest) {
  // Un corpo malformato deve dare 400, non un errore del server.
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 });
  }

  // Validazione PRIMA di qualunque chiamata verso l'esterno: niente mail,
  // niente lead nel CRM e niente copia su Formspree finché i dati non reggono.
  const campi: Record<string, string> = {};
  for (const chiave of Object.keys(TETTI)) {
    const esito = campo(body[chiave], chiave);
    if (!esito.ok) {
      return NextResponse.json({ error: esito.errore }, { status: 400 });
    }
    campi[chiave] = esito.valore;
  }

  const { name, surname, company, email, phone, service, budget, message, esito } = campi;
  const { formType, source } = body;

  // Fonte del lead: 'ads' = landing ADV, 'website' = form del sito (default)
  const leadSource = source === 'ads' ? 'ads' : 'website';
  const sourceLabel = leadSource === 'ads' ? 'ADV' : 'Sito';

  // NB: rimosso il blocco honeypot `_gotcha`: l'autofill del browser riempiva il
  // campo nascosto e gli invii reali venivano scartati in silenzio (falso verde).

  if (!name || !email) {
    return NextResponse.json({ error: 'Nome e email obbligatori' }, { status: 400 });
  }
  // L'email finisce in reply_to: se è malformata, rispondere al lead diventa
  // impossibile. La stessa regola è già in uso su /api/candidatura.
  if (!EMAIL_VALIDA.test(email)) {
    return NextResponse.json({ error: 'Email non valida' }, { status: 400 });
  }

  const type: FormType = isFormType(formType) ? formType : 'consulenza';
  const formspreeId = FORMSPREE_IDS[type];
  const etichetta = ETICHETTE[type];
  const fullName = [name, surname].filter(Boolean).join(' ');
  const servicePieces = [service, budget].filter(Boolean).join(' — ');
  // Esito della qualificazione (solo questionario): finisce nell'oggetto della
  // mail e nella nota del CRM, così i fuori target si riconoscono a colpo d'occhio.
  const esitoLabel = esito;

  const results = { resend: false, gestionale: false, formspree: false };

  // 1) Resend — canale primario verso info@piraweb.it (dominio verificato)
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const rows: [string, string][] = [
      ['Nome', fullName],
      ['Email', email],
      ['Telefono', phone || '—'],
      ['Azienda', company || '—'],
      ['Servizio', servicePieces || '—'],
    ];
    if (esitoLabel) rows.push(['Esito', esitoLabel]);
    const html = `
      <div style="font-family:Arial,sans-serif;font-size:15px;color:#0a0a0a;line-height:1.6">
        <h2 style="margin:0 0 16px">Nuova richiesta dal sito — ${etichetta}</h2>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
          ${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#6a6a6a">${k}</td><td><strong>${esc(v)}</strong></td></tr>`).join('')}
        </table>
        ${message ? `<p style="margin:16px 0 0"><strong>Messaggio:</strong><br>${esc(message).replace(/\n/g, '<br>')}</p>` : ''}
      </div>`;
    const payload = JSON.stringify({
      from: process.env.RESEND_FROM || 'Pira Web <onboarding@resend.dev>',
      to: ['info@piraweb.it'],
      reply_to: email,
      subject: `[${sourceLabel}] Nuova richiesta — ${etichetta}${esitoLabel ? ` (${esitoLabel})` : ''} — ${fullName}`,
      html,
    });
    // Fino a 2 tentativi: gestisce blip/rate-limit (429) o errori 5xx transitori di Resend
    for (let attempt = 1; attempt <= 2 && !results.resend; attempt++) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: payload,
        });
        results.resend = res.ok;
        if (!res.ok) {
          const errBody = await res.text().catch(() => '');
          console.error(`[contact] Resend FALLITO (tentativo ${attempt}) status=${res.status} body=${errBody}`);
          if (attempt < 2) await new Promise((r) => setTimeout(r, 700));
        }
      } catch (e) {
        console.error(`[contact] Resend ECCEZIONE (tentativo ${attempt}):`, e);
        if (attempt < 2) await new Promise((r) => setTimeout(r, 700));
      }
    }
  }

  // 2) Formspree — copia di riserva, sempre attiva: serve a non perdere mai la
  //    richiesta, quindi parte anche quando Resend ha fallito.
  try {
    const formspreeRes = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: name,
        cognome: surname || '',
        azienda: company || '',
        email,
        telefono: phone || '',
        servizio: service || '',
        budget: budget || '',
        messaggio: message || '',
        ...(esitoLabel ? { esito: esitoLabel } : {}),
        _subject: `${etichetta}${esitoLabel ? ` [${esitoLabel}]` : ''} — ${company || fullName}`,
      }),
    });
    results.formspree = formspreeRes.ok;
  } catch {
    results.formspree = false;
  }

  // "Verde solo se inviata davvero": il successo dipende dal canale che recapita
  // in casella. Resend è il primario (quando configurato); il gestionale è solo
  // CRM e Formspree è una copia best-effort, NON contano per la conferma all'utente.
  // Se Resend non è configurato, si ripiega su Formspree per non bloccare il form.
  const emailDelivered = apiKey ? results.resend : results.formspree;

  // 3) Gestionale — il lead entra nel CRM.
  //    Si scrive SOLO se la mail è partita davvero: se non è partita l'utente
  //    vede un errore e ricompila, e ogni tentativo lascerebbe un lead in più
  //    da ripulire a mano.
  if (emailDelivered) {
    const webhookKey = process.env.GESTIONALE_WEBHOOK_KEY;
    if (!webhookKey) {
      // Senza chiave il webhook risponde 401 e il lead non entra nel CRM, ma
      // l'utente vede comunque il verde: è un fallimento silenzioso, e deve
      // lasciare traccia nei log.
      console.error('[contact] GESTIONALE_WEBHOOK_KEY assente: il lead NON entrerà nel CRM');
    }
    try {
      const gestionaleRes = await fetch('https://gestionale.piraweb.it/api/webhook/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          surname: surname || company || '',
          email,
          phone: phone || '',
          service: servicePieces,
          message: [esitoLabel ? `[${etichetta} — ${esitoLabel}]` : '', message || '']
            .filter(Boolean)
            .join('\n\n'),
          source: leadSource,
          api_key: webhookKey,
        }),
      });
      results.gestionale = gestionaleRes.ok;
      if (!gestionaleRes.ok) {
        const errBody = await gestionaleRes.text().catch(() => '');
        console.error(`[contact] CRM RIFIUTATO status=${gestionaleRes.status} body=${errBody}`);
      }
    } catch (e) {
      results.gestionale = false;
      console.error('[contact] CRM ECCEZIONE:', e);
    }
  }

  if (emailDelivered) {
    // Al browser va solo l'esito: quale dei tre canali abbia funzionato è
    // informazione nostra, e sta nei log.
    return NextResponse.json({ success: true });
  }

  // Email non partita: niente finto successo. Il front-end mostra "scrivici a info@".
  console.error(`[contact] INVIO NON RIUSCITO — resend=${results.resend} formspree=${results.formspree} gestionale=${results.gestionale}`);
  return NextResponse.json({ error: 'Errore invio' }, { status: 500 });
}
