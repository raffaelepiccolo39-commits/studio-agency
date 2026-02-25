'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '64px 40px 40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',

      gap: '48px',
    }}>

      {/* (a.) CONTACT */}
      <div>
        <p style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: '20px' }}>
          (a.) CONTACT
        </p>
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
        <a href="tel:+393517214074" style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', textDecoration: 'none' }}>
          +39 351 721 4074
        </a>
      </div>

      {/* (b.) LEGAL */}
      <div>
        <p style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: '20px' }}>
          (b.) LEGAL
        </p>
        <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8 }}>
          ©2024–{year} Pira Web S.r.l.<br />
          P.IVA IT04891370613<br />
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
          <a href="/privacy" style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="/cookie" style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none' }}>Cookie Policy</a>
        </div>
      </div>

      {/* (c.) NAVIGAZIONE */}
      <div>
        <p style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: '20px' }}>
          (c.) NAVIGAZIONE
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'Chi Siamo', href: '/chi-siamo' },
            { label: 'Cosa Facciamo', href: '/cosa-facciamo' },
            { label: 'Progetti', href: '/progetti' },
            { label: 'Blog', href: '/blog' },
            { label: 'Lavora con Noi', href: '/lavora-con-noi' },
            { label: 'Contatti', href: '/contatti' },
          ].map(l => (
            <a key={l.label} href={l.href} style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* (d.) SOCIAL */}
      <div>
        <p style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: '20px' }}>
          (d.) SOCIAL
        </p>
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
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        gridColumn: '1 / -1',
        borderTop: '1px solid var(--border)',
        paddingTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <img src="/logo.png" alt="Pira Web" style={{ height: '128px', width: 'auto' }} />
        <p style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.08em' }}>
          ©{year} Pira Web Creative Agency — Tutti i diritti riservati
        </p>
      </div>

    </footer>
  )
}