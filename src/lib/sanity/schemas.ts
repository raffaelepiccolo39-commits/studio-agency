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

// sanity/schema.ts — esporta tutti gli schemi
export const schemaTypes = [projectSchema, postSchema]
