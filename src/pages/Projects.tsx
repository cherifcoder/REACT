import { useMemo, useState } from 'react'
import { FolderCode, Search, SlidersHorizontal } from 'lucide-react'
import { allProjects, modules } from '../data/modules'
import { ProjectCard } from '../components/cards'
import { LevelDots } from '../components/ui'
import { cn } from '../lib/utils'

export function Projects() {
  const [query, setQuery] = useState('')
  const [moduleFilter, setModuleFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState(0)

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return allProjects.filter((project) => {
      if (moduleFilter !== 'all' && project.moduleId !== moduleFilter) return false
      if (levelFilter !== 0 && project.level !== levelFilter) return false
      if (!term) return true
      return `${project.title} ${project.summary} ${project.skills.join(' ')}`
        .toLowerCase()
        .includes(term)
    })
  }, [query, moduleFilter, levelFilter])

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-900/10 dark:border-paper-100/10">
        <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-50" />
        <div className="shell relative py-14 sm:py-18">
          <p className="kicker text-coral-500">La pratique</p>
          <h1 className="display-lg mt-4 max-w-3xl">60 projets pour transformer la théorie en réflexes.</h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
            Dix projets par module, classés du plus simple au plus difficile. Chaque fiche contient
            les compétences visées, les étapes de construction, le code de départ et des bonus.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <label className="flex max-w-lg items-center gap-2.5 rounded-full border border-ink-900/15 bg-white/70 px-4 py-2.5 dark:border-paper-100/15 dark:bg-night-800/70">
              <Search className="size-4 shrink-0 text-ink-400" />
              <span className="sr-only">Rechercher un projet</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher un projet ou une compétence…"
                className="min-w-0 flex-1 bg-transparent text-[0.88rem] outline-none placeholder:text-ink-400 dark:text-paper-100 dark:placeholder:text-paper-200/40"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal className="size-3.5 text-ink-400" />
              <button
                type="button"
                onClick={() => setModuleFilter('all')}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-[0.76rem] font-medium transition',
                  moduleFilter === 'all'
                    ? 'border-ink-900 bg-ink-900 text-paper-50 dark:border-paper-100 dark:bg-paper-100 dark:text-night-950'
                    : 'border-ink-900/15 text-ink-600 hover:border-ink-900/30 dark:border-paper-100/15 dark:text-paper-200/60',
                )}
              >
                Tous les modules
              </button>
              {modules.map((module) => (
                <button
                  key={module.slug}
                  type="button"
                  title={module.title}
                  onClick={() => setModuleFilter(module.slug)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-[0.76rem] font-medium transition',
                    moduleFilter === module.slug
                      ? 'border-ink-900 bg-ink-900 text-paper-50 dark:border-paper-100 dark:bg-paper-100 dark:text-night-950'
                      : 'border-ink-900/15 text-ink-600 hover:border-ink-900/30 dark:border-paper-100/15 dark:text-paper-200/60',
                  )}
                >
                  M{module.number}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[0.62rem] tracking-[0.12em] text-ink-400 uppercase dark:text-paper-200/40">
                Difficulté
              </span>
              {[0, 1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setLevelFilter(level)}
                  aria-pressed={levelFilter === level}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[0.72rem] transition',
                    levelFilter === level
                      ? 'border-coral-500/40 bg-coral-500/10 text-coral-600 dark:text-coral-300'
                      : 'border-ink-900/15 text-ink-500 hover:border-ink-900/30 dark:border-paper-100/15 dark:text-paper-200/50',
                  )}
                >
                  {level === 0 ? 'Toutes' : `Niveau ${level}`}
                  {level > 0 ? <LevelDots level={level as 1 | 2 | 3 | 4 | 5} /> : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-12 sm:py-16">
        <div className="flex items-center justify-between gap-4">
          <p className="inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.12em] text-ink-500 uppercase dark:text-paper-200/45">
            <FolderCode className="size-3.5" /> {filtered.length} projet{filtered.length > 1 ? 's' : ''}
            {moduleFilter !== 'all' ? ` · ${modules.find((m) => m.slug === moduleFilter)?.title}` : ''}
          </p>
          {query || moduleFilter !== 'all' || levelFilter !== 0 ? (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setModuleFilter('all')
                setLevelFilter(0)
              }}
              className="text-[0.76rem] text-brand-600 hover:underline dark:text-brand-300"
            >
              Réinitialiser les filtres
            </button>
          ) : null}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-ink-900/15 py-16 text-center dark:border-paper-100/15">
            <p className="text-sm text-ink-500 dark:text-paper-200/55">
              Aucun projet ne correspond à ces filtres.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setModuleFilter('all')
                setLevelFilter(0)
              }}
              className="mt-3 text-[0.82rem] font-medium text-brand-600 hover:underline dark:text-brand-300"
            >
              Voir les 60 projets
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                module={modules.find((module) => module.slug === project.moduleId)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
