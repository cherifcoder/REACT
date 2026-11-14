import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../lib/utils'

export function CodeBlock({
  code,
  title,
  lang = 'tsx',
  className,
}: {
  code: string
  title?: string
  lang?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <figure
      className={cn(
        'group relative my-6 overflow-hidden rounded-xl border border-ink-900/15 bg-night-900 shadow-sm dark:border-paper-100/15',
        className,
      )}
    >
      <figcaption className="flex items-center gap-3 border-b border-paper-100/10 bg-night-850 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-coral-400/80" />
          <span className="size-2 rounded-full bg-amber-400/70" />
          <span className="size-2 rounded-full bg-lime-400/80" />
        </span>
        {title ? (
          <span className="min-w-0 flex-1 truncate font-mono text-[0.7rem] tracking-wide text-paper-200/65">
            {title}
          </span>
        ) : (
          <span className="flex-1" />
        )}
        <span className="hidden font-mono text-[0.6rem] tracking-[0.14em] text-paper-200/35 uppercase sm:inline">
          {lang}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md border border-paper-100/15 px-2 py-1 font-mono text-[0.62rem] text-paper-200/60 transition hover:border-paper-100/30 hover:text-paper-50"
          aria-label="Copier le code"
        >
          {copied ? <Check className="size-3 text-lime-400" /> : <Copy className="size-3" />}
          {copied ? 'Copié' : 'Copier'}
        </button>
      </figcaption>
      <pre className="max-h-[32rem] overflow-auto p-4 text-[0.79rem] leading-[1.75] text-paper-100/90">
        <code className="font-mono">{code}</code>
      </pre>
    </figure>
  )
}
