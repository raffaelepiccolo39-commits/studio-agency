'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHeader from '@/components/ui/PageHeader'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'

const posts = [
  { slug: 'futuro-ecommerce-2025', title: 'Il futuro dell\'e-commerce nel 2025', excerpt: 'AI, headless commerce e personalizzazione estrema: le tendenze che stanno ridisegnando il commercio digitale.', date: '20 Feb 2025', category: 'E-commerce', readTime: '7 min', featured: true },
  { slug: 'shopify-vs-custom', title: 'Shopify Plus o sviluppo custom?', excerpt: 'Una guida pratica per capire quando ha senso usare Shopify Plus e quando conviene costruire qualcosa di custom.', date: '14 Feb 2025', category: 'Tech', readTime: '5 min', featured: false },
  { slug: 'design-che-converte', title: 'Design che converte: i principi UX', excerpt: 'Non basta essere belli. Ecco come costruiamo interfacce che guidano l\'utente verso l\'acquisto in modo naturale.', date: '5 Feb 2025', category: 'Design', readTime: '6 min', featured: false },
  { slug: 'meta-ads-2025', title: 'Meta Ads nel 2025: strategie che funzionano', excerpt: 'Con iOS e le restrizioni sulla privacy, molti pensano che Meta sia morta. Sbagliato. Ecco come adattarsi.', date: '28 Gen 2025', category: 'Marketing', readTime: '8 min', featured: false },
]

const categoryColors: Record<string, string> = {
  'E-commerce': '#c8f55a', 'Tech': '#5a8cf5', 'Design': '#ff4d1c', 'Marketing': '#f5c85a',
}

export default function BlogPage() {
  const [featured, ...rest] = posts
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <PageHeader
          tag="Insights & Approfondimenti"
          title="IL NOSTRO"
          titleAccent="blog"
          subtitle="Riflessioni su design, tecnologia e marketing digitale dal team Studio."
        />

        {/* Featured */}
        <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)' }}>
          <Link href={`/blog/${featured.slug}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '2px', textDecoration: 'none', background: 'var(--surface)' }}>
            <div style={{ minHeight: '360px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '80px', color: 'transparent', WebkitTextStroke: '1px rgba(200,245,90,0.15)' }}>FEATURED</div>
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
                <div style={{ height: '200px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.2em' }}>IMMAGINE ARTICOLO</span>
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

        {/* Newsletter */}
        <section style={{ padding: 'clamp(60px,10vw,100px) clamp(24px,5vw,40px)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,5vw,64px)', marginBottom: '16px' }}>RICEVI I NOSTRI <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: 'var(--accent)' }}>insights</span></h2>
          <p style={{ fontSize: '14px', color: 'rgba(240,237,230,0.5)', marginBottom: '40px', maxWidth: '400px', margin: '0 auto 40px' }}>Nessuno spam. Solo contenuti utili su e-commerce, design e marketing digitale.</p>
          <div style={{ display: 'flex', gap: '0', maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" placeholder="la-tua@email.com" style={{ flex: 1, minWidth: '240px', padding: '16px 20px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-syne)', fontSize: '14px', outline: 'none' }} />
            <button style={{ padding: '16px 28px', background: 'var(--accent)', color: '#0a0a0a', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'none' }}>Iscriviti</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
