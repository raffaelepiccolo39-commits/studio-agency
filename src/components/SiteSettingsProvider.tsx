'use client'

import { createContext, useContext } from 'react'
import { siteSettings as fallback, type SiteSettings } from '@/data/site'

/**
 * I contatti dell'agenzia, letti UNA volta dal layout (server) e resi
 * disponibili a tutti i componenti client senza passarli di prop in prop.
 *
 * Il valore di partenza è il fallback locale: un componente usato fuori dal
 * provider — o durante un errore di rendering — mostra comunque i contatti
 * giusti invece di campi vuoti.
 */
const SiteSettingsContext = createContext<SiteSettings>(fallback)

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettings
  children: React.ReactNode
}) {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext)
}
