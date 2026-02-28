import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export default function ProgettoPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) notFound()

  return (
    <>
      <Cursor />
      <Navbar />
      <main>

        {/* Hero */}
        <section style={{
          minHeight: '70vh', background: project.color,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 'clamp(120px,15vw,180px) clamp(24px,5vw,40px) clamp(40px,6vw,80px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 20% 50%, ${project.accent}20 0%, transparent 60%)`,
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', right: '-5%',
            fontFamily: 'var(--font-bebas)', fontSize: 'clamp(100px,18vw,260px)',
            color: 'transparent', WebkitTextStroke: `1px ${project.accent}15`,
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}>
            {project.title}
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', padding: '4px 12px', border: `1px solid ${project.accent}`, color: project.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {project.platform}
              </span>
              <span style={{ fontSize: '11px', padding: '4px 12px', border: '1px solid var(--border)', color: 'var(--muted)', letterSpacing: '0.1em' }}>
                {project.year}
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(48px,8vw,120px)', letterSpacing: '0.02em', lineHeight: 1, marginBottom: '24px' }}>
              {project.title.toUpperCase()}
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(240,237,230,0.6)', maxWidth: '560px', lineHeight: 1.7 }}>
              {project.descrizione}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
              {project.services.map(s => (
                <span key={s} style={{ fontSize: '11px', padding: '4px 12px', background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', letterSpacing: '0.08em' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* KPI */}
        <section style={{ borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: `repeat(${project.risultati.length}, 1fr)` }}>
          {project.risultati.map((r, i) => (
            <div key={i} style={{ padding: 'clamp(32px,5vw,56px) clamp(24px,4vw,40px)', borderRight: i < project.risultati.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,5vw,64px)', color: project.accent, letterSpacing: '0.02em', lineHeight: 1, marginBottom: '8px' }}>
                {r.value}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {r.label}
              </p>
            </div>
          ))}
        </section>

        {/* Sfida + Soluzione */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>
          <div style={{ padding: 'clamp(40px,7vw,80px) clamp(24px,5vw,40px)', borderRight: '1px solid var(--border)' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
              La sfida
            </p>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(240,237,230,0.7)' }}>{project.sfida}</p>
          </div>
          <div style={{ padding: 'clamp(40px,7vw,80px) clamp(24px,5vw,40px)' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
              La soluzione
            </p>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(240,237,230,0.7)' }}>{project.soluzione}</p>
          </div>
        </section>

        {/* Galleria immagini */}
        {project.immagini.length > 0 && (
          <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: '2px' }}>
              {project.immagini.map((img, i) => (
                <div key={i} style={{ aspectRatio: '4/3', background: '#111', overflow: 'hidden' }}>
                  <img src={img} alt={`${project.title} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Placeholder immagini se vuote */}
        {project.immagini.length === 0 && (
          <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{
                  aspectRatio: '4/3', background: '#111',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px dashed #222',
                }}>
                  <p style={{ fontSize: '11px', color: '#333', letterSpacing: '0.1em' }}>IMMAGINE {i}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: '#333', marginTop: '16px', letterSpacing: '0.08em' }}>
              → Aggiungi immagini in <code style={{ color: '#444' }}>public/progetti/{project.slug}/</code> e aggiornale in <code style={{ color: '#444' }}>src/data/projects.ts</code>
            </p>
          </section>
        )}

        {/* CTA */}
        <section style={{ padding: 'clamp(60px,10vw,100px) clamp(24px,5vw,40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          <Link href="/progetti" style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ← Tutti i progetti
          </Link>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '15px', color: 'rgba(240,237,230,0.5)', marginBottom: '24px' }}>Hai un progetto simile?</p>
            <Link href="/contatti" style={{
              background: 'var(--accent)', color: '#0a0a0a',
              padding: '16px 40px', fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none',
              display: 'inline-block',
            }}>
              Parliamone →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}