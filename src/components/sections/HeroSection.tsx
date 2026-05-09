'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const slides = [
  '/progetti/pasticceria-bluemoon/pasticcere.jpg',
  '/progetti/maestri-cotonieri/maestri-cotonieri-pira-01.jpg',
  '/progetti/svinati/svinati-case-study-01.jpg',
  '/progetti/alma-studio/alma-studio-case-study-01.jpg',
]

const SLIDE_DURATION = 6000

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(() => {
    const lines = heroRef.current?.querySelectorAll<HTMLElement>('.hero-line')
    if (!lines) return

    lines.forEach((line) => {
      const text = line.dataset.text || line.textContent || ''
      line.textContent = ''
      line.setAttribute('aria-label', text)
      const chars = text.split('').map((ch) => {
        const span = document.createElement('span')
        span.className = 'hero-char'
        span.textContent = ch === ' ' ? ' ' : ch
        span.style.display = 'inline-block'
        span.style.willChange = 'transform'
        line.appendChild(span)
        return span
      })
      gsap.set(chars, { yPercent: 110, rotate: 6 })
    })

    const allChars = heroRef.current?.querySelectorAll('.hero-char')
    if (allChars) {
      gsap.to(allChars, {
        yPercent: 0,
        rotate: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.025,
        delay: 0.3,
      })
    }
  }, { scope: heroRef })

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length)
    }, SLIDE_DURATION)
    return () => clearInterval(id)
  }, [])

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
        background: '#0a0a0a',
      }}
    >
      {/* Slideshow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        {slides.map((src, i) => {
          const isActive = i === activeIndex
          return (
            <div
              key={src}
              className={`hero-slide ${isActive ? 'is-active' : ''}`}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(15%)',
                transition: 'opacity 1.4s cubic-bezier(0.16,1,0.3,1), transform 1.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url("${src}")`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                  transition: `transform ${SLIDE_DURATION + 1500}ms linear`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.75) 100%)',
                }}
              />
            </div>
          )
        })}
      </div>

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
          <div className="hero-line" data-text="GROWTH">GROWTH</div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="hero-line" data-text="FOCUSED">FOCUSED</div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="hero-line" data-text="AGENCY">AGENCY</div>
        </div>
      </h1>

      {/* Slide indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(30px, 4vw, 50px)',
          right: 'clamp(24px, 5vw, 40px)',
          display: 'flex',
          gap: '10px',
          zIndex: 1,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Vai alla slide ${i + 1}`}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? '32px' : '12px',
              height: '2px',
              background: i === activeIndex ? '#ffffff' : 'rgba(255,255,255,0.4)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  )
}
