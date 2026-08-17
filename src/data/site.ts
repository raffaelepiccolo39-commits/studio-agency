// ─────────────────────────────────────────────────────────────────────────────
// IMPOSTAZIONI DEL SITO — rete di sicurezza dei dati che si modificano da Sanity.
//
// Questi valori sono quelli che il sito ha sempre mostrato. Restano qui come
// fallback: se Sanity è vuoto, non configurato o irraggiungibile, il sito
// continua a mostrare questi. Nessuna pagina può ritrovarsi senza contatti.
//
// Per cambiare i dati NON si tocca questo file: si va su piraweb.it/studio →
// "Impostazioni sito". Questo file va aggiornato solo se cambia la struttura
// (un campo nuovo) o se un dato cambia in modo definitivo e vogliamo che anche
// il fallback sia aggiornato.
// ─────────────────────────────────────────────────────────────────────────────

export interface Telefono {
  /** Come si legge sul sito. Es. "+39 081 175 60017" */
  etichetta: string
  /** Quello che finisce in href="tel:". Solo cifre e +. */
  numero: string
}

export interface SiteSettings {
  /** Ragione sociale, usata nei dati strutturati. */
  ragioneSociale: string
  nomeCommerciale: string
  email: string
  /** Il primo della lista è quello principale (JSON-LD, contatti in evidenza). */
  telefoni: Telefono[]
  /** Solo cifre, con prefisso internazionale e senza +. Es. 393318535698 */
  whatsapp: string
  indirizzo: {
    via: string
    cap: string
    citta: string
    provincia: string
    nazione: string
  }
  partitaIva: string
  social: {
    instagram: string
    facebook: string
    linkedin: string
    tiktok: string
  }
  trustpilot: string
}

export const siteSettings: SiteSettings = {
  ragioneSociale: 'Pira Web S.r.l.',
  nomeCommerciale: 'Pira Web Creative Agency',
  email: 'info@piraweb.it',
  telefoni: [
    { etichetta: '+39 081 175 60017', numero: '+3908117560017' },
    { etichetta: '+39 331 853 5698', numero: '+393318535698' },
    { etichetta: '+39 351 721 4074', numero: '+393517214074' },
  ],
  whatsapp: '393318535698',
  indirizzo: {
    via: 'Via A.Petrillo N°171',
    cap: '81030',
    citta: 'Casapesenna',
    provincia: 'CE',
    nazione: 'IT',
  },
  partitaIva: 'IT04891370613',
  social: {
    instagram: 'https://www.instagram.com/piraweb_agency/',
    facebook: 'https://www.facebook.com/pirawebonline',
    linkedin: 'https://www.linkedin.com/company/pira-web/',
    tiktok: '',
  },
  trustpilot: 'https://it.trustpilot.com/review/piraweb.it',
}

/** Indirizzo su una riga: "Via A.Petrillo N°171, 81030 Casapesenna CE". */
export function indirizzoEsteso(s: SiteSettings): string {
  const { via, cap, citta, provincia } = s.indirizzo
  return `${via}, ${cap} ${citta} ${provincia}`
}

/** I social effettivamente compilati, nell'ordine in cui vanno mostrati. */
export function socialAttivi(s: SiteSettings): { rete: keyof SiteSettings['social']; url: string }[] {
  const ordine: (keyof SiteSettings['social'])[] = ['instagram', 'facebook', 'linkedin', 'tiktok']
  return ordine
    .filter(rete => Boolean(s.social[rete]?.trim()))
    .map(rete => ({ rete, url: s.social[rete] }))
}
