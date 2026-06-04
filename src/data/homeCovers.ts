// Cover dedicate per le card progetto (homepage + griglia /progetti),
// allineate al design Figma. Fallback alla prima immagine della gallery Sanity.
import type { Project } from './projects'

const HOME_COVERS: Record<string, string> = {
  'pasticceria-bluemoon': '/progetti/pasticceria-bluemoon/home-cover.jpg',
  'contex-biancheria': '/progetti/contex-biancheria/home-cover.jpg',
  svinati: '/progetti/svinati/home-cover.jpg',
  'maestri-cotonieri': '/progetti/maestri-cotonieri/home-cover.jpg',
  'alma-studio': '/progetti/alma-studio/home-cover.jpg',
  'quadrifoglio-group': '/progetti/quadrifoglio-group/home-cover.jpg',
  'alba-ricambi': '/progetti/alba-ricambi/home-cover.jpg',
}

export function coverFor(p: Pick<Project, 'slug' | 'immagini'>): string {
  return HOME_COVERS[p.slug] ?? p.immagini[0]
}
