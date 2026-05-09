'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type Service = {
  id: string
  tag: string
  title: [string, string]
  features: string[]
  image: string
}

const services: Service[] = [
  {
    id: 'a',
    tag: '(a.)',
    title: ['Brand', 'Direction'],
    features: [
      'Brand Identity',
      'Logo & Visual System',
      'Brand Strategy',
      'Tone of Voice',
      'Naming',
      'Packaging Design',
      'Editorial Design',
      'Style Guide',
    ],
    image: '/progetti/alma-studio/alma-studio-case-study-04.jpg',
  },
  {
    id: 'b',
    tag: '(b.)',
    title: ['Website &', 'E-commerce'],
    features: [
      'Custom Website Design',
      'Shopify Development',
      'WooCommerce',
      'E-commerce Strategy',
      'UX/UI Design',
      'Performance Optimization',
      'CMS Integration',
      'Analytics & Tracking',
    ],
    image: '/progetti/pasticceria-bluemoon/screenshot-sito.jpg',
  },
  {
    id: 'c',
    tag: '(c.)',
    title: ['Social Media', 'Management'],
    features: [
      'Social Strategy',
      'Content Calendar',
      'Community Management',
      'Meta Ads',
      'TikTok Marketing',
      'Influencer Strategy',
      'Paid Media',
      'Reporting & Insights',
    ],
    image: '/progetti/svinati/svinati-case-study-03.jpg',
  },
  {
    id: 'd',
    tag: '(d.)',
    title: ['Content', 'Creation'],
    features: [
      'Copywriting',
      'Video Production',
      'Reel & Short Form',
      'Photography Direction',
      'Storytelling',
      'Editorial Content',
      'Motion Graphics',
      'Storyboarding',
    ],
    image: '/progetti/maestri-cotonieri/maestri-cotonieri-pira-04.jpg',
  },
  {
    id: 'e',
    tag: '(e.)',
    title: ['Photo', 'Studio'],
    features: [
      'Product Photography',
      'Editorial Shooting',
      'Video Production',
      'Set Design',
      'Brand Lifestyle',
      'E-commerce Catalogue',
      'Behind the Scenes',
      'Studio Rental',
    ],
    image: '/progetti/svinati/svinati-case-study-04.jpg',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const manifestoRef = useRef<HTMLHeadingElement>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  useGSAP(() => {
    const lines = manifestoRef.current?.querySelectorAll<HTMLElement>('.manifesto-line')
    if (!lines) return

    gsap.set(lines, { yPercent: 110 })
    gsap.to(lines, {
      yPercent: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: sectionRef })

  useEffect(() => {
    const cols = sectionRef.current?.querySelectorAll<HTMLElement>('.service-col')
    if (!cols) return

    const onLeave = () => setActiveId(null)
    cols.forEach((col) => {
      const id = col.dataset.service || ''
      const handler = () => setActiveId(id)
      col.addEventListener('mouseenter', handler)
      col.addEventListener('mouseleave', onLeave)
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="services-evolve"
      style={{
        position: 'relative',
        background: '#0a0a0a',
        padding: 'clamp(60px, 8vw, 110px) clamp(24px, 4vw, 40px)',
        overflow: 'hidden',
      }}
    >
      {/* Background image layers */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: activeId ? 1 : 0,
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {services.map((s) => (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("${s.image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: activeId === s.id ? 1 : 0,
              transform: activeId === s.id ? 'scale(1)' : 'scale(1.08)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)',
              filter: 'brightness(0.35)',
            }}
          />
        ))}
        {/* Vignette overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.85) 100%)',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(50px, 7vw, 100px)' }}>
        {/* Manifesto */}
        <h2
          ref={manifestoRef}
          className="services-manifesto"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: 'clamp(22px, 2.6vw, 38px)',
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            color: '#ffffff',
            maxWidth: '1100px',
            margin: 0,
          }}
        >
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span className="manifesto-line" style={{ display: 'inline-block', willChange: 'transform' }}>
              <span style={{ color: '#6a6a6a' }}>(02)</span> &nbsp;Non facciamo solo esecuzione.
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span className="manifesto-line" style={{ display: 'inline-block', willChange: 'transform' }}>
              Uniamo brand direction, sviluppo web, performance marketing
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span className="manifesto-line" style={{ display: 'inline-block', willChange: 'transform' }}>
              e content production in un&apos;unica visione operativa.
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span className="manifesto-line" style={{ display: 'inline-block', willChange: 'transform' }}>
              Un ecosistema end-to-end pensato per crescere e scalare.
            </span>
          </span>
        </h2>

        {/* Top row */}
        <div className="services-evolve-toprow" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '20px',
          borderBottom: '0.5px solid #525252',
        }}>
          <span style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '14px',
            color: '#b2b2b2',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            I Nostri Servizi
          </span>
          <span style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '14px',
            color: '#b2b2b2',
            letterSpacing: '0.04em',
          }}>
            Est. 2018©
          </span>
        </div>

        {/* Grid */}
        <div
          className="services-evolve-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'clamp(24px, 2.5vw, 40px)',
          }}
        >
          {services.map((s) => (
            <div
              key={s.id}
              data-service={s.id}
              className="service-col"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(20px, 2.5vw, 36px)',
                cursor: 'pointer',
                transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1)',
                opacity: activeId && activeId !== s.id ? 0.35 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(28px, 3vw, 48px)',
                  lineHeight: 1,
                  letterSpacing: '0.005em',
                  color: '#ffffff',
                  margin: 0,
                }}>
                  {s.title[0]}<br />{s.title[1]}
                </h3>
                <span
                  className="service-col-tag"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '12px',
                    color: '#b2b2b2',
                    letterSpacing: '0.05em',
                    flexShrink: 0,
                    opacity: activeId === s.id ? 1 : 0,
                    transform: activeId === s.id ? 'translateY(0)' : 'translateY(-6px)',
                    transition: 'opacity 0.4s, transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  {s.tag}
                </span>
              </div>

              <ul
                className="service-col-features"
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  opacity: activeId === s.id ? 0.85 : 0,
                  transform: activeId === s.id ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                {s.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 400,
                      fontSize: '13px',
                      color: '#e5e5e5',
                      lineHeight: 1.6,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
