import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Code2,
  ExternalLink,
  Layers,
  Trophy,
} from 'lucide-react'
import { capstone, capstoneChapters } from '../data/capstone'
import { useProgress, progressKeys } from '../components/ProgressProvider'
import { ProgressBar } from '../components/ui'

export function CapstonePage() {
  const { isDone, countDone } = useProgress()
  const done = countDone('chapter:')
  const percent = Math.round((done / capstoneChapters.length) * 100)

  return (
    <>
      <section className="relative overflow-hidden bg-night-950 text-paper-100">
        <div aria-hidden="true" className="absolute inset-0 page-dots opacity-30" />
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-24 size-[34rem] rounded-full bg-brand-500/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-24 size-[28rem] rounded-full bg-coral-500/10 blur-3xl"
        />
        <div className="shell relative py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="kicker text-lime-300">Projet final · capstone</p>
              <h1 className="display-xl mt-5">
                DataSahel,
                <br />
                <span className="text-lime-300">de A à Z.</span>
              </h1>
              <p className="mt-6 max-w-xl font-display text-[1.12rem] leading-relaxed text-paper-200/75">
                {capstone.tagline}
              </p>
              <p className="mt-4 max-w-xl text-[0.96rem] leading-relaxed text-paper-200/60">
                {capstone.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={`/projet-final/${capstoneChapters[0].slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-5 py-3 text-[0.88rem] font-medium text-night-950 transition hover:bg-lime-300"
                >
                  Commencer le chapitre 1 <ArrowRight className="size-4" />
                </Link>
                <a
                  href={capstone.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-paper-100/20 px-5 py-3 text-[0.88rem] font-medium transition hover:border-paper-100/40"
                >
                  Voir le site en ligne <ExternalLink className="size-4" />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.64rem] tracking-wide text-paper-200/45 uppercase">
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="size-3.5" /> {capstoneChapters.length} chapitres
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" /> {capstone.duration}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Trophy className="size-3.5" /> {capstone.level}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-paper-100/15 bg-night-900/80 p-5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[0.62rem] tracking-[0.16em] text-paper-200/45 uppercase">
                    Progression du projet final
                  </p>
                  <span className="font-display text-[1.1rem] font-semibold text-lime-300">{percent}%</span>
                </div>
                <ProgressBar value={percent} className="mt-3" barClassName="bg-lime-400" />
                <p className="mt-3 text-[0.8rem] text-paper-200/50">
                  {done} chapitre{done > 1 ? 's' : ''} terminé{done > 1 ? 's' : ''} sur {capstoneChapters.length}
                </p>

                <div className="mt-5 space-y-1.5">
                  {capstoneChapters.slice(0, 5).map((chapter) => (
                    <Link
                      key={chapter.slug}
                      to={`/projet-final/${chapter.slug}`}
                      className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-[0.8rem] text-paper-200/65 transition hover:bg-paper-100/5 hover:text-paper-50"
                    >
                      <span className="grid size-5 shrink-0 place-items-center rounded border border-paper-100/15 font-mono text-[0.56rem] text-paper-200/45">
                        {isDone(progressKeys.chapter(chapter.slug)) ? (
                          <Check className="size-3 text-lime-400" />
                        ) : (
                          String(chapter.number).padStart(2, '0')
                        )}
                      </span>
                      <span className="truncate">{chapter.title}</span>
                    </Link>
                  ))}
                  <p className="pl-10 font-mono text-[0.64rem] text-paper-200/30">
                    + {capstoneChapters.length - 5} chapitres…
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-14 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="kicker text-brand-600 dark:text-brand-300">Le cahier des charges</p>
            <h2 className="display-md mt-3">Un site réel, avec de vraies contraintes.</h2>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
              {capstone.repoNote}
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {capstone.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-2.5 rounded-xl border border-ink-900/10 bg-white/50 p-3.5 text-[0.82rem] leading-relaxed text-ink-600 dark:border-paper-100/10 dark:bg-night-800/50 dark:text-paper-200/65"
                >
                  <Check className="mt-0.5 size-3.5 shrink-0 text-lime-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5">
            <div className="surface rounded-2xl p-5">
              <p className="font-mono text-[0.62rem] tracking-[0.14em] text-ink-500 uppercase dark:text-paper-200/45">
                Stack du projet
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {capstone.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-ink-900/10 bg-paper-100 px-2.5 py-1 font-mono text-[0.64rem] text-ink-600 dark:border-paper-100/15 dark:bg-night-700 dark:text-paper-200/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="mt-6 flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] text-ink-500 uppercase dark:text-paper-200/45">
                <Code2 className="size-3.5" /> Objectifs
              </p>
              <ul className="mt-3 space-y-2">
                {capstone.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex gap-2.5 text-[0.82rem] leading-relaxed text-ink-600 dark:text-paper-200/65"
                  >
                    <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-coral-500" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-ink-900/10 bg-paper-100/60 dark:border-paper-100/10 dark:bg-night-900/50">
        <div className="shell py-14 sm:py-18">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker text-brand-600 dark:text-brand-300">Le plan</p>
              <h2 className="display-md mt-3">12 chapitres, dans l'ordre de construction.</h2>
            </div>
            <Link
              to={`/projet-final/${capstoneChapters[0].slug}`}
              className="inline-flex items-center gap-1.5 text-[0.84rem] font-medium text-brand-600 hover:underline dark:text-brand-300"
            >
              Commencer <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <ol className="mt-8 grid gap-3 sm:grid-cols-2">
            {capstoneChapters.map((chapter) => {
              const chapterDone = isDone(progressKeys.chapter(chapter.slug))
              return (
                <li key={chapter.slug}>
                  <Link
                    to={`/projet-final/${chapter.slug}`}
                    className="group flex items-start gap-4 rounded-xl border border-ink-900/10 bg-paper-50 p-4 transition hover:border-brand-500/30 dark:border-paper-100/10 dark:bg-night-800/60 dark:hover:border-lime-400/25"
                  >
                    <span
                      className={
                        chapterDone
                          ? 'mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-lime-500/40 bg-lime-400/20 font-mono text-[0.7rem] text-lime-600 dark:text-lime-300'
                          : 'mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-ink-900/15 font-mono text-[0.7rem] text-ink-500 dark:border-paper-100/15 dark:text-paper-200/50'
                      }
                    >
                      {chapterDone ? <Check className="size-4" /> : String(chapter.number).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-[0.98rem] font-semibold text-ink-900 group-hover:text-brand-600 dark:text-paper-50 dark:group-hover:text-lime-300">
                          {chapter.title}
                        </span>
                        <span className="font-mono text-[0.6rem] text-ink-400 dark:text-paper-200/40">
                          {chapter.duration}
                        </span>
                      </span>
                      <span className="mt-1 block text-[0.8rem] leading-relaxed text-ink-500 dark:text-paper-200/50">
                        {chapter.summary}
                      </span>
                    </span>
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-ink-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500 dark:text-paper-200/25" />
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="shell py-14 text-center sm:py-18">
        <p className="kicker text-coral-500">À toi de jouer</p>
        <h2 className="display-md mx-auto mt-4 max-w-2xl">
          Un site professionnel, un vrai portfolio.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
          À la fin des douze chapitres, tu auras une application déployée : six routes, un design
          system, un blog, un formulaire, une page 404 et une vraie checklist de production.
        </p>
        <Link
          to={`/projet-final/${capstoneChapters[0].slug}`}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-[0.88rem] font-medium text-white transition hover:bg-brand-700"
        >
          Commencer maintenant <ArrowRight className="size-4" />
        </Link>
      </section>
    </>
  )
}
