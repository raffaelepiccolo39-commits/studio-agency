'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import ConsulenzaForm from '@/components/sections/ConsulenzaForm'
import { useInView } from 'react-intersection-observer'

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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      name: 'Contatti — Pira Web Creative Agency',
      url: 'https://www.piraweb.it/contatti',
    },
    {
      '@type': 'LocalBusiness',
      name: 'Pira Web Creative Agency',
      url: 'https://www.piraweb.it',
      telephone: '+39 081 175 60017',
      email: 'info@piraweb.it',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Via A.Petrillo N°171',
        postalCode: '81030',
        addressLocality: 'Casapesenna',
        addressRegion: 'CE',
        addressCountry: 'IT',
      },
    },
  ],
}

export default function ContattiPage() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Cursor />
      <Navbar />
      <main
        ref={ref}
        style={{
          background: 'var(--bg)',
          color: 'var(--text)',
          minHeight: '100vh',
          paddingTop: 'clamp(110px, 12vw, 160px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 clamp(24px, 5vw, 40px)',
          }}
        >
          <div className="consulenza-grid">
            {/* Sinistra: contatti + headline */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a
                  href="mailto:info@piraweb.it"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '16px',
                    color: 'var(--text)',
                    textDecoration: 'none',
                  }}
                >
                  info@piraweb.it
                </a>
                <p style={{
                  margin: 0,
                  fontSize: '15px',
                  color: 'rgba(240,237,230,0.7)',
                  lineHeight: 1.6,
                }}>
                  Via A.Petrillo N°171<br />
                  81030 Casapesenna CE, IT
                </p>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                lineHeight: 1.1,
                color: 'var(--text)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}>
                Scopri come possiamo aiutare la tua azienda.
              </h1>

              <p style={{
                margin: 0,
                fontSize: '14px',
                color: 'rgba(240,237,230,0.55)',
                lineHeight: 1.6,
                maxWidth: '420px',
              }}>
                Richiedi una consulenza gratuita compilando il breve modulo.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <a href="tel:+3908117560017" style={{
                  fontFamily: 'var(--font-syne)', fontSize: '15px',
                  color: 'rgba(240,237,230,0.8)', textDecoration: 'none',
                }}>+39 081 175 60017</a>
                <a href="tel:+393318535698" style={{
                  fontFamily: 'var(--font-syne)', fontSize: '15px',
                  color: 'rgba(240,237,230,0.8)', textDecoration: 'none',
                }}>+39 331 853 5698</a>
                <a href="tel:+393517214074" style={{
                  fontFamily: 'var(--font-syne)', fontSize: '15px',
                  color: 'rgba(240,237,230,0.8)', textDecoration: 'none',
                }}>+39 351 721 4074</a>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: 'var(--text)' }}>
                <a href="https://www.instagram.com/piraweb_agency/" target="_blank" rel="noreferrer"
                  style={{ color: 'inherit', display: 'flex' }} aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="https://www.facebook.com/pirawebonline" target="_blank" rel="noreferrer"
                  style={{ color: 'inherit', display: 'flex' }} aria-label="Facebook">
                  <FacebookIcon />
                </a>
              </div>
            </aside>

            {/* Destra: form */}
            <ConsulenzaForm variant="dark" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
