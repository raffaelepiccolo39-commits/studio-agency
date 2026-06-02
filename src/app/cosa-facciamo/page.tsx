import { pageMetadata } from '@/lib/seo'
import CosaFacciamoClient from './CosaFacciamoClient'

export const metadata = pageMetadata({
  title: 'Cosa Facciamo',
  description:
    'Brand direction, sviluppo web ed e-commerce, performance marketing e content: scopri come Pira Web costruisce ecosistemi digitali che fanno crescere il tuo brand.',
  path: '/cosa-facciamo',
})

export default function Page() {
  return <CosaFacciamoClient />
}
