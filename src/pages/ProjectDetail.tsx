import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Circle,
  Clock,
  Code2,
  Sparkles,
  Target,
} from 'lucide-react'
import { allProjects, getModule, getProject } from '../data/modules'
import { CodeBlock } from '../components/CodeBlock'
import { CompleteButton } from '../components/CompleteButton'
import { ProjectCard } from '../components/cards'
import { useProgress, progressKeys } from '../components/ProgressProvider'
import { LevelDots } from '../components/ui'
import { accentStyles } from '../lib/accent'
import { cn } from '../lib/utils'
import { NotFound } from './NotFound'

export function ProjectDetail() {
  const { id = '' } = useParams()
  const project = getProject(id)
  const { isDone } = useProgress()

  if (!project) return <NotFound />

  const module = getModule(project.moduleId)
  const accent = module ? accentStyles[module.accent] : accentStyles.brand
  const done = isDone(progressKeys.project(project.id))

  const siblings = allProjects.filter(
    (entry) => entry.moduleId === project.moduleId && entry.id !== project.id,
  )
  const currentIndex = project.moduleId
    ? allProjects.filter((entry) => entry.moduleId === project.moduleId).findIndex((entry) => entry.id === project.id)
    : 0

  return (
    <div className="shell py-10 sm:py-14">
      <nav
        aria-label="Fil d'Ariane"
        className="flex flex-wrap items-center gap-1.5 text-[0.74rem] text-ink-500 dark:text-paper-200/50"
      >
        <Link to="/projets" className="transition hover:text-ink-900 dark:hover:text-paper-50">
          Projets
        </Link>
        <ChevronRight className="size-3" />
        {module ? (
          <>
            <Link
              to={`/modules/${module.slug}`}
              className="transition hover:text-ink-900 dark:hover:text-paper-50"
            >
              {module.title}
            </Link>
            <ChevronRight className="size-3" />
          </>
        ) : null}
        <span className="truncate text-ink-700 dark:text-paper-200/70">{project.title}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article>
          <header>
            <div className="flex flex-wrap items-center gap-2.5">
              {module ? (
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
              ) : null}
              <span className="inline-flex items-center gap-2 font-mono text-[0.64rem] tracking-wide text-ink-500 uppercase dark:text-paper-200/45">
                <LevelDots level={project.level} /> Niveau {project.level}/5
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.64rem] tracking-wide text-ink-500 uppercase dark:text-paper-200/45">
                <Clock className="size-3.5" /> {project.time}
              </span>
            </div>

            <h1 className="display-lg mt-5">{project.title}</h1>
            <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
              {project.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CompleteButton
                doneKey={progressKeys.project(project.id)}
                doneLabel="Projet terminé"
                todoLabel="Marquer le projet comme terminé"
              />
              {module ? (
                <Link
                  to={`/modules/${module.slug}`}
                  className="inline-flex items-center gap-1.5 text-[0.82rem] text-ink-500 transition hover:text-brand-600 dark:text-paper-200/50 dark:hover:text-lime-300"
                >
                  <ArrowLeft className="size-3.5" /> Retour au module
                </Link>
              ) : null}
            </div>
          </header>

          <section className="mt-12">
            <h2 className="display-md">Compétences travaillées</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-white/60 px-3 py-1.5 text-[0.78rem] text-ink-700 dark:border-paper-100/15 dark:bg-night-800/60 dark:text-paper-200/70"
                >
                  <Target className="size-3 text-brand-500 dark:text-lime-300" />
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="display-md">Étapes de construction</h2>
            <p className="mt-3 max-w-2xl text-[0.9rem] leading-relaxed text-ink-500 dark:text-paper-200/50">
              Suis les étapes dans l'ordre. Essaie de faire chaque étape sans regarder la suivante,
              puis compare avec ce que tu as écrit.
            </p>
            <ol className="mt-6 space-y-4">
              {project.steps.map((step, index) => (
                <li
                  key={index}
                  className="relative rounded-xl border border-ink-900/10 bg-white/50 p-4 pl-14 dark:border-paper-100/10 dark:bg-night-800/50"
                >
                  <span className="absolute top-4 left-4 grid size-7 place-items-center rounded-full bg-ink-900 font-mono text-[0.68rem] text-paper-50 dark:bg-lime-400 dark:text-night-950">
                    {index + 1}
                  </span>
                  <p className="text-[0.92rem] leading-relaxed text-ink-700 dark:text-paper-200/75">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {project.starter ? (
            <section className="mt-12">
              <h2 className="display-md">Code de départ</h2>
              <p className="mt-3 max-w-2xl text-[0.9rem] leading-relaxed text-ink-500 dark:text-paper-200/50">
                Un squelette volontairement incomplet : à toi d'implémenter la logique décrite dans
                les étapes.
              </p>
              <CodeBlock code={project.starter} title={`${project.title} — départ`} lang="tsx" />
            </section>
          ) : null}

          <section className="mt-12">
            <h2 className="display-md">Pour aller plus loin</h2>
            <ul className="mt-4 space-y-3">
              {project.bonus.map((bonus) => (
                <li
                  key={bonus}
                  className="flex gap-3 rounded-xl border border-ink-900/10 p-4 text-[0.9rem] leading-relaxed text-ink-700 dark:border-paper-100/10 dark:text-paper-200/70"
                >
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-coral-500" />
                  {bonus}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            <Link
              to={module ? `/modules/${module.slug}` : '/projets'}
              className="group rounded-xl border border-ink-900/10 p-4 transition hover:border-brand-500/30 dark:border-paper-100/10 dark:hover:border-lime-400/25"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
                <ArrowLeft className="size-3" /> Revenir
              </span>
              <span className="mt-1.5 block text-[0.9rem] font-medium text-ink-800 dark:text-paper-100">
                {module ? `Module ${module.number} · ${module.title}` : 'Tous les projets'}
              </span>
            </Link>
            <Link
              to="/projets"
              className="group rounded-xl border border-ink-900/10 p-4 text-right transition hover:border-brand-500/30 dark:border-paper-100/10 dark:hover:border-lime-400/25"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
                Explorer <ArrowRight className="size-3" />
              </span>
              <span className="mt-1.5 block text-[0.9rem] font-medium text-ink-800 dark:text-paper-100">
                Les 60 projets pratiques
              </span>
            </Link>
          </div>
        </article>

        <aside>
          <div className="lg:sticky lg:top-28">
            <div className="surface rounded-2xl p-5">
              <p className="font-mono text-[0.62rem] tracking-[0.14em] text-ink-500 uppercase dark:text-paper-200/45">
                Dans le même module
              </p>
              <p className="mt-2 text-[0.78rem] text-ink-400 dark:text-paper-200/40">
                Projet {currentIndex + 1} sur {siblings.length + 1}
              </p>
              <div className="mt-4 space-y-3">
                {siblings.slice(0, 6).map((entry) => (
                  <Link
                    key={entry.id}
                    to={`/projets/${entry.id}`}
                    className="group flex items-start gap-2.5"
                  >
                    <Circle className="mt-1.5 size-1.5 shrink-0 fill-coral-500 text-coral-500" />
                    <span className="text-[0.82rem] leading-snug text-ink-600 transition group-hover:text-brand-600 dark:text-paper-200/60 dark:group-hover:text-lime-300">
                      {entry.title}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-5 border-t border-ink-900/10 pt-4 dark:border-paper-100/10">
                <p className="flex items-center gap-1.5 font-mono text-[0.62rem] tracking-[0.12em] text-ink-400 uppercase dark:text-paper-200/40">
                  <Code2 className="size-3" /> Statut
                </p>
                <p className="mt-2 text-[0.8rem] text-ink-600 dark:text-paper-200/60">
                  {done ? 'Terminé — passe au bonus ou aide quelqu’un.' : 'À construire. Prends le temps de finir seul.'}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {siblings.length > 0 ? (
        <section className="mt-16 border-t border-ink-900/10 pt-10 dark:border-paper-100/10">
          <h2 className="display-md">Autres projets du module</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.slice(0, 3).map((entry) => (
              <ProjectCard key={entry.id} project={entry} module={module} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
