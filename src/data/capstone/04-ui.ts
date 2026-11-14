import type { CapstoneChapter } from '../types'

export const chapterUi: CapstoneChapter = {
  slug: 'composants-de-base',
  number: 4,
  title: 'Construire les composants de base',
  summary:
    "Button, Reveal, Logo, motifs, compteur animé : cinq composants réutilisés partout. On les écrit avant les pages pour que le site reste cohérent.",
  duration: '70 min',
  blocks: [
    {
      type: 'p',
      text: "Une page d'accueil impressionnante n'est souvent qu'une combinaison de composants simples, répétés avec soin. On commence par l'utilitaire `cn`, qui fusionne des classes conditionnelles sans dupliquer de logique dans le JSX.",
    },
    {
      type: 'code',
      title: 'src/lib/utils.ts',
      lang: 'ts',
      code: `export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}`,
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Pas besoin de clsx ici',
      text: "`cn` fait seulement un `filter` et un `join`. Pour un projet qui utilise `tailwind-merge`, la version plus complète résout les conflits (`px-4` puis `px-6`). Ici, aucun conflit : on reste sur zéro dépendance.",
    },
    {
      type: 'code',
      title: 'src/components/Button.tsx',
      lang: 'tsx',
      code: `import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

type Variant = 'primary' | 'navy' | 'outline' | 'light' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-all duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-clay-600 text-sand-50 shadow-[0_10px_30px_-12px_rgba(185,77,21,0.7)] hover:bg-navy-900 hover:shadow-[0_14px_34px_-14px_rgba(12,42,69,0.65)]',
  navy: 'bg-navy-900 text-sand-50 hover:bg-clay-500',
  outline:
    'border border-ink/20 text-ink hover:border-clay-500 hover:bg-clay-500/5 hover:text-clay-600',
  light: 'bg-sand-50 text-navy-900 hover:bg-white hover:text-clay-600',
  ghost: 'text-ink hover:text-clay-600',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-[0.8rem]',
  md: 'px-5 py-2.5 text-[0.875rem]',
  lg: 'px-6.5 py-3.5 text-[0.95rem] sm:px-7.5',
}

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  to?: string
  href?: string
  arrow?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  ariaLabel?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  to,
  href,
  arrow = true,
  type = 'button',
  disabled,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  )

  const classes = cn(base, variants[variant], sizes[size], className)

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  )
}`,
    },
    {
      type: 'p',
      text: "Le composant `Button` a trois modes : lien interne (`to`), lien externe (`href`) et bouton (`type`). C'est ce qui évite d'avoir un `<button>` stylé comme un lien, ou un `<a>` qui recharge la page. Chaque appel choisit le bon élément HTML.",
    },
    {
      type: 'code',
      title: 'src/components/Reveal.tsx',
      lang: 'tsx',
      code: `import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

export function Reveal({ children, className, delay = 0, y = 24, once = true }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}`,
    },
    {
      type: 'callout',
      tone: 'tip',
      title: '`useReducedMotion`, pas un détail',
      text: "Si l'utilisateur a demandé moins d'animations dans son système, `initial={false}` supprime l'état de départ et le contenu apparaît directement. L'animation reste un bonus, jamais une condition d'accès au contenu.",
    },
    {
      type: 'code',
      title: 'src/components/Logo.tsx — la marque',
      lang: 'tsx',
      code: `import { cn } from '../lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="DataSahel"
      className={cn('size-11 shrink-0', className)}
    >
      <rect width="48" height="48" rx="13" fill="#0C2A45" />
      <rect x="10" y="27" width="5" height="11" rx="1.6" fill="#F5ECDB" />
      <rect x="18.5" y="22" width="5" height="16" rx="1.6" fill="#DDC9A6" />
      <rect x="27" y="16" width="5" height="22" rx="1.6" fill="#D9601F" />
      <path
        d="M10 17.5 19 13l7.5 3.5L36 8"
        fill="none"
        stroke="#FBF7EF"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="36" cy="8" r="3.1" fill="#D9601F" stroke="#0C2A45" strokeWidth="1.6" />
    </svg>
  )
}

export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.42rem] font-semibold tracking-[-0.03em]',
            tone === 'dark' ? 'text-navy-900' : 'text-sand-50',
          )}
        >
          Data
          <span className={tone === 'dark' ? 'text-clay-600' : 'text-clay-400'}>Sahel</span>
        </span>
        <span
          className={cn(
            'mt-1 font-mono text-[0.52rem] tracking-[0.22em] uppercase',
            tone === 'dark' ? 'text-navy-800/75' : 'text-sand-100/65',
          )}
        >
          Former · Analyser · Innover
        </span>
      </span>
    </span>
  )
}`,
    },
    {
      type: 'code',
      title: 'src/components/Patterns.tsx — arcs et bande bogolan',
      lang: 'tsx',
      code: `import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

export function Arcs({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden="true" className={cn('pointer-events-none', className)}>
      {[60, 92, 124, 156, 188].map((r, i) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          stroke="currentColor"
          strokeWidth={i === 2 ? 1.4 : 1}
          strokeDasharray={i === 4 ? '3 7' : undefined}
          opacity={0.9 - i * 0.13}
        />
      ))}
    </svg>
  )
}

export function DotField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none dot-grid [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]',
        className,
      )}
    />
  )
}

export function BogolanBand({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden', className)} aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 1200 60" preserveAspectRatio="none" fill="none">
        <defs>
          <pattern id="bogolan" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0 30 15 12 30 30 45 12 60 30 45 48 30 30 15 48Z" stroke="currentColor" strokeWidth="1" />
            <path d="M0 30 15 48 30 30 45 48 60 30" stroke="currentColor" strokeWidth="1" opacity=".45" />
            <circle cx="30" cy="30" r="2.4" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="1200" height="60" fill="url(#bogolan)" />
      </svg>
    </div>
  )
}

export function SectionLabel({
  index,
  children,
  tone = 'dark',
  className,
}: {
  index?: string
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className={cn('size-1.5 rounded-full', tone === 'dark' ? 'bg-clay-500' : 'bg-clay-400')} />
      {index && (
        <span className={cn('kicker', tone === 'dark' ? 'text-ink/70' : 'text-sand-100/65')}>
          {index}
        </span>
      )}
      <span className={cn('kicker', tone === 'dark' ? 'text-clay-600' : 'text-clay-300')}>
        {children}
      </span>
    </div>
  )
}`,
    },
    {
      type: 'p',
      text: "Le compteur animé est un classique des sites institutionnels. Il ne démarre que lorsque le bloc entre dans le viewport, et il affiche directement la valeur finale si les animations sont réduites.",
    },
    {
      type: 'code',
      title: 'src/components/Counter.tsx',
      lang: 'tsx',
      code: `import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

export function Counter({
  value,
  suffix = '',
  duration = 1600,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration, reduce])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}`,
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'N’anime pas le texte essentiel',
      text: "Un compteur peut retarder la lecture d'un chiffre important. Ici, l'animation dure moins de deux secondes et la valeur finale est immédiatement connue des lecteurs d'écran, car le texte est dans le DOM. Ne remplace jamais un contenu par une animation.",
    },
  ],
}
