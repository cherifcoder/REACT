import type { GuidedProject } from '../types'

export const devblog: GuidedProject = {
  slug: 'devblog',
  title: 'DevBlog',
  tagline: 'Un blog complet avec routing, auth simulée et back-office.',
  description:
    "DevBlog est un blog de développeur : articles publics, catégories, recherche, page article, connexion simulée et espace d'administration pour créer, modifier et supprimer des articles. Tout est persisté dans localStorage. C'est le projet idéal pour maîtriser React Router, les formulaires, l'authentification et un mini-CMS.",
  level: 'Avancé',
  duration: '6 à 8 heures',
  stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'React Router 7', 'lucide-react'],
  features: [
    'Liste d’articles avec recherche et filtres par catégorie',
    'Page article avec rendu de contenu structuré et temps de lecture',
    'Articles liés et navigation précédent/suivant',
    'Connexion simulée avec session persistée',
    'Routes admin protégées',
    'Création, modification et suppression d’articles',
    'Brouillons et publication',
    'Mode sombre persistant',
  ],
  outcomes: [
    'Structurer un projet multi-pages avec React Router 7',
    'Créer un contexte d’authentification et des routes protégées',
    'Construire un mini-CMS avec CRUD et persistance',
    'Écrire un rendu de contenu simple sans dépendance',
    'Gérer les métadonnées de page et l’accessibilité',
  ],
  steps: [
    {
      title: 'Cadrer les routes, les rôles et le modèle',
      intro:
        "On sépare clairement le site public (`/`) et l'administration (`/admin`). Le rôle est simulé, mais la structure est celle d'un vrai back-office.",
      blocks: [
        {
          type: 'table',
          headers: ['Route', 'Accès', 'Contenu'],
          rows: [
            ['`/`', 'Public', 'Accueil + articles récents'],
            ['`/blog`', 'Public', 'Liste, recherche, catégories'],
            ['`/blog/:slug`', 'Public', 'Article complet'],
            ['`/login`', 'Public', 'Connexion simulée'],
            ['`/admin`', 'Protégé', 'Tableau de bord des articles'],
            ['`/admin/nouveau`', 'Protégé', 'Éditeur de création'],
            ['`/admin/:id/modifier`', 'Protégé', 'Éditeur de modification'],
          ],
        },
        {
          type: 'code',
          title: 'src/types.ts',
          lang: 'ts',
          code: `export type Category = 'react' | 'typescript' | 'css' | 'carriere'

export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: Category
  coverColor: string
  author: string
  published: boolean
  createdAt: number
  updatedAt: number
}

export type Session = {
  email: string
  name: string
  role: 'admin'
}`,
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Un slug lisible et stable',
          text: "Le slug sert d'URL. Génère-le à partir du titre, mais ne le change pas après publication : cela casserait les liens. En cas de renommage, prévois une redirection. Ici, on le génère à la création et on le laisse stable.",
        },
      ],
    },
    {
      title: 'Initialiser le projet et les données de démonstration',
      intro:
        "On crée le projet, Tailwind et quelques articles pour ne pas travailler sur une page vide.",
      blocks: [
        {
          type: 'code',
          title: 'Installation',
          lang: 'bash',
          code: `npm create vite@latest devblog -- --template react-ts
cd devblog
npm install
npm install tailwindcss @tailwindcss/vite react-router-dom lucide-react
npm run dev`,
        },
        {
          type: 'code',
          title: 'src/data/seedPosts.ts (extrait)',
          lang: 'ts',
          code: `import type { Post } from '../types'

export const seedPosts: Post[] = [
  {
    id: 'post-1',
    slug: 'comprendre-useeffect',
    title: 'Comprendre useEffect sans se brûler',
    excerpt: "Dépendances, nettoyage et StrictMode : les trois sources de bugs d'effets.",
    content: \`# Le rôle d'un effet

Un effet synchronise React avec un système extérieur : API, timer, événement.

## Les dépendances

Chaque valeur utilisée dans l'effet doit figurer dans le tableau.

- Une dépendance manquante crée un bug.
- Une dépendance instable crée une boucle.

## Le nettoyage

\`\`\`tsx
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)
}, [])
\`\`\`

## À retenir

Si tu peux calculer pendant le rendu, ne crée pas d'effet.\`,
    category: 'react',
    coverColor: 'from-sky-500 to-blue-700',
    author: 'Awa Diallo',
    published: true,
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'post-2',
    slug: 'typescript-props',
    title: 'Typer les props sans se compliquer la vie',
    excerpt: 'Type, interface, children, callbacks : le guide pratique.',
    content: \`# Props typées

## Le minimum

\`\`\`ts
type CardProps = {
  title: string
  children: React.ReactNode
}
\`\`\`

## Les callbacks

Nomme les props \`onAction\` et les handlers \`handleAction\`.

## Les types utilitaires

\`ComponentPropsWithoutRef<'button'>\` évite de réinventer les props natives.\`,
    category: 'typescript',
    coverColor: 'from-indigo-500 to-violet-700',
    author: 'Moussa Traoré',
    published: true,
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
  },
]`,
        },
      ],
    },
    {
      title: 'Session et routes protégées',
      intro:
        "Une authentification simulée : n'importe quel e-mail + mot de passe de 4 caractères ouvre la session admin. La session est mémorisée dans localStorage.",
      blocks: [
        {
          type: 'code',
          title: 'src/features/auth/AuthContext.tsx',
          lang: 'tsx',
          code: `import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '../../types'

type AuthContextValue = {
  session: Session | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem('devblog.session')
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(readSession)

  async function login(email: string, password: string) {
    if (!email.includes('@')) throw new Error('Adresse e-mail invalide.')
    if (password.length < 4) throw new Error('Mot de passe trop court (4 caractères minimum).')

    await new Promise((resolve) => setTimeout(resolve, 500))
    const next: Session = { email, name: email.split('@')[0], role: 'admin' }
    localStorage.setItem('devblog.session', JSON.stringify(next))
    setSession(next)
  }

  function logout() {
    localStorage.removeItem('devblog.session')
    setSession(null)
  }

  const value = useMemo(() => ({ session, login, logout }), [session])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth doit être utilisé dans AuthProvider')
  return context
}`,
        },
        {
          type: 'code',
          title: 'src/app/ProtectedRoute.tsx',
          lang: 'tsx',
          code: `import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'

export function ProtectedRoute() {
  const { session } = useAuth()
  const location = useLocation()

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}`,
        },
        {
          type: 'callout',
          tone: 'danger',
          title: 'Une auth de démonstration n’est pas une sécurité',
          text: "Le mot de passe n'est jamais vérifié et le rôle est forcé côté client. En production, l'authentification se fait sur un serveur, avec des cookies httpOnly et des contrôles d'autorisation sur chaque endpoint. Ce projet montre uniquement l'UX et le routing.",
        },
      ],
    },
    {
      title: 'Hook de articles et CRUD persistant',
      intro:
        "Un hook unique gère la lecture, la création, la mise à jour et la suppression, avec synchronisation localStorage.",
      blocks: [
        {
          type: 'code',
          title: 'src/features/posts/usePosts.ts',
          lang: 'ts',
          code: `import { useCallback, useEffect, useState } from 'react'
import type { Post } from '../../types'
import { seedPosts } from '../../data/seedPosts'

function readPosts(): Post[] {
  try {
    const raw = localStorage.getItem('devblog.posts')
    if (!raw) return seedPosts
    return JSON.parse(raw) as Post[]
  } catch {
    return seedPosts
  }
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>(readPosts)

  useEffect(() => {
    localStorage.setItem('devblog.posts', JSON.stringify(posts))
  }, [posts])

  const create = useCallback((input: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = Date.now()
    const post: Post = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }
    setPosts((current) => [post, ...current])
    return post
  }, [])

  const update = useCallback((id: string, input: Partial<Post>) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, ...input, updatedAt: Date.now() } : post,
      ),
    )
  }, [])

  const remove = useCallback((id: string) => {
    setPosts((current) => current.filter((post) => post.id !== id))
  }, [])

  const togglePublished = useCallback((id: string) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, published: !post.published, updatedAt: Date.now() } : post,
      ),
    )
  }, [])

  return { posts, create, update, remove, togglePublished }
}`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Un état initial lu au montage seulement',
          text: "`useState(readPosts)` exécute la lecture une fois. C'est volontaire. Si deux composants appellent `usePosts`, ils auront deux copies indépendantes. Pour un vrai CMS, hisse le hook dans un provider ou utilise TanStack Query.",
        },
      ],
    },
    {
      title: 'Layout, navigation et mode sombre',
      intro:
        "Un layout public et un layout admin, avec un header qui s'adapte à la session et un thème persistant.",
      blocks: [
        {
          type: 'code',
          title: 'src/components/ThemeToggle.tsx',
          lang: 'tsx',
          code: `import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('devblog.theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('devblog.theme', theme)
  }, [theme])

  return (
    <button
      type="button"
      onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
      aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
      className="rounded-xl border border-ink-900/10 p-2.5 dark:border-white/15"
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}`,
        },
        {
          type: 'code',
          title: 'src/components/PublicLayout.tsx',
          lang: 'tsx',
          code: `import { Link, NavLink, Outlet } from 'react-router-dom'
import { PenLine } from 'lucide-react'
import { useAuth } from '../features/auth/AuthContext'
import { ThemeToggle } from './ThemeToggle'

export function PublicLayout() {
  const { session, logout } = useAuth()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-paper-50/90 backdrop-blur dark:border-white/10 dark:bg-night-950/90">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="font-display text-lg font-semibold">
            Dev<span className="text-brand-600">Blog</span>
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/blog">Articles</NavLink>
            {session ? (
              <>
                <Link to="/admin" className="flex items-center gap-1.5 text-brand-600">
                  <PenLine className="size-4" aria-hidden="true" /> Admin
                </Link>
                <button type="button" onClick={logout} className="text-ink-500">
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/login" className="text-ink-500">Connexion</Link>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-ink-900/10 py-8 text-center text-xs text-ink-500 dark:border-white/10">
        DevBlog — un projet React Atelier.
      </footer>
    </div>
  )
}`,
        },
      ],
    },
    {
      title: 'Liste, recherche et page article',
      intro:
        "Le blog public filtre par catégorie et recherche. La page article rend un contenu structuré et calcule le temps de lecture.",
      blocks: [
        {
          type: 'code',
          title: 'src/lib/markdown.tsx',
          lang: 'tsx',
          code: `import type { ReactNode } from 'react'

// Rendu minimaliste : titres #, ##, listes -, paragraphes.
// Pour un vrai blog, utilise react-markdown + remark-gfm.
export function renderContent(content: string): ReactNode[] {
  return content.split('\\n').map((line, index) => {
    const key = line + index

    if (line.startsWith('# ')) {
      return <h2 key={key} className="mt-8 mb-3 text-3xl font-semibold">{line.slice(2)}</h2>
    }
    if (line.startsWith('## ')) {
      return <h3 key={key} className="mt-8 mb-3 text-2xl font-semibold">{line.slice(3)}</h3>
    }
    if (line.startsWith('- ')) {
      return <li key={key} className="ml-5 list-disc">{line.slice(2)}</li>
    }
    if (line.startsWith('\`\`\`')) {
      return null
    }
    if (line.trim().length === 0) {
      return <div key={key} className="h-3" />
    }
    return <p key={key} className="leading-relaxed text-ink-700 dark:text-paper-200/80">{line}</p>
  })
}

export function readingTime(content: string) {
  const words = content.trim().split(/\\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}`,
        },
        {
          type: 'code',
          title: 'src/pages/BlogPage.tsx',
          lang: 'tsx',
          code: `import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import type { Category } from '../types'
import { usePosts } from '../features/posts/usePosts'
import { PostCard } from '../components/PostCard'

const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'Tout' },
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'css', label: 'CSS' },
  { value: 'carriere', label: 'Carrière' },
]

export function BlogPage() {
  const { posts } = usePosts()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | 'all'>('all')

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return posts
      .filter((post) => post.published)
      .filter((post) => category === 'all' || post.category === category)
      .filter(
        (post) =>
          normalized.length === 0 ||
          post.title.toLowerCase().includes(normalized) ||
          post.excerpt.toLowerCase().includes(normalized),
      )
      .sort((a, b) => b.createdAt - a.createdAt)
  }, [posts, query, category])

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-semibold tracking-tight">Le journal</h1>
      <p className="mt-2 max-w-xl text-ink-600">
        Notes pratiques sur React, TypeScript et le métier de développeur.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Rechercher un article</span>
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher…"
            className="w-full rounded-xl border border-ink-900/15 py-2.5 pr-4 pl-9 text-sm dark:border-white/15 dark:bg-night-900"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((entry) => (
            <button
              key={entry.value}
              type="button"
              onClick={() => setCategory(entry.value)}
              aria-pressed={category === entry.value}
              className={
                'rounded-full px-3.5 py-1.5 text-xs font-medium ' +
                (category === entry.value
                  ? 'bg-ink-900 text-white dark:bg-white dark:text-night-950'
                  : 'bg-ink-900/5 text-ink-700 dark:bg-white/10 dark:text-paper-200')
              }
            >
              {entry.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {visible.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}`,
        },
        {
          type: 'code',
          title: 'src/components/PostCard.tsx',
          lang: 'tsx',
          code: `import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock } from 'lucide-react'
import type { Post } from '../types'
import { readingTime } from '../lib/markdown'

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-ink-900/10 bg-white dark:border-white/10 dark:bg-night-800">
      <div className={'h-2 bg-gradient-to-r ' + post.coverColor} />
      <div className="p-5">
        <div className="flex items-center gap-2 text-[0.65rem] tracking-widest text-ink-500 uppercase">
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" aria-hidden="true" /> {readingTime(post.content)} min
          </span>
        </div>

        <h2 className="mt-2 text-xl font-semibold">
          <Link to={'/blog/' + post.slug} className="group-hover:text-brand-600">
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-paper-200/70">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
          <span>{post.author}</span>
          <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:text-brand-600" aria-hidden="true" />
        </div>
      </div>
    </article>
  )
}`,
        },
        {
          type: 'code',
          title: 'src/pages/ArticlePage.tsx',
          lang: 'tsx',
          code: `import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import { usePosts } from '../features/posts/usePosts'
import { readingTime, renderContent } from '../lib/markdown'

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { posts } = usePosts()
  const post = posts.find((entry) => entry.slug === slug && entry.published)

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold">Article introuvable</h1>
        <Link to="/blog" className="mt-4 inline-block text-brand-600 underline">Retour au blog</Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-2xl px-4 py-10">
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-brand-600">
        <ArrowLeft className="size-4" aria-hidden="true" /> Tous les articles
      </Link>

      <p className="mt-8 text-[0.65rem] tracking-widest text-brand-600 uppercase">{post.category}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>

      <div className="mt-4 flex items-center gap-3 text-xs text-ink-500">
        <span>{post.author}</span>
        <span aria-hidden="true">·</span>
        <span>{new Date(post.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        <span aria-hidden="true">·</span>
        <span className="flex items-center gap-1">
          <Clock className="size-3" aria-hidden="true" /> {readingTime(post.content)} min
        </span>
      </div>

      <div className="mt-8 space-y-1">{renderContent(post.content)}</div>
    </article>
  )
}`,
        },
      ],
    },
    {
      title: 'Back-office : tableau de bord et éditeur',
      intro:
        "L'admin liste tous les articles, permet de publier/dépublier, modifier et supprimer. L'éditeur valide les champs et génère le slug.",
      blocks: [
        {
          type: 'code',
          title: 'src/pages/AdminPage.tsx',
          lang: 'tsx',
          code: `import { Link } from 'react-router-dom'
import { Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react'
import { usePosts } from '../features/posts/usePosts'

export function AdminPage() {
  const { posts, remove, togglePublished } = usePosts()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Administration</h1>
          <p className="mt-1 text-sm text-ink-600">{posts.length} article(s)</p>
        </div>
        <Link
          to="/admin/nouveau"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white"
        >
          <Plus className="size-4" aria-hidden="true" /> Nouvel article
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink-900/10 bg-white dark:border-white/10 dark:bg-night-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-900/10 text-xs text-ink-500 dark:border-white/10">
            <tr>
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-ink-900/5 last:border-0 dark:border-white/5">
                <td className="px-4 py-3 font-medium">{post.title}</td>
                <td className="px-4 py-3 text-ink-500">{post.category}</td>
                <td className="px-4 py-3">
                  <span className={
                    'rounded-full px-2 py-1 text-[0.65rem] font-medium ' +
                    (post.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700')
                  }>
                    {post.published ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => togglePublished(post.id)}
                      aria-label={post.published ? 'Dépublier' : 'Publier'}
                      className="rounded-lg p-2 text-ink-500 hover:bg-ink-900/5"
                    >
                      {post.published ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                    <Link
                      to={'/admin/' + post.id + '/modifier'}
                      aria-label={'Modifier ' + post.title}
                      className="rounded-lg p-2 text-ink-500 hover:bg-ink-900/5"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Supprimer « ' + post.title + ' » ?')) remove(post.id)
                      }}
                      aria-label={'Supprimer ' + post.title}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}`,
        },
        {
          type: 'code',
          title: 'src/pages/EditorPage.tsx',
          lang: 'tsx',
          code: `import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Category, Post } from '../types'
import { usePosts } from '../features/posts/usePosts'
import { slugify } from '../lib/slugify'

type FormState = {
  title: string
  excerpt: string
  content: string
  category: Category
  published: boolean
}

export function EditorPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { posts, create, update } = usePosts()
  const existing = posts.find((post) => post.id === id)

  const [form, setForm] = useState<FormState>({
    title: existing?.title ?? '',
    excerpt: existing?.excerpt ?? '',
    content: existing?.content ?? '',
    category: existing?.category ?? 'react',
    published: existing?.published ?? false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: '' }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const next: Record<string, string> = {}
    if (form.title.trim().length < 5) next.title = 'Titre trop court (5 caractères).'
    if (form.excerpt.trim().length < 20) next.excerpt = 'Résumé trop court (20 caractères).'
    if (form.content.trim().length < 50) next.content = 'Contenu trop court (50 caractères).'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    if (existing) {
      update(existing.id, {
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content,
        category: form.category,
        published: form.published,
      })
    } else {
      create({
        title: form.title.trim(),
        slug: slugify(form.title),
        excerpt: form.excerpt.trim(),
        content: form.content,
        category: form.category,
        published: form.published,
        coverColor: 'from-brand-500 to-indigo-700',
        author: 'Admin',
      } satisfies Omit<Post, 'id' | 'createdAt' | 'updatedAt'>)
    }

    navigate('/admin')
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">{existing ? 'Modifier l’article' : 'Nouvel article'}</h1>

      <form onSubmit={submit} className="mt-6 space-y-5">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">Titre</label>
          <input
            id="title"
            value={form.title}
            onChange={(event) => set('title', event.target.value)}
            aria-invalid={Boolean(errors.title)}
            className="w-full rounded-xl border border-ink-900/15 px-4 py-2.5 text-sm dark:border-white/15 dark:bg-night-900"
          />
          {errors.title && <p role="alert" className="mt-1 text-xs text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="excerpt" className="mb-1 block text-sm font-medium">Résumé</label>
          <textarea
            id="excerpt"
            rows={2}
            value={form.excerpt}
            onChange={(event) => set('excerpt', event.target.value)}
            className="w-full rounded-xl border border-ink-900/15 px-4 py-2.5 text-sm dark:border-white/15 dark:bg-night-900"
          />
          {errors.excerpt && <p role="alert" className="mt-1 text-xs text-red-600">{errors.excerpt}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="mb-1 block text-sm font-medium">Catégorie</label>
            <select
              id="category"
              value={form.category}
              onChange={(event) => set('category', event.target.value as Category)}
              className="w-full rounded-xl border border-ink-900/15 px-4 py-2.5 text-sm dark:border-white/15 dark:bg-night-900"
            >
              <option value="react">React</option>
              <option value="typescript">TypeScript</option>
              <option value="css">CSS</option>
              <option value="carriere">Carrière</option>
            </select>
          </div>
          <label className="flex items-center gap-2 self-end pb-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(event) => set('published', event.target.checked)}
            />
            Publier immédiatement
          </label>
        </div>

        <div>
          <label htmlFor="content" className="mb-1 block text-sm font-medium">Contenu</label>
          <textarea
            id="content"
            rows={16}
            value={form.content}
            onChange={(event) => set('content', event.target.value)}
            placeholder={'# Titre\\n\\nParagraphe…\\n\\n## Sous-titre\\n\\n- point un\\n- point deux'}
            className="w-full rounded-xl border border-ink-900/15 px-4 py-3 font-mono text-sm dark:border-white/15 dark:bg-night-900"
          />
          {errors.content && <p role="alert" className="mt-1 text-xs text-red-600">{errors.content}</p>}
        </div>

        <div className="flex gap-3">
          <button type="submit" className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white">
            {existing ? 'Enregistrer' : 'Créer'}
          </button>
          <button type="button" onClick={() => navigate('/admin')} className="rounded-xl border px-5 py-2.5 text-sm">
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Le slug doit rester unique',
          text: "Deux articles avec le même titre produisent le même slug. En production, ajoute un suffixe (`-2`) ou l'identifiant. Vérifie aussi les collisions avant de publier : deux articles au même slug rendent le second inaccessible.",
        },
      ],
    },
    {
      title: 'Assembler le routeur et livrer',
      intro:
        "On relie les pages, on ajoute les métadonnées et les états 404, puis on déploie.",
      blocks: [
        {
          type: 'code',
          title: 'src/main.tsx',
          lang: 'tsx',
          code: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './features/auth/AuthContext'
import { PublicLayout } from './components/PublicLayout'
import { ProtectedRoute } from './app/ProtectedRoute'
import { HomePage } from './pages/HomePage'
import { BlogPage } from './pages/BlogPage'
import { ArticlePage } from './pages/ArticlePage'
import { LoginPage } from './pages/LoginPage'
import { AdminPage } from './pages/AdminPage'
import { EditorPage } from './pages/EditorPage'
import { NotFound } from './pages/NotFound'

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/blog', element: <BlogPage /> },
      { path: '/blog/:slug', element: <ArticlePage /> },
      { path: '/login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/admin', element: <AdminPage /> },
          { path: '/admin/nouveau', element: <EditorPage /> },
          { path: '/admin/:id/modifier', element: <EditorPage /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)`,
        },
        {
          type: 'code',
          title: 'src/lib/slugify.ts',
          lang: 'ts',
          code: `export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}`,
        },
        {
          type: 'list',
          items: [
            'Ajoute un `<title>` dynamique dans chaque page avec un petit hook `useDocumentTitle`.',
            'Vérifie la page 404 sur une URL inconnue et sur un slug d’article inexistant.',
            'Teste le flux complet : connexion → création → publication → lecture publique → déconnexion.',
            'Vérifie que le bouton Admin disparaît après déconnexion et que `/admin` redirige vers `/login`.',
            'Déploie avec une réécriture SPA pour que `/blog/...` fonctionne après rechargement.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Passer à un vrai backend',
          text: "Remplace `usePosts` par des appels API et TanStack Query. L'authentification devient un cookie httpOnly + un endpoint `/me`. L'éditeur envoie un POST/PUT. La structure des pages et des composants ne change pas : c'est tout l'intérêt d'avoir isolé la logique.",
        },
      ],
    },
  ],
  extensions: [
    'Ajouter des commentaires et une modération.',
    'Ajouter des images de couverture et un upload.',
    'Ajouter un éditeur Markdown avec aperçu en direct.',
    'Ajouter la pagination et un flux RSS.',
    'Ajouter des tests sur le rendu du contenu et le CRUD.',
    'Brancher un backend réel (Supabase, Firebase, API Express).',
  ],
}
