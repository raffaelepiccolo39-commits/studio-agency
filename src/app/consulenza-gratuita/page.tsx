import type { Metadata } from 'next'
import { getProjects } from '@/lib/sanity/queries'
import { projects as mockProjects } from '@/data/projects'
import LandingClient from './LandingClient'

// Landing ADV nascosta: raggiungibile solo via URL diretto (traffico a pagamento).
// Non indicizzabile, non in sitemap, non collegata dal menu del sito.
// Eredita i font e lo stile globali del sito (Boldonse/Syne/Bebas) dal RootLayout.
export const metadata: Metadata = {
  title: 'Consulenza gratuita per medie imprese — Pira Web',
  description: 'Un solo partner per brand, web e advertising della tua media impresa. Richiedi la consulenza gratuita: ti ricontattiamo entro 24 ore.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: 'https://www.piraweb.it/consulenza-gratuita' },
}

export default async function Page() {
  const projects = await getProjects()
  // Fallback ai dati statici se Sanity non restituisce nulla
  const data = projects.length ? projects : mockProjects
  return <LandingClient projects={data} />
}
