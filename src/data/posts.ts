// Dati canonici del blog. Fonte unica usata sia dal seed Sanity sia (dopo lo
// swap) dalle pagine come fallback quando il CMS non è configurato/popolato.
// I `content` riproducono ciò che esiste oggi nelle pagine; i corpi mancanti
// vanno scritti nello Studio Sanity (non inventiamo contenuti editoriali).

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  featured: boolean
  publishedAt: string // ISO
  date: string // display, es. "20 Feb 2025"
  author: { name: string; role: string }
  content: PostBlock[]
}

export const posts: Post[] = [
  {
    slug: 'futuro-ecommerce-2025',
    title: "Il futuro dell'e-commerce nel 2025",
    excerpt: 'AI, headless commerce e personalizzazione estrema: le tendenze che stanno ridisegnando il commercio digitale.',
    category: 'E-commerce',
    readTime: '7 min',
    featured: true,
    publishedAt: '2025-02-20',
    date: '20 Feb 2025',
    author: { name: 'Mario Rossi', role: 'Founder' },
    content: [
      { type: 'p', text: "Il 2025 si presenta come un anno di svolta per l'e-commerce. Dopo anni di crescita accelerata dalla pandemia, il mercato sta maturando e le regole del gioco stanno cambiando profondamente." },
      { type: 'h2', text: "L'intelligenza artificiale non è più un'opzione" },
      { type: 'p', text: "I brand che stanno crescendo più velocemente hanno una cosa in comune: usano l'AI non come gadget, ma come infrastruttura. Dalla personalizzazione dei prodotti mostrati, alle email generate dinamicamente, fino alle previsioni di stock — l'AI sta diventando il sistema nervoso dell'e-commerce moderno." },
      { type: 'h2', text: 'Headless commerce: quando ha senso davvero' },
      { type: 'p', text: "L'architettura headless ha senso quando hai specifiche esigenze di performance e flessibilità — non come default per ogni progetto." },
    ],
  },
  {
    slug: 'shopify-vs-custom',
    title: 'Shopify Plus o sviluppo custom?',
    excerpt: 'Una guida pratica per capire quando ha senso usare Shopify Plus e quando conviene costruire qualcosa di custom.',
    category: 'Tech',
    readTime: '5 min',
    featured: false,
    publishedAt: '2025-02-14',
    date: '14 Feb 2025',
    author: { name: 'Mario Rossi', role: 'Founder' },
    content: [
      { type: 'p', text: 'Una guida pratica per capire quando ha senso usare Shopify Plus e quando conviene costruire qualcosa di custom.' },
    ],
  },
  {
    slug: 'design-che-converte',
    title: 'Design che converte: i principi UX',
    excerpt: "Non basta essere belli. Ecco come costruiamo interfacce che guidano l'utente verso l'acquisto in modo naturale.",
    category: 'Design',
    readTime: '6 min',
    featured: false,
    publishedAt: '2025-02-05',
    date: '5 Feb 2025',
    author: { name: 'Mario Rossi', role: 'Founder' },
    content: [
      { type: 'p', text: "Non basta essere belli. Ecco come costruiamo interfacce che guidano l'utente verso l'acquisto in modo naturale." },
    ],
  },
  {
    slug: 'meta-ads-2025',
    title: 'Meta Ads nel 2025: strategie che funzionano',
    excerpt: 'Con iOS e le restrizioni sulla privacy, molti pensano che Meta sia morta. Sbagliato. Ecco come adattarsi.',
    category: 'Marketing',
    readTime: '8 min',
    featured: false,
    publishedAt: '2025-01-28',
    date: '28 Gen 2025',
    author: { name: 'Mario Rossi', role: 'Founder' },
    content: [
      { type: 'p', text: 'Con iOS e le restrizioni sulla privacy, molti pensano che Meta sia morta. Sbagliato. Ecco come adattarsi.' },
    ],
  },
]
