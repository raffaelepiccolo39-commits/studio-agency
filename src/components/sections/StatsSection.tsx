'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

type Stat = {
  value: number
  suffix?: string
  label: string
}

const stats: Stat[] = [
  { value: 50, suffix: '+', label: 'Progetti realizzati' },
  { value: 7, suffix: '+', label: 'Anni di esperienza' },
  { value: 25, suffix: '+', label: 'Brand partner' },
  { value: 100, suffix: '%', label: 'Passione' },
]

function Counter({ stat, start }: { stat: Stat; start: boolean }) {
  const [n, setN] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    const duration = 1800
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setN(Math.round(eased * stat.value))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [start, stat.value])

  return (
    <>
      {n}
      {stat.suffix}
    </>
  )
}

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section
      ref={ref}
      style={{
        background: '#0a0a0a',
        padding: 'clamp(60px, 9vw, 120px) clamp(24px, 4vw, 40px)',
        borderBottom: '0.5px solid #525252',
      }}
    >
      <div
        className="stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(32px, 4vw, 60px)',
          maxWidth: '1360px',
          margin: '0 auto',
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(72px, 9vw, 140px)',
                lineHeight: 0.95,
                color: 'var(--accent)',
                letterSpacing: '-0.01em',
              }}
            >
              <Counter stat={s} start={inView} />
            </span>
            <span
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 500,
                fontSize: '14px',
                color: '#b2b2b2',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
