import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/lib/sanity/schemas'

// Le impostazioni del sito sono UNA sola scheda, non un elenco: nella barra
// laterale compaiono come voce singola che si apre direttamente in modifica,
// e non si possono creare doppioni.
const SINGLETON = ['siteSettings']

export default defineConfig({
  name: 'default',
  title: 'Pira Web Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenuti')
          .items([
            S.listItem()
              .title('Impostazioni sito')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Impostazioni sito'),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !SINGLETON.includes(item.getId() ?? ''),
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  document: {
    // Niente "duplica" o "crea nuovo" sui singleton: esiste una scheda sola.
    actions: (prev, { schemaType }) =>
      SINGLETON.includes(schemaType)
        ? prev.filter(({ action }) => action !== 'duplicate' && action !== 'delete')
        : prev,
  },
})
