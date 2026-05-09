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
  image: string
}

const services: Service[] = [
  {
    id: 'a',
    name: 'BRANDING & GRAPHIC DESIGN',
    desc: 'Un brand non deve limitarsi a essere presente, deve essere riconoscibile e impossibile da confondere. Costruiamo identità visive capaci di dare coerenza e personalità alla tua azienda.',
    href: '/cosa-facciamo#branding',
    image: '/progetti/alma-studio/alma-studio-case-study-04.jpg',
  },
  {
    id: 'b',
    name: 'WEBSITE & E-COMMERCE',
    desc: 'Progettiamo ecosistemi digitali pensati per valorizzare il brand e generare risultati concreti. Dai siti corporate agli e-commerce più strutturati: velocità, navigazione intuitiva e percorsi pensati per guidare l’utente all’azione.',
    href: '/cosa-facciamo#web',
    image: '/progetti/pasticceria-bluemoon/screenshot-sito.jpg',
  },
  {
    id: 'c',
    name: 'SOCIAL MEDIA MANAGEMENT',
    desc: 'Gestiamo la presenza social del tuo brand con una strategia pensata per attirare l’attenzione giusta e trasformare i contenuti in leve di crescita.',
    href: '/cosa-facciamo#social',
    image: '/progetti/svinati/svinati-case-study-03.jpg',
  },
  {
    id: 'd',
    name: 'CONTENT CREATION',
    desc: 'Creiamo contenuti pensati per lasciare il segno. Dal copywriting alla produzione visual, capaci di parlare al pubblico giusto e rafforzare la percezione del brand.',
    href: '/cosa-facciamo#content',
    image: '/progetti/maestri-cotonieri/maestri-cotonieri-pira-04.jpg',
  },
  {
    id: 'e',
    name: 'PHOTO STUDIO',
    desc: 'Sala posa professionale all’interno dei nostri uffici, attrezzata per servizi fotografici, shooting prodotto, produzioni video e contenuti social.',
    href: '/cosa-facciamo#photo',
    image: '/progetti/svinati/svinati-case-study-04.jpg',
  },
]

function Arrow({ active }: { active: boolean }) {
  return (
    <svg
      width="42" height="42" viewBox="0 0 37 37" fill="none" aria-hidden
      style={{
        flexShrink: 0,
        transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), color 0.4s',
        color: active ? 'var(--accent)' : '#ffffff',
        transform: active ? 'translate(8px, -8px)' : 'translate(0, 0)',
      }}
    >
      <path d="M9 28L28 9M28 9H12M28 9V25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  )
}

function ServiceRow({
  service,
  active,
  anyHovered,
  onEnter,
  onLeave,
}: {
  service: Service
  active: boolean
  anyHovered: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <Link
      ref={ref}
      href={service.href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="service-row-immersive"
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '60px 1fr 60px',
        gap: '40px',
        alignItems: 'center',
        padding: 'clamp(28px, 4.5vw, 44px) clamp(24px, 4vw, 40px)',
        width: '100%',
        textDecoration: 'none',
        color: 'inherit',
        borderTop: '0.5px solid #2a2a2a',
        opacity: inView ? (anyHovered && !active ? 0.35 : 1) : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-syne)',
        fontWeight: 400,
        fontSize: '14px',
        color: active ? 'var(--accent)' : '#b2b2b2',
        transition: 'color 0.4s',
        zIndex: 1,
      }}>
        ({service.id})
      </span>

      <h3
        className="service-row-title"
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(36px, 6.5vw, 92px)',
          lineHeight: 0.95,
          letterSpacing: '0.005em',
          color: active ? 'var(--accent)' : '#ffffff',
          transition: 'color 0.4s, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          transform: active ? 'translateX(12px)' : 'translateX(0)',
          margin: 0,
          zIndex: 1,
        }}
      >
        {service.name}
      </h3>

      <div style={{ display: 'flex', justifyContent: 'flex-end', zIndex: 1 }}>
        <Arrow active={active} />
      </div>
    </Link>
  )
}

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeService = services.find(s => s.id === activeId)

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        padding: '60px 0 0',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '0 40px', position: 'relative', zIndex: 2 }}>
        <SectionLabel number="02" text="I NOSTRI SERVIZI" color="light" />
      </div>

      {/* Floating preview image */}
      <div
        aria-hidden
        className="service-preview"
        style={{
          position: 'absolute',
          right: 'clamp(40px, 6vw, 80px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(280px, 28vw, 420px)',
          height: 'clamp(380px, 36vw, 560px)',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: activeService ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
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
              transform: activeId === s.id ? 'scale(1) translateY(0)' : 'scale(1.05) translateY(20px)',
              transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
              filter: 'brightness(0.92)',
            }}
          />
        ))}
      </div>

      <div
        style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}
        onMouseLeave={() => setActiveId(null)}
      >
        {services.map(s => (
          <ServiceRow
            key={s.id}
            service={s}
            active={activeId === s.id}
            anyHovered={activeId !== null}
            onEnter={() => setActiveId(s.id)}
            onLeave={() => {}}
          />
        ))}
      </div>
    </section>
  )
}
