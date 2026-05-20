import { client } from './client'
import { SanityProject, SanityPost } from '@/types'

const PROJECT_REVALIDATE = 3600
const POST_REVALIDATE = 1800

// ─── PROJECTS ───────────────────────────────────────────────────────────────

export async function getProjects(): Promise<SanityProject[]> {
  return client.fetch(
    `
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      platform,
      services,
      coverColor,
      accentColor,
      "coverImage": coverImage.asset->url,
      year,
      kpis,
    }
  `,
    {},
    { next: { revalidate: PROJECT_REVALIDATE, tags: ['projects'] } }
  )
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  return client.fetch(
    `
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      platform,
      services,
      coverColor,
      accentColor,
      "coverImage": coverImage.asset->url,
      year,
      kpis,
      description,
      gallery[] { "url": asset->url, alt },
    }
  `,
    { slug },
    { next: { revalidate: PROJECT_REVALIDATE, tags: ['projects', `project:${slug}`] } }
  )
}

// ─── BLOG POSTS ──────────────────────────────────────────────────────────────

export async function getPosts(): Promise<SanityPost[]> {
  return client.fetch(
    `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      "coverImage": coverImage.asset->url,
      "author": author->{ name, "avatar": avatar.asset->url },
      categories[]->{ title },
    }
  `,
    {},
    { next: { revalidate: POST_REVALIDATE, tags: ['posts'] } }
  )
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      body,
      "coverImage": coverImage.asset->url,
      "author": author->{ name, "avatar": avatar.asset->url },
      categories[]->{ title },
    }
  `,
    { slug },
    { next: { revalidate: POST_REVALIDATE, tags: ['posts', `post:${slug}`] } }
  )
}
