'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function LavoraConNoiPage() {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.lavora-title', { y: '110%', opacity: 0, duration: 0.9, ease: 'power4.out', delay: 0.15 })
    gsap.from('.lavora-intro', { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out', delay: 0.4 })
  }, { scope: heroRef })

  return (
    <>
      <Cursor />
      <Navbar />
      <main ref={heroRef}>
        {/* Hero dark */}
        <section
          style={{
            background: '#0a0a0a',
            border: '0.5px solid #525252',
            minHeight: '342px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '30px 40px 36px',
          }}
        >
          <h1 style={{ overflow: 'hidden', margin: 0 }}>
            <span
              className="lavora-title"
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(64px, 12vw, 140px)',
                lineHeight: 0.95,
                letterSpacing: '-0.01em',
                color: '#ffffff',
                display: 'block',
              }}
            >
              LAVORA CON NOI
            </span>
          </h1>
        </section>

        {/* Intro strip */}
        <section
          style={{
            background: '#ffffff',
            padding: '30px 40px',
          }}
        >
          <p
            className="lavora-intro"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 400,
              fontSize: '16px',
              color: '#0a0a0a',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Siamo un team compatto con grandi ambizioni. Se hai talento e sai fare la differenza, questo è il posto giusto per te.
          </p>
        </section>

        {/* Spacer */}
        <div style={{ background: '#0a0a0a', height: '30px' }} />
      </main>
      <Footer />
    </>
  )
}
