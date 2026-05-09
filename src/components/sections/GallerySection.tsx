'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Magnetic from '@/components/ui/Magnetic'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const images = [
  '/progetti/pasticceria-bluemoon/mockup-prodotto.jpg',
  '/progetti/pasticceria-bluemoon/griglia-prodotti.jpg',
  '/progetti/pasticceria-bluemoon/panettone.jpg',
]

const parallaxFactors = [0.08, -0.12, 0.06]

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [scrollOffset, setScrollOffset] = useState(0)

  useEffect(() => {
    let rafId = 0
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const el = sectionRef.current
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

  useGSAP(() => {
    const tiles = sectionRef.current?.querySelectorAll<HTMLElement>('.gallery-tile')
    if (!tiles) return

    tiles.forEach((tile, i) => {
      const img = tile.querySelector<HTMLElement>('.gallery-tile-img')
      if (!img) return

      gsap.set(tile, { clipPath: 'inset(0% 100% 0% 0%)' })
      gsap.set(img, { scale: 1.3 })

      gsap.to(tile, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.4,
        ease: 'expo.out',
        delay: i * 0.12,
        scrollTrigger: {
          trigger: tile,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(img, {
        scale: 1,
        duration: 1.6,
        ease: 'expo.out',
        delay: i * 0.12,
        scrollTrigger: {
          trigger: tile,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
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
                cursor: 'none',
                willChange: 'clip-path',
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
                  transform: `translate3d(0, ${translate}px, 0)`,
                  willChange: 'transform',
                  transition: 'filter 0.6s ease',
                  filter: 'grayscale(15%) brightness(0.92)',
                }}
              />
            </Link>
          )
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '30px 0' }}>
        <Magnetic strength={0.3} radius={100}>
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
        </Magnetic>
      </div>
    </section>
  )
}
