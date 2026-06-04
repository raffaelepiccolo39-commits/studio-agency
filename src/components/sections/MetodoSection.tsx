'use client'

import { useRef } from 'react'
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
        <p className="metodo-reveal">
          Analizziamo il <Hl>mercato</Hl>, mappiamo lo <Hl>scenario competitivo</Hl>, definiamo{' '}
          <Hl>posizionamento</Hl> e <Hl>KPI</Hl> di business.
        </p>
        <p className="metodo-reveal">
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
        <p className="metodo-reveal">
          Progettiamo l&rsquo;identità visiva, costruiamo il <Hl>tono di voce</Hl>, definiamo{' '}
          <Hl>piano editoriale</Hl> e <Hl>linee guida operative</Hl>.
        </p>
        <p className="metodo-reveal">
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
        <p className="metodo-reveal">La realizzazione è la fase in cui la strategia diventa concreta.</p>
        <p className="metodo-reveal">
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
        <p className="metodo-reveal">L&rsquo;amplificazione è la fase in cui il brand incontra il mercato.</p>
        <p className="metodo-reveal">
          <Hl>Pubblichiamo, investiamo, ottimizziamo.</Hl> Ogni canale (social, advertising, SEO, email)
          lavora dentro la stessa strategia. I dati non supportano le decisioni, bensì le guidano.
        </p>
        <p className="metodo-reveal">Ciò che porta valore si scala, ciò che non rende viene tagliato.</p>
      </>
    ),
  },
]

export default function MetodoSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      if (!root) return

      // Header reveal
      const head = root.querySelectorAll<HTMLElement>('.metodo-head-reveal')
      gsap.set(head, { y: 40, opacity: 0 })
      gsap.to(head, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: 'top 72%', toggleActions: 'play none none reverse' },
      })

      // Progress line fill
      const line = root.querySelector<HTMLElement>('.metodo-progress')
      const list = root.querySelector<HTMLElement>('.metodo-list')
      if (line && list) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: list, start: 'top 65%', end: 'bottom 75%', scrub: 0.6 },
          }
        )
      }

      // Per-step reveal
      root.querySelectorAll<HTMLElement>('.metodo-step').forEach((step) => {
        const giant = step.querySelector<HTMLElement>('.metodo-giant')
        const name = step.querySelector<HTMLElement>('.metodo-name')
        const dot = step.querySelector<HTMLElement>('.metodo-dot')
        const paras = step.querySelectorAll<HTMLElement>('.metodo-reveal')

        if (giant) gsap.set(giant, { y: 70, opacity: 0, scale: 0.94 })
        if (name) gsap.set(name, { y: 30, opacity: 0 })
        if (dot) gsap.set(dot, { scale: 0 })
        gsap.set(paras, { y: 26, opacity: 0 })

        const tl = gsap.timeline({
          scrollTrigger: { trigger: step, start: 'top 76%', toggleActions: 'play none none reverse' },
        })
        if (dot) tl.to(dot, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, 0)
        if (giant) tl.to(giant, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' }, 0)
        if (name) tl.to(name, { y: 0, opacity: 1, duration: 1, ease: 'expo.out' }, 0.1)
        tl.to(paras, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12 }, 0.25)
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="metodo"
      style={{
        background: '#0a0a0a',
        borderTop: '0.5px solid #525252',
        padding: 'clamp(64px, 9vw, 120px) clamp(24px, 5vw, 40px)',
        overflow: 'hidden',
      }}
    >
      <p
        className="metodo-head-reveal"
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 500,
          fontSize: '13px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#b2b2b2',
          margin: '0 0 clamp(20px, 2.5vw, 32px)',
        }}
      >
        Metodo
      </p>

      <h2
        className="metodo-head-reveal"
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 600,
          fontSize: 'clamp(28px, 4vw, 60px)',
          lineHeight: 1.08,
          letterSpacing: '-0.015em',
          color: '#ffffff',
          margin: '0 0 clamp(48px, 7vw, 96px)',
          maxWidth: '960px',
        }}
      >
        Il metodo <Hl>PIRA</Hl>, un processo creativo guidato dalla strategia
      </h2>

      <div className="metodo-list">
        <span className="metodo-progress" aria-hidden />
        {steps.map((s) => (
          <div className="metodo-step" key={s.letter}>
            <div className="metodo-step-head">
              <span className="metodo-dot" aria-hidden />
              <span className="metodo-giant" aria-hidden>
                {s.letter}
              </span>
              <h3 className="metodo-name">{s.name.toUpperCase()}</h3>
            </div>
            <div className="metodo-step-body">{s.body}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
