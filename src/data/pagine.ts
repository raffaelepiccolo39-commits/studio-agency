// ─────────────────────────────────────────────────────────────────────────────
// PAGINE — SEO e intestazione, rete di sicurezza dei contenuti modificabili.
//
// Sono i titoli e le descrizioni così come sono sempre stati. Restano qui come
// fallback: se Sanity è vuoto o non risponde, le pagine mantengono la loro SEO
// invece di ritrovarsi senza titolo — che per Google è peggio di un titolo
// vecchio.
//
// Per cambiarli NON si tocca questo file: piraweb.it/studio → "Pagine".
// ─────────────────────────────────────────────────────────────────────────────

export interface Intestazione {
  /** La riga piccola sopra al titolo. Es. "CHI SIAMO" */
  occhiello: string
  /** Prima parte del titolo, in carattere condensato. */
  titolo: string
  /** La parte evidenziata in corsivo giallo. */
  titoloEvidenziato: string
  /** Coda del titolo dopo la parte evidenziata. Può restare vuota. */
  titoloDopo: string
  sottotitolo: string
}

export interface Pagina {
  /** Percorso della pagina, è la chiave: "/chi-siamo". La home è "/". */
  percorso: string
  /** Come si chiama nello Studio, per farla riconoscere. */
  nome: string
  /** Titolo nei risultati di ricerca e nella scheda social. */
  titoloSeo: string
  /** Descrizione nei risultati di ricerca. Regola pratica: 150-160 caratteri. */
  descrizioneSeo: string
  /** L'intestazione grande in cima alla pagina, dove esiste. */
  intestazione?: Intestazione
}

export const pagine: Pagina[] = [
  {
    percorso: '/',
    nome: 'Home',
    titoloSeo: 'Pira Web Creative Agency — Agenzia Digitale Caserta Napoli',
    descrizioneSeo:
      'Agenzia digitale che unisce brand direction, sviluppo web e performance marketing. Costruiamo ecosistemi digitali per brand visionari.',
  },
  {
    percorso: '/chi-siamo',
    nome: 'Chi Siamo',
    titoloSeo: 'Chi Siamo',
    descrizioneSeo:
      'Pira Web Creative Agency unisce brand direction, tecnologia e marketing. Scopri chi siamo, il nostro approccio e il team dietro i progetti.',
    intestazione: {
      occhiello: 'CHI SIAMO',
      titolo: 'il partner ',
      titoloEvidenziato: 'per la crescita',
      titoloDopo: 'della tua azienda.',
      sottotitolo: `Pira Web nasce nel 2018 dalla visione di Raffaele, ingegnere con una convinzione precisa: il digitale doveva smettere di essere decorazione e diventare infrastruttura.

Da allora affianchiamo imprenditori e brand con metodo, rigore e orientamento ai risultati.

Non lavoriamo per consegnare.
Lavoriamo per generare valore nel tempo.`,
    },
  },
  {
    percorso: '/cosa-facciamo',
    nome: 'Cosa Facciamo',
    titoloSeo: 'Cosa Facciamo',
    descrizioneSeo:
      'Brand direction, sviluppo web ed e-commerce, performance marketing e content: scopri come Pira Web costruisce ecosistemi digitali che fanno crescere il tuo brand.',
  },
  {
    percorso: '/contatti',
    nome: 'Contatti',
    titoloSeo: 'Contatti',
    descrizioneSeo:
      'Parliamo del tuo progetto. Contatta Pira Web Creative Agency per brand direction, sviluppo web e marketing. Casapesenna (CE) — info@piraweb.it.',
  },
  {
    percorso: '/progetti',
    nome: 'Progetti',
    titoloSeo: 'Progetti',
    descrizioneSeo:
      'Il portfolio di Pira Web: branding, siti ed e-commerce, social e performance marketing per brand che vogliono distinguersi. Guarda i nostri case study.',
  },
  {
    percorso: '/blog',
    nome: 'Blog',
    // Solo "Blog": il nome dell'agenzia lo aggiunge già il modello del layout
    // ("%s — Pira Web Creative Agency"). Prima qui c'era il nome completo e in
    // produzione il titolo usciva doppio.
    titoloSeo: 'Blog',
    descrizioneSeo:
      'Guide pratiche su e-commerce, siti web, branding e social per le PMI, dal team di Pira Web.',
    intestazione: {
      occhiello: 'Insights & Approfondimenti',
      titolo: 'IL NOSTRO',
      titoloEvidenziato: 'blog',
      titoloDopo: '',
      sottotitolo:
        'Guide pratiche su e-commerce, siti web, branding e social, scritte dal team di Pira Web.',
    },
  },
  {
    percorso: '/lavora-con-noi',
    nome: 'Lavora con Noi',
    titoloSeo: 'Lavora con Noi',
    descrizioneSeo:
      'Entra nel team di Pira Web Creative Agency. Cerchiamo talenti in design, sviluppo web e marketing per costruire insieme brand digitali memorabili.',
  },
]

/** I percorsi gestibili dallo Studio: è l'elenco che compila il menu a tendina. */
export const percorsiGestiti = pagine.map(p => ({ title: p.nome, value: p.percorso }))

export function paginaDiRiserva(percorso: string): Pagina | undefined {
  return pagine.find(p => p.percorso === percorso)
}
