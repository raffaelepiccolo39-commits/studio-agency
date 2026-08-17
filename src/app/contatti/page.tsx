import { metadataDaCms } from '@/lib/seo'
import ContattiClient from './ContattiClient'

// Titolo e descrizione si cambiano da piraweb.it/studio → Pagine.
export const generateMetadata = () => metadataDaCms('/contatti')

export default function Page() {
  return <ContattiClient />
}
