import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

export function Badge({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-white/70 px-2.5 py-1 font-mono text-[0.66rem] font-medium tracking-[0.12em] text-ink-600 uppercase dark:border-paper-100/15 dark:bg-night-800/70 dark:text-paper-200/70',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function ProgressBar({
  value,
  className,
  barClassName,
}: {
  value: number
  className?: string
  barClassName?: string
}) {
  const safe = Math.min(100, Math.max(0, Math.round(value)))
  return (
    <div
      className={cn(
        'h-1.5 w-full overflow-hidden rounded-full bg-ink-900/10 dark:bg-paper-100/10',
        className,
      )}
      role="progressbar"
      aria-valuenow={safe}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn('h-full rounded-full bg-brand-500 transition-[width] duration-500', barClassName)}
        style={{ width: `${safe}%` }}
      />
    </div>
  )
}

export function LevelDots({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span className="flex items-center gap-1" aria-label={`Niveau ${level} sur 5`}>
      {[1, 2, 3, 4, 5].map((step) => (
        <span
          key={step}
          className={cn(
            'size-1.5 rounded-full',
            step <= level ? 'bg-coral-500' : 'bg-ink-900/15 dark:bg-paper-100/20',
          )}
        />
      ))}
    </span>
  )
}

export function SectionHeading({
  kicker,
  title,
  text,
  action,
  className,
}: {
  kicker: string
  title: string
  text?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-6', className)}>
      <div className="max-w-2xl">
        <p className="kicker text-brand-600 dark:text-brand-300">{kicker}</p>
        <h2 className="display-md mt-3">{title}</h2>
        {text ? (
          <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink-600 dark:text-paper-200/70">
            {text}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  )
}

export function CheckPill({ done }: { done: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.62rem] font-medium tracking-[0.12em] uppercase',
        done
          ? 'bg-lime-400/25 text-lime-600 dark:bg-lime-400/15 dark:text-lime-300'
          : 'bg-ink-900/5 text-ink-500 dark:bg-paper-100/10 dark:text-paper-200/50',
      )}
    >
      {done ? 'Terminé' : 'À faire'}
    </span>
  )
}
