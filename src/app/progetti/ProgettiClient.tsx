'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/data/projects'
import { coverFor } from '@/data/homeCovers'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const FILTERS = ['Tutti', 'Brand Identity', 'E-commerce', 'Social Media', 'Content Creation'] as const

const Hl = ({ children }: { children: React.ReactNode }) => <span className="evo-hl">{children}</span>

function tagsArr(p: Project): string[] {
  const hasEcom = /e-commerce/i.test(p.platform) || p.services.some((s) => /e-commerce/i.test(s))
  const hasBrand = p.services.some((s) => /brand/i.test(s) || /logo/i.test(s))
  const hasSocial = p.services.some((s) => /social/i.test(s))
  const hasContent = p.services.some((s) => /shooting/i.test(s) || /content/i.test(s))
  const tags: string[] = []
  if (hasBrand) tags.push('Brand Identity')
  if (hasEcom) tags.push('E-commerce')
  if (hasContent || hasSocial) tags.push('Content Creation')
  if (hasSocial) tags.push('Social Media')
  return tags
}

// Pattern asimmetrico: alterna card piccole verticali (4 col) e grandi orizzontali (8 col)
const PATTERN = [
  { span: 4, ratio: '3 / 4' },
  { span: 8, ratio: '3 / 2' },
  { span: 8, ratio: '3 / 2' },
  { span: 4, ratio: '3 / 4' },
]

function ProjectCard({ project, span, ratio }: { project: Project; span: number; ratio: string }) {
  return (
    <Link href={`/progetti/${project.slug}`} className="evo-card" style={{ gridColumn: `span ${span}` }}>
      <div className="evo-card-img" style={{ aspectRatio: ratio }}>
        <Image
          src={coverFor(project)}
          alt={project.title}
          fill
          sizes={span >= 8 ? '(max-width: 700px) 100vw, 66vw' : '(max-width: 700px) 100vw, 33vw'}
          className="evo-img"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="evo-card-meta">
        <h3 className="evo-card-title">{project.title}</h3>
        <p className="evo-card-services">{tagsArr(project).join(' • ')}</p>
      </div>
    </Link>
  )
}

export default function ProgettiPage({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Tutti')
  const gridRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLElement>(null)

  const withCover = projects.filter((p) => p.immagini.length > 0)
  const filtered = withCover.filter((p) => filter === 'Tutti' || tagsArr(p).includes(filter))

  useGSAP(
    () => {
      const els = headRef.current?.querySelectorAll<HTMLElement>('.evo-anim')
      if (els?.length) {
        gsap.from(els, { y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.15 })
      }
    },
    { scope: headRef }
  )

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll<HTMLElement>('.evo-card')
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.05, overwrite: true }
        )
      }
    },
    { scope: gridRef, dependencies: [filter] }
  )

  return (
    <>
      <Cursor />
      <Navbar />
      <main className="evo-projects">
        <section className="evo-head" ref={headRef}>
          {/* Etichette servizi fluttuanti */}
          <div className="evo-toplabels evo-anim">
            <span>Brand Identity</span>
            <span>Social Media</span>
            <span>E-commerce</span>
          </div>

          {/* Statement */}
          <p className="evo-statement evo-anim">
            Diamo forma a brand e business con <Hl>branding</Hl>, <Hl>web &amp; e-commerce</Hl>,{' '}
            <Hl>social media</Hl>, <Hl>content creation</Hl> e tutto ciò che serve per far crescere la tua azienda.
          </p>

          {/* Filtri */}
          <div className="evo-filters evo-anim">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`evo-filter${filter === f ? ' is-active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'Tutti' ? '[ Tutti ]' : f}
              </button>
            ))}
          </div>
        </section>

        <div className="evo-grid" ref={gridRef}>
          {filtered.map((p, i) => {
            const { span, ratio } = PATTERN[i % PATTERN.length]
            return <ProjectCard key={p.slug} project={p} span={span} ratio={ratio} />
          })}
        </div>
      </main>
      <Footer />
    </>
  )
}
