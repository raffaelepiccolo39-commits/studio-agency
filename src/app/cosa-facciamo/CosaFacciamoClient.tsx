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

type Svc = { id: string; title: string; paras: React.ReactNode[] }

const services: Svc[] = [
  {
    id: 'a',
    title: 'BRANDING &\nGRAPHIC DESIGN',
    paras: [
      'Un brand non deve limitarsi a essere presente, deve essere riconoscibile e impossibile da confondere.',
      'Costruiamo identità visive capaci di dare coerenza e personalità alla tua azienda.',
      'Partiamo dal posizionamento, analizziamo il mercato e traduciamo i valori del brand in un sistema visivo coordinato: logo, colori, tipografia, stile grafico, tono di voce e percezione.',
    ],
  },
  {
    id: 'b',
    title: 'WEBSITE &\nE-COMMERCE',
    paras: [
      'Progettiamo ecosistemi digitali pensati per valorizzare il brand e generare risultati concreti.',
      'Dai siti corporate agli e-commerce più strutturati: velocità di caricamento, navigazione intuitiva e percorsi pensati per guidare l’utente all’azione.',
      'Costruiamo asset digitali che lavorano ogni giorno per la crescita della tua azienda.',
    ],
  },
  {
    id: 'c',
    title: 'SOCIAL MEDIA\nMANAGEMENT',
    paras: [
      'Gestiamo la presenza social del tuo brand con una strategia pensata per attirare l’attenzione giusta e trasformare i contenuti in leve di crescita.',
      'Non pubblichiamo “tanto per farlo”: studiamo il target, definiamo format riconoscibili e sviluppiamo contenuti pensati per generare continuità e relazione.',
      'L’obiettivo è costruire una community che percepisce il tuo valore e sceglie di avvicinarsi alla tua azienda.',
    ],
  },
  {
    id: 'd',
    title: 'CONTENT\nCREATION',
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

function ServiceBlock({ s }: { s: Svc }) {
  return (
    <div className="cosa-service">
      <div className="cosa-service-head">
        <h2 className="cosa-service-title cosa-anim" style={{ whiteSpace: 'pre-line' }}>{s.title}</h2>
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

export default function CosaFacciamoPage() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const els = rootRef.current?.querySelectorAll<HTMLElement>('.cosa-anim')
      if (!els || !els.length) return
      gsap.set(els, { opacity: 0, y: 34 })
      ScrollTrigger.batch(Array.from(els), {
        start: 'top 90%',
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.09, overwrite: true }),
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
          <p className="cosa-intro-text cosa-anim">Diamo forma al tuo brand.</p>
        </section>

        {/* I nostri servizi */}
        <section style={{ paddingTop: 'clamp(20px, 3vw, 40px)', paddingBottom: 'clamp(40px, 5vw, 60px)' }}>
          <p className="cosa-label cosa-anim">I NOSTRI SERVIZI</p>
          <div className="cosa-grid">
            {services.map((s) => (
              <ServiceBlock key={s.id} s={s} />
            ))}
          </div>
        </section>

        {/* Foto sala posa */}
        <div className="cosa-studio-img cosa-anim">
          <Image
            src="/servizi/photo-studio.jpg"
            alt="La nostra sala posa / photo studio"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>

        {/* Photo studio (e) */}
        <section className="cosa-section">
          <div className="cosa-2col">
            <p className="cosa-big-heading cosa-anim">Uno spazio attrezzato per realizzare contenuti in autonomia</p>
            <ServiceBlock s={photoStudio} />
          </div>
        </section>

        {/* Domanda SCP */}
        <section className="cosa-section" style={{ paddingTop: 0 }}>
          <p className="cosa-big-heading cosa-big-heading-full cosa-anim">
            E se la presentazione aziendale diventasse uno strumento sempre a portata di mano?
          </p>
        </section>

        {/* SCP (f) */}
        <section className="cosa-section" style={{ paddingTop: 0 }}>
          <div className="cosa-2col cosa-2col-scp">
            <ServiceBlock s={scp} />
            <div className="cosa-scp-img cosa-anim">
              <Image
                src="/servizi/scp-mockup.jpg"
                alt="SCP — Smart Company Profile"
                width={420}
                height={746}
                sizes="(max-width: 820px) 80vw, 420px"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
        </section>

        <ProjectsSection />
      </main>
      <Footer ctaTitle={<>Crediamo nelle idee solide<br />e nei risultati reali.</>} />
    </>
  )
}
