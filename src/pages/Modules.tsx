import { useMemo, useState } from 'react'
import { BookOpen, Clock, Search } from 'lucide-react'
import { modules, totalDuration, totalLessons, totalProjects } from '../data/modules'
import { ModuleCard } from '../components/cards'
import { formatDuration } from '../lib/utils'

export function Modules() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return modules
    return modules.filter((module) =>
      `${module.title} ${module.tagline} ${module.description} ${module.lessons
        .map((lesson) => lesson.title)
        .join(' ')}`
        .toLowerCase()
        .includes(term),
    )
  }, [query])

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-900/10 dark:border-paper-100/10">
        <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-50" />
        <div className="shell relative py-14 sm:py-18">
          <p className="kicker text-brand-600 dark:text-brand-300">Le programme complet</p>
          <h1 className="display-lg mt-4 max-w-3xl">
            Six modules pour passer de zéro à un site React en production.
          </h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
            Les modules s'enchaînent dans l'ordre recommandé, mais chaque leçon est autonome. Chaque
            module se termine par dix projets classés du plus simple au plus difficile.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.66rem] tracking-wide text-ink-500 uppercase dark:text-paper-200/45">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="size-3.5" /> {totalLessons} leçons
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" /> {formatDuration(totalDuration)}
            </span>
            <span>{totalProjects} projets pratiques</span>
          </div>

          <label className="mt-8 flex max-w-md items-center gap-2.5 rounded-full border border-ink-900/15 bg-white/70 px-4 py-2.5 dark:border-paper-100/15 dark:bg-night-800/70">
            <Search className="size-4 shrink-0 text-ink-400" />
            <span className="sr-only">Filtrer les modules</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filtrer par titre ou leçon…"
              className="min-w-0 flex-1 bg-transparent text-[0.88rem] outline-none placeholder:text-ink-400 dark:text-paper-100 dark:placeholder:text-paper-200/40"
            />
          </label>
        </div>
      </section>

      <section className="shell py-12 sm:py-16">
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ink-900/15 py-16 text-center text-sm text-ink-500 dark:border-paper-100/15 dark:text-paper-200/55">
            Aucun module ne correspond à « {query} ».
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((module) => (
              <ModuleCard key={module.slug} module={module} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
