/**
 * Serializza i dati strutturati (schema.org) da mettere dentro
 * <script type="application/ld+json" dangerouslySetInnerHTML={...}>.
 *
 * JSON.stringify da solo NON basta: non tocca il carattere "<", quindi un
 * contenuto che arriva da Sanity e contiene "</script>" chiuderebbe il tag e
 * il resto verrebbe eseguito come JavaScript su tutte le pagine del sito.
 *
 * < è JSON valido e viene riletto come "<": Google interpreta lo schema
 * esattamente come prima, il browser non vede più un tag di chiusura.
 *
 * USARE SEMPRE QUESTA FUNZIONE al posto di JSON.stringify per i blocchi JSON-LD.
 */
export function jsonLdScript(schema: unknown): string {
  return JSON.stringify(schema)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}
