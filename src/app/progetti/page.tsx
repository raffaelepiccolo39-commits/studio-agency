import { metadataDaCms } from '@/lib/seo'
import { getProjects } from '@/lib/sanity/queries'
import ProgettiClient from './ProgettiClient'

// Titolo e descrizione si cambiano da piraweb.it/studio → Pagine.
export const generateMetadata = () => metadataDaCms('/progetti')

export default async function Page() {
  const projects = await getProjects()
  return <ProgettiClient projects={projects} />
}
