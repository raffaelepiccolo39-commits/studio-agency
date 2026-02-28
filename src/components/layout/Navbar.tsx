'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Cosa Facciamo', href: '/cosa-facciamo' },
  { label: 'Progetti', href: '/progetti' },
  { label: 'Blog', href: '/blog' },
  { label: 'Lavora con Noi', href: '/lavora-con-noi' },
  { label: 'Contatti', href: '/contatti' },
]

const services = [
  'Brand Identity',
  'Web Site Development',
  'E-commerce Development',
  'Performance Marketing',
  'Gestione Social Media',
  'Creazione dei Contenuti',
]

const inputStyle = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: '1px solid #333', padding: '16px 0',
  color: '#f0ede6', fontSize: '16px', fontFamily: 'inherit', outline: 'none',
} as React.CSSProperties

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [navHovered, setNavHovered] = useState(false)

  const [nome, setNome] = useState('')
  const [cognome, setCognome] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [messaggio, setMessaggio] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = (menuOpen || formOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, formOpen])

  const toggleService = (s: string) => {
    setSelectedServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  const closeForm = () => {
    setFormOpen(false)
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
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  // La navbar è visibile (sfondo) solo se scrolled O hovered
  const navBg = (scrolled || navHovered)
    ? 'rgba(10,10,10,0.92)'
    : 'transparent'

  return (
    <>
      <nav
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: `${scrolled ? '6px' : '10px'} clamp(20px,5vw,40px)`,
          background: navBg,
          backdropFilter: (scrolled || navHovered) ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >

        {/* Logo */}
        <Link href="/" style={{
          position: 'relative', zIndex: 210,
          textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0,
        }}>
          <img src="/logo.png" alt="Pira Web" style={{ height: '46px', width: 'auto', transition: 'height 0.3s ease' }} />
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{
            display: 'flex', gap: '24px', listStyle: 'none',
            margin: 0, padding: 0, flexWrap: 'nowrap', alignItems: 'center',
          }}>
            {links.map(l => {
              const active = pathname === l.href
              return (
                <li key={l.href} style={{ whiteSpace: 'nowrap' }}>
                  <Link href={l.href} style={{
                    fontSize: '14px', fontWeight: 500, letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: active ? 'var(--accent)' : 'var(--text)',
                    textDecoration: 'none', opacity: active ? 1 : 0.55,
                    transition: 'opacity 0.3s, color 0.3s',
                    borderBottom: active ? '1px solid var(--accent)' : '1px solid transparent',
                    paddingBottom: '2px', display: 'block',
                  }}>
                    {l.label}
                  </Link>
                </li>
              )
            })}

            <li style={{ whiteSpace: 'nowrap' }}>
              <button
                onClick={() => setFormOpen(true)}
                style={{
                  background: 'var(--accent)', color: '#0a0a0a',
                  border: 'none', padding: '10px 20px',
                  fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', cursor: 'none',
                  fontFamily: 'inherit', transition: 'background 0.3s',
                }}
              >
                Richiedi consulenza
              </button>
            </li>
          </ul>
        )}

        {/* Hamburger mobile */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setFormOpen(true)}
              style={{
                background: 'var(--accent)', color: '#0a0a0a',
                border: 'none', padding: '8px 14px',
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', cursor: 'none', fontFamily: 'inherit',
              }}
            >
              Consulenza
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none', border: 'none', cursor: 'none',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '5px', padding: '8px', zIndex: 210,
                width: '44px', height: '44px',
              }}
            >
              <span style={{
                display: 'block', width: '24px', height: '1.5px', background: 'var(--text)',
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
              }} />
              <span style={{
                display: 'block', width: '24px', height: '1.5px', background: 'var(--text)',
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none',
              }} />
              <span style={{
                display: 'block', width: '24px', height: '1.5px', background: 'var(--text)',
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
              }} />
            </button>
          </div>
        )}
      </nav>

      {/* Menu fullscreen mobile */}
      {isMobile && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 150, background: 'var(--bg)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '8px',
          opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.4s ease',
        }}>
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,8vw,56px)',
              letterSpacing: '0.03em',
              color: pathname === l.href ? 'var(--accent)' : 'var(--text)',
              textDecoration: 'none',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
              lineHeight: 1.3,
            }}>
              {l.label}
            </Link>
          ))}
          <p style={{
            fontSize: '12px', color: 'var(--muted)', marginTop: '32px', letterSpacing: '0.1em',
            opacity: menuOpen ? 1 : 0, transition: 'opacity 0.4s ease 0.5s',
          }}>
            info@piraweb.it
          </p>
        </div>
      )}

      {/* ─── FORM FULLSCREEN ─── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: '#0a0a0a', overflowY: 'auto',
        opacity: formOpen ? 1 : 0,
        pointerEvents: formOpen ? 'all' : 'none',
        transition: 'opacity 0.4s ease',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,40px) 80px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '64px' }}>
            <div>
              <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
                Richiedi consulenza
              </p>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,5vw,64px)', lineHeight: 1 }}>
                RACCONTACI<br />
                <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: 'var(--accent)' }}>il tuo progetto</span>
              </h2>
            </div>
            <button onClick={closeForm} style={{
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--text)', fontSize: '13px', padding: '10px 20px',
              cursor: 'none', fontFamily: 'inherit', letterSpacing: '0.1em',
              flexShrink: 0, marginTop: '8px',
            }}>
              ✕ CHIUDI
            </button>
          </div>

          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '100px', color: 'var(--accent)', lineHeight: 1 }}>✓</div>
              <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '48px', marginTop: '16px' }}>RICHIESTA INVIATA!</h3>
              <p style={{ fontSize: '15px', color: 'rgba(240,237,230,0.55)', marginTop: '12px' }}>
                Ti contatteremo entro 24 ore.
              </p>
              <button onClick={closeForm} style={{
                marginTop: '40px', cursor: 'none', background: 'var(--accent)',
                color: '#0a0a0a', border: 'none', padding: '16px 40px',
                fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', fontFamily: 'inherit',
              }}>
                Torna al sito →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>

              <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '32px', marginBottom: '32px' }}>
                <p style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '16px' }}>01 — Nome *</p>
                <input type="text" required value={nome} onChange={e => setNome(e.target.value)} placeholder="Il tuo Nome" style={inputStyle} />
              </div>

              <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '32px', marginBottom: '32px' }}>
                <p style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '16px' }}>02 — Cognome *</p>
                <input type="text" required value={cognome} onChange={e => setCognome(e.target.value)} placeholder="Il tuo Cognome" style={inputStyle} />
              </div>

              <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '32px', marginBottom: '32px' }}>
                <p style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '16px' }}>03 — Email *</p>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="La tua Email" style={inputStyle} />
              </div>

              <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '32px', marginBottom: '32px' }}>
                <p style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '16px' }}>04 — Numero di telefono</p>
                <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Il tuo Numero" style={inputStyle} />
              </div>

              <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '32px', marginBottom: '32px' }}>
                <p style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '24px' }}>05 — Tipo di servizio</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {services.map(s => (
                    <label key={s} onClick={() => toggleService(s)} style={{
                      display: 'flex', alignItems: 'center', gap: '16px',
                      cursor: 'none', fontSize: '15px',
                      color: selectedServices.includes(s) ? 'var(--accent)' : 'rgba(240,237,230,0.6)',
                      transition: 'color 0.3s',
                    }}>
                      <span style={{
                        width: '16px', height: '16px', border: '1px solid',
                        borderColor: selectedServices.includes(s) ? 'var(--accent)' : '#444',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'border-color 0.3s',
                      }}>
                        {selectedServices.includes(s) && (
                          <span style={{ width: '8px', height: '8px', background: 'var(--accent)', display: 'block' }} />
                        )}
                      </span>
                      {s}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '32px', marginBottom: '48px' }}>
                <p style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '16px' }}>06 — Messaggio *</p>
                <textarea
                  required value={messaggio}
                  onChange={e => setMessaggio(e.target.value)}
                  placeholder="Parlaci brevemente della tua attività"
                  rows={4}
                  style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" disabled={status === 'loading'} style={{
                  background: 'var(--accent)', color: '#0a0a0a',
                  border: 'none', padding: '20px 48px',
                  fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase', cursor: 'none', fontFamily: 'inherit',
                  opacity: status === 'loading' ? 0.7 : 1, transition: 'opacity 0.3s',
                  borderRadius: '50px',
                }}>
                  {status === 'loading' ? 'Invio...' : 'INVIA RICHIESTA'}
                </button>
              </div>

              {status === 'error' && (
                <p style={{ color: '#ff4d4d', fontSize: '13px', textAlign: 'center', marginTop: '16px' }}>
                  Errore. Scrivici a <a href="mailto:info@piraweb.it" style={{ color: 'var(--accent)' }}>info@piraweb.it</a>
                </p>
              )}

            </form>
          )}
        </div>
      </div>
    </>
  )
}