'use client'

import { useInView } from 'react-intersection-observer'

const steps = [
  {
    num: '01',
    title: 'DISCOVERY',
    desc: 'Analizziamo il tuo business, il mercato e i competitor per costruire una base strategica solida.',
  },
  {
    num: '02',
    title: 'STRATEGIA',
    desc: 'Definiamo obiettivi, KPI e il piano d\u2019azione per raggiungere risultati misurabili.',
  },
  {
    num: '03',
    title: 'PRODUZIONE',
    desc: 'Progettiamo e sviluppiamo ogni asset: dal brand al sito, dai contenuti alle campagne.',
  },
  {
    num: '04',
    title: 'LAUNCH & SCALE',
    desc: 'Lanciamo, monitoriamo e ottimizziamo per scalare i risultati nel tempo.',
  },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <div
      ref={ref}
      style={{
        padding: '40px 28px',
        position: 'relative',
        borderRight: (index % 2 === 0) ? '1px solid var(--border)' : 'none',
        borderBottom: index < 2 ? '1px solid var(--border)' : 'none',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(64px, 8vw, 96px)',
          color: 'var(--accent)',
          opacity: 0.2,
          lineHeight: 1,
          display: 'block',
          marginBottom: '12px',
        }}
      >
        {step.num}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: '24px',
          letterSpacing: '0.04em',
          display: 'block',
          marginBottom: '12px',
        }}
      >
        {step.title}
      </span>
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.75,
          color: 'var(--muted)',
        }}
      >
        {step.desc}
      </p>
    </div>
  )
}

export default function ProcessSection() {
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
          Il nostro processo
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          border: '1px solid var(--border)',
        }}
      >
        {steps.map((step, i) => (
          <StepCard key={step.num} step={step} index={i} />
        ))}
      </div>
    </section>
  )
}
