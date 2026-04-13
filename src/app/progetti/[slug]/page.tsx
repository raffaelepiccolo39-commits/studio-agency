import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import BluemoonGallery from '@/components/sections/BluemoonGallery'
import ContexGallery from '@/components/sections/ContexGallery'
import AlmaGallery from '@/components/sections/AlmaGallery'
import QuadrifoglioGallery from '@/components/sections/QuadrifoglioGallery'
import SvinatiGallery from '@/components/sections/SvinatiGallery'
import MaestriCotonieriGallery from '@/components/sections/MaestriCotonieriGallery'
import AlbaRicambiGallery from '@/components/sections/AlbaRicambiGallery'

const BASE_URL = 'https://www.piraweb.it'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find(p => p.slug === params.slug)
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

export default function ProgettoPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) notFound()

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
    image: project.immagini[0] ? `${BASE_URL}${project.immagini[0]}` : undefined,
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

        {/* Hero */}
        <section style={{
          minHeight: '70vh', background: project.color,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 'clamp(120px,15vw,180px) clamp(24px,5vw,40px) clamp(40px,6vw,80px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 20% 50%, ${project.accent}20 0%, transparent 60%)`,
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', right: '-5%',
            fontFamily: 'var(--font-bebas)', fontSize: 'clamp(100px,18vw,260px)',
            color: 'transparent', WebkitTextStroke: `1px ${project.accent}15`,
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}>
            {project.title}
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', padding: '4px 12px', border: `1px solid ${project.accent}`, color: project.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {project.platform}
              </span>
              {project.seo?.settore && (
                <span style={{ fontSize: '11px', padding: '4px 12px', background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {project.seo.settore}
                </span>
              )}
            </div>
            <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(48px,8vw,120px)', letterSpacing: '0.02em', lineHeight: 1, marginBottom: '24px' }}>
              {project.title.toUpperCase()}
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(240,237,230,0.6)', maxWidth: '560px', lineHeight: 1.7 }}>
              {project.descrizione}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
              {project.services.map(s => (
                <span key={s} style={{ fontSize: '11px', padding: '4px 12px', background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', letterSpacing: '0.08em' }}>
                  {s}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '32px', marginTop: '32px', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.08em' }}>
              <span>Cliente: <strong style={{ color: 'var(--text)' }}>{project.cliente}</strong></span>
              <span>Anno: <strong style={{ color: 'var(--text)' }}>{project.year}</strong></span>
            </div>
          </div>
        </section>

        {/* KPI */}
        <section style={{ borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: `repeat(${project.risultati.length}, 1fr)` }}>
          {project.risultati.map((r, i) => (
            <div key={i} style={{ padding: 'clamp(32px,5vw,56px) clamp(24px,4vw,40px)', borderRight: i < project.risultati.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,5vw,64px)', color: project.accent, letterSpacing: '0.02em', lineHeight: 1, marginBottom: '8px' }}>
                {r.value}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {r.label}
              </p>
            </div>
          ))}
        </section>

        {/* Sfida + Soluzione */}
        <section className="case-study-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>
          <div style={{ padding: 'clamp(40px,7vw,80px) clamp(24px,5vw,40px)', borderRight: '1px solid var(--border)' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
              La sfida
            </p>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,36px)', letterSpacing: '0.02em', lineHeight: 1.2, marginBottom: '16px', color: 'var(--text)' }}>
              Il problema da risolvere
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(240,237,230,0.7)' }}>{project.sfida}</p>
          </div>
          <div style={{ padding: 'clamp(40px,7vw,80px) clamp(24px,5vw,40px)' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
              La soluzione
            </p>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,36px)', letterSpacing: '0.02em', lineHeight: 1.2, marginBottom: '16px', color: 'var(--text)' }}>
              Il nostro intervento
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(240,237,230,0.7)' }}>{project.soluzione}</p>
          </div>
        </section>

        {/* Approccio — solo se presente nei dati SEO */}
        {project.seo?.approccio && (
          <section style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,40px)' }}>
            <div style={{ maxWidth: '800px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
                L&apos;approccio
              </p>
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '0.02em', lineHeight: 1.1, marginBottom: '24px' }}>
                Come abbiamo lavorato
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(240,237,230,0.7)' }}>
                {project.seo.approccio}
              </p>
            </div>
          </section>
        )}

        {/* Galleria immagini */}
        {project.slug === 'pasticceria-bluemoon' ? (
          <BluemoonGallery />
        ) : project.slug === 'contex-biancheria' ? (
          <ContexGallery />
        ) : project.slug === 'alma-studio' ? (
          <AlmaGallery />
        ) : project.slug === 'quadrifoglio-group' ? (
          <QuadrifoglioGallery />
        ) : project.slug === 'svinati' ? (
          <SvinatiGallery />
        ) : project.slug === 'maestri-cotonieri' ? (
          <MaestriCotonieriGallery />
        ) : project.slug === 'alba-ricambi' ? (
          <AlbaRicambiGallery />
        ) : project.immagini.length > 0 ? (
          <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: '2px' }}>
              {project.immagini.map((img, i) => (
                <div key={i} style={{ aspectRatio: '4/3', background: '#111', overflow: 'hidden' }}>
                  <img src={img} alt={`${project.title} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{
                  aspectRatio: '4/3', background: '#111',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px dashed #222',
                }}>
                  <p style={{ fontSize: '11px', color: '#333', letterSpacing: '0.1em' }}>IMMAGINE {i}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Processo — solo se presente nei dati SEO */}
        {project.seo?.processo && (
          <section style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,40px)' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--muted)' }} />
              Il processo
            </p>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '0.02em', lineHeight: 1.1, marginBottom: '48px' }}>
              Step by step
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: 'var(--border)' }}>
              {project.seo.processo.map((step, i) => (
                <div key={i} style={{ padding: 'clamp(24px,4vw,40px)', background: 'var(--bg)' }}>
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,4vw,56px)', color: project.accent, opacity: 0.3, lineHeight: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(240,237,230,0.7)', marginTop: '12px' }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Servizi del progetto — riepilogo */}
        <section style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(40px,6vw,60px) clamp(24px,5vw,40px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>Servizi erogati</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {project.services.map(s => (
                  <span key={s} style={{ fontSize: '13px', padding: '6px 16px', border: `1px solid ${project.accent}40`, color: project.accent, letterSpacing: '0.06em' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>Anno</p>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '32px', color: project.accent }}>{project.year}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(60px,10vw,100px) clamp(24px,5vw,40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          <Link href="/progetti" style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ← Tutti i progetti
          </Link>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '15px', color: 'rgba(240,237,230,0.5)', marginBottom: '24px' }}>Hai un progetto simile?</p>
            <Link href="/contatti" style={{
              background: 'var(--accent)', color: '#0a0a0a',
              padding: '16px 40px', fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none',
              display: 'inline-block',
            }}>
              Parliamone →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
