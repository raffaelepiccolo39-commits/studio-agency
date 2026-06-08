'use client'

import { useEffect } from 'react'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import * as CookieConsent from 'vanilla-cookieconsent'
import { META_PIXEL_ID } from '@/lib/gtag'

type Win = Window & { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void; _fbq?: unknown }

let pixelLoaded = false

// Carica e inizializza il Meta Pixel SOLO dopo il consenso marketing
function loadMetaPixel() {
  if (pixelLoaded || typeof window === 'undefined') return
  pixelLoaded = true
  /* eslint-disable */
  // @ts-ignore — snippet ufficiale Meta Pixel
  !(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  /* eslint-enable */
  const w = window as Win
  w.fbq?.('init', META_PIXEL_ID)
  w.fbq?.('track', 'PageView')
}

function applyConsent() {
  const analytics = CookieConsent.acceptedCategory('analytics')
  const marketing = CookieConsent.acceptedCategory('marketing')
  const w = window as Win
  // Google Consent Mode v2
  w.gtag?.('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  })
  // Meta Pixel solo con consenso marketing
  if (marketing) loadMetaPixel()
}

export default function CookieBanner() {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: { layout: 'box', position: 'bottom left' },
        preferencesModal: { layout: 'box' },
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {},
        marketing: {},
      },
      language: {
        default: 'it',
        translations: {
          it: {
            consentModal: {
              title: 'Rispettiamo la tua privacy 🍪',
              description:
                'Usiamo cookie tecnici necessari al funzionamento del sito e, previo consenso, cookie analitici e di marketing per misurare e migliorare l’esperienza. Puoi accettarli tutti, rifiutarli o personalizzare le tue scelte.',
              acceptAllBtn: 'Accetta tutti',
              acceptNecessaryBtn: 'Rifiuta',
              showPreferencesBtn: 'Personalizza',
              footer: '<a href="/privacy">Privacy Policy</a> · <a href="/cookie">Cookie Policy</a>',
            },
            preferencesModal: {
              title: 'Preferenze cookie',
              acceptAllBtn: 'Accetta tutti',
              acceptNecessaryBtn: 'Rifiuta tutti',
              savePreferencesBtn: 'Salva preferenze',
              closeIconLabel: 'Chiudi',
              sections: [
                {
                  title: 'Utilizzo dei cookie',
                  description:
                    'Gestisci le tue preferenze. I cookie strettamente necessari sono sempre attivi; gli altri vengono installati solo con il tuo consenso.',
                },
                {
                  title: 'Strettamente necessari',
                  description: 'Indispensabili per il funzionamento del sito. Non possono essere disattivati.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Analitici',
                  description: 'Ci aiutano a capire come viene usato il sito (Google Analytics 4) in forma aggregata.',
                  linkedCategory: 'analytics',
                },
                {
                  title: 'Marketing',
                  description: 'Permettono di misurare le campagne pubblicitarie e mostrare annunci pertinenti (Meta Pixel).',
                  linkedCategory: 'marketing',
                },
                {
                  title: 'Maggiori informazioni',
                  description: 'Per qualsiasi domanda consulta la nostra <a href="/cookie">Cookie Policy</a>.',
                },
              ],
            },
          },
        },
      },
      onConsent: applyConsent,
      onChange: applyConsent,
    })
  }, [])

  return null
}
