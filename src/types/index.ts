// Forme "raw" restituite dalle GROQ query. Vengono mappate sulle forme app
// (`Project` in @/data/projects, `Post` in @/data/posts) dentro queries.ts.

export interface SanityProjectRaw {
  _id: string
  title: string
  slug?: { current: string }
  platform?: string
  services?: string[]
  color?: string
  accent?: string
  year?: number
  cliente?: string
  descrizione?: string
  sfida?: string
  soluzione?: string
  risultati?: { label: string; value: string }[]
  gallery?: (string | null)[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    settore?: string
    approccio?: string
    processo?: string[]
    testimonial?: { testo?: string; autore?: string; ruolo?: string }
  }
}

export interface SanityPostRaw {
  _id: string
  title: string
  slug?: { current: string }
  excerpt?: string
  category?: string
  readTime?: string
  featured?: boolean
  publishedAt?: string
  coverImage?: string | null
  author?: { name?: string; role?: string }
  body?: any[]
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}
