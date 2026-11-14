import type { CapstoneChapter } from '../types'

export const chapterHome: CapstoneChapter = {
  slug: 'accueil-hero',
  number: 6,
  title: 'Accueil : le hero et la visualisation de données',
  summary:
    "Le hero combine un titre éditorial, une accroche, deux boutons et un faux tableau de bord animé. C'est la pièce la plus travaillée du site.",
  duration: '80 min',
  blocks: [
    {
      type: 'p',
      text: "Le hero doit répondre en trois secondes à trois questions : **qui** parle, **à qui**, et **pourquoi** rester. DataSahel affiche un label métier, un titre qui va de la donnée brute à la décision, une description avec les quatre verbes de la marque, puis deux actions : découvrir les expertises ou parler d'un projet.",
    },
    {
      type: 'code',
      title: 'src/pages/Home.tsx — le hero',
      lang: 'tsx',
      code: `import { ArrowRight, ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Button } from '../components/Button'
import { HeroVisual } from '../components/HeroVisual'
import { Marquee } from '../components/Marquee'
import { SectionHeading, SectionLabel, Highlight, Arcs } from '../components/Patterns'
import { Reveal } from '../components/Reveal'
import { ServiceCard } from '../components/ServiceCard'
import { PostCard } from '../components/PostCard'
import { Counter } from '../components/Counter'
import { CtaBand } from '../components/CtaBand'
import { services, objectives, values, processSteps, audiences } from '../data/services'
import { posts } from '../data/posts'
import { stats, tools } from '../data/site'

export function Home() {
  const featured = posts.slice(0, 3)

  return (
    <>
      <Seo
        title="Collecte, analyse et valorisation des données"
        description="DataSahel accompagne les organisations, institutions et jeunes professionnels d’Afrique dans la collecte, l’analyse, la visualisation des données et le suivi-évaluation. Formations pratiques à Bamako, Mali."
      />

      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 dot-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]"
        />
        <div className="shell relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-20 xl:gap-16">
          <div>
            <Reveal>
              <p className="flex flex-wrap items-center gap-3">
                <span className="h-px w-8 bg-clay-500" />
                <span className="kicker text-clay-600">Data & suivi-évaluation</span>
                <span className="hidden font-mono text-[0.66rem] tracking-wide text-ink/70 sm:inline">
                  Bamako, Mali
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="display-xl mt-6">
                Des données brutes aux <Highlight>décisions</Highlight> qui comptent.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-ink/65 sm:text-[1.08rem]">
                Nous accompagnons les organisations, institutions et jeunes professionnels en
                Afrique dans la <strong className="font-semibold text-ink">collecte</strong>,
                l’<strong className="font-semibold text-ink">analyse</strong>, la{' '}
                <strong className="font-semibold text-ink">visualisation</strong> et la{' '}
                <strong className="font-semibold text-ink">valorisation</strong> de leurs données —
                avec un volet suivi-évaluation rigoureux.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button to="/#expertises" size="lg">
                  Découvrir nos expertises
                </Button>
                <Button to="/contact" variant="outline" size="lg">
                  Parler de votre projet
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ink/10 pt-6 font-mono text-[0.68rem] tracking-wide text-ink/70">
                <span className="flex items-center gap-1.5 text-clay-600">
                  <Sparkles className="size-3.5" /> Former · Analyser · Innover
                </span>
                <span className="hidden size-1 rounded-full bg-ink/20 sm:block" />
                <span>ONG · Universités · Institutions · PME</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18} y={30} className="relative">
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      <Marquee items={tools} />

      {/* La suite de la page vient dans le chapitre suivant. */}
    </>
  )
}`,
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Le hero est une grille, pas un empilement',
      text: "La grille `lg:grid-cols-[1.05fr_0.95fr]` donne légèrement plus d'espace au texte qu'au visuel. Ce déséquilibre discret évite l'effet « deux blocs identiques » et guide l'œil vers le titre. Sur mobile, tout s'empile naturellement.",
    },
    {
      type: 'p',
      text: "Le `Highlight` dessine un trait manuscrit sous un mot clé. C'est un petit détail qui humanise un site de données et rappelle la typographie éditoriale. Le trait est un SVG, donc net à toutes les tailles.",
    },
    {
      type: 'code',
      title: 'src/components/Patterns.tsx — Highlight et SectionHeading',
      lang: 'tsx',
      code: `export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap text-clay-600 italic">
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 h-2.5 w-full text-clay-400/50"
      >
        <path
          d="M2 9C40 3 90 2 120 5s55 4 78 1"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

export function SectionHeading({
  index,
  kicker,
  title,
  description,
  tone = 'dark',
  align = 'left',
  className,
}: {
  index?: string
  kicker: string
  title: ReactNode
  description?: ReactNode
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <SectionLabel
        index={index}
        tone={tone}
        className={align === 'center' ? 'justify-center' : undefined}
      >
        {kicker}
      </SectionLabel>
      <h2
        className={cn(
          'display-lg mt-5',
          tone === 'dark' ? 'text-ink' : 'text-sand-50',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 max-w-2xl text-[1.02rem] leading-relaxed',
            align === 'center' && 'mx-auto',
            tone === 'dark' ? 'text-ink/65' : 'text-sand-100/70',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}`,
    },
    {
      type: 'p',
      text: "Le visuel du hero est un faux tableau de bord de suivi de projet. Rien n'est connecté : les chiffres sont fixés, mais les barres s'animent à l'entrée. C'est un choix assumé — le visuel raconte le métier sans inventer de fausses données en direct.",
    },
    {
      type: 'code',
      title: 'src/components/HeroVisual.tsx — structure et graphique',
      lang: 'tsx',
      code: `import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, TrendingUp } from 'lucide-react'
import { Arcs, DotField } from './Patterns'

const bars = [38, 56, 47, 68, 61, 84, 73]
const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J']

export function HeroVisual() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mx-auto w-full max-w-[33rem]">
      <Arcs className="pointer-events-none absolute -top-10 -right-8 size-[88%] text-clay-500/30" />
      <DotField className="pointer-events-none absolute bottom-16 -left-5 size-[42%] opacity-70" />
      <div className="pointer-events-none absolute right-4 bottom-6 size-40 rounded-full bg-clay-500/15 blur-2xl" />

      <div className="relative z-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-sand-50/95 px-3 py-1.5 font-mono text-[0.6rem] tracking-wider text-ink/70 uppercase shadow-sm backdrop-blur"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-clay-500/70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-clay-500" />
          </span>
          KoboToolbox · terrain
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -1.4 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-2xl border border-ink/10 bg-sand-50 p-4 shadow-[0_36px_80px_-32px_rgba(12,42,69,0.5)] sm:p-5"
        >
          <div className="flex items-center justify-between gap-2 border-b border-ink/8 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex gap-1">
                <span className="size-1.5 rounded-full bg-clay-500" />
                <span className="size-1.5 rounded-full bg-navy-800/25" />
                <span className="size-1.5 rounded-full bg-navy-800/25" />
              </span>
              <span className="font-mono text-[0.58rem] tracking-[0.14em] text-ink/70 uppercase">
                Suivi de projet · 2025
              </span>
            </div>
            <span className="rounded-full bg-clay-500/12 px-2 py-0.5 font-mono text-[0.54rem] tracking-wider text-clay-700 uppercase">
              En cours
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <p className="font-mono text-[0.54rem] tracking-[0.12em] text-ink/70 uppercase">
                Bénéficiaires
              </p>
              <p className="mt-1 font-display text-[1.9rem] leading-none font-semibold text-navy-900">
                12 480
              </p>
              <p className="mt-1.5 flex items-center gap-1 text-[0.64rem] font-medium text-clay-600">
                <TrendingUp className="size-3" /> +18,4% vs 2024
              </p>
            </div>
            <div className="border-l border-ink/8 pl-3">
              <p className="font-mono text-[0.54rem] tracking-[0.12em] text-ink/70 uppercase">
                Réalisation
              </p>
              <p className="mt-1 font-display text-[1.9rem] leading-none font-semibold text-navy-900">
                87<span className="text-base text-clay-500">%</span>
              </p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-navy-900/10">
                <motion.div
                  className="h-full rounded-full bg-clay-500"
                  initial={reduce ? false : { width: 0 }}
                  animate={{ width: '87%' }}
                  transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="mt-1.5 text-[0.64rem] text-ink/70">Cible : 92%</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-navy-900 px-3 pt-3 pb-2 sm:px-4">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[0.52rem] tracking-[0.12em] text-sand-100/65 uppercase">
                Indicateurs mensuels
              </p>
              <div className="flex items-center gap-2.5 font-mono text-[0.48rem] text-sand-100/65">
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-clay-500" /> Réalisé
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-sand-100/25" /> Prévu
                </span>
              </div>
            </div>
            <div className="relative mt-3 flex h-20 items-end gap-1.5 sm:h-28 sm:gap-2">
              {bars.map((value, i) => (
                <div
                  key={labels[i] + i}
                  className="relative flex h-full flex-1 items-end justify-center pb-4"
                >
                  <motion.div
                    className="absolute bottom-4 w-full rounded-t-[3px] bg-sand-100/15"
                    initial={reduce ? false : { height: 0 }}
                    animate={{ height: Math.min(94, value + 14) + '%' }}
                    transition={{ duration: 0.7, delay: 0.45 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.div
                    className={
                      'relative z-10 w-full rounded-t-[3px] ' +
                      (i === 5 ? 'bg-clay-500' : 'bg-sand-100/85')
                    }
                    initial={reduce ? false : { height: 0 }}
                    animate={{ height: value + '%' }}
                    transition={{ duration: 0.7, delay: 0.5 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <span className="absolute bottom-0 font-mono text-[0.46rem] text-sand-100/65">
                    {labels[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="relative z-20 mt-2 flex items-end justify-between gap-3 px-2 sm:mt-1 sm:px-4">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden items-center gap-2.5 rounded-xl border border-ink/10 bg-sand-50 px-3 py-2 shadow-[0_18px_40px_-22px_rgba(12,42,69,0.5)] sm:flex"
          >
            <span className="grid size-6 place-items-center rounded-full bg-clay-500/12">
              <Check className="size-3.5 text-clay-600" strokeWidth={2.4} />
            </span>
            <span className="text-[0.62rem] leading-tight font-medium text-ink/75">
              Rapport d’impact
              <span className="block font-mono text-[0.5rem] text-ink/70">PDF · prêt à partager</span>
            </span>
            <ArrowUpRight className="size-3.5 text-ink/70" />
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="float-slower ml-auto flex items-center gap-3 rounded-2xl border border-sand-100/10 bg-navy-900 p-3 shadow-[0_24px_50px_-20px_rgba(12,42,69,0.7)] sm:gap-4 sm:p-4"
          >
            <div className="relative grid size-12 place-items-center sm:size-16">
              <svg viewBox="0 0 64 64" className="absolute inset-0 size-full -rotate-90">
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(245,236,219,0.14)" strokeWidth="5" />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="#D9601F"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 26}
                  initial={reduce ? false : { strokeDashoffset: 2 * Math.PI * 26 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 26 * 0.2 }}
                  transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <span className="font-display text-xs font-semibold text-sand-50 sm:text-sm">80%</span>
            </div>
            <div>
              <p className="font-mono text-[0.5rem] tracking-[0.12em] text-sand-100/65 uppercase">
                Indicateurs suivis
              </p>
              <p className="mt-1 font-display text-base leading-none font-semibold text-sand-50 sm:text-lg">
                32 <span className="text-sand-100/65">/ 40</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}`,
    },
    {
      type: 'p',
      text: "Le bandeau d'outils est un marquee CSS. Le contenu est dupliqué deux fois, puis translaté de -50 %. Comme la piste est aussi large que les deux copies, la boucle est invisible. La liste complète reste disponible pour les lecteurs d'écran via un paragraphe `sr-only`.",
    },
    {
      type: 'code',
      title: 'src/components/Marquee.tsx',
      lang: 'tsx',
      code: `export function Marquee({ items }: { items: readonly string[] }) {
  const track = (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-5 font-mono text-[0.78rem] tracking-wide whitespace-nowrap text-sand-100/65">
            {item}
          </span>
          <span className="size-1.5 rounded-full bg-clay-500/70" aria-hidden="true" />
        </span>
      ))}
    </div>
  )

  return (
    <div className="mask-fade-x relative overflow-hidden border-y border-sand-100/10 bg-navy-950 py-3.5">
      <div className="flex w-max marquee-track" aria-hidden="true">
        {track}
        {track}
      </div>
      <p className="sr-only">
        Outils et logiciels maîtrisés : {items.join(', ')}.
      </p>
    </div>
  )
}`,
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'Animer sans casser la lecture',
      text: "Chaque animation du hero a une durée inférieure à 1,2 s et commence après le rendu du texte. Le titre reste lisible immédiatement. Si tu ajoutes des animations, teste avec `prefers-reduced-motion` activé et sur un appareil lent.",
    },
  ],
}
