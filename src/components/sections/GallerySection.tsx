'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const images = [
  '/progetti/pasticceria-bluemoon/mockup-prodotto.jpg',
  '/progetti/pasticceria-bluemoon/griglia-prodotti.jpg',
  '/progetti/pasticceria-bluemoon/panettone.jpg',
]

const parallaxFactors = [0.08, -0.12, 0.06]

export default function GallerySection() {
  const elRef = useRef<HTMLElement | null>(null)
  const [scrollOffset, setScrollOffset] = useState(0)
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    let rafId = 0
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const el = elRef.current
        if (el) {
          const rect = el.getBoundingClientRect()
          const viewportH = window.innerHeight
          const progress = (viewportH - rect.top) / (viewportH + rect.height)
          setScrollOffset(Math.max(0, Math.min(1, progress)) - 0.5)
        }
        rafId = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const setRefs = useCallback(
    (el: HTMLElement | null) => {
      elRef.current = el
      inViewRef(el)
    },
    [inViewRef]
  )

  return (
    <section
      ref={setRefs}
      style={{
        borderTop: '0.5px solid #525252',
        borderBottom: '0.5px solid #525252',
        padding: '40px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      }}
    >
      <div
        className="gallery-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          height: '838px',
        }}
      >
        {images.map((src, i) => {
          const factor = parallaxFactors[i] || 0
          const translate = scrollOffset * factor * 240
          return (
            <Link
              key={src}
              href="/progetti"
              data-cursor="VEDI"
              className="gallery-tile"
              style={{
                position: 'relative',
                height: '100%',
                overflow: 'hidden',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                cursor: 'none',
              }}
            >
              <div
                className="gallery-tile-img"
                style={{
                  position: 'absolute',
                  inset: '-12% 0',
                  width: '100%',
                  height: '124%',
                  backgroundImage: `url("${src}")`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  transform: `translate3d(0, ${translate}px, 0) scale(1)`,
                  willChange: 'transform',
                  transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease',
                  filter: 'grayscale(15%) brightness(0.92)',
                }}
              />
            </Link>
          )
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '30px 0' }}>
        <Link
          href="/progetti"
          className="gallery-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '15px',
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '16px',
            color: '#ffffff',
            textDecoration: 'none',
            paddingBottom: '4px',
            position: 'relative',
          }}
        >
          ESPLORA TUTTI I NOSTRI PROGETTI
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
