'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/ui/PageHeader'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'

import { projects } from '@/data/projects'

export default function ProgettiPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <PageHeader
          tag="Portfolio"
          title="I NOSTRI"
          titleAccent="lavori"
          subtitle="Ogni progetto è una storia diversa. Ecco alcune delle collaborazioni di cui siamo più orgogliosi."
        />

        <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,40px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '2px' }}>
            {projects.map((p, i) => (
              <Link key={p.slug} href={`/progetti/${p.slug}`} className="project-card" style={{
                position: 'relative', overflow: 'hidden', display: 'block',
                aspectRatio: i === 0 ? '16/9' : '4/3',
                background: p.color, textDecoration: 'none',
                gridColumn: i === 0 ? '1 / -1' : undefined,
              }}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 20% 20%, ${p.accent}18 0%, transparent 60%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '50%', right: '-5%', fontFamily: 'var(--font-bebas)', fontSize: 'clamp(80px,12vw,160px)', color: 'transparent', WebkitTextStroke: `1px ${p.accent}18`, pointerEvents: 'none', whiteSpace: 'nowrap', transform: 'translateY(50%)' }}>
                  {p.title}
                </div>
                <div className="project-info" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', background: 'linear-gradient(to top,rgba(10,10,10,0.95) 0%,transparent 100%)', transform: 'translateY(4px)', transition: 'transform 0.4s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}>
                    <div>
                      <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: p.accent, marginBottom: '6px' }}>{p.platform} · {p.year}</p>
                      <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: i === 0 ? 'clamp(36px,5vw,64px)' : 'clamp(28px,3vw,44px)', letterSpacing: '0.02em', color: 'var(--text)' }}>{p.title.toUpperCase()}</h3>
                      <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>{p.services.join(' · ')}</p>
                    </div>
                    <span style={{ fontSize: '24px', color: p.accent, flexShrink: 0 }}>↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ padding: 'clamp(60px,10vw,100px) clamp(24px,5vw,40px)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ fontSize: '15px', color: 'rgba(240,237,230,0.5)', marginBottom: '32px' }}>Hai un progetto in mente? Parliamone.</p>
          <a href="/contatti" className="btn-accent">Inizia il tuo progetto →</a>
        </section>
      </main>
      <Footer />
    </>
  )
}
