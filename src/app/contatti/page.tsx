'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/ui/PageHeader'
import Cursor from '@/components/ui/Cursor'

const services = ['Brand Identity', 'Web site development', 'E-commerce Development', 'Performance Marketing', 'Gestione Social Media', 'Creazione dei contenuti']
const budgets = ['Meno di 5.000€', '5.000€ – 15.000€', '15.000€ – 30.000€', 'Oltre 30.000€', 'Da definire']

const inputStyle = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: '1px solid #1e1e1e', padding: '14px 0',
  color: '#f0ede6', fontSize: '15px', fontFamily: 'inherit', outline: 'none',
} as React.CSSProperties

const labelStyle = {
  fontSize: '10px', letterSpacing: '0.18em',
  textTransform: 'uppercase' as const, color: '#555',
  display: 'block', marginBottom: '6px',
}

export default function ContattiPage() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/mbdaqvyj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name,
          azienda: company,
          email: email,
          telefono: phone,
          servizio: service,
          budget: budget,
          messaggio: message,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setName(''); setCompany(''); setEmail(''); setPhone('')
        setService(''); setBudget(''); setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <PageHeader
          tag="Inizia il tuo progetto"
          title="PARLIAMO"
          titleAccent="insieme"
          subtitle="Compila il form oppure scrivici direttamente. Rispondiamo entro 24 ore."
        />

        <section style={{
          padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: '80px',
          borderBottom: '1px solid #1e1e1e',
        }}>

          {/* Sidebar info */}
          <div>
            <div style={{ marginBottom: '48px' }}>
              <p style={labelStyle}>Email</p>
              <a href="mailto:info@piraweb.it" style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', letterSpacing: '0.03em', color: '#f0ede6', textDecoration: 'none' }}>
                info@piraweb.it
              </a>
            </div>
            <div style={{ marginBottom: '48px' }}>
              <p style={labelStyle}>Sede</p>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '0.03em', lineHeight: 1.3 }}>
                Via A.Petrillo N°171<br />81030 CASAPESENNA CE, IT
              </p>
            </div>
            <div style={{ marginBottom: '48px' }}>
              <p style={labelStyle}>Telefono</p>
              <a href="tel:+3908117560017" style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '0.03em', color: '#f0ede6', textDecoration: 'none' }}>
                +39 081 175 60017<br />+39 351 721 4074
              </a>
            </div>
            <div>
              <p style={labelStyle}>Social</p>
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
  {[
    { label: 'Instagram', url: 'https://www.instagram.com/piraweb_agency/' },
    { label: 'Facebook', url: 'https://www.facebook.com/pirawebonline' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/pira-web-creative-agency/' },
  ].map(s => (
    <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="link-muted" style={{ fontSize: '14px' }}>
      {s.label} ↗
    </a>
  ))}
</div>
            </div>
          </div>

          {/* Form */}
          {status === 'success' ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '24px', padding: '80px 40px' }}>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '80px', color: 'var(--accent)', lineHeight: 1 }}>✓</span>
              <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '40px' }}>MESSAGGIO INVIATO!</h3>
              <p style={{ fontSize: '15px', color: 'rgba(240,237,230,0.55)' }}>Ti risponderemo entro 24 ore lavorative.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={labelStyle}>Nome *</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Mario Rossi" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Azienda</label>
                  <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="La tua azienda" style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="mario@azienda.it" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Telefono</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+39 333 0000000" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Servizio di interesse</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {services.map(s => (
                    <button key={s} type="button" onClick={() => setService(s)} style={{
                      padding: '7px 14px',
                      background: service === s ? 'var(--accent)' : 'transparent',
                      color: service === s ? '#0a0a0a' : '#555',
                      border: `1px solid ${service === s ? 'var(--accent)' : '#1e1e1e'}`,
                      fontFamily: 'inherit', fontSize: '11px',
                      letterSpacing: '0.08em', cursor: 'none', transition: 'all 0.25s',
                    }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Budget indicativo</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {budgets.map(b => (
                    <button key={b} type="button" onClick={() => setBudget(b)} style={{
                      padding: '7px 14px',
                      background: budget === b ? 'var(--accent)' : 'transparent',
                      color: budget === b ? '#0a0a0a' : '#555',
                      border: `1px solid ${budget === b ? 'var(--accent)' : '#1e1e1e'}`,
                      fontFamily: 'inherit', fontSize: '11px',
                      letterSpacing: '0.08em', cursor: 'none', transition: 'all 0.25s',
                    }}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Raccontaci il tuo progetto *</label>
                <textarea required rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder="Descrivi il progetto e gli obiettivi" style={{ ...inputStyle, resize: 'none' }} />
              </div>

              <div>
                <button type="submit" disabled={status === 'loading'} className="btn-accent" style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
                  {status === 'loading' ? 'Invio in corso...' : 'Invia messaggio →'}
                </button>
                {status === 'error' && (
                  <p style={{ color: '#ff4d4d', fontSize: '13px', marginTop: '16px' }}>
                    Errore. Scrivici direttamente a <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a>
                  </p>
                )}
              </div>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}