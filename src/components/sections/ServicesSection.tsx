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
  description: string[]
  image: string
}

const services: Service[] = [
  {
    id: 'a',
    tag: '(a.)',
    title: ['Branding &', 'Graphic Design'],
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
    description: [
      'Un brand non deve limitarsi a essere presente, deve essere riconoscibile e impossibile da confondere.',
      'Costruiamo identità visive capaci di dare coerenza e personalità alla tua azienda.',
      'Partiamo dal posizionamento, analizziamo il mercato e traduciamo i valori del brand in un sistema visivo coordinato: logo, colori, tipografia, stile grafico, tono di voce e percezione.',
    ],
    image: '/servizi/servizi-01.jpg',
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
    description: [
      'Progettiamo ecosistemi digitali pensati per valorizzare il brand e generare risultati concreti.',
      'Dai siti corporate agli e-commerce più strutturati: velocità di caricamento, navigazione intuitiva e percorsi pensati per guidare l’utente all’azione.',
      'Costruiamo asset digitali che lavorano ogni giorno per la crescita della tua azienda.',
    ],
    image: '/servizi/servizi-02.jpg',
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
    description: [
      'Gestiamo la presenza social del tuo brand con una strategia pensata per attirare l’attenzione giusta e trasformare i contenuti in leve di crescita.',
      'Non pubblichiamo “tanto per farlo”: studiamo il target, definiamo format riconoscibili e sviluppiamo contenuti pensati per generare continuità e relazione.',
      'L’obiettivo è costruire una community che percepisce il tuo valore e sceglie di avvicinarsi alla tua azienda.',
    ],
    image: '/servizi/servizi-03.jpg',
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
    description: [
      'Creiamo contenuti pensati per lasciare il segno.',
      'In un mercato pieno di messaggi tutti uguali, la differenza la fa chi comunica con identità, strategia e qualità.',
      'Per questo sviluppiamo contenuti originali, dal copywriting alla produzione visual, capaci di parlare al pubblico giusto e rafforzare la percezione del brand.',
    ],
    image: '/servizi/servizi-04.jpg',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const manifestoRef = useRef<HTMLHeadingElement>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  useGSAP(() => {
    const h2 = manifestoRef.current
    if (!h2) return

    // Split dei nodi di testo in parole mascherate → wrapping naturale + reveal
    // parola per parola (niente righe spezzate a mano).
    const inners: HTMLElement[] = []
    const textNodes = Array.from(h2.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE)
    textNodes.forEach((node) => {
      const frag = document.createDocumentFragment()
      ;(node.textContent || '').split(/(\s+)/).forEach((token) => {
        if (token.trim() === '') {
          frag.appendChild(document.createTextNode(token))
          return
        }
        const mask = document.createElement('span')
        mask.style.display = 'inline-block'
        mask.style.overflow = 'hidden'
        mask.style.verticalAlign = 'top'
        mask.style.padding = '0 0.02em 0.14em'
        mask.style.marginBottom = '-0.14em'
        const inner = document.createElement('span')
        inner.className = 'manifesto-word'
        inner.style.display = 'inline-block'
        inner.style.willChange = 'transform'
        inner.textContent = token
        mask.appendChild(inner)
        frag.appendChild(mask)
        inners.push(inner)
      })
      h2.replaceChild(frag, node)
    })
    if (!inners.length) return

    gsap.set(inners, { yPercent: 120 })
    gsap.to(inners, {
      yPercent: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.022,
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
          <span aria-hidden style={{ display: 'inline-block', width: 'clamp(60px, 10vw, 200px)' }} />
          Creiamo ecosistemi digitali dove brand, tecnologia, performance e integrazione lavorano insieme. Una visione operativa unica, end-to-end, pensata per accompagnare la crescita e renderla scalabile nel tempo.
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
              Servizi
            </span>
          </div>

          {/* Grid: 5 cards + description */}
          <div
            className="services-evolve-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr) 1.3fr',
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
              {(services.find((s) => s.id === activeId) ?? services[0]).description.map((para, i) => (
                <p
                  key={`${activeId ?? 'a'}-${i}`}
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 500,
                    fontSize: 'clamp(13px, 1vw, 15px)',
                    lineHeight: 1.55,
                    color: '#e5e5e5',
                    margin: 0,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
