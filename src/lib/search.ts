import { capstone } from '../data/capstone'
import { guidedProjects } from '../data/guided'
import { modules } from '../data/modules'

export type SearchEntry = {
  title: string
  subtitle: string
  to: string
  kind: string
}

const staticPages: SearchEntry[] = [
  { title: 'Accueil', subtitle: 'Présentation du parcours React Atelier', to: '/', kind: 'Page' },
  { title: 'Tous les modules', subtitle: 'Six modules, des fondations au projet final', to: '/modules', kind: 'Page' },
  { title: 'Tous les projets', subtitle: '60 projets pratiques classés par difficulté', to: '/projets', kind: 'Page' },
  { title: 'Projets guidés', subtitle: 'Cinq applications complètes pas à pas', to: '/projets-guedes', kind: 'Page' },
  { title: 'Projet final DataSahel', subtitle: 'Reconstruire un site professionnel en 12 chapitres', to: '/projet-final', kind: 'Page' },
  { title: 'Ma progression', subtitle: 'Leçons, projets et chapitres terminés', to: '/progression', kind: 'Page' },
]

export const searchIndex: SearchEntry[] = [
  ...staticPages,
  ...modules.flatMap((module) => [
    {
      title: module.title,
      subtitle: module.tagline,
      to: `/modules/${module.slug}`,
      kind: `Module ${module.number}`,
    },
    ...module.lessons.map((lesson) => ({
      title: lesson.title,
      subtitle: `${module.title} · ${lesson.summary}`,
      to: `/modules/${module.slug}/lecons/${lesson.id}`,
      kind: 'Leçon',
    })),
    ...module.projects.map((project) => ({
      title: project.title,
      subtitle: `${module.title} · ${project.summary}`,
      to: `/projets/${project.id}`,
      kind: 'Projet',
    })),
  ]),
  ...guidedProjects.map((project) => ({
    title: project.title,
    subtitle: project.tagline,
    to: `/projets-guedes/${project.slug}`,
    kind: 'Projet guidé',
  })),
  ...capstone.chapters.map((chapter) => ({
    title: chapter.title,
    subtitle: `Chapitre ${chapter.number} · ${chapter.summary}`,
    to: `/projet-final/${chapter.slug}`,
    kind: 'Projet final',
  })),
]

export function searchEntries(query: string, limit = 14): SearchEntry[] {
  const term = query.trim().toLowerCase()
  if (!term) return staticPages.slice(0, 6)

  const scored = searchIndex
    .map((entry) => {
      const title = entry.title.toLowerCase()
      const haystack = `${entry.title} ${entry.subtitle} ${entry.kind}`.toLowerCase()
      let score = 0
      if (title.startsWith(term)) score += 3
      else if (title.includes(term)) score += 2
      if (haystack.includes(term)) score += 1
      return { entry, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((item) => item.entry)
}
