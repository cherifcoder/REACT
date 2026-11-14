import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Check,
  FolderCode,
  Layers,
  RotateCcw,
  Trophy,
} from 'lucide-react'
import { modules } from '../data/modules'
import { guidedProjects } from '../data/guided'
import { capstone, capstoneChapters } from '../data/capstone'
import { useProgress, progressKeys } from '../components/ProgressProvider'
import { ProgressBar } from '../components/ui'
import { accentStyles } from '../lib/accent'
import { cn } from '../lib/utils'

export function Progress() {
  const { countDone, totals, isDone, reset } = useProgress()
  const [confirming, setConfirming] = useState(false)

  const lessons = countDone('lesson:')
  const projects = countDone('project:')
  const guided = countDone('guided:')
  const chapters = countDone('chapter:')
  const done = lessons + projects + guided + chapters
  const percent = Math.round((done / totals.items) * 100)

  const blocks = [
    { label: 'Leçons', value: lessons, total: totals.lessons, icon: BookOpen, href: '/modules', bar: 'bg-brand-500' },
    { label: 'Projets pratiques', value: projects, total: totals.projects, icon: FolderCode, href: '/projets', bar: 'bg-coral-500' },
    { label: 'Projets guidés', value: guided, total: totals.guided, icon: Trophy, href: '/projets-guedes', bar: 'bg-violet-500' },
    { label: 'Chapitres du projet final', value: chapters, total: totals.chapters, icon: Layers, href: '/projet-final', bar: 'bg-lime-500' },
  ]

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-900/10 dark:border-paper-100/10">
        <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-50" />
        <div className="shell relative py-12 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="kicker text-brand-600 dark:text-brand-300">Tableau de bord</p>
              <h1 className="display-lg mt-4">Ma progression</h1>
              <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
                Ta progression est enregistrée dans ce navigateur, sans compte ni base de données.
                Elle reste disponible après un rafraîchissement, mais pas sur un autre appareil.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/modules"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-[0.84rem] font-medium text-paper-50 transition hover:bg-brand-600 dark:bg-lime-400 dark:text-night-950 dark:hover:bg-lime-300"
                >
                  Continuer le parcours <ArrowRight className="size-3.5" />
                </Link>
                {done > 0 ? (
                  confirming ? (
                    <span className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          reset()
                          setConfirming(false)
                        }}
                        className="rounded-full bg-coral-500 px-4 py-2.5 text-[0.82rem] font-medium text-white transition hover:bg-coral-600"
                      >
                        Confirmer l'effacement
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirming(false)}
                        className="text-[0.8rem] text-ink-500 underline dark:text-paper-200/50"
                      >
                        Annuler
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirming(true)}
                      className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-4 py-2.5 text-[0.82rem] text-ink-600 transition hover:border-coral-500/40 hover:text-coral-600 dark:border-paper-100/15 dark:text-paper-200/60"
                    >
                      <RotateCcw className="size-3.5" /> Réinitialiser
                    </button>
                  )
                ) : null}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="surface flex items-center gap-6 rounded-2xl p-6">
                <div
                  className="relative grid size-28 shrink-0 place-items-center rounded-full"
                  style={{
                    background: `conic-gradient(var(--color-brand-500) ${percent}%, rgba(107, 113, 137, 0.18) 0)`,
                  }}
                  role="img"
                  aria-label={`${percent} pour cent du parcours terminé`}
                >
                  <div className="grid size-[5.6rem] place-items-center rounded-full bg-paper-50 dark:bg-night-800">
                    <span className="font-display text-[1.55rem] font-semibold">{percent}%</span>
                  </div>
                </div>
                <div>
                  <p className="font-display text-[1.05rem] font-semibold">
                    {percent === 0
                      ? 'Le parcours commence ici.'
                      : percent < 25
                        ? 'Les fondations sont posées.'
                        : percent < 60
                          ? 'Tu prends de la vitesse.'
                          : percent < 90
                            ? 'Tu approches du bout.'
                            : 'Le projet final est à portée.'}
                  </p>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-500 dark:text-paper-200/50">
                    {done} étape{done > 1 ? 's' : ''} terminée{done > 1 ? 's' : ''} sur {totals.items}.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {blocks.map((block) => (
                      <span
                        key={block.label}
                        className="rounded-full bg-ink-900/5 px-2 py-1 font-mono text-[0.58rem] text-ink-500 dark:bg-paper-100/10 dark:text-paper-200/50"
                      >
                        {block.value}/{block.total}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-12 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {blocks.map((block) => {
            const blockPercent = Math.round((block.value / block.total) * 100)
            return (
              <Link
                key={block.label}
                to={block.href}
                className="group surface rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <block.icon className="size-5 text-ink-400 transition group-hover:text-brand-500 dark:text-paper-200/40" />
                  <span className="font-mono text-[0.62rem] text-ink-400 dark:text-paper-200/40">
                    {blockPercent}%
                  </span>
                </div>
                <p className="mt-4 font-display text-[1.45rem] leading-none font-semibold">
                  {block.value}
                  <span className="text-[0.9rem] font-normal text-ink-400 dark:text-paper-200/40">
                    {' '}/ {block.total}
                  </span>
                </p>
                <p className="mt-1.5 text-[0.82rem] text-ink-500 dark:text-paper-200/50">{block.label}</p>
                <ProgressBar value={blockPercent} className="mt-4" barClassName={block.bar} />
              </Link>
            )
          })}
        </div>

        <div className="mt-12">
          <h2 className="display-md">Détail par module</h2>
          <div className="mt-6 space-y-3">
            {modules.map((module) => {
              const doneLessons = countDone(`lesson:${module.slug}/`)
              const doneProjects = module.projects.filter((project) =>
                isDone(progressKeys.project(project.id)),
              ).length
              const moduleTotal = module.lessons.length + module.projects.length
              const moduleDone = doneLessons + doneProjects
              const modulePercent = Math.round((moduleDone / moduleTotal) * 100)
              const accent = accentStyles[module.accent]

              return (
                <Link
                  key={module.slug}
                  to={`/modules/${module.slug}`}
                  className="flex flex-col gap-4 rounded-xl border border-ink-900/10 bg-white/50 p-4 transition hover:border-brand-500/30 sm:flex-row sm:items-center dark:border-paper-100/10 dark:bg-night-800/50"
                >
                  <span
                    className={cn(
                      'grid size-9 shrink-0 place-items-center rounded-lg font-mono text-[0.7rem] font-medium',
                      accent.soft,
                      accent.text,
                    )}
                  >
                    {String(module.number).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[0.95rem] font-semibold">{module.title}</p>
                    <p className="mt-0.5 text-[0.78rem] text-ink-500 dark:text-paper-200/50">
                      {doneLessons}/{module.lessons.length} leçons · {doneProjects}/{module.projects.length} projets
                    </p>
                    <ProgressBar value={modulePercent} className="mt-2.5" barClassName={accent.bar} />
                  </div>
                  <span className="shrink-0 font-mono text-[0.66rem] text-ink-400 dark:text-paper-200/40">
                    {modulePercent}%
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="display-md">Projets guidés</h2>
            <div className="mt-5 space-y-2">
              {guidedProjects.map((project) => {
                const projectDone = isDone(progressKeys.guided(project.slug))
                return (
                  <Link
                    key={project.slug}
                    to={`/projets-guedes/${project.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-ink-900/10 px-4 py-3 transition hover:border-brand-500/30 dark:border-paper-100/10"
                  >
                    <span
                      className={cn(
                        'grid size-6 shrink-0 place-items-center rounded-full border',
                        projectDone
                          ? 'border-lime-500/40 bg-lime-400/20 text-lime-600 dark:text-lime-300'
                          : 'border-ink-900/15 text-ink-300 dark:border-paper-100/15 dark:text-paper-200/30',
                      )}
                    >
                      {projectDone ? <Check className="size-3.5" /> : <Trophy className="size-3" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.88rem] font-medium">{project.title}</span>
                      <span className="block text-[0.74rem] text-ink-500 dark:text-paper-200/45">
                        {project.tagline}
                      </span>
                    </span>
                    <ArrowRight className="size-3.5 shrink-0 text-ink-300 dark:text-paper-200/25" />
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            <h2 className="display-md">Projet final · {capstone.title}</h2>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {capstoneChapters.map((chapter) => {
                const chapterDone = isDone(progressKeys.chapter(chapter.slug))
                return (
                  <Link
                    key={chapter.slug}
                    to={`/projet-final/${chapter.slug}`}
                    className={cn(
                      'flex items-start gap-2.5 rounded-lg border px-3 py-2.5 transition hover:border-brand-500/30',
                      chapterDone
                        ? 'border-lime-500/25 bg-lime-400/[0.07] dark:border-lime-400/20 dark:bg-lime-400/[0.05]'
                        : 'border-ink-900/10 dark:border-paper-100/10',
                    )}
                  >
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center">
                      {chapterDone ? (
                        <Check className="size-3.5 text-lime-500" />
                      ) : (
                        <span className="font-mono text-[0.56rem] text-ink-400 dark:text-paper-200/35">
                          {String(chapter.number).padStart(2, '0')}
                        </span>
                      )}
                    </span>
                    <span className="text-[0.76rem] leading-snug text-ink-600 dark:text-paper-200/60">
                      {chapter.title}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
