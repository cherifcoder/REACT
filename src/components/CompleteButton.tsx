import { Check, Circle } from 'lucide-react'
import { useProgress } from './ProgressProvider'
import { cn } from '../lib/utils'

export function CompleteButton({
  doneKey,
  className,
  doneLabel = 'Terminé',
  todoLabel = 'Marquer comme terminé',
}: {
  doneKey: string
  className?: string
  doneLabel?: string
  todoLabel?: string
}) {
  const { isDone, toggle } = useProgress()
  const done = isDone(doneKey)

  return (
    <button
      type="button"
      onClick={() => toggle(doneKey)}
      aria-pressed={done}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.84rem] font-medium transition',
        done
          ? 'border-lime-500/40 bg-lime-400/20 text-lime-700 hover:bg-lime-400/30 dark:text-lime-300'
          : 'border-ink-900/15 bg-white/60 text-ink-700 hover:border-ink-900/30 dark:border-paper-100/20 dark:bg-night-800/60 dark:text-paper-100 dark:hover:border-paper-100/40',
        className,
      )}
    >
      {done ? <Check className="size-4" /> : <Circle className="size-4" />}
      {done ? doneLabel : todoLabel}
    </button>
  )
}
