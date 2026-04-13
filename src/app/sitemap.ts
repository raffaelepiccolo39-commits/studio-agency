import { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

const BASE_URL = 'https://www.piraweb.it'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/chi-siamo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/cosa-facciamo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/progetti`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/contatti`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/lavora-con-noi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const projectPages: MetadataRoute.Sitemap = projects
    .filter(p => p.immagini.length > 0)
    .map(p => ({
      url: `${BASE_URL}/progetti/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  return [...staticPages, ...projectPages]
}
