import { client } from './client'
import { projects as mockProjects, type Project } from '@/data/projects'
import { posts as mockPosts, type Post, type PostBlock } from '@/data/posts'
import { siteSettings as defaultSiteSettings, type SiteSettings } from '@/data/site'
import type { SanityProjectRaw, SanityPostRaw } from '@/types'

const PROJECT_REVALIDATE = 3600
const POST_REVALIDATE = 1800
// I contatti si cambiano di rado ma quando si cambiano si vogliono vedere
// subito: mezz'ora è il compromesso, e comunque ogni pagina li rilegge.
const SETTINGS_REVALIDATE = 1800

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
      if (b.listItem) return { type: 'li', text }
      if (b.style === 'h2') return { type: 'h2', text }
      if (b.style === 'h3') return { type: 'h3', text }
      return { type: 'p', text }
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
    coverImage: r.coverImage ?? undefined,
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

// ─── IMPOSTAZIONI SITO ───────────────────────────────────────────────────────

/**
 * Contatti, sede e social dell'agenzia.
 *
 * Fonde quello che c'è su Sanity con i valori di src/data/site.ts, campo per
 * campo: un campo lasciato vuoto nello Studio non cancella il dato dal sito,
 * ricade sul valore di riserva. Così una modifica sbagliata non può svuotare
 * il footer di tutte le pagine.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured()) return defaultSiteSettings
  try {
    const raw = await client.fetch<Partial<SiteSettings> | null>(
      `*[_type == "siteSettings"][0] {
        ragioneSociale, nomeCommerciale, email, telefoni, whatsapp,
        indirizzo, partitaIva, social, trustpilot
      }`,
      {},
      { next: { revalidate: SETTINGS_REVALIDATE, tags: ['siteSettings'] } }
    )
    if (!raw) return defaultSiteSettings
    return mergeSiteSettings(raw)
  } catch {
    return defaultSiteSettings
  }
}

function testo(valore: unknown, riserva: string): string {
  return typeof valore === 'string' && valore.trim() ? valore.trim() : riserva
}

function mergeSiteSettings(raw: Partial<SiteSettings>): SiteSettings {
  const d = defaultSiteSettings
  const telefoni = (raw.telefoni ?? []).filter(t => t?.etichetta?.trim() && t?.numero?.trim())
  return {
    ragioneSociale: testo(raw.ragioneSociale, d.ragioneSociale),
    nomeCommerciale: testo(raw.nomeCommerciale, d.nomeCommerciale),
    email: testo(raw.email, d.email),
    telefoni: telefoni.length ? telefoni : d.telefoni,
    whatsapp: testo(raw.whatsapp, d.whatsapp),
    indirizzo: {
      via: testo(raw.indirizzo?.via, d.indirizzo.via),
      cap: testo(raw.indirizzo?.cap, d.indirizzo.cap),
      citta: testo(raw.indirizzo?.citta, d.indirizzo.citta),
      provincia: testo(raw.indirizzo?.provincia, d.indirizzo.provincia),
      nazione: testo(raw.indirizzo?.nazione, d.indirizzo.nazione),
    },
    partitaIva: testo(raw.partitaIva, d.partitaIva),
    // I social sono l'eccezione voluta: svuotare un campo nello Studio DEVE
    // togliere l'icona dal footer, altrimenti non si potrebbe mai dismettere
    // un profilo. Se manca l'oggetto intero, però, si ricade sui valori noti.
    social: raw.social
      ? {
          instagram: raw.social.instagram?.trim() ?? '',
          facebook: raw.social.facebook?.trim() ?? '',
          linkedin: raw.social.linkedin?.trim() ?? '',
          tiktok: raw.social.tiktok?.trim() ?? '',
        }
      : d.social,
    trustpilot: testo(raw.trustpilot, d.trustpilot),
  }
}
