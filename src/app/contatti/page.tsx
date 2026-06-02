import { pageMetadata } from '@/lib/seo'
import ContattiClient from './ContattiClient'

export const metadata = pageMetadata({
  title: 'Contatti',
  description:
    'Parliamo del tuo progetto. Contatta Pira Web Creative Agency per brand direction, sviluppo web e marketing. Casapesenna (CE) — info@piraweb.it.',
  path: '/contatti',
})

export default function Page() {
  return <ContattiClient />
}
