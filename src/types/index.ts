export interface SanityProject {
  _id: string
  title: string
  slug: { current: string }
  platform?: string
  services?: string[]
  coverImage?: string
  coverColor?: string
  accentColor?: string
  year?: number
  kpis?: { label: string; value: string }[]
  description?: any[]
  gallery?: { url: string; alt?: string }[]
}

export interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  coverImage?: string
  author?: {
    name: string
    avatar?: string
  }
  categories?: { title: string }[]
  body?: any[]
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}
