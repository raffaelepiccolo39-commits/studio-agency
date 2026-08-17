import type { Metadata } from 'next'
import {
  PaginaLegale,
  Sezione,
  P,
  Elenco,
  Voce,
  Collegamento,
} from '@/components/ui/PaginaLegale'

export const metadata: Metadata = {
  title: 'Privacy Policy — Pira Web',
  description: 'Informativa sul trattamento dei dati personali degli utenti del sito piraweb.it, ai sensi del GDPR.',
  robots: { index: false, follow: true },
}

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️ Questa informativa deve rispecchiare dove finiscono DAVVERO i dati.
// Se cambi la rotta /api/contact o /api/candidatura — nuovo destinatario, nuovo
// campo raccolto, nuovo servizio — aggiorna le sezioni 2 e 5.
// ─────────────────────────────────────────────────────────────────────────────

export default function PrivacyPage() {
  return (
    <PaginaLegale
      titolo="PRIVACY"
      titoloCorsivo="policy"
      aggiornata="17 agosto 2026"
      introduzione={
        <>
          La presente informativa descrive le modalità di trattamento dei dati personali degli
          utenti che consultano il sito <strong>piraweb.it</strong>, ai sensi dell&apos;art. 13
          del Regolamento UE 2016/679 (GDPR).
        </>
      }
    >
      <Sezione titolo="1. Titolare del trattamento">
        <P>
          Il Titolare del trattamento è <strong>Pira Web S.r.l.</strong>, con sede legale in
          Via A. Petrillo n° 171, 81030 Casapesenna (CE), Italia — P.IVA IT04891370613.
        </P>
        <P>
          Per qualsiasi richiesta relativa al trattamento dei dati personali è possibile
          contattare il Titolare all&apos;indirizzo email:{' '}
          <Collegamento href="mailto:info@piraweb.it">info@piraweb.it</Collegamento>
        </P>
      </Sezione>

      <Sezione titolo="2. Dati raccolti">
        <P>Il sito raccoglie:</P>
        <Elenco>
          <Voce>
            <strong>Dati dei moduli di contatto e richiesta consulenza</strong> — nome e cognome,
            azienda, indirizzo email, numero di telefono, servizio di interesse e messaggio.
          </Voce>
          <Voce>
            <strong>Dati del questionario di qualificazione</strong> — oltre ai dati di contatto,
            informazioni sull&apos;attività dell&apos;utente: ruolo, settore, servizi di interesse,
            obiettivi, tempi e <strong>fascia di budget</strong>. Sono informazioni di natura
            economica sull&apos;impresa e vengono trattate con la stessa riservatezza dei dati di
            contatto.
          </Voce>
          <Voce>
            <strong>Dati delle candidature</strong> (modulo &ldquo;Lavora con noi&rdquo;) — dati
            di contatto, ruolo per cui ci si candida ed eventuale curriculum o portfolio allegato,
            con i dati personali in esso contenuti.
          </Voce>
          <Voce>
            <strong>Dati di navigazione</strong> raccolti automaticamente dai sistemi informatici:
            indirizzo IP, tipo di browser, sistema operativo, pagine visitate, orari di accesso.
          </Voce>
          <Voce>
            <strong>Dati statistici e di misurazione</strong> raccolti tramite cookie, solo previo
            consenso: vedi la <Collegamento href="/cookie">Cookie Policy</Collegamento>.
          </Voce>
        </Elenco>
      </Sezione>

      <Sezione titolo="3. Finalità e base giuridica">
        <P>I dati sono trattati per le seguenti finalità:</P>
        <Elenco>
          <Voce>
            Rispondere alle richieste di informazioni, preventivo o consulenza inviate tramite i
            moduli, anche per il tramite del sistema gestionale interno del Titolare
            (base giuridica: misure precontrattuali, art. 6.1.b GDPR).
          </Voce>
          <Voce>
            Valutare le candidature ricevute e gestire il processo di selezione
            (misure precontrattuali, art. 6.1.b GDPR).
          </Voce>
          <Voce>Adempiere agli obblighi di legge (art. 6.1.c GDPR).</Voce>
          <Voce>
            Garantire la sicurezza tecnica del sito e prevenire abusi, anche mediante limiti
            automatici al numero di invii dai moduli (legittimo interesse, art. 6.1.f GDPR).
          </Voce>
          <Voce>
            Misurare l&apos;utilizzo del sito e l&apos;efficacia delle campagne pubblicitarie, e
            mostrare contenuti ospitati da terzi (<strong>consenso</strong>, art. 6.1.a GDPR e
            art. 122 Codice Privacy). Il consenso è revocabile in ogni momento.
          </Voce>
        </Elenco>
      </Sezione>

      <Sezione titolo="4. Modalità e tempi di conservazione">
        <P>
          I dati sono trattati con strumenti informatici, adottando misure tecniche e
          organizzative adeguate a garantirne riservatezza e integrità. I dati raccolti tramite i
          moduli sono conservati per il tempo strettamente necessario a evadere la richiesta e,
          successivamente, per un massimo di 24 mesi, salvo obblighi di legge che impongano tempi
          diversi. Le candidature non selezionate sono conservate per un massimo di 24 mesi, per
          poter valutare il profilo in caso di posizioni successive.
        </P>
      </Sezione>

      <Sezione titolo="5. Destinatari dei dati">
        <P>
          I dati possono essere comunicati a soggetti che svolgono attività strumentali al
          funzionamento del sito e dei servizi connessi, nominati responsabili del trattamento
          ex art. 28 GDPR, tra cui:
        </P>
        <Elenco>
          <Voce><strong>Vercel Inc.</strong> — hosting e distribuzione del sito.</Voce>
          <Voce>
            <strong>Sistema gestionale interno di Pira Web</strong> — i dati dei moduli di
            contatto, di richiesta consulenza e del questionario vengono registrati nel sistema
            gestionale del Titolare, utilizzato per la gestione delle relazioni con clienti e
            potenziali clienti. L&apos;accesso è riservato al personale autorizzato.
          </Voce>
          <Voce>
            <strong>Resend</strong> — invio delle comunicazioni email generate da{' '}
            <strong>tutti i moduli del sito</strong>, incluse le candidature con il relativo
            allegato.
          </Voce>
          <Voce>
            <strong>Formspree</strong> — copia di riserva degli invii dei moduli, per non perdere
            richieste in caso di indisponibilità del canale principale.
          </Voce>
          <Voce><strong>Sanity</strong> — sistema di gestione dei contenuti (CMS) del sito.</Voce>
          <Voce>
            <strong>Google, Meta, Trustpilot e TikTok</strong> — limitatamente ai dati raccolti
            tramite cookie e contenuti incorporati, e <strong>solo previo consenso</strong>: vedi
            la <Collegamento href="/cookie">Cookie Policy</Collegamento>.
          </Voce>
        </Elenco>
        <P>
          I dati non sono oggetto di diffusione né di cessione a terzi per finalità commerciali
          proprie di questi ultimi.
        </P>
      </Sezione>

      <Sezione titolo="6. Trasferimento dei dati fuori dall'Unione Europea">
        <P>
          Alcuni fornitori hanno sede o infrastrutture al di fuori dello Spazio Economico Europeo.
          I relativi trasferimenti avvengono sulla base delle Clausole Contrattuali Standard
          approvate dalla Commissione Europea e, ove applicabile, dell&apos;adesione dei fornitori
          al <em>EU-U.S. Data Privacy Framework</em>.
        </P>
      </Sezione>

      <Sezione titolo="7. Diritti dell'interessato">
        <P>
          In ogni momento l&apos;utente può esercitare i diritti previsti dagli artt. 15-22 del
          GDPR: accesso ai dati, rettifica, cancellazione, limitazione del trattamento,
          portabilità, opposizione. Per esercitare tali diritti o presentare reclamo è possibile
          contattare il Titolare all&apos;indirizzo{' '}
          <Collegamento href="mailto:info@piraweb.it">info@piraweb.it</Collegamento> o rivolgersi
          al{' '}
          <Collegamento href="https://www.garanteprivacy.it">
            Garante per la protezione dei dati personali
          </Collegamento>
          .
        </P>
      </Sezione>

      <Sezione titolo="8. Cookie">
        <P>
          Per informazioni sull&apos;utilizzo dei cookie e su come revocare il consenso consulta
          la <Collegamento href="/cookie">Cookie Policy</Collegamento>.
        </P>
      </Sezione>

      <Sezione titolo="9. Modifiche">
        <P>
          Il Titolare si riserva il diritto di modificare la presente informativa pubblicandone la
          versione aggiornata su questa pagina. Si invita l&apos;utente a consultarla
          periodicamente.
        </P>
      </Sezione>
    </PaginaLegale>
  )
}
