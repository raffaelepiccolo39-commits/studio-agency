'use client'

const partners = [
  { name: 'Google', logo: '/partners/google.png' },
  { name: 'Trustpilot', logo: '/partners/trustpilot.png' },
  { name: 'Meta', logo: '/partners/meta.png' },
  { name: 'Spoki', logo: '/partners/spoki.png' },
  { name: 'Klaviyo', logo: '/partners/klavyo.png' },
  { name: 'Shopify', logo: '/partners/shopify.png' },
  { name: 'TikTok', logo: '/partners/tiktok.png' },
]

export default function PartnersSection() {
  return (
    <section style={{
      padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,40px)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <p style={{
        fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--muted)', textAlign: 'center', marginBottom: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
      }}>
        <span style={{ display: 'inline-block', width: '40px', height: '1px', background: 'var(--border)' }} />
        I nostri partner
        <span style={{ display: 'inline-block', width: '40px', height: '1px', background: 'var(--border)' }} />
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '2px',
      }}>
        {partners.map((p, i) => (
          <div key={i} style={{
            padding: '32px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#ffffff', minHeight: '100px',
          }}>
            <img
              src={p.logo}
              alt={p.name}
              style={{
                maxHeight: '40px', maxWidth: '120px',
                width: 'auto', objectFit: 'contain',
                filter: 'grayscale(100%) opacity(0.6)',
                transition: 'filter 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0%) opacity(1)')}
              onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(100%) opacity(0.6)')}
            />
          </div>
        ))}
      </div>
    </section>
  )
}