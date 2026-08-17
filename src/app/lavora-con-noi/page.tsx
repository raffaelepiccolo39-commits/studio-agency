import { metadataDaCms } from '@/lib/seo'
import LavoraConNoiClient from './LavoraConNoiClient'

// Titolo e descrizione si cambiano da piraweb.it/studio → Pagine.
export const generateMetadata = () => metadataDaCms('/lavora-con-noi')

export default function Page() {
  return <LavoraConNoiClient />
}
