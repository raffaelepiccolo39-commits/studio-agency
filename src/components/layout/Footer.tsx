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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.265.058-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.069-4.849.062-1.366.336-2.633 1.311-3.608C4.413 2.509 5.68 2.235 7.046 2.173 8.311 2.115 8.691 2.103 11.895 2.103h.105ZM12 0C8.741 0 8.332.014 7.052.072 5.775.13 4.902.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.902.131 5.775.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.06 1.277.261 2.15.558 2.912.306.789.717 1.459 1.384 2.126.667.667 1.337 1.078 2.126 1.384.762.297 1.635.499 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.06 2.15-.261 2.912-.558.789-.306 1.459-.717 2.126-1.384.667-.667 1.078-1.337 1.384-2.126.297-.762.499-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.06-1.277-.261-2.15-.558-2.912-.306-.789-.717-1.459-1.384-2.126C20.959 1.347 20.289.936 19.5.63c-.762-.297-1.635-.499-2.912-.558C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" fill="currentColor"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
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
      Hai un’idea da realizzare?<br />
      Confrontiamoci.
    </>
  )

  return (
    <footer
      ref={ref}
      style={{
        background: '#ffffff',
        padding: '50px 0',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div
        className="footer-home-inner"
        style={{
          background: '#ffffff',
          padding: '0 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          minHeight: '479px',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'inline-block' }}>
          <img src="/logo.png" alt="Pira Web" style={{ height: '68px', width: 'auto', display: 'block' }} />
        </Link>

        {/* Middle section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            {/* Menu row */}
            <div
              className="footer-row"
              style={{
                display: 'flex',
                gap: '48px',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 400,
                fontSize: '16px',
                color: '#6a6a6a',
                minWidth: '80px',
              }}>
                (menù)
              </span>
              <ul style={{
                display: 'flex',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                gap: 'clamp(20px, 4vw, 60px)',
                flexWrap: 'wrap',
              }}>
                {menuLinks.map(l => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      style={{
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 500,
                        fontSize: '16px',
                        color: '#0a0a0a',
                        textDecoration: 'none',
                        transition: 'color 0.3s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#6a6a6a')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#0a0a0a')}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts row */}
            <div
              className="footer-row"
              style={{
                display: 'flex',
                gap: '48px',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 400,
                fontSize: '16px',
                color: '#6a6a6a',
                minWidth: '80px',
              }}>
                (contatti)
              </span>
              <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 60px)', alignItems: 'center', flexWrap: 'wrap' }}>
                <a
                  href="mailto:info@piraweb.it"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#0a0a0a',
                    textDecoration: 'none',
                  }}
                >
                  info@piraweb.it
                </a>
                <a
                  href="https://www.instagram.com/piraweb_agency/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#0a0a0a', display: 'flex' }}
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.facebook.com/pirawebonline"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#0a0a0a', display: 'flex' }}
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Big CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-end', width: '100%' }}>
            <h2 style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 0.95,
              color: '#0a0a0a',
              textAlign: 'right',
              margin: 0,
            }}>
              {resolvedTitle}
            </h2>
            <Link
              href="/contatti"
              style={{
                background: 'var(--accent)',
                color: '#0a0a0a',
                fontFamily: 'var(--font-syne)',
                fontWeight: 500,
                fontSize: '16px',
                padding: '10px 40px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background 0.3s',
              }}
            >
              RICHIEDI UNA CONSULENZA
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="footer-bottom"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '16px',
            color: '#b2b2b2',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>PRIVACY POLICY</Link>
            <span>•</span>
            <Link href="/cookie" style={{ color: 'inherit', textDecoration: 'none' }}>COOKIE POLICY</Link>
          </div>
          <p style={{ margin: 0 }}>
            ©2018–{year} Pira Web S.r.l. — Tutti i diritti riservati
          </p>
          <p style={{ margin: 0 }}>P.IVA IT04891370613</p>
        </div>
      </div>
    </footer>
  )
}
