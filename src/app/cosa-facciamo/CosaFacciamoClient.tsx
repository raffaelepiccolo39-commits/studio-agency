'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import ProjectsSection from '@/components/sections/ProjectsSection'
import { useInView } from 'react-intersection-observer'

type Service = {
  id: string
  name: string
  desc: string
}

const services: Service[] = [
  {
    id: 'a',
    name: 'BRANDING & GRAPHIC DESIGN',
    desc: 'Un brand non deve limitarsi a essere presente, deve essere riconoscibile e impossibile da confondere. Costruiamo identità visive capaci di dare coerenza e personalità alla tua azienda. Partiamo dal posizionamento, analizziamo il mercato e traduciamo i valori del brand in un sistema visivo coordinato: logo, colori, tipografia, stile grafico, tono di voce e percezione.',
  },
  {
    id: 'b',
    name: 'WEBSITE & E-COMMERCE',
    desc: 'Progettiamo ecosistemi digitali pensati per valorizzare il brand e generare risultati concreti. Dai siti corporate agli e-commerce più strutturati: velocità di caricamento, navigazione intuitiva e percorsi pensati per guidare l’utente all’azione. Costruiamo asset digitali che lavorano ogni giorno per la crescita della tua azienda.',
  },
  {
    id: 'c',
    name: 'SOCIAL MEDIA MANAGEMENT',
    desc: 'Gestiamo la presenza social del tuo brand con una strategia pensata per attirare l’attenzione giusta e trasformare i contenuti in leve di crescita. Non pubblichiamo "tanto per farlo": studiamo il target, definiamo format riconoscibili e sviluppiamo contenuti pensati per generare continuità e relazione. L’obiettivo è costruire una community che percepisce il tuo valore e sceglie di avvicinarsi alla tua azienda.',
  },
  {
    id: 'd',
    name: 'CONTENT CREATION',
    desc: 'Creiamo contenuti pensati per lasciare il segno. In un mercato pieno di messaggi tutti uguali, la differenza la fa chi comunica con identità, strategia e qualità. Per questo sviluppiamo contenuti originali, dal copywriting alla produzione visual, capaci di parlare al pubblico giusto e rafforzare la percezione del brand.',
  },
  {
    id: 'e',
    name: 'PHOTO STUDIO',
    desc: 'Mettiamo a disposizione una sala posa professionale all’interno dei nostri uffici, pensata per brand, aziende e creator che hanno bisogno di uno spazio curato e attrezzato per realizzare contenuti di qualità. Uno studio versatile, ideale per servizi fotografici professionali, shooting prodotto, produzioni video e contenuti social.',
  },
]

function Arrow() {
  return (
    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" aria-hidden style={{ color: 'var(--accent)' }}>
      <path d="M9 28L28 9M28 9H12M28 9V25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  )
}

function ServiceItem({ service, index }: { service: Service; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <div
      ref={ref}
      className="service-row-cosa"
      style={{
        display: 'grid',
        gridTemplateColumns: '60px 457px 1fr 50px',
        gap: '40px',
        alignItems: 'flex-start',
        padding: '0 40px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.05}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.05}s`,
      }}
    >
      <span style={{
        fontFamily: 'var(--font-syne)',
        fontWeight: 400,
        fontSize: '16px',
        color: '#b2b2b2',
        paddingTop: '8px',
      }}>
        ({service.id})
      </span>

      <h2 style={{
        fontFamily: 'var(--font-syne)',
        fontWeight: 500,
        fontSize: 'clamp(32px, 3.6vw, 50px)',
        lineHeight: 0.85,
        color: 'var(--accent)',
        margin: 0,
        whiteSpace: 'pre-line',
      }}>
        {service.name}
      </h2>

      <p style={{
        fontFamily: 'var(--font-syne)',
        fontWeight: 400,
        fontSize: '16px',
        color: '#ffffff',
        lineHeight: 1.5,
        margin: 0,
        whiteSpace: 'pre-line',
      }}>
        {service.desc}
      </p>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Arrow />
      </div>
    </div>
  )
}

export default function CosaFacciamoPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
      '@type': 'Organization',
      name: 'Pira Web Creative Agency',
      url: 'https://www.piraweb.it',
    },
    serviceType: 'Digital Agency Services',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'I nostri servizi',
      itemListElement: services.map(s => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name },
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Cursor />
      <Navbar />
      <main>
        {/* Services section */}
        <section style={{
          background: '#0a0a0a',
          padding: '60px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}>
          <div style={{ padding: '40px 40px 0' }}>
            <p style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 500,
              fontSize: '16px',
              color: '#ffffff',
              margin: 0,
            }}>
              I NOSTRI SERVIZI
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', paddingTop: '30px' }}>
            {services.map((s, i) => (
              <ServiceItem key={s.id} service={s} index={i} />
            ))}
          </div>
        </section>

        <ProjectsSection />
      </main>
      <Footer ctaTitle={<>Crediamo nelle idee solide<br />e nei risultati reali.</>} />
    </>
  )
}
