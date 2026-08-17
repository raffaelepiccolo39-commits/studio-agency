import { metadataDaCms } from '@/lib/seo'
import CosaFacciamoClient from './CosaFacciamoClient'

// Titolo e descrizione si cambiano da piraweb.it/studio → Pagine.
export const generateMetadata = () => metadataDaCms('/cosa-facciamo')

export default function Page() {
  return <CosaFacciamoClient />
}
