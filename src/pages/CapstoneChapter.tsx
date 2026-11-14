import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock } from 'lucide-react'
import { capstone, capstoneChapters, getCapstoneChapter } from '../data/capstone'
import { ContentBlocks } from '../components/ContentBlocks'
import { CompleteButton } from '../components/CompleteButton'
import { useProgress, progressKeys } from '../components/ProgressProvider'
import { cn } from '../lib/utils'
import { NotFound } from './NotFound'

export function CapstoneChapterPage() {
  const { slug = '' } = useParams()
  const chapter = getCapstoneChapter(slug)
  const { isDone, countDone } = useProgress()

  if (!chapter) return <NotFound />

  const index = capstoneChapters.findIndex((entry) => entry.slug === chapter.slug)
  const previous = index > 0 ? capstoneChapters[index - 1] : null
  const next = index < capstoneChapters.length - 1 ? capstoneChapters[index + 1] : null
  const done = isDone(progressKeys.chapter(chapter.slug))
  const doneCount = countDone('chapter:')
  const percent = Math.round((doneCount / capstoneChapters.length) * 100)

  return (
    <div className="shell py-10 sm:py-14">
      <nav
        aria-label="Fil d'Ariane"
        className="flex flex-wrap items-center gap-1.5 text-[0.74rem] text-ink-500 dark:text-paper-200/50"
      >
        <Link to="/projet-final" className="transition hover:text-ink-900 dark:hover:text-paper-50">
          Projet final
        </Link>
        <ChevronRight className="size-3" />
        <span className="truncate text-ink-700 dark:text-paper-200/70">
          Chapitre {chapter.number} · {chapter.title}
        </span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <article>
          <header>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-lime-500/30 bg-lime-400/15 px-3 py-1 font-mono text-[0.62rem] tracking-[0.12em] text-lime-700 uppercase dark:text-lime-300">
                Chapitre {String(chapter.number).padStart(2, '0')} / {capstoneChapters.length}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.64rem] tracking-wide text-ink-500 uppercase dark:text-paper-200/45">
                <Clock className="size-3.5" /> {chapter.duration}
              </span>
            </div>

            <h1 className="display-lg mt-5">{chapter.title}</h1>
            <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
              {chapter.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CompleteButton
                doneKey={progressKeys.chapter(chapter.slug)}
                doneLabel="Chapitre terminé"
                todoLabel="Marquer le chapitre comme terminé"
              />
              <span className="text-[0.8rem] text-ink-400 dark:text-paper-200/40">
                Projet : {capstone.title}
              </span>
            </div>
          </header>

          <div className="mt-10">
            <ContentBlocks blocks={chapter.blocks} />
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink-900/10 bg-white/60 p-5 dark:border-paper-100/10 dark:bg-night-800/60">
            <div>
              <p className="font-display text-[1rem] font-semibold">
                {done ? 'Chapitre terminé.' : 'Chapitre écrit et testé ?'}
              </p>
              <p className="mt-1 text-[0.84rem] text-ink-500 dark:text-paper-200/50">
                Coche le chapitre pour suivre l'avancement du projet final.
              </p>
            </div>
            <CompleteButton
              doneKey={progressKeys.chapter(chapter.slug)}
              doneLabel="Repasser à faire"
              todoLabel="Marquer comme terminé"
            />
          </div>

          <nav aria-label="Navigation entre les chapitres" className="mt-8 grid gap-3 sm:grid-cols-2">
            {previous ? (
              <Link
                to={`/projet-final/${previous.slug}`}
                className="group rounded-xl border border-ink-900/10 p-4 transition hover:border-brand-500/30 dark:border-paper-100/10 dark:hover:border-lime-400/25"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
                  <ArrowLeft className="size-3" /> Chapitre {previous.number}
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
                to={`/projet-final/${next.slug}`}
                className="group rounded-xl border border-ink-900/10 p-4 text-right transition hover:border-brand-500/30 dark:border-paper-100/10 dark:hover:border-lime-400/25"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
                  Chapitre {next.number} <ArrowRight className="size-3" />
                </span>
                <span className="mt-1.5 block text-[0.9rem] font-medium text-ink-800 group-hover:text-brand-600 dark:text-paper-100 dark:group-hover:text-lime-300">
                  {next.title}
                </span>
              </Link>
            ) : (
              <Link
                to="/progression"
                className="group rounded-xl border border-lime-500/30 bg-lime-400/10 p-4 text-right transition"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-lime-700 uppercase dark:text-lime-300">
                  Projet terminé <Check className="size-3" />
                </span>
                <span className="mt-1.5 block text-[0.9rem] font-medium text-ink-800 dark:text-paper-100">
                  Voir ta progression complète
                </span>
              </Link>
            )}
          </nav>
        </article>

        <aside className="lg:order-none">
          <div className="lg:sticky lg:top-28">
            <div className="surface rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[0.62rem] tracking-[0.14em] text-ink-500 uppercase dark:text-paper-200/45">
                  Les chapitres
                </p>
                <span className="font-mono text-[0.6rem] text-ink-400 dark:text-paper-200/40">{percent}%</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink-900/10 dark:bg-paper-100/10">
                <div
                  className="h-full rounded-full bg-lime-500 transition-[width] duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <ol className="mt-3 space-y-0.5">
                {capstoneChapters.map((entry) => {
                  const entryDone = isDone(progressKeys.chapter(entry.slug))
                  const active = entry.slug === chapter.slug
                  return (
                    <li key={entry.slug}>
                      <Link
                        to={`/projet-final/${entry.slug}`}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-start gap-2.5 rounded-lg px-2 py-2 text-[0.78rem] leading-snug transition',
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
                                'font-mono text-[0.56rem]',
                                active
                                  ? 'text-paper-200/60 dark:text-night-950/50'
                                  : 'text-ink-400 dark:text-paper-200/35',
                              )}
                            >
                              {String(entry.number).padStart(2, '0')}
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
          </div>
        </aside>
      </div>
    </div>
  )
}
