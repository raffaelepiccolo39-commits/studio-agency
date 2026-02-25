import Link from 'next/link'
import { SanityProject } from '@/types'

const MOCK_PROJECTS: SanityProject[] = [
  { _id: '1', title: 'Brand Alpha', slug: { current: 'brand-alpha' }, platform: 'Shopify Plus', services: ['UX/UI', 'Development', 'SEO'], coverColor: '#0f1a0a', accentColor: '#c8f55a' },
  { _id: '2', title: 'Studio Beta', slug: { current: 'studio-beta' }, platform: 'Custom', services: ['Brand', 'UX/UI'], coverColor: '#1a0f0a', accentColor: '#ff4d1c' },
  { _id: '3', title: 'Gamma Corp', slug: { current: 'gamma-corp' }, platform: 'Next.js', services: ['Marketing', 'CRO'], coverColor: '#0a0a1a', accentColor: '#5a8cf5' },
]

function ProjectCard({ project, featured }: { project: SanityProject; featured?: boolean }) {
  return (
    <Link href={`/progetti/${project.slug.current}`} className="project-card" style={{ position: 'relative', overflow: 'hidden', display: 'block', aspectRatio: featured ? '16/7' : '4/3', background: project.coverColor || 'var(--surface)', gridColumn: featured ? '1 / -1' : undefined, textDecoration: 'none' }}>
      <div style={{ width: '100%', height: '100%', background: project.coverColor, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
          <defs><linearGradient id={`g-${project._id}`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={project.accentColor} stopOpacity="0.15" /><stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" /></linearGradient></defs>
          <rect width="100%" height="100%" fill={`url(#g-${project._id})`} />
        </svg>
        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(60px,10vw,120px)', color: project.accentColor, opacity: 0.06, position: 'relative', zIndex: 1 }}>{project.title.toUpperCase()}</span>
      </div>
      <div className="project-info" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', background: 'linear-gradient(to top,rgba(10,10,10,0.95) 0%,transparent 100%)', transform: 'translateY(8px)', transition: 'transform 0.4s ease' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: project.accentColor || 'var(--accent)', marginBottom: '8px', opacity: 0.9 }}>{project.platform}</p>
        <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: featured ? 'clamp(36px,5vw,56px)' : 'clamp(24px,3vw,36px)', letterSpacing: '0.03em', lineHeight: 1, color: 'var(--text)' }}>{project.title.toUpperCase()}</h3>
        <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px' }}>{project.services?.join(' · ')}</p>
      </div>
    </Link>
  )
}

export default function ProjectsSection({ projects }: { projects: SanityProject[] }) {
  const data = projects.length > 0 ? projects : MOCK_PROJECTS
  return (
    <section id="projects" style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)' }}>
      <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '64px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--muted)' }} />Progetti Recenti
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '2px' }}>
        {data.map((project, i) => <ProjectCard key={project._id} project={project} featured={i === 0} />)}
      </div>
      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <Link href="/progetti" className="link-muted" style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
          Vedi tutti i progetti →
        </Link>
      </div>
    </section>
  )
}
