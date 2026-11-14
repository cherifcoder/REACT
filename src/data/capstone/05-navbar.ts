import type { CapstoneChapter } from '../types'

export const chapterNavbar: CapstoneChapter = {
  slug: 'navbar-et-layout',
  number: 5,
  title: 'Navbar, layout et navigation accessible',
  summary:
    "Une barre de contacts, un en-tête collant qui réagit au scroll, un menu mobile plein écran et un layout avec lien d'évitement. C'est la colonne vertébrale du site.",
  duration: '70 min',
  blocks: [
    {
      type: 'p',
      text: "La navigation porte l'identité du site autant que le hero. DataSahel utilise deux niveaux : une **barre utilitaire** sombre (adresse, téléphone, e-mail) visible sur desktop, puis un **en-tête** sable avec le logo, les liens et un bouton d'action. Au scroll, l'en-tête gagne une bordure et un fond translucide.",
    },
    {
      type: 'code',
      title: 'src/components/Navbar.tsx — logique et barre utilitaire',
      lang: 'tsx',
      code: `import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Menu, Phone, X } from 'lucide-react'
import { navLinks, site } from '../data/site'
import { cn } from '../lib/utils'
import { Logo } from './Logo'
import { Button } from './Button'
import { SocialLinks } from './SocialLinks'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    if (to.startsWith('/#')) return false
    return location.pathname.startsWith(to)
  }

  return (
    <>
      <aside
        aria-label="Coordonnées et contacts"
        className="relative z-50 hidden bg-navy-950 text-sand-100/70 md:block"
      >
        <div className="shell flex h-9 items-center justify-between text-[0.72rem]">
          <p className="flex items-center gap-2 font-mono tracking-wide">
            <MapPin className="size-3.5 text-clay-400" strokeWidth={1.8} />
            Kalaban Coura ACI · Bamako, Mali
          </p>
          <div className="flex items-center gap-5 font-mono">
            <a href={site.phoneHref} className="flex items-center gap-2 transition hover:text-sand-50">
              <Phone className="size-3.5 text-clay-400" strokeWidth={1.8} />
              {site.phone}
            </a>
            <span aria-hidden="true" className="h-3 w-px bg-sand-100/20" />
            <a href={'mailto:' + site.email} className="transition hover:text-sand-50">
              {site.email}
            </a>
          </div>
        </div>
      </aside>

      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-ink/8 bg-sand-50/90 shadow-[0_10px_40px_-24px_rgba(12,42,69,0.35)] backdrop-blur-xl'
            : 'border-b border-transparent bg-sand-50/60 backdrop-blur-sm',
        )}
      >
        <div className="shell flex h-[4.6rem] items-center justify-between gap-6">
          <Link to="/" aria-label="DataSahel — retour à l'accueil" className="relative z-10">
            <Logo />
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.to)
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'group relative px-3.5 py-2 text-[0.86rem] font-medium transition-colors',
                    active ? 'text-clay-600' : 'text-ink/75 hover:text-ink',
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-clay-500 transition-transform duration-300 ease-out-expo',
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </NavLink>
              )
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden sm:block">
              <Button to="/contact" size="md">
                Demander un devis
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-ink/40 lg:hidden"
            >
              <Menu className="size-5" strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </header>`,
    },
    {
      type: 'code',
      title: 'src/components/Navbar.tsx — menu mobile',
      lang: 'tsx',
      code: `      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex flex-col bg-sand-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="shell flex h-[4.6rem] shrink-0 items-center justify-between border-b border-ink/10">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-ink/40"
              >
                <X className="size-5" strokeWidth={1.7} />
              </button>
            </div>

            <nav className="shell flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.45 }}
                >
                  <Link
                    to={link.to}
                    className="group flex items-baseline justify-between border-b border-ink/8 py-4"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.65rem] text-clay-500">0{i + 1}</span>
                      <span className="font-display text-3xl text-ink transition group-hover:text-clay-600">
                        {link.label}
                      </span>
                    </span>
                    <ArrowUpRight className="size-5 text-ink/70 transition group-hover:-translate-y-0.5 group-hover:text-clay-500" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.45 }}
                className="mt-8 flex flex-col gap-4"
              >
                <Button to="/contact" size="lg" className="w-full">
                  Demander un devis
                </Button>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-sand-100/60 p-4">
                  <div className="text-sm">
                    <p className="font-mono text-[0.62rem] tracking-widest text-ink/70 uppercase">
                      Écrivez-nous
                    </p>
                    <a href={'mailto:' + site.email} className="mt-1 block font-medium text-ink">
                      {site.email}
                    </a>
                    <a href={site.phoneHref} className="text-ink/65">
                      {site.phone}
                    </a>
                  </div>
                  <SocialLinks />
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}`,
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Trois effets, trois responsabilités',
      text: "Le premier écoute le scroll pour l'apparence. Le second ferme le menu quand l'URL change. Le troisième verrouille le scroll du body quand le menu est ouvert, avec un nettoyage obligatoire. Mélanger ces effets rendrait les bugs impossibles à isoler.",
    },
    {
      type: 'p',
      text: "Le layout enveloppe toutes les pages. Il place le lien d'évitement, remet le scroll en haut à chaque navigation, et garde le footer en bas même sur les pages courtes.",
    },
    {
      type: 'code',
      title: 'src/components/Layout.tsx',
      lang: 'tsx',
      code: `import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollToTop } from './Seo'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-sm focus:text-sand-50"
      >
        Aller au contenu principal
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="contenu" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}`,
    },
    {
      type: 'code',
      title: 'src/components/Seo.tsx — titres et retour en haut',
      lang: 'tsx',
      code: `import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site'

type SeoProps = {
  title: string
  description?: string
}

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title + ' — ' + site.name
    if (description) {
      const tag = document.querySelector('meta[name="description"]')
      if (tag) tag.setAttribute('content', description)
    }
  }, [title, description])

  return null
}

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        window.setTimeout(() => {
          const top = el.getBoundingClientRect().top + window.scrollY - 96
          window.scrollTo({ top, behavior: 'smooth' })
        }, 80)
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}`,
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Ancres et navigation',
      text: "`/` puis `/#expertises` partagent le même chemin : sans le second effet, React Router ne rejoue pas le scroll et l'utilisateur reste au milieu de la page. Le délai de 80 ms laisse le temps à la section cible d'être montée avant de calculer sa position.",
    },
    {
      type: 'code',
      title: 'src/main.tsx — les routes',
      lang: 'tsx',
      code: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Blog } from './pages/Blog'
import { Article } from './pages/Article'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="a-propos" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<Article />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)`,
    },
  ],
}
