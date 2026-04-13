import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.piraweb.it', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://www.piraweb.it/chi-siamo', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.piraweb.it/cosa-facciamo', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.piraweb.it/progetti', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://www.piraweb.it/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://www.piraweb.it/contatti', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: 'https://www.piraweb.it/lavora-con-noi', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
