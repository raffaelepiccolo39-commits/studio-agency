import { MetadataRoute } from 'next'

/**
 * ⚠️ Landing ADV e questionario NON vanno messi in `disallow`.
 *
 * Sembra controintuitivo, ma bloccare la scansione di una pagina impedisce ai
 * motori di *leggere* il meta tag "noindex" che quelle pagine già dichiarano:
 * se qualcuno le linka da fuori, Google può indicizzarle lo stesso — senza
 * poter vedere l'istruzione che gliel'avrebbe vietato.
 *
 * Per tenerle fuori dai risultati serve il contrario: lasciarle scansionare e
 * affidarsi al noindex, che sta nei rispettivi `metadata`. Non sono nemmeno in
 * sitemap, quindi non le proponiamo attivamente.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/coming-soon', '/studio'] },
    sitemap: 'https://www.piraweb.it/sitemap.xml',
  }
}
