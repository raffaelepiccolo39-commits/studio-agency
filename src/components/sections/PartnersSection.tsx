'use client'

const partners = [
  { name: 'Partner 1', logo: '/partners/partner1.png' },
  { name: 'Partner 2', logo: '/partners/partner2.png' },
  { name: 'Partner 3', logo: '/partners/partner3.png' },
  { name: 'Partner 4', logo: '/partners/partner4.png' },
  { name: 'Partner 5', logo: '/partners/partner5.png' },
  { name: 'Partner 6', logo: '/partners/partner6.png' },
  { name: 'Partner 7', logo: '/partners/partner7.png' },
  { name: 'Partner 8', logo: '/partners/partner8.png' },
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '2px',
      }}>
        {partners.map((p, i) => (
          <div key={i} style={{
            padding: '40px 32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--surface)', minHeight: '120px',
          }}>
            <img
              src={p.logo}
              alt={p.name}
              style={{
                maxHeight: '48px', maxWidth: '140px',
                width: 'auto', objectFit: 'contain',
                filter: 'grayscale(100%) brightness(0.5)',
                transition: 'filter 0.3s ease',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}