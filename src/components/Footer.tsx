import { Link } from 'react-router-dom'
import { ArrowUpRight, Code2, Github, Heart } from 'lucide-react'
import { modules } from '../data/modules'
import { guidedProjects } from '../data/guided'
import { capstoneChapters } from '../data/capstone'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-ink-900/10 bg-paper-100 dark:border-paper-100/10 dark:bg-night-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 page-dots opacity-40" />
      <div className="shell relative py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-2.5" aria-label="React Atelier — accueil">
              <span className="grid size-9 place-items-center rounded-xl bg-ink-900 text-lime-300 dark:bg-lime-400 dark:text-night-950">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="2.1" fill="currentColor" />
                  <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.2" />
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="9"
                    ry="3.6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    transform="rotate(60 12 12)"
                  />
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="9"
                    ry="3.6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    transform="rotate(120 12 12)"
                  />
                </svg>
              </span>
              <span className="font-display text-[1.02rem] font-semibold">React Atelier</span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-ink-600 dark:text-paper-200/65">
              Apprendre React par la pratique, de l'installation à un site professionnel complet.
              Six modules, soixante projets, cinq applications guidées et un projet final.
            </p>
            <p className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.66rem] tracking-[0.12em] text-ink-500 uppercase dark:text-paper-200/45">
              Construit avec React 19 <Heart className="size-3 text-coral-500" /> Vite 7 · Tailwind 4
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="kicker text-ink-500 dark:text-paper-200/50">Modules</p>
            <ul className="mt-5 space-y-2.5 text-[0.88rem]">
              {modules.slice(0, 4).map((module) => (
                <li key={module.slug}>
                  <Link
                    to={`/modules/${module.slug}`}
                    className="group inline-flex items-center gap-1 text-ink-600 transition hover:text-ink-900 dark:text-paper-200/65 dark:hover:text-paper-50"
                  >
                    {module.title}
                    <ArrowUpRight className="size-3 opacity-0 transition group-hover:opacity-70" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/modules"
                  className="font-medium text-brand-600 transition hover:underline dark:text-brand-300"
                >
                  Tous les modules
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="kicker text-ink-500 dark:text-paper-200/50">Pratiquer</p>
            <ul className="mt-5 space-y-2.5 text-[0.88rem]">
              <li>
                <Link
                  to="/projets"
                  className="text-ink-600 transition hover:text-ink-900 dark:text-paper-200/65 dark:hover:text-paper-50"
                >
                  60 projets pratiques
                </Link>
              </li>
              {guidedProjects.slice(0, 3).map((project) => (
                <li key={project.slug}>
                  <Link
                    to={`/projets-guedes/${project.slug}`}
                    className="text-ink-600 transition hover:text-ink-900 dark:text-paper-200/65 dark:hover:text-paper-50"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/projets-guedes"
                  className="font-medium text-brand-600 transition hover:underline dark:text-brand-300"
                >
                  Tous les projets guidés
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="kicker text-ink-500 dark:text-paper-200/50">Projet final</p>
            <ul className="mt-5 space-y-2.5 text-[0.88rem]">
              <li>
                <Link
                  to="/projet-final"
                  className="inline-flex items-center gap-1.5 font-medium text-ink-900 dark:text-paper-50"
                >
                  DataSahel, de A à Z
                  <Code2 className="size-3.5 text-coral-500" />
                </Link>
              </li>
              {capstoneChapters.slice(0, 3).map((chapter) => (
                <li key={chapter.slug}>
                  <Link
                    to={`/projet-final/${chapter.slug}`}
                    className="text-ink-600 transition hover:text-ink-900 dark:text-paper-200/65 dark:hover:text-paper-50"
                  >
                    {chapter.number}. {chapter.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/progression"
                  className="font-medium text-brand-600 transition hover:underline dark:text-brand-300"
                >
                  Ma progression
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-900/10 pt-6 text-[0.76rem] text-ink-500 sm:flex-row sm:items-center sm:justify-between dark:border-paper-100/10 dark:text-paper-200/45">
          <p>© {year} React Atelier. Un parcours pédagogique, librement inspiré des meilleures pratiques React.</p>
          <p className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] tracking-[0.14em] uppercase">
            <Github className="size-3" /> Apprendre en construisant
          </p>
        </div>
      </div>
    </footer>
  )
}
