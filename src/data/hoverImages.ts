// Immagini DEDICATE allo slideshow hover dei progetti (override della gallery).
//
// Per ogni progetto (chiave = slug) puoi indicare un elenco di immagini che
// verranno mostrate quando l'utente passa il cursore sulla card, AL POSTO delle
// immagini strutturate del progetto.
//
// Come aggiungerle:
//  1) Metti i file in  public/progetti-hover/<slug>/  (es. public/progetti-hover/svinati/1.jpg)
//  2) Elenca i path qui sotto, in ordine di visualizzazione.
// Se uno slug non è presente qui, l'hover usa la gallery del progetto (fallback).

export const HOVER_IMAGES: Record<string, string[]> = {
  // 'svinati': [
  //   '/progetti-hover/svinati/1.jpg',
  //   '/progetti-hover/svinati/2.jpg',
  //   '/progetti-hover/svinati/3.jpg',
  // ],
}

export function hoverImagesFor(slug: string): string[] | null {
  const imgs = HOVER_IMAGES[slug]
  return imgs && imgs.length ? imgs : null
}
