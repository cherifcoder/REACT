import { Link } from 'react-router-dom'
import { ArrowLeft, Compass, Home, Search } from 'lucide-react'

export function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-20">
      <div aria-hidden="true" className="absolute inset-0 page-dots opacity-40" />
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 size-[26rem] rounded-full bg-coral-500/10 blur-3xl"
      />
      <div className="shell relative max-w-2xl">
        <p className="font-display text-[7rem] leading-none font-semibold text-coral-500/25 sm:text-[10rem]">
          404
        </p>
        <h1 className="display-lg mt-2">Cette page n'est pas dans le parcours.</h1>
        <p className="mt-5 max-w-lg leading-relaxed text-ink-600 dark:text-paper-200/65">
          Le lien est peut-être obsolète, ou l'adresse comporte une faute. Reprenons depuis un
          point connu : le programme, les projets ou le projet final.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-[0.86rem] font-medium text-paper-50 transition hover:bg-brand-600 dark:bg-lime-400 dark:text-night-950 dark:hover:bg-lime-300"
          >
            <Home className="size-4" /> Retour à l'accueil
          </Link>
          <Link
            to="/modules"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-5 py-2.5 text-[0.86rem] font-medium transition hover:border-ink-900/30 dark:border-paper-100/20 dark:hover:border-paper-100/40"
          >
            <Compass className="size-4" /> Voir les modules
          </Link>
          <Link
            to="/projets"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-5 py-2.5 text-[0.86rem] font-medium transition hover:border-ink-900/30 dark:border-paper-100/20 dark:hover:border-paper-100/40"
          >
            <Search className="size-4" /> Les projets
          </Link>
        </div>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-1.5 font-mono text-[0.64rem] tracking-[0.14em] text-ink-400 uppercase transition hover:text-brand-600 dark:text-paper-200/40 dark:hover:text-lime-300"
        >
          <ArrowLeft className="size-3" /> React Atelier
        </Link>
      </div>
    </section>
  )
}
