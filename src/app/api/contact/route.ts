import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const FORMSPREE_IDS = {
  contact: 'xlgwaygp',
  consulenza: 'mbdaqvyj',
} as const;

type FormType = keyof typeof FORMSPREE_IDS;

function isFormType(v: unknown): v is FormType {
  return typeof v === 'string' && v in FORMSPREE_IDS;
}

function esc(s: string) {
  return String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    name, surname, company, email, phone,
    service, budget, message, formType, _gotcha,
  } = body;

  if (_gotcha) return NextResponse.json({ success: true });

  if (!name || !email) {
    return NextResponse.json({ error: 'Nome e email obbligatori' }, { status: 400 });
  }

  const type: FormType = isFormType(formType) ? formType : 'consulenza';
  const formspreeId = FORMSPREE_IDS[type];
  const fullName = [name, surname].filter(Boolean).join(' ');
  const servicePieces = [service, budget].filter(Boolean).join(' — ');

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
    const html = `
      <div style="font-family:Arial,sans-serif;font-size:15px;color:#0a0a0a;line-height:1.6">
        <h2 style="margin:0 0 16px">Nuova richiesta dal sito — ${type === 'contact' ? 'Contatti' : 'Consulenza'}</h2>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
          ${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#6a6a6a">${k}</td><td><strong>${esc(v)}</strong></td></tr>`).join('')}
        </table>
        ${message ? `<p style="margin:16px 0 0"><strong>Messaggio:</strong><br>${esc(message).replace(/\n/g, '<br>')}</p>` : ''}
      </div>`;
    const payload = JSON.stringify({
      from: process.env.RESEND_FROM || 'Pira Web <onboarding@resend.dev>',
      to: ['info@piraweb.it'],
      reply_to: email,
      subject: `Nuova richiesta — ${type === 'contact' ? 'Contatti' : 'Consulenza'} — ${fullName}`,
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

  // 2) Gestionale — entra come lead nel CRM
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
        message: message || '',
        api_key: process.env.GESTIONALE_WEBHOOK_KEY,
      }),
    });
    results.gestionale = gestionaleRes.ok;
  } catch {
    results.gestionale = false;
  }

  // 3) Formspree — fallback, sempre attivo
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
      }),
    });
    results.formspree = formspreeRes.ok;
  } catch {
    results.formspree = false;
  }

  if (results.resend || results.gestionale || results.formspree) {
    return NextResponse.json({ success: true, ...results });
  }

  return NextResponse.json({ error: 'Errore invio' }, { status: 500 });
}
