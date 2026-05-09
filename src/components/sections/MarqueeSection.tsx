const items = [
  'STRATEGIA',
  'TECNOLOGIA',
  'CREATIVITÀ',
  'PERFORMANCE',
  'CRESCITA',
  'INNOVAZIONE',
  'RISULTATI',
  'VISIONE',
]

export default function MarqueeSection() {
  const doubled = [...items, ...items, ...items]

  return (
    <div
      style={{
        background: 'var(--accent)',
        padding: '15px 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 38s linear infinite',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '24px',
              fontFamily: 'var(--font-syne)',
              fontWeight: 500,
              fontSize: '16px',
              color: '#0a0a0a',
              padding: '0 12px',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
            <span aria-hidden style={{ opacity: 0.7 }}>—</span>
          </span>
        ))}
      </div>
    </div>
  )
}
