'use client'

import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    testo: "Pira Web ha trasformato completamente la nostra presenza online. L'e-commerce che hanno realizzato ha superato ogni aspettativa in termini di design e funzionalita'.",
    autore: 'Con.tex Biancheria',
    ruolo: 'E-commerce & Social Media',
  },
  {
    testo: "Professionali, creativi e sempre disponibili. Hanno costruito la nostra brand identity da zero e il risultato parla da solo: un'immagine che ci rappresenta al 100%.",
    autore: 'Alma Studio',
    ruolo: 'Brand Identity & Social Media',
  },
  {
    testo: "La gestione social che fanno per noi e' impeccabile. Contenuti di qualita', strategia chiara e risultati concreti sulla community.",
    autore: 'Svinati',
    ruolo: 'Social Media Management',
  },
]

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <div
      ref={ref}
      style={{
        padding: '40px 28px',
        position: 'relative',
        borderLeft: index > 0 ? '1px solid var(--border)' : 'none',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`,
      }}
    >
      {/* Big quote mark */}
      <span
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(80px, 10vw, 120px)',
          color: 'var(--accent)',
          opacity: 0.15,
          lineHeight: 0.8,
          display: 'block',
          marginBottom: '8px',
          userSelect: 'none',
        }}
      >
        &ldquo;
      </span>

      <p
        style={{
          fontFamily: 'var(--font-dm-serif)',
          fontStyle: 'italic',
          fontSize: '20px',
          lineHeight: 1.8,
          color: 'var(--text)',
          marginBottom: '32px',
        }}
      >
        {t.testo}
      </p>

      <div>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 700,
            display: 'block',
            marginBottom: '4px',
          }}
        >
          {t.autore}
        </span>
        <span
          style={{
            fontSize: '12px',
            color: 'var(--muted)',
            letterSpacing: '0.05em',
          }}
        >
          {t.ruolo}
        </span>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 40px)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        ref={ref}
        style={{
          marginBottom: '56px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(32px)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '24px',
          }}
        >
          Cosa dicono i clienti
        </p>
      </div>

      <div
        className="testimonials-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.autore} t={t} index={i} />
        ))}
      </div>
    </section>
  )
}
