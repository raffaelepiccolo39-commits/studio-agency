'use client'

import { useState } from 'react'

const services = [
  'Brand Identity',
  'Web Site Development',
  'E-commerce Development',
  'Performance Marketing',
  'Gestione Social Media',
  'Creazione dei Contenuti',
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #2a2a2a',
  padding: '14px 0',
  color: 'var(--text)',
  fontSize: '16px',
  fontFamily: 'inherit',
  outline: 'none',
}

type Props = {
  onSuccess?: () => void
  variant?: 'dark' | 'light'
}

export default function ConsulenzaForm({ onSuccess, variant = 'dark' }: Props) {
  const isLight = variant === 'light'
  const textColor = isLight ? '#0a0a0a' : 'var(--text)'
  const mutedColor = isLight ? '#6a6a6a' : 'rgba(240,237,230,0.55)'
  const borderColor = isLight ? '#e2e2e2' : '#2a2a2a'

  const [nome, setNome] = useState('')
  const [cognome, setCognome] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [messaggio, setMessaggio] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const toggleService = (s: string) => {
    setSelectedServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  const reset = () => {
    setNome(''); setCognome(''); setEmail(''); setTelefono('')
    setSelectedServices([]); setMessaggio(''); setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/mbdaqvyj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          nome, cognome, email, telefono,
          servizi: selectedServices.join(', '),
          messaggio,
        }),
      })

      fetch('https://gestionale.piraweb.it/api/webhook/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nome,
          surname: cognome,
          email,
          phone: telefono,
          service: selectedServices.join(', '),
          message: messaggio,
          api_key: 'pira-form-webhook-2026-secure',
        }),
      }).catch(() => {})

      if (res.ok) {
        setStatus('success')
        onSuccess?.()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const localInputStyle: React.CSSProperties = {
    ...inputStyle,
    borderBottomColor: borderColor,
    color: textColor,
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', color: textColor }}>
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '100px', color: 'var(--accent)', lineHeight: 1 }}>✓</div>
        <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '48px', marginTop: '16px' }}>RICHIESTA INVIATA!</h3>
        <p style={{ fontSize: '15px', color: mutedColor, marginTop: '12px' }}>
          Ti contatteremo entro 24 ore.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: '40px', cursor: 'none', background: 'var(--accent)',
            color: '#0a0a0a', border: 'none', padding: '16px 40px',
            fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', fontFamily: 'inherit',
          }}
        >
          Invia un&apos;altra richiesta
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', color: textColor }}>
      <div className="consulenza-row-2" style={{ marginBottom: '24px' }}>
        <div style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '24px' }}>
          <p style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '12px' }}>01 — Nome *</p>
          <input type="text" required value={nome} onChange={e => setNome(e.target.value)} placeholder="Il tuo Nome" style={localInputStyle} />
        </div>

        <div style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '24px' }}>
          <p style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '12px' }}>02 — Cognome *</p>
          <input type="text" required value={cognome} onChange={e => setCognome(e.target.value)} placeholder="Il tuo Cognome" style={localInputStyle} />
        </div>
      </div>

      <div style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '24px', marginBottom: '24px' }}>
        <p style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '12px' }}>03 — Email *</p>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="La tua Email" style={localInputStyle} />
      </div>

      <div style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '24px', marginBottom: '24px' }}>
        <p style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '12px' }}>04 — Numero di telefono</p>
        <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Il tuo Numero" style={localInputStyle} />
      </div>

      <div style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '24px', marginBottom: '24px' }}>
        <p style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '20px' }}>05 — Tipo di servizio</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {services.map(s => {
            const selected = selectedServices.includes(s)
            return (
              <label
                key={s}
                onClick={() => toggleService(s)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  cursor: 'none', fontSize: '15px',
                  color: selected ? 'var(--accent)' : isLight ? '#0a0a0a' : 'rgba(240,237,230,0.7)',
                  transition: 'color 0.3s',
                }}
              >
                <span style={{
                  width: '14px', height: '14px', border: '1px solid',
                  borderColor: selected ? 'var(--accent)' : isLight ? '#999' : '#555',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'border-color 0.3s',
                }}>
                  {selected && (
                    <span style={{ width: '7px', height: '7px', background: 'var(--accent)', display: 'block' }} />
                  )}
                </span>
                {s}
              </label>
            )
          })}
        </div>
      </div>

      <div style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '24px', marginBottom: '40px' }}>
        <p style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '12px' }}>06 — Messaggio *</p>
        <textarea
          required value={messaggio}
          onChange={e => setMessaggio(e.target.value)}
          placeholder="Parlaci brevemente della tua attivita"
          rows={3}
          style={{ ...localInputStyle, resize: 'none', lineHeight: 1.7 }}
        />
      </div>

      {status === 'error' && (
        <p style={{ color: '#ff4d4d', fontSize: '13px', marginBottom: '16px' }}>
          Errore. Scrivici a <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a>
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="consulenza-cta-marquee"
        aria-label="Invia richiesta"
      >
        {status === 'loading' ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            INVIO IN CORSO
          </span>
        ) : (
          <div className="marquee-track" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i}>
                INVIA RICHIESTA
                <span className="marquee-arrow">{'→'}</span>
              </span>
            ))}
          </div>
        )}
      </button>
    </form>
  )
}
