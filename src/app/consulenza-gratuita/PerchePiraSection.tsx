'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Stesso layout + modalità di scroll orizzontale della MetodoSection del sito:
// riusa le classi globali `.metodo-*` per essere visivamente identica.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Hl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--accent)' }}>{children}</span>
)

type StepData = { letter: string; name: string; body: React.ReactNode }

const steps: StepData[] = [
  {
    letter: '1',
    name: 'Un solo partner',
    body: (
      <>
        <p>
          <Hl>Strategia, brand, sviluppo e advertising</Hl> sotto un&rsquo;unica regia: un solo
          interlocutore, responsabile dei risultati.
        </p>
        <p>
          Niente fornitori da coordinare, niente rimpalli. Una sola squadra che conosce la tua azienda
          e lavora con una direzione coerente.
        </p>
      </>
    ),
  },
  {
    letter: '2',
    name: 'Più valore percepito',
    body: (
      <>
        <p>
          Costruiamo un&rsquo;<Hl>identità</Hl> che alza il valore percepito del tuo brand e ti toglie
          dalla <Hl>guerra del prezzo</Hl> con i concorrenti.
        </p>
        <p>
          Quando il brand comunica valore, smetti di vendere solo sullo sconto e inizi a essere scelto
          per quello che sei.
        </p>
      </>
    ),
  },
  {
    letter: '3',
    name: 'Visione da imprenditori',
    body: (
      <>
        <p>
          Pianifichiamo il marketing come un <Hl>investimento aziendale</Hl>, con orizzonte
          <Hl> trimestrale e annuale</Hl>, non come spese spot.
        </p>
        <p>
          Ragioniamo come te: priorità chiare, budget tracciato e decisioni guidate dai numeri.
        </p>
      </>
    ),
  },
  {
    letter: '4',
    name: 'Sistemi che generano',
    body: (
      <>
        <p>
          Mettiamo a terra <Hl>sistemi di acquisizione</Hl> che producono opportunità misurabili, non
          solo &ldquo;visibilità&rdquo;.
        </p>
        <p>
          Ogni attività ha un obiettivo: portare contatti, clienti e crescita reale alla tua azienda.
        </p>
      </>
    ),
  },
]

export default function PerchePiraSection() {
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
    <>
      {/* Override mirato solo a #perche: niente bordo/spazio verticale in eccesso.
          Non tocca il Metodo reale del sito (stessa classe .metodo-h). */}
      <style>{`
        #perche.metodo-h { border-top: none; }
        @media (min-width: 821px){
          #perche.metodo-h { height: 74vh; }
        }
        @media (max-width: 820px){
          #perche .metodo-panel { min-height: 46vh; }
          #perche .metodo-panel { padding-top: 24px; padding-bottom: 24px; }
        }
      `}</style>
      <section ref={sectionRef} id="perche" className="metodo-h">
      <div ref={scrollRef} className="metodo-viewport">
        <div ref={trackRef} className="metodo-h-track">
          {/* Intro */}
          <div className="metodo-panel metodo-panel-intro">
            <div className="metodo-panel-content">
              <p className="metodo-eyebrow metodo-anim">Perché Pira</p>
              <h2 className="metodo-title metodo-anim">
                Perché scegliere <Hl>Pira Web</Hl> per la crescita della tua azienda
              </h2>
              <p className="metodo-hint metodo-anim">
                <span className="metodo-hint-dot" /> Scorri per esplorare i 4 motivi
              </p>
            </div>
          </div>

          {/* Motivi */}
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

      <div className="metodo-progress-track" aria-hidden>
        <span className="metodo-progress-bar" />
      </div>
      </section>
    </>
  )
}
