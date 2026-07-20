'use client'

import { useState } from 'react'
import { trackLead } from '@/lib/gtag'

const settori = [
  'Manifatturiero / Produzione',
  'Commercio / Retail',
  'Servizi / Consulenza',
  'Food & Beverage',
  'Edilizia / Impiantistica',
  'Salute / Benessere',
  'Altro',
]

const marketingOpzioni = ['Sì', 'No']

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #2a2a2a',
  padding: '13px 0',
  color: 'var(--text)',
  fontSize: 16,
  fontFamily: 'var(--font-syne), sans-serif',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-syne), sans-serif',
  fontSize: 11,
  color: 'var(--accent)',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  marginBottom: 10,
}

export default function LandingForm() {
  const [nome, setNome] = useState('')
  const [cognome, setCognome] = useState('')
  const [azienda, setAzienda] = useState('')
  const [settore, setSettore] = useState('')
  const [marketing, setMarketing] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [messaggio, setMessaggio] = useState('')
  const [privacy, setPrivacy] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const reset = () => {
    setNome(''); setCognome(''); setAzienda(''); setSettore('')
    setMarketing(''); setEmail(''); setTelefono(''); setMessaggio('')
    setPrivacy(false); setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!privacy) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nome,
          surname: cognome,
          company: azienda,
          email,
          phone: telefono,
          service: settore,
          message: `[LANDING ADV — Medie Imprese]${azienda ? ` — Azienda: ${azienda}` : ''}${marketing ? ` — Già in marketing: ${marketing}` : ''}${messaggio ? `\n${messaggio}` : ''}`,
          formType: 'consulenza',
          source: 'ads',
        }),
      })
      if (res.ok) {
        setStatus('success')
        trackLead('consulenza-gratuita')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text)' }}>
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 90, color: 'var(--accent)', lineHeight: 1 }}>✓</div>
        <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: 44, marginTop: 16, letterSpacing: '0.01em' }}>RICHIESTA INVIATA!</h3>
        <p style={{ fontFamily: 'var(--font-syne)', fontSize: 15, color: 'rgba(240,237,230,0.55)', marginTop: 12, lineHeight: 1.6 }}>
          Grazie. Un nostro consulente ti contatterà entro 24 ore<br />per fissare l&apos;incontro conoscitivo.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{ marginTop: 32, cursor: 'none', background: 'var(--accent)', color: '#0a0a0a', border: 'none', padding: '15px 36px', fontFamily: 'var(--font-syne)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}
        >
          Invia un&apos;altra richiesta
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 26, color: 'var(--text)' }}>
      <div className="consulenza-row-2">
        <div>
          <label style={labelStyle}>Nome *</label>
          <input type="text" required value={nome} onChange={e => setNome(e.target.value)} placeholder="Il tuo nome" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Cognome *</label>
          <input type="text" required value={cognome} onChange={e => setCognome(e.target.value)} placeholder="Il tuo cognome" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Azienda *</label>
        <input type="text" required value={azienda} onChange={e => setAzienda(e.target.value)} placeholder="Ragione sociale" style={inputStyle} />
      </div>

      <div className="consulenza-row-2">
        <div>
          <label style={labelStyle}>Settore *</label>
          <select required value={settore} onChange={e => setSettore(e.target.value)} style={{ ...inputStyle, cursor: 'none' }}>
            <option value="" disabled style={{ color: '#0a0a0a' }}>Seleziona settore</option>
            {settori.map(s => <option key={s} value={s} style={{ color: '#0a0a0a' }}>{s}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Già investite in marketing? *</label>
          <select required value={marketing} onChange={e => setMarketing(e.target.value)} style={{ ...inputStyle, cursor: 'none' }}>
            <option value="" disabled style={{ color: '#0a0a0a' }}>Seleziona</option>
            {marketingOpzioni.map(m => <option key={m} value={m} style={{ color: '#0a0a0a' }}>{m}</option>)}
          </select>
        </div>
      </div>

      <div className="consulenza-row-2">
        <div>
          <label style={labelStyle}>Email di lavoro *</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="nome@azienda.it" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Telefono *</label>
          <input type="tel" required value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Il tuo numero" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Messaggio</label>
        <textarea
          value={messaggio}
          onChange={e => setMessaggio(e.target.value)}
          placeholder="Raccontaci brevemente la tua azienda e i tuoi obiettivi"
          rows={3}
          style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 }}
        />
      </div>

      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 11, cursor: 'none', fontFamily: 'var(--font-syne)', fontSize: 13, color: 'rgba(240,237,230,0.6)', lineHeight: 1.5 }}>
        <input
          type="checkbox"
          checked={privacy}
          onChange={e => setPrivacy(e.target.checked)}
          required
          style={{ marginTop: 2, accentColor: '#FFD108', width: 16, height: 16, flexShrink: 0 }}
        />
        <span>
          Ho letto e accetto la{' '}
          <a href="/privacy" target="_blank" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Privacy Policy</a>{' '}
          e autorizzo il trattamento dei dati per essere ricontattato.
        </span>
      </label>

      {status === 'error' && (
        <p style={{ color: '#ff4d4d', fontSize: 13, fontFamily: 'var(--font-syne)' }}>
          Errore nell&apos;invio. Scrivici a <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="consulenza-cta-bar"
        aria-label="Richiedi incontro conoscitivo"
      >
        <span>{status === 'loading' ? 'INVIO IN CORSO' : 'RICHIEDI ORA'}</span>
        <span className="cta-arrow" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
        </span>
      </button>
    </form>
  )
}
