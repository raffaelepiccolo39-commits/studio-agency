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

  return (
    <>
      <Cursor />
      <Navbar />
      <main>

        <PageHeader
          tag="CHI SIAMO"
          title="il partner "
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
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '24px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              — Raffaele Antonio Piccolo, Founder
            </p>
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

        {/* Team */}
        <section style={{
          padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '64px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
            Il team
          </p>

          {/* Foto centrata */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '280px', height: '360px',
            zIndex: 10, pointerEvents: 'none',
            opacity: hoveredMember !== null ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}>
            {team.map((member, i) => (
              <img
                key={i}
                src={member.photo}
                alt={member.name}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  opacity: hoveredMember === i ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            ))}
            {hoveredMember !== null && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'var(--surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-bebas)', fontSize: '80px', color: 'var(--accent)',
                zIndex: -1,
              }}>
                {team[hoveredMember]?.name.charAt(0)}
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--border)' }}>
            {team.map((member, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredMember(i)}
                onMouseLeave={() => setHoveredMember(null)}
                style={{
                  borderBottom: '1px solid var(--border)',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr',
                  alignItems: 'center',
                  padding: '24px 0',
                  cursor: 'none',
                  position: 'relative',
                  transition: 'opacity 0.3s',
                  opacity: hoveredMember !== null && hoveredMember !== i ? 0.2 : 1,
                }}
              >
                {/* Linea accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '1px', background: 'var(--accent)',
                  transform: hoveredMember === i ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                }} />

                <h3 style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(24px,3vw,48px)',
                  letterSpacing: '0.02em',
                  color: hoveredMember === i ? 'var(--accent)' : 'var(--text)',
                  transition: 'color 0.3s',
                }}>
                  {member.name.toUpperCase()}
                </h3>

                <span style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '13px', color: 'var(--accent)',
                  letterSpacing: '0.15em', padding: '0 40px',
                  opacity: hoveredMember === i ? 1 : 0,
                  transition: 'opacity 0.3s',
                }}>
                  ({String(i + 1).padStart(2, '0')})
                </span>

                <p style={{
                  fontSize: '13px', color: 'var(--muted)',
                  letterSpacing: '0.05em', textAlign: 'right',
                }}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
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