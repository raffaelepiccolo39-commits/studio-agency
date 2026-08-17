import type { Metadata } from 'next'
import { getPagina } from '@/lib/sanity/queries'
import { paginaDiRiserva } from '@/data/pagine'

const SITE = 'https://www.piraweb.it'
const OG_IMAGE = `${SITE}/og-image.jpg`

/**
 * Come pageMetadata, ma titolo e descrizione arrivano dallo Studio.
 *
 * Da usare nelle pagine così:
 *   export const generateMetadata = () => metadataDaCms('/chi-siamo')
 *
 * Se Sanity non risponde restano i valori storici di src/data/pagine.ts: una
 * pagina senza titolo su Google è peggio di una con un titolo vecchio.
 */
export async function metadataDaCms(percorso: string): Promise<Metadata> {
  const pagina = (await getPagina(percorso)) ?? paginaDiRiserva(percorso)
  if (!pagina) return {}
  return pageMetadata({
    title: pagina.titoloSeo,
    description: pagina.descrizioneSeo,
    path: percorso,
  })
}

/**
 * Costruisce i metadata SEO per-pagina coerenti col layout root.
 * `title` viene composto dal template del layout (`%s — Pira Web Creative Agency`);
 * openGraph/twitter sono espliciti perché Next non fa deep-merge di questi oggetti.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const url = `${SITE}${path}`
  const fullTitle = `${title} — Pira Web Creative Agency`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
      url,
      siteName: 'Pira Web Creative Agency',
      locale: 'it_IT',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Pira Web Creative Agency' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  }
}
