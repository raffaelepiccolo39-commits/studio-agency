import { pageMetadata } from '@/lib/seo'
import ChiSiamoClient from './ChiSiamoClient'

export const metadata = pageMetadata({
  title: 'Chi Siamo',
  description:
    'Pira Web Creative Agency unisce brand direction, tecnologia e marketing. Scopri chi siamo, il nostro approccio e il team dietro i progetti.',
  path: '/chi-siamo',
})

export default function Page() {
  return <ChiSiamoClient />
}
