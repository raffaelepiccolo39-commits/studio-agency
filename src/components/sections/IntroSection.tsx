'use client'

import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

export default function IntroSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      ref={ref}
      style={{
        background: '#ffffff',
        padding: 'clamp(60px, 8vw, 90px) clamp(24px, 5vw, 100px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 'clamp(40px, 6vw, 80px)',
        maxWidth: '995px',
        width: '100%',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <p style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 500,
          fontSize: 'clamp(32px, 4.4vw, 64px)',
          lineHeight: 0.95,
          color: '#0a0a0a',
          textAlign: 'right',
          margin: 0,
        }}>
          Costruiamo presenze digitali forti e solide. Pensate per durare.
        </p>

        <Link
          href="/progetti"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '15px',
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '16px',
            color: '#6a6a6a',
            textDecoration: 'underline',
            textDecorationSkipInk: 'auto',
          }}
        >
          ESPLORA TUTTI I NOSTRI PROGETTI
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="#6a6a6a" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
