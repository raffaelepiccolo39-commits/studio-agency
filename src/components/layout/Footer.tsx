'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

function FooterAccordion({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Bordo accent a sinistra */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: open || hovered ? '3px' : '0',
        background: 'var(--accent)',
        transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
      }} />

      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 0 16px 12px',
          paddingLeft: open || hovered ? '12px' : '0',
          transition: 'padding 0.4s ease',
        }}
      >
        <span style={{
          fontSize: '11px', letterSpacing: '0.15em',
          color: open || hovered ? 'var(--text)' : 'var(--muted)',
          transition: 'color 0.3s',
          fontFamily: 'inherit',
        }}>
          ({id}.) {label}
        </span>
        <span style={{
          fontSize: '18px', fontWeight: 300, lineHeight: 1,
          color: open ? 'var(--accent)' : 'var(--muted)',
          transition: 'transform 0.4s ease, color 0.3s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          display: 'block',
        }}>
          +
        </span>
      </button>

      <div style={{
        maxHeight: open ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ paddingBottom: '20px', paddingLeft: '16px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <footer ref={ref} style={{
      padding: '64px 40px 40px',
      borderTop: '1px solid var(--border)',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
      transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
    }}>

      {/* Tre colonne accordion */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0 48px',
        marginBottom: '48px',
      }} className="footer-accordion-grid">

        {/* (a.) CONTACT */}
        <FooterAccordion id="a" label="CONTACT">
          <a href="mailto:info@piraweb.it" style={{ display: 'block', fontSize: '14px', color: 'var(--text)', textDecoration: 'none', marginBottom: '8px' }}>
            info@piraweb.it
          </a>
          <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
            Via A.Petrillo N°171<br />
            81030 Casapesenna CE, IT
          </p>
          <a href="tel:+390811756001" style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', marginTop: '8px' }}>
            +39 081 175 60017
          </a>
          <a href="tel:+393318535698" style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', textDecoration: 'none' }}>
            +39 331 853 5698
          </a>
          <a href="tel:+393517214074" style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', textDecoration: 'none' }}>
            +39 351 721 4074
          </a>
        </FooterAccordion>

        {/* (b.) NAVIGAZIONE */}
        <FooterAccordion id="b" label="NAVIGAZIONE">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Chi Siamo', href: '/chi-siamo' },
              { label: 'Cosa Facciamo', href: '/cosa-facciamo' },
              { label: 'Progetti', href: '/progetti' },
              { label: 'Blog', href: '/blog' },
              { label: 'Lavora con Noi', href: '/lavora-con-noi' },
              { label: 'Contatti', href: '/contatti' },
            ].map(l => (
              <a key={l.label} href={l.href}
                style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {l.label}
              </a>
            ))}
          </div>
        </FooterAccordion>

        {/* (c.) SOCIAL */}
        <FooterAccordion id="c" label="SOCIAL">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/piraweb_agency/' },
              { label: 'Facebook', href: 'https://www.facebook.com/pirawebonline' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/company/pira-web-creative-agency/' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {s.label}
              </a>
            ))}
          </div>
        </FooterAccordion>

      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        paddingTop: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '24px',
      }}>
        <div>
          <img src="/logo.png" alt="Pira Web" className="footer-logo" style={{ display: 'block', marginBottom: '16px' }} />
          <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7 }}>
            ©2018–{year} Pira Web S.r.l. — Tutti i diritti riservati<br />
            P.IVA IT04891370613
          </p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <a href="/privacy" style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/cookie" style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'none' }}>Cookie Policy</a>
          </div>
        </div>
        <p style={{ fontSize: '11px', color: 'rgba(240,237,230,0.2)', letterSpacing: '0.08em', textAlign: 'right' }}>
          Designed & Built by Pira Web Creative Agency
        </p>
      </div>

    </footer>
  )
}
