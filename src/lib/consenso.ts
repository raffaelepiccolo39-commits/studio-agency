'use client'

import { useSyncExternalStore } from 'react'

/**
 * Stato del consenso ai cookie, leggibile dai componenti.
 *
 * Serve perché il banner (CookieBanner) e chi carica servizi di terze parti
 * (widget Trustpilot nel footer, player TikTok in home) stanno in punti diversi
 * dell'albero. Invece di far caricare tutto a prescindere e "sperare", ogni
 * componente si iscrive qui e monta il servizio solo quando il consenso c'è.
 *
 * Il valore iniziale è FALSO per tutte le categorie: prima che l'utente
 * risponda non deve partire niente. È il contrario del comportamento che
 * aveva il sito, dove Trustpilot e TikTok partivano comunque.
 */

export type Categoria = 'analytics' | 'marketing'

const stato: Record<Categoria, boolean> = { analytics: false, marketing: false }
const ascoltatori = new Set<() => void>()

/** La chiama il banner quando l'utente sceglie o cambia idea. */
export function aggiornaConsenso(nuovo: Partial<Record<Categoria, boolean>>): void {
  let cambiato = false
  for (const [categoria, valore] of Object.entries(nuovo) as [Categoria, boolean][]) {
    if (stato[categoria] !== valore) {
      stato[categoria] = valore
      cambiato = true
    }
  }
  if (cambiato) ascoltatori.forEach(avvisa => avvisa())
}

function iscriviti(avvisa: () => void): () => void {
  ascoltatori.add(avvisa)
  return () => ascoltatori.delete(avvisa)
}

/**
 * `true` solo dopo che l'utente ha accettato quella categoria.
 *
 * Durante il rendering sul server torna sempre `false`: il server non sa cosa
 * ha scelto chi visita, e partire dal "no" evita che il primo render mandi
 * richieste a terzi prima ancora dell'idratazione.
 */
export function useConsenso(categoria: Categoria): boolean {
  return useSyncExternalStore(
    iscriviti,
    () => stato[categoria],
    () => false,
  )
}
