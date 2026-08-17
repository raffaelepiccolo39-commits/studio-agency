import { metadataDaCms } from '@/lib/seo'
import { getPagina } from '@/lib/sanity/queries'
import ChiSiamoClient from './ChiSiamoClient'

// Titolo, descrizione e intestazione si cambiano da piraweb.it/studio → Pagine.
export const generateMetadata = () => metadataDaCms('/chi-siamo')

export default async function Page() {
  const pagina = await getPagina('/chi-siamo')
  return <ChiSiamoClient intestazione={pagina?.intestazione} />
}
