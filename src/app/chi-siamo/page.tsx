'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/ui/PageHeader'
import Cursor from '@/components/ui/Cursor'

const team = [
  { name: 'Mario Rossi', role: 'Founder & Creative Director' },
  { name: 'Laura Bianchi', role: 'Head of Technology' },
  { name: 'Giorgio Verdi', role: 'Performance Marketing Lead' },
  { name: 'Sofia Neri', role: 'UX/UI Designer' },
]

const values = [
  { id: 'a', title: 'Autenticità', desc: 'Non costruiamo siti. Costruiamo identità digitali che rispecchiano davvero l\'anima del brand.' },
  { id: 'b', title: 'Qualità senza compromessi', desc: 'Ogni pixel, ogni riga di codice, ogni campagna passa per un processo di revisione rigoroso.' },
  { id: 'c', title: 'Partnership reale', desc: 'Siamo un\'estensione del tuo team, non un fornitore esterno. I tuoi obiettivi sono i nostri obiettivi.' },
  { id: 'd', title: 'Innovazione continua', desc: 'Sperimentiamo, testiamo, iteriamo. Il digitale cambia ogni giorno e noi siamo sempre un passo avanti.' },
]

export default function ChiSiamoPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>

        <PageHeader
          tag="La nostra storia"
          title="UN TEAM"
          titleAccent="visionario"
          titleAfter="A MILANO"
          subtitle="Siamo nati nel 2024 con un'idea semplice: fare meno cose, ma farle benissimo."
        />

        {/* Manifesto */}
        <section style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 'clamp(22px,3vw,38px)', lineHeight: 1.5 }}>
              &ldquo;Il mercato non ha bisogno di un altro sito web. Ha bisogno di esperienze che lasciano il segno.&rdquo;
            </p>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '24px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>— Mario Rossi, Founder</p>
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
        <section style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '64px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
            Il team
          </p>
          <div style={{ borderTop: '1px solid var(--border)' }}>
            {team.map((member, i) => (
              <div key={i} className="team-row" style={{ borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'center', padding: '28px 0' }}>
                <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,40px)', letterSpacing: '0.02em' }}>{member.name.toUpperCase()}</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', letterSpacing: '0.05em' }}>{member.role}</p>
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
