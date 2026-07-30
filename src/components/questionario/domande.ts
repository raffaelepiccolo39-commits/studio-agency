// ─────────────────────────────────────────────────────────────────────────────
// QUESTIONARIO DI QUALIFICAZIONE — unica fonte di verità dei contenuti.
//
// Per aggiungere una domanda: infila un oggetto nell'array `campi` della sezione
// che ti interessa. Il form si adatta da solo (rendering + validazione + payload).
//
// Per cambiare la soglia di scarto: modifica SOGLIA_FUORI_TARGET e la prima
// opzione di `budget_mensile` (devono combaciare sul `valore`).
// ─────────────────────────────────────────────────────────────────────────────

export type TipoCampo =
  | 'testo'      // input testuale
  | 'email'      // input email (validato)
  | 'tel'        // input telefono (validato)
  | 'paragrafo'  // textarea
  | 'scelta'     // radio: una sola risposta, opzioni sempre visibili
  | 'multipla'   // checkbox: più risposte
  | 'menu'       // select

export interface Opzione {
  /** Valore salvato e inviato. Non cambiarlo se è già in uso nei report. */
  valore: string
  etichetta: string
}

export interface Campo {
  id: string
  etichetta: string
  tipo: TipoCampo
  obbligatorio?: boolean
  placeholder?: string
  /** Riga di contesto sotto l'etichetta. */
  aiuto?: string
  /** Solo per scelta / multipla / menu. */
  opzioni?: Opzione[]
  /** 'meta' affianca il campo al successivo sul desktop. Default: 'piena'. */
  larghezza?: 'meta' | 'piena'
}

export interface Sezione {
  id: string
  /** Titolo grande della schermata. */
  titolo: string
  /** Etichetta breve usata nel rail laterale. */
  passo: string
  sottotitolo?: string
  campi: Campo[]
}

/** Campo che decide se il contatto prosegue o viene chiuso. */
export const CAMPO_GATE = 'budget_mensile'

/** Chi risponde con questo valore non prosegue oltre la sezione del gate. */
export const SOGLIA_FUORI_TARGET = 'meno-500'

export const sezioni: Sezione[] = [
  {
    id: 'contatto',
    passo: 'Chi sei',
    titolo: 'Partiamo da te',
    sottotitolo: 'Tre minuti in tutto. Nessuna newsletter, nessun automatismo: leggiamo le risposte una per una.',
    campi: [
      { id: 'nome', etichetta: 'Nome e cognome', tipo: 'testo', obbligatorio: true, placeholder: 'Come ti chiami', larghezza: 'meta' },
      { id: 'azienda', etichetta: 'Azienda o progetto', tipo: 'testo', obbligatorio: true, placeholder: 'Ragione sociale o nome del brand', larghezza: 'meta' },
      {
        id: 'ruolo',
        etichetta: 'Il tuo ruolo',
        tipo: 'menu',
        obbligatorio: true,
        opzioni: [
          { valore: 'titolare', etichetta: 'Titolare / CEO' },
          { valore: 'marketing', etichetta: 'Marketing manager' },
          { valore: 'vendite', etichetta: 'Responsabile vendite' },
          { valore: 'professionista', etichetta: 'Libero professionista' },
          { valore: 'altro', etichetta: 'Altro' },
        ],
        larghezza: 'meta',
      },
      {
        id: 'settore',
        etichetta: 'Settore',
        tipo: 'menu',
        obbligatorio: true,
        opzioni: [
          { valore: 'manifatturiero', etichetta: 'Manifatturiero / Produzione' },
          { valore: 'retail', etichetta: 'Commercio / Retail' },
          { valore: 'ecommerce', etichetta: 'E-commerce' },
          { valore: 'servizi', etichetta: 'Servizi / Consulenza' },
          { valore: 'food', etichetta: 'Food & Beverage' },
          { valore: 'edilizia', etichetta: 'Edilizia / Impiantistica' },
          { valore: 'benessere', etichetta: 'Salute / Benessere' },
          { valore: 'altro', etichetta: 'Altro' },
        ],
        larghezza: 'meta',
      },
      { id: 'email', etichetta: 'Email', tipo: 'email', obbligatorio: true, placeholder: 'nome@azienda.it', larghezza: 'meta' },
      { id: 'telefono', etichetta: 'Telefono', tipo: 'tel', obbligatorio: true, placeholder: 'Numero su cui possiamo chiamarti', larghezza: 'meta' },
      { id: 'sito', etichetta: 'Sito o profilo Instagram', tipo: 'testo', placeholder: 'Se ce l\'hai, ci diamo un\'occhiata prima della call' },
    ],
  },
  {
    id: 'progetto',
    passo: 'Progetto',
    titolo: 'Cosa ti serve',
    sottotitolo: 'Anche se non hai le idee chiarissime va bene: serve capire il perimetro.',
    campi: [
      {
        id: 'servizi',
        etichetta: 'Su cosa dobbiamo lavorare',
        tipo: 'multipla',
        obbligatorio: true,
        aiuto: 'Seleziona tutto quello che ti riguarda.',
        opzioni: [
          { valore: 'sito', etichetta: 'Sito web' },
          { valore: 'ecommerce', etichetta: 'E-commerce' },
          { valore: 'brand', etichetta: 'Brand identity' },
          { valore: 'adv', etichetta: 'Advertising (Meta / Google)' },
          { valore: 'social', etichetta: 'Social media e contenuti' },
          { valore: 'seo', etichetta: 'SEO' },
          { valore: 'automazioni', etichetta: 'Automazioni / gestionale' },
          { valore: 'non-so', etichetta: 'Non lo so ancora, dimmelo tu' },
        ],
      },
      {
        id: 'situazione',
        etichetta: 'Come ti muovi oggi',
        tipo: 'scelta',
        obbligatorio: true,
        opzioni: [
          { valore: 'interno', etichetta: 'Facciamo tutto internamente' },
          { valore: 'freelance', etichetta: 'Ci appoggiamo a un freelance' },
          { valore: 'agenzia', etichetta: 'Abbiamo già un\'agenzia' },
          { valore: 'niente', etichetta: 'Non facciamo niente di strutturato' },
        ],
      },
      {
        id: 'obiettivo',
        etichetta: 'Il risultato che vuoi nei prossimi 12 mesi',
        tipo: 'paragrafo',
        obbligatorio: true,
        aiuto: 'Più è concreto, più la call è utile. Numeri, se ne hai.',
        placeholder: 'Es. passare da 8 a 25 richieste di preventivo al mese, aprire la vendita online, rifare l\'immagine prima della fiera di marzo…',
      },
      {
        id: 'ostacolo',
        etichetta: 'Cosa ti sta bloccando',
        tipo: 'paragrafo',
        placeholder: 'Il problema che ti ha fatto compilare questo questionario',
      },
    ],
  },
  {
    id: 'investimento',
    passo: 'Investimento',
    titolo: 'Budget',
    sottotitolo: 'Domanda scomoda ma necessaria: ci evita di farti perdere tempo con una proposta fuori scala.',
    campi: [
      {
        id: CAMPO_GATE,
        etichetta: 'Quanto puoi investire al mese',
        tipo: 'scelta',
        obbligatorio: true,
        aiuto: 'Compresa la spesa pubblicitaria, se ti serve advertising.',
        opzioni: [
          // ⚠️ La prima opzione è quella scartata: il suo `valore` deve
          // coincidere con SOGLIA_FUORI_TARGET.
          { valore: SOGLIA_FUORI_TARGET, etichetta: 'Meno di 500 €' },
          { valore: '500-1500', etichetta: 'Da 500 a 1.500 €' },
          { valore: '1500-3000', etichetta: 'Da 1.500 a 3.000 €' },
          { valore: '3000-6000', etichetta: 'Da 3.000 a 6.000 €' },
          { valore: 'oltre-6000', etichetta: 'Oltre 6.000 €' },
          { valore: 'da-capire', etichetta: 'Non ho ancora un\'idea, ne parliamo' },
        ],
      },
      {
        id: 'budget_stato',
        etichetta: 'Il budget è già deciso',
        tipo: 'scelta',
        obbligatorio: true,
        opzioni: [
          { valore: 'approvato', etichetta: 'Sì, è approvato' },
          { valore: 'da-approvare', etichetta: 'È da far approvare' },
          { valore: 'insieme', etichetta: 'Lo definiamo insieme' },
        ],
      },
    ],
  },
  {
    id: 'tempi',
    passo: 'Tempi',
    titolo: 'Quando si parte',
    campi: [
      {
        id: 'partenza',
        etichetta: 'Orizzonte di partenza',
        tipo: 'scelta',
        obbligatorio: true,
        opzioni: [
          { valore: 'subito', etichetta: 'Subito, è urgente' },
          { valore: 'un-mese', etichetta: 'Entro un mese' },
          { valore: 'tre-mesi', etichetta: 'Entro tre mesi' },
          { valore: 'valuto', etichetta: 'Sto solo valutando' },
        ],
      },
      {
        id: 'scadenza',
        etichetta: 'C\'è una data da rispettare',
        tipo: 'testo',
        placeholder: 'Fiera, lancio, stagionalità, apertura…',
      },
    ],
  },
  {
    id: 'decisione',
    passo: 'Decisione',
    titolo: 'Ultime due cose',
    sottotitolo: 'Serve a capire chi coinvolgere nella call e cosa portarti.',
    campi: [
      {
        id: 'decisori',
        etichetta: 'Chi decide',
        tipo: 'scelta',
        obbligatorio: true,
        opzioni: [
          { valore: 'io', etichetta: 'Decido io' },
          { valore: 'socio', etichetta: 'Decido con un socio' },
          { valore: 'direzione', etichetta: 'Deve approvare la direzione' },
        ],
      },
      {
        id: 'aspettativa',
        etichetta: 'Cosa ti farebbe scegliere noi',
        tipo: 'paragrafo',
        placeholder: 'Oppure: cosa non ha funzionato con chi hai già provato',
      },
      {
        id: 'provenienza',
        etichetta: 'Come ci hai trovato',
        tipo: 'menu',
        opzioni: [
          { valore: 'instagram', etichetta: 'Instagram' },
          { valore: 'google', etichetta: 'Google' },
          { valore: 'passaparola', etichetta: 'Passaparola' },
          { valore: 'conoscenza', etichetta: 'Ci conoscevamo già' },
          { valore: 'adv', etichetta: 'Un annuncio' },
          { valore: 'altro', etichetta: 'Altro' },
        ],
      },
    ],
  },
]

/** Testi delle due schermate di chiusura. */
export const esiti = {
  inTarget: {
    titolo: 'Ci siamo.',
    testo:
      'Abbiamo tutto quello che serve. Guardiamo le tue risposte e ti scriviamo entro 24 ore lavorative con due o tre slot per la call.',
    nota: 'Se hai fretta scrivi a info@piraweb.it: mettiamo la tua richiesta davanti.',
  },
  fuoriTarget: {
    titolo: 'Meglio dirtelo subito.',
    testo:
      'Sotto i 500 € al mese non riusciamo a costruire qualcosa che ti porti risultati veri: metteremmo in piedi un lavoro a metà, e non serve a nessuno dei due.',
    nota: 'Le tue risposte le abbiamo ricevute e le teniamo da parte. Quando il budget cambia, riscrivici: ripartiamo da qui.',
  },
} as const
