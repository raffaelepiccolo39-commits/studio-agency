const items = [
  'Brand Direction', 'UX / UI Design', 'Web Development',
  'Performance Marketing', 'System Integration', 'SEO & Analytics', 'E-commerce',
]

export default function MarqueeSection() {
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '18px 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 22s linear infinite',
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '13px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              padding: '0 40px',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            {item}
            <span style={{ color: 'var(--accent)', fontSize: '10px' }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
