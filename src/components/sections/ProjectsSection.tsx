import Link from 'next/link'
import { projects } from '@/data/projects'

const featured = projects.slice(0, 3)

export default function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)' }}>
      <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '64px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--muted)' }} />Progetti Recenti
      </p>
      <div className="projects-home-grid">
        {featured.map((p, i) => (
          <Link key={p.slug} href={`/progetti/${p.slug}`} className="project-card" style={{
            position: 'relative', overflow: 'hidden', display: 'block',
            aspectRatio: i === 0 ? '16/7' : '4/3',
            background: p.color,
            gridColumn: i === 0 ? '1 / -1' : undefined,
            textDecoration: 'none',
          }}>
            <div style={{ width: '100%', height: '100%', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
                <defs>
                  <linearGradient id={`g-${p.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={p.accent} stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill={`url(#g-${p.slug})`} />
              </svg>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(60px,10vw,120px)', color: p.accent, opacity: 0.06, position: 'relative', zIndex: 1 }}>
                {p.title.toUpperCase()}
              </span>
            </div>
            <div className="project-info" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', background: 'linear-gradient(to top,rgba(10,10,10,0.95) 0%,transparent 100%)', transform: 'translateY(8px)', transition: 'transform 0.4s ease' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: p.accent, marginBottom: '8px', opacity: 0.9 }}>{p.platform}</p>
              <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: i === 0 ? 'clamp(36px,5vw,56px)' : 'clamp(24px,3vw,36px)', letterSpacing: '0.03em', lineHeight: 1, color: 'var(--text)' }}>
                {p.title.toUpperCase()}
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px' }}>{p.services.join(' · ')}</p>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <Link href="/progetti" className="link-muted" style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
          Vedi tutti i progetti →
        </Link>
      </div>
    </section>
  )
}
