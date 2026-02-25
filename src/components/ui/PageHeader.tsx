interface PageHeaderProps {
  tag?: string
  title: string
  titleAccent?: string
  titleAfter?: string
  subtitle?: string
}

export default function PageHeader({ tag, title, titleAccent, titleAfter, subtitle }: PageHeaderProps) {
  return (
    <section style={{
      paddingTop: 'clamp(120px, 18vw, 180px)',
      paddingBottom: 'clamp(60px, 8vw, 100px)',
      paddingLeft: 'clamp(24px, 5vw, 40px)',
      paddingRight: 'clamp(24px, 5vw, 40px)',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ghost background text */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-bebas)',
        fontSize: 'clamp(100px, 18vw, 260px)',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255,255,255,0.03)',
        whiteSpace: 'nowrap', pointerEvents: 'none',
        zIndex: 0,
      }}>
        {title.toUpperCase()}
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
        {tag && (
          <p style={{
            fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: '24px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
            {tag}
          </p>
        )}

        <h1 style={{ lineHeight: 0.9 }}>
          <span style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(56px, 9vw, 140px)',
            letterSpacing: '-0.01em',
            display: 'block',
          }}>
            {title}
          </span>
          {titleAccent && (
            <span style={{
              fontFamily: 'var(--font-dm-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(56px, 9vw, 140px)',
              color: 'var(--accent)',
              display: 'block',
            }}>
              {titleAccent}
            </span>
          )}
          {titleAfter && (
            <span style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(56px, 9vw, 140px)',
              letterSpacing: '-0.01em',
              display: 'block',
            }}>
              {titleAfter}
            </span>
          )}
        </h1>

        {subtitle && (
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.8,
            color: 'rgba(240,237,230,0.55)', maxWidth: '560px', marginTop: '32px',
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
