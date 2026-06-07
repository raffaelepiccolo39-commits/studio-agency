import { notFound } from 'next/navigation'
import { getProjects, getProjectBySlug } from '@/lib/sanity/queries'
import type { Project } from '@/data/projects'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import Image from 'next/image'
import { getDims } from '@/lib/imageDims'

const BASE_URL = 'https://www.piraweb.it'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return {}

  const title = project.seo?.metaTitle ?? `${project.title} — ${project.platform}`
  const description = project.seo?.metaDescription ?? project.descrizione
  const url = `${BASE_URL}/progetti/${project.slug}`
  const ogImage = project.immagini[0]
    ? `${BASE_URL}${project.immagini[0]}`
    : `${BASE_URL}/og-image.jpg`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${project.title} — Caso Studio Pira Web` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  }
}

const tagsFor = (p: Project) => {
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

export default async function ProgettoPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()

  const heroImage = project.immagini[0]

  // Other projects to suggest at the bottom (exclude current, only those with images)
  const otherProjectsOrder = [
    'pasticceria-bluemoon',
    'contex-biancheria',
    'svinati',
    'maestri-cotonieri',
    'alma-studio',
    'quadrifoglio-group',
    'alba-ricambi',
  ]
  const allProjects = await getProjects()
  const otherProjects = otherProjectsOrder
    .map(slug => allProjects.find(p => p.slug === slug))
    .filter((p): p is Project => Boolean(p && p.immagini.length > 0 && p.slug !== project.slug))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `Caso Studio: ${project.title}`,
    description: project.seo?.metaDescription ?? project.descrizione,
    url: `${BASE_URL}/progetti/${project.slug}`,
    datePublished: `${project.year}-01-01`,
    creator: {
      '@type': 'Organization',
      name: 'Pira Web Creative Agency',
      url: BASE_URL,
    },
    about: {
      '@type': 'Organization',
      name: project.cliente,
    },
    genre: project.seo?.settore ?? project.platform,
    keywords: project.services.join(', '),
    image: heroImage ? `${BASE_URL}${heroImage}` : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Cursor />
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <div style={{
          background: '#0a0a0a',
          padding: '40px 30px 20px',
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <Link href="/progetti" style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '16px',
            color: '#b2b2b2',
            textDecoration: 'none',
          }}>
            I NOSTRI PROGETTI
          </Link>
          <span style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '16px',
            color: '#b2b2b2',
          }}>{'>'}</span>
          <span style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 500,
            fontSize: '16px',
            color: '#b2b2b2',
            textDecoration: 'underline',
          }}>
            {project.title.toUpperCase()}
          </span>
        </div>

        {/* Hero */}
        <section
          style={{
            position: 'relative',
            background: '#0a0a0a',
            border: '0.5px solid #525252',
            minHeight: '342px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '30px 40px 36px',
            overflow: 'hidden',
          }}
        >
          {heroImage && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.7) 100%), url("${heroImage}") center/cover no-repeat`,
              zIndex: 0,
            }} />
          )}

          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '30px',
            minHeight: '207px',
          }}>
            <p style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 500,
              fontSize: '16px',
              color: '#ffffff',
              margin: 0,
            }}>
              {tagsFor(project) || project.platform.toUpperCase()}
            </p>
            <h1 style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(56px, 11vw, 140px)',
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              color: '#ffffff',
              margin: 0,
            }}>
              {project.title.toUpperCase()}
            </h1>
          </div>
        </section>

        {/* White content intro + problem + solution */}
        <section style={{
          background: '#ffffff',
          padding: '30px 0',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div
            className="case-content-row"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '30px 40px',
              gap: '40px',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 400,
              fontSize: '16px',
              color: '#0a0a0a',
              lineHeight: 1.5,
              margin: 0,
              flex: '1 1 auto',
              maxWidth: '720px',
            }}>
              {project.descrizione}
            </p>
          </div>

          <div
            className="case-content-row"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '30px 40px',
              gap: '40px',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 400,
              fontSize: '16px',
              color: '#b2b2b2',
              flexShrink: 0,
              minWidth: '120px',
            }}>
              (PROBLEMA)
            </span>
            <p style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 400,
              fontSize: '16px',
              color: '#6a6a6a',
              lineHeight: 1.5,
              margin: 0,
              maxWidth: '644px',
              whiteSpace: 'pre-line',
            }}>
              {project.sfida}
            </p>
          </div>

          <div
            className="case-content-row"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '30px 40px',
              gap: '40px',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 400,
              fontSize: '16px',
              color: '#b2b2b2',
              flexShrink: 0,
              minWidth: '120px',
            }}>
              (SOLUZIONE)
            </span>
            <p style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 400,
              fontSize: '16px',
              color: '#6a6a6a',
              lineHeight: 1.5,
              margin: 0,
              maxWidth: '644px',
              whiteSpace: 'pre-line',
            }}>
              {project.soluzione}
            </p>
          </div>
        </section>

        {/* Gallery: immagini a proporzioni naturali (niente crop). Prima full-width, resto masonry 2col/1col */}
        {project.immagini.length > 0 && (
          <section className="case-gallery-wrap" style={{ background: '#0a0a0a' }}>
            <div className="case-gallery">
              {project.immagini.map((img, i) => {
                const { width, height } = getDims(img)
                return (
                  <Image
                    key={img}
                    className="case-gallery-item"
                    src={img}
                    alt={`${project.title} ${i + 1}`}
                    width={width}
                    height={height}
                    sizes="(max-width: 860px) 100vw, 50vw"
                    priority={i === 0}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                )
              })}
            </div>
          </section>
        )}

        {/* Other projects suggestion */}
        {otherProjects.length > 0 && (
          <section style={{
            borderTop: '0.5px solid #525252',
            borderBottom: '0.5px solid #525252',
            padding: '40px 30px',
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
          }}>
            <p style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 500,
              fontSize: '16px',
              color: '#b2b2b2',
              margin: 0,
            }}>
              ALTRI PROGETTI
            </p>

            <div className="case-other-projects">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/progetti/${p.slug}`}
                  className="project-card case-other-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '500 / 728',
                    overflow: 'hidden',
                  }}>
                    <Image
                      src={p.immagini[0]}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="project-img"
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'flex-start',
                  }}>
                    <div style={{ flex: '1 1 auto' }}>
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
                      <p style={{
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 500,
                        fontSize: '16px',
                        color: '#ffffff',
                        textDecoration: 'underline',
                        lineHeight: 1.3,
                        marginTop: '2px',
                        textTransform: 'uppercase',
                      }}>
                        {p.title}
                      </p>
                    </div>
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden
                      style={{ flexShrink: 0, marginTop: '2px', color: '#ffffff' }}
                    >
                      <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
