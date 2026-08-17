import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 20

const MAX_BYTES = 4 * 1024 * 1024 // 4 MB (limite payload serverless)

// Neutralizza anche le virgolette: senza, un'email costruita ad arte esce
// dall'attributo href del mailto e inietta markup nella mail che leggiamo noi.
function esc(s: string) {
  return String(s).replace(/[<>&"']/g, (c) => (
    { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c] as string
  ))
}

/**
 * Riconosce il tipo di file dai primi byte invece che dall'etichetta dichiarata
 * dal browser.
 *
 * Il controllo su `file.type` era aggirabile — mandando un tipo vuoto veniva
 * saltato del tutto — ma non si può nemmeno irrigidirlo: alcuni browser
 * spediscono i .doc senza tipo o come octet-stream, e si scarterebbero
 * candidature vere. I primi byte, invece, non mentono.
 */
function contienePdf(buf: Buffer): boolean {
  // Lo standard vuole "%PDF" all'inizio, ma in circolazione ci sono file con
  // qualche byte spurio davanti che i lettori accettano lo stesso: cerchiamo
  // nel primo kilobyte invece di pretenderlo alla posizione zero, per non
  // scartare candidature valide.
  return buf.subarray(0, 1024).toString('latin1').includes('%PDF')
}

function formatoRiconosciuto(buf: Buffer): boolean {
  if (buf.length < 4) return false
  if (contienePdf(buf)) return true
  // PK.. → zip, cioè .docx (e tutti gli Office moderni)
  if (buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04) return true
  // D0 CF 11 E0 → vecchio formato Office, .doc
  if (buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0) return true
  return false
}

/** Nome file generato da noi: quello caricato non viene mai riusato. */
function nomeAllegato(nome: string, cognome: string, buf: Buffer): string {
  const pulito = `${nome}-${cognome}`
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // via gli accenti separati dalla normalize
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 60)
  const estensione = contienePdf(buf) ? 'pdf' : 'doc'
  return `cv-${pulito || 'candidato'}.${estensione}`
}

export async function POST(request: NextRequest) {
  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 })
  }

  // NB: rimosso il blocco honeypot `_gotcha`: l'autofill del browser riempiva il
  // campo nascosto e le candidature reali venivano scartate in silenzio.

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
      const buf = Buffer.from(await file.arrayBuffer())
      if (!formatoRiconosciuto(buf)) {
        return NextResponse.json({ error: 'Formato non valido (PDF o Word)' }, { status: 400 })
      }
      attachments.push({
        filename: nomeAllegato(nome, cognome, buf),
        content: buf.toString('base64'),
      })
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
        <tr><td style="padding:4px 16px 4px 0;color:#6a6a6a">Email</td><td><a href="mailto:${encodeURIComponent(email)}">${esc(email)}</a></td></tr>
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
