'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const items = [
  'STRATEGIA',
  'TECNOLOGIA',
  'CREATIVITÀ',
  'PERFORMANCE',
  'CRESCITA',
  'INNOVAZIONE',
  'RISULTATI',
  'VISIONE',
]

export default function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const doubled = [...items, ...items, ...items, ...items]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let direction = 1
    let baseSpeed = 0.6
    let currentSpeed = baseSpeed
    let xPos = 0
    let rafId = 0

    const measure = () => track.scrollWidth / 4

    const tick = () => {
      const loop = measure()
      xPos -= currentSpeed * direction
      if (xPos <= -loop) xPos += loop
      if (xPos > 0) xPos -= loop
      track.style.transform = `translate3d(${xPos}px, 0, 0)`

      currentSpeed += (baseSpeed - currentSpeed) * 0.04
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        direction = self.direction === -1 ? -1 : 1
        const v = Math.abs(self.getVelocity())
        const boost = Math.min(v / 200, 8)
        currentSpeed = baseSpeed + boost
      },
    })

    return () => {
      cancelAnimationFrame(rafId)
      st.kill()
    }
  }, [])

  return (
    <div
      style={{
        background: 'var(--accent)',
        padding: '15px 0',
        overflow: 'hidden',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '24px',
              fontFamily: 'var(--font-syne)',
              fontWeight: 500,
              fontSize: '16px',
              color: '#0a0a0a',
              padding: '0 12px',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
            <span aria-hidden style={{ opacity: 0.7 }}>—</span>
          </span>
        ))}
      </div>
    </div>
  )
}
