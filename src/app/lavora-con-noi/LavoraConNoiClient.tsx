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

type Group = 'Design' | 'Social & Content' | 'Marketing' | 'Sviluppo' | 'Candidatura spontanea'
type Position = { id: string; group: Group; title: string; type: string; desc: string; subject: string }

// Ordine in cui i gruppi compaiono nella pagina
const groups: Group[] = ['Design', 'Social & Content', 'Marketing', 'Sviluppo', 'Candidatura spontanea']

const positions: Position[] = [
  {
    id: 'a',
    group: 'Design',
    title: 'GRAPHIC DESIGNER',
    type: 'FULL-TIME',
    desc: 'Cerchiamo un graphic designer con esperienza in brand identity e contenuti per i social, padronanza della suite Adobe e un forte senso estetico.',
    subject: 'Candidatura — Graphic Designer',
  },
  {
    id: 'b',
    group: 'Social & Content',
    title: 'SOCIAL MEDIA MANAGER',
    type: 'FULL-TIME',
    desc: 'Cerchiamo un social media manager con almeno 2 anni di esperienza: piani editoriali, reel e copy, campagne Meta Ads e report per i clienti. Allega profili gestiti o case study.',
    subject: 'Candidatura — Social Media Manager',
  },
  {
    id: 'c',
    group: 'Sviluppo',
    title: 'SHOPIFY DEVELOPER',
    type: 'FULL-TIME',
    desc: 'Sviluppatore con esperienza su Shopify Plus, Liquid, e possibilmente React. Lavorerai su progetti complessi con integrazioni ERP.',
    subject: 'Candidatura — Shopify Developer',
  },
  {
    id: 'd',
    group: 'Social & Content',
    title: 'VIDEO EDITOR & CONTENT CREATOR',
    type: 'FULL-TIME',
    desc: 'Montaggio di reel, spot e contenuti social per i nostri brand, con Premiere, CapCut e After Effects. Cerchiamo almeno 2 anni di esperienza: allega il tuo showreel.',
    subject: 'Candidatura — Video Editor & Content Creator',
  },
  {
    id: 'e',
    group: 'Design',
    title: 'SENIOR UX&UI DESIGNER',
    type: 'FULL-TIME',
    desc: 'Cerchiamo un designer con almeno 3 anni di esperienza in progetti digital e una forte sensibilità per il dettaglio.',
    subject: 'Candidatura — Senior UX&UI Designer',
  },
  {
    id: 'f',
    group: 'Marketing',
    title: 'PERFORMANCE MARKETING SPECIALIST',
    type: 'FULL-TIME',
    desc: 'Gestione e ottimizzazione di campagne Meta e Google Ads per brand fashion e lifestyle.',
    subject: 'Candidatura — Performance Marketing Specialist',
  },
  {
    id: 'g',
    group: 'Sviluppo',
    title: 'SVILUPPATORE WEB',
    type: 'FULL-TIME',
    desc: 'Sviluppatore con esperienza in React e Next.js per realizzare siti e applicazioni web veloci, curati e su misura per i nostri clienti.',
    subject: 'Candidatura — Sviluppatore Web',
  },
  {
    id: 'h',
    group: 'Sviluppo',
    title: 'SVILUPPATORE SOLUZIONI AI',
    type: 'FULL-TIME',
    desc: 'Progetterai e svilupperai automazioni, assistenti e integrazioni basate sui modelli di intelligenza artificiale, per i nostri clienti e per i nostri processi interni.',
    subject: 'Candidatura — Sviluppatore Soluzioni AI',
  },
  {
    id: 'i',
    group: 'Candidatura spontanea',
    title: 'PROFILO APERTO',
    type: 'QUALSIASI',
    desc: 'Non trovi il tuo ruolo? Se sei bravo in quello che fai e hai passione per il digitale, mandaci il tuo portfolio.',
    subject: 'Candidatura spontanea — Pira Web',
  },
]

// Posizioni ordinate per gruppo: la lettera (a), (b)… segue quest'ordine
const ordered = groups.flatMap((g) => positions.filter((p) => p.group === g))

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
          {groups.map((g) => {
            const items = ordered.filter((p) => p.group === g)
            if (!items.length) return null
            return (
              <div className="lavora-group" key={g}>
                <h3 className="lavora-group-title">
                  <span>{g}</span>
                  <span className="lavora-group-count">
                    {items.length} {items.length === 1 ? 'posizione' : 'posizioni'}
                  </span>
                </h3>
                <div className="lavora-list">
                  {items.map((p) => (
                    <div className="lavora-row" key={p.id}>
                      <span className="lavora-row-num">({String.fromCharCode(97 + ordered.indexOf(p))})</span>
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
              </div>
            )
          })}
        </section>
      </main>
      <Footer />
      <CandidaturaModal open={!!activePos} position={activePos || ''} onClose={() => setActivePos(null)} />
    </>
  )
}
