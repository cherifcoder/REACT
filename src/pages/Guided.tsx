import { Link } from 'react-router-dom'
import { ArrowRight, Check, Compass, Layers, ListChecks, Trophy } from 'lucide-react'
import { guidedProjects } from '../data/guided'
import { GuidedCard } from '../components/cards'
import { Badge, SectionHeading } from '../components/ui'

const advice = [
  {
    title: 'Lis le projet en entier',
    text: "Parcours les étapes sans coder pour comprendre l'architecture avant de commencer. Tu éviteras les impasses.",
    icon: Compass,
  },
  {
    title: 'Crée le projet toi-même',
    text: "`npm create vite@latest`, installe les dépendances, puis écris chaque fichier dans l'ordre. Ne copie pas le projet d'un bloc.",
    icon: ListChecks,
  },
  {
    title: 'Vérifie après chaque étape',
    text: "Chaque étape se termine par un écran qui fonctionne. Si ça casse, reviens à l'étape précédente avant d'avancer.",
    icon: Check,
  },
  {
    title: 'Personnalise à la fin',
    text: "Change les couleurs, ajoute une fonctionnalité, adapte le contenu. Un projet guidé doit devenir ton projet.",
    icon: Trophy,
  },
]

export function Guided() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-900/10 dark:border-paper-100/10">
        <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-50" />
        <div
          aria-hidden="true"
          className="absolute -top-28 -right-20 size-[24rem] rounded-full bg-coral-500/10 blur-3xl"
        />
        <div className="shell relative py-14 sm:py-18">
          <Badge className="border-coral-500/30 bg-coral-500/10 text-coral-600 dark:text-coral-300">
            <Trophy className="size-3" /> Cinq applications complètes
          </Badge>
          <h1 className="display-lg mt-5 max-w-3xl">Des projets guidés, du premier fichier au dernier détail.</h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
            Ici, on change d'échelle. Chaque projet rassemble plusieurs modules dans une application
            cohérente : state, formulaires, hooks, routing, persistance et design. Le code est fourni
            et expliqué étape par étape, mais c'est toi qui l'écris.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.66rem] tracking-wide text-ink-500 uppercase dark:text-paper-200/45">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="size-3.5" /> 5 projets
            </span>
            <span>Du niveau intermédiaire au niveau avancé</span>
            <span>3 à 6 heures par projet</span>
          </div>
        </div>
      </section>

      <section className="shell py-12 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guidedProjects.map((project, index) => (
            <GuidedCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="border-y border-ink-900/10 bg-paper-100/70 dark:border-paper-100/10 dark:bg-night-900/60">
        <div className="shell py-14 sm:py-18">
          <SectionHeading
            kicker="Méthode"
            title="Comment tirer le maximum d'un projet guidé"
            text="Un projet guidé n'est pas un tutoriel vidéo à regarder. C'est un plan de construction à exécuter."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {advice.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-ink-900/10 bg-paper-50 p-5 dark:border-paper-100/10 dark:bg-night-800/70"
              >
                <div className="flex items-center justify-between">
                  <item.icon className="size-5 text-brand-600 dark:text-lime-300" strokeWidth={1.6} />
                  <span className="font-mono text-[0.6rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[1rem] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-600 dark:text-paper-200/60">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-14 text-center sm:py-18">
        <p className="kicker text-brand-600 dark:text-brand-300">Ensuite</p>
        <h2 className="display-md mx-auto mt-4 max-w-2xl">
          Le vrai test : reconstruire un site professionnel complet.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
          Le projet final reprend tout : design system, données typées, routing, animations,
          accessibilité et déploiement. Douze chapitres, un site en ligne.
        </p>
        <Link
          to="/projet-final"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[0.88rem] font-medium text-paper-50 transition hover:bg-brand-600 dark:bg-lime-400 dark:text-night-950 dark:hover:bg-lime-300"
        >
          Découvrir le projet final <ArrowRight className="size-4" />
        </Link>
      </section>
    </>
  )
}
