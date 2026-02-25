'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'

const mockProject = {
  title: 'Brand Alpha', platform: 'Shopify Plus', year: 2024, client: 'Alpha S.r.l.', duration: '4 mesi',
  accent: '#c8f55a', color: '#0f1a0a',
  services: ['UX/UI Design', 'E-commerce Development', 'System Integration', 'SEO'],
  kpis: [
    { label: 'Conversion Rate', value: '+0.8%' },
    { label: 'Bounce Rate', value: '–12.4%' },
    { label: 'Organic Traffic', value: '+2.7%' },
    { label: 'Avg. Time on Site', value: '+13.1%' },
  ],
  description: 'Brand Alpha è un brand di moda emergente che aveva bisogno di un ecosistema digitale completo.',
  challenge: 'Il brand aveva una presenza online frammentata, con un sito lento e conversioni basse.',
  solution: 'Abbiamo costruito da zero un nuovo store Shopify Plus con design UX pensato per la conversione.',
}

export default function ProgettoPage({ params }: { params: { slug: string } }) {
  const p = mockProject
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <section style={{ minHeight: '80vh', background: p.color, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(120px,15vw,160px) clamp(24px,5vw,40px) clamp(40px,6vw,80px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'var(--font-bebas)', fontSize: 'clamp(100px,20vw,280px)', color: 'transparent', WebkitTextStroke: `1px ${p.accent}15`, whiteSpace: 'nowrap', pointerEvents: 'none' }}>{p.title}</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: p.accent, marginBottom: '16px' }}>{p.platform} · {p.year}</p>
            <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(56px,10vw,140px)', letterSpacing: '-0.01em', lineHeight: 0.9, marginBottom: '40px' }}>{p.title.toUpperCase()}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {p.services.map(s => <span key={s} style={{ padding: '6px 14px', border: `1px solid ${p.accent}40`, fontSize: '11px', letterSpacing: '0.08em', color: p.accent }}>{s}</span>)}
            </div>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1px', background: 'var(--border)', borderBottom: '1px solid var(--border)' }}>
          {p.kpis.map(k => (
            <div key={k.label} style={{ background: 'var(--bg)', padding: '40px 32px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,5vw,60px)', color: p.accent, lineHeight: 1 }}>{k.value}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{k.label}</div>
            </div>
          ))}
        </section>

        <section style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '80px' }}>
          <div>
            {[{ label: 'Cliente', value: p.client }, { label: 'Piattaforma', value: p.platform }, { label: 'Durata', value: p.duration }, { label: 'Anno', value: String(p.year) }].map(info => (
              <div key={info.label} style={{ borderBottom: '1px solid var(--border)', padding: '20px 0', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{info.label}</span>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{info.value}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'rgba(240,237,230,0.7)' }}>{p.description}</p>
        </section>

        <section style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '2px' }}>
          {[{ tag: 'La sfida', title: 'Il Problema', text: p.challenge }, { tag: 'La risposta', title: 'La Soluzione', text: p.solution }].map(block => (
            <div key={block.tag} style={{ background: 'var(--surface)', padding: '48px 40px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: p.accent, marginBottom: '16px' }}>{block.tag}</p>
              <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '36px', letterSpacing: '0.03em', marginBottom: '24px' }}>{block.title.toUpperCase()}</h3>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(240,237,230,0.6)' }}>{block.text}</p>
            </div>
          ))}
        </section>

        <section style={{ padding: 'clamp(60px,10vw,100px) clamp(24px,5vw,40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          <Link href="/progetti" className="link-muted" style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>← Tutti i progetti</Link>
          <a href="/contatti" className="btn-accent">Hai un progetto simile? →</a>
        </section>
      </main>
      <Footer />
    </>
  )
}
