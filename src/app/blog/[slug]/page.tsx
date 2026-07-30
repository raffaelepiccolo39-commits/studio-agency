import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPosts, getPostBySlug } from '@/lib/sanity/queries'
import type { PostBlock } from '@/data/posts'

// I `li` consecutivi vanno resi come un unico <ul>, gli altri blocchi restano singoli.
type BlockGroup =
  | { kind: 'ul'; items: string[] }
  | { kind: 'block'; block: PostBlock }

function groupBlocks(blocks: PostBlock[]): BlockGroup[] {
  const out: BlockGroup[] = []
  for (const block of blocks) {
    if (block.type === 'li') {
      const last = out[out.length - 1]
      if (last?.kind === 'ul') last.items.push(block.text)
      else out.push({ kind: 'ul', items: [block.text] })
    } else {
      out.push({ kind: 'block', block })
    }
  }
  return out
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Pira Web`,
    description: post.excerpt,
    alternates: { canonical: `https://www.piraweb.it/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `https://www.piraweb.it/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  // Correlati: prima gli articoli della stessa categoria, poi i più recenti.
  const all = await getPosts()
  const others = all.filter(p => p.slug !== post.slug)
  const related = [
    ...others.filter(p => p.category === post.category),
    ...others.filter(p => p.category !== post.category),
  ].slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    ...(post.coverImage ? { image: [post.coverImage] } : {}),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: post.category,
    inLanguage: 'it-IT',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.piraweb.it/blog/${post.slug}` },
    author: { '@type': 'Organization', name: 'Pira Web', url: 'https://www.piraweb.it' },
    publisher: {
      '@type': 'Organization',
      name: 'Pira Web',
      url: 'https://www.piraweb.it',
      logo: { '@type': 'ImageObject', url: 'https://www.piraweb.it/logo.png' },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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

        {post.coverImage && (
          <div style={{ position: 'relative', height: 'clamp(240px,40vw,520px)', background: 'var(--surface)', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        <article style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,40px)' }}>
          {groupBlocks(post.content).map((group, i) => {
            if (group.kind === 'ul') return (
              <ul key={i} style={{ margin: '0 0 28px', paddingLeft: '22px', listStyle: 'none' }}>
                {group.items.map((text, j) => (
                  <li key={j} style={{ position: 'relative', fontSize: '16px', lineHeight: 1.8, color: 'rgba(240,237,230,0.65)', marginBottom: '14px' }}>
                    <span aria-hidden style={{ position: 'absolute', left: '-22px', color: 'var(--accent)' }}>—</span>
                    {text}
                  </li>
                ))}
              </ul>
            )
            const b = group.block
            if (b.type === 'h2') return (
              <h2 key={i} style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '0.02em', margin: '56px 0 20px' }}>{b.text.toUpperCase()}</h2>
            )
            if (b.type === 'h3') return (
              <h3 key={i} style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 'clamp(17px,2vw,21px)', lineHeight: 1.35, margin: '36px 0 14px', color: 'var(--text)' }}>{b.text}</h3>
            )
            return <p key={i} style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(240,237,230,0.65)', marginBottom: '24px' }}>{b.text}</p>
          })}
        </article>

        {related.length > 0 && (
          <section style={{ padding: 'clamp(48px,7vw,90px) clamp(24px,5vw,40px)', borderTop: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(24px,3vw,40px)', letterSpacing: '0.02em', marginBottom: '32px' }}>
              CONTINUA A <span style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: 'var(--accent)' }}>leggere</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '2px' }}>
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="card-hover" style={{ textDecoration: 'none', background: 'var(--surface)', display: 'block', padding: '28px' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>{r.category}</span>
                  <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(20px,2.2vw,28px)', letterSpacing: '0.02em', lineHeight: 1.1, color: 'var(--text)', margin: '12px 0 12px' }}>{r.title.toUpperCase()}</h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(240,237,230,0.5)' }}>{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

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
