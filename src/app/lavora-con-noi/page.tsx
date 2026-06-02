import { pageMetadata } from '@/lib/seo'
import LavoraConNoiClient from './LavoraConNoiClient'

export const metadata = pageMetadata({
  title: 'Lavora con Noi',
  description:
    'Entra nel team di Pira Web Creative Agency. Cerchiamo talenti in design, sviluppo web e marketing per costruire insieme brand digitali memorabili.',
  path: '/lavora-con-noi',
})

export default function Page() {
  return <LavoraConNoiClient />
}
