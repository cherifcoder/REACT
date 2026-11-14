import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Layers,
  Sparkles,
  Target,
} from 'lucide-react'
import { getGuidedProject, guidedProjects } from '../data/guided'
import { ContentBlocks } from '../components/ContentBlocks'
import { CompleteButton } from '../components/CompleteButton'
import { useProgress, progressKeys } from '../components/ProgressProvider'
import { NotFound } from './NotFound'

export function GuidedDetail() {
  const { slug = '' } = useParams()
  const project = getGuidedProject(slug)
  const { isDone } = useProgress()

  if (!project) return <NotFound />

  const index = guidedProjects.findIndex((entry) => entry.slug === project.slug)
  const previous = index > 0 ? guidedProjects[index - 1] : null
  const next = index < guidedProjects.length - 1 ? guidedProjects[index + 1] : null
  const done = isDone(progressKeys.guided(project.slug))

  return (
    <div className="shell py-10 sm:py-14">
      <nav
        aria-label="Fil d'Ariane"
        className="flex flex-wrap items-center gap-1.5 text-[0.74rem] text-ink-500 dark:text-paper-200/50"
      >
        <Link to="/projets-guedes" className="transition hover:text-ink-900 dark:hover:text-paper-50">
          Projets guidés
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-ink-700 dark:text-paper-200/70">{project.title}</span>
      </nav>

      <header className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-coral-500/30 bg-coral-500/10 px-3 py-1 font-mono text-[0.62rem] tracking-[0.12em] text-coral-600 uppercase dark:text-coral-300">
              Projet guidé {String(index + 1).padStart(2, '0')}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.64rem] tracking-wide text-ink-500 uppercase dark:text-paper-200/45">
              <Clock className="size-3.5" /> {project.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.64rem] tracking-wide text-ink-500 uppercase dark:text-paper-200/45">
              <Layers className="size-3.5" /> {project.steps.length} étapes
            </span>
          </div>

          <h1 className="display-lg mt-4">{project.title}</h1>
          <p className="mt-3 font-display text-[1.1rem] text-ink-700 dark:text-paper-200/75">
            {project.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CompleteButton
              doneKey={progressKeys.guided(project.slug)}
              doneLabel="Projet guidé terminé"
              todoLabel="Marquer le projet comme terminé"
            />
            <span className="text-[0.8rem] text-ink-400 dark:text-paper-200/40">{project.level}</span>
          </div>

          <div className="mt-6">
            <p className="font-mono text-[0.62rem] tracking-[0.14em] text-ink-500 uppercase dark:text-paper-200/45">
              Stack
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-ink-900/10 bg-white/60 px-2.5 py-1 font-mono text-[0.64rem] text-ink-600 dark:border-paper-100/15 dark:bg-night-800/60 dark:text-paper-200/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="surface rounded-2xl p-5">
            <p className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] text-ink-500 uppercase dark:text-paper-200/45">
              <Check className="size-3.5" /> Ce que tu vas construire
            </p>
            <ul className="mt-3 space-y-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-2.5 text-[0.82rem] leading-relaxed text-ink-600 dark:text-paper-200/65"
                >
                  <Check className="mt-0.5 size-3.5 shrink-0 text-lime-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article>
          <div className="space-y-14">
            {project.steps.map((step, stepIndex) => (
              <section key={stepIndex} id={`etape-${stepIndex + 1}`} className="scroll-mt-28">
                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink-900 font-mono text-[0.78rem] font-medium text-paper-50 dark:bg-lime-400 dark:text-night-950">
                    {String(stepIndex + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-mono text-[0.6rem] tracking-[0.14em] text-coral-500 uppercase">
                      Étape {stepIndex + 1} / {project.steps.length}
                    </p>
                    <h2 className="mt-1 font-display text-[1.45rem] leading-tight font-semibold tracking-tight">
                      {step.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-ink-500 dark:text-paper-200/50">
                      {step.intro}
                    </p>
                  </div>
                </div>
                <div className="mt-6 lg:pl-14">
                  <ContentBlocks blocks={step.blocks} />
                </div>
              </section>
            ))}
          </div>

          <section className="mt-14 rounded-2xl border border-coral-500/25 bg-coral-500/[0.05] p-6">
            <h2 className="flex items-center gap-2 font-display text-[1.15rem] font-semibold">
              <Sparkles className="size-4 text-coral-500" /> Prolongements
            </h2>
            <p className="mt-2 text-[0.88rem] text-ink-500 dark:text-paper-200/50">
              Le projet fonctionne. Voilà comment le rendre personnel et le rendre plus solide.
            </p>
            <ul className="mt-4 space-y-2.5">
              {project.extensions.map((extension) => (
                <li
                  key={extension}
                  className="flex gap-2.5 text-[0.88rem] leading-relaxed text-ink-700 dark:text-paper-200/70"
                >
                  <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-coral-500" />
                  {extension}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="display-md">Objectifs pédagogiques</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {project.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex gap-2.5 rounded-xl border border-ink-900/10 p-3.5 text-[0.82rem] leading-relaxed text-ink-600 dark:border-paper-100/10 dark:text-paper-200/65"
                >
                  <Target className="mt-0.5 size-3.5 shrink-0 text-brand-500 dark:text-lime-300" />
                  {outcome}
                </li>
              ))}
            </ul>
          </section>

          <nav aria-label="Navigation entre les projets guidés" className="mt-12 grid gap-3 sm:grid-cols-2">
            {previous ? (
              <Link
                to={`/projets-guedes/${previous.slug}`}
                className="group rounded-xl border border-ink-900/10 p-4 transition hover:border-brand-500/30 dark:border-paper-100/10 dark:hover:border-lime-400/25"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
                  <ArrowLeft className="size-3" /> Projet précédent
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
                to={`/projets-guedes/${next.slug}`}
                className="group rounded-xl border border-ink-900/10 p-4 text-right transition hover:border-brand-500/30 dark:border-paper-100/10 dark:hover:border-lime-400/25"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
                  Projet suivant <ArrowRight className="size-3" />
                </span>
                <span className="mt-1.5 block text-[0.9rem] font-medium text-ink-800 group-hover:text-brand-600 dark:text-paper-100 dark:group-hover:text-lime-300">
                  {next.title}
                </span>
              </Link>
            ) : (
              <Link
                to="/projet-final"
                className="group rounded-xl border border-brand-500/30 bg-brand-500/[0.06] p-4 text-right transition dark:border-lime-400/25 dark:bg-lime-400/[0.06]"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.14em] text-brand-600 uppercase dark:text-lime-300">
                  Projet final <ArrowRight className="size-3" />
                </span>
                <span className="mt-1.5 block text-[0.9rem] font-medium text-ink-800 dark:text-paper-100">
                  Reconstruire DataSahel
                </span>
              </Link>
            )}
          </nav>
        </article>

        <aside>
          <div className="lg:sticky lg:top-28">
            <div className="surface rounded-2xl p-4">
              <p className="font-mono text-[0.62rem] tracking-[0.14em] text-ink-500 uppercase dark:text-paper-200/45">
                Les étapes
              </p>
              <ol className="mt-3 space-y-0.5">
                {project.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>
                    <a
                      href={`#etape-${stepIndex + 1}`}
                      className="flex items-start gap-2.5 rounded-lg px-2 py-2 text-[0.78rem] leading-snug text-ink-600 transition hover:bg-ink-900/5 hover:text-ink-900 dark:text-paper-200/60 dark:hover:bg-paper-100/10 dark:hover:text-paper-50"
                    >
                      <span className="mt-0.5 font-mono text-[0.58rem] text-ink-400 dark:text-paper-200/35">
                        {String(stepIndex + 1).padStart(2, '0')}
                      </span>
                      {step.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-3 rounded-2xl border border-dashed border-ink-900/15 p-4 dark:border-paper-100/15">
              <p className="flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.12em] text-ink-400 uppercase dark:text-paper-200/40">
                <BookOpen className="size-3" /> Rappel
              </p>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-ink-500 dark:text-paper-200/50">
                {done
                  ? 'Tu as terminé ce projet. Relis les étapes clés et tente les prolongements.'
                  : 'Chaque étape produit un écran fonctionnel. Vérifie avant de continuer.'}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
