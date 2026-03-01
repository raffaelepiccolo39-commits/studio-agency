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
  { id: 'a', title: 'Autenticità', desc: 'Non seguiamo formule preconfezionate. Ogni progetto nasce da un’analisi reale del brand, del mercato e degli obiettivi di businessPer noi autenticità significa costruire identità digitali coerenti, credibili e strategiche. Non imitare. Non replicare. Ma progettare soluzioni che rappresentino davvero l’azienda che le utilizza.' },
  { id: 'b', title: 'SCALABILITÀ', desc: 'Progettiamo sistemi che possano crescere. Oggi funzionano. Domani evolvono. Non costruiamo per l\’immediato. Costruiamo per il futuro.' },
  { id: 'c', title: 'PERFORMANCE', desc: 'Per noi la performance non è un dato da mostrare. È una responsabilità. Misuriamo, analizziamo, ottimizziamo. Ogni azione è finalizzata a migliorare i numeri del tuo business.' },
  { id: 'd', title: 'Visione', desc: 'Non pensiamo da agenzia.Pensiamo da imprenditori. Valutiamo sostenibilità, marginalità, scalabilità. Perché il digitale non è comunicazione fine a sé stessa. È struttura economica.' },
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
          subtitle="Pira Web nasce da una visione imprenditoriale precisa:
portare rigore, metodo e responsabilità nel digitale.

Ogni progetto è affrontato con approccio analitico, controllo operativo e orientamento alla performance.

Non lavoriamo per consegnare.
Lavoriamo per generare valore nel tempo."
        />
{/* Mission & Vision */}
<section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>

  {/* Mission */}
  <div style={{
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    minHeight: '60vh',
  }}>
    <div style={{
      padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Numero ghost */}
      <div style={{
        position: 'absolute', bottom: '-20px', right: '-10px',
        fontFamily: 'var(--font-bebas)', fontSize: '220px',
        color: 'transparent', WebkitTextStroke: '1px rgba(255,209,8,0.06)',
        lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
      }}>01</div>

      <p style={{
        fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--accent)' }} />
        Mission
      </p>

      <div>
        <h2 style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(48px,7vw,100px)',
          lineHeight: 0.9, letterSpacing: '-0.01em',
          marginBottom: '32px',
        }}>
          COSTRUIRE<br />
          <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: 'var(--accent)' }}>
            valore
          </span><br />
          REALE
        </h2>
        <p style={{
          fontSize: 'clamp(15px,1.6vw,18px)', lineHeight: 1.8,
          color: 'rgba(240,237,230,0.6)', maxWidth: '420px',
        }}>
          Progettiamo sistemi digitali che lavorano per il business dei nostri clienti.
          Ogni strategia, ogni riga di codice, ogni campagna nasce da un’analisi concreta e da obiettivi misurabili.
          Non costruiamo progetti fine a sé stessi: sviluppiamo asset capaci di produrre crescita reale.

          Affianchiamo imprenditori e professionisti con metodo, responsabilità e visione imprenditoriale, trasformando l’investimento digitale in una leva strutturata di sviluppo.

          Perché il digitale non deve occupare spazio.
          Deve generare risultati.
        </p>
      </div>
    </div>

    <div style={{
      padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      position: 'relative', overflow: 'hidden',
      background: 'var(--surface)',
    }}>
      {/* Numero ghost */}
      <div style={{
        position: 'absolute', bottom: '-20px', right: '-10px',
        fontFamily: 'var(--font-bebas)', fontSize: '220px',
        color: 'transparent', WebkitTextStroke: '1px rgba(255,209,8,0.06)',
        lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
      }}>02</div>

      <p style={{
        fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--accent)' }} />
        Vision
      </p>

      <div>
        <h2 style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(48px,7vw,100px)',
          lineHeight: 0.9, letterSpacing: '-0.01em',
          marginBottom: '32px',
        }}>
          ESSERE IL<br />
          <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: 'var(--accent)' }}>
            punto
          </span><br />
          DI SVOLTA
        </h2>
        <p style={{
          fontSize: 'clamp(15px,1.6vw,18px)', lineHeight: 1.8,
          color: 'rgba(240,237,230,0.6)', maxWidth: '420px',
        }}>
          Vogliamo diventare il punto di riferimento per gli imprenditori che cercano un partner capace di coniugare strategia, tecnologia e crescita misurabile.

          Crediamo in un digitale che non sia semplice presenza, ma infrastruttura solida, strutturata e progettata per sostenere l’evoluzione di un’impresa nel tempo.

          Immaginiamo aziende che non inseguono il mercato, ma lo guidano.
          E lo fanno attraverso sistemi digitali pensati per generare valore, opportunità e vantaggio competitivo.
          
        </p>
      </div>
    </div>
  </div>

  {/* Striscia animata in fondo */}
  <div style={{
    borderTop: '1px solid var(--border)',
    padding: '20px clamp(24px,5vw,40px)',
    display: 'flex', alignItems: 'center', gap: '40px',
    overflow: 'hidden',
  }}>
    {['Strategia', 'Tecnologia', 'Creatività', 'Performance', 'Crescita', 'Innovazione', 'Risultati', 'Visione'].map((word, i) => (
      <span key={i} style={{
        fontFamily: 'var(--font-bebas)',
        fontSize: '13px', letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: i % 2 === 0 ? 'var(--accent)' : 'var(--muted)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        {word} {i < 7 && <span style={{ marginLeft: '40px', color: 'var(--border)' }}>·</span>}
      </span>
    ))}
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