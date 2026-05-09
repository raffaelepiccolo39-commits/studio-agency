'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from('.hero-line-1', { y: '110%', opacity: 0, duration: 0.9, delay: 0.2 })
      .from('.hero-line-2', { y: '110%', opacity: 0, duration: 0.9 }, '-=0.7')
      .from('.hero-line-3', { y: '110%', opacity: 0, duration: 0.9 }, '-=0.7')
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(140px, 15vw, 200px) clamp(24px, 5vw, 40px) clamp(60px, 8vw, 85px)',
        borderBottom: '0.5px solid #525252',
        overflow: 'hidden',
      }}
    >
      {/* Fullscreen background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.75) 100%), url("/progetti/pasticceria-bluemoon/pasticcere.jpg") center/cover no-repeat',
        zIndex: 0,
      }} />

      {/* Title */}
      <h1 style={{
        position: 'relative',
        zIndex: 1,
        fontFamily: 'var(--font-bebas)',
        fontSize: 'clamp(72px, 11vw, 140px)',
        lineHeight: 0.95,
        color: '#ffffff',
        letterSpacing: '-0.01em',
        margin: 0,
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div className="hero-line-1">GROWTH</div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="hero-line-2">FOCUSED</div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="hero-line-3">AGENCY</div>
        </div>
      </h1>
    </section>
  )
}
