// ─────────────────────────────────────────────────────────────────────────────
// SERVIZI — rete di sicurezza dei contenuti modificabili da Sanity.
//
// Sono i quattro servizi così come sono sempre stati sul sito. Restano qui come
// fallback: se Sanity è vuoto, non configurato o irraggiungibile, la sezione
// mostra questi invece di sparire.
//
// Per cambiare i testi NON si tocca questo file: piraweb.it/studio → "Servizi".
// ─────────────────────────────────────────────────────────────────────────────

export interface Servizio {
  /** Identificativo stabile, usato come chiave di render. */
  id: string
  /** Titolo spezzato su due righe, come lo mostra la grafica. */
  titolo: [string, string]
  /** Le voci elencate accanto al servizio. */
  voci: string[]
  /** I paragrafi descrittivi, nell'ordine in cui vanno letti. */
  paragrafi: string[]
  /** Percorso o URL dell'immagine. */
  immagine: string
}

/**
 * L'etichetta (a.) (b.) (c.) … si ricava dalla POSIZIONE, non è un dato da
 * mantenere a mano: riordinare i servizi nello Studio rinumera da solo.
 */
export function etichettaServizio(indice: number): string {
  return `(${String.fromCharCode(97 + indice)}.)`
}

export const servizi: Servizio[] = [
  {
    id: 'a',
    titolo: ['Branding &', 'Graphic Design'],
    voci: [
      'Brand Identity',
      'Logo & Visual System',
      'Brand Strategy',
      'Tone of Voice',
      'Naming',
      'Packaging Design',
      'Editorial Design',
      'Style Guide',
    ],
    paragrafi: [
      'Un brand non deve limitarsi a essere presente, deve essere riconoscibile e impossibile da confondere.',
      'Costruiamo identità visive capaci di dare coerenza e personalità alla tua azienda.',
      'Partiamo dal posizionamento, analizziamo il mercato e traduciamo i valori del brand in un sistema visivo coordinato: logo, colori, tipografia, stile grafico, tono di voce e percezione.',
    ],
    immagine: '/servizi/servizi-01.jpg',
  },
  {
    id: 'b',
    titolo: ['Website &', 'E-commerce'],
    voci: [
      'Custom Website Design',
      'Shopify Development',
      'WooCommerce',
      'E-commerce Strategy',
      'UX/UI Design',
      'Performance Optimization',
      'CMS Integration',
      'Analytics & Tracking',
    ],
    paragrafi: [
      'Progettiamo ecosistemi digitali pensati per valorizzare il brand e generare risultati concreti.',
      'Dai siti corporate agli e-commerce più strutturati: velocità di caricamento, navigazione intuitiva e percorsi pensati per guidare l’utente all’azione.',
      'Costruiamo asset digitali che lavorano ogni giorno per la crescita della tua azienda.',
    ],
    immagine: '/servizi/servizi-02.jpg',
  },
  {
    id: 'c',
    titolo: ['Social Media', 'Management'],
    voci: [
      'Social Strategy',
      'Content Calendar',
      'Community Management',
      'Meta Ads',
      'TikTok Marketing',
      'Influencer Strategy',
      'Paid Media',
      'Reporting & Insights',
    ],
    paragrafi: [
      'Gestiamo la presenza social del tuo brand con una strategia pensata per attirare l’attenzione giusta e trasformare i contenuti in leve di crescita.',
      'Non pubblichiamo “tanto per farlo”: studiamo il target, definiamo format riconoscibili e sviluppiamo contenuti pensati per generare continuità e relazione.',
      'L’obiettivo è costruire una community che percepisce il tuo valore e sceglie di avvicinarsi alla tua azienda.',
    ],
    immagine: '/servizi/servizi-03.jpg',
  },
  {
    id: 'd',
    titolo: ['Content', 'Creation'],
    voci: [
      'Copywriting',
      'Video Production',
      'Reel & Short Form',
      'Photography Direction',
      'Storytelling',
      'Editorial Content',
      'Motion Graphics',
      'Storyboarding',
    ],
    paragrafi: [
      'Creiamo contenuti pensati per lasciare il segno.',
      'In un mercato pieno di messaggi tutti uguali, la differenza la fa chi comunica con identità, strategia e qualità.',
      'Per questo sviluppiamo contenuti originali, dal copywriting alla produzione visual, capaci di parlare al pubblico giusto e rafforzare la percezione del brand.',
    ],
    immagine: '/servizi/servizi-04.jpg',
  },
]
