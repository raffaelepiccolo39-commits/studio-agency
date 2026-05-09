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
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.service-card')
    if (!cards) return

    const onLeave = () => setActiveId(null)
    cards.forEach((card) => {
      const id = card.dataset.service || ''
      const handler = () => setActiveId(id)
      card.addEventListener('mouseenter', handler)
      card.addEventListener('mouseleave', onLeave)
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
        padding: 'clamp(60px, 8vw, 110px) clamp(20px, 3vw, 40px)',
        overflow: 'hidden',
      }}
    >
      {/* Background image full-bleed (hover) */}
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
              transform: activeId === s.id ? 'scale(1)' : 'scale(1.06)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        ))}
        {/* Vignette overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.85) 100%)',
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
            fontWeight: 600,
            fontSize: 'clamp(28px, 3.6vw, 56px)',
            lineHeight: 1.18,
            letterSpacing: '-0.015em',
            color: '#ffffff',
            margin: 0,
            textAlign: 'left',
          }}
        >
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span className="manifesto-line" style={{ display: 'inline-block', willChange: 'transform' }}>
              <span aria-hidden style={{ display: 'inline-block', width: 'clamp(60px, 10vw, 200px)' }} />Non facciamo solo esecuzione. Uniamo brand
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span className="manifesto-line" style={{ display: 'inline-block', willChange: 'transform' }}>
              direction, sviluppo web, performance marketing
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 2.5vw, 36px)' }}>
          {/* Top row */}
          <div className="services-evolve-toprow" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 500,
              fontSize: '13px',
              color: '#e5e5e5',
              letterSpacing: '0.04em',
            }}>
              Our Services
            </span>
            <span style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 500,
              fontSize: '13px',
              color: '#b2b2b2',
              letterSpacing: '0.04em',
            }}>
              Est. 2018©
            </span>
          </div>

          {/* Grid: 5 cards + description */}
          <div
            className="services-evolve-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr) 1.3fr',
              gap: 'clamp(14px, 1.6vw, 24px)',
              alignItems: 'stretch',
            }}
          >
            {services.map((s) => {
              const isActive = activeId === s.id
              const isDimmed = activeId !== null && !isActive
              return (
                <div
                  key={s.id}
                  data-service={s.id}
                  className="service-card"
                  style={{
                    position: 'relative',
                    minHeight: 'clamp(380px, 38vw, 500px)',
                    border: '0.5px solid rgba(255,255,255,0.12)',
                    background: isActive
                      ? 'rgba(15,15,15,0.78)'
                      : 'rgba(15,15,15,0.62)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    padding: 'clamp(18px, 1.6vw, 24px)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                    opacity: isDimmed ? 0.35 : 1,
                    transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), background 0.5s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  {/* Top: title + tag */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '8px',
                  }}>
                    <h3 style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 500,
                      fontSize: 'clamp(18px, 1.4vw, 22px)',
                      lineHeight: 1.18,
                      letterSpacing: '0.005em',
                      color: '#ffffff',
                      margin: 0,
                    }}>
                      {s.title[0]}<br />{s.title[1]}
                    </h3>
                    <span
                      className="service-card-tag"
                      style={{
                        fontFamily: 'var(--font-syne)',
                        fontSize: '11px',
                        color: '#b2b2b2',
                        letterSpacing: '0.05em',
                        flexShrink: 0,
                        marginTop: '4px',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0)' : 'translateY(-6px)',
                        transition: 'opacity 0.4s, transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                      }}
                    >
                      {s.tag}
                    </span>
                  </div>

                  {/* Bottom: features list */}
                  <ul
                    className="service-card-features"
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      opacity: isActive ? 0.95 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(8px)',
                      transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    {s.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          fontFamily: 'var(--font-syne)',
                          fontWeight: 400,
                          fontSize: '12.5px',
                          color: '#ffffff',
                          lineHeight: 1.55,
                          letterSpacing: '0.005em',
                        }}
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}

            {/* Description column */}
            <div
              className="services-evolve-desc"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                paddingLeft: 'clamp(8px, 1.2vw, 18px)',
                paddingTop: '4px',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 500,
                fontSize: 'clamp(13px, 1vw, 15px)',
                lineHeight: 1.55,
                color: '#e5e5e5',
                margin: 0,
              }}>
                Ogni brand è un organismo già in movimento. Persone, processi, decisioni. Il nostro
                lavoro non è inserirci sopra. È <strong style={{ color: '#ffffff' }}>entrare dentro</strong>.
              </p>
              <p style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 500,
                fontSize: 'clamp(13px, 1vw, 15px)',
                lineHeight: 1.55,
                color: '#e5e5e5',
                margin: 0,
              }}>
                Affianchiamo i team, leggiamo il business, capiamo dove l&apos;energia si disperde
                e dove va amplificata. <strong style={{ color: '#ffffff' }}>Brand, tecnologia e marketing avanzano insieme</strong>:
                solo così il sistema regge la crescita.
              </p>
              <p style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 500,
                fontSize: 'clamp(13px, 1vw, 15px)',
                lineHeight: 1.55,
                color: '#e5e5e5',
                margin: 0,
              }}>
                Riduciamo passaggi, allineiamo scelte, trasformiamo complessità in struttura.
                Non aggiungiamo rumore. <strong style={{ color: '#ffffff' }}>Portiamo direzione.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
