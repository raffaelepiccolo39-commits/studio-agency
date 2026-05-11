'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { label: 'HOME', href: '/' },
  { label: 'SERVIZI', href: '/cosa-facciamo' },
  { label: 'PROGETTI', href: '/progetti' },
  { label: 'LAVORA CON NOI', href: '/lavora-con-noi' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [navHovered, setNavHovered] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const handler = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 40)
        const delta = y - lastY
        if (y > 200 && delta > 6) setHidden(true)
        else if (delta < -6 || y < 100) setHidden(false)
        lastY = y
        ticking = false
      })
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

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
          backdropFilter: (scrolled || navHovered) ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: (scrolled || navHovered) ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
          transform: hidden && !menuOpen ? 'translateY(-110%)' : 'translateY(0)',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, backdrop-filter 0.4s ease, padding 0.3s ease, border-bottom 0.3s ease',
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
                  <Link
                    href={l.href}
                    className={`nav-link-anim ${active ? 'is-active' : ''}`}
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontSize: '16px', fontWeight: 500, letterSpacing: 0,
                      color: active ? 'var(--accent)' : 'var(--text)',
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}

            <li style={{ whiteSpace: 'nowrap' }}>
              <Link
                href="/contatti"
                style={{
                  background: 'var(--accent)', color: '#0a0a0a',
                  border: 'none', padding: '10px 40px',
                  fontFamily: 'var(--font-syne)',
                  fontSize: '16px', fontWeight: 500, letterSpacing: 0,
                  cursor: 'none',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'background 0.3s',
                }}
              >
                RICHIEDI UNA CONSULENZA
              </Link>
            </li>
          </ul>
        )}

        {/* Hamburger mobile */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              href="/contatti"
              style={{
                background: 'var(--accent)', color: '#0a0a0a',
                border: 'none', padding: '8px 14px',
                fontFamily: 'var(--font-syne)',
                fontSize: '11px', fontWeight: 500, letterSpacing: '0.05em',
                textTransform: 'uppercase', cursor: 'none',
                textDecoration: 'none',
              }}
            >
              Consulenza
            </Link>
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

    </>
  )
}