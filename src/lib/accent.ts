import type { Accent } from '../data/types'

type AccentStyle = {
  text: string
  soft: string
  border: string
  dot: string
  chip: string
  bar: string
}

export const accentStyles: Record<Accent, AccentStyle> = {
  brand: {
    text: 'text-brand-600 dark:text-brand-300',
    soft: 'bg-brand-500/10',
    border: 'border-brand-500/25',
    dot: 'bg-brand-500',
    chip: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200',
    bar: 'bg-brand-500',
  },
  lime: {
    text: 'text-lime-600 dark:text-lime-300',
    soft: 'bg-lime-500/15',
    border: 'border-lime-500/30',
    dot: 'bg-lime-500',
    chip: 'bg-lime-200/60 text-lime-600 dark:bg-lime-500/15 dark:text-lime-300',
    bar: 'bg-lime-500',
  },
  coral: {
    text: 'text-coral-600 dark:text-coral-300',
    soft: 'bg-coral-500/10',
    border: 'border-coral-500/25',
    dot: 'bg-coral-500',
    chip: 'bg-coral-500/10 text-coral-600 dark:bg-coral-500/15 dark:text-coral-300',
    bar: 'bg-coral-500',
  },
  violet: {
    text: 'text-violet-600 dark:text-violet-300',
    soft: 'bg-violet-500/10',
    border: 'border-violet-500/25',
    dot: 'bg-violet-500',
    chip: 'bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300',
    bar: 'bg-violet-500',
  },
  sky: {
    text: 'text-sky-600 dark:text-sky-300',
    soft: 'bg-sky-500/10',
    border: 'border-sky-500/25',
    dot: 'bg-sky-500',
    chip: 'bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300',
    bar: 'bg-sky-500',
  },
  amber: {
    text: 'text-amber-600 dark:text-amber-300',
    soft: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    dot: 'bg-amber-500',
    chip: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
    bar: 'bg-amber-500',
  },
}
