import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/coming-soon', '/studio', '/consulenza-gratuita'] },
    sitemap: 'https://www.piraweb.it/sitemap.xml',
  }
}
