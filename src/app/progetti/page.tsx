import { pageMetadata } from '@/lib/seo'
import { getProjects } from '@/lib/sanity/queries'
import ProgettiClient from './ProgettiClient'

export const metadata = pageMetadata({
  title: 'Progetti',
  description:
    'Il portfolio di Pira Web: branding, siti ed e-commerce, social e performance marketing per brand che vogliono distinguersi. Guarda i nostri case study.',
  path: '/progetti',
})

export default async function Page() {
  const projects = await getProjects()
  return <ProgettiClient projects={projects} />
}
