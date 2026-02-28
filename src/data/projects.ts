export type Project = {
  slug: string
  title: string
  platform: string
  services: string[]
  color: string
  accent: string
  year: number
  // Dettagli pagina dedicata
  cliente: string
  descrizione: string
  sfida: string
  soluzione: string
  risultati: { label: string; value: string }[]
  immagini: string[] // path immagini in /public/progetti/
}

export const projects: Project[] = [
  {
    slug: 'brand-alpha',
    title: 'Brand Alpha',
    platform: 'Shopify Plus',
    services: ['UX/UI', 'Dev', 'SEO'],
    color: '#0f1a0a',
    accent: '#c8f55a',
    year: 2024,
    cliente: 'Brand Alpha S.r.l.',
    descrizione: 'Descrivi qui il progetto Brand Alpha.',
    sfida: 'Descrivi la sfida che il cliente aveva.',
    soluzione: 'Descrivi la soluzione che hai proposto.',
    risultati: [
      { label: 'Aumento conversioni', value: '+42%' },
      { label: 'Traffico organico', value: '+120%' },
      { label: 'Tempo di consegna', value: '6 settimane' },
    ],
    immagini: [],
  },
  {
    slug: 'studio-beta',
    title: 'Studio Beta',
    platform: 'Custom',
    services: ['Brand', 'UX/UI'],
    color: '#1a0f0a',
    accent: '#ff4d1c',
    year: 2024,
    cliente: 'Studio Beta',
    descrizione: 'Descrivi qui il progetto Studio Beta.',
    sfida: 'Descrivi la sfida che il cliente aveva.',
    soluzione: 'Descrivi la soluzione che hai proposto.',
    risultati: [
      { label: 'Brand awareness', value: '+85%' },
      { label: 'Nuovi clienti', value: '+30' },
      { label: 'Durata progetto', value: '8 settimane' },
    ],
    immagini: [],
  },
  {
    slug: 'gamma-corp',
    title: 'Gamma Corp',
    platform: 'Next.js',
    services: ['Marketing', 'CRO'],
    color: '#0a0a1a',
    accent: '#5a8cf5',
    year: 2024,
    cliente: 'Gamma Corp',
    descrizione: 'Descrivi qui il progetto Gamma Corp.',
    sfida: 'Descrivi la sfida che il cliente aveva.',
    soluzione: 'Descrivi la soluzione che hai proposto.',
    risultati: [
      { label: 'ROAS', value: '4.2x' },
      { label: 'CPA ridotto', value: '-38%' },
      { label: 'Durata progetto', value: '3 mesi' },
    ],
    immagini: [],
  },
  {
    slug: 'delta-store',
    title: 'Delta Store',
    platform: 'Shopify',
    services: ['UX/UI', 'Dev', 'Marketing'],
    color: '#1a1a0a',
    accent: '#f5c85a',
    year: 2023,
    cliente: 'Delta Store',
    descrizione: 'Descrivi qui il progetto Delta Store.',
    sfida: 'Descrivi la sfida che il cliente aveva.',
    soluzione: 'Descrivi la soluzione che hai proposto.',
    risultati: [
      { label: 'Revenue', value: '+67%' },
      { label: 'AOV', value: '+22%' },
      { label: 'Durata progetto', value: '10 settimane' },
    ],
    immagini: [],
  },
  {
    slug: 'epsilon-brand',
    title: 'Epsilon Brand',
    platform: 'Laravel',
    services: ['Dev', 'Integration'],
    color: '#0f0a1a',
    accent: '#c85af5',
    year: 2023,
    cliente: 'Epsilon Brand',
    descrizione: 'Descrivi qui il progetto Epsilon Brand.',
    sfida: 'Descrivi la sfida che il cliente aveva.',
    soluzione: 'Descrivi la soluzione che hai proposto.',
    risultati: [
      { label: 'Performance', value: '+90%' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Durata progetto', value: '12 settimane' },
    ],
    immagini: [],
  },
  {
    slug: 'zeta-luxury',
    title: 'Zeta Luxury',
    platform: 'Headless',
    services: ['UX/UI', 'Dev', 'SEO'],
    color: '#1a0a0f',
    accent: '#f55a8c',
    year: 2023,
    cliente: 'Zeta Luxury',
    descrizione: 'Descrivi qui il progetto Zeta Luxury.',
    sfida: 'Descrivi la sfida che il cliente aveva.',
    soluzione: 'Descrivi la soluzione che hai proposto.',
    risultati: [
      { label: 'Bounce rate', value: '-45%' },
      { label: 'Sessioni', value: '+200%' },
      { label: 'Durata progetto', value: '14 settimane' },
    ],
    immagini: [],
  },
]