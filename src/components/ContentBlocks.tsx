import type { ReactNode } from 'react'
import { ArrowRight, Info, Lightbulb, OctagonAlert, TriangleAlert } from 'lucide-react'
import type { Block } from '../data/types'
import { cn } from '../lib/utils'
import { CodeBlock } from './CodeBlock'

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={index} className="code-inline">
              {part.slice(1, -1)}
            </code>
          )
        }
        return <span key={index}>{part}</span>
      })}
    </>
  )
}

const calloutStyles = {
  tip: {
    wrapper: 'border-lime-500/35 bg-lime-400/10 dark:border-lime-400/25 dark:bg-lime-400/[0.07]',
    title: 'text-lime-600 dark:text-lime-300',
    Icon: Lightbulb,
  },
  info: {
    wrapper: 'border-brand-500/30 bg-brand-500/[0.06] dark:border-brand-300/25 dark:bg-brand-500/10',
    title: 'text-brand-700 dark:text-brand-300',
    Icon: Info,
  },
  warn: {
    wrapper: 'border-amber-500/35 bg-amber-500/10 dark:border-amber-400/25 dark:bg-amber-400/[0.07]',
    title: 'text-amber-700 dark:text-amber-300',
    Icon: TriangleAlert,
  },
  danger: {
    wrapper: 'border-coral-500/35 bg-coral-500/10 dark:border-coral-400/25 dark:bg-coral-400/[0.07]',
    title: 'text-coral-600 dark:text-coral-300',
    Icon: OctagonAlert,
  },
} as const

function Callout({
  tone,
  title,
  text,
}: {
  tone: keyof typeof calloutStyles
  title: string
  text: string
}) {
  const style = calloutStyles[tone]
  const Icon = style.Icon

  return (
    <aside className={cn('my-6 rounded-xl border p-4 sm:p-5', style.wrapper)}>
      <p className={cn('flex items-start gap-2 text-[0.9rem] font-semibold', style.title)}>
        <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>{title}</span>
      </p>
      <div className="mt-2 pl-6 text-[0.92rem] leading-relaxed text-ink-700 dark:text-paper-200/75">
        <Inline text={text} />
      </div>
    </aside>
  )
}

export function ContentBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="lesson-prose">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'p':
            return (
              <p key={index} className="my-4 whitespace-pre-line">
                <Inline text={block.text} />
              </p>
            )

          case 'h':
            return (
              <h3
                key={index}
                className="mt-10 mb-4 scroll-mt-28 font-display text-[1.35rem] leading-snug font-semibold tracking-tight text-ink-900 sm:text-[1.5rem] dark:text-paper-50"
              >
                <Inline text={block.text} />
              </h3>
            )

          case 'list':
            return block.ordered ? (
              <ol key={index} className="my-5 space-y-2.5 pl-1">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-500/10 font-mono text-[0.66rem] font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                      {itemIndex + 1}
                    </span>
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={index} className="my-5 space-y-2.5">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.62rem] size-1.5 shrink-0 rounded-full bg-coral-500"
                    />
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            )

          case 'code':
            return (
              <CodeBlock
                key={index}
                code={block.code}
                title={block.title}
                lang={block.lang}
              />
            )

          case 'callout':
            return (
              <Callout key={index} tone={block.tone} title={block.title} text={block.text} />
            )

          case 'steps':
            return (
              <ol key={index} className="my-6 space-y-4">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="relative rounded-xl border border-ink-900/10 bg-white/60 p-4 pl-14 dark:border-paper-100/10 dark:bg-night-800/60"
                  >
                    <span className="absolute top-4 left-4 grid size-7 place-items-center rounded-full bg-ink-900 font-mono text-[0.68rem] font-medium text-paper-50 dark:bg-lime-400 dark:text-night-950">
                      {itemIndex + 1}
                    </span>
                    <p className="font-display text-[1rem] font-semibold text-ink-900 dark:text-paper-50">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
                      <Inline text={item.text} />
                    </p>
                  </li>
                ))}
              </ol>
            )

          case 'table':
            return (
              <div
                key={index}
                className="my-6 overflow-x-auto rounded-xl border border-ink-900/10 dark:border-paper-100/10"
              >
                <table className="w-full border-collapse text-left text-[0.86rem]">
                  <thead>
                    <tr className="bg-ink-900/[0.04] dark:bg-paper-100/[0.06]">
                      {block.headers.map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="border-b border-ink-900/10 px-4 py-3 font-display text-[0.78rem] font-semibold tracking-wide text-ink-900 uppercase dark:border-paper-100/10 dark:text-paper-100"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-ink-900/[0.07] last:border-0 dark:border-paper-100/[0.07]"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-4 py-3 align-top text-ink-700 dark:text-paper-200/75"
                          >
                            <Inline text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case 'quote':
            return (
              <blockquote
                key={index}
                className="my-6 rounded-r-xl border-l-2 border-coral-500 bg-coral-500/[0.05] py-3 pr-4 pl-5 dark:bg-coral-500/[0.08]"
              >
                <p className="font-display text-[1.08rem] leading-relaxed text-ink-800 italic dark:text-paper-100/85">
                  « {block.text} »
                </p>
                {block.author ? (
                  <footer className="mt-2 font-mono text-[0.66rem] tracking-[0.12em] text-ink-500 uppercase dark:text-paper-200/45">
                    {block.author}
                  </footer>
                ) : null}
              </blockquote>
            )

          default:
            return null
        }
      })}
    </div>
  )
}

export function StepArrow() {
  return <ArrowRight className="size-4" aria-hidden="true" />
}

export function BlockLabel({ children }: { children: ReactNode }) {
  return <span className="kicker text-ink-500 dark:text-paper-200/50">{children}</span>
}
