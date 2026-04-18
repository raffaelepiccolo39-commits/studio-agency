import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route che riceve il form contatti e lo inoltra a:
 * 1. Gestionale PiraWeb (CRM - crea un deal)
 * 2. Formspree (backup email)
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, company, email, phone, service, budget, message } = body;

  if (!name || !email) {
    return NextResponse.json({ error: 'Nome e email obbligatori' }, { status: 400 });
  }

  const results = { gestionale: false, formspree: false };

  // 1. Invia al gestionale CRM
  try {
    const gestionaleRes = await fetch('https://gestionale.piraweb.it/api/webhook/contact-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        surname: company || '',
        email,
        phone: phone || '',
        service: [service, budget].filter(Boolean).join(' — '),
        message: message || '',
        api_key: process.env.GESTIONALE_WEBHOOK_KEY,
      }),
    });
    results.gestionale = gestionaleRes.ok;
  } catch {
    results.gestionale = false;
  }

  // 2. Invia a Formspree (backup email)
  try {
    const formspreeRes = await fetch('https://formspree.io/f/mbdaqvyj', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: name,
        azienda: company,
        email,
        telefono: phone,
        servizio: service,
        budget,
        messaggio: message,
      }),
    });
    results.formspree = formspreeRes.ok;
  } catch {
    results.formspree = false;
  }

  // Successo se almeno uno ha funzionato
  if (results.gestionale || results.formspree) {
    return NextResponse.json({ success: true, ...results });
  }

  return NextResponse.json({ error: 'Errore invio' }, { status: 500 });
}
