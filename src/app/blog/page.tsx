import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/ui/PageHeader'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts } from '@/lib/sanity/queries'

const categoryColors: Record<string, string> = {
  'E-commerce': '#c8f55a', 'Tech': '#5a8cf5', 'Design': '#ff4d1c', 'Marketing': '#f5c85a',
}

export const metadata = {
  title: 'Blog — Pira Web Creative Agency',
  description: 'Guide pratiche su e-commerce, siti web, branding e social per le PMI, dal team di Pira Web.',
  alternates: { canonical: 'https://www.piraweb.it/blog' },
}

export default async function BlogPage() {
  const posts = await getPosts()
  const featured = posts.find(p => p.featured) ?? posts[0]
  const rest = posts.filter(p => p.slug !== featured?.slug)
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <PageHeader
          tag="Insights & Approfondimenti"
          title="IL NOSTRO"
          titleAccent="blog"
          subtitle="Guide pratiche su e-commerce, siti web, branding e social, scritte dal team di Pira Web."
        />

        {/* Featured */}
        <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
          <Link href={`/blog/${featured.slug}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '2px', textDecoration: 'none', background: 'var(--surface)' }}>
            <div style={{ minHeight: '360px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              {featured.coverImage ? (
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '80px', color: 'transparent', WebkitTextStroke: '1px rgba(200,245,90,0.15)' }}>FEATURED</div>
              )}
              <span style={{ position: 'absolute', top: '24px', left: '24px', padding: '5px 12px', background: 'var(--accent)', color: '#0a0a0a', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>In evidenza</span>
            </div>
            <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: categoryColors[featured.category] || 'var(--accent)', padding: '4px 10px', border: `1px solid ${categoryColors[featured.category] || 'var(--accent)'}40` }}>{featured.category}</span>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{featured.readTime} di lettura</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(32px,4vw,56px)', letterSpacing: '0.02em', lineHeight: 1, color: 'var(--text)', marginBottom: '20px' }}>{featured.title.toUpperCase()}</h2>
                <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(240,237,230,0.55)' }}>{featured.excerpt}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{featured.date}</span>
                <span style={{ fontSize: '20px', color: 'var(--accent)' }}>↗</span>
              </div>
            </div>
          </Link>
        </section>

        {/* Altri articoli */}
        <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,40px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '2px' }}>
            {rest.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card-hover" style={{ textDecoration: 'none', background: 'var(--surface)', display: 'block' }}>
                <div style={{ height: '200px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 700px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.2em' }}>{post.category.toUpperCase()}</span>
                  )}
                </div>
                <div style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: categoryColors[post.category] || 'var(--accent)' }}>{post.category}</span>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(22px,2.5vw,32px)', letterSpacing: '0.02em', lineHeight: 1.1, color: 'var(--text)', marginBottom: '14px' }}>{post.title.toUpperCase()}</h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(240,237,230,0.5)', marginBottom: '24px' }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{post.date}</span>
                    <span style={{ fontSize: '16px', color: 'var(--accent)' }}>↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA finale */}
        <section style={{ padding: 'clamp(60px,10vw,100px) clamp(24px,5vw,40px)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,5vw,64px)', marginBottom: '16px' }}>UN DUBBIO SUL TUO <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: 'var(--accent)' }}>progetto?</span></h2>
          <p style={{ fontSize: '14px', color: 'rgba(240,237,230,0.5)', maxWidth: '460px', margin: '0 auto 40px', lineHeight: 1.7 }}>Raccontaci la tua situazione: ti diciamo cosa ha senso fare nel tuo caso, senza impegno.</p>
          <a href="/contatti" className="btn-accent">Parliamone →</a>
        </section>
      </main>
      <Footer />
    </>
  )
}
