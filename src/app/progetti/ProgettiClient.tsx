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

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/progetti/${project.slug}`} className="evo-card">
      <div className="evo-card-img">
        <Image
          src={coverFor(project)}
          alt={project.title}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className="evo-img"
          style={{ objectFit: 'cover' }}
        />
        <span className="evo-card-year">{project.year}</span>
      </div>
      <div className="evo-card-meta">
        <p className="evo-card-services">{tagsArr(project).join(' • ').toUpperCase()}</p>
        <h3 className="evo-card-title">{project.title}</h3>
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

  // Reveal header (al load)
  useGSAP(
    () => {
      const els = headRef.current?.querySelectorAll<HTMLElement>('.evo-anim')
      if (els?.length) {
        gsap.from(els, { y: 36, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.1, delay: 0.15 })
      }
    },
    { scope: headRef }
  )

  // Reveal griglia (anche al cambio filtro)
  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll<HTMLElement>('.evo-card')
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.06, overwrite: true }
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
        {/* Header */}
        <section className="evo-head" ref={headRef}>
          <p className="evo-eyebrow evo-anim">
            <span className="evo-dot" /> Portfolio
          </p>
          <h1 className="evo-h1 evo-anim">
            I nostri <span className="evo-acc">progetti</span>
          </h1>
          <p className="evo-sub evo-anim">
            Brand, e-commerce, social e contenuti per aziende che vogliono distinguersi. Ogni progetto è un
            sistema costruito su misura.
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
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Griglia */}
        <div className="evo-grid" ref={gridRef}>
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
