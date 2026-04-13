'use client'
import { useInView } from 'react-intersection-observer'

const stats = [
  { num: '100+', label: 'Progetti completati' },
  { num: '10+', label: 'Anni di esperienza' },
  { num: '98%', label: 'Clienti soddisfatti' },
  { num: '7x', label: 'ROI medio clienti' },
]

export default function AboutSection() {
  const { ref: leftRef, inView: leftIn } = useInView({ threshold: 0.2, triggerOnce: true })
  const { ref: rightRef, inView: rightIn } = useInView({ threshold: 0.2, triggerOnce: true })
  return (
    <section id="about" style={{ padding: 'clamp(60px,10vw,120px) clamp(24px,5vw,40px)', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '80px', alignItems: 'center' }}>
      <div ref={leftRef} style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(80px,14vw,180px)', lineHeight: 0.88, letterSpacing: '-0.01em', opacity: leftIn ? 1 : 0, transform: leftIn ? 'translateY(0)' : 'translateY(48px)', transition: 'all 1s cubic-bezier(0.16,1,0.3,1)' }}>
        LEVEL UP<br /><span style={{ color: 'var(--accent-red)' }}>2026</span>
      </div>
      <div ref={rightRef} style={{ opacity: rightIn ? 1 : 0, transform: rightIn ? 'translateY(0)' : 'translateY(48px)', transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.15s' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '24px' }}>📍 CASERTA | NAPOLI | BOLOGNA </p>
        <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(240,237,230,0.6)', marginBottom: '40px' }}>Siamo un&apos;agenzia digitale che unisce strategia, design e tecnologia per creare esperienze significative.</p>
        <a href="/contatti" className="btn-accent">Iniziamo a collaborare</a>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', paddingTop: '40px', marginTop: '40px', borderTop: '1px solid var(--border)' }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '52px', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
