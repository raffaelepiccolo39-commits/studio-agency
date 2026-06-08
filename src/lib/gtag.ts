// Utility per inviare l'evento di conversione "Lead" a GA4 (gtag.js) e Meta Pixel (fbq).
// Sicuro lato server (no-op) e se le librerie non sono ancora caricate.

export const GA_ID = 'G-P84R9MYBB5'
export const META_PIXEL_ID = '33389650943984110'

type Fn = (...args: unknown[]) => void

export function trackLead(formName: string): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as { gtag?: Fn; fbq?: Fn }
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'generate_lead', { form_name: formName })
  }
  if (typeof w.fbq === 'function') {
    w.fbq('track', 'Lead', { content_name: formName })
  }
}
