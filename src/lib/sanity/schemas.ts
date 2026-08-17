import { siteSettings as defaults } from '@/data/site'

// sanity/schemas/project.ts
// Superset lossless del tipo `Project` (src/data/projects.ts): nessun campo dei
// case study viene perso nella migrazione a CMS.
export const projectSchema = {
  name: 'project',
  title: 'Progetto',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titolo', type: 'string', validation: (R: any) => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'platform', title: 'Piattaforma / Categoria', type: 'string', description: 'es. "E-commerce", "Brand Identity"' },
    { name: 'services', title: 'Servizi', type: 'array', of: [{ type: 'string' }] },
    { name: 'color', title: 'Colore sfondo cover', type: 'string', description: 'es. #0f1a0a — usato se non c\'è immagine' },
    { name: 'accent', title: 'Colore accento', type: 'string', description: 'es. #c8f55a' },
    { name: 'year', title: 'Anno', type: 'number' },
    { name: 'cliente', title: 'Cliente', type: 'string' },
    { name: 'descrizione', title: 'Descrizione (intro)', type: 'text', rows: 4 },
    { name: 'sfida', title: 'Problema / Sfida', type: 'text', rows: 4 },
    { name: 'soluzione', title: 'Soluzione', type: 'text', rows: 4 },
    {
      name: 'risultati', title: 'Risultati (KPI)', type: 'array', of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Etichetta', type: 'string' },
          { name: 'value', title: 'Valore', type: 'string' },
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }]
    },
    {
      name: 'gallery', title: 'Galleria immagini', type: 'array',
      description: 'La prima immagine è usata come cover/hero.',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'seo', title: 'SEO / Caso studio esteso', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
        { name: 'settore', title: 'Settore', type: 'string' },
        { name: 'approccio', title: 'Approccio', type: 'text', rows: 4 },
        { name: 'processo', title: 'Processo (step)', type: 'array', of: [{ type: 'string' }] },
        {
          name: 'testimonial', title: 'Testimonial', type: 'object',
          fields: [
            { name: 'testo', title: 'Testo', type: 'text', rows: 3 },
            { name: 'autore', title: 'Autore', type: 'string' },
            { name: 'ruolo', title: 'Ruolo', type: 'string' },
          ],
        },
      ],
    },
  ],
  orderings: [{ title: 'Anno (più recente)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'cliente', media: 'gallery.0' } },
}

// sanity/schemas/post.ts
// Allineato 1:1 a ciò che le pagine blog usano realmente (categoria singola,
// readTime, featured, autore inline). Body in Portable Text per il CMS.
export const postSchema = {
  name: 'post',
  title: 'Articolo Blog',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titolo', type: 'string', validation: (R: any) => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'excerpt', title: 'Sommario', type: 'text', rows: 3 },
    { name: 'category', title: 'Categoria', type: 'string', options: { list: ['E-commerce', 'Tech', 'Design', 'Marketing'] } },
    { name: 'readTime', title: 'Tempo di lettura', type: 'string', description: 'es. "7 min"' },
    { name: 'featured', title: 'In evidenza', type: 'boolean', initialValue: false },
    { name: 'publishedAt', title: 'Data pubblicazione', type: 'datetime' },
    { name: 'coverImage', title: 'Immagine copertina', type: 'image', options: { hotspot: true } },
    {
      name: 'author', title: 'Autore', type: 'object',
      fields: [
        { name: 'name', title: 'Nome', type: 'string' },
        { name: 'role', title: 'Ruolo', type: 'string' },
      ],
    },
    { name: 'body', title: 'Contenuto', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] },
  ],
  orderings: [{ title: 'Data (più recente)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'coverImage' } },
}

// sanity/schemas/siteSettings.ts
// Documento UNICO (singleton): i dati dell'agenzia che compaiono ovunque nel
// sito — footer, pagina contatti, dati strutturati per Google. Prima erano
// scritti a mano in una quindicina di file.
// I valori di riserva stanno in src/data/site.ts: se qui è vuoto, vince quello.
export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Impostazioni sito',
  type: 'document',
  // La scheda si apre già compilata con i dati veri dell'agenzia, invece che
  // vuota: si modifica quello che serve e si salva.
  initialValue: {
    ragioneSociale: defaults.ragioneSociale,
    nomeCommerciale: defaults.nomeCommerciale,
    email: defaults.email,
    telefoni: defaults.telefoni.map((t, i) => ({ _key: `tel${i}`, ...t })),
    whatsapp: defaults.whatsapp,
    indirizzo: defaults.indirizzo,
    partitaIva: defaults.partitaIva,
    social: defaults.social,
    trustpilot: defaults.trustpilot,
  },
  groups: [
    { name: 'contatti', title: 'Contatti', default: true },
    { name: 'sede', title: 'Sede e dati fiscali' },
    { name: 'social', title: 'Social' },
  ],
  fields: [
    {
      name: 'email', title: 'Email', type: 'string', group: 'contatti',
      description: 'Compare nel footer, nella pagina contatti e nei messaggi di errore dei form.',
      validation: (R: any) => R.required().email(),
    },
    {
      name: 'telefoni', title: 'Telefoni', type: 'array', group: 'contatti',
      description: 'Il PRIMO della lista è quello principale: è quello che Google mostra nei risultati. Trascina per riordinare.',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'etichetta', title: 'Come si legge sul sito', type: 'string',
            description: 'Con gli spazi, es. "+39 081 175 60017"',
            validation: (R: any) => R.required(),
          },
          {
            name: 'numero', title: 'Numero per la chiamata', type: 'string',
            description: 'Senza spazi, con prefisso, es. "+3908117560017"',
            validation: (R: any) => R.required().regex(/^\+?\d{6,15}$/, { name: 'numero di telefono' }),
          },
        ],
        preview: { select: { title: 'etichetta', subtitle: 'numero' } },
      }],
      validation: (R: any) => R.min(1),
    },
    {
      name: 'whatsapp', title: 'Numero WhatsApp', type: 'string', group: 'contatti',
      description: 'Solo cifre, col prefisso internazionale e SENZA il +. Es. 393318535698',
      validation: (R: any) => R.regex(/^\d{8,15}$/, { name: 'numero WhatsApp' }),
    },
    {
      name: 'indirizzo', title: 'Indirizzo', type: 'object', group: 'sede',
      options: { columns: 2 },
      fields: [
        { name: 'via', title: 'Via e numero', type: 'string' },
        { name: 'cap', title: 'CAP', type: 'string' },
        { name: 'citta', title: 'Città', type: 'string' },
        { name: 'provincia', title: 'Provincia (sigla)', type: 'string' },
        { name: 'nazione', title: 'Nazione (sigla)', type: 'string', initialValue: 'IT' },
      ],
    },
    {
      name: 'ragioneSociale', title: 'Ragione sociale', type: 'string', group: 'sede',
      description: 'Il nome legale, es. "Pira Web S.r.l."',
    },
    {
      name: 'nomeCommerciale', title: 'Nome commerciale', type: 'string', group: 'sede',
      description: 'Come ci presentiamo, es. "Pira Web Creative Agency"',
    },
    { name: 'partitaIva', title: 'Partita IVA', type: 'string', group: 'sede' },
    {
      name: 'social', title: 'Profili social', type: 'object', group: 'social',
      description: 'Lascia vuoto un campo per NON mostrare quell\'icona nel footer.',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'tiktok', title: 'TikTok', type: 'url' },
      ],
    },
    { name: 'trustpilot', title: 'Pagina Trustpilot', type: 'url', group: 'social' },
  ],
  preview: {
    select: { subtitle: 'email' },
    prepare: ({ subtitle }: any) => ({ title: 'Impostazioni sito', subtitle }),
  },
}

// sanity/schema.ts — esporta tutti gli schemi
export const schemaTypes = [projectSchema, postSchema, siteSettingsSchema]
