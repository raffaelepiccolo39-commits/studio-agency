import { pageMetadata } from '@/lib/seo'
import ProgettiClient from './ProgettiClient'

export const metadata = pageMetadata({
  title: 'Progetti',
  description:
    'Il portfolio di Pira Web: branding, siti ed e-commerce, social e performance marketing per brand che vogliono distinguersi. Guarda i nostri case study.',
  path: '/progetti',
})

export default function Page() {
  return <ProgettiClient />
}
