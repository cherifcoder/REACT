import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Circle,
  Clock,
  FolderCode,
  Target,
} from 'lucide-react'
import { getModule, modules } from '../data/modules'
import { accentStyles } from '../lib/accent'
import { cn, formatDuration } from '../lib/utils'
import { ModuleIcon } from '../components/ModuleIcon'
import { ProjectCard } from '../components/cards'
import { useProgress, progressKeys } from '../components/ProgressProvider'
import { CheckPill, ProgressBar } from '../components/ui'
import { NotFound } from './NotFound'

export function ModuleDetail() {
  const { slug = '' } = useParams()
  const module = getModule(slug)
  const { isDone, countDone } = useProgress()

  if (!module) return <NotFound />

  const index = modules.findIndex((entry) => entry.slug === module.slug)
  const previous = index > 0 ? modules[index - 1] : null
  const next = index < modules.length - 1 ? modules[index + 1] : null
  const accent = accentStyles[module.accent]
  const done = countDone(`lesson:${module.slug}/`)
  const percent = Math.round((done / module.lessons.length) * 100)

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-900/10 dark:border-paper-100/10">
        <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-50" />
        <div
          aria-hidden="true"
          className={cn('absolute -top-32 -right-20 size-[26rem] rounded-full blur-3xl opacity-20', accent.bar)}
        />
        <div className="shell relative py-12 sm:py-16">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-[0.76rem] text-ink-500 dark:text-paper-200/50">
            <Link to="/modules" className="transition hover:text-ink-900 dark:hover:text-paper-50">
              Modules
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-ink-700 dark:text-paper-200/70">Module {module.number}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'grid size-12 place-items-center rounded-2xl border',
                    accent.soft,
                    accent.border,
                    accent.text,
                  )}
                >
                  <ModuleIcon name={module.icon} className="size-6" />
                </span>
                <span className="font-mono text-[0.66rem] tracking-[0.16em] text-ink-500 uppercase dark:text-paper-200/45">
                  Module {String(module.number).padStart(2, '0')} · {module.level}
                </span>
              </div>

              <h1 className="display-lg mt-5">{module.title}</h1>
              <p className="mt-3 max-w-2xl font-display text-[1.08rem] text-ink-700 dark:text-paper-200/75">
                {module.tagline}
              </p>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-ink-600 dark:text-paper-200/60">
                {module.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.66rem] tracking-wide text-ink-500 uppercase dark:text-paper-200/45">
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="size-3.5" /> {module.lessons.length} leçons
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FolderCode className="size-3.5" /> {module.projects.length} projets
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" /> {formatDuration(module.duration)}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="surface rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[0.64rem] tracking-[0.14em] text-ink-500 uppercase dark:text-paper-200/45">
                    Progression du module
                  </p>
                  <span className="font-display text-[1.05rem] font-semibold">{percent}%</span>
                </div>
                <ProgressBar value={percent} className="mt-3" barClassName={accent.bar} />
                <p className="mt-3 text-[0.8rem] text-ink-500 dark:text-paper-200/45">
                  {done} leçon{done > 1 ? 's' : ''} terminée{done > 1 ? 's' : ''} sur {module.lessons.length}
                </p>
                {module.lessons[0] ? (
                  <Link
                    to={`/modules/${module.slug}/lecons/${module.lessons[0].id}`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 text-[0.84rem] font-medium text-paper-50 transition hover:bg-brand-600 dark:bg-lime-400 dark:text-night-950 dark:hover:bg-lime-300"
                  >
                    {done === 0 ? 'Commencer le module' : 'Reprendre le module'}
                    <ArrowRight className="size-3.5" />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="display-md">Les leçons</h2>
              <span className="font-mono text-[0.64rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
                {module.lessons.length} étapes
              </span>
            </div>

            <ol className="mt-6 space-y-2">
              {module.lessons.map((lesson, lessonIndex) => {
                const lessonDone = isDone(progressKeys.lesson(module.slug, lesson.id))
                return (
                  <li key={lesson.id}>
                    <Link
                      to={`/modules/${module.slug}/lecons/${lesson.id}`}
                      className="group flex items-start gap-4 rounded-xl border border-ink-900/10 bg-white/50 p-4 transition hover:border-brand-500/30 hover:bg-white dark:border-paper-100/10 dark:bg-night-800/50 dark:hover:border-lime-400/25 dark:hover:bg-night-800"
                    >
                      <span
                        className={cn(
                          'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border font-mono text-[0.68rem]',
                          lessonDone
                            ? 'border-lime-500/40 bg-lime-400/20 text-lime-600 dark:text-lime-300'
                            : 'border-ink-900/15 text-ink-500 dark:border-paper-100/15 dark:text-paper-200/50',
                        )}
                      >
                        {lessonDone ? <Check className="size-3.5" /> : String(lessonIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-display text-[1rem] font-semibold text-ink-900 group-hover:text-brand-600 dark:text-paper-50 dark:group-hover:text-lime-300">
                            {lesson.title}
                          </span>
                          {lessonDone ? <CheckPill done /> : null}
                        </span>
                        <span className="mt-1 block text-[0.84rem] leading-relaxed text-ink-500 dark:text-paper-200/50">
                          {lesson.summary}
                        </span>
                      </span>
                      <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 font-mono text-[0.62rem] text-ink-400 dark:text-paper-200/40">
                        <Clock className="size-3" /> {lesson.duration} min
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>

            <div className="mt-14">
              <div className="flex items-end justify-between gap-4">
                <h2 className="display-md">Les 10 projets du module</h2>
                <span className="font-mono text-[0.64rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
                  Facile → difficile
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-[0.9rem] leading-relaxed text-ink-500 dark:text-paper-200/50">
                Chaque projet réutilise les notions du module. Les niveaux indiquent la difficulté
                relative, pas le temps nécessaire.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {module.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} module={module} />
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="surface rounded-2xl p-5">
                <p className="flex items-center gap-2 font-mono text-[0.64rem] tracking-[0.14em] text-ink-500 uppercase dark:text-paper-200/45">
                  <Target className="size-3.5" /> À la fin du module
                </p>
                <ul className="mt-4 space-y-3">
                  {module.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex gap-2.5 text-[0.84rem] leading-relaxed text-ink-600 dark:text-paper-200/65"
                    >
                      <Circle className="mt-1 size-2 shrink-0 fill-lime-400 text-lime-400" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-2xl border border-dashed border-ink-900/15 p-5 dark:border-paper-100/15">
                <p className="font-mono text-[0.62rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
                  Navigation
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {previous ? (
                    <Link
                      to={`/modules/${previous.slug}`}
                      className="inline-flex items-center gap-1.5 text-[0.82rem] text-ink-600 transition hover:text-brand-600 dark:text-paper-200/60 dark:hover:text-lime-300"
                    >
                      <ArrowLeft className="size-3.5" /> Module {previous.number} · {previous.title}
                    </Link>
                  ) : null}
                  {next ? (
                    <Link
                      to={`/modules/${next.slug}`}
                      className="inline-flex items-center gap-1.5 text-[0.82rem] text-ink-600 transition hover:text-brand-600 dark:text-paper-200/60 dark:hover:text-lime-300"
                    >
                      Module {next.number} · {next.title} <ArrowRight className="size-3.5" />
                    </Link>
                  ) : (
                    <Link
                      to="/projets-guedes"
                      className="inline-flex items-center gap-1.5 text-[0.82rem] text-brand-600 dark:text-lime-300"
                    >
                      Passer aux projets guidés <ArrowRight className="size-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
