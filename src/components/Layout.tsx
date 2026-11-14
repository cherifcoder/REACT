import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Command, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { useProgress } from './ProgressProvider'
import { useTheme } from './ThemeProvider'
import { SearchPalette } from './SearchPalette'
import { Footer } from './Footer'
import { cn } from '../lib/utils'

const navItems = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/modules', label: 'Modules' },
  { to: '/projets', label: 'Projets' },
  { to: '/projets-guedes', label: 'Projets guidés' },
  { to: '/projet-final', label: 'Projet final' },
  { to: '/progression', label: 'Progression' },
]

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="React Atelier — accueil">
      <span className="relative grid size-9 place-items-center rounded-xl bg-ink-900 text-lime-300 transition group-hover:bg-brand-600 dark:bg-lime-400 dark:text-night-950 dark:group-hover:bg-lime-300">
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
      <span className="font-display text-[1.02rem] font-semibold tracking-tight">
        React<span className="text-brand-600 dark:text-lime-300"> Atelier</span>
      </span>
    </Link>
  )
}

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { countDone, totals } = useProgress()
  const location = useLocation()

  const done = countDone('lesson:') + countDone('project:') + countDone('guided:') + countDone('chapter:')
  const percent = Math.round((done / totals.items) * 100)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-paper-50"
      >
        Aller au contenu
      </a>

      <header className="sticky top-0 z-50 border-b border-ink-900/10 bg-paper-50/85 backdrop-blur-md dark:border-paper-100/10 dark:bg-night-950/85">
        <div className="shell flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-3 py-2 text-[0.82rem] font-medium transition',
                    isActive
                      ? 'bg-ink-900 text-paper-50 dark:bg-paper-100 dark:text-night-950'
                      : 'text-ink-600 hover:bg-ink-900/5 hover:text-ink-900 dark:text-paper-200/65 dark:hover:bg-paper-100/10 dark:hover:text-paper-50',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-ink-900/10 bg-white/60 py-1.5 pr-1.5 pl-3 text-[0.78rem] text-ink-500 transition hover:border-ink-900/20 hover:text-ink-900 sm:flex dark:border-paper-100/15 dark:bg-night-800/60 dark:text-paper-200/60 dark:hover:border-paper-100/30 dark:hover:text-paper-50"
              aria-label="Rechercher dans le parcours"
            >
              <Search className="size-3.5" />
              <span>Rechercher</span>
              <span className="flex items-center gap-0.5 rounded-full border border-ink-900/10 bg-paper-100 px-1.5 py-0.5 font-mono text-[0.58rem] dark:border-paper-100/15 dark:bg-night-700">
                <Command className="size-2.5" />K
              </span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="grid size-9 place-items-center rounded-full border border-ink-900/10 bg-white/60 text-ink-600 transition hover:text-ink-900 dark:border-paper-100/15 dark:bg-night-800/60 dark:text-paper-200/70 dark:hover:text-paper-50"
              aria-label={theme === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre'}
            >
              {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="grid size-9 place-items-center rounded-full border border-ink-900/10 bg-white/60 text-ink-600 lg:hidden dark:border-paper-100/15 dark:bg-night-800/60 dark:text-paper-200/70"
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        <div className="shell pb-2">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-ink-900/10 dark:bg-paper-100/10">
              <div
                className="h-px bg-brand-500 transition-[width] duration-500 dark:bg-lime-400"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="font-mono text-[0.6rem] tracking-[0.14em] text-ink-400 uppercase dark:text-paper-200/40">
              {percent}% du parcours
            </span>
          </div>
        </div>

        {mobileOpen ? (
          <nav
            aria-label="Navigation mobile"
            className="border-t border-ink-900/10 bg-paper-50 px-5 py-3 lg:hidden dark:border-paper-100/10 dark:bg-night-950"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-lg px-3 py-2.5 text-sm font-medium transition',
                        isActive
                          ? 'bg-ink-900 text-paper-50 dark:bg-paper-100 dark:text-night-950'
                          : 'text-ink-600 hover:bg-ink-900/5 dark:text-paper-200/70 dark:hover:bg-paper-100/10',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false)
                setSearchOpen(true)
              }}
              className="mt-3 flex w-full items-center gap-2 rounded-lg border border-ink-900/10 px-3 py-2.5 text-sm text-ink-600 dark:border-paper-100/15 dark:text-paper-200/70"
            >
              <Search className="size-4" /> Rechercher dans le parcours
            </button>
          </nav>
        ) : null}
      </header>

      <main id="contenu" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
