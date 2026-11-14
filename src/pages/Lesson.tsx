import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock, FolderCode } from 'lucide-react'
import { getModule } from '../data/modules'
import { ContentBlocks } from '../components/ContentBlocks'
import { CompleteButton } from '../components/CompleteButton'
import { useProgress, progressKeys } from '../components/ProgressProvider'
import { accentStyles } from '../lib/accent'
import { cn } from '../lib/utils'
import { NotFound } from './NotFound'

export function Lesson() {
  const { slug = '', lessonId = '' } = useParams()
  const module = getModule(slug)
  const lesson = module?.lessons.find((entry) => entry.id === lessonId)
  const { isDone } = useProgress()

  if (!module || !lesson) return <NotFound />

  const index = module.lessons.findIndex((entry) => entry.id === lesson.id)
  const previous = index > 0 ? module.lessons[index - 1] : null
  const next = index < module.lessons.length - 1 ? module.lessons[index + 1] : null
  const accent = accentStyles[module.accent]
  const done = isDone(progressKeys.lesson(module.slug, lesson.id))

  return (
    <div className="shell py-10 sm:py-14">
      <nav
        aria-label="Fil d'Ariane"
        className="flex flex-wrap items-center gap-1.5 text-[0.74rem] text-ink-500 dark:text-paper-200/50"
      >
        <Link to="/modules" className="transition hover:text-ink-900 dark:hover:text-paper-50">
          Modules
        </Link>
        <ChevronRight className="size-3" />
        <Link
          to={`/modules/${module.slug}`}
          className="transition hover:text-ink-900 dark:hover:text-paper-50"
        >
          {module.title}
        </Link>
        <ChevronRight className="size-3" />
        <span className="truncate text-ink-700 dark:text-paper-200/70">Leçon {index + 1}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <article>
          <header>
            <Link
              to={`/modules/${module.slug}`}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.62rem] tracking-[0.12em] uppercase',
                accent.soft,
                accent.border,
                accent.text,
              )}
            >
              Module {module.number} · {module.title}
            </Link>

            <h1 className="display-lg mt-5">{lesson.title}</h1>
            <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
              {lesson.summary}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.64rem] tracking-wide text-ink-500 uppercase dark:text-paper-200/45">
                <Clock className="size-3.5" /> {lesson.duration} min
              </span>
              <span className="font-mono text-[0.64rem] tracking-wide text-ink-400 dark:text-paper-200/40">
                Leçon {index + 1} / {module.lessons.length}
              </span>
              <CompleteButton
                doneKey={progressKeys.lesson(module.slug, lesson.id)}
                doneLabel="Leçon terminée"
                todoLabel="Marquer comme terminé"
              />
            </div>
          </header>

          <div className="mt-10">
            <ContentBlocks blocks={lesson.blocks} />
          </div>

          <div className="mt-12 rounded-2xl border border-ink-900/10 bg-white/60 p-5 dark:border-paper-100/10 dark:bg-night-800/60">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-[1rem] font-semibold">
                  {done ? 'Leçon terminée. Continue sur ta lancée.' : 'Tu as écrit le code toi-même ?'}
                </p>
                <p className="mt-1 text-[0.84rem] text-ink-500 dark:text-paper-200/50">
                  Coche la leçon pour suivre ta progression, puis passe à la suivante.
                </p>
              </div>
              <CompleteButton
                doneKey={progressKeys.lesson(module.slug, lesson.id)}
                doneLabel="Repasser à faire"
                todoLabel="Marquer comme terminé"
              />
            </div>
          </div>

          <nav aria-label="Navigation entre les leçons" className="mt-8 grid gap-3 sm:grid-cols-2">
            {previous ? (
              <Link
                to={`/modules/${module.slug}/lecons/${previous.id}`}
                className="group rounded-xl border border-ink-900/10 p-4 transition hover:border-brand-500/30 dark:border-paper-100/10 dark:hover:border-lime-400/25"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
                  <ArrowLeft className="size-3" /> Précédent
                </span>
                <span className="mt-1.5 block text-[0.9rem] font-medium text-ink-800 group-hover:text-brand-600 dark:text-paper-100 dark:group-hover:text-lime-300">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/modules/${module.slug}/lecons/${next.id}`}
                className="group rounded-xl border border-ink-900/10 p-4 text-right transition hover:border-brand-500/30 dark:border-paper-100/10 dark:hover:border-lime-400/25"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
                  Suivant <ArrowRight className="size-3" />
                </span>
                <span className="mt-1.5 block text-[0.9rem] font-medium text-ink-800 group-hover:text-brand-600 dark:text-paper-100 dark:group-hover:text-lime-300">
                  {next.title}
                </span>
              </Link>
            ) : (
              <Link
                to={`/modules/${module.slug}`}
                className="group rounded-xl border border-brand-500/30 bg-brand-500/[0.06] p-4 text-right transition hover:bg-brand-500/10 dark:border-lime-400/25 dark:bg-lime-400/[0.06]"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-brand-600 uppercase dark:text-lime-300">
                  Module terminé <FolderCode className="size-3" />
                </span>
                <span className="mt-1.5 block text-[0.9rem] font-medium text-ink-800 dark:text-paper-100">
                  Passer aux 10 projets du module
                </span>
              </Link>
            )}
          </nav>
        </article>

        <aside className="lg:order-none">
          <div className="lg:sticky lg:top-28">
            <div className="surface rounded-2xl p-4">
              <p className="font-mono text-[0.62rem] tracking-[0.14em] text-ink-500 uppercase dark:text-paper-200/45">
                Dans ce module
              </p>
              <ol className="mt-3 space-y-0.5">
                {module.lessons.map((entry, entryIndex) => {
                  const entryDone = isDone(progressKeys.lesson(module.slug, entry.id))
                  const active = entry.id === lesson.id
                  return (
                    <li key={entry.id}>
                      <Link
                        to={`/modules/${module.slug}/lecons/${entry.id}`}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-start gap-2.5 rounded-lg px-2 py-2 text-[0.8rem] leading-snug transition',
                          active
                            ? 'bg-ink-900 text-paper-50 dark:bg-paper-100 dark:text-night-950'
                            : 'text-ink-600 hover:bg-ink-900/5 dark:text-paper-200/60 dark:hover:bg-paper-100/10',
                        )}
                      >
                        <span className="mt-0.5 grid size-4 shrink-0 place-items-center">
                          {entryDone ? (
                            <Check
                              className={cn(
                                'size-3.5',
                                active ? 'text-lime-400 dark:text-lime-600' : 'text-lime-500',
                              )}
                            />
                          ) : (
                            <span
                              className={cn(
                                'font-mono text-[0.58rem]',
                                active
                                  ? 'text-paper-200/60 dark:text-night-950/50'
                                  : 'text-ink-400 dark:text-paper-200/35',
                              )}
                            >
                              {String(entryIndex + 1).padStart(2, '0')}
                            </span>
                          )}
                        </span>
                        {entry.title}
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </div>
            <div className="mt-3 rounded-2xl border border-dashed border-ink-900/15 p-4 dark:border-paper-100/15">
              <p className="text-[0.78rem] leading-relaxed text-ink-500 dark:text-paper-200/50">
                Une question sur cette leçon ? Note-la, puis vérifie dans les projets du module.
                C'est en cherchant soi-même que le concept s'ancre.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
