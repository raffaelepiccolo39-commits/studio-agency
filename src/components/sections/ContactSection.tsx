'use client'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/xlgwaygp', { // ← metti qui il tuo ID Formspree
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus('success')
        setName(''); setEmail(''); setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', background: 'transparent',
    border: 'none', borderBottom: '1px solid var(--border)',
    padding: '16px 0', color: 'var(--text)',
    fontSize: '16px', fontFamily: 'var(--font-syne)', outline: 'none',
  } as React.CSSProperties

  return (
    <section id="contact" style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'var(--font-bebas)', fontSize: '28vw', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.025)', pointerEvents: 'none', whiteSpace: 'nowrap' }}>HELLO</div>
      <div ref={ref} style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', textAlign: 'center', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '32px' }}>Inizia il tuo progetto</p>
        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,7vw,100px)', letterSpacing: '0.02em', display: 'block', marginBottom: '64px' }}>PARLIAMONE</span>

        {status === 'success' ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '80px', color: 'var(--accent)', lineHeight: 1 }}>✓</div>
            <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '40px', marginTop: '16px' }}>MESSAGGIO INVIATO!</h3>
            <p style={{ fontSize: '15px', color: 'rgba(240,237,230,0.55)', marginTop: '12px' }}>Ti risponderemo entro 24 ore.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Nome Cognome</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Mario Rossi" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="mario@azienda.it" style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <label style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Messaggio</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={4} placeholder="Raccontami del tuo progetto..." style={{ ...inputStyle, resize: 'none' }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <button type="submit" disabled={status === 'loading'} className="btn-accent" style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
                {status === 'loading' ? 'Invio in corso...' : 'Invia messaggio →'}
              </button>
              {status === 'error' && (
                <p style={{ color: '#ff4d4d', fontSize: '13px', marginTop: '16px' }}>
                  Errore invio. Scrivici direttamente a <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a>
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
