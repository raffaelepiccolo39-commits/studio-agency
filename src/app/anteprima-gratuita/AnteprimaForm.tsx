'use client'

import { useEffect, useRef, useState } from 'react'
import { trackLead } from '@/lib/gtag'
import { ORE_CONSEGNA } from './offerta'
import { passi, type Passo } from './domande'

/* ──────────────────────────────────────────────────────────
   Percorso a passi: una domanda per schermata, barra di
   avanzamento, riquadri cliccabili per le scelte. Alla fine
   tutte le risposte partono da /api/contact (formType
   'anteprima') come gli altri form del sito: mail Resend +
   CRM gestionale + copia Formspree, verde solo se la mail
   è partita davvero.
   ────────────────────────────────────────────────────────── */

type Valore = string | string[]
type Risposte = Record<string, Valore>
type Contatti = { nome: string; email: string; telefono: string; note: string }
type Stato = 'compilazione' | 'invio' | 'inviato'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function vuoto(v: Valore | undefined) {
  return v === undefined || (Array.isArray(v) ? v.length === 0 : v.trim() === '')
}

function leggibile(passo: Passo, v: Valore): string {
  const etichettaDi = (x: string) => passo.opzioni?.find(o => o.valore === x)?.etichetta ?? x
  return Array.isArray(v) ? v.map(etichettaDi).join(', ') : passo.opzioni ? etichettaDi(v) : v.trim()
}

const CSS = `
  .aw { font-family: var(--font-syne), sans-serif; color: var(--text); }
  .aw-kicker { font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); margin: 0 0 18px; }
  .aw-testa { display:flex; justify-content:space-between; align-items:baseline; gap:16px; margin-bottom: 10px; }
  .aw-gruppo { display:inline-flex; align-items:center; gap:8px; font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: var(--text); font-weight:600; }
  .aw-gruppo::before { content:''; width:7px; height:7px; background: var(--accent); display:inline-block; }
  .aw-conta { font-size: 11px; letter-spacing: .08em; color: var(--muted); font-variant-numeric: tabular-nums; }
  .aw-barra { height: 2px; background: var(--border); margin-bottom: 28px; }
  .aw-barra > i { display:block; height:100%; background: var(--accent); transition: width .5s cubic-bezier(.16,1,.3,1); }
  .aw-passo { animation: awEntra .45s cubic-bezier(.16,1,.3,1) both; }
  @keyframes awEntra { from { opacity:0; transform: translateY(14px);} to { opacity:1; transform:none; } }
  .aw-domanda { font-family: var(--font-syne), sans-serif; font-weight: 500; font-size: clamp(20px,1.7vw,24px); line-height: 1.2; color:var(--text); margin:0; }
  .aw-aiuto { margin: 10px 0 0; font-size: 13.5px; line-height: 1.55; color: var(--muted); }
  .aw-campo { margin-top: 22px; }
  .aw-input, .aw-area { width:100%; background:transparent; border:none; border-bottom:1px solid var(--border); padding:13px 0; color:var(--text); font-size:16px; font-family: var(--font-syne), sans-serif; outline:none; transition: border-color .3s; cursor: none; }
  .aw-input::placeholder, .aw-area::placeholder { color: rgba(10,10,10,0.38); }
  .aw-input:focus, .aw-area:focus { border-bottom-color: var(--accent); }
  .aw-area { resize:none; line-height:1.65; }
  .aw-errato { border-bottom-color: var(--accent-red) !important; }
  .aw-opzioni { display:grid; grid-template-columns: 1fr; gap: 10px; }
  .aw-opzioni.due { grid-template-columns: 1fr 1fr; }
  @media (max-width: 480px){ .aw-opzioni.due { grid-template-columns: 1fr; } }
  .aw-opzione { display:flex; align-items:center; gap:12px; padding: 14px 16px; border: 1px solid var(--border); background: var(--bg); color: var(--text); font-size: 15px; line-height:1.3; text-align:left; cursor:none; transition: border-color .25s, background .25s, color .25s; font-family: var(--font-syne), sans-serif; }
  .aw-opzione:hover { border-color: var(--text); }
  .aw-opzione.attiva { border-color: var(--text); color:var(--text); background: rgba(255,209,8,0.16); }
  .aw-segno { width: 14px; height: 14px; flex-shrink:0; border: 1px solid var(--border-strong); display:inline-block; transition: background .2s, border-color .2s; }
  .aw-segno.tondo { border-radius: 50%; }
  .aw-opzione.attiva .aw-segno { background: var(--accent); border-color: var(--accent); }
  .aw-opzione.spenta { opacity: .4; }
  .aw-etichetta { display:block; font-size: 11px; letter-spacing: .15em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .aw-contatti { display:grid; gap: 20px; }
  .aw-due { display:grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 480px){ .aw-due { grid-template-columns: 1fr; } }
  .aw-consenso { display:flex; gap: 11px; align-items:flex-start; font-size: 13px; line-height: 1.5; color: var(--muted); cursor:none; }
  .aw-consenso input { margin-top: 3px; accent-color: var(--accent); width: 16px; height: 16px; flex-shrink: 0; }
  .aw-consenso a { color: var(--accent); text-decoration: underline; }
  .aw-errore { display:block; margin-top: 8px; font-size: 12.5px; color: var(--accent-red); }
  .aw-azioni { display:flex; align-items:center; justify-content: space-between; gap: 16px; margin-top: 28px; }
  .aw-indietro { background:none; border:none; color: var(--muted); font-size: 13px; letter-spacing:.04em; cursor:none; padding: 8px 0; font-family: var(--font-syne), sans-serif; }
  .aw-indietro:hover { color: var(--text); }
  .aw-nota { margin-top: 14px; font-size: 12px; line-height: 1.5; color: rgba(10,10,10,0.38); text-align:center; }
  .aw-fine { text-align:center; padding: 40px 0 20px; }
`

export default function AnteprimaForm({ whatsapp }: { whatsapp?: string }) {
  const [indice, setIndice] = useState(0)
  const [risposte, setRisposte] = useState<Risposte>({})
  const [contatti, setContatti] = useState<Contatti>({ nome: '', email: '', telefono: '', note: '' })
  const [privacy, setPrivacy] = useState(false)
  const [errore, setErrore] = useState<string | null>(null)
  const [erroriContatti, setErroriContatti] = useState<Partial<Record<keyof Contatti | 'privacy', string>>>({})
  const [stato, setStato] = useState<Stato>('compilazione')
  const [erroreInvio, setErroreInvio] = useState(false)

  const passo = passi[indice]
  const radice = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (indice === 0) return
    const el = radice.current?.querySelector<HTMLElement>('input:not([type=checkbox]), textarea')
    el?.focus({ preventScroll: true })
  }, [indice])
  const totale = passi.length
  const ultimo = indice === totale - 1
  const avanzamento = Math.round(((indice + 1) / totale) * 100)
  const valore = risposte[passo.id]

  const scrivi = (v: Valore) => {
    setRisposte(p => ({ ...p, [passo.id]: v }))
    setErrore(null)
  }

  const togli = (val: string) => {
    const correnti = (valore as string[] | undefined) ?? []
    if (correnti.includes(val)) return scrivi(correnti.filter(x => x !== val))
    if (passo.massimo && correnti.length >= passo.massimo) return
    // "Niente di tutto questo" esclude le altre voci, e viceversa.
    if (val === 'niente') return scrivi(['niente'])
    scrivi([...correnti.filter(x => x !== 'niente'), val])
  }

  const validaPasso = (): boolean => {
    if (passo.tipo === 'contatti') {
      const e: typeof erroriContatti = {}
      if (!contatti.nome.trim()) e.nome = 'Come ti chiami?'
      if (!EMAIL.test(contatti.email.trim())) e.email = 'Controlla l’indirizzo email.'
      if (contatti.telefono.replace(/\D/g, '').length < 8) e.telefono = 'Controlla il numero.'
      if (!privacy) e.privacy = 'Serve il consenso per mandarti il link.'
      setErroriContatti(e)
      return Object.keys(e).length === 0
    }
    if (passo.obbligatorio && vuoto(valore)) {
      setErrore(passo.tipo === 'multipla' ? 'Scegli almeno una voce.' : passo.tipo === 'scelta' ? 'Scegli una risposta.' : 'Serve una risposta per andare avanti.')
      return false
    }
    return true
  }

  const invia = async () => {
    setErroreInvio(false)
    setStato('invio')
    const righe: string[] = ['[ANTEPRIMA GRATUITA]']
    for (const p of passi) {
      if (p.tipo === 'contatti') continue
      const v = risposte[p.id]
      if (vuoto(v)) continue
      righe.push(`${p.domanda} ${leggibile(p, v as Valore)}`)
    }
    if (contatti.note.trim()) righe.push(`Note: ${contatti.note.trim()}`)
    const tipoSito = risposte.tipo_sito ? leggibile(passi.find(p => p.id === 'tipo_sito')!, risposte.tipo_sito) : ''
    const budget = risposte.budget ? leggibile(passi.find(p => p.id === 'budget')!, risposte.budget) : ''
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'anteprima',
          source: 'website',
          name: contatti.nome.trim(),
          company: typeof risposte.attivita === 'string' ? risposte.attivita.trim() : '',
          email: contatti.email.trim(),
          phone: contatti.telefono.trim(),
          service: tipoSito,
          budget,
          message: righe.join('\n'),
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      trackLead('anteprima-gratuita')
      setStato('inviato')
    } catch {
      setErroreInvio(true)
      setStato('compilazione')
    }
  }

  const avanti = () => {
    if (!validaPasso()) return
    if (ultimo) { void invia(); return }
    setIndice(i => i + 1)
  }
  const indietro = () => {
    setErrore(null); setErroreInvio(false)
    setIndice(i => Math.max(0, i - 1))
  }

  if (stato === 'inviato') {
    return (
      <div className="aw aw-fine">
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 90, color: 'var(--accent)', lineHeight: 1 }}>✓</div>
        <h3 style={{ fontFamily: 'var(--font-boldonse)', fontSize: 'clamp(17px,1.5vw,22px)', lineHeight: 1.35, marginTop: 16, color: 'var(--text)' }}>CI METTIAMO AL LAVORO</h3>
        <p style={{ fontSize: 15, color: 'var(--muted)', marginTop: 12, lineHeight: 1.6 }}>
          Entro {ORE_CONSEGNA} ore ricevi il link alla tua anteprima su WhatsApp o via email.<br />
          Se nel frattempo hai foto o link che vuoi vederci dentro, mandaceli pure.
        </p>
      </div>
    )
  }

  const selezionati = Array.isArray(valore) ? valore : typeof valore === 'string' ? [valore] : []
  const pieno = passo.tipo === 'multipla' && !!passo.massimo && selezionati.length >= passo.massimo

  return (
    <form ref={radice} className="aw" noValidate onSubmit={e => { e.preventDefault(); avanti() }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="aw-testa">
        <span className="aw-gruppo">{passo.gruppo}</span>
        <span className="aw-conta">{indice + 1} / {totale}</span>
      </div>
      <div className="aw-barra" aria-hidden><i style={{ width: `${avanzamento}%` }} /></div>

      <div className="aw-passo" key={passo.id}>
        <h3 className="aw-domanda" id={`q-${passo.id}`}>{passo.domanda}</h3>
        {passo.aiuto && <p className="aw-aiuto">{passo.aiuto}</p>}

        <div className="aw-campo">
          {passo.tipo === 'testo' && (
            <input
              className={`aw-input ${errore ? 'aw-errato' : ''}`}
              type="text"
              aria-labelledby={`q-${passo.id}`}
              placeholder={passo.placeholder}
              value={typeof valore === 'string' ? valore : ''}
              onChange={e => scrivi(e.target.value)}
            />
          )}

          {passo.tipo === 'paragrafo' && (
            <textarea
              className={`aw-area ${errore ? 'aw-errato' : ''}`}
              rows={3}
              aria-labelledby={`q-${passo.id}`}
              placeholder={passo.placeholder}
              value={typeof valore === 'string' ? valore : ''}
              onChange={e => scrivi(e.target.value)}
            />
          )}

          {(passo.tipo === 'scelta' || passo.tipo === 'multipla') && (
            <div className={`aw-opzioni ${passo.dueColonne ? 'due' : ''}`} role={passo.tipo === 'scelta' ? 'radiogroup' : 'group'} aria-labelledby={`q-${passo.id}`}>
              {passo.opzioni?.map(o => {
                const attiva = selezionati.includes(o.valore)
                const spenta = pieno && !attiva
                return (
                  <button
                    key={o.valore}
                    type="button"
                    role={passo.tipo === 'scelta' ? 'radio' : 'checkbox'}
                    aria-checked={attiva}
                    className={`aw-opzione ${attiva ? 'attiva' : ''} ${spenta ? 'spenta' : ''}`}
                    onClick={() => (passo.tipo === 'scelta' ? scrivi(o.valore) : togli(o.valore))}
                  >
                    <span className={`aw-segno ${passo.tipo === 'scelta' ? 'tondo' : ''}`} aria-hidden />
                    {o.etichetta}
                  </button>
                )
              })}
            </div>
          )}

          {passo.tipo === 'contatti' && (
            <div className="aw-contatti">
              <div>
                <label className="aw-etichetta" htmlFor="aw-nome">Il tuo nome *</label>
                <input id="aw-nome" className={`aw-input ${erroriContatti.nome ? 'aw-errato' : ''}`} type="text" autoComplete="name" placeholder="Come ti chiami" value={contatti.nome} onChange={e => setContatti(c => ({ ...c, nome: e.target.value }))} />
                {erroriContatti.nome && <span className="aw-errore">{erroriContatti.nome}</span>}
              </div>
              <div className="aw-due">
                <div>
                  <label className="aw-etichetta" htmlFor="aw-email">Email *</label>
                  <input id="aw-email" className={`aw-input ${erroriContatti.email ? 'aw-errato' : ''}`} type="email" autoComplete="email" placeholder="La tua email" value={contatti.email} onChange={e => setContatti(c => ({ ...c, email: e.target.value }))} />
                  {erroriContatti.email && <span className="aw-errore">{erroriContatti.email}</span>}
                </div>
                <div>
                  <label className="aw-etichetta" htmlFor="aw-tel">WhatsApp *</label>
                  <input id="aw-tel" className={`aw-input ${erroriContatti.telefono ? 'aw-errato' : ''}`} type="tel" inputMode="tel" autoComplete="tel" placeholder="Il numero su cui mandarti il link" value={contatti.telefono} onChange={e => setContatti(c => ({ ...c, telefono: e.target.value }))} />
                  {erroriContatti.telefono && <span className="aw-errore">{erroriContatti.telefono}</span>}
                </div>
              </div>
              <div>
                <label className="aw-etichetta" htmlFor="aw-note">Qualcosa che dobbiamo sapere</label>
                <textarea id="aw-note" className="aw-area" rows={2} placeholder="Cosa non vuoi assolutamente, scadenze, altro" value={contatti.note} onChange={e => setContatti(c => ({ ...c, note: e.target.value }))} />
              </div>
              <label className="aw-consenso">
                <input type="checkbox" checked={privacy} onChange={e => { setPrivacy(e.target.checked); setErroriContatti(({ privacy: _p, ...r }) => r) }} />
                <span>
                  Ho letto la <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> e autorizzo Pira Web a usare questi dati per preparare l’anteprima e ricontattarmi.
                  {erroriContatti.privacy && <span className="aw-errore">{erroriContatti.privacy}</span>}
                </span>
              </label>
            </div>
          )}

          {errore && <span className="aw-errore" role="alert">{errore}</span>}
          {erroreInvio && (
            <span className="aw-errore" role="alert">
              Non siamo riusciti a inviare le risposte. Riprova, oppure scrivici a <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a>.
            </span>
          )}
        </div>
      </div>

      <div className="aw-azioni">
        {indice > 0 ? (
          <button type="button" className="aw-indietro" onClick={indietro}>← Indietro</button>
        ) : <span />}
        <button
          type="submit"
          disabled={stato === 'invio'}
          className="consulenza-cta-bar"
          aria-label={ultimo ? 'Invia e richiedi l’anteprima gratuita' : 'Vai alla domanda successiva'}
        >
          <span>{stato === 'invio' ? 'INVIO IN CORSO' : ultimo ? 'VOGLIO L’ANTEPRIMA' : 'CONTINUA'}</span>
          <span className="cta-arrow" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
          </span>
        </button>
      </div>
      {ultimo && (
        <p className="aw-nota">
          Nessun obbligo di acquisto. Leggiamo le risposte e, se possiamo aiutarti, ti mandiamo il link entro {ORE_CONSEGNA} ore.
          {whatsapp && <> Preferisci parlarne a voce? <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', textDecoration: 'underline' }}>Scrivici su WhatsApp</a>.</>}
        </p>
      )}
      {indice === 0 && <p className="aw-nota">Circa tre minuti, quasi tutto a scelta multipla. Puoi tornare indietro quando vuoi.</p>}
    </form>
  )
}
