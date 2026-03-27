export type Project = {
  slug: string
  title: string
  platform: string
  services: string[]
  color: string
  accent: string
  year: number
  cliente: string
  descrizione: string
  sfida: string
  soluzione: string
  risultati: { label: string; value: string }[]
  immagini: string[]
}

export const projects: Project[] = [
  {
    slug: 'daga',
    title: 'Daga',
    platform: 'E-commerce',
    services: ['Sito Web', 'E-commerce', 'Social Media'],
    color: '#0f1a0a',
    accent: '#c8f55a',
    year: 2023,
    cliente: 'Daga',
    descrizione: "Brand food con una forte identità artigianale. Abbiamo costruito l'e-commerce e gestito la comunicazione social per portare i prodotti Daga online con la stessa cura con cui vengono realizzati.",
    sfida: "Digitalizzare un brand food artigianale senza perdere l'autenticità del prodotto, costruendo allo stesso tempo un canale di vendita online efficace.",
    soluzione: "Sviluppo di un e-commerce su misura, affiancato da una gestione social mirata a raccontare il prodotto e costruire una community fedele.",
    risultati: [
      { label: 'Presenza online', value: 'Attivata' },
      { label: 'Canali social', value: 'Gestiti' },
      { label: 'E-commerce', value: 'Live' },
    ],
    immagini: [],
  },
  {
    slug: 'contex-biancheria',
    title: 'Con.tex',
    platform: 'E-commerce',
    services: ['Sito Web', 'E-commerce', 'Social Media'],
    color: '#0a0f1a',
    accent: '#5a8cf5',
    year: 2023,
    cliente: 'Con.tex Biancheria',
    descrizione: "Azienda specializzata in biancheria per la casa. Abbiamo creato l'e-commerce e gestiamo la presenza social, trasformando un'attività locale in un brand con visibilità digitale strutturata.",
    sfida: "Portare online un'attività di biancheria con un catalogo ampio, mantenendo semplicità di navigazione e un'esperienza d'acquisto fluida.",
    soluzione: "Sviluppo e-commerce con catalogo organizzato e gestione social continuativa per costruire autorevolezza nel settore tessile.",
    risultati: [
      { label: 'Catalogo online', value: 'Attivo' },
      { label: 'Social gestiti', value: 'Continuativi' },
      { label: 'E-commerce', value: 'Live' },
    ],
    immagini: [],
  },
  {
    slug: 'alma-studio',
    title: 'Alma Studio',
    platform: 'Brand Identity',
    services: ['Brand Identity', 'Logo', 'Social Media'],
    color: '#1a1500',
    accent: '#f5c85a',
    year: 2023,
    cliente: 'Alma Studio — Commerciale Associato',
    descrizione: "Studio commerciale associato che aveva bisogno di un'identità visiva professionale e riconoscibile. Abbiamo costruito il brand da zero: dal logo alla gestione social.",
    sfida: "Creare un'identità visiva che comunicasse professionalità, affidabilità e modernità per uno studio commerciale in un mercato competitivo.",
    soluzione: "Progettazione completa della brand identity — logo, palette colori, elementi grafici — e avvio della gestione social per costruire autorevolezza online.",
    risultati: [
      { label: 'Logo & Brand', value: 'Creati' },
      { label: 'Identity', value: 'Completa' },
      { label: 'Social Media', value: 'Gestiti' },
    ],
    immagini: [],
  },
  {
    slug: 'alcaia',
    title: 'Alcaia',
    platform: 'Brand + Social',
    services: ['Logo', 'Social Media'],
    color: '#001a18',
    accent: '#5af5e8',
    year: 2024,
    cliente: 'Alcaia — Centro Medico',
    descrizione: "Centro medico che aveva necessità di un'identità visiva credibile e di una comunicazione social pensata per il settore sanitario. Abbiamo creato il logo e gestiamo i canali social.",
    sfida: "Costruire un'identità visiva e una comunicazione digitale adatta al settore sanitario: seria, rassicurante e professionale.",
    soluzione: "Progettazione logo e linea grafica del centro medico, seguita da una gestione social continuativa con contenuti informativi e di posizionamento.",
    risultati: [
      { label: 'Logo', value: 'Realizzato' },
      { label: 'Social', value: 'Gestiti' },
      { label: 'Settore', value: 'Sanitario' },
    ],
    immagini: [],
  },
  {
    slug: 'pedata-biancheria',
    title: 'Pedata Biancheria',
    platform: 'E-commerce',
    services: ['Sito Web', 'E-commerce'],
    color: '#1a0a0a',
    accent: '#f55a5a',
    year: 2024,
    cliente: 'Pedata Biancheria',
    descrizione: "Attività specializzata in biancheria per la casa. Abbiamo progettato e sviluppato il sito e-commerce per portare online il catalogo prodotti e aprire un nuovo canale di vendita.",
    sfida: "Costruire un e-commerce funzionale e di facile gestione per un'attività consolidata nel territorio che si affacciava per la prima volta al digitale.",
    soluzione: "Sviluppo di un sito e-commerce chiaro, ottimizzato per mobile e con una struttura di catalogo semplice da aggiornare autonomamente.",
    risultati: [
      { label: 'E-commerce', value: 'Live' },
      { label: 'Catalogo', value: 'Online' },
      { label: 'Mobile', value: 'Ottimizzato' },
    ],
    immagini: [],
  },
  {
    slug: 'svinati',
    title: 'Svinati',
    platform: 'Social Media',
    services: ['Social Media'],
    color: '#1a0a1a',
    accent: '#c85af5',
    year: 2024,
    cliente: 'Svinati',
    descrizione: "Brand nel settore vinicolo. Gestiamo la presenza social con una comunicazione autentica, capace di raccontare il prodotto e costruire un rapporto diretto con gli appassionati di vino.",
    sfida: "Comunicare un prodotto di nicchia come il vino su canali social, trovando un tono di voce allo stesso tempo colto e accessibile.",
    soluzione: "Gestione social continuativa con piano editoriale dedicato, contenuti visivi curati e strategia di community building per il settore enologico.",
    risultati: [
      { label: 'Social', value: 'Gestiti' },
      { label: 'Community', value: 'In crescita' },
      { label: 'Settore', value: 'Vinicolo' },
    ],
    immagini: [],
  },
  {
    slug: 'ortopedia-gs',
    title: 'Ortopedia GS',
    platform: 'Social Media',
    services: ['Social Media'],
    color: '#0a0a1a',
    accent: '#5a8cf5',
    year: 2024,
    cliente: 'Ortopedia GS',
    descrizione: "Negozio di ortopedia con necessità di costruire una presenza digitale professionale. Gestiamo i canali social per aumentare la visibilità locale e la fiducia del pubblico.",
    sfida: "Comunicare un'attività di ortopedia sui social in modo professionale e accessibile, distinguendosi dalla concorrenza locale.",
    soluzione: "Gestione social con contenuti informativi, valorizzazione dei prodotti e dei servizi, e una comunicazione orientata alla fiducia e alla prossimità con il cliente.",
    risultati: [
      { label: 'Social', value: 'Gestiti' },
      { label: 'Visibilità', value: 'Locale' },
      { label: 'Settore', value: 'Sanitario' },
    ],
    immagini: [],
  },
]
