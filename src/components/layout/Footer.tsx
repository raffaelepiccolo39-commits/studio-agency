'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSiteSettings } from '@/components/SiteSettingsProvider'
import { socialAttivi } from '@/data/site'
import { useConsenso } from '@/lib/consenso'

const SR_ONLY: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
}

const phoneAria = (n: string) =>
  `Numero di telefono ${n.replace(/\D/g, '').split('').join(' ')}`

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.265.058-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.069-4.849.062-1.366.336-2.633 1.311-3.608C4.413 2.509 5.68 2.235 7.046 2.173 8.311 2.115 8.691 2.103 11.895 2.103h.105ZM12 0C8.741 0 8.332.014 7.052.072 5.775.13 4.902.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.902.131 5.775.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.06 1.277.261 2.15.558 2.912.306.789.717 1.459 1.384 2.126.667.667 1.337 1.078 2.126 1.384.762.297 1.635.499 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.06 2.15-.261 2.912-.558.789-.306 1.459-.717 2.126-1.384.667-.667 1.078-1.337 1.384-2.126.297-.762.499-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.06-1.277-.261-2.15-.558-2.912-.306-.789-.717-1.459-1.384-2.126C20.959 1.347 20.289.936 19.5.63c-.762-.297-1.635-.499-2.912-.558C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" fill="currentColor"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.989 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.251h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" fill="currentColor"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" fill="currentColor"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104Z" fill="currentColor"/>
    </svg>
  )
}

/** Le icone disponibili, nello stesso ordine in cui socialAttivi() le restituisce. */
const ICONE_SOCIAL = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  tiktok: TikTokIcon,
} as const

const NOMI_SOCIAL = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
} as const

type FooterProps = {
  ctaTitle?: React.ReactNode
  ctaHref?: string
  /** Testo del pulsante grande; di default 'Richiedi una consulenza'. */
  ctaLabel?: string
}

export default function Footer({ ctaTitle, ctaHref = '/contatti', ctaLabel = 'Richiedi una consulenza' }: FooterProps = {}) {
  const year = new Date().getFullYear()
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const trustboxRef = useRef<HTMLDivElement>(null)

  // Il widget recensioni è un contenuto di terze parti: si monta SOLO con il
  // consenso marketing. Chi rifiuta vede al suo posto un link a Trustpilot,
  // che non fa partire nessuna richiesta finché non lo clicca.
  const consensoMarketing = useConsenso('marketing')

  // In una SPA il bootstrap Trustpilot non ri-scansiona il DOM ad ogni
  // navigazione client-side: forziamo il render dopo il mount, e di nuovo se il
  // consenso arriva dopo (l'utente accetta a footer già montato).
  useEffect(() => {
    if (!consensoMarketing) return
    const w = window as unknown as { Trustpilot?: { loadFromElement: (el: HTMLElement | null, force?: boolean) => void } }
    if (w.Trustpilot && trustboxRef.current) {
      w.Trustpilot.loadFromElement(trustboxRef.current, true)
      return
    }
    // Lo script parte da CookieBanner nello stesso momento: se non è ancora
    // pronto lo aspettiamo, senza bloccare nulla.
    const attesa = setInterval(() => {
      const win = window as unknown as { Trustpilot?: { loadFromElement: (el: HTMLElement | null, force?: boolean) => void } }
      if (win.Trustpilot && trustboxRef.current) {
        win.Trustpilot.loadFromElement(trustboxRef.current, true)
        clearInterval(attesa)
      }
    }, 400)
    const stop = setTimeout(() => clearInterval(attesa), 10000)
    return () => { clearInterval(attesa); clearTimeout(stop) }
  }, [consensoMarketing])

  // Contatti e social arrivano dalle Impostazioni sito su Sanity (con i valori
  // storici come riserva, vedi src/data/site.ts).
  const impostazioni = useSiteSettings()
  const [telefonoPrincipale, ...altriTelefoni] = impostazioni.telefoni
  const social = socialAttivi(impostazioni)

  const resolvedTitle = ctaTitle ?? (
    <>
      Hai un’idea da realizzare?<br />
      Parliamone insieme.
    </>
  )

  return (
    <footer
      ref={ref}
      className="footer-dark"
      style={{
        background: '#0a0a0a',
        color: '#ffffff',
        padding: '50px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Layout: contatti+sede stack left, CTA prominent right */}
      <div
        className="footer-columns"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 1fr) minmax(320px, 1.6fr)',
          gap: '60px',
          alignItems: 'flex-start',
        }}
      >
        {/* Sinistra: contatti unificato (email, telefoni, sede) */}
        <section
          aria-labelledby="footer-contatti"
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <h3 id="footer-contatti" style={SR_ONLY}>Contatti</h3>
          <p aria-hidden style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 400,
            fontSize: '14px',
            color: '#9a9a9a',
            margin: 0,
            letterSpacing: '0.02em',
          }}>
            (contatti)
          </p>

          <a
            href={`mailto:${impostazioni.email}`}
            className="footer-email-primary"
            aria-label={`Scrivici a ${impostazioni.email}`}
          >
            {impostazioni.email}
          </a>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {telefonoPrincipale && (
              <a
                href={`tel:${telefonoPrincipale.numero}`}
                className="footer-phone-primary"
                aria-label={phoneAria(telefonoPrincipale.etichetta)}
              >
                {telefonoPrincipale.etichetta}
              </a>
            )}
            {altriTelefoni.map(tel => (
              <a
                key={tel.numero}
                href={`tel:${tel.numero}`}
                className="footer-phone-secondary"
                aria-label={phoneAria(tel.etichetta)}
              >
                {tel.etichetta}
              </a>
            ))}
          </div>

          <address style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '16px',
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.5,
            fontStyle: 'normal',
            paddingTop: '8px',
          }}>
            {impostazioni.indirizzo.via}<br />
            {impostazioni.indirizzo.cap} {impostazioni.indirizzo.citta.toUpperCase()}{' '}
            {impostazioni.indirizzo.provincia}, {impostazioni.indirizzo.nazione}
          </address>

          {/* Recensioni: il widget Trustpilot solo col consenso marketing,
              altrimenti un link che non contatta nessuno finché non si clicca. */}
          {consensoMarketing ? (
            <div
              ref={trustboxRef}
              className="trustpilot-widget"
              data-locale="it-IT"
              data-template-id="56278e9abfbbba0bdcd568bc"
              data-businessunit-id="6a30e7af0059b090210c3582"
              data-style-height="52px"
              data-style-width="100%"
              data-token="91295a7c-a594-4b7c-9593-77b4ccbf35d4"
              style={{ maxWidth: '320px' }}
            >
              <a href={impostazioni.trustpilot} target="_blank" rel="noopener noreferrer">Trustpilot</a>
            </div>
          ) : (
            <a
              href={impostazioni.trustpilot}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-bottom-link"
              style={{ maxWidth: '320px' }}
            >
              Leggi le recensioni su Trustpilot
            </a>
          )}
        </section>

        {/* Destra: CTA prominente */}
        <div
          className="footer-cta-block"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '40px',
          }}
        >
          <h2 style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 5.5vw, 80px)',
            lineHeight: 0.95,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            {resolvedTitle}
          </h2>
          <Link
            href={ctaHref}
            className="footer-cta-button footer-cta-button-lg"
            aria-label={ctaLabel}
          >
            <span>{ctaLabel.toUpperCase()}</span>
            <svg
              className="footer-cta-arrow"
              width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false"
            >
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Bottom area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          fontFamily: 'var(--font-syne)',
          fontWeight: 500,
          fontSize: '14px',
          color: '#9a9a9a',
          letterSpacing: '0.02em',
        }}
      >
        {/* Riga 1: Privacy/Cookie a sx, social a dx */}
        <div
          className="footer-bottom-bar"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ margin: 0 }}>
            <Link href="/privacy" className="footer-bottom-link">PRIVACY POLICY</Link>
            <span aria-hidden> • </span>
            <Link href="/cookie" className="footer-bottom-link">COOKIE POLICY</Link>
            <span aria-hidden> • </span>
            <button type="button" data-cc="show-preferencesModal" className="footer-bottom-link" style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>
              PREFERENZE COOKIE
            </button>
          </p>
          <ul style={{ display: 'flex', alignItems: 'center', gap: '4px', listStyle: 'none', margin: 0, padding: 0 }}>
            {social.map(({ rete, url }) => {
              const Icona = ICONE_SOCIAL[rete]
              return (
                <li key={rete}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social-icon"
                    aria-label={`${NOMI_SOCIAL[rete]} (apre in nuova scheda)`}
                  >
                    <Icona />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Riga 2: Copyright + P.IVA centrato come unica frase */}
        <p style={{ margin: 0, textAlign: 'center' }}>
          ©{year} {impostazioni.ragioneSociale} — Tutti i diritti riservati — P.IVA {impostazioni.partitaIva}
        </p>
      </div>

      {/* Il loader Trustpilot non sta più qui: lo carica CookieBanner dopo il
          consenso marketing. Prima partiva su tutte le pagine col footer. */}
    </footer>
  )
}
