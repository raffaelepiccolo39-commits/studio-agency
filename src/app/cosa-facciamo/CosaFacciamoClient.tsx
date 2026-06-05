'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import ProjectsSection from '@/components/sections/ProjectsSection'
import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ACCENT = 'var(--accent)'

type Svc = { id: string; title: string; paras: React.ReactNode[]; image?: string }

const services: Svc[] = [
  {
    id: 'a',
    title: 'BRANDING &\nGRAPHIC DESIGN',
    image: '/servizi/creative-1.jpg',
    paras: [
      'Un brand non deve limitarsi a essere presente, deve essere riconoscibile e impossibile da confondere.',
      'Costruiamo identità visive capaci di dare coerenza e personalità alla tua azienda.',
      'Partiamo dal posizionamento, analizziamo il mercato e traduciamo i valori del brand in un sistema visivo coordinato: logo, colori, tipografia, stile grafico, tono di voce e percezione.',
    ],
  },
  {
    id: 'b',
    title: 'WEBSITE &\nE-COMMERCE',
    image: '/servizi/creative-2.jpg',
    paras: [
      'Progettiamo ecosistemi digitali pensati per valorizzare il brand e generare risultati concreti.',
      'Dai siti corporate agli e-commerce più strutturati: velocità di caricamento, navigazione intuitiva e percorsi pensati per guidare l’utente all’azione.',
      'Costruiamo asset digitali che lavorano ogni giorno per la crescita della tua azienda.',
    ],
  },
  {
    id: 'c',
    title: 'SOCIAL MEDIA\nMANAGEMENT',
    image: '/servizi/creative-4.jpg',
    paras: [
      'Gestiamo la presenza social del tuo brand con una strategia pensata per attirare l’attenzione giusta e trasformare i contenuti in leve di crescita.',
      'Non pubblichiamo “tanto per farlo”: studiamo il target, definiamo format riconoscibili e sviluppiamo contenuti pensati per generare continuità e relazione.',
      'L’obiettivo è costruire una community che percepisce il tuo valore e sceglie di avvicinarsi alla tua azienda.',
    ],
  },
  {
    id: 'd',
    title: 'CONTENT\nCREATION',
    image: '/servizi/creative-3.jpg',
    paras: [
      'Creiamo contenuti pensati per lasciare il segno. In un mercato pieno di messaggi tutti uguali, la differenza la fa chi comunica con identità, strategia e qualità.',
      'Per questo sviluppiamo contenuti originali, dal copywriting alla produzione visual, capaci di parlare al pubblico giusto e rafforzare la percezione del brand.',
    ],
  },
]

const photoStudio: Svc = {
  id: 'e',
  title: 'PHOTO\nSTUDIO',
  paras: [
    'Mettiamo a disposizione una sala posa professionale all’interno dei nostri uffici, pensata per brand, aziende e creator che hanno bisogno di uno spazio curato e attrezzato per realizzare contenuti di qualità.',
    'Uno studio versatile, ideale per servizi fotografici professionali, shooting prodotto, produzioni video e contenuti social.',
  ],
}

const scp: Svc = {
  id: 'f',
  title: 'SCP',
  paras: [
    <>
      SCP è uno <span style={{ color: ACCENT }}>Smart Company Profile</span>: una presentazione aziendale digitale,
      interattiva e facilmente consultabile.
    </>,
    'A differenza di un normale PDF statico, permette di raccontare l’azienda in modo più immediato, organizzando informazioni e link utili in un unico strumento navigabile.',
    'Aiuta l’azienda a presentarsi in modo più professionale durante incontri o invii digitali, dove il cliente può esplorare i contenuti con facilità e avere sempre una panoramica chiara e completa del valore dell’impresa.',
  ],
}

function ColorScrollText({ text, full = false }: { text: string; full?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const words = el.querySelectorAll<HTMLElement>('.csw-word')
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.4,
          scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 55%', scrub: 0.4 },
        }
      )
    },
    { scope: ref }
  )
  return (
    <p ref={ref} className={`cosa-big-heading${full ? ' cosa-big-heading-full' : ''}`}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="csw-word">
          {w}{' '}
        </span>
      ))}
    </p>
  )
}

function ServiceBlock({ s, display = false }: { s: Svc; display?: boolean }) {
  return (
    <div className="cosa-service">
      <div className="cosa-service-head">
        <h2
          className={`cosa-service-title cosa-anim${display ? ' cosa-title-display' : ''}`}
          style={{ whiteSpace: 'pre-line' }}
        >
          {s.title}
        </h2>
        <span className="cosa-service-letter cosa-anim">({s.id})</span>
      </div>
      <div className="cosa-service-desc">
        {s.paras.map((p, i) => (
          <p key={i} className="cosa-anim">{p}</p>
        ))}
      </div>
    </div>
  )
}

function ServiceRow({ s, index }: { s: Svc; index: number }) {
  const reversed = index % 2 === 1
  return (
    <div className={`cosa-row${reversed ? ' cosa-row-rev' : ''}`}>
      <div className="cosa-row-text">
        <ServiceBlock s={s} />
      </div>
      {s.image && (
        <div className="cosa-row-img cosa-anim">
          <Image
            className="cosa-par-img"
            src={s.image}
            alt=""
            fill
            sizes="(max-width: 820px) 100vw, 45vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
    </div>
  )
}

export default function CosaFacciamoPage() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const els = rootRef.current?.querySelectorAll<HTMLElement>('.cosa-anim')
      if (!els || !els.length) return
      // Intro impattante: parole che salgono da una maschera (al load)
      const introWords = rootRef.current?.querySelectorAll<HTMLElement>('.cosa-intro-word')
      if (introWords && introWords.length) {
        gsap.from(introWords, { yPercent: 118, duration: 1.1, ease: 'expo.out', stagger: 0.07, delay: 0.25 })
      }

      gsap.set(els, { opacity: 0, y: 34 })
      ScrollTrigger.batch(Array.from(els), {
        start: 'top 90%',
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.09, overwrite: true }),
      })

      // Parallasse trittico creativo
      rootRef.current?.querySelectorAll<HTMLElement>('.cosa-par-img').forEach((img, i) => {
        const amt = [9, -8, 6][i % 3]
        gsap.fromTo(
          img,
          { yPercent: -amt, scale: 1.14 },
          {
            yPercent: amt,
            scale: 1.14,
            ease: 'none',
            scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      })
    },
    { scope: rootRef }
  )

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: { '@type': 'Organization', name: 'Pira Web Creative Agency', url: 'https://www.piraweb.it' },
    serviceType: 'Digital Agency Services',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'I nostri servizi',
      itemListElement: [...services, photoStudio, scp].map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title.replace(/\n/g, ' ') },
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Cursor />
      <Navbar />
      <main ref={rootRef} style={{ background: '#0a0a0a' }}>
        {/* Intro */}
        <section className="cosa-intro">
          <p className="cosa-intro-text">
            {'Diamo forma al tuo brand.'.split(' ').flatMap((w, i) => [
              <span className="cosa-intro-mask" key={`w${i}`}>
                <span className="cosa-intro-word">{w}</span>
              </span>,
              ' ',
            ])}
          </p>
        </section>

        {/* I nostri servizi */}
        <section style={{ paddingTop: 'clamp(20px, 3vw, 40px)', paddingBottom: 'clamp(40px, 5vw, 60px)' }}>
          <p className="cosa-label cosa-anim">I NOSTRI SERVIZI</p>
          <div className="cosa-rows">
            {services.map((s, i) => (
              <ServiceRow key={s.id} s={s} index={i} />
            ))}
          </div>
        </section>

        {/* Domanda SCP */}
        <section className="cosa-section">
          <ColorScrollText text="E se la presentazione aziendale diventasse uno strumento sempre a portata di mano?" full />
        </section>

        {/* SCP (f) */}
        <section className="cosa-section" style={{ paddingTop: 0 }}>
          <div className="cosa-2col cosa-2col-scp">
            <ServiceBlock s={scp} display />
            <div className="cosa-scp-media cosa-anim">
              <video className="cosa-scp-video" controls preload="metadata" playsInline>
                <source src="/servizi/scp-video.mp4" type="video/mp4" />
              </video>
              <div className="cosa-scp-img">
                <Image
                  src="/servizi/scp-mockup.jpg"
                  alt="SCP — Smart Company Profile"
                  width={420}
                  height={746}
                  sizes="(max-width: 820px) 40vw, 200px"
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Photo studio (e) */}
        <section className="cosa-section">
          <ColorScrollText text="Uno spazio attrezzato per realizzare contenuti in autonomia" full />
          <div className="cosa-2col" style={{ marginTop: 'clamp(36px, 5vw, 72px)' }}>
            <div className="cosa-row-img cosa-anim">
              <Image
                className="cosa-par-img"
                src="/servizi/photo-studio.jpg"
                alt="La nostra sala posa / photo studio"
                fill
                sizes="(max-width: 820px) 100vw, 45vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            <ServiceBlock s={photoStudio} />
          </div>
        </section>

        <ProjectsSection />
      </main>
      <Footer ctaTitle={<>Crediamo nelle idee solide<br />e nei risultati reali.</>} />
    </>
  )
}
