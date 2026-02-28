'use client'

import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.from('.hero-tag', { opacity: 0, y: 20, duration: 0.8, delay: 0.2 })
      .from('.hero-line-1', { y: '110%', opacity: 0, duration: 0.9 }, '-=0.5')
      .from('.hero-line-2', { y: '110%', opacity: 0, duration: 0.9 }, '-=0.7')
      .from('.hero-line-3', { y: '110%', opacity: 0, duration: 0.9 }, '-=0.7')
      .from('.hero-bottom', { opacity: 0, y: 24, duration: 0.8 }, '-=0.5')
  }, { scope: heroRef })

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (bgTextRef.current) {
        bgTextRef.current.style.transform =
          `translate(-50%, calc(-50% + ${window.scrollY * 0.3}px))`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(160px, 18vw, 200px) clamp(24px, 5vw, 40px) 60px',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ghost text */}
      <div
        ref={bgTextRef}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(120px, 22vw, 320px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'bgDrift 20s ease-in-out infinite alternate',
        }}
      >
        DIGITAL
      </div>

      <p
        className="hero-tag"
        style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        PIRA WEB CREATIVE AGENCY 
      </p>

      <h1 style={{ lineHeight: 0.92, marginBottom: '48px', position: 'relative', zIndex: 1 }}>
        <div style={{ overflow: 'hidden' }}>
          <div
            className="hero-line-1"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(72px, 12vw, 180px)',
              letterSpacing: '-0.01em',
            }}
          >
            WE BUILD
          </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div
            className="hero-line-2"
            style={{
              fontFamily: 'var(--font-dm-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(72px, 12vw, 180px)',
              color: 'var(--accent)',
            }}
          >
            digital
          </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div
            className="hero-line-3"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(72px, 12vw, 180px)',
              letterSpacing: '-0.01em',
            }}
          >
            EXPERIENCES
          </div>
        </div>
      </h1>

      <div
        className="hero-bottom"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '32px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p style={{ maxWidth: '340px', fontSize: '14px', lineHeight: 1.7, color: 'rgba(240,237,230,0.5)' }}>
          Unifichiamo brand, strategie e performance marketing in un&apos;unica visione operativa per brand visionari.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <a href="#projects" className="btn-primary">Vedi Progetti</a>
          <a href="#contact" className="btn-outline">Parliamo →</a>
        </div>
      </div>

      <style>{`
        .btn-primary {
          background: var(--accent);
          color: #0a0a0a;
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 16px 32px;
          border: none;
          cursor: none;
          text-decoration: none;
          display: inline-block;
          transition: background 0.3s, transform 0.3s;
        }
        .btn-primary:hover { background: var(--text); transform: scale(1.02); }
        .btn-outline {
          font-size: 13px;
          letter-spacing: 0.08em;
          color: rgba(240,237,230,0.5);
          text-decoration: none;
          border-bottom: 1px solid rgba(240,237,230,0.2);
          padding-bottom: 2px;
          transition: color 0.3s, border-color 0.3s;
        }
        .btn-outline:hover { color: var(--text); border-color: var(--text); }
      `}</style>
    </section>
  )
}
