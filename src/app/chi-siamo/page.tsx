'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/ui/PageHeader'
import Cursor from '@/components/ui/Cursor'
import { useState } from 'react'

const team = [
  { name: 'Raffaele Antonio Piccolo', role: 'Founder & CEO Creative Director', photo: '/team/raffaele.jpg' },
  { name: 'Raffaela Sparaco', role: 'Graphic Design & Creative Director', photo: '/team/raffaela.jpg' },
  { name: 'Bernis Del Villano', role: 'Social Media Manager & Art Director', photo: '/team/bernis.jpg' },
  { name: 'Manuela Del Villano', role: 'Content Creator', photo: '/team/manuela.jpg' },
]

const values = [
  { id: 'a', title: 'Autenticità', desc: 'Non costruiamo siti. Costruiamo identità digitali che rispecchiano davvero l\'anima del brand.' },
  { id: 'b', title: 'Qualità senza compromessi', desc: 'Ogni pixel, ogni riga di codice, ogni campagna passa per un processo di revisione rigoroso.' },
  { id: 'c', title: 'Partnership reale', desc: 'Siamo un\'estensione del tuo team, non un fornitore esterno. I tuoi obiettivi sono i nostri obiettivi.' },
  { id: 'd', title: 'Innovazione continua', desc: 'Sperimentiamo, testiamo, iteriamo. Il digitale cambia ogni giorno e noi siamo sempre un passo avanti.' },
]

export default function ChiSiamoPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <Cursor />
      <Navbar />
      <main>

        <PageHeader
          tag="CHI SIAMO"
          title="Il partner di riferimento "
          titleAccent="per la crescita"
          titleAfter="della tua azienda."
          subtitle="Dal 2018 affianchiamo imprenditori e professionisti nella costruzione di ecosistemi digitali solidi, misurabili e scalabili. Non realizziamo semplici strategie. Costruiamo strumenti di business."
        />

        {/* Manifesto */}
        <section style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 'clamp(22px,3vw,38px)', lineHeight: 1.5 }}>
              &ldquo;Il mercato non ha bisogno di un altro sito web. Ha bisogno di esperienze che lasciano il segno.&rdquo;
            </p>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '24px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>— Raffaele Antonio Piccolo, Founder</p>
          </div>
        </section>

        {/* Valori */}
        <section style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '64px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
            I nostri valori
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2px' }}>
            {values.map(v => (
              <div key={v.id} className="card-hover" style={{ background: 'var(--surface)', padding: '48px 40px', borderLeft: '1px solid var(--border)' }}>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '13px', color: 'var(--accent)', letterSpacing: '0.15em', display: 'block', marginBottom: '20px' }}>({v.id}.)</span>
                <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '32px', letterSpacing: '0.02em', marginBottom: '16px' }}>{v.title.toUpperCase()}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(240,237,230,0.55)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team con foto hover */}
        <section
          onMouseMove={handleMouseMove}
          style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)', position: 'relative' }}
        >
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '64px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
            Il team
          </p>

          <div style={{ borderTop: '1px solid var(--border)' }}>
            {team.map((member, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredMember(i)}
                onMouseLeave={() => setHoveredMember(null)}
                style={{
                  borderBottom: '1px solid var(--border)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '24px',
                  alignItems: 'center',
                  padding: '28px 0',
                  cursor: 'none',
                  transition: 'opacity 0.3s',
                  opacity: hoveredMember !== null && hoveredMember !== i ? 0.3 : 1,
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(24px,3vw,40px)',
                  letterSpacing: '0.02em',
                  color: hoveredMember === i ? 'var(--accent)' : 'var(--text)',
                  transition: 'color 0.3s',
                }}>
                  {member.name.toUpperCase()}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', letterSpacing: '0.05em' }}>{member.role}</p>
              </div>
            ))}
          </div>

          {/* Foto che segue il mouse */}
          {hoveredMember !== null && (
            <div style={{
              position: 'fixed',
              left: mousePos.x + 20,
              top: mousePos.y - 160,
              width: '220px',
              height: '280px',
              zIndex: 999,
              pointerEvents: 'none',
              overflow: 'hidden',
              animation: 'fadeInPhoto 0.3s ease forwards',
            }}>
              <img
                src={team[hoveredMember].photo}
                alt={team[hoveredMember].name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  // Se la foto non esiste mostra un placeholder
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement!.style.background = 'var(--surface)'
                  e.currentTarget.parentElement!.style.border = '1px solid var(--border)'
                  e.currentTarget.parentElement!.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--font-bebas);font-size:48px;color:var(--accent)">${team[hoveredMember!].name.charAt(0)}</div>`
                }}
              />
            </div>
          )}

          <style>{`
            @keyframes fadeInPhoto {
              from { opacity: 0; transform: scale(0.95) translateY(10px); }
              to   { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
        </section>

        {/* Numeri */}
        <section style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1px', background: 'var(--border)' }}>
            {[
              { num: '40+', label: 'Progetti realizzati' },
              { num: '98%', label: 'Clienti soddisfatti' },
              { num: '3x', label: 'ROI medio' },
              { num: '∞', label: 'Passione per il digitale' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--bg)', padding: '48px 40px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(56px,8vw,100px)', lineHeight: 1, color: 'var(--accent)' }}>{s.num}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px,6vw,80px)', marginBottom: '32px' }}>
            VUOI FAR PARTE<br />
            <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: 'var(--accent)' }}>del team?</span>
          </h2>
          <a href="/lavora-con-noi" className="btn-accent">Lavora con noi →</a>
        </section>

      </main>
      <Footer />
    </>
  )
}