import type { Metadata } from 'next'
import { getProjects } from '@/lib/sanity/queries'
import { projects as mockProjects } from '@/data/projects'
import AnteprimaClient from './AnteprimaClient'
import { ORE_CONSEGNA } from './offerta'

// Pagina servizio "Anteprima gratuita": ti costruiamo la prima pagina del sito
// prima di qualunque preventivo. Indicizzabile e in sitemap, ma non nel menu:
// si raggiunge da link diretto, ADV e dai richiami che decideremo di mettere nel sito.
export const metadata: Metadata = {
  title: `Anteprima gratuita del tuo sito in ${ORE_CONSEGNA} ore`,
  description: `Prima il sito, poi il preventivo. Rispondi a qualche domanda e in ${ORE_CONSEGNA} ore ricevi un link privato con la prima pagina del tuo nuovo sito, navigabile da telefono e computer. Gratis e senza impegno.`,
  alternates: { canonical: 'https://www.piraweb.it/anteprima-gratuita' },
  openGraph: {
    title: `Prima il sito, poi il preventivo — Pira Web`,
    description: `In ${ORE_CONSEGNA} ore ricevi la prima pagina del tuo nuovo sito, già navigabile. Se ti convince si va avanti, altrimenti finisce lì.`,
    url: 'https://www.piraweb.it/anteprima-gratuita',
    type: 'website',
  },
}

export default async function Page() {
  const projects = await getProjects()
  // Fallback ai dati statici se Sanity non restituisce nulla
  const data = projects.length ? projects : mockProjects
  return <AnteprimaClient projects={data} />
}
