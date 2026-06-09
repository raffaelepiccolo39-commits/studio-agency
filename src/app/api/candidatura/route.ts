import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 20

const MAX_BYTES = 4 * 1024 * 1024 // 4 MB (limite payload serverless)
const ALLOWED = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

function esc(s: string) {
  return String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string))
}

export async function POST(request: NextRequest) {
  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 })
  }

  // Honeypot anti-spam
  if (form.get('_gotcha')) return NextResponse.json({ success: true })

  const nome = String(form.get('nome') || '').trim()
  const cognome = String(form.get('cognome') || '').trim()
  const email = String(form.get('email') || '').trim()
  const esperienza = String(form.get('esperienza') || '').trim()
  const messaggio = String(form.get('messaggio') || '').trim()
  const posizione = String(form.get('posizione') || 'Candidatura spontanea').trim()
  const cv = form.get('cv')

  if (!nome || !cognome || !email) {
    return NextResponse.json({ error: 'Nome, cognome ed email sono obbligatori' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email non valida' }, { status: 400 })
  }

  // Allegato CV (opzionale ma consigliato)
  const attachments: { filename: string; content: string }[] = []
  if (cv && typeof cv === 'object' && 'arrayBuffer' in cv) {
    const file = cv as File
    if (file.size > 0) {
      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: 'Il file supera i 4 MB' }, { status: 400 })
      }
      if (file.type && !ALLOWED.includes(file.type)) {
        return NextResponse.json({ error: 'Formato non valido (PDF o Word)' }, { status: 400 })
      }
      const buf = Buffer.from(await file.arrayBuffer())
      attachments.push({ filename: file.name || 'cv.pdf', content: buf.toString('base64') })
    }
  }

  // Fallback testuale (senza allegato) sul Formspree già attivo
  const sendFormspree = async () => {
    try {
      const r = await fetch('https://formspree.io/f/xlgwaygp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `Nuova candidatura — ${posizione} — ${nome} ${cognome}`,
          tipo: 'CANDIDATURA',
          nome,
          cognome,
          email,
          esperienza: esperienza || '—',
          posizione,
          messaggio: messaggio || '',
          nota_cv: attachments.length ? 'CV allegato presente (richiede Resend per ricezione)' : 'Nessun CV',
        }),
      })
      return r.ok
    } catch {
      return false
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    const ok = await sendFormspree()
    return ok
      ? NextResponse.json({ success: true, cv: false })
      : NextResponse.json({ error: 'Invio non riuscito' }, { status: 500 })
  }

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#0a0a0a;line-height:1.6">
      <h2 style="margin:0 0 16px">Nuova candidatura — ${esc(posizione)}</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        <tr><td style="padding:4px 16px 4px 0;color:#6a6a6a">Nome</td><td><strong>${esc(nome)} ${esc(cognome)}</strong></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6a6a6a">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6a6a6a">Esperienza</td><td>${esc(esperienza) || '—'}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6a6a6a">Posizione</td><td>${esc(posizione)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6a6a6a">CV allegato</td><td>${attachments.length ? 'Sì' : 'No'}</td></tr>
      </table>
      ${messaggio ? `<p style="margin:16px 0 0"><strong>Messaggio:</strong><br>${esc(messaggio).replace(/\n/g, '<br>')}</p>` : ''}
    </div>`

  const payload = JSON.stringify({
    from: process.env.RESEND_FROM || 'Pira Web Candidature <onboarding@resend.dev>',
    to: ['info@piraweb.it'],
    reply_to: email,
    subject: `Nuova candidatura — ${posizione} — ${nome} ${cognome}`,
    html,
    attachments,
  })

  // Fino a 2 tentativi: gestisce blip/rate-limit (429) o 5xx transitori di Resend
  let resendOk = false
  for (let attempt = 1; attempt <= 2 && !resendOk; attempt++) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: payload,
      })
      resendOk = res.ok
      if (!res.ok) {
        const errBody = await res.text().catch(() => '')
        console.error(`[candidatura] Resend FALLITO (tentativo ${attempt}) status=${res.status} body=${errBody}`)
        if (attempt < 2) await new Promise((r) => setTimeout(r, 700))
      }
    } catch (e) {
      console.error(`[candidatura] Resend ECCEZIONE (tentativo ${attempt}):`, e)
      if (attempt < 2) await new Promise((r) => setTimeout(r, 700))
    }
  }

  if (resendOk) {
    return NextResponse.json({ success: true, cv: attachments.length > 0 })
  }

  // Resend KO dopo i tentativi → fallback testuale Formspree, così la candidatura non va persa
  const ok = await sendFormspree()
  return ok
    ? NextResponse.json({ success: true, cv: false })
    : NextResponse.json({ error: 'Invio non riuscito' }, { status: 502 })
}
