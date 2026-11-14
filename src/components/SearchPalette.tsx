import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowRight, Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { searchEntries } from '../lib/search'
import { cn } from '../lib/utils'

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => searchEntries(query), [query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  if (!open) return null

  function go(to: string) {
    navigate(to)
    onClose()
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      onClose()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((current) => (current + 1) % Math.max(results.length, 1))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((current) => (current - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1))
    }
    if (event.key === 'Enter' && results[active]) {
      event.preventDefault()
      go(results[active].to)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-night-950/60 px-4 pt-[10vh] backdrop-blur-sm"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Rechercher dans le parcours"
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-ink-900/10 bg-paper-50 shadow-2xl dark:border-paper-100/15 dark:bg-night-850"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-ink-900/10 px-4 py-3.5 dark:border-paper-100/10">
          <Search className="size-4 shrink-0 text-ink-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Chercher une leçon, un projet, un chapitre…"
            className="min-w-0 flex-1 bg-transparent text-[0.98rem] text-ink-900 outline-none placeholder:text-ink-400 dark:text-paper-100 dark:placeholder:text-paper-200/40"
            aria-label="Rechercher"
          />
          <button
            type="button"
            onClick={onClose}
            className="grid size-7 shrink-0 place-items-center rounded-md border border-ink-900/10 text-ink-500 transition hover:bg-ink-900/5 dark:border-paper-100/15 dark:text-paper-200/60 dark:hover:bg-paper-100/10"
            aria-label="Fermer la recherche"
          >
            <X className="size-3.5" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-ink-500 dark:text-paper-200/60">
              Aucun résultat pour « {query} ». Essaie « hooks », « Tailwind » ou « DataSahel ».
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((entry, index) => (
                <li key={`${entry.to}-${entry.title}`}>
                  <button
                    type="button"
                    onClick={() => go(entry.to)}
                    onMouseEnter={() => setActive(index)}
                    className={cn(
                      'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition',
                      index === active
                        ? 'bg-brand-500/10 dark:bg-brand-500/15'
                        : 'hover:bg-ink-900/5 dark:hover:bg-paper-100/5',
                    )}
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-ink-900/10 bg-white font-mono text-[0.6rem] font-medium text-brand-600 dark:border-paper-100/10 dark:bg-night-800 dark:text-brand-300">
                      {entry.kind.slice(0, 3).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink-900 dark:text-paper-100">
                        {entry.title}
                      </span>
                      <span className="block truncate text-[0.78rem] text-ink-500 dark:text-paper-200/55">
                        {entry.kind} · {entry.subtitle}
                      </span>
                    </span>
                    <ArrowRight
                      className={cn(
                        'size-4 shrink-0 text-ink-400 transition',
                        index === active ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0',
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-ink-900/10 px-4 py-2.5 font-mono text-[0.62rem] tracking-wide text-ink-400 dark:border-paper-100/10 dark:text-paper-200/40">
          <span>↑ ↓ pour naviguer · Entrée pour ouvrir</span>
          <span>Échap pour fermer</span>
        </div>
      </div>
    </div>
  )
}
