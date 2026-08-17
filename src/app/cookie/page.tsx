import type { Metadata } from 'next'
import {
  PaginaLegale,
  Sezione,
  P,
  Elenco,
  Voce,
  Collegamento,
  Tabella,
} from '@/components/ui/PaginaLegale'

export const metadata: Metadata = {
  title: 'Cookie Policy — Pira Web',
  description: 'Informativa sull’utilizzo dei cookie e di tecnologie analoghe sul sito piraweb.it.',
  robots: { index: false, follow: true },
}

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️ Questa pagina deve rispecchiare quello che il sito fa DAVVERO.
// Se aggiungi o togli un servizio di terze parti (analytics, pixel, widget,
// player incorporati), aggiorna anche questa tabella e le categorie del banner
// in src/components/ui/CookieBanner.tsx.
//
// I caricamenti condizionati al consenso stanno tutti in CookieBanner.tsx e nei
// componenti che usano useConsenso() (src/lib/consenso.ts).
// ─────────────────────────────────────────────────────────────────────────────

export default function CookiePage() {
  return (
    <PaginaLegale
      titolo="COOKIE"
      titoloCorsivo="policy"
      aggiornata="17 agosto 2026"
      introduzione={
        <>
          Questa Cookie Policy descrive i cookie e le tecnologie analoghe utilizzati dal sito{' '}
          <strong>piraweb.it</strong>, ai sensi dell&apos;art. 122 del Codice Privacy, del
          Provvedimento del Garante per la protezione dei dati personali del 10 giugno 2021 e
          delle Linee guida EDPB.
        </>
      }
    >
      <Sezione titolo="1. Cosa sono i cookie">
        <P>
          I cookie sono piccoli file di testo che i siti visitati inviano al dispositivo
          dell&apos;utente, dove vengono memorizzati per essere ritrasmessi agli stessi siti alla
          visita successiva. Tecnologie analoghe — come i pixel di tracciamento e i contenuti
          incorporati da altri siti — possono raccogliere informazioni simili, e in questa
          informativa sono trattate allo stesso modo.
        </P>
      </Sezione>

      <Sezione titolo="2. Cookie e tecnologie utilizzati">
        <P>
          Il sito utilizza cookie tecnici, sempre attivi, e — <strong>solo previo consenso</strong>{' '}
          dell&apos;utente — cookie analitici e di marketing. Finché l&apos;utente non presta il
          consenso, i servizi di terze parti elencati più sotto <strong>non vengono caricati</strong>{' '}
          e non ricevono alcun dato.
        </P>

        <P><strong>Cookie tecnici e necessari</strong> — non richiedono consenso (art. 122 Codice Privacy).</P>
        <Tabella
          intestazioni={['Nome', 'Fornitore', 'Finalità', 'Durata']}
          righe={[
            ['cc_cookie', 'Pira Web (questo sito)', 'Memorizza le preferenze espresse su questa informativa, per non richiederle a ogni visita.', '6 mesi'],
            ['Cookie di infrastruttura', 'Vercel Inc.', 'Distribuzione delle pagine, bilanciamento del carico e sicurezza.', 'Sessione'],
          ]}
        />

        <P><strong>Cookie analitici</strong> — installati solo con il consenso alla categoria &ldquo;Analitici&rdquo;.</P>
        <Tabella
          intestazioni={['Nome', 'Fornitore', 'Finalità', 'Durata']}
          righe={[
            ['_ga, _ga_*', 'Google Ireland Ltd. (Google Analytics 4)', 'Statistiche aggregate sull\'uso del sito: pagine viste, provenienza, dispositivo.', 'Fino a 2 anni'],
          ]}
        />
        <P>
          Google Analytics è configurato in modalità <em>Consent Mode v2</em>: in assenza di
          consenso la memorizzazione di dati analitici e pubblicitari resta disattivata.
        </P>

        <P><strong>Cookie di marketing e contenuti di terze parti</strong> — installati solo con il consenso alla categoria &ldquo;Marketing&rdquo;.</P>
        <Tabella
          intestazioni={['Servizio', 'Fornitore', 'Finalità', 'Durata']}
          righe={[
            ['Meta Pixel (_fbp)', 'Meta Platforms Ireland Ltd.', 'Misurazione delle campagne pubblicitarie e pubblico personalizzato.', 'Fino a 3 mesi'],
            ['Widget recensioni e inviti', 'Trustpilot A/S', 'Mostra le recensioni nel piè di pagina e gestisce gli inviti a recensire.', 'Variabile, definita da Trustpilot'],
            ['Player video incorporati', 'TikTok Technology Ltd.', 'Riproduzione dei video nella sezione contenuti della home.', 'Variabile, definita da TikTok'],
          ]}
        />
        <P>
          Senza il consenso alla categoria &ldquo;Marketing&rdquo; i video TikTok non vengono
          caricati: al loro posto compare un&apos;anteprima statica con un collegamento che apre
          il video sul sito di TikTok, e il widget Trustpilot è sostituito da un semplice
          collegamento. In entrambi i casi nessun dato viene trasmesso finché non si clicca.
        </P>
      </Sezione>

      <Sezione titolo="3. Come prestare, modificare o revocare il consenso">
        <P>
          Alla prima visita viene mostrato un banner che permette di accettare tutti i cookie,
          rifiutarli o scegliere per categoria. La scelta può essere{' '}
          <strong>modificata o revocata in qualsiasi momento</strong> dal collegamento{' '}
          &ldquo;Preferenze cookie&rdquo; presente nel piè di pagina di ogni pagina del sito.
        </P>
        <P>
          La revoca del consenso non pregiudica la liceità del trattamento effettuato prima
          della revoca. I cookie tecnici non possono essere disattivati dal banner, ma restano
          gestibili dalle impostazioni del browser: la loro disattivazione può però comportare
          il malfunzionamento di alcune sezioni del sito.
        </P>
      </Sezione>

      <Sezione titolo="4. Trasferimento dei dati fuori dall'Unione Europea">
        <P>
          Alcuni dei fornitori sopra elencati — Google, Meta e TikTok — appartengono a gruppi con
          sede negli Stati Uniti e possono trasferire i dati al di fuori dello Spazio Economico
          Europeo. Tali trasferimenti avvengono sulla base delle Clausole Contrattuali Standard
          approvate dalla Commissione Europea e, ove applicabile, dell&apos;adesione dei fornitori
          al <em>EU-U.S. Data Privacy Framework</em>. Prestando il consenso alla relativa categoria
          l&apos;utente acconsente anche a tale trasferimento.
        </P>
      </Sezione>

      <Sezione titolo="5. Gestione dei cookie dal browser">
        <P>
          Oltre al banner, l&apos;utente può gestire o eliminare i cookie direttamente dal proprio
          browser. Le istruzioni sono disponibili sui siti ufficiali:
        </P>
        <Elenco>
          <Voce><Collegamento href="https://support.google.com/chrome/answer/95647">Google Chrome</Collegamento></Voce>
          <Voce><Collegamento href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie">Mozilla Firefox</Collegamento></Voce>
          <Voce><Collegamento href="https://support.apple.com/it-it/guide/safari/sfri11471/mac">Safari</Collegamento></Voce>
          <Voce><Collegamento href="https://support.microsoft.com/it-it/microsoft-edge">Microsoft Edge</Collegamento></Voce>
        </Elenco>
      </Sezione>

      <Sezione titolo="6. Contatti">
        <P>
          Per qualsiasi richiesta scrivi a{' '}
          <Collegamento href="mailto:info@piraweb.it">info@piraweb.it</Collegamento>. Per maggiori
          informazioni sul trattamento dei dati personali consulta la{' '}
          <Collegamento href="/privacy">Privacy Policy</Collegamento>.
        </P>
      </Sezione>
    </PaginaLegale>
  )
}
