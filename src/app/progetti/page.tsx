'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import ImageTrail from '@/components/ui/ImageTrail'
import Magnetic from '@/components/ui/Magnetic'
import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const displayOrder = [
  'pasticceria-bluemoon',
  'contex-biancheria',
  'svinati',
  'maestri-cotonieri',
  'alma-studio',
  'quadrifoglio-group',
  'alba-ricambi',
]

const orderedProjects = displayOrder
  .map(slug => projects.find(p => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p && p.immagini.length > 0))

const trailImages = orderedProjects.map(p => p.immagini[0])

const tagsFor = (p: (typeof projects)[number]) => {
  const hasEcom = /e-commerce/i.test(p.platform) || p.services.some(s => /e-commerce/i.test(s))
  const hasBrand = p.services.some(s => /brand/i.test(s) || /logo/i.test(s))
  const hasSocial = p.services.some(s => /social/i.test(s))
  const hasContent = p.services.some(s => /shooting/i.test(s) || /content/i.test(s))

  const tags: string[] = []
  if (hasBrand) tags.push('BRAND IDENTITY')
  if (hasEcom) tags.push('E-COMMERCE')
  if (hasContent || hasSocial) tags.push('CONTENT CREATION')
  if (hasSocial) tags.push('SOCIAL MEDIA')
  return tags.join(' • ')
}

function ProjectCard({ project, fullWidth = false }: { project: (typeof projects)[number]; fullWidth?: boolean }) {
  return (
    <Link
      href={`/progetti/${project.slug}`}
      data-cursor="VEDI"
      data-trail
      className="project-card progetti-grid-card"
      style={{
        gridColumn: fullWidth ? '1 / -1' : undefined,
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div
        className="progetti-grid-img-wrap"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: fullWidth ? '1380 / 787.5' : '675 / 787.5',
          overflow: 'hidden',
        }}
      >
        <img
          src={project.immagini[0]}
          alt={project.title}
          className="project-img"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease',
            filter: 'grayscale(10%)',
            willChange: 'transform',
          }}
        />
      </div>

      <div style={{
        display: 'flex',
        gap: '30px',
        alignItems: 'flex-start',
        width: '100%',
      }}>
        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
          <p style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '16px',
            color: '#b2b2b2',
            lineHeight: 1.3,
            margin: 0,
          }}>
            {tagsFor(project)}
          </p>
          <p className="progetti-grid-title" style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '16px',
            color: '#ffffff',
            textDecoration: 'underline',
            lineHeight: 1.3,
            marginTop: '2px',
            textTransform: 'uppercase',
            transition: 'color 0.3s',
          }}>
            {project.title}
          </p>
        </div>
        <Magnetic strength={0.5} radius={60}>
          <svg
            className="progetti-grid-arrow"
            width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden
            style={{ flexShrink: 0, marginTop: '2px', color: '#ffffff', transition: 'transform 0.4s ease, color 0.3s', display: 'block' }}
          >
            <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </Magnetic>
      </div>
    </Link>
  )
}

export default function ProgettiPage() {
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const wraps = gridRef.current?.querySelectorAll<HTMLElement>('.progetti-grid-img-wrap')
    if (!wraps) return

    wraps.forEach((wrap) => {
      const img = wrap.querySelector<HTMLImageElement>('.project-img')
      if (!img) return

      gsap.set(wrap, { clipPath: 'inset(0% 0% 100% 0%)' })
      gsap.set(img, { scale: 1.25 })

      gsap.to(wrap, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.3,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(img, {
        scale: 1,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      })
    })
  }, { scope: gridRef })

  return (
    <>
      <Cursor />
      <ImageTrail images={trailImages} selector="[data-trail]" size={200} trailLength={6} threshold={80} />
      <Navbar />
      <main>
        <section style={{
          paddingTop: '60px',
          paddingBottom: '0',
          background: '#0a0a0a',
        }}>
          <div
            className="progetti-page-inner"
            style={{
              border: '0.5px solid #525252',
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              padding: '40px 30px',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 500,
              fontSize: '16px',
              color: '#b2b2b2',
              margin: 0,
            }}>
              I NOSTRI PROGETTI
            </p>

            <div
              ref={gridRef}
              className="progetti-grid-2col"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '30px',
              }}
            >
              {orderedProjects.map((p, i) => {
                const isLast = i === orderedProjects.length - 1 && orderedProjects.length % 2 === 1
                return (
                  <ProjectCard key={p.slug} project={p} fullWidth={isLast} />
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
