import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Check,
  Code2,
  Compass,
  FolderCode,
  Layers,
  Rocket,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import { modules, totalDuration, totalLessons, totalProjects } from '../data/modules'
import { guidedProjects } from '../data/guided'
import { capstone, capstoneChapters } from '../data/capstone'
import { useProgress } from '../components/ProgressProvider'
import { Badge, ProgressBar, SectionHeading } from '../components/ui'
import { GuidedCard, ModuleCard } from '../components/cards'
import { cn, formatDuration } from '../lib/utils'

const stats = [
  { value: '06', label: 'modules progressifs', icon: BookOpen },
  { value: String(totalLessons).padStart(2, '0'), label: 'leçons détaillées', icon: Compass },
  { value: String(totalProjects), label: 'projets pratiques', icon: FolderCode },
  { value: '05', label: 'projets guidés', icon: Trophy },
  { value: '12', label: 'chapitres finaux', icon: Layers },
]

const method = [
  {
    title: 'Lis le concept',
    text: "Chaque leçon explique une notion avec un exemple minimal, puis le pourquoi des choix.",
    icon: BookOpen,
  },
  {
    title: 'Reproduis le code',
    text: "Les blocs sont copiables. Écris-les toi-même dans ton éditeur : c'est là que tout se fixe.",
    icon: Braces,
  },
  {
    title: 'Pratique seul',
    text: "Dix projets par module, du plus simple au plus ambitieux. Aucun corrigé imposé : des étapes et des bonus.",
    icon: Target,
  },
  {
    title: 'Construis le vrai projet',
    text: "Cinq applications guidées, puis DataSahel complet : design, routing, accessibilité, déploiement.",
    icon: Rocket,
  },
]

function HeroEditor() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-500/15 via-lime-400/10 to-coral-500/15 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-ink-900/15 bg-night-900 shadow-2xl shadow-ink-900/20 dark:border-paper-100/15">
        <div className="flex items-center gap-3 border-b border-paper-100/10 bg-night-850 px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-coral-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-lime-400/80" />
          </span>
          <span className="font-mono text-[0.68rem] text-paper-200/50">useCounter.ts</span>
          <span className="ml-auto rounded-full bg-lime-400/10 px-2 py-0.5 font-mono text-[0.56rem] tracking-[0.12em] text-lime-300 uppercase">
            TypeScript
          </span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[0.74rem] leading-[1.8] text-paper-100/85">
          <code>
            <span className="text-coral-300">import</span>
            <span className="text-paper-100/85"> {'{ useState }'} </span>
            <span className="text-coral-300">from</span>
            <span className="text-lime-300"> 'react'</span>
            {'\n\n'}
            <span className="text-brand-300">export function</span>
            <span className="text-paper-50"> useCounter</span>
            <span className="text-paper-100/60">(initial = 0) {'{'}</span>
            {'\n  '}
            <span className="text-coral-300">const</span>
            <span className="text-paper-100/85"> [count, setCount] = </span>
            <span className="text-brand-300">useState</span>
            <span className="text-paper-100/60">(initial)</span>
            {'\n\n  '}
            <span className="text-coral-300">const</span>
            <span className="text-paper-100/85"> increment = () =&gt; {'{'}</span>
            {'\n    '}
            <span className="text-brand-300">setCount</span>
            <span className="text-paper-100/85">((c) =&gt; c + 1)</span>
            {'\n  }\n'}
            {'\n\n  '}
            <span className="text-coral-300">return</span>
            <span className="text-paper-100/85"> {'{ count, increment }'}</span>
            {'\n}'}
            {'\n\n'}
            <span className="text-paper-200/35">{'// un hook, un rôle, un test'}</span>
          </code>
        </pre>
        <div className="flex items-center justify-between border-t border-paper-100/10 bg-night-850 px-4 py-2.5 font-mono text-[0.6rem] text-paper-200/35">
          <span>React Atelier · module 05</span>
          <span className="inline-flex items-center gap-1.5 text-lime-300">
            <Check className="size-3" /> 0 erreur TypeScript
          </span>
        </div>
      </div>

      <div className="animate-float absolute -top-5 -left-4 hidden rounded-xl border border-ink-900/10 bg-white px-3 py-2 shadow-lg sm:block dark:border-paper-100/15 dark:bg-night-800">
        <p className="font-mono text-[0.58rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
          Stack
        </p>
        <p className="font-display text-[0.84rem] font-semibold text-ink-900 dark:text-paper-50">
          React 19 · Vite 7
        </p>
      </div>
      <div className="animate-float-slow absolute -right-4 -bottom-6 hidden rounded-xl border border-ink-900/10 bg-lime-400 px-3 py-2 shadow-lg sm:block">
        <p className="font-mono text-[0.58rem] tracking-[0.14em] text-night-950/60 uppercase">
          Projet final
        </p>
        <p className="font-display text-[0.84rem] font-semibold text-night-950">
          DataSahel en ligne
        </p>
      </div>
    </div>
  )
}

export function Home() {
  const { countDone, totals } = useProgress()
  const lessonsDone = countDone('lesson:')
  const projectsDone = countDone('project:')
  const percent = Math.round(((lessonsDone + projectsDone) / (totals.lessons + totals.projects)) * 100)

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-60" />
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-24 size-[34rem] rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-500/15"
        />
        <div className="shell relative grid items-center gap-14 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <div className="animate-rise flex flex-wrap items-center gap-2">
              <Badge className="border-brand-500/25 bg-brand-500/10 text-brand-700 dark:text-brand-200">
                <Sparkles className="size-3" /> Parcours complet · 2026
              </Badge>
              <Badge>React 19 + TypeScript</Badge>
            </div>

            <h1 className="display-xl mt-6 animate-rise-2">
              Apprends React
              <br />
              en <span className="text-brand-600 dark:text-lime-300">construisant</span>,
              <br />
              pas en regardant.
            </h1>

            <p className="mt-6 max-w-xl animate-rise-3 text-[1.02rem] leading-relaxed text-ink-600 dark:text-paper-200/70">
              De l'installation de Node à la mise en ligne d'un site professionnel : 6 modules
              détaillés, 60 projets progressifs, 5 applications guidées et la reconstruction
              complète du site <strong className="font-semibold text-ink-900 dark:text-paper-50">DataSahel</strong>.
            </p>

            <div className="mt-8 flex animate-rise-3 flex-wrap items-center gap-3">
              <Link
                to={`/modules/${modules[0].slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-[0.88rem] font-medium text-paper-50 transition hover:bg-brand-600 dark:bg-lime-400 dark:text-night-950 dark:hover:bg-lime-300"
              >
                Commencer le parcours
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/projets"
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white/60 px-5 py-3 text-[0.88rem] font-medium text-ink-800 transition hover:border-ink-900/30 dark:border-paper-100/20 dark:bg-night-800/60 dark:text-paper-100 dark:hover:border-paper-100/40"
              >
                Voir les 60 projets
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="mt-9 flex max-w-md items-center gap-4">
              <ProgressBar value={percent} className="max-w-[13rem]" />
              <p className="font-mono text-[0.62rem] tracking-[0.1em] text-ink-500 uppercase dark:text-paper-200/45">
                {lessonsDone + projectsDone} / {totals.lessons + totals.projects} étapes · {percent}%
              </p>
            </div>
          </div>

          <div className="animate-rise-3 lg:col-span-5">
            <HeroEditor />
          </div>
        </div>

        <div className="relative border-y border-ink-900/10 bg-white/50 dark:border-paper-100/10 dark:bg-night-900/50">
          <div className="shell grid grid-cols-2 divide-x divide-ink-900/10 py-6 sm:grid-cols-5 dark:divide-paper-100/10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 px-4 py-2 first:pl-0">
                <stat.icon className="size-4 shrink-0 text-brand-500 dark:text-lime-300" />
                <div>
                  <p className="font-display text-[1.25rem] leading-none font-semibold">{stat.value}</p>
                  <p className="mt-1 text-[0.68rem] leading-tight text-ink-500 dark:text-paper-200/45">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-20">
        <SectionHeading
          kicker="Le programme"
          title="Six modules, une progression sans trous"
          text="Chaque module part d'un problème concret, explique la notion, puis te la fait pratiquer dix fois. Rien n'est supposé acquis."
          action={
            <Link
              to="/modules"
              className="inline-flex items-center gap-1.5 text-[0.84rem] font-medium text-brand-600 hover:underline dark:text-brand-300"
            >
              Voir le détail <ArrowRight className="size-3.5" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-ink-900/15 px-5 py-4 dark:border-paper-100/15">
          <p className="text-[0.86rem] text-ink-600 dark:text-paper-200/60">
            Durée totale estimée : <strong className="text-ink-900 dark:text-paper-50">{formatDuration(totalDuration)}</strong> de
            lecture et de pratique, à ton rythme. La progression est sauvegardée dans ton navigateur.
          </p>
          <Link
            to="/progression"
            className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.12em] text-brand-600 uppercase hover:underline dark:text-brand-300"
          >
            Ma progression <ArrowRight className="size-3" />
          </Link>
        </div>
      </section>

      <section className="border-y border-ink-900/10 bg-paper-100/70 dark:border-paper-100/10 dark:bg-night-900/60">
        <div className="shell py-16 sm:py-20">
          <SectionHeading
            kicker="La méthode"
            title="Lire, écrire, pratiquer, construire"
            text="Quatre temps, répétés à chaque module. C'est ce cycle qui transforme la lecture en compétence."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {method.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-ink-900/10 bg-paper-50 p-5 dark:border-paper-100/10 dark:bg-night-800/70"
              >
                <span className="font-mono text-[0.62rem] tracking-[0.16em] text-coral-500 uppercase">
                  0{index + 1}
                </span>
                <step.icon className="mt-4 size-5 text-brand-600 dark:text-lime-300" strokeWidth={1.6} />
                <h3 className="mt-3 font-display text-[1.02rem] font-semibold">{step.title}</h3>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-600 dark:text-paper-200/60">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-20">
        <SectionHeading
          kicker="Projets guidés"
          title="Cinq applications complètes, pas à pas"
          text="Quand les bases sont là, on change d'échelle : un gestionnaire de tâches, une météo, une boutique, un blog et un budget. Chaque étape est expliquée et fournie."
          action={
            <Link
              to="/projets-guedes"
              className="inline-flex items-center gap-1.5 text-[0.84rem] font-medium text-brand-600 hover:underline dark:text-brand-300"
            >
              Les cinq projets <ArrowRight className="size-3.5" />
            </Link>
          }
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {guidedProjects.slice(0, 3).map((project, index) => (
            <GuidedCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {guidedProjects.slice(3).map((project, index) => (
            <GuidedCard key={project.slug} project={project} index={index + 3} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-night-950 py-16 text-paper-100 sm:py-20">
        <div aria-hidden="true" className="absolute inset-0 page-dots opacity-30" />
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 size-[26rem] rounded-full bg-brand-500/20 blur-3xl"
        />
        <div className="shell relative grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="kicker text-lime-300">Projet final · capstone</p>
            <h2 className="display-lg mt-4">
              Reconstruis <span className="text-lime-300">DataSahel</span>,
              <br />
              un vrai site, de bout en bout.
            </h2>
            <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-paper-200/65">
              {capstone.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/projet-final"
                className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-5 py-3 text-[0.88rem] font-medium text-night-950 transition hover:bg-lime-300"
              >
                Ouvrir le projet final
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={capstone.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-paper-100/20 px-5 py-3 text-[0.88rem] font-medium text-paper-100 transition hover:border-paper-100/40"
              >
                Voir le site original
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-paper-100/15 bg-night-900/80 p-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[0.64rem] tracking-[0.16em] text-paper-200/45 uppercase">
                  12 chapitres
                </p>
                <Code2 className="size-4 text-coral-400" />
              </div>
              <ol className="mt-4 space-y-2">
                {capstoneChapters.slice(0, 6).map((chapter) => (
                  <li key={chapter.slug} className="flex items-center gap-3 text-[0.82rem] text-paper-200/70">
                    <span className="grid size-6 shrink-0 place-items-center rounded-md border border-paper-100/15 font-mono text-[0.6rem] text-paper-200/50">
                      {String(chapter.number).padStart(2, '0')}
                    </span>
                    {chapter.title}
                  </li>
                ))}
                <li className="pl-9 font-mono text-[0.68rem] text-paper-200/35">
                  + 6 autres chapitres…
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-16 text-center sm:py-20">
        <p className="kicker text-brand-600 dark:text-brand-300">Prêt à écrire du code ?</p>
        <h2 className="display-md mx-auto mt-4 max-w-2xl">
          La meilleure façon d'apprendre React reste de construire quelque chose.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[0.96rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
          Commence par le module 1, ou choisis directement un projet qui te motive. Ta progression
          est conservée localement, sans compte ni inscription.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to={`/modules/${modules[0].slug}`}
            className={cn(
              'inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-[0.88rem] font-medium text-white transition hover:bg-brand-700',
            )}
          >
            Démarrer le module 1 <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/projet-final"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-6 py-3 text-[0.88rem] font-medium transition hover:border-ink-900/30 dark:border-paper-100/20 dark:hover:border-paper-100/40"
          >
            Voir le projet final <Layers className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
