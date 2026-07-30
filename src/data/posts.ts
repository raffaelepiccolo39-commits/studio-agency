// Dati canonici del blog. Fonte unica usata sia dal seed Sanity sia (dopo lo
// swap) dalle pagine come fallback quando il CMS non è configurato/popolato.
// Regola editoriale: MAI cifre o prezzi negli articoli — il costo dipende
// dall'esigenza del cliente e si definisce in preventivo.

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'li'; text: string }

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  featured: boolean
  publishedAt: string // ISO
  date: string // display, es. "20 Feb 2025"
  author: { name: string; role: string }
  coverImage?: string // URL Sanity CDN o path locale in /public
  content: PostBlock[]
}

const AUTORE = { name: 'Pira Web', role: 'Creative Agency' }

export const posts: Post[] = [
  {
    slug: 'da-cosa-dipende-costo-ecommerce',
    title: 'Da cosa dipende davvero il costo di un e-commerce',
    excerpt:
      'Non esiste un listino: due negozi online con lo stesso numero di prodotti possono richiedere lavoro completamente diverso. Ecco le variabili che compongono un preventivo, spiegate una per una.',
    category: 'E-commerce',
    readTime: '8 min',
    featured: true,
    publishedAt: '2026-07-29',
    date: '29 Lug 2026',
    author: AUTORE,
    coverImage: '/blog/da-cosa-dipende-costo-ecommerce.jpg',
    content: [
      { type: 'p', text: "«Quanto costa un e-commerce?» è la prima domanda che ci arriva, quasi sempre per telefono e quasi sempre prima ancora di dirci cosa si vende. È una domanda legittima: chi la fa deve capire se il progetto sta dentro il budget dell'anno." },
      { type: 'p', text: "La risposta onesta però è che un listino non esiste, e chi te ne mostra uno ti sta vendendo un pacchetto, non una soluzione. Due aziende che vendono lo stesso numero di prodotti possono avere bisogno di due progetti profondamente diversi: dipende da come sono fatti quei prodotti, da cosa hai già in casa e da cosa il negozio deve fare dopo il lancio." },
      { type: 'p', text: "Quello che possiamo fare è aprire la scatola. Queste sono le variabili che spostano davvero il lavoro — e quindi il preventivo. Leggerle ti serve a due cose: capire cosa stai comprando e riuscire a confrontare due offerte diverse senza fermarti al totale in fondo alla pagina." },

      { type: 'h2', text: 'Quanti prodotti hai, e soprattutto come sono fatti' },
      { type: 'p', text: "Il numero di prodotti conta meno di quanto si pensi. Conta molto di più la loro complessità. Un catalogo di trecento articoli tutti uguali tranne il colore si carica in modo quasi automatico. Trenta prodotti con varianti, misure, materiali diversi e regole di prezzo differenti richiedono un lavoro di struttura molto più lungo." },
      { type: 'p', text: 'Le domande che spostano il lavoro sono queste:' },
      { type: 'li', text: 'Quante varianti ha in media un prodotto (taglia, colore, misura, confezione)?' },
      { type: 'li', text: 'I prezzi cambiano in base alla quantità o al tipo di cliente?' },
      { type: 'li', text: 'Le schede prodotto esistono già scritte, o vanno create da zero?' },
      { type: 'li', text: 'Hai già i dati in un gestionale o sono su un foglio Excel (o nella testa di qualcuno)?' },
      { type: 'p', text: "Quest'ultimo punto è quello che sorprende di più chi ci lavora per la prima volta: sistemare i dati di partenza è spesso una fetta importante del progetto, e non si vede da fuori." },

      { type: 'h2', text: 'I cataloghi tecnici sono un progetto dentro il progetto' },
      { type: 'p', text: "Ci sono settori in cui l'utente non cerca un prodotto: cerca il prodotto giusto per il suo caso, e se sbaglia acquisto il reso è quasi certo. Ricambistica, componentistica, materiali edili, articoli sanitari funzionano così." },
      { type: 'p', text: "Quando abbiamo lavorato all'e-commerce di Alba Ricambi il problema non era mostrare i prodotti: era permettere a un cliente di arrivare al pezzo compatibile con la sua auto senza chiamare. Questo significa costruire una ricerca per marca, modello e anno, gestire le compatibilità, esporre codici OEM e specifiche tecniche su ogni scheda. È un lavoro di architettura dei dati che un negozio di abbigliamento non ha." },
      { type: 'p', text: 'Se il tuo settore è di questo tipo, la voce più pesante del preventivo non sarà la grafica. Sarà il modo in cui le informazioni vengono organizzate.' },

      { type: 'h2', text: 'Le foto: la voce che quasi nessuno mette a preventivo' },
      { type: 'p', text: "Online il cliente non tocca il prodotto. Vede solo quello che gli mostri, e decide su quello. Eppure la fotografia è la voce che più spesso viene data per scontata — «le foto ce le ho già» — e più spesso fa slittare i lanci." },
      { type: 'p', text: 'Le foto che hai già di solito non bastano quando:' },
      { type: 'li', text: 'sono scatti fatti in negozio con il telefono, con luci e sfondi diversi tra loro' },
      { type: 'li', text: 'hanno risoluzione troppo bassa per lo zoom sulla scheda prodotto' },
      { type: 'li', text: "mostrano il prodotto ma non l'uso, e nei settori d'arredo e tessile è l'ambientazione che fa comprare" },
      { type: 'p', text: "Sui progetti tessili che abbiamo seguito — Con.tex Biancheria, Maestri Cotonieri — la differenza tra una scheda che converte e una che non converte è quasi sempre lì: un set coordinato fotografato piatto su un tavolo è un tessuto, lo stesso set fotografato su un letto è una camera che il cliente si immagina in casa sua." },
      { type: 'p', text: "Va deciso in partenza chi produce quelle immagini: è una scelta che cambia sia il preventivo sia i tempi di consegna." },

      { type: 'h2', text: 'Le integrazioni con quello che usi già' },
      { type: 'p', text: "Un e-commerce isolato è facile da fare e faticoso da gestire: qualcuno dovrà ricopiare a mano ordini, giacenze e spedizioni tutti i giorni. Un e-commerce collegato ai tuoi strumenti costa di più da costruire e ti restituisce ore ogni settimana." },
      { type: 'p', text: 'Le integrazioni che pesano di più:' },
      { type: 'li', text: 'gestionale o software di magazzino, per allineare giacenze e anagrafiche prodotto' },
      { type: 'li', text: 'corrieri, per calcolare le spedizioni ed emettere le etichette senza uscire dal negozio' },
      { type: 'li', text: 'fatturazione elettronica' },
      { type: 'li', text: 'marketplace e canali social, se vendi anche altrove e non vuoi disallineare i prezzi' },
      { type: 'p', text: "Non tutte servono subito. È però una decisione da prendere all'inizio, perché aggiungerle dopo su una struttura che non le prevedeva costa più che prevederle." },

      { type: 'h2', text: 'Chi scrive i testi' },
      { type: 'p', text: 'Le descrizioni prodotto sono la parte che i clienti sottovalutano di più e che Google guarda di più. Un catalogo con le descrizioni copiate dal fornitore parte con un handicap: le stesse identiche parole sono su decine di altri siti, e non c\'è motivo per cui il tuo debba comparire prima.' },
      { type: 'p', text: "Anche qui la scelta è aperta: i testi li scrivi tu, li scriviamo noi, o li scriviamo insieme partendo dalle tue schede tecniche. Le tre strade hanno impegni e costi diversi, e vanno messe sul tavolo prima di firmare, non dopo." },

      { type: 'h2', text: 'La piattaforma non è una questione di gusto' },
      { type: 'p', text: 'Shopify, WooCommerce o uno sviluppo su misura non sono tre livelli di qualità: sono tre strumenti con logiche diverse.' },
      { type: 'h3', text: 'Shopify' },
      { type: 'p', text: "Tempi di avvio più rapidi, manutenzione tecnica a carico della piattaforma, un canone mensile. Va benissimo quando l'obiettivo è vendere in fretta e bene, con requisiti standard." },
      { type: 'h3', text: 'WooCommerce' },
      { type: 'p', text: 'Più libertà di personalizzazione e nessun canone di piattaforma, ma hosting, aggiornamenti e sicurezza restano una tua responsabilità (o della tua agenzia). Ha senso quando il sito deve fare anche altro oltre a vendere.' },
      { type: 'h3', text: 'Sviluppo su misura' },
      { type: 'p', text: 'Si giustifica quando hai una logica di vendita che le piattaforme non prevedono: configuratori, listini per cliente, flussi B2B particolari. Fuori da quei casi è una spesa che non ti torna indietro.' },
      { type: 'p', text: 'La scelta sbagliata non si paga il primo mese. Si paga al secondo anno, quando il negozio non riesce a fare una cosa che ti serve.' },

      { type: 'h2', text: 'Il dopo-lancio è la parte che decide se rientri' },
      { type: 'p', text: "Un e-commerce online non è un e-commerce che vende. Il giorno del lancio non arriva nessuno: il traffico va costruito, con contenuti, campagne, presenza social, posizionamento sui motori di ricerca. È la fase in cui l'investimento comincia a restituire qualcosa, ed è anche quella che più spesso resta fuori dai preventivi che confronti." },
      { type: 'p', text: 'Quando ricevi un\'offerta, guarda se comprende: aggiornamenti e manutenzione, monitoraggio delle vendite e del comportamento degli utenti, gestione delle campagne, produzione di contenuti nel tempo. Se non c\'è nulla di tutto questo, quel preventivo è più basso perché contiene meno cose, non perché sia più conveniente.' },

      { type: 'h2', text: 'Come leggere due preventivi diversi' },
      { type: 'p', text: 'Se hai due offerte davanti e vuoi capirle davvero, queste sono le domande da fare a entrambe le agenzie:' },
      { type: 'li', text: "Chi carica i prodotti e chi scrive le schede? È incluso o è un'attività mia?" },
      { type: 'li', text: 'Le foto sono comprese? Di che tipo, quante, dove si scattano?' },
      { type: 'li', text: 'Quali integrazioni sono previste e quali costerebbero a parte?' },
      { type: 'li', text: 'Il sito lo posso aggiornare da solo dopo la consegna, o devo tornare da voi per ogni modifica?' },
      { type: 'li', text: 'Dopo il lancio cosa succede: chi segue manutenzione, dati e promozione?' },
      { type: 'li', text: 'A chi appartengono dominio, hosting e accessi?' },
      { type: 'p', text: "Quest'ultima è la più importante e la più trascurata: gli accessi devono essere intestati a te. Sempre. È la differenza tra avere un fornitore e dipendere da un fornitore." },

      { type: 'h2', text: 'In sintesi' },
      { type: 'p', text: "Il costo di un e-commerce non dipende dal numero di pagine: dipende da quanto è complesso il tuo catalogo, da quanto materiale hai già pronto, da quanti sistemi deve parlare e da cosa vuoi che succeda dopo il lancio. Per questo il preventivo serio arriva dopo una conversazione, non prima." },
      { type: 'p', text: "Se stai valutando il progetto e vuoi capire dove si collocherebbe il tuo caso, raccontacelo: ti diciamo quali di queste variabili ti riguardano davvero e quali no." },
    ],
  },

  {
    slug: 'ecommerce-non-vende-cause',
    title: 'Ho un e-commerce ma non vende: le cause più frequenti',
    excerpt:
      'Il negozio è online, il catalogo è caricato, gli ordini non arrivano. Prima di rifare tutto da capo, conviene capire in quale punto esatto si perde il cliente.',
    category: 'E-commerce',
    readTime: '8 min',
    featured: false,
    publishedAt: '2026-07-22',
    date: '22 Lug 2026',
    author: AUTORE,
    coverImage: '/blog/ecommerce-non-vende-cause.jpg',
    content: [
      { type: 'p', text: "È la telefonata che riceviamo più spesso: «abbiamo fatto l'e-commerce l'anno scorso, ma non vende». Quasi sempre la richiesta che segue è «rifacciamolo». Quasi sempre è la mossa sbagliata, o almeno prematura." },
      { type: 'p', text: "Un negozio online che non vende ha un problema in un punto preciso di un percorso: le persone non arrivano, arrivano quelle sbagliate, arrivano ma non aggiungono al carrello, oppure aggiungono e non completano l'ordine. Sono quattro problemi diversi con quattro soluzioni diverse, e rifare la grafica ne risolve al massimo uno." },
      { type: 'p', text: 'Ecco le cause che troviamo più spesso, in ordine di frequenza.' },

      { type: 'h2', text: '1. Il problema non è il negozio: è che non ci entra nessuno' },
      { type: 'p', text: "Prima di guardare qualsiasi altra cosa, guarda quante persone visitano il sito. Se sono poche decine al mese, non hai un problema di conversione: hai un problema di traffico. Nessun ritocco al pulsante «acquista» cambierà qualcosa, perché non c'è nessuno che possa premerlo." },
      { type: 'p', text: "È la situazione più comune in assoluto, e nasce da un equivoco: l'idea che pubblicare un e-commerce sia come aprire un negozio in centro. Non lo è. È come aprire un negozio in una zona che non esiste ancora sulle mappe. Il passaggio va costruito: contenuti che rispondono alle ricerche delle persone, presenza social, campagne, email a chi ha già comprato." },

      { type: 'h2', text: '2. Il traffico arriva, ma è quello sbagliato' },
      { type: 'p', text: "Molte visite e zero ordini è un sintomo diverso, e spesso più caro: significa che stai pagando per far entrare persone che non erano lì per comprare." },
      { type: 'p', text: 'Succede tipicamente quando:' },
      { type: 'li', text: 'le campagne puntano a un pubblico troppo ampio, scelto per numero e non per intenzione' },
      { type: 'li', text: 'il sito intercetta ricerche informative («come si lava la seta») senza avere un percorso che porti al prodotto' },
      { type: 'li', text: 'i post social portano curiosi su una home generica invece che sulla pagina del prodotto di cui si parlava' },
      { type: 'p', text: 'La cura non è più traffico. È traffico più stretto, e un percorso che accompagni chi arriva fino alla scheda giusta.' },

      { type: 'h2', text: '3. Le schede prodotto non rispondono alle obiezioni' },
      { type: 'p', text: "Chi compra online ha sempre le stesse paure: non sarà della misura giusta, il materiale non sarà come sembra, arriverà tardi, e se sbaglio non riesco a restituirlo. Se la scheda prodotto non risponde a queste quattro domande, il cliente non scrive per chiedere: chiude la pagina." },
      { type: 'p', text: 'Una scheda completa contiene:' },
      { type: 'li', text: 'misure reali e, dove serve, una guida per capire quale scegliere' },
      { type: 'li', text: 'materiali e composizione, spiegati in parole normali' },
      { type: 'li', text: 'foto da più angolazioni, con almeno un dettaglio ravvicinato e una immagine in uso' },
      { type: 'li', text: 'tempi di consegna dichiarati prima del carrello, non dopo' },
      { type: 'li', text: 'condizioni di reso scritte in modo comprensibile' },
      { type: 'p', text: "Nei cataloghi tecnici questo vale il doppio: senza compatibilità e codici espliciti l'utente non rischia l'acquisto." },

      { type: 'h2', text: '4. Le spese di spedizione compaiono troppo tardi' },
      { type: 'p', text: "È la prima causa di carrelli abbandonati, e la più evitabile. Il cliente arriva al checkout convinto di spendere una cifra, vede il totale cambiare e se ne va — non tanto per l'importo, quanto per la sensazione di essere stato portato lì senza saperlo." },
      { type: 'p', text: "Dichiarare le spedizioni in anticipo, anche quando non sono gratuite, fa perdere qualche visita e salva molti ordini. La trasparenza in questa fase non è una questione morale: è una questione di conversione." },

      { type: 'h2', text: '5. Il checkout chiede troppo' },
      { type: 'p', text: 'Ogni campo del modulo è un motivo per rinunciare. Registrazione obbligatoria prima di poter comprare, dati non necessari, nessun metodo di pagamento oltre alla carta: sono tutti punti in cui si perdono ordini già decisi.' },
      { type: 'p', text: 'Le correzioni sono quasi sempre rapide: permettere l\'acquisto da ospite, ridurre i campi al minimo indispensabile, offrire più metodi di pagamento, mostrare a che punto è il processo.' },

      { type: 'h2', text: '6. Il sito è lento, soprattutto da telefono' },
      { type: 'p', text: "La maggior parte del traffico arriva da smartphone, spesso con connessioni non ottime. Se le pagine impiegano troppo a caricarsi, una parte dei visitatori se ne va prima ancora di vedere il prodotto: sono vendite che non compaiono in nessuna statistica, perché quelle persone non sono mai entrate davvero." },
      { type: 'p', text: 'Le cause tipiche sono immagini caricate a piena risoluzione, troppi script di terze parti, temi appesantiti da funzioni che non usi. Sono interventi tecnici, non estetici, e di solito hanno il miglior rapporto tra sforzo e risultato.' },

      { type: 'h2', text: '7. Manca ogni segnale di fiducia' },
      { type: 'p', text: 'Un negozio online sconosciuto deve dimostrare di essere una azienda vera. Recensioni, foto reali dell\'attività, un indirizzo, un numero di telefono che risponde, condizioni chiare: non sono dettagli di contorno, sono ciò che convince un estraneo a lasciarti i suoi dati di pagamento.' },

      { type: 'h2', text: '8. Nessuno richiama chi era quasi arrivato' },
      { type: 'p', text: 'Una parte fisiologica dei clienti abbandona il carrello. La differenza tra chi vende e chi non vende è che il primo li ricontatta: una email al momento giusto recupera una quota di ordini che altrimenti si perdono e basta. È tra le attività più semplici da attivare e tra le più spesso dimenticate.' },

      { type: 'h2', text: 'Come capire qual è il tuo caso' },
      { type: 'p', text: "Non serve indovinare: i dati ci sono già. Guarda quante persone entrano, quante arrivano alla scheda prodotto, quante aggiungono al carrello, quante iniziano il checkout, quante concludono. Il punto in cui il numero crolla è il tuo problema — e in genere è uno solo, non otto." },
      { type: 'p', text: "Da lì si decide se serve lavorare sul traffico, sui contenuti, sulla tecnica o sull'esperienza d'acquisto. Rifare il sito da zero, quando serve davvero, viene dopo questa analisi, non prima." },
      { type: 'p', text: 'Se vuoi capire dove si ferma il tuo, possiamo guardare insieme i dati del tuo negozio e dirti su cosa intervenire per primo.' },
    ],
  },

  {
    slug: 'sito-non-porta-clienti',
    title: 'Perché il tuo sito non porta clienti (e non è colpa di Google)',
    excerpt:
      "Un sito aziendale che non genera contatti ha quasi sempre una di queste cause. Nessuna riguarda l'algoritmo di Google, e una in particolare è invisibile finché non la cerchi.",
    category: 'Marketing',
    readTime: '7 min',
    featured: false,
    publishedAt: '2026-07-15',
    date: '15 Lug 2026',
    author: AUTORE,
    coverImage: '/blog/sito-non-porta-clienti.jpg',
    content: [
      { type: 'p', text: "«Abbiamo il sito da tre anni e non ci ha mai portato un cliente.» Nella maggior parte dei casi la conclusione che ne segue è che il sito non serve, o che è colpa di Google che «non ti mette in prima pagina»." },
      { type: 'p', text: 'Quasi mai è così. Le cause reali sono poche, concrete e quasi tutte risolvibili senza rifare niente da capo.' },

      { type: 'h2', text: 'Il sito è una brochure, non un percorso' },
      { type: 'p', text: "Molti siti aziendali raccontano l'azienda — chi siamo, la nostra storia, i nostri valori — e si fermano lì. Il visitatore legge, annuisce e se ne va, perché non gli è mai stato chiesto di fare niente." },
      { type: 'p', text: "Un sito che genera contatti ha sempre un'azione evidente su ogni pagina: chiedere un preventivo, prenotare una chiamata, scrivere su WhatsApp, scaricare il catalogo. Una sola, chiara, ripetuta. Non tre pulsanti diversi che si annullano a vicenda." },

      { type: 'h2', text: 'Non risponde alle domande che le persone fanno prima di comprare' },
      { type: 'p', text: 'Le persone non cercano il nome della tua azienda: non lo conoscono. Cercano il problema che hanno. Cercano come si sceglie un materiale, quanto dura un intervento, se una cosa è compatibile con un\'altra, cosa conviene fare nel loro caso.' },
      { type: 'p', text: "Se il tuo sito ha solo le pagine dei servizi, non intercetta nessuna di queste ricerche. Ogni domanda ricorrente che ricevi al telefono è una pagina che potresti avere e non hai: è il modo più diretto di farsi trovare da chi non ti conosce ancora." },

      { type: 'h2', text: 'Nessuno ha mai detto a Google che esisti' },
      { type: 'p', text: 'Capita più spesso di quanto sembri: siti online da anni che non sono mai stati indicizzati correttamente, perché è rimasto attivo un blocco messo durante lo sviluppo, o perché non è mai stata inviata una sitemap. Il sito è visibile a chi conosce l\'indirizzo e invisibile a tutti gli altri.' },
      { type: 'p', text: "È una verifica di cinque minuti, e vale la pena farla prima di qualsiasi altra considerazione: cerca su Google il tuo indirizzo preceduto da «site:». Se non compare quasi nulla, hai trovato il problema." },

      { type: 'h2', text: 'Se lavori sul territorio e non hai la scheda Google' },
      { type: 'p', text: "Per chi lavora in una zona precisa — un negozio, uno studio, un'impresa che opera in provincia — la scheda Google Business è spesso più decisiva del sito stesso. È quella che compare nella mappa quando qualcuno cerca il tuo servizio nella tua zona, con orari, telefono, foto e recensioni." },
      { type: 'p', text: 'Una scheda incompleta, con foto vecchie e nessuna recensione recente, ti esclude da quelle ricerche a prescindere da quanto sia bello il sito.' },

      { type: 'h2', text: 'I contatti arrivano, ma tu non li ricevi' },
      { type: 'p', text: "Questa è la causa più sottovalutata e la più dolorosa, perché non lascia tracce: il modulo di contatto mostra il messaggio verde «richiesta inviata», il cliente crede di averti scritto, e in casella non arriva niente." },
      { type: 'p', text: "Ci siamo passati anche noi, su questo stesso sito. I test funzionavano perfettamente, ma gli invii reali sparivano. La causa era un sistema anti-spam nascosto nel modulo: un campo invisibile che, se compilato, faceva scartare il messaggio come spam. Il problema è che il riempimento automatico del browser lo compilava da solo per gli utenti veri. Risultato: gli spammer passavano e i clienti veri venivano scartati, con tanto di conferma verde a schermo." },
      { type: 'p', text: 'Se hai un sito con un modulo, fai questa prova oggi stesso: compilalo da telefono, come farebbe un cliente, e verifica che la mail arrivi davvero. Poi rifallo ogni volta che qualcuno mette mano al sito. È il controllo più veloce e più redditizio che puoi fare.' },

      { type: 'h2', text: 'Nessuno misura niente' },
      { type: 'p', text: "Senza uno strumento di analisi installato non puoi sapere se il problema è il traffico, il contenuto o il modulo. Stai discutendo di ipotesi. Il primo intervento su un sito che non porta clienti dovrebbe sempre essere questo: mettere in piedi la misurazione e guardare i dati per qualche settimana." },

      { type: 'h2', text: 'Il sito è lento o difficile da usare da telefono' },
      { type: 'p', text: 'La maggioranza delle visite arriva da smartphone. Un sito che da telefono carica lentamente, ha testi piccoli o moduli scomodi perde persone in silenzio: non ricevi lamentele, ricevi meno contatti.' },

      { type: 'h2', text: "Da dove partire" },
      { type: 'p', text: "In ordine, e senza spendere niente: verifica che il sito sia indicizzato, prova il modulo dei contatti come un cliente vero, controlla la scheda Google, installa uno strumento di misurazione. Se dopo questi quattro passaggi i contatti ancora non arrivano, allora il problema è di contenuti e di visibilità, e lì si lavora con un piano." },
      { type: 'p', text: 'Se preferisci che questa verifica la facciamo noi sul tuo sito, scrivici: ti diciamo cosa abbiamo trovato, punto per punto.' },
    ],
  },

  {
    slug: 'come-scegliere-agenzia-comunicazione',
    title: "Come scegliere un'agenzia di comunicazione: le domande da fare prima di firmare",
    excerpt:
      "Portfolio e prezzo non bastano a capire con chi stai per lavorare. Otto domande che ti dicono molto più di una presentazione, e i segnali per cui conviene fermarsi.",
    category: 'Marketing',
    readTime: '8 min',
    featured: false,
    publishedAt: '2026-07-08',
    date: '8 Lug 2026',
    author: AUTORE,
    coverImage: '/blog/come-scegliere-agenzia-comunicazione.jpg',
    content: [
      { type: 'p', text: "Scegliere un'agenzia è difficile per un motivo strutturale: stai comprando un lavoro che non è ancora stato fatto, da persone che non hai mai visto lavorare, con criteri di valutazione che spesso non conosci. È il motivo per cui molte aziende scelgono guardando due cose sole — il portfolio e il preventivo — e si accorgono solo dopo che non erano le più importanti." },
      { type: 'p', text: "Scriviamo questo articolo sapendo di essere parte in causa. Lo scriviamo lo stesso, perché un cliente che sa cosa chiedere è un cliente con cui si lavora meglio, anche quando sceglie qualcun altro." },

      { type: 'h2', text: '1. Avete lavorato con aziende come la mia?' },
      { type: 'p', text: "Non chiedere un portfolio generico: chiedi lavori del tuo settore o, meglio ancora, della tua dimensione. Un'agenzia abituata a grandi marchi nazionali può essere bravissima e comunque inadatta a un'impresa che ha un titolare che decide tutto e nessun ufficio marketing." },
      { type: 'p', text: "E chiedi cosa è successo dopo: non «com'è venuto», ma «cosa ha prodotto». Se non lo sanno dire, vuol dire che una volta consegnato non hanno più guardato." },

      { type: 'h2', text: '2. Chi lavorerà concretamente sul mio progetto?' },
      { type: 'p', text: 'Capita che a presentarsi sia il commerciale più bravo e a lavorare sia qualcun altro, magari esterno. Non è di per sé un problema — quasi tutte le agenzie usano collaboratori — ma devi saperlo prima e sapere chi ti risponde quando c\'è un problema.' },

      { type: 'h2', text: '3. Cosa serve da me, e quanto tempo mi costa?' },
      { type: 'p', text: "I progetti si bloccano quasi sempre per un motivo solo: mancano materiali, informazioni o approvazioni dal cliente. Un'agenzia che ha esperienza te lo dice subito e ti elenca cosa dovrai fornire — foto, testi, accessi, dati dei prodotti, tempi di risposta." },
      { type: 'p', text: "Se ti dicono «pensiamo a tutto noi, tu non devi fare niente», o non hanno capito il progetto o non te lo stanno raccontando tutto." },

      { type: 'h2', text: '4. Come misuriamo se sta funzionando?' },
      { type: 'p', text: 'Va deciso prima, insieme, e deve essere qualcosa che riguarda la tua azienda: richieste di preventivo, ordini, telefonate, appuntamenti. Le metriche che contano sono quelle che si vedono in cassa.' },
      { type: 'p', text: 'Se la risposta parla solo di visualizzazioni, copertura e «crescita della community», stai comprando numeri che non pagano stipendi.' },

      { type: 'h2', text: '5. Di chi sono account, dominio e dati?' },
      { type: 'p', text: 'Questa è la domanda che separa un fornitore da una dipendenza. Dominio, hosting, profili social, account pubblicitari e strumenti di analisi devono essere intestati alla tua azienda, con te come proprietario e l\'agenzia come collaboratore.' },
      { type: 'p', text: "Non è sfiducia: è normale amministrazione. Se domani cambiate strada, ti porti dietro tutto il lavoro e lo storico dei dati. Se invece è tutto intestato all'agenzia, ricominci da zero." },

      { type: 'h2', text: '6. Cosa succede se ci fermiamo?' },
      { type: 'p', text: 'Chiedi come si esce prima di entrare: durata del contratto, preavviso, cosa ti viene consegnato alla chiusura, in che formato. Un rapporto sano prevede che possa finire senza danni per nessuno.' },

      { type: 'h2', text: '7. Ogni quanto ci parliamo, e come?' },
      { type: 'p', text: "Il silenzio è la lamentela più frequente che sentiamo su agenzie precedenti. Stabilite in anticipo la frequenza degli aggiornamenti, chi è il riferimento e in quanto tempo si risponde a un messaggio urgente. Meglio un ritmo modesto e rispettato che promesse di reperibilità continua." },

      { type: 'h2', text: '8. Cosa non fate?' },
      { type: 'p', text: "È la domanda più rivelatrice di tutte. Chi risponde «facciamo tutto» quasi sempre fa tutto allo stesso modo. Chi ti dice con serenità che una certa cosa non la fa, o che nel tuo caso non la consiglia, ti sta dando l'informazione più utile della riunione." },

      { type: 'h2', text: 'I segnali per cui conviene fermarsi' },
      { type: 'p', text: 'Al di là delle risposte, ci sono comportamenti che dicono già molto:' },
      { type: 'li', text: 'ti garantiscono la prima posizione su Google: nessuno può garantirla, perché nessuno controlla i risultati di ricerca' },
      { type: 'li', text: 'ti mandano un preventivo senza averti fatto domande sulla tua azienda' },
      { type: 'li', text: "parlano solo di grafica e mai di obiettivi, oppure solo di numeri e mai di cosa vendi" },
      { type: 'li', text: 'insistono per firmare subito con uno sconto che scade domani' },
      { type: 'li', text: 'non vogliono darti gli accessi ai profili creati per te' },
      { type: 'li', text: 'mostrano lavori bellissimi ma non sanno dire per chi li hanno fatti' },

      { type: 'h2', text: "L'ultima verifica, che vale più di tutte" },
      { type: 'p', text: "Chiedi il contatto di un cliente che seguono da almeno un anno e chiamalo. Non per sapere se sono bravi — te lo diranno tutti — ma per sapere come si comportano quando qualcosa va storto, quanto tempo passa tra una richiesta e una risposta, e se rifarebbero la stessa scelta." },
      { type: 'p', text: "Un'agenzia che lavora bene questo contatto te lo dà senza esitare." },
    ],
  },

  {
    slug: 'vendere-ricambi-auto-online',
    title: 'Vendere ricambi auto online: come si struttura un catalogo tecnico',
    excerpt:
      "Nella ricambistica il cliente non cerca un prodotto: cerca il pezzo compatibile con la sua auto. Se sbaglia, torna indietro. Ecco come si costruisce un e-commerce che regge questa responsabilità.",
    category: 'E-commerce',
    readTime: '8 min',
    featured: false,
    publishedAt: '2026-07-01',
    date: '1 Lug 2026',
    author: AUTORE,
    coverImage: '/blog/vendere-ricambi-auto-online.jpg',
    content: [
      { type: 'p', text: "Vendere ricambi online non assomiglia a vendere abbigliamento o arredo. In quei settori il cliente sceglie ciò che gli piace; qui il cliente cerca l'unico pezzo che funziona sulla sua vettura, e ogni errore si trasforma in un reso, in un'assistenza da gestire e in una recensione negativa." },
      { type: 'p', text: "È il motivo per cui in questo settore il lavoro più importante non è grafico: è la struttura delle informazioni. Lo abbiamo affrontato costruendo l'e-commerce di Alba Ricambi, e queste sono le decisioni che contano davvero." },

      { type: 'h2', text: 'La compatibilità è il cuore del progetto' },
      { type: 'p', text: "Un catalogo di ricambi senza gestione delle compatibilità è un elenco che scarica sul cliente una responsabilità che non può assumersi. La struttura minima da cui partire è la catena marca, modello, anno, motorizzazione — perché lo stesso modello, in anni o allestimenti diversi, monta componenti diversi." },
      { type: 'p', text: 'Su questa base si costruiscono due percorsi che devono convivere:' },
      { type: 'li', text: 'chi parte dalla propria auto e vuole vedere solo ciò che ci si monta' },
      { type: 'li', text: 'chi ha già un codice — OEM o del fornitore — e vuole trovare quel pezzo o il suo equivalente' },
      { type: 'p', text: 'Il secondo percorso è quello dei clienti più esperti, spesso officine, e sono i clienti che ordinano più spesso. Una ricerca per codice che funziona davvero, comprese le equivalenze, vale più di qualsiasi elemento decorativo del sito.' },

      { type: 'h2', text: 'I filtri devono ridurre, non elencare' },
      { type: 'p', text: "Con migliaia di articoli, la navigazione per categorie non basta. Servono filtri che riducano rapidamente: tipo di componente, posizione sul veicolo, produttore, disponibilità immediata. E soprattutto, la selezione dell'auto deve restare attiva mentre l'utente naviga: se si azzera cambiando pagina, la fatica ricomincia da capo e il cliente esce." },

      { type: 'h2', text: 'Cosa deve contenere una scheda prodotto' },
      { type: 'p', text: 'Nella ricambistica la scheda è un documento tecnico, non una vetrina. Le informazioni che riducono i resi sono sempre le stesse:' },
      { type: 'li', text: 'codice del produttore e riferimenti OEM corrispondenti' },
      { type: 'li', text: "elenco dei veicoli compatibili, consultabile per esteso" },
      { type: 'li', text: 'misure e specifiche tecniche rilevanti per quel tipo di pezzo' },
      { type: 'li', text: 'foto reali del componente, non immagini generiche di categoria' },
      { type: 'li', text: 'disponibilità e tempo di spedizione dichiarati' },
      { type: 'li', text: 'eventuali note di montaggio o accessori necessari' },
      { type: 'p', text: "Le foto reali meritano un discorso a parte: in questo settore la tentazione di usare le immagini del fornitore è forte, ma sono le stesse che stanno su decine di altri negozi, e non aiutano né il cliente né il posizionamento." },

      { type: 'h2', text: 'I dati arrivano quasi sempre disordinati' },
      { type: 'p', text: "Il punto in cui questi progetti si allungano non è lo sviluppo: è la preparazione dei dati. Le anagrafiche arrivano da gestionali diversi, i file dei fornitori hanno strutture incompatibili, le compatibilità a volte esistono solo nell'esperienza di chi sta al banco." },
      { type: 'p', text: 'Prima di iniziare, vale la pena rispondere a queste domande:' },
      { type: 'li', text: 'in che formato arrivano i cataloghi dei fornitori, e ogni quanto cambiano?' },
      { type: 'li', text: 'chi aggiorna i prezzi, e con che frequenza?' },
      { type: 'li', text: 'le giacenze devono essere allineate al magazzino in tempo reale?' },
      { type: 'p', text: "Un catalogo tecnico che si aggiorna a mano regge poche settimane. L'automazione degli aggiornamenti non è un lusso: è ciò che rende il negozio sostenibile nel tempo." },

      { type: 'h2', text: 'Spedizioni e resi: qui il dettaglio conta' },
      { type: 'p', text: "I ricambi hanno pesi e ingombri molto diversi tra loro: una guarnizione e un paraurti non possono avere lo stesso trattamento. Le spese di spedizione vanno calcolate su peso e volume reali e mostrate presto nel percorso d'acquisto." },
      { type: 'p', text: 'Sul reso serve chiarezza assoluta, soprattutto sulla condizione dei pezzi già montati: è la situazione più frequente di contestazione, e una politica scritta bene evita quasi tutte le discussioni.' },

      { type: 'h2', text: "L'assistenza pre-vendita è parte del prodotto" },
      { type: 'p', text: "Anche con il catalogo migliore, una parte dei clienti vorrà conferma prima di ordinare. Rendere semplice quel contatto — un numero visibile, una chat, un modulo che porta con sé il codice del pezzo che si stava guardando — trasforma un dubbio in un ordine invece che in un abbandono." },
      { type: 'p', text: "Chi vende ricambi lo sa già dal banco fisico: metà del valore è nel consiglio. Online quel consiglio va reso disponibile, non eliminato." },

      { type: 'h2', text: 'In sintesi' },
      { type: 'p', text: "Un e-commerce di ricambi si gioca sulla precisione: compatibilità gestite, codici cercabili, schede complete, dati che si aggiornano da soli, assistenza raggiungibile. È un progetto più vicino alla costruzione di un database che alla realizzazione di un sito, e va preventivato per quello che è." },
      { type: 'p', text: 'Se vendi componentistica e stai valutando di portare il catalogo online, possiamo guardare insieme come sono fatti i tuoi dati: è da lì che si capisce la dimensione reale del lavoro.' },
    ],
  },

  {
    slug: 'ecommerce-tessile-biancheria',
    title: 'E-commerce per aziende tessili e biancheria: cosa serve davvero',
    excerpt:
      'Nel tessile il cliente compra qualcosa che non può toccare. Tutto il progetto ruota attorno a un problema solo: restituire online la sensazione del prodotto in mano.',
    category: 'E-commerce',
    readTime: '7 min',
    featured: false,
    publishedAt: '2026-06-24',
    date: '24 Giu 2026',
    author: AUTORE,
    coverImage: '/blog/ecommerce-tessile-biancheria.jpg',
    content: [
      { type: 'p', text: "Chi vende biancheria e tessile per la casa ha costruito il proprio mestiere su un gesto preciso: il cliente entra, tocca il tessuto, capisce la qualità con le mani e compra. Online quel gesto non esiste, e nessuna descrizione lo sostituisce da sola." },
      { type: 'p', text: "Abbiamo lavorato su più progetti di questo settore — Con.tex Biancheria, Maestri Cotonieri — e la differenza tra un catalogo che vende e uno che resta fermo si gioca quasi sempre sugli stessi punti." },

      { type: 'h2', text: 'Le misure sono il primo ostacolo, non un dettaglio' },
      { type: 'p', text: "Nel tessile per la casa la nomenclatura è un campo minato: una piazza e mezza, matrimoniale, francese, king size non significano la stessa cosa per tutti, e le misure reali cambiano tra produttori. Un cliente incerto sulla misura non ordina, oppure ordina e restituisce." },
      { type: 'p', text: 'Le cose che riducono davvero i resi:' },
      { type: 'li', text: 'le misure in centimetri sempre accanto al nome commerciale' },
      { type: 'li', text: 'una guida alle misure raggiungibile dalla scheda prodotto, non nascosta in un menù' },
      { type: 'li', text: "l'indicazione di cosa comprende il set, pezzo per pezzo" },
      { type: 'li', text: "l'altezza del materasso consigliata, dove è rilevante" },

      { type: 'h2', text: 'Le foto sono il prodotto' },
      { type: 'p', text: 'Se il cliente non può toccare, deve poter guardare molto bene. E servono due tipi di immagine, non uno.' },
      { type: 'h3', text: "Il dettaglio ravvicinato" },
      { type: 'p', text: 'La trama vista da vicino, la rifinitura, il ricamo, il bordo. È ciò che sostituisce il tatto: comunica la qualità meglio di qualsiasi aggettivo in descrizione.' },
      { type: 'h3', text: "L'ambientazione" },
      { type: 'p', text: "Lo stesso set fotografato su un letto, in una camera vera, con la luce giusta. Serve a far immaginare il prodotto in casa propria, ed è quello che sposta la decisione. Un tessuto fotografato piatto su un tavolo resta un tessuto; lo stesso tessuto in ambiente diventa una camera che il cliente vuole." },
      { type: 'p', text: 'Su questi progetti la fotografia è la voce che incide di più sul risultato finale, e va pianificata in anticipo: colori fedeli, luce coerente su tutto il catalogo, la stessa impostazione per tutti i prodotti della stessa famiglia.' },

      { type: 'h2', text: 'La scheda prodotto deve parlare di materiale' },
      { type: 'p', text: 'Chi compra tessile di qualità cerca informazioni che nei cataloghi generici non trova quasi mai:' },
      { type: 'li', text: 'composizione reale e tipo di lavorazione' },
      { type: 'li', text: 'peso o densità del tessuto, dove è un elemento di qualità' },
      { type: 'li', text: 'come si lava e come si comporta dopo i lavaggi' },
      { type: 'li', text: 'se restringe, se stira facilmente, se sbiadisce' },
      { type: 'li', text: 'dove è prodotto' },
      { type: 'p', text: "Sono anche le informazioni che le persone cercano su Google prima di comprare: scriverle bene serve al cliente e serve a farsi trovare. Le descrizioni copiate dal fornitore, oltre a non convincere nessuno, sono identiche a quelle di decine di concorrenti." },

      { type: 'h2', text: 'Colori e varianti vanno gestiti con onestà' },
      { type: 'p', text: 'Il colore è la causa di reso più frequente del settore, perché ogni schermo lo restituisce in modo diverso. Non si elimina, si contiene: fotografie con luce e bilanciamento coerenti, un riferimento visivo che aiuti a capire la tonalità reale, e una nota chiara che avvisa della possibile differenza di resa.' },
      { type: 'p', text: 'Sul piano della struttura, ogni variante di colore e misura deve avere la propria disponibilità: annunciare disponibile un set che poi manca nella misura richiesta è il modo più veloce per perdere un cliente due volte.' },

      { type: 'h2', text: 'Le collezioni cambiano, il sito deve seguirle' },
      { type: 'p', text: "Il tessile ha una stagionalità marcata e collezioni che si rinnovano. Il negozio va costruito in modo che tu possa aggiornare collezioni, evidenze e ordinamento senza dover chiamare qualcuno ogni volta. Se ogni modifica dipende dall'agenzia, il catalogo invecchia — ed è un costo che non compare in nessun preventivo." },

      { type: 'h2', text: 'Il negozio fisico non è un concorrente del sito' },
      { type: 'p', text: "Molte aziende del settore temono che l'online tolga vendite al punto vendita. Nella pratica succede l'opposto: le persone guardano online e comprano in negozio, o vedono in negozio e riordinano online. Il sito diventa il catalogo sempre aperto, quello che il cliente consulta la sera dal divano." },
      { type: 'p', text: 'Perché funzioni, le informazioni devono essere allineate tra i due canali: prezzi, disponibilità, collezioni.' },

      { type: 'h2', text: 'In sintesi' },
      { type: 'p', text: 'Nel tessile la partita si vince su misure chiare, fotografia curata e schede che parlano di materiale. La piattaforma conta molto meno di queste tre cose.' },
      { type: 'p', text: 'Se hai un\'azienda tessile e stai valutando la vendita online, parliamone: la prima cosa da capire è che materiale fotografico hai già e quanto è utilizzabile.' },
    ],
  },

  {
    slug: 'social-attivita-locali',
    title: 'Social media per attività locali: cosa funziona davvero',
    excerpt:
      'Per un ristorante, uno studio medico o un negozio di quartiere la viralità non serve a niente. Serve essere riconoscibili dalle persone che vivono a pochi chilometri.',
    category: 'Marketing',
    readTime: '7 min',
    featured: false,
    publishedAt: '2026-06-17',
    date: '17 Giu 2026',
    author: AUTORE,
    coverImage: '/blog/social-attivita-locali.jpg',
    content: [
      { type: 'p', text: "C'è un equivoco che fa perdere tempo e soldi a molte attività locali: pensare che il successo sui social si misuri in numeri grandi. Per un'attività che lavora su un territorio, centomila visualizzazioni da tutta Italia valgono meno di duemila persone che vivono a dieci chilometri e sanno esattamente cosa fai." },
      { type: 'p', text: 'Cambiando obiettivo cambia tutto: cosa si pubblica, come si misura e cosa si può smettere di fare.' },

      { type: 'h2', text: "L'obiettivo non è farsi seguire, è farsi riconoscere" },
      { type: 'p', text: "Per un'attività locale i social servono a tre cose molto concrete: far sapere che esisti a chi ti passa davanti ogni giorno senza notarti, far capire come lavori a chi ti sta valutando, e restare in mente a chi ti ha già scelto." },
      { type: 'p', text: "Nessuna di queste tre cose richiede numeri enormi. Richiedono continuità e riconoscibilità." },

      { type: 'h2', text: 'Le persone contano più dei prodotti' },
      { type: 'p', text: "Il vantaggio di un'attività locale sui grandi marchi è uno solo, ed è enorme: ha delle facce. Chi lavora, come lavora, il gesto di sempre, la cura di un dettaglio. È il contenuto che le persone del posto guardano di più, perché riconoscono qualcuno." },
      { type: 'p', text: 'Le grandi catene possono comprare pubblicità migliori, ma non possono comprare questo.' },

      { type: 'h2', text: 'Rispondere alle domande che ti fanno tutti i giorni' },
      { type: 'p', text: "Ogni attività ha un elenco di domande ricorrenti: quanto dura, come si mantiene, cosa conviene scegliere, quando bisogna preoccuparsi. Ognuna di queste è un contenuto già pronto, e sono i contenuti che costruiscono più fiducia, perché dimostrano competenza invece di dichiararla." },
      { type: 'p', text: "Su settori come ortopedia, salute e servizi alla persona è anche l'approccio più sicuro: si informa, si spiega, si accompagna. Vale però una regola non negoziabile — in ambito sanitario la comunicazione deve rispettare i vincoli deontologici e pubblicitari del settore: niente promesse di risultato, niente confronti impropri, niente uso di immagini di pazienti senza consenso. Un'informazione corretta è anche l'unica che si può pubblicare." },

      { type: 'h2', text: 'Nel food il prodotto è già il contenuto' },
      { type: 'p', text: "Ristorazione, pasticceria, enogastronomia hanno un vantaggio che gli altri settori non hanno: ciò che vendono è visivamente desiderabile per natura. Su progetti come Svinati e la Pasticceria Bluemoon il lavoro non è stato inventare contenuti, ma fotografarli bene e con costanza — luce curata, dettagli ravvicinati, il momento giusto del piatto o del prodotto." },
      { type: 'p', text: "In questi settori l'errore più comune è pubblicare foto scattate di fretta con poca luce: un piatto fotografato male comunica esattamente il contrario di quello che vuoi far percepire." },

      { type: 'h2', text: 'La costanza vale più della perfezione' },
      { type: 'p', text: "Il problema più diffuso non è la qualità dei contenuti: è la discontinuità. Tre settimane intense e poi due mesi di silenzio producono meno di un ritmo modesto ma regolare. Meglio due pubblicazioni a settimana per un anno che dieci in un mese e poi il vuoto." },
      { type: 'p', text: "Per questo un piano sostenibile parte da una domanda pratica: quanto tempo e quali materiali si riescono realmente a produrre ogni mese? Un calendario costruito su quello si rispetta; uno costruito sulle intenzioni no." },

      { type: 'h2', text: 'Le recensioni sono la parte social che pesa di più' },
      { type: 'p', text: "Per un'attività di territorio, le recensioni sulla scheda Google contano spesso più dei post. Sono ciò che le persone leggono nel momento esatto in cui stanno decidendo, e influenzano anche la posizione nei risultati locali." },
      { type: 'p', text: 'Chiederle ai clienti soddisfatti, con naturalezza e nel momento giusto, è una delle attività a più alto rendimento in assoluto. E rispondere a tutte, comprese quelle negative, con tono calmo e concreto, dice ai futuri clienti come ti comporti quando qualcosa non va.' },

      { type: 'h2', text: 'Come capire se sta funzionando' },
      { type: 'p', text: 'I numeri da guardare non sono i follower. Sono:' },
      { type: 'li', text: 'quante persone chiedono informazioni in privato' },
      { type: 'li', text: 'quante chiamano o cercano indicazioni stradali dalla scheda Google' },
      { type: 'li', text: 'quanti clienti nuovi dicono di averti trovato online' },
      { type: 'li', text: "quante recensioni arrivano ogni mese" },
      { type: 'p', text: "Quest'ultima domanda — «come ci ha conosciuti?» — è gratis, richiede tre secondi e vale più di molte statistiche." },

      { type: 'h2', text: 'In sintesi' },
      { type: 'p', text: 'Per un\'attività locale la strategia social efficace è poco spettacolare e molto costante: mostrare le persone, rispondere alle domande vere, curare le immagini, presidiare le recensioni. Non produce numeri da mostrare agli amici. Produce clienti che entrano dalla porta.' },
      { type: 'p', text: 'Se vuoi capire cosa ha senso per la tua attività e cosa invece puoi tranquillamente non fare, scrivici.' },
    ],
  },

  {
    slug: 'brand-identity-pmi',
    title: 'Brand identity per una PMI: cosa comprende davvero (e quando serve)',
    excerpt:
      "Non è il logo, e non è un vezzo da grandi aziende. È il motivo per cui un'impresa viene ricordata e un'altra, che lavora altrettanto bene, no.",
    category: 'Design',
    readTime: '7 min',
    featured: false,
    publishedAt: '2026-06-10',
    date: '10 Giu 2026',
    author: AUTORE,
    coverImage: '/blog/brand-identity-pmi.jpg',
    content: [
      { type: 'p', text: "Quando un imprenditore ci chiede «un logo nuovo», nella maggior parte dei casi il problema che ha in testa non è il logo. È che l'azienda non viene percepita per quello che vale: lavora bene, ha clienti soddisfatti, e sul mercato sembra uguale a chi lavora molto peggio." },
      { type: 'p', text: 'Il logo è la parte visibile di un lavoro più ampio. Questo è cosa comprende davvero, in ordine.' },

      { type: 'h2', text: 'Prima viene il posizionamento, non il disegno' },
      { type: 'p', text: "Prima di disegnare qualsiasi cosa bisogna sapere che posto vuoi occupare nella testa del cliente: a chi ti rivolgi, cosa fai meglio degli altri, cosa vuoi che le persone pensino quando sentono il tuo nome. Sono domande apparentemente banali che quasi nessuna azienda ha messo per iscritto." },
      { type: 'p', text: 'Da lì nasce tutto il resto. Saltare questo passaggio significa produrre un logo che è solo una questione di gusto — il tuo, o del grafico — e che il primo cambio di idea manda in discussione.' },

      { type: 'h2', text: 'Il sistema visivo, non il singolo segno' },
      { type: 'p', text: "Un'identità è un insieme coerente che comprende:" },
      { type: 'li', text: 'il logo nelle sue varianti (orizzontale, compatta, monocromatica, per fondi scuri)' },
      { type: 'li', text: 'i colori, con i codici esatti per stampa e digitale' },
      { type: 'li', text: 'i caratteri tipografici e come si usano' },
      { type: 'li', text: 'lo stile delle immagini e della grafica di supporto' },
      { type: 'li', text: 'le regole di applicazione: spazi, dimensioni minime, cosa non fare' },
      { type: 'p', text: "Serve perché il marchio non vive in un unico posto: sta sull'insegna, sul furgone, sul biglietto da visita, nei post social, sulla fattura. Senza regole, dopo un anno ci sono cinque versioni diverse in giro e nessuna riconoscibilità." },

      { type: 'h2', text: 'Il tono di voce conta quanto il colore' },
      { type: 'p', text: "Come scrivi è parte dell'identità tanto quanto come appari. Un'impresa edile che comunica in modo tecnico e asciutto trasmette affidabilità; la stessa impresa che usa un linguaggio pubblicitario esagerato la perde. Vale per il sito, i social, i preventivi e persino le email." },

      { type: 'h2', text: 'Distinguersi dal proprio settore è la parte difficile' },
      { type: 'p', text: 'Ogni settore ha le sue abitudini visive, e quasi sempre sono abitudini di conformità: gli studi professionali tendono al blu e al grigio, l\'edilizia al giallo cantiere, il medicale al verde acqua. Seguirle rende sicuri e invisibili.' },
      { type: 'p', text: "Su Alma Studio, uno studio commercialista, abbiamo lavorato esattamente su questo: costruire un'identità che rompesse la percezione fredda e distante tipica del settore fiscale, senza perdere la serietà che quel lavoro richiede. Su Quadrifoglio Group, impresa edile, il punto era trasmettere precisione e cura del dettaglio invece della solita ruvidezza da cantiere." },
      { type: 'p', text: 'Distinguersi non significa essere stravaganti. Significa essere riconoscibili tra dieci concorrenti messi in fila.' },

      { type: 'h2', text: 'Quando serve davvero rifare l\'identità' },
      { type: 'p', text: 'Non sempre serve. I momenti in cui ha senso davvero sono pochi e riconoscibili:' },
      { type: 'li', text: 'stai cambiando mercato, target o dimensione' },
      { type: 'li', text: 'il marchio attuale è stato fatto senza criterio e non è utilizzabile in digitale' },
      { type: 'li', text: "l'azienda è cresciuta e comunica ancora come quando era una ditta individuale" },
      { type: 'li', text: 'ci sono più versioni del logo in circolazione e nessuno sa quale sia quella giusta' },
      { type: 'li', text: 'stai per fare un investimento importante in comunicazione e partiresti da basi confuse' },
      { type: 'p', text: "Se invece il marchio funziona ed è riconosciuto dai tuoi clienti, cambiarlo può essere un danno: la riconoscibilità accumulata in anni è un patrimonio, e si butta via in un giorno." },

      { type: 'h2', text: 'Cosa ti deve restare in mano' },
      { type: 'p', text: 'Alla consegna dovresti avere, e vale la pena chiederlo prima:' },
      { type: 'li', text: 'i file del logo in formato vettoriale, non solo immagini' },
      { type: 'li', text: 'tutte le varianti, per stampa e per digitale' },
      { type: 'li', text: 'un documento con le regole di utilizzo' },
      { type: 'li', text: 'i codici colore esatti' },
      { type: 'li', text: "l'indicazione dei caratteri usati e delle relative licenze" },
      { type: 'p', text: "Sui caratteri tipografici l'attenzione è concreta: molti font hanno licenze d'uso limitate, e usarli fuori dai termini è un problema legale che si scopre tardi." },

      { type: 'h2', text: 'In sintesi' },
      { type: 'p', text: "Una brand identity fatta bene non è un esercizio estetico: è ciò che rende la tua azienda riconoscibile e coerente ovunque si presenti. Il logo è la punta; sotto ci sono posizionamento, regole e linguaggio." },
      { type: 'p', text: 'Se hai la sensazione che la tua azienda valga più di come appare, è di questo che vale la pena parlare.' },
    ],
  },

  {
    slug: 'gestione-social-agenzia-freelance-interno',
    title: 'Social: agenzia, freelance o risorsa interna?',
    excerpt:
      'Tre strade diverse, con vantaggi reali e limiti reali. La scelta giusta dipende da quanto materiale produci, da quanto controllo vuoi e da quanto è stabile il tuo bisogno.',
    category: 'Marketing',
    readTime: '7 min',
    featured: false,
    publishedAt: '2026-06-03',
    date: '3 Giu 2026',
    author: AUTORE,
    coverImage: '/blog/gestione-social-agenzia-freelance-interno.jpg',
    content: [
      { type: 'p', text: "Prima o poi ogni azienda che decide di prendere sul serio i social si trova davanti alla stessa domanda: affidarsi a un'agenzia, a un professionista indipendente, o assumere qualcuno e farlo in casa." },
      { type: 'p', text: "Non c'è una risposta valida per tutti, e chi te la dà senza farti domande ti sta vendendo la sua. Ci sono però criteri abbastanza chiari per capire dove ti collochi." },

      { type: 'h2', text: 'Cosa comprende davvero «gestire i social»' },
      { type: 'p', text: 'Prima di scegliere chi, conviene sapere cosa. Una gestione completa comprende attività molto diverse tra loro:' },
      { type: 'li', text: 'strategia e piano dei contenuti' },
      { type: 'li', text: 'produzione visiva: foto, video, grafica' },
      { type: 'li', text: 'scrittura dei testi' },
      { type: 'li', text: 'pubblicazione e gestione del calendario' },
      { type: 'li', text: 'risposta a commenti e messaggi privati' },
      { type: 'li', text: 'campagne a pagamento e loro ottimizzazione' },
      { type: 'li', text: 'analisi dei risultati' },
      { type: 'p', text: "Sono mestieri diversi. È il motivo per cui una singola persona raramente li copre tutti allo stesso livello — e il motivo per cui molte collaborazioni deludono: si compra «la gestione social» pensando a una cosa e se ne riceve un'altra." },

      { type: 'h3', text: "L'agenzia" },
      { type: 'p', text: "Il vantaggio è la copertura: più competenze diverse su un progetto solo, continuità garantita anche quando una persona è in ferie o malata, strumenti e processi già rodati. Il limite è la distanza: un'agenzia non è dentro la tua azienda e non vede quello che succede ogni giorno." },
      { type: 'p', text: "Funziona bene quando l'azienda ha bisogno di produzione di contenuti e non solo di pubblicazione, e quando c'è un referente interno che può fornire accesso a ciò che accade in azienda." },

      { type: 'h3', text: 'Il professionista indipendente' },
      { type: 'p', text: "Il vantaggio è il rapporto diretto e la flessibilità. Il limite è la copertura: una persona sola è forte su una o due delle attività dell'elenco sopra, e resta scoperta sulle altre. C'è anche un rischio di continuità: se si ferma, si ferma tutto." },
      { type: 'p', text: 'Funziona bene quando hai già chiaro cosa ti serve, il perimetro è stretto e sai riconoscere la qualità di ciò che ricevi.' },

      { type: 'h3', text: 'La risorsa interna' },
      { type: 'p', text: "Il vantaggio è enorme e spesso sottovalutato: chi sta dentro vede le cose mentre accadono, e i contenuti migliori nascono quasi sempre da lì. Il limite è che una persona sola, spesso giovane e senza affiancamento, si ritrova a fare strategia, foto, video, testi e campagne senza avere tutte quelle competenze." },
      { type: 'p', text: "Funziona quando l'azienda produce molto materiale ogni giorno e c'è qualcuno che possa dare indirizzo e verificare i risultati." },

      { type: 'h2', text: 'La combinazione che nella pratica funziona meglio' },
      { type: 'p', text: "Nelle aziende che vediamo funzionare bene, la scelta non è netta: qualcuno interno raccoglie il materiale grezzo — foto, riprese, cose che succedono in azienda — e chi è esterno costruisce la strategia, cura la qualità della produzione e gestisce le campagne." },
      { type: 'p', text: "È il modello che risolve il problema strutturale di entrambe le strade: l'esterno da solo non ha accesso alla quotidianità, l'interno da solo non ha tutte le competenze." },

      { type: 'h2', text: 'Le domande che ti dicono da che parte stai' },
      { type: 'li', text: 'Quanto materiale grezzo produce la tua azienda ogni settimana senza sforzo aggiuntivo?' },
      { type: 'li', text: "C'è qualcuno all'interno che può dedicare tempo stabile a questo, o lo farebbe «quando avanza tempo»?" },
      { type: 'li', text: 'Ti serve soprattutto produzione (foto e video di qualità) o soprattutto presidio quotidiano (risposte, community)?' },
      { type: 'li', text: 'Le campagne a pagamento sono centrali per te? È la competenza più specialistica e la meno improvvisabile.' },
      { type: 'li', text: 'Il bisogno è stabile tutto l\'anno o concentrato in stagioni?' },
      { type: 'p', text: "Se produci molto materiale e hai bisogno di presidio quotidiano, l'interno ha senso. Se hai bisogno di qualità di produzione e di campagne, l'esterno ha senso. Se ti servono entrambe le cose — ed è il caso più frequente — la combinazione è la risposta." },

      { type: 'h2', text: 'Un errore che vale per tutte e tre le strade' },
      { type: 'p', text: "Qualunque sia la scelta, gli account devono essere intestati alla tua azienda, con te come proprietario. Vale per il profilo aziendale, per l'account pubblicitario e per gli strumenti di misurazione." },
      { type: 'p', text: "Non è una questione di fiducia: è che le persone cambiano, le collaborazioni finiscono, e un'azienda non può perdere anni di contenuti e di dati perché erano intestati a qualcun altro." },

      { type: 'h2', text: 'In sintesi' },
      { type: 'p', text: "Non esiste la soluzione migliore in assoluto: esiste quella coerente con quanto materiale produci, quali competenze ti mancano davvero e quanto il bisogno è costante nel tempo." },
      { type: 'p', text: 'Se vuoi ragionarci sopra sul tuo caso concreto, scrivici: la prima cosa utile è capire cosa già produci senza accorgertene.' },
    ],
  },
]
