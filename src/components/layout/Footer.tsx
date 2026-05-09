'use client'

import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

const menuLinks = [
  { label: 'HOME', href: '/' },
  { label: 'SERVIZI', href: '/cosa-facciamo' },
  { label: 'PROGETTI', href: '/progetti' },
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

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" fill="currentColor"/>
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
        padding: '50px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Logo */}
      <div>
        <Link href="/" style={{ display: 'inline-block' }}>
          <img
            src="/logo.png"
            alt="Pira Web"
            style={{
              height: '46px',
              width: 'auto',
              display: 'block',
              filter: 'invert(1)',
            }}
          />
        </Link>
      </div>

      {/* 4 columns: contatti, sede, social, menù */}
      <div
        className="footer-columns"
        style={{
          display: 'flex',
          gap: '73px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* Contatti */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', width: '215px' }}>
          <p style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 400,
            fontSize: '16px',
            color: '#6a6a6a',
            margin: 0,
          }}>
            (contatti)
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="mailto:info@piraweb.it" className="footer-link-item">
              info@piraweb.it
            </a>
            <a href="tel:+3908117560017" className="footer-link-item">
              +39 081 175 60017
            </a>
            <a href="tel:+393318535698" className="footer-link-item">
              +39 331 853 5698
            </a>
            <a href="tel:+393517214074" className="footer-link-item">
              +39 351 721 4074
            </a>
          </div>
        </div>

        {/* Sede */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', width: '215px' }}>
          <p style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 400,
            fontSize: '16px',
            color: '#6a6a6a',
            margin: 0,
          }}>
            (sede)
          </p>
          <p style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '16px',
            color: '#0a0a0a',
            margin: 0,
            lineHeight: 1.4,
          }}>
            Via A.Petrillo N°171<br />
            81030 CASAPESENNA CE, IT
          </p>
        </div>

        {/* Social */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', width: '215px' }}>
          <p style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 400,
            fontSize: '16px',
            color: '#6a6a6a',
            margin: 0,
          }}>
            (social media)
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a
              href="https://www.instagram.com/piraweb_agency/"
              target="_blank"
              rel="noreferrer"
              className="footer-social-icon"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com/pirawebonline"
              target="_blank"
              rel="noreferrer"
              className="footer-social-icon"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/pira-web/"
              target="_blank"
              rel="noreferrer"
              className="footer-social-icon"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {/* Menù */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', width: '215px' }}>
          <p style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 400,
            fontSize: '16px',
            color: '#6a6a6a',
            margin: 0,
          }}>
            (menù)
          </p>
          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}>
            {menuLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="footer-menu-link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Big CTA */}
      <h2 style={{
        fontFamily: 'var(--font-syne)',
        fontWeight: 500,
        fontSize: 'clamp(28px, 4vw, 48px)',
        lineHeight: 0.95,
        color: '#0a0a0a',
        textAlign: 'right',
        margin: 0,
        width: '100%',
      }}>
        {resolvedTitle}
      </h2>

      {/* Bottom bar */}
      <div
        className="footer-bottom-bar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          fontFamily: 'var(--font-syne)',
          fontWeight: 500,
          fontSize: '16px',
          color: '#b2b2b2',
        }}
      >
        <p style={{ margin: 0 }}>
          <Link href="/privacy" className="footer-bottom-link">PRIVACY POLICY</Link>
          <span> • </span>
          <Link href="/cookie" className="footer-bottom-link">COOKIE POLICY</Link>
        </p>
        <p style={{ margin: 0 }}>
          ©2018–{year} Pira Web S.r.l. — Tutti i diritti riservati
        </p>
        <p style={{ margin: 0 }}>P.IVA IT04891370613</p>
      </div>
    </footer>
  )
}
