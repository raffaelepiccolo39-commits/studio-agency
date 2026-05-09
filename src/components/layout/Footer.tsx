'use client'

import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

const menuLinks = [
  { label: 'HOME', href: '/' },
  { label: 'SERVIZI', href: '/cosa-facciamo' },
  { label: 'PROGETTI', href: '/progetti' },
  { label: 'BLOG', href: '/blog' },
  { label: 'LAVORA CON NOI', href: '/lavora-con-noi' },
  { label: 'CONTATTI', href: '/contatti' },
]

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.265.058-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.069-4.849.062-1.366.336-2.633 1.311-3.608C4.413 2.509 5.68 2.235 7.046 2.173 8.311 2.115 8.691 2.103 11.895 2.103h.105ZM12 0C8.741 0 8.332.014 7.052.072 5.775.13 4.902.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.902.131 5.775.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.06 1.277.261 2.15.558 2.912.306.789.717 1.459 1.384 2.126.667.667 1.337 1.078 2.126 1.384.762.297 1.635.499 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.06 2.15-.261 2.912-.558.789-.306 1.459-.717 2.126-1.384.667-.667 1.078-1.337 1.384-2.126.297-.762.499-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.06-1.277-.261-2.15-.558-2.912-.306-.789-.717-1.459-1.384-2.126C20.959 1.347 20.289.936 19.5.63c-.762-.297-1.635-.499-2.912-.558C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" fill="currentColor"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.989 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.251h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" fill="currentColor"/>
    </svg>
  )
}

type FooterProps = {
  ctaTitle?: React.ReactNode
}

export default function Footer({ ctaTitle }: FooterProps = {}) {
  const year = new Date().getFullYear()
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const resolvedTitle = ctaTitle ?? (
    <>
      Hai un’idea<br />
      da realizzare?
    </>
  )

  return (
    <footer
      ref={ref}
      style={{
        background: '#ffffff',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Big CTA */}
      <div
        style={{
          padding: 'clamp(80px, 11vw, 160px) clamp(24px, 5vw, 60px) clamp(60px, 7vw, 100px)',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(40px, 5vw, 60px)',
        }}
      >
        <h2 style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(72px, 14vw, 200px)',
          lineHeight: 0.92,
          color: '#0a0a0a',
          letterSpacing: '-0.01em',
          margin: 0,
        }}>
          {resolvedTitle}
        </h2>

        <Link
          href="/contatti"
          className="footer-cta-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '20px',
            alignSelf: 'flex-start',
            background: '#0a0a0a',
            color: '#ffffff',
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '16px',
            padding: '20px 40px',
            textDecoration: 'none',
            transition: 'background 0.4s, color 0.4s, padding 0.4s',
            letterSpacing: '0.04em',
          }}
        >
          <span>RICHIEDI UNA CONSULENZA</span>
          <svg
            className="footer-cta-arrow"
            width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden
            style={{ transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}
          >
            <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </Link>
      </div>

      {/* Middle: menu + contacts grid */}
      <div
        className="footer-grid-bottom"
        style={{
          padding: 'clamp(40px, 5vw, 60px) clamp(24px, 5vw, 60px) clamp(40px, 4vw, 60px)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'flex-start',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'inline-block' }}>
          <img src="/logo.png" alt="Pira Web" style={{ height: '64px', width: 'auto', display: 'block' }} />
        </Link>

        {/* Menu links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 400,
            fontSize: '13px',
            color: '#b2b2b2',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            (menù)
          </span>
          <ul style={{
            display: 'flex',
            flexWrap: 'wrap',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: 'clamp(16px, 2.5vw, 36px)',
          }}>
            {menuLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
          <span style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 400,
            fontSize: '13px',
            color: '#b2b2b2',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            (contatti)
          </span>
          <a href="mailto:info@piraweb.it" className="footer-link">
            INFO@PIRAWEB.IT
          </a>
          <div style={{ display: 'flex', gap: '14px', marginTop: '8px' }}>
            <a
              href="https://www.instagram.com/piraweb_agency/"
              target="_blank"
              rel="noreferrer"
              className="footer-social"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com/pirawebonline"
              target="_blank"
              rel="noreferrer"
              className="footer-social"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="footer-bottom"
        style={{
          padding: 'clamp(20px, 2vw, 30px) clamp(24px, 5vw, 60px)',
          borderTop: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontFamily: 'var(--font-syne)',
          fontWeight: 500,
          fontSize: '13px',
          color: '#b2b2b2',
          letterSpacing: '0.04em',
        }}
      >
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link href="/privacy" className="footer-link-tiny">PRIVACY POLICY</Link>
          <Link href="/cookie" className="footer-link-tiny">COOKIE POLICY</Link>
        </div>
        <p style={{ margin: 0 }}>
          ©2018–{year} Pira Web S.r.l. — Tutti i diritti riservati
        </p>
        <p style={{ margin: 0 }}>P.IVA IT04891370613</p>
      </div>
    </footer>
  )
}
