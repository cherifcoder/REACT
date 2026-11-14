import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BookOpen, Clock, FolderCode, Layers, Trophy } from 'lucide-react'
import type { CourseModule, GuidedProject, PracticeProject } from '../data/types'
import { accentStyles } from '../lib/accent'
import { cn, formatDuration } from '../lib/utils'
import { ModuleIcon } from './ModuleIcon'
import { useProgress, progressKeys } from './ProgressProvider'
import { CheckPill, LevelDots } from './ui'

export function ModuleCard({ module }: { module: CourseModule }) {
  const { countDone } = useProgress()
  const accent = accentStyles[module.accent]
  const done = countDone(`lesson:${module.slug}/`)
  const percent = Math.round((done / module.lessons.length) * 100)

  return (
    <Link
      to={`/modules/${module.slug}`}
      className="group surface relative flex flex-col overflow-hidden rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/5 dark:hover:shadow-black/30"
    >
      <div
        aria-hidden="true"
        className={cn('absolute inset-x-0 top-0 h-0.5 opacity-70', accent.bar)}
      />
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            'grid size-11 place-items-center rounded-xl border',
            accent.soft,
            accent.border,
            accent.text,
          )}
        >
          <ModuleIcon name={module.icon} className="size-5" />
        </span>
        <span className="font-mono text-[0.66rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
          Module {String(module.number).padStart(2, '0')}
        </span>
      </div>

      <h3 className="mt-4 font-display text-[1.18rem] font-semibold tracking-tight text-ink-900 group-hover:text-brand-600 dark:text-paper-50 dark:group-hover:text-lime-300">
        {module.title}
      </h3>
      <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-ink-600 dark:text-paper-200/60">
        {module.tagline}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[0.64rem] tracking-wide text-ink-500 uppercase dark:text-paper-200/45">
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="size-3" /> {module.lessons.length} leçons
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FolderCode className="size-3" /> {module.projects.length} projets
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3" /> {formatDuration(module.duration)}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink-900/10 dark:bg-paper-100/10">
          <div
            className={cn('h-full rounded-full transition-[width] duration-500', accent.bar)}
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="font-mono text-[0.6rem] text-ink-400 dark:text-paper-200/40">
          {done}/{module.lessons.length}
        </span>
      </div>
    </Link>
  )
}

export function ProjectCard({
  project,
  module,
}: {
  project: PracticeProject
  module?: CourseModule
}) {
  const { isDone } = useProgress()
  const done = isDone(progressKeys.project(project.id))

  return (
    <Link
      to={`/projets/${project.id}`}
      className="group surface flex flex-col rounded-2xl p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <LevelDots level={project.level} />
          <span className="font-mono text-[0.62rem] tracking-wide text-ink-400 uppercase dark:text-paper-200/40">
            {project.time}
          </span>
        </div>
        {done ? <CheckPill done /> : null}
      </div>

      <h3 className="mt-3 font-display text-[1.02rem] font-semibold text-ink-900 group-hover:text-brand-600 dark:text-paper-50 dark:group-hover:text-lime-300">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-[0.84rem] leading-relaxed text-ink-600 dark:text-paper-200/60">
        {project.summary}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="truncate font-mono text-[0.62rem] tracking-wide text-ink-400 uppercase dark:text-paper-200/40">
          {module ? `M${module.number} · ${module.title}` : project.skills[0]}
        </span>
        <ArrowUpRight className="size-4 shrink-0 text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
      </div>
    </Link>
  )
}

export function GuidedCard({ project, index }: { project: GuidedProject; index: number }) {
  const { isDone } = useProgress()
  const done = isDone(progressKeys.guided(project.slug))

  return (
    <Link
      to={`/projets-guedes/${project.slug}`}
      className="group surface relative flex flex-col overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.64rem] tracking-[0.16em] text-coral-500 uppercase">
          Projet guidé {String(index + 1).padStart(2, '0')}
        </span>
        {done ? <CheckPill done /> : <Trophy className="size-4 text-ink-300 dark:text-paper-200/30" />}
      </div>
      <h3 className="mt-4 font-display text-[1.28rem] font-semibold text-ink-900 dark:text-paper-50">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-ink-600 dark:text-paper-200/60">
        {project.tagline}
      </p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-ink-900/10 px-2 py-0.5 font-mono text-[0.6rem] text-ink-500 dark:border-paper-100/15 dark:text-paper-200/50"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-ink-900/10 pt-4 text-[0.78rem] text-ink-500 dark:border-paper-100/10 dark:text-paper-200/45">
        <span className="inline-flex items-center gap-1.5">
          <Layers className="size-3.5" /> {project.steps.length} étapes · {project.duration}
        </span>
        <ArrowRight className="size-4 transition group-hover:translate-x-1 group-hover:text-brand-500" />
      </div>
    </Link>
  )
}
