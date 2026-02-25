// sanity/schemas/project.ts
export const projectSchema = {
  name: 'project',
  title: 'Progetto',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titolo', type: 'string', validation: (R: any) => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'platform', title: 'Piattaforma', type: 'string', options: { list: ['Shopify Plus', 'Shopify', 'Next.js', 'Laravel', 'Custom', 'Headless'] } },
    { name: 'services', title: 'Servizi', type: 'array', of: [{ type: 'string' }] },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'coverColor', title: 'Cover Background Color', type: 'string', description: 'es. #0f1a0a — usato se non c\'è immagine' },
    { name: 'accentColor', title: 'Accent Color', type: 'string', description: 'es. #c8f55a' },
    { name: 'year', title: 'Anno', type: 'number' },
    {
      name: 'kpis', title: 'KPI', type: 'array', of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'value', type: 'string' },
        ]
      }]
    },
    { name: 'description', title: 'Descrizione', type: 'array', of: [{ type: 'block' }] },
    { name: 'gallery', title: 'Galleria', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
  ],
  orderings: [{ title: 'Anno (più recente)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] }],
}

// sanity/schemas/post.ts
export const postSchema = {
  name: 'post',
  title: 'Articolo Blog',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titolo', type: 'string', validation: (R: any) => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'excerpt', title: 'Sommario', type: 'text', rows: 3 },
    { name: 'publishedAt', title: 'Data pubblicazione', type: 'datetime' },
    { name: 'coverImage', title: 'Immagine copertina', type: 'image', options: { hotspot: true } },
    { name: 'author', title: 'Autore', type: 'reference', to: [{ type: 'author' }] },
    { name: 'categories', title: 'Categorie', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] },
    { name: 'body', title: 'Contenuto', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
  ],
}

// sanity/schemas/author.ts
export const authorSchema = {
  name: 'author',
  title: 'Autore',
  type: 'document',
  fields: [
    { name: 'name', title: 'Nome', type: 'string' },
    { name: 'avatar', title: 'Avatar', type: 'image' },
    { name: 'bio', title: 'Bio', type: 'text' },
  ],
}

// sanity/schemas/category.ts
export const categorySchema = {
  name: 'category',
  title: 'Categoria',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titolo', type: 'string' },
  ],
}

// sanity/schema.ts — esporta tutti gli schemi
export const schemaTypes = [projectSchema, postSchema, authorSchema, categorySchema]
