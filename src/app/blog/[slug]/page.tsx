'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'

const mockPost = {
  title: 'Il futuro dell\'e-commerce nel 2025',
  date: '20 Febbraio 2025', category: 'E-commerce', readTime: '7 min',
  author: { name: 'Mario Rossi', role: 'Founder' },
  excerpt: 'AI, headless commerce e personalizzazione estrema: ecco le tendenze che stanno ridisegnando il commercio digitale.',
  content: [
    { type: 'p', text: 'Il 2025 si presenta come un anno di svolta per l\'e-commerce. Dopo anni di crescita accelerata dalla pandemia, il mercato sta maturando e le regole del gioco stanno cambiando profondamente.' },
    { type: 'h2', text: 'L\'intelligenza artificiale non è più un\'opzione' },
    { type: 'p', text: 'I brand che stanno crescendo più velocemente hanno una cosa in comune: usano l\'AI non come gadget, ma come infrastruttura. Dalla personalizzazione dei prodotti mostrati, alle email generate dinamicamente, fino alle previsioni di stock — l\'AI sta diventando il sistema nervoso dell\'e-commerce moderno.' },
    { type: 'h2', text: 'Headless commerce: quando ha senso davvero' },
    { type: 'p', text: 'L\'architettura headless ha senso quando hai specifiche esigenze di performance e flessibilità — non come default per ogni progetto.' },
  ],
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = mockPost
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <section style={{ paddingTop: 'clamp(120px,15vw,160px)', paddingBottom: 'clamp(60px,8vw,100px)', paddingLeft: 'clamp(24px,5vw,40px)', paddingRight: 'clamp(24px,5vw,40px)', borderBottom: '1px solid var(--border)', maxWidth: '860px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
            <Link href="/blog" className="link-muted" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>← Blog</Link>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{post.category}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px,7vw,96px)', letterSpacing: '-0.01em', lineHeight: 0.95, marginBottom: '32px' }}>{post.title.toUpperCase()}</h1>
          <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'rgba(240,237,230,0.55)', marginBottom: '40px', maxWidth: '600px' }}>{post.excerpt}</p>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600 }}>{post.author.name}</p>
              <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{post.author.role}</p>
            </div>
            <div style={{ height: '32px', width: '1px', background: 'var(--border)' }} />
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{post.date}</p>
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{post.readTime} di lettura</p>
          </div>
        </section>

        <div style={{ height: 'clamp(240px,40vw,520px)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '14px', color: 'var(--muted)', letterSpacing: '0.2em' }}>IMMAGINE COPERTINA</span>
        </div>

        <article style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,40px)' }}>
          {post.content.map((block, i) => {
            if (block.type === 'h2') return (
              <h2 key={i} style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '0.02em', margin: '56px 0 20px' }}>{block.text.toUpperCase()}</h2>
            )
            return <p key={i} style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(240,237,230,0.65)', marginBottom: '24px' }}>{block.text}</p>
          })}
        </article>

        <section style={{ padding: 'clamp(60px,10vw,100px) clamp(24px,5vw,40px)', borderTop: '1px solid var(--border)', textAlign: 'center', background: 'var(--surface)' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,5vw,72px)', marginBottom: '32px' }}>
            PARLIAMO DEL TUO <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: 'var(--accent)' }}>progetto</span>
          </h2>
          <a href="/contatti" className="btn-accent">Contattaci →</a>
        </section>
      </main>
      <Footer />
    </>
  )
}
