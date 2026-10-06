// ─────────────────────────────────────────────────────────────────────────────
// ANTEPRIMA GRATUITA — le domande del percorso, una per schermata.
//
// Unica fonte di verità: il modulo (AnteprimaForm) legge da qui rendering,
// validazione e testo della mail. Per aggiungere o togliere una domanda basta
// toccare l'array `passi`. L'ultimo passo è sempre quello dei contatti.
// ─────────────────────────────────────────────────────────────────────────────

export type TipoPasso =
  | 'testo'      // una riga
  | 'paragrafo'  // più righe
  | 'scelta'     // una sola risposta, riquadri
  | 'multipla'   // più risposte, riquadri con spunta
  | 'contatti'   // schermata finale: nome, email, WhatsApp, note, consenso

export interface Opzione {
  valore: string
  etichetta: string
}

export interface Passo {
  id: string
  /** Blocco a cui appartiene, mostrato in alto nella scheda. */
  gruppo: string
  domanda: string
  /** Riga di contesto sotto la domanda. */
  aiuto?: string
  tipo: TipoPasso
  obbligatorio?: boolean
  placeholder?: string
  opzioni?: Opzione[]
  /** Solo per 'multipla': quante risposte al massimo. */
  massimo?: number
  /** Riquadri su due colonne (per opzioni corte). */
  dueColonne?: boolean
}

export const passi: Passo[] = [
  // ── La tua attività ──
  {
    id: 'attivita', gruppo: 'La tua attività', tipo: 'testo', obbligatorio: true,
    domanda: 'Come si chiama la tua attività?',
    placeholder: 'Il nome che usano i tuoi clienti',
  },
  {
    id: 'cosa_fate', gruppo: 'La tua attività', tipo: 'paragrafo', obbligatorio: true,
    domanda: 'Di cosa vi occupate?',
    aiuto: 'Due righe bastano, come lo spiegheresti a un vicino di casa.',
    placeholder: 'Es. pizzeria con forno a legna, studio di fisioterapia, impresa di impianti elettrici…',
  },
  {
    id: 'zona', gruppo: 'La tua attività', tipo: 'testo', obbligatorio: true,
    domanda: 'Dove lavorate?',
    placeholder: 'Città, provincia, tutta Italia, solo online…',
  },
  {
    id: 'presenza', gruppo: 'La tua attività', tipo: 'testo',
    domanda: 'Avete già un sito o dei profili social?',
    aiuto: 'Incolla i link che hai: ci servono per capire da dove partiamo. Se non c’è niente, vai avanti.',
    placeholder: 'Sito, Instagram, Facebook, scheda Google…',
  },
  {
    id: 'clienti', gruppo: 'La tua attività', tipo: 'scelta', obbligatorio: true, dueColonne: true,
    domanda: 'A chi vendete?',
    opzioni: [
      { valore: 'privati', etichetta: 'A privati' },
      { valore: 'aziende', etichetta: 'Ad aziende' },
      { valore: 'entrambi', etichetta: 'A entrambi' },
      { valore: 'enti', etichetta: 'A enti e associazioni' },
    ],
  },

  // ── Il sito ──
  {
    id: 'tipo_sito', gruppo: 'Il sito', tipo: 'scelta', obbligatorio: true,
    domanda: 'Che tipo di sito ti serve?',
    opzioni: [
      { valore: 'vetrina', etichetta: 'Un sito che presenta l’attività' },
      { valore: 'richieste', etichetta: 'Un sito che raccoglie richieste o prenotazioni' },
      { valore: 'negozio', etichetta: 'Un negozio online' },
      { valore: 'pagina-unica', etichetta: 'Una sola pagina per una campagna' },
      { valore: 'consiglio', etichetta: 'Non lo so, consigliatemi voi' },
    ],
  },
  {
    id: 'perche_ora', gruppo: 'Il sito', tipo: 'multipla', obbligatorio: true, massimo: 3,
    domanda: 'Perché un sito nuovo proprio adesso?',
    aiuto: 'Fino a tre risposte.',
    opzioni: [
      { valore: 'manca', etichetta: 'Non ce l’abbiamo ancora' },
      { valore: 'vecchio', etichetta: 'Quello attuale è vecchio' },
      { valore: 'telefono', etichetta: 'Dal telefono si vede male' },
      { valore: 'richieste', etichetta: 'Non porta richieste' },
      { valore: 'aggiornare', etichetta: 'Non riusciamo ad aggiornarlo' },
      { valore: 'immagine', etichetta: 'Stiamo cambiando immagine o nome' },
      { valore: 'apertura', etichetta: 'Apriamo una nuova attività o sede' },
    ],
  },
  {
    id: 'risultato', gruppo: 'Il sito', tipo: 'scelta', obbligatorio: true,
    domanda: 'La cosa più importante che il sito deve fare?',
    opzioni: [
      { valore: 'contatti', etichetta: 'Farci chiamare o scrivere' },
      { valore: 'prenotazioni', etichetta: 'Far prenotare' },
      { valore: 'vendere', etichetta: 'Vendere' },
      { valore: 'google', etichetta: 'Farci trovare su Google e Maps' },
      { valore: 'lavori', etichetta: 'Mostrare i nostri lavori' },
      { valore: 'immagine', etichetta: 'Darci un’immagine più professionale' },
    ],
  },
  {
    id: 'azione', gruppo: 'Il sito', tipo: 'scelta', obbligatorio: true, dueColonne: true,
    domanda: 'Cosa deve fare chi arriva sul sito?',
    opzioni: [
      { valore: 'whatsapp', etichetta: 'Scriverci su WhatsApp' },
      { valore: 'telefono', etichetta: 'Telefonarci' },
      { valore: 'modulo', etichetta: 'Compilare un modulo' },
      { valore: 'prenotare', etichetta: 'Prenotare' },
      { valore: 'comprare', etichetta: 'Comprare' },
      { valore: 'sede', etichetta: 'Venire in sede' },
    ],
  },

  // ── La tua offerta ──
  {
    id: 'offerta', gruppo: 'La tua offerta', tipo: 'paragrafo', obbligatorio: true,
    domanda: 'Qual è il prodotto o servizio da mettere in primo piano?',
    aiuto: 'Quello che vuoi vedere per primo quando apri la pagina.',
    placeholder: 'Es. il menù degustazione, la visita posturale, il rifacimento del bagno chiavi in mano…',
  },
  {
    id: 'cliente_tipo', gruppo: 'La tua offerta', tipo: 'paragrafo',
    domanda: 'Chi è il vostro cliente tipo?',
    aiuto: 'Non serve precisione: bastano due dettagli utili.',
    placeholder: 'Es. famiglie della zona, aziende con più sedi, coppie che si sposano…',
  },
  {
    id: 'perche_voi', gruppo: 'La tua offerta', tipo: 'paragrafo', obbligatorio: true,
    domanda: 'Perché i clienti scelgono voi e non altri?',
    aiuto: 'Scrivilo come lo diresti a voce. Ai testi pensiamo noi.',
    placeholder: 'Esperienza, velocità, materiali, assistenza, prezzo onesto, qualcosa che fate solo voi…',
  },
  {
    id: 'prove', gruppo: 'La tua offerta', tipo: 'paragrafo',
    domanda: 'Numeri o prove che possiamo mostrare?',
    placeholder: 'Anni di attività, clienti seguiti, recensioni, certificazioni, premi…',
  },

  // ── Stile ──
  {
    id: 'percezione', gruppo: 'Stile', tipo: 'multipla', obbligatorio: true, massimo: 3, dueColonne: true,
    domanda: 'Come deve sembrare la vostra attività a chi apre il sito?',
    aiuto: 'Fino a tre risposte.',
    opzioni: [
      { valore: 'elegante', etichetta: 'Elegante' },
      { valore: 'accogliente', etichetta: 'Accogliente' },
      { valore: 'moderna', etichetta: 'Moderna' },
      { valore: 'solida', etichetta: 'Solida e affidabile' },
      { valore: 'creativa', etichetta: 'Creativa' },
      { valore: 'essenziale', etichetta: 'Essenziale' },
      { valore: 'lusso', etichetta: 'Di alta gamma' },
      { valore: 'tecnica', etichetta: 'Tecnica e precisa' },
    ],
  },
  {
    id: 'riferimento', gruppo: 'Stile', tipo: 'testo',
    domanda: 'C’è un sito che ti piace?',
    aiuto: 'Anche di tutt’altro settore. Ci dice molto più di mille aggettivi.',
    placeholder: 'Incolla il link',
  },
  {
    id: 'materiali', gruppo: 'Stile', tipo: 'multipla', obbligatorio: true, dueColonne: true,
    domanda: 'Cosa avete già pronto?',
    opzioni: [
      { valore: 'logo', etichetta: 'Il logo' },
      { valore: 'colori', etichetta: 'I colori' },
      { valore: 'foto', etichetta: 'Foto professionali' },
      { valore: 'testi', etichetta: 'Dei testi' },
      { valore: 'niente', etichetta: 'Niente di tutto questo' },
    ],
  },

  // ── Tempi ──
  {
    id: 'quando', gruppo: 'Tempi', tipo: 'scelta', obbligatorio: true, dueColonne: true,
    domanda: 'Quando vorresti il sito online?',
    opzioni: [
      { valore: 'subito', etichetta: 'Il prima possibile' },
      { valore: 'un-mese', etichetta: 'Entro un mese' },
      { valore: 'tre-mesi', etichetta: 'Entro tre mesi' },
      { valore: 'valuto', etichetta: 'Sto solo valutando' },
    ],
  },
  {
    id: 'budget', gruppo: 'Tempi', tipo: 'scelta', obbligatorio: true, dueColonne: true,
    domanda: 'Che investimento hai in mente?',
    aiuto: 'Ci serve per proporti la soluzione giusta, non per alzare il prezzo.',
    opzioni: [
      { valore: 'fino-1500', etichetta: 'Fino a 1.500 €' },
      { valore: '1500-3000', etichetta: 'Da 1.500 a 3.000 €' },
      { valore: '3000-6000', etichetta: 'Da 3.000 a 6.000 €' },
      { valore: 'oltre-6000', etichetta: 'Oltre 6.000 €' },
      { valore: 'non-deciso', etichetta: 'Non l’ho ancora deciso' },
    ],
  },

  // ── Contatti (sempre ultimo) ──
  {
    id: 'contatti', gruppo: 'Contatti', tipo: 'contatti', obbligatorio: true,
    domanda: 'Dove ti mandiamo il link?',
    aiuto: 'Il link all’anteprima arriva su WhatsApp o via email.',
  },
]

/** Etichette dei blocchi, nell'ordine in cui compaiono: servono per la barra. */
export const gruppi = Array.from(new Set(passi.map(p => p.gruppo)))
