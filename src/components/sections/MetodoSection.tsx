'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Hl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--accent)' }}>{children}</span>
)

type StepData = { letter: string; name: string; body: React.ReactNode }

const steps: StepData[] = [
  {
    letter: 'P',
    name: 'Posizionamento',
    body: (
      <>
        <p>
          Analizziamo il <Hl>mercato</Hl>, mappiamo lo <Hl>scenario competitivo</Hl>, definiamo{' '}
          <Hl>posizionamento</Hl> e <Hl>KPI</Hl> di business.
        </p>
        <p>
          Da qui costruiamo la <Hl>strategia di marketing</Hl>: non un documento da archiviare, ma il
          riferimento operativo da cui ogni fase successiva trae direzione e coerenza.
        </p>
      </>
    ),
  },
  {
    letter: 'I',
    name: 'Identità',
    body: (
      <>
        <p>
          Progettiamo l&rsquo;identità visiva, costruiamo il <Hl>tono di voce</Hl>, definiamo{' '}
          <Hl>piano editoriale</Hl> e <Hl>linee guida operative</Hl>.
        </p>
        <p>
          Così prende forma il <Hl>sistema brand</Hl>: non un esercizio estetico, ma il riferimento
          espressivo che dà a ogni post, campagna e email la stessa voce riconoscibile.
        </p>
      </>
    ),
  },
  {
    letter: 'R',
    name: 'Realizzazione',
    body: (
      <>
        <p>La realizzazione è la fase in cui la strategia diventa concreta.</p>
        <p>
          <Hl>Fotografiamo, giriamo, disegniamo, scriviamo, sviluppiamo</Hl>: ogni asset del progetto
          nasce sotto lo stesso tetto, con la stessa direzione e con la stessa cura del dettaglio.
        </p>
      </>
    ),
  },
  {
    letter: 'A',
    name: 'Amplificazione',
    body: (
      <>
        <p>L&rsquo;amplificazione è la fase in cui il brand incontra il mercato.</p>
        <p>
          <Hl>Pubblichiamo, investiamo, ottimizziamo.</Hl> Ogni canale (social, advertising, SEO, email)
          lavora dentro la stessa strategia. I dati non supportano le decisioni, bensì le guidano.
        </p>
        <p>Ciò che porta valore si scala, ciò che non rende viene tagliato.</p>
      </>
    ),
  },
]

export default function MetodoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Mobile: la timeline cresce con lo scroll orizzontale del carosello
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(min-width: 821px)').matches) return
    const sc = scrollRef.current
    const bar = sectionRef.current?.querySelector<HTMLElement>('.metodo-progress-bar')
    if (!sc || !bar) return
    const onScroll = () => {
      const max = sc.scrollWidth - sc.clientWidth
      const p = max > 0 ? sc.scrollLeft / max : 0
      bar.style.transform = `scaleX(${p})`
    }
    sc.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => sc.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(
    () => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      const bar = section.querySelector<HTMLElement>('.metodo-progress-bar')

      // Intro reveal (sempre, anche mobile)
      const introEls = section.querySelectorAll<HTMLElement>('.metodo-panel-intro .metodo-anim')
      gsap.from(introEls, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' },
      })

      const mm = gsap.matchMedia()

      // ── Desktop: scroll orizzontale con pin (su mobile resta verticale) ──
      mm.add('(min-width: 821px)', () => {
        const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth)

        const tween = gsap.to(track, { x: () => -getAmount(), ease: 'none' })

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => '+=' + getAmount() * 0.62,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          animation: tween,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar) gsap.set(bar, { scaleX: self.progress })
          },
        })

        // Parallasse verticale delle lettere giganti
        gsap.utils.toArray<HTMLElement>('.metodo-giant').forEach((g) => {
          gsap.fromTo(
            g,
            { yPercent: 10 },
            {
              yPercent: -10,
              ease: 'none',
              scrollTrigger: { trigger: g, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            }
          )
        })

        // Reveal contenuti di ogni fase all'ingresso orizzontale
        gsap.utils.toArray<HTMLElement>('.metodo-panel-step').forEach((panel) => {
          const els = panel.querySelectorAll<HTMLElement>('.metodo-anim')
          gsap.from(els, {
            y: 48,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left 72%',
              toggleActions: 'play none none reverse',
            },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="metodo" className="metodo-h">
      <div ref={scrollRef} className="metodo-viewport">
      <div ref={trackRef} className="metodo-h-track">
        {/* Intro */}
        <div className="metodo-panel metodo-panel-intro">
          <div className="metodo-panel-content">
            <p className="metodo-eyebrow metodo-anim">Metodo</p>
            <h2 className="metodo-title metodo-anim">
              Il metodo <Hl>PIRA</Hl>, un processo creativo guidato dalla strategia
            </h2>
            <p className="metodo-hint metodo-anim">
              <span className="metodo-hint-dot" /> Scorri per esplorare le 4 fasi
            </p>
          </div>
        </div>

        {/* Fasi */}
        {steps.map((s, i) => (
          <div className="metodo-panel metodo-panel-step" key={s.letter}>
            <span className="metodo-giant" aria-hidden>
              {s.letter}
            </span>
            <div className="metodo-panel-content">
              <p className="metodo-index metodo-anim">
                {String(i + 1).padStart(2, '0')} <span className="metodo-index-sep">/</span> 04
              </p>
              <h3 className="metodo-name metodo-anim">{s.name.toUpperCase()}</h3>
              <div className="metodo-step-body metodo-anim">{s.body}</div>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Timeline di avanzamento (desktop: scrub pin · mobile: scroll carosello) */}
      <div className="metodo-progress-track" aria-hidden>
        <span className="metodo-progress-bar" />
      </div>
    </section>
  )
}
