import { client } from './client'
import { projects as mockProjects, type Project } from '@/data/projects'
import { posts as mockPosts, type Post, type PostBlock } from '@/data/posts'
import type { SanityProjectRaw, SanityPostRaw } from '@/types'

const PROJECT_REVALIDATE = 3600
const POST_REVALIDATE = 1800

// Sanity è "attivo" solo se è stato configurato un projectId reale.
// Finché è placeholder/assente, tutto cade sui dati locali e il sito resta vivo.
function isSanityConfigured(): boolean {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  return Boolean(id && id !== 'your-project-id' && id !== 'your_project_id')
}

// ─── MAPPERS (raw Sanity → forma app) ────────────────────────────────────────

function mapProject(r: SanityProjectRaw): Project {
  return {
    slug: r.slug?.current ?? r._id,
    title: r.title,
    platform: r.platform ?? '',
    services: r.services ?? [],
    color: r.color ?? '#0a0a0a',
    accent: r.accent ?? '#c8f55a',
    year: r.year ?? new Date().getUTCFullYear(),
    cliente: r.cliente ?? r.title,
    descrizione: r.descrizione ?? '',
    sfida: r.sfida ?? '',
    soluzione: r.soluzione ?? '',
    risultati: r.risultati ?? [],
    immagini: (r.gallery ?? []).filter((u): u is string => Boolean(u)),
    seo: r.seo
      ? {
          metaTitle: r.seo.metaTitle ?? '',
          metaDescription: r.seo.metaDescription ?? '',
          settore: r.seo.settore ?? '',
          approccio: r.seo.approccio ?? '',
          processo: r.seo.processo ?? [],
          testimonial: r.seo.testimonial
            ? {
                testo: r.seo.testimonial.testo ?? '',
                autore: r.seo.testimonial.autore ?? '',
                ruolo: r.seo.testimonial.ruolo ?? '',
              }
            : undefined,
        }
      : undefined,
  }
}

// Portable Text → blocchi semplici usati dal renderer del blog (no nuove dipendenze).
function portableTextToBlocks(body: any[] | undefined): PostBlock[] {
  if (!Array.isArray(body)) return []
  return body
    .filter((b) => b && b._type === 'block')
    .map((b): PostBlock => {
      const text = (b.children ?? [])
        .filter((c: any) => c?._type === 'span')
        .map((c: any) => c.text ?? '')
        .join('')
      return b.style === 'h2' ? { type: 'h2', text } : { type: 'p', text }
    })
    .filter((b) => b.text.trim().length > 0)
}

function mapPost(r: SanityPostRaw, body: PostBlock[] = []): Post {
  const iso = r.publishedAt ?? ''
  return {
    slug: r.slug?.current ?? r._id,
    title: r.title,
    excerpt: r.excerpt ?? '',
    category: r.category ?? '',
    readTime: r.readTime ?? '',
    featured: Boolean(r.featured),
    publishedAt: iso,
    date: iso ? formatDate(iso) : '',
    author: { name: r.author?.name ?? '', role: r.author?.role ?? '' },
    content: body,
  }
}

const MESI = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic']
function formatDate(iso: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  return `${d.getUTCDate()} ${MESI[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured()) return mockProjects
  try {
    const raw = await client.fetch<SanityProjectRaw[]>(
      `*[_type == "project"] | order(year desc, _createdAt desc) {
        _id, title, slug, platform, services, color, accent, year, cliente,
        descrizione, sfida, soluzione, risultati,
        "gallery": gallery[].asset->url, seo
      }`,
      {},
      { next: { revalidate: PROJECT_REVALIDATE, tags: ['projects'] } }
    )
    if (!raw?.length) return mockProjects
    return raw.map(mapProject)
  } catch {
    return mockProjects
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSanityConfigured()) return mockProjects.find((p) => p.slug === slug) ?? null
  try {
    const raw = await client.fetch<SanityProjectRaw | null>(
      `*[_type == "project" && slug.current == $slug][0] {
        _id, title, slug, platform, services, color, accent, year, cliente,
        descrizione, sfida, soluzione, risultati,
        "gallery": gallery[].asset->url, seo
      }`,
      { slug },
      { next: { revalidate: PROJECT_REVALIDATE, tags: ['projects', `project:${slug}`] } }
    )
    if (!raw) return mockProjects.find((p) => p.slug === slug) ?? null
    return mapProject(raw)
  } catch {
    return mockProjects.find((p) => p.slug === slug) ?? null
  }
}

// ─── BLOG POSTS ──────────────────────────────────────────────────────────────

export async function getPosts(): Promise<Post[]> {
  if (!isSanityConfigured()) return mockPosts
  try {
    const raw = await client.fetch<SanityPostRaw[]>(
      `*[_type == "post"] | order(publishedAt desc) {
        _id, title, slug, excerpt, category, readTime, featured, publishedAt,
        "coverImage": coverImage.asset->url, author
      }`,
      {},
      { next: { revalidate: POST_REVALIDATE, tags: ['posts'] } }
    )
    if (!raw?.length) return mockPosts
    return raw.map((r) => mapPost(r))
  } catch {
    return mockPosts
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSanityConfigured()) return mockPosts.find((p) => p.slug === slug) ?? null
  try {
    const raw = await client.fetch<SanityPostRaw | null>(
      `*[_type == "post" && slug.current == $slug][0] {
        _id, title, slug, excerpt, category, readTime, featured, publishedAt,
        "coverImage": coverImage.asset->url, author, body
      }`,
      { slug },
      { next: { revalidate: POST_REVALIDATE, tags: ['posts', `post:${slug}`] } }
    )
    if (!raw) return mockPosts.find((p) => p.slug === slug) ?? null
    return mapPost(raw, portableTextToBlocks(raw.body))
  } catch {
    return mockPosts.find((p) => p.slug === slug) ?? null
  }
}
