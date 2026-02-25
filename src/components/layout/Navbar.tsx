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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Blocca scroll quando menu aperto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `${scrolled ? '14px' : '22px'} 40px`,
        background: menuOpen ? 'transparent' : scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled && !menuOpen ? 'blur(12px)' : 'none',
        borderBottom: scrolled && !menuOpen ? '1px solid var(--border)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: 'var(--font-bebas)', fontSize: '22px',
          letterSpacing: '0.05em', color: 'var(--text)', textDecoration: 'none',
          position: 'relative', zIndex: 110,
        }}>
          <img src="/logo.png" alt="Logo" style={{ height: '128px', width: 'auto' }} />
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '28px', listStyle: 'none' }} className="hidden lg:flex">
          {links.map(l => {
            const active = pathname === l.href
            return (
              <li key={l.href}>
                <Link href={l.href} style={{
                  fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: active ? 'var(--accent)' : 'var(--text)',
                  textDecoration: 'none',
                  opacity: active ? 1 : 0.55,
                  transition: 'opacity 0.3s, color 0.3s',
                  borderBottom: active ? '1px solid var(--accent)' : '1px solid transparent',
                  paddingBottom: '2px',
                }}>
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Hamburger / X button */}
         <button
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label="Menu"
  style={{
    background: 'none',
    border: 'none',
    cursor: 'none',
    position: 'relative',
    zIndex: 250,
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
  className="flex lg:hidden"
>
  {menuOpen ? (
    /* X per chiudere */
    <span style={{
      fontSize: '28px',
      color: 'var(--text)',
      lineHeight: 1,
      fontWeight: 300,
      letterSpacing: '-2px',
    }}>✕</span>
  ) : (
    /* Hamburger */
    <span style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    }}>
      <span style={{ display: 'block', width: '24px', height: '1.5px', background: 'var(--text)' }} />
      <span style={{ display: 'block', width: '24px', height: '1.5px', background: 'var(--text)' }} />
      <span style={{ display: 'block', width: '24px', height: '1.5px', background: 'var(--text)' }} />
    </span>
  )}
</button>
      </nav>

      {/* Mobile menu fullscreen */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'var(--bg)',
        zIndex: 150,
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
              fontSize: 'clamp(40px, 8vw, 64px)',
              letterSpacing: '0.03em',
              color: pathname === l.href ? 'var(--accent)' : 'var(--text)',
              textDecoration: 'none',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
              lineHeight: 1.2,
            }}
          >
            {l.label}
          </Link>
        ))}

        <p style={{
          fontSize: '12px', color: 'var(--muted)',
          marginTop: '40px', letterSpacing: '0.1em',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.4s ease 0.5s',
        }}>
         info@piraweb.it
        </p>
      </div>
    </>
  )
}
