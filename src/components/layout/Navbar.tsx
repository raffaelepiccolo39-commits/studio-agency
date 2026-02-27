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

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `${scrolled ? '12px' : '20px'} clamp(20px,5vw,40px)`,
        background: menuOpen ? 'transparent' : scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled && !menuOpen ? 'blur(12px)' : 'none',
        borderBottom: scrolled && !menuOpen ? '1px solid var(--border)' : 'none',
        transition: 'all 0.4s ease',
      }}>

        {/* Logo */}
        <Link href="/" style={{
          position: 'relative', zIndex: 210,
          textDecoration: 'none', display: 'flex', alignItems: 'center',
          flexShrink: 0,
        }}>
          <img src="/logo.png" alt="Pira Web" style={{ height: '28px', width: 'auto' }} />
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{
            display: 'flex', gap: '20px', listStyle: 'none',
            margin: 0, padding: 0, flexWrap: 'nowrap', alignItems: 'center',
          }}>
            {links.map(l => {
              const active = pathname === l.href
              return (
                <li key={l.href} style={{ whiteSpace: 'nowrap' }}>
                  <Link href={l.href} style={{
                    fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: active ? 'var(--accent)' : 'var(--text)',
                    textDecoration: 'none',
                    opacity: active ? 1 : 0.55,
                    transition: 'opacity 0.3s, color 0.3s',
                    borderBottom: active ? '1px solid var(--accent)' : '1px solid transparent',
                    paddingBottom: '2px',
                    display: 'block',
                  }}>
                    {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}

        {/* Hamburger mobile */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            style={{
              background: 'none', border: 'none', cursor: 'none',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '5px', padding: '8px',
              position: 'relative', zIndex: 210,
              width: '44px', height: '44px',
            }}
          >
            <span style={{
              display: 'block', width: '24px', height: '1.5px',
              background: 'var(--text)',
              transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '24px', height: '1.5px',
              background: 'var(--text)',
              transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? 'scaleX(0)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '24px', height: '1.5px',
              background: 'var(--text)',
              transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
            }} />
          </button>
        )}
      </nav>

      {/* Menu fullscreen mobile */}
      {isMobile && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 150,
          background: 'var(--bg)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '8px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.4s ease',
        }}>
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(36px,8vw,56px)',
                letterSpacing: '0.03em',
                color: pathname === l.href ? 'var(--accent)' : 'var(--text)',
                textDecoration: 'none',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
                lineHeight: 1.3,
              }}
            >
              {l.label}
            </Link>
          ))}
          <p style={{
            fontSize: '12px', color: 'var(--muted)',
            marginTop: '32px', letterSpacing: '0.1em',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.4s ease 0.5s',
          }}>
            info@piraweb.it
          </p>
        </div>
      )}
    </>
  )
}