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
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Fade bordi */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(to right, var(--bg), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(to left, var(--bg), transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex',
          animation: 'marquee 28s linear infinite',
          width: 'max-content',
        }}>
          {[...partners, ...partners].map((p, i) => (
            <div key={i} style={{
              padding: '20px 32px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#ffffff',
              marginRight: '2px',
              minWidth: '160px', height: '88px', flexShrink: 0,
            }}>
              <img
                src={p.logo}
                alt={p.name}
                style={{
                  maxHeight: '36px', maxWidth: '110px',
                  width: 'auto', objectFit: 'contain',
                  filter: 'grayscale(100%) opacity(0.55)',
                  transition: 'filter 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0%) opacity(1)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(100%) opacity(0.55)')}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}