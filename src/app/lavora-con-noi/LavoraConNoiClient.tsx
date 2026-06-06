'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import CandidaturaModal from '@/components/ui/CandidaturaModal'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type Position = { id: string; title: string; type: string; desc: string; subject: string }

const positions: Position[] = [
  {
    id: 'a',
    title: 'SENIOR UX&UI DESIGNER',
    type: 'FULL-TIME',
    desc: 'Cerchiamo un designer con almeno 3 anni di esperienza in progetti digital e una forte sensibilità per il dettaglio.',
    subject: 'Candidatura — Senior UX&UI Designer',
  },
  {
    id: 'b',
    title: 'SHOPIFY DEVELOPER',
    type: 'FULL-TIME',
    desc: 'Sviluppatore con esperienza su Shopify Plus, Liquid, e possibilmente React. Lavorerai su progetti complessi con integrazioni ERP.',
    subject: 'Candidatura — Shopify Developer',
  },
  {
    id: 'c',
    title: 'PERFORMANCE MARKETING SPECIALIST',
    type: 'FULL-TIME',
    desc: 'Gestione e ottimizzazione di campagne Meta e Google Ads per brand fashion e lifestyle.',
    subject: 'Candidatura — Performance Marketing Specialist',
  },
  {
    id: 'd',
    title: 'PROFILO APERTO',
    type: 'QUALSIASI',
    desc: 'Non trovi il tuo ruolo? Se sei bravo in quello che fai e hai passione per il digitale, mandaci il tuo portfolio.',
    subject: 'Candidatura spontanea — Pira Web',
  },
]

export default function LavoraConNoiPage() {
  const rootRef = useRef<HTMLElement>(null)
  const [activePos, setActivePos] = useState<string | null>(null)

  useGSAP(
    () => {
      gsap.from('.lavora-title span', { yPercent: 112, duration: 1, ease: 'expo.out', delay: 0.15 })
      gsap.from('.lavora-hero-fade', {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.45,
        stagger: 0.12,
      })
      gsap.from('.lavora-poslabel', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.lavora-poslabel', start: 'top 92%' },
      })
      gsap.utils.toArray<HTMLElement>('.lavora-row').forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 44,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
      })
    },
    { scope: rootRef }
  )

  return (
    <>
      <Cursor />
      <Navbar />
      <main ref={rootRef} className="lavora">
        {/* Hero */}
        <section className="lavora-hero">
          <Image
            src="/lavora/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="lavora-hero-img"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="lavora-hero-overlay" aria-hidden />
          <div className="lavora-hero-content">
            <p className="lavora-eyebrow lavora-hero-fade">E-COMMERCE • CONTENT CREATION • SOCIAL MEDIA</p>
            <h1 className="lavora-title">
              <span>LAVORA CON NOI</span>
            </h1>
            <p className="lavora-sub lavora-hero-fade">
              Siamo un team compatto con grandi ambizioni. Se hai talento e sai fare la differenza, questo è il posto
              giusto per te.
            </p>
          </div>
        </section>

        {/* Posizioni aperte */}
        <section className="lavora-positions">
          <p className="lavora-poslabel">POSIZIONI APERTE</p>
          <div className="lavora-list">
            {positions.map((p) => (
              <div className="lavora-row" key={p.id}>
                <span className="lavora-row-num">({p.id})</span>
                <h2 className="lavora-row-title">{p.title}</h2>
                <div className="lavora-row-info">
                  <span className="lavora-row-type">{p.type}</span>
                  <p className="lavora-row-desc">{p.desc}</p>
                </div>
                <button type="button" className="lavora-apply" onClick={() => setActivePos(p.title)}>
                  CANDIDATI
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <CandidaturaModal open={!!activePos} position={activePos || ''} onClose={() => setActivePos(null)} />
    </>
  )
}
