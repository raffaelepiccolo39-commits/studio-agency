'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/ui/PageHeader'
import Cursor from '@/components/ui/Cursor'

const services = [
  {
    id: 'a', title: 'Brand Direction', color: '#c8f55a',
    desc: 'Non progettiamo solo loghi. Costruiamo identità che durano: una voce, un linguaggio visivo, una posizione di mercato che non si confonde con nessun altro.',
    items: ['Brand Strategy', 'Visual Identity', 'UX / UI Design', 'Market Positioning', 'Brand Audit', 'Digital Storytelling', 'Competitive Analysis', 'Tone & Messaging'],
  },
  {
    id: 'b', title: 'Advanced Tech', color: '#5a8cf5',
    desc: 'Sviluppiamo esperienze digitali che performano. Da Shopify Plus a soluzioni headless custom, ogni progetto è costruito con le tecnologie giuste per gli obiettivi giusti.',
    items: ['E-commerce Development', 'Shopify Plus', 'Headless Commerce', 'Custom App Dev', 'API Integration', 'Performance Optimization', 'Mobile Optimization', 'QA Testing'],
  },
  {
    id: 'c', title: 'Performance Marketing', color: '#ff4d1c',
    desc: 'Non bruciamo budget. Costruiamo ecosistemi di marketing che convertono, fidelizzano e scalano in modo sostenibile, con dati alla mano ad ogni decisione.',
    items: ['Meta Ads', 'Google Ads', 'Email Automation', 'Audience Segmentation', 'CRO Testing', 'SEO Optimization', 'Remarketing', 'AI Campaigns'],
  },
  {
    id: 'd', title: 'System Integration', color: '#f5c85a',
    desc: 'Il back-office di un e-commerce moderno è complesso. Noi lo rendiamo semplice: ERP, marketplace, logistica, pagamenti — tutto connesso in un ecosistema fluido.',
    items: ['ERP Integration', 'Marketplace Sync', 'OMS Integration', 'Payment Systems', 'Logistics Automation', 'Data Architecture', 'AI Monitoring', 'AI Automation'],
  },
]

const process = [
  { num: '01', title: 'Discovery', desc: 'Analizziamo il tuo business, i tuoi obiettivi e il mercato. Prima di toccare un pixel, capiamo dove sei e dove vuoi arrivare.' },
  { num: '02', title: 'Strategia', desc: 'Definiamo la rotta: quale piattaforma, quale approccio, quali KPI. Ogni decisione ha una ragione misurabile.' },
  { num: '03', title: 'Produzione', desc: 'Design, sviluppo e marketing avanzano insieme. Nessun silos, nessun rimbalzo tra team — un unico flusso creativo e tecnico.' },
  { num: '04', title: 'Launch & Scale', desc: 'Lanciamo, misuriamo, ottimizziamo. Il progetto non finisce al go-live: cresce con te nel tempo.' },
]

export default function CosaFacciamo() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <PageHeader
          tag="I nostri servizi"
          title="QUELLO CHE"
          titleAccent="sappiamo"
          titleAfter="FARE BENE"
          subtitle="Quattro aree di competenza che lavorano insieme come un unico organismo."
        />

        {services.map((s, i) => (
          <section key={s.id} style={{
            padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)',
            borderBottom: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
            gap: '80px',
            alignItems: 'start',
            background: i % 2 === 1 ? 'var(--surface)' : 'transparent',
          }}>
            <div>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '13px', color: s.color, letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }}>({s.id}.)</span>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(48px,7vw,96px)', letterSpacing: '0.01em', lineHeight: 0.9, marginBottom: '32px' }}>
                {s.title.toUpperCase()}
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(240,237,230,0.6)', maxWidth: '440px' }}>{s.desc}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
              {s.items.map(item => (
                <div key={item} style={{
                  padding: '18px 20px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  color: 'rgba(240,237,230,0.6)',
                }}>
                  {item}
                </div>
              ))}
            </div>
          </section>
        ))}

        <section style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '80px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
            Come lavoriamo
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2px' }}>
            {process.map(p => (
              <div key={p.num} style={{ padding: '48px 32px', background: 'var(--surface)' }}>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '80px', color: 'var(--border)', lineHeight: 1, display: 'block', marginBottom: '24px' }}>{p.num}</span>
                <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', letterSpacing: '0.05em', marginBottom: '16px', color: 'var(--accent)' }}>{p.title.toUpperCase()}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(240,237,230,0.55)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px,6vw,80px)', marginBottom: '16px' }}>PRONTO A</h2>
          <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 'clamp(40px,6vw,80px)', color: 'var(--accent)', marginBottom: '40px' }}>iniziare?</h2>
          <a href="/contatti" className="btn-accent">Parliamo del tuo progetto →</a>
        </section>
      </main>
      <Footer />
    </>
  )
}
