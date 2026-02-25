'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/ui/PageHeader'
import Cursor from '@/components/ui/Cursor'

const openings = [
  {
    id: '01', role: 'Senior UX/UI Designer', type: 'Full-time', location: 'Milano / Remoto',
    desc: 'Cerchiamo un designer con almeno 3 anni di esperienza in progetti digital e una forte sensibilità per il dettaglio.',
    requirements: ['Figma avanzato', 'Esperienza e-commerce', 'Portfolio solido', 'Inglese fluente'],
  },
  {
    id: '02', role: 'Shopify Developer', type: 'Full-time', location: 'Milano / Remoto',
    desc: 'Sviluppatore con esperienza su Shopify Plus, Liquid, e possibilmente React. Lavorerai su progetti complessi con integrazioni ERP.',
    requirements: ['Shopify Plus', 'Liquid + JS', 'React/Next.js', 'API REST / GraphQL'],
  },
  {
    id: '03', role: 'Performance Marketing Specialist', type: 'Full-time', location: 'Milano',
    desc: 'Gestione e ottimizzazione di campagne Meta e Google Ads per brand fashion e lifestyle.',
    requirements: ['Meta Ads', 'Google Ads', 'GA4 / GTM', 'Email marketing'],
  },
  {
    id: '04', role: 'Profilo aperto', type: 'Qualsiasi', location: 'Milano / Remoto',
    desc: 'Non trovi il tuo ruolo? Se sei bravo in quello che fai e hai passione per il digitale, mandaci il tuo portfolio.',
    requirements: ['Passione', 'Autonomia', 'Curiosità', 'Qualità del lavoro'],
  },
]

const perks = [
  { icon: '🎯', title: 'Progetti che contano', desc: 'Lavori su brand reali con sfide reali.' },
  { icon: '🌍', title: 'Remote friendly', desc: 'Lavora da dove vuoi, con un team che si fida di te.' },
  { icon: '📚', title: 'Formazione continua', desc: 'Budget annuale per corsi, conferenze e strumenti.' },
  { icon: '⚡', title: 'Autonomia vera', desc: 'Hai voce in capitolo su come lavori e sulle scelte creative.' },
  { icon: '💰', title: 'Compenso competitivo', desc: 'Stipendio in linea con il mercato + bonus sui risultati.' },
  { icon: '🤝', title: 'Team piccolo e serio', desc: 'Niente burocrazia. Solo persone capaci che si rispettano.' },
]

const inputStyle = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: '1px solid #333', padding: '14px 0',
  color: '#f0ede6', fontSize: '15px', fontFamily: 'inherit', outline: 'none',
} as React.CSSProperties

const labelStyle = {
  fontSize: '10px', letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: '#555', display: 'block', marginBottom: '6px',
}

export default function LavoraConNoiPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')
  const [nome, setNome] = useState('')
  const [cognome, setCognome] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [cv, setCv] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const openModal = (role: string) => {
    setSelectedRole(role)
    setModalOpen(true)
    setStatus('idle')
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setModalOpen(false)
    setNome(''); setCognome(''); setTelefono(''); setEmail(''); setCv(null)
    setStatus('idle')
    document.body.style.overflow = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const formData = new FormData()
      formData.append('access_key', '9971b285-38a4-4a6c-a6f7-d1217bd411f6')
      formData.append('subject', `Candidatura: ${selectedRole}`)
      formData.append('posizione', selectedRole)
      formData.append('nome', nome)
      formData.append('cognome', cognome)
      formData.append('email', email)
      formData.append('telefono', telefono)
      if (cv) formData.append('attachment', cv)

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
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
          tag="Unisciti a noi"
          title="LAVORA"
          titleAccent="con noi"
          subtitle="Siamo un team piccolo che fa cose grandi. Se sei bravo in quello che fai, sei nel posto giusto."
        />

        {/* Perks */}
        <section style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '64px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
            Cosa offriamo
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '2px' }}>
            {perks.map(p => (
              <div key={p.title} className="card-hover" style={{ padding: '40px 32px', background: 'var(--surface)' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '16px' }}>{p.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px', letterSpacing: '0.03em', marginBottom: '12px' }}>{p.title.toUpperCase()}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(240,237,230,0.55)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Posizioni aperte */}
        <section style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '64px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
            Posizioni aperte
          </p>
          <div style={{ borderTop: '1px solid var(--border)' }}>
            {openings.map(job => (
              <div key={job.id} style={{ borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
                      <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '13px', color: 'var(--accent)', letterSpacing: '0.15em' }}>{job.id}</span>
                      <span style={{ fontSize: '10px', padding: '3px 10px', border: '1px solid var(--border)', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{job.type}</span>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>📍 {job.location}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '0.02em' }}>{job.role.toUpperCase()}</h3>
                  </div>
                  <button onClick={() => openModal(job.role)} className="btn-outline-accent" style={{ cursor: 'none' }}>
                    Candidati →
                  </button>
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(240,237,230,0.55)', marginBottom: '20px', maxWidth: '640px' }}>{job.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {job.requirements.map(r => (
                    <span key={r} style={{ padding: '5px 12px', border: '1px solid var(--border)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.06em' }}>{r}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(60px,10vw,100px) clamp(24px,5vw,40px)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,5vw,72px)', marginBottom: '16px' }}>NON TROVI</h2>
          <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 'clamp(36px,5vw,72px)', color: 'var(--accent)', marginBottom: '24px' }}>il tuo ruolo?</h2>
          <p style={{ fontSize: '15px', color: 'rgba(240,237,230,0.5)', maxWidth: '480px', margin: '0 auto 40px' }}>
            Mandaci il tuo portfolio e dicci chi sei. Se sei bravo, troviamo un modo per lavorare insieme.
          </p>
          <button onClick={() => openModal('Candidatura spontanea')} className="btn-accent" style={{ cursor: 'none' }}>
            Invia candidatura spontanea
          </button>
        </section>

      </main>
      <Footer />

      {/* ─── MODAL ─── */}
      {modalOpen && (
        <div
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
          style={{
            position: 'fixed', inset: 0, zIndex: 500,
            background: 'rgba(10,10,10,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px', backdropFilter: 'blur(8px)',
          }}
        >
          <div style={{
            background: '#111', border: '1px solid var(--border)',
            width: '100%', maxWidth: '540px',
            padding: 'clamp(32px,5vw,52px)',
            position: 'relative',
            maxHeight: '90vh', overflowY: 'auto',
          }}>

            {/* Tasto chiudi */}
            <button onClick={closeModal} style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'none', border: 'none',
              color: 'var(--muted)', fontSize: '22px',
              cursor: 'none', lineHeight: 1, padding: '4px',
            }}>✕</button>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '80px', color: 'var(--accent)', lineHeight: 1 }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '36px', marginTop: '16px' }}>CANDIDATURA INVIATA!</h3>
                <p style={{ fontSize: '14px', color: 'rgba(240,237,230,0.55)', marginTop: '12px', lineHeight: 1.8 }}>
                  Abbiamo ricevuto la tua candidatura e il tuo CV.<br />Ti contatteremo al più presto.
                </p>
              </div>
            ) : (
              <>
                <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>
                  Candidatura per
                </p>
                <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(22px,3vw,34px)', marginBottom: '40px', paddingRight: '40px' }}>
                  {selectedRole.toUpperCase()}
                </h3>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>Nome *</label>
                      <input type="text" required value={nome} onChange={e => setNome(e.target.value)} placeholder="Mario" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Cognome *</label>
                      <input type="text" required value={cognome} onChange={e => setCognome(e.target.value)} placeholder="Rossi" style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="mario@email.it" style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Numero di telefono *</label>
                    <input type="tel" required value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="+39 333 0000000" style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Carica il tuo CV *</label>
                    <label style={{
                      display: 'block', marginTop: '8px', padding: '20px',
                      border: `1px dashed ${cv ? 'var(--accent)' : '#333'}`,
                      cursor: 'none', fontSize: '13px',
                      color: cv ? 'var(--accent)' : 'var(--muted)',
                      textAlign: 'center', transition: 'all 0.3s',
                      lineHeight: 1.5,
                    }}>
                      {cv ? `✓ ${cv.name}` : '+ Clicca per caricare\nPDF, DOC, DOCX'}
                      <input
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={e => {
                                   const file = e.target.files?.[0] || null
                                   if (file && file.size > 5 * 1024 * 1024) {
                                   alert('Il file è troppo grande. Massimo 5MB.')
                                   return
                                   }
                                   setCv(file)
                                   }}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {cv && (
                      <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>
                        Dimensione: {(cv.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-accent"
                    style={{ marginTop: '8px', cursor: 'none', opacity: status === 'loading' ? 0.7 : 1 }}
                  >
                    {status === 'loading' ? 'Invio in corso...' : 'Invia candidatura →'}
                  </button>

                  {status === 'error' && (
                    <p style={{ color: '#ff4d4d', fontSize: '13px', textAlign: 'center' }}>
                      Errore nell&apos;invio. Scrivici a{' '}
                      <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a>
                    </p>
                  )}

                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}