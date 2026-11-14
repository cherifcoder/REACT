import type { GuidedProject } from '../types'

export const boutique: GuidedProject = {
  slug: 'boutiquesahel',
  title: 'BoutiqueSahel',
  tagline: 'Un e-commerce complet : catalogue, panier et checkout.',
  description:
    "BoutiqueSahel vend des produits artisanaux : catalogue filtrable, fiche produit, panier persistant, checkout en trois étapes et confirmation de commande. C'est le projet qui relie routing, état global, formulaires et design. À la fin, tu as une vraie boutique fonctionnelle, prête à être branchée sur un backend.",
  level: 'Intermédiaire → Avancé',
  duration: '6 à 8 heures',
  stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'React Router 7', 'lucide-react'],
  features: [
    'Catalogue de produits avec recherche, catégories et tri',
    'Fiche produit avec quantité et produits similaires',
    'Panier persistant avec quantités, suppression et sous-total',
    'Drawer panier accessible depuis toutes les pages',
    'Checkout en 3 étapes : livraison, paiement simulé, revue',
    'Validation des champs et calcul des frais de livraison',
    'Confirmation de commande avec numéro',
    'Formatage des prix en FCFA',
  ],
  outcomes: [
    'Concevoir un état panier avec useReducer et un contexte',
    'Construire un routing multi-pages avec layout partagé',
    'Filtrer et trier un catalogue sans dériver l’état inutilement',
    'Gérer un checkout multi-étapes avec validation',
    'Persister un panier et le restaurer au chargement',
    'Structurer une application e-commerce prête pour une API',
  ],
  steps: [
    {
      title: 'Cadrer la boutique et les données',
      intro:
        "On définit les entités, les routes et les règles métier avant de coder. Un e-commerce sans modèle clair finit avec des calculs de prix dispersés.",
      blocks: [
        {
          type: 'table',
          headers: ['Route', 'Rôle'],
          rows: [
            ['`/`', 'Catalogue + filtres'],
            ['`/produit/:slug`', 'Fiche produit'],
            ['`/panier`', 'Panier complet'],
            ['`/checkout`', 'Formulaire de commande en 3 étapes'],
            ['`/confirmation/:orderId`', 'Confirmation'],
            ['`*`', 'Page 404'],
          ],
        },
        {
          type: 'code',
          title: 'src/types.ts',
          lang: 'ts',
          code: `export type Category = 'textile' | 'bijoux' | 'decoration' | 'cuisine'

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number // en FCFA
  category: Category
  image: string
  stock: number
  featured?: boolean
}

export type CartItem = {
  product: Product
  quantity: number
}

export type CartState = {
  items: CartItem[]
}

export type CartAction =
  | { type: 'add'; product: Product; quantity?: number }
  | { type: 'remove'; productId: string }
  | { type: 'setQuantity'; productId: string; quantity: number }
  | { type: 'clear' }

export type ShippingInfo = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  notes: string
}`,
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Prix en entier, jamais en flottant',
          text: "On stocke les montants en FCFA entiers. Les calculs flottants (`0.1 + 0.2`) produisent des erreurs d'arrondi. Si tu dois gérer des centimes, stocke des entiers de centimes et formate à l'affichage.",
        },
        {
          type: 'code',
          title: 'src/lib/format.ts',
          lang: 'ts',
          code: `export function formatPrice(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0,
  }).format(amount)
}`,
        },
      ],
    },
    {
      title: 'Initialiser le projet et les données produits',
      intro:
        "On crée le projet, Tailwind et un jeu de données réaliste. Les images peuvent venir d'Unsplash ou de fichiers locaux.",
      blocks: [
        {
          type: 'code',
          title: 'Commandes',
          lang: 'bash',
          code: `npm create vite@latest boutiquesahel -- --template react-ts
cd boutiquesahel
npm install
npm install tailwindcss @tailwindcss/vite react-router-dom lucide-react
npm run dev`,
        },
        {
          type: 'code',
          title: 'src/data/products.ts (extrait)',
          lang: 'ts',
          code: `import type { Product } from '../types'

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'bogolan-terracotta',
    name: 'Pagne bogolan terracotta',
    description: 'Tissu bogolan teint à la main, motif terre cuite. 2 m x 1,2 m.',
    price: 18500,
    category: 'textile',
    image: '/images/bogolan.jpg',
    stock: 12,
    featured: true,
  },
  {
    id: 'p2',
    slug: 'collier-perles',
    name: 'Collier en perles de verre',
    description: 'Collier artisanal, perles de verre recyclé et laiton.',
    price: 9500,
    category: 'bijoux',
    image: '/images/collier.jpg',
    stock: 8,
  },
  {
    id: 'p3',
    slug: 'panier-tresse',
    name: 'Panier tressé',
    description: 'Panier en fibres naturelles, idéal pour la maison.',
    price: 12000,
    category: 'decoration',
    image: '/images/panier.jpg',
    stock: 20,
  },
  {
    id: 'p4',
    slug: 'theiere-traditionnelle',
    name: 'Théière traditionnelle',
    description: 'Théière en métal émaillé, finition cuivre.',
    price: 15000,
    category: 'cuisine',
    image: '/images/theiere.jpg',
    stock: 5,
  },
]`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Les images dans public/',
          text: "Place les images dans `public/images/`. Elles sont servies à la racine : `/images/bogolan.jpg`. Pour des images distantes, configure des dimensions et un `alt` descriptif. Évite les images de 4 Mo : compresse en WebP.",
        },
      ],
    },
    {
      title: 'Le panier : reducer + contexte',
      intro:
        "Le panier doit être accessible depuis le header, le catalogue et le checkout. On le met dans un contexte, alimenté par un reducer pur.",
      blocks: [
        {
          type: 'code',
          title: 'src/features/cart/cartReducer.ts',
          lang: 'ts',
          code: `import type { CartAction, CartState } from '../../types'

export const initialCart: CartState = { items: [] }

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const quantity = Math.max(1, action.quantity ?? 1)
      const existing = state.items.find((item) => item.product.id === action.product.id)

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + quantity, item.product.stock),
                }
              : item,
          ),
        }
      }

      return {
        items: [
          ...state.items,
          { product: action.product, quantity: Math.min(quantity, action.product.stock) },
        ],
      }
    }

    case 'remove':
      return {
        items: state.items.filter((item) => item.product.id !== action.productId),
      }

    case 'setQuantity': {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter((item) => item.product.id !== action.productId),
        }
      }

      return {
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: Math.min(action.quantity, item.product.stock) }
            : item,
        ),
      }
    }

    case 'clear':
      return initialCart
  }
}

export function cartTotal(state: CartState) {
  return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
}

export function cartCount(state: CartState) {
  return state.items.reduce((count, item) => count + item.quantity, 0)
}`,
        },
        {
          type: 'code',
          title: 'src/features/cart/CartContext.tsx',
          lang: 'tsx',
          code: `import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import type { CartState, Product } from '../../types'
import { cartCount, cartReducer, cartTotal, initialCart } from './cartReducer'

type CartContextValue = {
  state: CartState
  count: number
  total: number
  add: (product: Product, quantity?: number) => void
  remove: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function readCart(): CartState {
  try {
    const raw = localStorage.getItem('boutique.cart')
    return raw ? (JSON.parse(raw) as CartState) : initialCart
  } catch {
    return initialCart
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, readCart)

  useEffect(() => {
    localStorage.setItem('boutique.cart', JSON.stringify(state))
  }, [state])

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      count: cartCount(state),
      total: cartTotal(state),
      add: (product, quantity) => dispatch({ type: 'add', product, quantity }),
      remove: (productId) => dispatch({ type: 'remove', productId }),
      setQuantity: (productId, quantity) =>
        dispatch({ type: 'setQuantity', productId, quantity }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [state],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart doit être utilisé dans CartProvider')
  return context
}`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Le panier persisté peut être obsolète',
          text: "Un produit peut avoir changé de prix ou de stock depuis la dernière visite. En production, recharge les produits depuis l'API au démarrage et réconcilie le panier. Ici, on restaure simplement, mais garde ce point en tête.",
        },
      ],
    },
    {
      title: 'Layout, routes et header avec panier',
      intro:
        "Un layout commun avec header sticky, compteur de panier et footer. Les routes sont déclarées avec createBrowserRouter.",
      blocks: [
        {
          type: 'code',
          title: 'src/components/Layout.tsx',
          lang: 'tsx',
          code: `import { Link, NavLink, Outlet } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../features/cart/CartContext'

export function Layout() {
  const { count } = useCart()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-paper-50/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="font-display text-lg font-semibold">
            Boutique<span className="text-brand-600">Sahel</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm sm:flex">
            <NavLink to="/">Boutique</NavLink>
            <NavLink to="/panier">Panier</NavLink>
          </nav>

          <Link to="/panier" className="relative rounded-xl border border-ink-900/10 p-2.5">
            <ShoppingBag className="size-5" aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-brand-600 text-[0.65rem] font-semibold text-white">
                {count}
              </span>
            )}
            <span className="sr-only">Panier, {count} article(s)</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-ink-900/10 py-8 text-center text-xs text-ink-500">
        BoutiqueSahel — projet pédagogique. Paiement simulé.
      </footer>
    </div>
  )
}`,
        },
        {
          type: 'code',
          title: 'src/main.tsx',
          lang: 'tsx',
          code: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Layout } from './components/Layout'
import { CartProvider } from './features/cart/CartContext'
import { Catalog } from './pages/Catalog'
import { ProductPage } from './pages/ProductPage'
import { CartPage } from './pages/CartPage'
import { Checkout } from './pages/Checkout'
import { Confirmation } from './pages/Confirmation'
import { NotFound } from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Catalog /> },
      { path: 'produit/:slug', element: <ProductPage /> },
      { path: 'panier', element: <CartPage /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'confirmation/:orderId', element: <Confirmation /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)`,
        },
      ],
    },
    {
      title: 'Catalogue, recherche et filtres',
      intro:
        "On dérive la liste affichée à partir des produits et des filtres. Aucun état dupliqué : tout est calculé avec useMemo.",
      blocks: [
        {
          type: 'code',
          title: 'src/pages/Catalog.tsx',
          lang: 'tsx',
          code: `import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { products } from '../data/products'
import type { Category } from '../types'
import { ProductCard } from '../components/ProductCard'

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'name'

const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'Tout' },
  { value: 'textile', label: 'Textile' },
  { value: 'bijoux', label: 'Bijoux' },
  { value: 'decoration', label: 'Décoration' },
  { value: 'cuisine', label: 'Cuisine' },
]

export function Catalog() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [sort, setSort] = useState<Sort>('featured')

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    const filtered = products.filter((product) => {
      const matchesQuery =
        normalized.length === 0 ||
        product.name.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized)
      const matchesCategory = category === 'all' || product.category === category
      return matchesQuery && matchesCategory
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'name') return a.name.localeCompare(b.name)
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    })
  }, [query, category, sort])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="max-w-2xl">
        <p className="font-mono text-[0.65rem] tracking-widest text-brand-600 uppercase">Projet guidé 03</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">L'artisanat du Sahel, chez vous.</h1>
        <p className="mt-3 text-ink-600">
          Textiles, bijoux et objets façonnés à la main. Livraison à Bamako sous 48 h.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Rechercher un produit</span>
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher…"
            className="w-full rounded-xl border border-ink-900/15 py-2.5 pr-4 pl-9 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
          />
        </label>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-ink-400" aria-hidden="true" />
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
            aria-label="Trier les produits"
            className="rounded-xl border border-ink-900/15 px-3 py-2.5 text-sm"
          >
            <option value="featured">En vedette</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="name">Nom (A–Z)</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((entry) => (
          <button
            key={entry.value}
            type="button"
            onClick={() => setCategory(entry.value)}
            aria-pressed={category === entry.value}
            className={
              'rounded-full px-4 py-1.5 text-xs font-medium transition ' +
              (category === entry.value
                ? 'bg-ink-900 text-white'
                : 'bg-ink-900/5 text-ink-700 hover:bg-ink-900/10')
            }
          >
            {entry.label}
          </button>
        ))}
      </div>

      <p className="mt-5 text-xs text-ink-500">{visible.length} produit(s)</p>

      {visible.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-ink-900/15 p-12 text-center">
          <p className="font-medium">Aucun produit ne correspond.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setCategory('all')
            }}
            className="mt-2 text-sm text-brand-600 underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}`,
        },
        {
          type: 'code',
          title: 'src/components/ProductCard.tsx',
          lang: 'tsx',
          code: `import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '../types'
import { formatPrice } from '../lib/format'
import { useCart } from '../features/cart/CartContext'

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()

  return (
    <article className="group overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
      <Link to={'/produit/' + product.slug} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="p-4">
        <p className="text-[0.65rem] tracking-widest text-ink-500 uppercase">{product.category}</p>
        <Link to={'/produit/' + product.slug}>
          <h2 className="mt-1 font-medium">{product.name}</h2>
        </Link>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="font-semibold">{formatPrice(product.price)}</p>
          <button
            type="button"
            onClick={() => add(product)}
            disabled={product.stock === 0}
            aria-label={'Ajouter ' + product.name + ' au panier'}
            className="grid size-9 place-items-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:opacity-40"
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}`,
        },
      ],
    },
    {
      title: 'Fiche produit et panier',
      intro:
        "La fiche produit gère la quantité et le stock. Le panier permet de modifier les quantités et affiche un récapitulatif clair.",
      blocks: [
        {
          type: 'code',
          title: 'src/pages/ProductPage.tsx',
          lang: 'tsx',
          code: `import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { products } from '../data/products'
import { formatPrice } from '../lib/format'
import { useCart } from '../features/cart/CartContext'

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = products.find((entry) => entry.slug === slug)
  const { add } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold">Produit introuvable</h1>
        <Link to="/" className="mt-4 inline-block text-brand-600 underline">
          Retour à la boutique
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-2">
      <img
        src={product.image}
        alt={product.name}
        className="aspect-square w-full rounded-3xl object-cover"
      />

      <div className="lg:py-6">
        <p className="text-[0.65rem] tracking-widest text-ink-500 uppercase">{product.category}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{product.name}</h1>
        <p className="mt-4 text-2xl font-semibold">{formatPrice(product.price)}</p>
        <p className="mt-4 leading-relaxed text-ink-600">{product.description}</p>

        <p className="mt-4 text-sm text-ink-500">
          {product.stock > 0 ? product.stock + ' en stock' : 'Rupture de stock'}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-ink-900/15">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              aria-label="Diminuer la quantité"
              className="p-3"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))}
              aria-label="Augmenter la quantité"
              className="p-3"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <button
            type="button"
            disabled={product.stock === 0}
            onClick={() => add(product, quantity)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-40"
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            Ajouter au panier
          </button>
        </div>

        <Link to="/panier" className="mt-4 inline-block text-sm text-ink-600 underline">
          Voir le panier
        </Link>
      </div>
    </div>
  )
}`,
        },
        {
          type: 'code',
          title: 'src/pages/CartPage.tsx',
          lang: 'tsx',
          code: `import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../features/cart/CartContext'
import { formatPrice } from '../lib/format'

const SHIPPING = 2500

export function CartPage() {
  const { state, total, setQuantity, remove, clear } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold">Votre panier est vide</h1>
        <p className="mt-2 text-ink-600">Découvrez les créations de nos artisans.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-brand-600 px-5 py-3 text-sm font-medium text-white"
        >
          Voir la boutique
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_340px]">
      <section>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Panier</h1>
          <button type="button" onClick={clear} className="text-xs text-ink-500 underline">
            Vider
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {state.items.map((item) => (
            <li key={item.product.id} className="flex gap-4 rounded-2xl border border-ink-900/10 bg-white p-3">
              <img
                src={item.product.image}
                alt=""
                className="size-24 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <Link to={'/produit/' + item.product.slug} className="font-medium">
                  {item.product.name}
                </Link>
                <p className="mt-1 text-sm text-ink-500">{formatPrice(item.product.price)}</p>

                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center rounded-lg border border-ink-900/15">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.product.id, item.quantity - 1)}
                      aria-label="Diminuer"
                      className="p-2"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-7 text-center text-xs">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.product.id, item.quantity + 1)}
                      aria-label="Augmenter"
                      className="p-2"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.product.id)}
                    aria-label={'Retirer ' + item.product.name}
                    className="rounded-lg p-2 text-ink-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
            </li>
          ))}
        </ul>
      </section>

      <aside className="h-fit rounded-2xl border border-ink-900/10 bg-white p-5 lg:sticky lg:top-24">
        <h2 className="font-semibold">Récapitulatif</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-600">Sous-total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-600">Livraison</dt>
            <dd>{formatPrice(SHIPPING)}</dd>
          </div>
          <div className="flex justify-between border-t border-ink-900/10 pt-2 font-semibold">
            <dt>Total</dt>
            <dd>{formatPrice(total + SHIPPING)}</dd>
          </div>
        </dl>
        <Link
          to="/checkout"
          className="mt-5 block rounded-xl bg-brand-600 px-5 py-3 text-center text-sm font-medium text-white hover:bg-brand-700"
        >
          Passer commande
        </Link>
        <p className="mt-3 text-center text-[0.7rem] text-ink-500">Paiement simulé — aucune carte débitée.</p>
      </aside>
    </div>
  )
}`,
        },
      ],
    },
    {
      title: 'Checkout en trois étapes et confirmation',
      intro:
        "Le checkout garde les informations de livraison, valide chaque étape, simule le paiement et vide le panier après succès.",
      blocks: [
        {
          type: 'code',
          title: 'src/pages/Checkout.tsx',
          lang: 'tsx',
          code: `import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ShippingInfo } from '../types'
import { useCart } from '../features/cart/CartContext'
import { formatPrice } from '../lib/format'

const SHIPPING = 2500
const steps = ['Livraison', 'Paiement', 'Revue'] as const

const initialShipping: ShippingInfo = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: 'Bamako', country: 'Mali', notes: '',
}

export function Checkout() {
  const { state, total, clear } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [shipping, setShipping] = useState<ShippingInfo>(initialShipping)
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [processing, setProcessing] = useState(false)

  function updateShipping(key: keyof ShippingInfo, value: string) {
    setShipping((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: '' }))
  }

  function validateStep() {
    const next: Record<string, string> = {}

    if (step === 0) {
      if (shipping.firstName.trim().length < 2) next.firstName = 'Prénom requis.'
      if (shipping.lastName.trim().length < 2) next.lastName = 'Nom requis.'
      if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(shipping.email)) next.email = 'E-mail invalide.'
      if (shipping.phone.replace(/\\D/g, '').length < 8) next.phone = 'Téléphone invalide.'
      if (shipping.address.trim().length < 5) next.address = 'Adresse trop courte.'
      if (shipping.city.trim().length < 2) next.city = 'Ville requise.'
    }

    if (step === 1) {
      if (card.number.replace(/\\s/g, '').length !== 16) next.number = '16 chiffres attendus.'
      if (!/^\\d{2}\\/\\d{2}$/.test(card.expiry)) next.expiry = 'Format MM/AA.'
      if (card.cvc.length < 3) next.cvc = 'CVC invalide.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!validateStep()) return

    if (step < 2) {
      setStep((value) => value + 1)
      return
    }

    setProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const orderId = 'BS-' + Date.now().toString().slice(-8)
    sessionStorage.setItem(
      'boutique.lastOrder',
      JSON.stringify({ orderId, shipping, total: total + SHIPPING }),
    )
    clear()
    navigate('/confirmation/' + orderId)
  }

  if (state.items.length === 0) {
    return <p className="mx-auto max-w-2xl px-4 py-20 text-center">Votre panier est vide.</p>
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Finaliser la commande</h1>

      <ol className="mt-6 flex gap-2">
        {steps.map((label, index) => (
          <li key={label} className="flex-1">
            <div className={'h-1 rounded-full ' + (index <= step ? 'bg-brand-600' : 'bg-ink-900/10')} />
            <p className={'mt-2 text-xs ' + (index === step ? 'font-semibold text-brand-600' : 'text-ink-500')}>
              {index + 1}. {label}
            </p>
          </li>
        ))}
      </ol>

      <form onSubmit={submit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Prénom" value={shipping.firstName} onChange={(v) => updateShipping('firstName', v)} error={errors.firstName} />
              <Input label="Nom" value={shipping.lastName} onChange={(v) => updateShipping('lastName', v)} error={errors.lastName} />
              <Input label="E-mail" type="email" value={shipping.email} onChange={(v) => updateShipping('email', v)} error={errors.email} />
              <Input label="Téléphone" value={shipping.phone} onChange={(v) => updateShipping('phone', v)} error={errors.phone} />
              <div className="sm:col-span-2">
                <Input label="Adresse" value={shipping.address} onChange={(v) => updateShipping('address', v)} error={errors.address} />
              </div>
              <Input label="Ville" value={shipping.city} onChange={(v) => updateShipping('city', v)} error={errors.city} />
              <Input label="Pays" value={shipping.country} onChange={(v) => updateShipping('country', v)} />
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-ink-600">Notes (optionnel)</label>
                <textarea
                  value={shipping.notes}
                  onChange={(event) => updateShipping('notes', event.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-ink-900/15 px-3 py-2 text-sm"
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4">
              <Input label="Numéro de carte" value={card.number} onChange={(v) => setCard({ ...card, number: v })} error={errors.number} placeholder="4242 4242 4242 4242" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiration" value={card.expiry} onChange={(v) => setCard({ ...card, expiry: v })} error={errors.expiry} placeholder="12/28" />
                <Input label="CVC" value={card.cvc} onChange={(v) => setCard({ ...card, cvc: v })} error={errors.cvc} placeholder="123" />
              </div>
              <p className="rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
                Paiement simulé : ne saisis jamais une vraie carte dans un projet pédagogique.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 text-sm">
              <div>
                <h2 className="font-semibold">Livraison</h2>
                <p className="mt-1 text-ink-600">
                  {shipping.firstName} {shipping.lastName}<br />
                  {shipping.address}, {shipping.city}, {shipping.country}<br />
                  {shipping.email} · {shipping.phone}
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Articles</h2>
                <ul className="mt-1 space-y-1 text-ink-600">
                  {state.items.map((item) => (
                    <li key={item.product.id}>
                      {item.quantity} × {item.product.name} — {formatPrice(item.product.price * item.quantity)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              disabled={step === 0 || processing}
              onClick={() => setStep((value) => value - 1)}
              className="rounded-xl border border-ink-900/15 px-4 py-2 text-sm disabled:opacity-40"
            >
              Retour
            </button>
            <button
              type="submit"
              disabled={processing}
              className="rounded-xl bg-brand-600 px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {processing ? 'Paiement…' : step === 2 ? 'Payer ' + formatPrice(total + SHIPPING) : 'Continuer'}
            </button>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-ink-900/10 bg-white p-5 text-sm">
          <h2 className="font-semibold">Votre commande</h2>
          <ul className="mt-3 space-y-2">
            {state.items.map((item) => (
              <li key={item.product.id} className="flex justify-between gap-2 text-ink-600">
                <span>{item.quantity} × {item.product.name}</span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-ink-900/10 pt-3 font-semibold">
            <span>Total</span>
            <span>{formatPrice(total + SHIPPING)}</span>
          </div>
        </aside>
      </form>
    </div>
  )
}

function Input({
  label, value, onChange, error, type = 'text', placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-ink-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={
          'w-full rounded-xl border px-3 py-2 text-sm ' +
          (error ? 'border-red-500' : 'border-ink-900/15')
        }
      />
      {error && <p role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ne collecte jamais de vraies cartes dans un projet d’apprentissage',
          text: "Le formulaire ci-dessus est une simulation. En production, utilise un prestataire comme Stripe Checkout : les numéros de carte ne doivent jamais transiter par ton code. La conformité PCI est un sujet sérieux.",
        },
      ],
    },
    {
      title: 'Finitions, tests et déploiement',
      intro:
        "On vérifie les parcours, la persistance, les états vides et la mise en ligne.",
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Parcours complet',
              text: "Ajoute trois produits, modifie les quantités, retire un article, recharge la page et vérifie que le panier est intact. Va au checkout, teste les erreurs, termine la commande, vérifie la confirmation et le panier vidé.",
            },
            {
              title: 'Stock et cas limites',
              text: "Essaie d'ajouter plus que le stock, un produit en rupture, un slug inexistant (`/produit/nope`). Chaque cas doit avoir un message clair.",
            },
            {
              title: 'Responsive et clavier',
              text: "Teste le catalogue, la fiche et le panier à 375 px. Vérifie que le drawer/panier et les formulaires restent utilisables au clavier.",
            },
            {
              title: 'Build et déploiement',
              text: "`npm run build`, puis déploie sur Vercel. Ajoute `vercel.json` avec la réécriture SPA pour que `/produit/...` fonctionne après un rechargement.",
            },
          ],
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
          type: 'callout',
          tone: 'tip',
          title: 'La suite logique : un backend',
          text: "Remplace `products.ts` par un appel API et le reducer panier par un panier serveur. Ajoute une vraie création de commande, un stock transactionnel et un paiement Stripe. Le front est déjà structuré pour ça : c'est le signe d'une bonne architecture.",
        },
      ],
    },
  ],
  extensions: [
    'Ajouter des favoris et une page « Ma liste ».',
    'Ajouter des avis clients et une note moyenne.',
    'Ajouter un code promo et des frais de livraison par ville.',
    'Ajouter un back-office admin pour gérer les produits.',
    'Brancher Stripe Checkout en mode test.',
    'Écrire des tests sur le reducer panier et le calcul du total.',
  ],
}
