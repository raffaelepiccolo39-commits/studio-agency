'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import ConsulenzaForm from '@/components/sections/ConsulenzaForm'
import { useInView } from 'react-intersection-observer'
import { useSiteSettings } from '@/components/SiteSettingsProvider'
import type { SiteSettings } from '@/data/site'
import { jsonLdScript } from '@/lib/jsonLd'

function jsonLdDa(s: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        name: `Contatti — ${s.nomeCommerciale}`,
        url: 'https://www.piraweb.it/contatti',
      },
      {
        '@type': 'LocalBusiness',
        name: s.nomeCommerciale,
        url: 'https://www.piraweb.it',
        telephone: s.telefoni[0]?.etichetta,
        email: s.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: s.indirizzo.via,
          postalCode: s.indirizzo.cap,
          addressLocality: s.indirizzo.citta,
          addressRegion: s.indirizzo.provincia,
          addressCountry: s.indirizzo.nazione,
        },
      },
    ],
  }
}

export default function ContattiPage() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const impostazioni = useSiteSettings()
  const jsonLd = jsonLdDa(impostazioni)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Cursor />
      <Navbar />
      <main
        ref={ref}
        style={{
          background: 'var(--bg)',
          color: 'var(--text)',
          minHeight: '100vh',
          paddingTop: 'clamp(160px, 16vw, 220px)',
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
                  href={`mailto:${impostazioni.email}`}
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '16px',
                    color: 'var(--text)',
                    textDecoration: 'none',
                  }}
                >
                  {impostazioni.email}
                </a>
                <p style={{
                  margin: 0,
                  fontSize: '15px',
                  color: 'rgba(240,237,230,0.7)',
                  lineHeight: 1.6,
                }}>
                  {impostazioni.indirizzo.via}<br />
                  {impostazioni.indirizzo.cap} {impostazioni.indirizzo.citta}{' '}
                  {impostazioni.indirizzo.provincia}, {impostazioni.indirizzo.nazione}
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
