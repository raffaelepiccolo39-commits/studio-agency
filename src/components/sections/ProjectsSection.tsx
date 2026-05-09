'use client'

import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { projects } from '@/data/projects'
import SectionLabel from '@/components/ui/SectionLabel'

const homepageOrder = [
  'pasticceria-bluemoon',
  'contex-biancheria',
  'svinati',
  'maestri-cotonieri',
  'alma-studio',
  'quadrifoglio-group',
  'alba-ricambi',
]

const homepageProjects = homepageOrder
  .map(slug => projects.find(p => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p && p.immagini.length > 0))

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

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{
        borderTop: '0.5px solid #525252',
        borderBottom: '0.5px solid #525252',
        padding: '40px 30px 40px',
      }}
    >
      <div style={{ marginBottom: '30px' }}>
        <SectionLabel number="01" text="I NOSTRI PROGETTI" />
      </div>

      <div
        className="projects-row"
        style={{
          display: 'flex',
          gap: '30px',
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingRight: '30px',
          paddingBottom: '8px',
          scrollSnapType: 'x mandatory',
        }}
      >
        {homepageProjects.map((p) => (
          <Link
            key={p.slug}
            href={`/progetti/${p.slug}`}
            data-cursor="VEDI"
            className="project-card project-home-card"
            style={{
              flex: '0 0 500px',
              height: '798px',
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              textDecoration: 'none',
              color: 'inherit',
              scrollSnapAlign: 'start',
            }}
          >
            <div style={{
              position: 'relative',
              flex: '1 1 auto',
              minHeight: 0,
              width: '100%',
              overflow: 'hidden',
            }}>
              <img
                src={p.immagini[0]}
                alt={p.title}
                className="project-img"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease',
                  filter: 'grayscale(10%)',
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
                  {tagsFor(p)}
                </p>
                <p className="project-home-title" style={{
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
                  {p.title}
                </p>
              </div>
              <svg
                className="project-home-arrow"
                width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden
                style={{ flexShrink: 0, marginTop: '2px', transition: 'transform 0.4s ease' }}
              >
                <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
