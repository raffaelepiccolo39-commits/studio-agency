'use client'

import dynamic from 'next/dynamic'

// Lo Studio è caricato solo lato client (ssr:false): @sanity/ui chiama
// React.createContext a livello di modulo, cosa non supportata nel grafo
// Server Components → renderlo client-only evita l'errore in build/SSR.
const Studio = dynamic(() => import('@/components/Studio'), { ssr: false })

export default function StudioPage() {
  return <Studio />
}
