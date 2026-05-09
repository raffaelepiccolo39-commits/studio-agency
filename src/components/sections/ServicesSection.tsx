'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import SectionLabel from '@/components/ui/SectionLabel'

type Service = {
  id: string
  name: string
  desc: string
  href: string
}

const services: Service[] = [
  {
    id: 'a',
    name: 'BRANDING & GRAPHIC DESIGN',
    desc: 'Un brand non deve limitarsi a essere presente, deve essere riconoscibile e impossibile da confondere. Costruiamo identità visive capaci di dare coerenza e personalità alla tua azienda.',
    href: '/cosa-facciamo#branding',
  },
  {
    id: 'b',
    name: 'WEBSITE & E-COMMERCE',
    desc: 'Progettiamo ecosistemi digitali pensati per valorizzare il brand e generare risultati concreti. Dai siti corporate agli e-commerce più strutturati: velocità, navigazione intuitiva e percorsi pensati per guidare l’utente all’azione.',
    href: '/cosa-facciamo#web',
  },
  {
    id: 'c',
    name: 'SOCIAL MEDIA MANAGEMENT',
    desc: 'Gestiamo la presenza social del tuo brand con una strategia pensata per attirare l’attenzione giusta e trasformare i contenuti in leve di crescita.',
    href: '/cosa-facciamo#social',
  },
  {
    id: 'd',
    name: 'CONTENT CREATION',
    desc: 'Creiamo contenuti pensati per lasciare il segno. Dal copywriting alla produzione visual, capaci di parlare al pubblico giusto e rafforzare la percezione del brand.',
    href: '/cosa-facciamo#content',
  },
  {
    id: 'e',
    name: 'PHOTO STUDIO',
    desc: 'Sala posa professionale all’interno dei nostri uffici, attrezzata per servizi fotografici, shooting prodotto, produzioni video e contenuti social.',
    href: '/cosa-facciamo#photo',
  },
]

function Arrow({ active }: { active: boolean }) {
  return (
    <svg
      width="37" height="37" viewBox="0 0 37 37" fill="none" aria-hidden
      style={{
        flexShrink: 0,
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.3s',
        color: active ? 'var(--accent)' : '#ffffff',
        transform: active ? 'rotate(0deg)' : 'rotate(0deg)',
      }}
    >
      <path d="M9 28L28 9M28 9H12M28 9V25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  )
}

function ServiceRow({ service, active, onEnter }: { service: Service; active: boolean; onEnter: () => void }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <Link
      ref={ref}
      href={service.href}
      onMouseEnter={onEnter}
      className="service-row-home"
      style={{
        display: 'grid',
        gridTemplateColumns: '60px 457px 1fr 50px',
        gap: '40px',
        alignItems: 'flex-start',
        padding: '0 40px',
        width: '100%',
        textDecoration: 'none',
        color: 'inherit',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-syne)',
        fontWeight: 400,
        fontSize: '16px',
        color: '#ffffff',
        paddingTop: '8px',
      }}>
        ({service.id})
      </span>

      <h3 style={{
        fontFamily: 'var(--font-syne)',
        fontWeight: 500,
        fontSize: 'clamp(32px, 3.6vw, 50px)',
        lineHeight: 0.85,
        color: active ? 'var(--accent)' : '#ffffff',
        transition: 'color 0.3s',
        margin: 0,
        whiteSpace: 'pre-line',
      }}>
        {service.name}
      </h3>

      <div style={{
        fontFamily: 'var(--font-syne)',
        fontWeight: 400,
        fontSize: '16px',
        color: '#ffffff',
        lineHeight: 1.5,
        maxHeight: active ? '300px' : '0',
        opacity: active ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
        whiteSpace: 'pre-line',
      }}>
        {service.desc}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Arrow active={active} />
      </div>
    </Link>
  )
}

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string>('a')

  return (
    <section
      id="services"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        padding: '60px 0',
      }}
    >
      <div style={{ padding: '0 40px' }}>
        <SectionLabel number="02" text="I NOSTRI SERVIZI" color="light" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {services.map(s => (
          <ServiceRow
            key={s.id}
            service={s}
            active={activeId === s.id}
            onEnter={() => setActiveId(s.id)}
          />
        ))}
      </div>
    </section>
  )
}
