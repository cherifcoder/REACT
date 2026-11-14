import type { CourseModule } from '../types'

export const module6: CourseModule = {
  slug: 'architecture-routing-projet',
  number: 6,
  title: 'Architecture, routing et projet pro',
  tagline: 'Assembler une vraie application, du routeur au déploiement.',
  description:
    "Tu sais construire des composants. Il reste à assembler une application complète : structurer les dossiers, ajouter des routes, protéger des pages, partager un état global, récupérer des données avec TanStack Query, optimiser le chargement, tester les parcours critiques et déployer. C'est le module qui transforme un apprentissage en compétence professionnelle.",
  icon: 'layers',
  accent: 'amber',
  level: 'Avancé',
  duration: 600,
  outcomes: [
    'Organiser un projet React par fonctionnalités plutôt que par type de fichier',
    'Construire un site multi-pages avec React Router 7, layouts et routes protégées',
    'Partager un état global avec Context ou Zustand selon le besoin',
    'Récupérer et muter des données avec TanStack Query',
    'Optimiser le bundle avec lazy loading et Suspense',
    'Tester les parcours utilisateur avec Vitest et Testing Library',
    'Déployer sur Vercel ou Netlify avec les bonnes réécritures SPA',
  ],
  lessons: [
    {
      id: 'architecture-projet',
      title: 'Architecturer une application React',
      duration: 45,
      summary:
        "Feature folders, séparation UI/logique, fichiers de données et règles de nommage.",
      blocks: [
        {
          type: 'p',
          text: "Un projet qui grossit mal devient impossible à naviguer. La structure la plus durable n'est ni « tout dans components » ni « un dossier par type ». Organise par **fonctionnalité** : chaque domaine possède ses composants, son hook, ses types et ses appels API. Les briques réellement transverses vont dans `components`, `lib` et `hooks`.",
        },
        {
          type: 'code',
          title: 'Structure recommandée',
          lang: 'text',
          code: `src/
├── app/
│   ├── App.tsx              # providers + router
│   └── router.tsx           # définition des routes
├── components/              # UI réutilisable, sans logique métier
│   ├── ui/                  # Button, Input, Modal, Badge
│   └── layout/              # Header, Footer, Sidebar
├── features/
│   ├── auth/
│   │   ├── components/LoginForm.tsx
│   │   ├── hooks/useAuth.ts
│   │   ├── api.ts
│   │   └── types.ts
│   ├── posts/
│   └── cart/
├── hooks/                   # hooks génériques (useDebounce…)
├── lib/                     # utils, client API, constantes
├── pages/                   # une page = une route
├── data/                    # données statiques typées
└── styles/                  # CSS global, tokens`,
        },
        {
          type: 'table',
          headers: ['Règle', 'Pourquoi'],
          rows: [
            ['Une page = un composant dans `pages/`', 'Le routeur reste lisible'],
            ['Un composant UI ne connaît pas l’API', 'Il reste réutilisable et testable'],
            ['Les types métier vivent dans la feature', 'Pas de dossier `types` fourre-tout'],
            ['Les appels API sont centralisés', 'Gestion d’erreurs et tests cohérents'],
            ['Pas de barrel export systématique', 'Évite les cycles et les gros bundles'],
            ['Nommage explicite', '`PostCard.tsx`, pas `Card2.tsx`'],
          ],
        },
        {
          type: 'code',
          title: 'Un module API isolé',
          lang: 'ts',
          code: `// features/posts/api.ts
import type { Post } from './types'

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(BASE_URL + '/posts')
  if (!response.ok) throw new Error('Impossible de charger les articles.')
  return response.json()
}

export async function createPost(input: Omit<Post, 'id'>): Promise<Post> {
  const response = await fetch(BASE_URL + '/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error('Création impossible.')
  return response.json()
}`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'La règle du « un fichier = une raison de changer »',
          text: "Si un fichier change pour trois raisons différentes (design, API, logique métier), découpe-le. À l'inverse, ne crée pas un fichier par fonction : la colocation est souvent plus lisible. L'objectif est qu'un nouveau développeur trouve une fonctionnalité en moins de 30 secondes.",
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Les variables d’environnement Vite',
          text: "Seules les variables préfixées par `VITE_` sont exposées au navigateur. Ne mets jamais un secret serveur dans un fichier `.env` accessible au client : tout ce qui est dans le bundle est public. Les clés privées restent côté serveur.",
        },
      ],
    },
    {
      id: 'react-router',
      title: 'React Router 7 : routes, layouts et paramètres',
      duration: 55,
      summary:
        "Créer un site multi-pages avec routes imbriquées, navigation, paramètres d'URL et route 404.",
      blocks: [
        {
          type: 'p',
          text: "React Router transforme une SPA en site multi-pages : chaque URL affiche un composant, sans rechargement. Le routeur gère l'historique, les liens, les paramètres et les layouts partagés. C'est la bibliothèque de routage standard de l'écosystème React.",
        },
        {
          type: 'code',
          title: 'Installation et routeur',
          lang: 'bash',
          code: `npm install react-router-dom`,
        },
        {
          type: 'code',
          title: 'Définition des routes avec un layout',
          lang: 'tsx',
          code: `import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Blog } from './pages/Blog'
import { Article } from './pages/Article'
import { Dashboard } from './pages/Dashboard'
import { NotFound } from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <Article /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}`,
        },
        {
          type: 'code',
          title: 'Layout, liens et navigation',
          lang: 'tsx',
          code: `import { NavLink, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl gap-6 px-4 py-3">
          <NavLink to="/" end>Accueil</NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) => (isActive ? 'text-brand-600' : '')}
          >
            Blog
          </NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}`,
        },
        {
          type: 'code',
          title: 'Paramètres, recherche et redirection',
          lang: 'tsx',
          code: `import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'

// /blog/:slug
const { slug } = useParams<{ slug: string }>()

// /products?category=react&sort=asc
const [searchParams, setSearchParams] = useSearchParams()
const category = searchParams.get('category') ?? 'all'

function setCategory(value: string) {
  setSearchParams({ category: value })
}

// Navigation programmatique
const navigate = useNavigate()
function onSaved() {
  navigate('/dashboard', { replace: true })
}

// Redirection
if (!user) return <Navigate to="/login" replace state={{ from: location }} />`,
        },
        {
          type: 'table',
          headers: ['API', 'Rôle'],
          rows: [
            ['`<Link to>`', 'Navigation accessible sans rechargement'],
            ['`<NavLink>`', 'Lien avec état actif'],
            ['`<Outlet>`', 'Emplacement des routes enfants'],
            ['`useParams`', 'Lire les segments dynamiques'],
            ['`useSearchParams`', 'Lire/écrire la query string'],
            ['`useNavigate`', 'Naviguer depuis du code'],
            ['`<Navigate>`', 'Redirection déclarative'],
            ['`errorElement`', 'UI en cas d’erreur de route'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Déploiement : la réécriture SPA est obligatoire',
          text: "Sur Vercel ou Netlify, une URL comme `/blog/mon-article` doit renvoyer `index.html`. Sinon, le serveur cherche un fichier inexistant et renvoie 404. Ajoute `vercel.json` avec une réécriture ou `public/_redirects` avec `/* /index.html 200`.",
        },
      ],
    },
    {
      id: 'etat-global-context',
      title: 'État global : Context, auth et routes protégées',
      duration: 50,
      summary:
        "Un AuthProvider propre, un hook useAuth, la persistance de session et un composant ProtectedRoute.",
      blocks: [
        {
          type: 'p',
          text: "L'utilisateur connecté est un état global par nature : le header, les routes protégées, les actions et les pages en ont besoin. Un contexte dédié, avec un hook d'accès, garde cette logique hors des composants d'interface.",
        },
        {
          type: 'code',
          title: 'AuthProvider typé',
          lang: 'tsx',
          code: `import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type User = { id: string; name: string; email: string; role: 'admin' | 'member' }

type AuthContextValue = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem('auth-user')
    return raw ? (JSON.parse(raw) as User) : null
  })

  async function login(email: string, password: string) {
    if (password.length < 8) throw new Error('Mot de passe trop court.')

    await new Promise((resolve) => setTimeout(resolve, 600))
    const nextUser: User = {
      id: 'u1',
      name: email.split('@')[0],
      email,
      role: 'member',
    }

    localStorage.setItem('auth-user', JSON.stringify(nextUser))
    setUser(nextUser)
  }

  function logout() {
    localStorage.removeItem('auth-user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, logout }), [user])

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
          title: 'Route protégée',
          lang: 'tsx',
          code: `import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function ProtectedRoute({ adminOnly = false }: { adminOnly?: boolean }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

// Dans le routeur
{
  element: <ProtectedRoute />,
  children: [
    { path: 'dashboard', element: <Dashboard /> },
    { path: 'settings', element: <Settings /> },
  ],
}`,
        },
        {
          type: 'callout',
          tone: 'danger',
          title: 'La protection côté client n’est pas une sécurité',
          text: "Cacher une route ne protège pas les données : n'importe qui peut appeler l'API directement. L'autorisation réelle se fait côté serveur, à chaque requête. Le `ProtectedRoute` améliore l'expérience, il ne remplace pas les contrôles d'accès serveur.",
        },
        {
          type: 'list',
          items: [
            'Sépare les contextes Auth / Thème / Panier pour limiter les re-rendus.',
            'Mémorise la valeur du provider avec `useMemo`.',
            'Restaure la session au démarrage (localStorage ou cookie httpOnly).',
            'Redirige vers la page demandée après connexion avec `location.state.from`.',
          ],
        },
      ],
    },
    {
      id: 'zustand',
      title: 'Zustand : un store global simple',
      duration: 45,
      summary:
        "Créer un store typé, sélectionner finement, persister et organiser plusieurs stores.",
      blocks: [
        {
          type: 'p',
          text: "Zustand est une bibliothèque d'état global minimaliste : un store est un hook. Pas de provider obligatoire, pas de boilerplate Redux. Les composants sélectionnent uniquement la tranche d'état dont ils ont besoin, ce qui limite les re-rendus.",
        },
        {
          type: 'code',
          title: 'Store panier avec persistance',
          lang: 'tsx',
          code: `import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = { id: string; name: string; price: number; quantity: number }

type CartStore = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'quantity'>) => void
  remove: (id: string) => void
  increment: (id: string) => void
  clear: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.id === item.id)
          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.id === item.id
                  ? { ...entry, quantity: entry.quantity + 1 }
                  : entry,
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: 1 }] }
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      increment: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: 'cart-storage' },
  ),
)`,
        },
        {
          type: 'code',
          title: 'Sélectionner finement',
          lang: 'tsx',
          code: `// ✅ Ne se re-rend que quand items change
const items = useCartStore((state) => state.items)

// ✅ Une action est stable
const add = useCartStore((state) => state.add)

// ⚠️ Crée un nouvel objet à chaque rendu : utiliser useShallow
import { useShallow } from 'zustand/react/shallow'
const { items, add } = useCartStore(
  useShallow((state) => ({ items: state.items, add: state.add })),
)`,
        },
        {
          type: 'table',
          headers: ['Besoin', 'Context', 'Zustand'],
          rows: [
            ['Thème, langue', 'Très bien', 'Possible'],
            ['Utilisateur connecté', 'Très bien', 'Possible'],
            ['Panier persistant', 'Possible', 'Idéal'],
            ['UI complexe (filtres, drag & drop)', 'Risqué', 'Idéal'],
            ['Mises à jour très fréquentes', 'Re-rendus larges', 'Sélecteurs fins'],
            ['Zéro dépendance', 'Oui', 'Non'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Un store par domaine',
          text: "Ne crée pas un `useAppStore` géant. Préfère `useCartStore`, `useUiStore`, `useFiltersStore`. Chaque store évolue indépendamment et les composants ne s'abonnent qu'à ce qui les concerne.",
        },
      ],
    },
    {
      id: 'tanstack-query',
      title: 'TanStack Query : données serveur sans douleur',
      duration: 55,
      summary:
        "Remplacer les useEffect de fetch par un cache serveur : loading, erreurs, mutations et invalidation.",
      blocks: [
        {
          type: 'p',
          text: "Les données serveur ont des besoins que `useState` + `useEffect` gèrent mal : cache, refetch, retry, données obsolètes, mutations. **TanStack Query** s'en charge. Tu décris comment récupérer une donnée, il gère le reste.",
        },
        {
          type: 'code',
          title: 'Installation et provider',
          lang: 'bash',
          code: `npm install @tanstack/react-query`,
        },
        {
          type: 'code',
          lang: 'tsx',
          code: `import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}`,
        },
        {
          type: 'code',
          title: 'useQuery : liste et détail',
          lang: 'tsx',
          code: `import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../features/posts/api'

export function PostList() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  if (isPending) return <Skeleton />
  if (isError) return <ErrorState message={error.message} onRetry={() => refetch()} />

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}`,
        },
        {
          type: 'code',
          title: 'useMutation + invalidation du cache',
          lang: 'tsx',
          code: `import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../features/posts/api'

export function CreatePostForm() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  function onSubmit(values: PostInput) {
    mutation.mutate(values)
  }

  return (
    <form onSubmit={/* ... */}>
      {/* champs */}
      <button disabled={mutation.isPending}>
        {mutation.isPending ? 'Publication…' : 'Publier'}
      </button>
      {mutation.isError && <p role="alert">{mutation.error.message}</p>}
    </form>
  )
}`,
        },
        {
          type: 'table',
          headers: ['Concept', 'Rôle'],
          rows: [
            ['`queryKey`', 'Identifiant du cache (tableau hiérarchique)'],
            ['`queryFn`', 'Fonction qui récupère les données'],
            ['`staleTime`', 'Durée avant de considérer les données périmées'],
            ['`invalidateQueries`', 'Marque le cache comme à rafraîchir'],
            ['`useMutation`', 'Opération d’écriture (POST/PUT/DELETE)'],
            ['`setQueryData`', 'Mise à jour manuelle du cache (optimiste)'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'État serveur ≠ état client',
          text: "Le panier, un filtre ou une modale sont des états **client** : `useState`, Context ou Zustand. Les articles, utilisateurs et commandes sont des états **serveur** : TanStack Query. Mélanger les deux crée des bugs de synchronisation.",
        },
      ],
    },
    {
      id: 'performance',
      title: 'Performance et chargement à la demande',
      duration: 45,
      summary:
        "Lazy loading, Suspense, découpage par route, images et mesure du bundle.",
      blocks: [
        {
          type: 'p',
          text: "Une application React peut devenir lente pour trois raisons : un bundle trop gros, des rendus inutiles, des images mal servies. Commence toujours par **mesurer** (onglet Performance, React DevTools Profiler, analyse du bundle) avant d'optimiser.",
        },
        {
          type: 'code',
          title: 'Charger une page à la demande',
          lang: 'tsx',
          code: `import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))

export function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}`,
        },
        {
          type: 'code',
          title: 'Découper un composant lourd',
          lang: 'tsx',
          code: `const HeavyChart = lazy(() => import('./components/HeavyChart'))

function Analytics({ open }: { open: boolean }) {
  if (!open) return null

  return (
    <Suspense fallback={<div className="h-80 animate-pulse rounded-2xl bg-ink-900/5" />}>
      <HeavyChart />
    </Suspense>
  )
}`,
        },
        {
          type: 'list',
          items: [
            'Découpe par route : l’utilisateur ne télécharge que la page visitée.',
            'Utilise `<img loading="lazy" decoding="async">` et des formats modernes (WebP/AVIF).',
            'Évite les imports complets : `import { motion }` plutôt que `import * as` quand c’est possible.',
            'Analyse le bundle avec `npx vite-bundle-visualizer` ou `rollup-plugin-visualizer`.',
            'Mesure les Core Web Vitals avec Lighthouse, pas au feeling.',
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ne lazy-load pas tout',
          text: "Découper en 40 petits morceaux crée 40 requêtes et des flashs de chargement. Garde le contenu critique (accueil, header) dans le bundle principal et charge à la demande les pages secondaires et les composants lourds (éditeur, graphique, carte).",
        },
      ],
    },
    {
      id: 'tests',
      title: 'Tester les parcours utilisateur',
      duration: 50,
      summary:
        "Vitest + Testing Library : premier test, interactions, mocks et ce qu'il faut vraiment tester.",
      blocks: [
        {
          type: 'p',
          text: "Un test ne doit pas vérifier l'implémentation (`useState` a été appelé) mais le **comportement visible** : l'utilisateur clique, le texte apparaît, le formulaire affiche une erreur. Testing Library encourage exactement cela.",
        },
        {
          type: 'code',
          title: 'Installation',
          lang: 'bash',
          code: `npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`,
        },
        {
          type: 'code',
          title: 'Configuration Vitest',
          lang: 'ts',
          code: `// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
})`,
        },
        {
          type: 'code',
          title: 'Premier test de composant',
          lang: 'tsx',
          code: `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Counter } from './Counter'

describe('Counter', () => {
  it('incrémente au clic', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    expect(screen.getByText('0')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /incrémenter/i }))

    expect(screen.getByText('1')).toBeInTheDocument()
  })
})`,
        },
        {
          type: 'code',
          title: 'Tester un formulaire et une erreur',
          lang: 'tsx',
          code: `it('affiche une erreur pour un e-mail invalide', async () => {
  const user = userEvent.setup()
  render(<ContactForm />)

  await user.type(screen.getByLabelText(/e-mail/i), 'pas-un-email')
  await user.click(screen.getByRole('button', { name: /envoyer/i }))

  expect(await screen.findByRole('alert')).toHaveTextContent(/e-mail/i)
})`,
        },
        {
          type: 'table',
          headers: ['Requête', 'Quand l’utiliser'],
          rows: [
            ['getByRole', 'Boutons, liens, champs, titres (priorité)'],
            ['getByLabelText', 'Champs de formulaire'],
            ['getByText', 'Texte visible'],
            ['getByPlaceholderText', 'En dernier recours'],
            ['getByTestId', 'Vraiment en dernier recours'],
            ['findBy*', 'Élément asynchrone'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Les trois tests qui rapportent le plus',
          text: "1) Le parcours critique (connexion, achat, publication). 2) La validation des formulaires. 3) Les composants de logique réutilisables (hooks, reducers, utils). Le reste peut attendre : 100 % de couverture n'est pas un objectif.",
        },
      ],
    },
    {
      id: 'deploiement',
      title: 'Déployer et livrer un projet propre',
      duration: 45,
      summary:
        "Build, variables d'environnement, Vercel/Netlify, réécritures SPA et checklist de mise en ligne.",
      blocks: [
        {
          type: 'p',
          text: "Un site React est un ensemble de fichiers statiques après le build. Tu peux le déployer sur Vercel, Netlify, Cloudflare Pages ou n'importe quel hébergeur statique. La seule subtilité est la réécriture des routes vers `index.html`.",
        },
        {
          type: 'code',
          title: 'Vérifier le build en local',
          lang: 'bash',
          code: `npm run build
npm run preview

# Le dossier dist/ contient la version de production
# Ne le versionne pas : il est généré`,
        },
        {
          type: 'code',
          title: 'vercel.json',
          lang: 'json',
          code: `{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}`,
        },
        {
          type: 'code',
          title: 'public/_redirects (Netlify)',
          lang: 'text',
          code: `/*    /index.html   200`,
        },
        {
          type: 'code',
          title: 'Variables d’environnement',
          lang: 'text',
          code: `# .env.local — jamais commité
VITE_API_URL=https://api.monsite.com
VITE_STRIPE_PUBLIC_KEY=pk_live_...

# Accès dans le code
const apiUrl = import.meta.env.VITE_API_URL`,
        },
        {
          type: 'h',
          text: 'Checklist avant mise en ligne',
        },
        {
          type: 'list',
          items: [
            'Titre, description, favicon et image Open Graph sur chaque page.',
            'Test sur mobile réel, pas seulement dans le mode responsive.',
            'Toutes les routes inconnues affichent une vraie page 404.',
            'Aucun `console.log` ni secret dans le bundle.',
            'Formulaires testés avec un vrai envoi et un vrai échec.',
            'Lighthouse : performance, accessibilité et SEO au vert ou expliqués.',
            '`npm run build` passe sans erreur TypeScript.',
            'Un README explique l’installation, les scripts et le déploiement.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Déployer, puis itérer',
          text: "Ne cherche pas la perfection avant la mise en ligne. Un site utile en production vaut mieux qu'un chef-d'œuvre local. Déploie tôt, collecte des retours, corrige. C'est aussi comme ça qu'on apprend React pour de vrai.",
        },
      ],
    },
  ],
  projects: [
    {
      id: 'm6-p1',
      moduleId: 'm6',
      title: 'Blog multi-pages',
      level: 3,
      time: '1 h 30',
      summary:
        "Accueil, liste d’articles, article dynamique et 404 avec React Router.",
      skills: ['React Router', 'params', 'layout', 'SEO'],
      steps: [
        'Installe `react-router-dom` et crée un layout avec header/footer.',
        'Définis les routes `/`, `/blog`, `/blog/:slug` et `*`.',
        'Affiche la liste des articles depuis un tableau `posts`.',
        'Sur la page article, lis le slug, trouve l’article et affiche 404 s’il n’existe pas.',
        'Ajoute un titre de document dynamique et un lien de retour.',
      ],
      bonus: [
        'Ajoute une page catégorie `/blog/categorie/:name`.',
        'Ajoute des articles liés en bas de page.',
      ],
    },
    {
      id: 'm6-p2',
      moduleId: 'm6',
      title: 'Dashboard à routes imbriquées',
      level: 3,
      time: '2 h',
      summary:
        "Un espace admin avec sidebar, sous-pages et fil d’Ariane.",
      skills: ['routes imbriquées', 'Outlet', 'NavLink', 'layout'],
      steps: [
        'Crée un layout `/dashboard` avec sidebar et zone `Outlet`.',
        'Ajoute les sous-routes `index`, `orders`, `customers`, `settings`.',
        'Affiche le lien actif avec `NavLink`.',
        'Ajoute un fil d’Ariane basé sur `useLocation`.',
        'Ajoute une route 404 interne au dashboard.',
      ],
      bonus: [
        'Ajoute une route `/dashboard/orders/:id` avec un panneau de détail.',
        'Ajoute un état de sidebar repliée persisté.',
      ],
    },
    {
      id: 'm6-p3',
      moduleId: 'm6',
      title: 'Authentification et routes protégées',
      level: 4,
      time: '2 h',
      summary:
        "Connexion simulée, session persistée, routes protégées et redirection après login.",
      skills: ['Context', 'auth', 'ProtectedRoute', 'formulaires'],
      steps: [
        'Crée un `AuthProvider` avec `user`, `login`, `logout` et persistance.',
        'Crée une page de connexion avec validation.',
        'Protège `/dashboard` et `/settings` avec un composant `ProtectedRoute`.',
        'Après connexion, redirige vers la page demandée (`location.state.from`).',
        'Ajoute un menu utilisateur avec déconnexion.',
      ],
      bonus: [
        'Ajoute un rôle `admin` et une route réservée.',
        'Ajoute une expiration de session après 30 minutes.',
      ],
    },
    {
      id: 'm6-p4',
      moduleId: 'm6',
      title: 'CRUD avec localStorage',
      level: 4,
      time: '2 h',
      summary:
        "Un gestionnaire de contacts : créer, lire, modifier, supprimer, rechercher et persister.",
      skills: ['CRUD', 'formulaires', 'localStorage', 'routing'],
      steps: [
        'Définis un type `Contact` et un hook `useContacts` avec persistance.',
        'Affiche la liste avec recherche et tri alphabétique.',
        'Crée une page `/contacts/new` avec formulaire validé.',
        'Crée une page `/contacts/:id/edit` préremplie.',
        'Ajoute la suppression avec confirmation et un état vide.',
      ],
      bonus: [
        'Ajoute une pagination et un filtre par statut.',
        'Ajoute un import/export JSON.',
      ],
    },
    {
      id: 'm6-p5',
      moduleId: 'm6',
      title: 'CRUD API avec TanStack Query',
      level: 5,
      time: '2 h 30',
      summary:
        "Liste, détail, création, mise à jour et suppression avec cache et invalidation.",
      skills: ['TanStack Query', 'mutations', 'cache', 'API'],
      steps: [
        'Configure `QueryClientProvider` dans l’application.',
        'Charge une liste avec `useQuery` et affiche loading/erreur.',
        'Crée un formulaire avec `useMutation` et invalide la liste après succès.',
        "Ajoute une page détail avec `useQuery` et une clé `['item', id]`.",
        'Ajoute la suppression avec mise à jour optimiste du cache.',
      ],
      bonus: [
        'Ajoute une pagination infinie avec `useInfiniteQuery`.',
        'Ajoute un indicateur « données en cours de rafraîchissement ».',
      ],
    },
    {
      id: 'm6-p6',
      moduleId: 'm6',
      title: 'Kanban avec Zustand',
      level: 5,
      time: '3 h',
      summary:
        "Un tableau de tâches en colonnes, avec déplacement, édition et persistance.",
      skills: ['Zustand', 'drag & drop', 'état global', 'UI'],
      steps: [
        'Crée un store avec `columns`, `tasks` et les actions `addTask`, `moveTask`, `updateTask`.',
        'Affiche trois colonnes : À faire, En cours, Terminé.',
        'Implémente le déplacement par boutons (puis par drag & drop avec `dnd-kit`).',
        'Ajoute un formulaire de création et une édition inline.',
        'Persiste le store et ajoute un bouton de réinitialisation.',
      ],
      bonus: [
        'Ajoute des labels colorés et un filtre par label.',
        'Ajoute un compteur de tâches par colonne et une recherche.',
      ],
    },
    {
      id: 'm6-p7',
      moduleId: 'm6',
      title: 'Messagerie temps réel simulée',
      level: 5,
      time: '2 h 30',
      summary:
        "Une interface de chat avec conversations, messages, envoi optimiste et réponses simulées.",
      skills: ['état', 'effets', 'optimistic', 'UI'],
      steps: [
        'Crée une liste de conversations et une conversation active.',
        'Affiche les messages avec auteur, heure et statut de lecture.',
        'Ajoute un champ d’envoi avec Entrée et Maj+Entrée.',
        'Ajoute le message immédiatement puis simule une réponse après 1 s.',
        'Fais défiler automatiquement vers le dernier message avec une ref.',
      ],
      bonus: [
        'Ajoute un indicateur « en train d’écrire… ».',
        'Ajoute la recherche dans les conversations et un badge de non-lus.',
      ],
    },
    {
      id: 'm6-p8',
      moduleId: 'm6',
      title: 'E-commerce : panier et checkout',
      level: 5,
      time: '3 h',
      summary:
        "Catalogue, fiche produit, panier persistant, checkout en étapes et confirmation.",
      skills: ['Zustand', 'Router', 'formulaires', 'panier'],
      steps: [
        'Crée un catalogue de produits avec catégories et recherche.',
        'Crée une fiche produit `/produit/:slug` avec ajout au panier.',
        'Implémente un store panier persistant avec quantités et total.',
        'Crée un checkout en trois étapes : livraison, paiement simulé, confirmation.',
        'Affiche une page de confirmation avec numéro de commande.',
      ],
      bonus: [
        'Ajoute un code promo et des frais de livraison.',
        'Ajoute un état de stock et empêche l’ajout au-delà.',
      ],
    },
    {
      id: 'm6-p9',
      moduleId: 'm6',
      title: 'Table d’administration avancée',
      level: 5,
      time: '3 h',
      summary:
        "Tri, filtres, sélection multiple, actions groupées et pagination serveur simulée.",
      skills: ['tableaux', 'useMemo', 'sélection', 'UX'],
      steps: [
        'Charge 100 utilisateurs simulés depuis une API locale.',
        'Ajoute un tri par colonne (nom, date, statut) avec indicateur visuel.',
        'Ajoute des filtres par statut et une recherche.',
        'Ajoute la sélection multiple avec une case « tout sélectionner ».',
        'Ajoute des actions groupées (activer, suspendre, supprimer) et une pagination.',
      ],
      bonus: [
        'Ajoute une colonne d’actions par ligne avec menu contextuel.',
        'Ajoute un export CSV des lignes sélectionnées.',
      ],
    },
    {
      id: 'm6-p10',
      moduleId: 'm6',
      title: 'Starter SaaS complet',
      level: 5,
      time: '4 h',
      summary:
        "Landing, auth, dashboard, paramètres, facturation simulée et déploiement.",
      skills: ['architecture', 'routing', 'auth', 'qualité', 'déploiement'],
      steps: [
        'Structure le projet en `app`, `components`, `features`, `pages`, `lib`.',
        'Crée la landing publique et les routes d’authentification.',
        'Protège l’espace `/app` avec un layout et un contexte utilisateur.',
        'Ajoute un dashboard avec données mockées, paramètres et page facturation.',
        'Ajoute les lazy routes, la page 404, les métadonnées et déploie.',
      ],
      bonus: [
        'Ajoute des tests sur le parcours de connexion.',
        'Ajoute un mode sombre complet et un README professionnel.',
      ],
    },
  ],
}
