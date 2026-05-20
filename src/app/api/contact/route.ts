import { NextRequest, NextResponse } from 'next/server';

const FORMSPREE_IDS = {
  contact: 'xlgwaygp',
  consulenza: 'mbdaqvyj',
} as const;

type FormType = keyof typeof FORMSPREE_IDS;

function isFormType(v: unknown): v is FormType {
  return typeof v === 'string' && v in FORMSPREE_IDS;
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

  const results = { gestionale: false, formspree: false };

  try {
    const gestionaleRes = await fetch('https://gestionale.piraweb.it/api/webhook/contact-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        surname: surname || company || '',
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

  if (results.gestionale || results.formspree) {
    return NextResponse.json({ success: true, ...results });
  }

  return NextResponse.json({ error: 'Errore invio' }, { status: 500 });
}
