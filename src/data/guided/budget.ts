import type { GuidedProject } from '../types'

export const budget: GuidedProject = {
  slug: 'budgetwise',
  title: 'BudgetWise',
  tagline: 'Un suivi de dépenses clair, avec budget mensuel, graphiques et export CSV.',
  description:
    "BudgetWise est le cinquième projet guidé : un tableau de bord de dépenses personnelles. Tu vas modéliser des données financières, écrire un reducer persistant, valider un formulaire, filtrer une liste, dessiner des graphiques en SVG et en CSS, puis exporter les données en CSV. C'est le projet parfait pour réviser les hooks, les formulaires et la composition d'interface avant le projet final.",
  level: 'Intermédiaire',
  duration: '4 à 5 heures',
  stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'lucide-react'],
  features: [
    'Ajouter une dépense : libellé, montant, catégorie et date',
    'Valider les montants et afficher des erreurs accessibles',
    'Définir un budget mensuel et suivre le reste à dépenser',
    'Filtrer les dépenses par catégorie',
    'Supprimer une dépense avec confirmation',
    'Graphique des dépenses par catégorie, sans librairie',
    'Anneau de progression du budget en CSS pur',
    'Export CSV compatible Excel (séparateur point-virgule)',
    'Persistance automatique dans localStorage',
  ],
  outcomes: [
    'Modéliser des données financières sans erreur d’arrondi',
    'Écrire un hook métier qui agrège des données avec `useMemo`',
    'Construire un formulaire contrôlé avec validation et messages d’erreur',
    'Dessiner un graphique accessible avec du HTML et du SVG',
    'Générer et télécharger un fichier CSV côté navigateur',
    'Organiser une application en composants présentationnels et hooks métier',
  ],
  steps: [
    {
      title: 'Cadrer BudgetWise et modéliser les données',
      intro:
        "On commence par le périmètre fonctionnel et le modèle de données. BudgetWise ne gère pas les revenus : il suit des dépenses par rapport à un budget mensuel. Ce choix garde le projet lisible tout en couvrant tout ce qu'il faut apprendre.",
      blocks: [
        {
          type: 'list',
          items: [
            '**Ajouter** une dépense avec un libellé, un montant entier, une catégorie et une date.',
            '**Supprimer** une dépense après confirmation.',
            '**Filtrer** la liste par catégorie.',
            '**Définir** un budget mensuel et visualiser la consommation.',
            '**Analyser** la répartition des dépenses par catégorie.',
            '**Exporter** les données en CSV.',
            '**Persister** dépenses et budget dans le navigateur.',
          ],
        },
        {
          type: 'code',
          title: 'Le modèle et les catégories (src/types.ts)',
          lang: 'ts',
          code: `export type Category = 'food' | 'housing' | 'transport' | 'leisure' | 'health' | 'other'

export type Expense = {
  id: string
  label: string
  amount: number
  category: Category
  date: string // format YYYY-MM-DD
}

export type Filter = 'all' | Category

export type CategoryMeta = {
  id: Category
  label: string
  color: string
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'food', label: 'Alimentation', color: '#f45b39' },
  { id: 'housing', label: 'Logement', color: '#3d5bf5' },
  { id: 'transport', label: 'Transport', color: '#a6d83f' },
  { id: 'leisure', label: 'Loisirs', color: '#9d7bff' },
  { id: 'health', label: 'Santé', color: '#22b8cf' },
  { id: 'other', label: 'Autre', color: '#9298ad' },
]

export function getCategory(id: Category): CategoryMeta {
  return CATEGORIES.find((category) => category.id === id) ?? CATEGORIES[CATEGORIES.length - 1]
}`,
        },
        {
          type: 'table',
          headers: ['Besoin', 'Décision', 'Pourquoi'],
          rows: [
            ['Montants', 'Entiers, en francs CFA', 'Le XOF n’a pas de centimes : aucun arrondi flottant à gérer.'],
            ['Dates', 'Chaîne `YYYY-MM-DD`', 'Tri alphabétique = tri chronologique, et compatible avec `<input type="date">`.'],
            ['Identifiants', '`crypto.randomUUID()`', 'Unique même si deux dépenses sont ajoutées dans la même milliseconde.'],
            ['Persistance', 'localStorage', 'Aucun serveur à déployer, les données restent sur l’appareil.'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ne stocke jamais un montant en euros flottants',
          text: "`0.1 + 0.2` vaut `0.30000000000000004` en JavaScript. Pour une devise avec centimes, stocke des centimes entiers et divise seulement à l'affichage. Ici, en XOF, on stocke directement des entiers.",
        },
      ],
    },
    {
      title: 'Créer le projet et le socle visuel',
      intro:
        "Initialise Vite, installe Tailwind 4 et les icônes, puis pose les tokens de couleur. On garde une palette courte : un bleu pour la marque, un vert pour le positif, un corail pour les alertes.",
      blocks: [
        {
          type: 'code',
          title: 'Terminal',
          lang: 'bash',
          code: `npm create vite@latest budgetwise -- --template react-ts
cd budgetwise
npm install
npm install tailwindcss @tailwindcss/vite lucide-react
npm run dev`,
        },
        {
          type: 'code',
          title: 'vite.config.ts',
          lang: 'ts',
          code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})`,
        },
        {
          type: 'code',
          title: 'src/index.css',
          lang: 'css',
          code: `@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  --color-paper-50: #fbfaf6;
  --color-paper-100: #f4f1e8;
  --color-paper-200: #e8e3d5;

  --color-ink-500: #6b7189;
  --color-ink-700: #2c3145;
  --color-ink-900: #10111a;

  --color-brand-500: #3d5bf5;
  --color-brand-600: #2b45d6;

  --color-lime-400: #c6f26a;
  --color-coral-500: #f45b39;

  --color-night-800: #13172a;
  --color-night-900: #0d1020;
  --color-night-950: #0a0c17;
}

@layer base {
  body {
    @apply bg-paper-50 font-sans text-ink-900 antialiased;
  }
  .dark body {
    @apply bg-night-950 text-paper-100;
  }
  h1,
  h2,
  h3 {
    @apply font-semibold tracking-tight;
  }
}`,
        },
        {
          type: 'code',
          title: 'Arborescence cible',
          lang: 'text',
          code: `src/
  components/
    BudgetRing.tsx
    CategoryChart.tsx
    ExpenseForm.tsx
    ExpenseList.tsx
  hooks/
    useExpenses.ts
    useLocalStorage.ts
  lib/
    csv.ts
    format.ts
  App.tsx
  main.tsx
  types.ts`,
        },
      ],
    },
    {
      title: 'Écrire les hooks : persistance et logique métier',
      intro:
        "Sépare le stockage de la logique. `useLocalStorage` ne connaît que des clés et des valeurs. `useExpenses` connaît les dépenses, le budget et les agrégations. Les composants ne manipulent jamais localStorage directement.",
      blocks: [
        {
          type: 'code',
          title: 'src/hooks/useLocalStorage.ts',
          lang: 'ts',
          code: `import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Quota dépassé ou stockage bloqué : on ignore silencieusement.
    }
  }, [key, value])

  return [value, setValue] as const
}`,
        },
        {
          type: 'code',
          title: 'src/hooks/useExpenses.ts',
          lang: 'ts',
          code: `import { useMemo } from 'react'
import type { Category, Expense } from '../types'
import { useLocalStorage } from './useLocalStorage'

export type ExpenseInput = Omit<Expense, 'id'>

export function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('budgetwise:expenses', [])
  const [budget, setBudget] = useLocalStorage<number>('budgetwise:budget', 250000)

  function add(input: ExpenseInput) {
    setExpenses((current) => [{ ...input, id: crypto.randomUUID() }, ...current])
  }

  function remove(id: string) {
    setExpenses((current) => current.filter((expense) => expense.id !== id))
  }

  function clear() {
    setExpenses([])
  }

  const total = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses],
  )

  const byCategory = useMemo(() => {
    const result = new Map<Category, number>()
    for (const expense of expenses) {
      result.set(expense.category, (result.get(expense.category) ?? 0) + expense.amount)
    }
    return result
  }, [expenses])

  const remaining = budget - total
  const ratio = budget > 0 ? Math.min(total / budget, 1) : 0

  return {
    expenses,
    budget,
    setBudget,
    add,
    remove,
    clear,
    total,
    byCategory,
    remaining,
    ratio,
  }
}`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Pourquoi ce découpage ?',
          text: "Le jour où tu veux synchroniser les dépenses avec une API, tu modifies seulement `useExpenses` : l'interface ne change pas. Et le jour où tu veux tester la logique, tu n'as pas besoin de monter un composant.",
        },
        {
          type: 'p',
          text: "Ajoute les fonctions de formatage, utilisées partout dans l'interface. `Intl` gère les séparateurs de milliers et la devise selon la locale.",
        },
        {
          type: 'code',
          title: 'src/lib/format.ts',
          lang: 'ts',
          code: `const currency = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'XOF',
  maximumFractionDigits: 0,
})

const shortDate = new Intl.DateTimeFormat('fr-FR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

export function formatCurrency(value: number) {
  return currency.format(value)
}

export function formatDate(value: string) {
  return shortDate.format(new Date(value))
}`,
        },
      ],
    },
    {
      title: 'Construire le formulaire d’ajout',
      intro:
        "Le formulaire est contrôlé : chaque champ vit dans un état React. On valide au moment de la soumission, on affiche une seule erreur à la fois, et on annonce le message aux lecteurs d'écran.",
      blocks: [
        {
          type: 'code',
          title: 'src/components/ExpenseForm.tsx',
          lang: 'tsx',
          code: `import { useState } from 'react'
import type { FormEvent } from 'react'
import { Plus } from 'lucide-react'
import type { Category } from '../types'
import { CATEGORIES } from '../types'
import type { ExpenseInput } from '../hooks/useExpenses'

type Props = {
  onAdd: (input: ExpenseInput) => void
}

export function ExpenseForm({ onAdd }: Props) {
  const [label, setLabel] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<Category>('food')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsed = Number(amount.replace(',', '.'))

    if (label.trim().length < 2) {
      setError('Le libellé doit contenir au moins deux caractères.')
      return
    }
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setError('Saisis un montant supérieur à zéro.')
      return
    }
    if (!date) {
      setError('Choisis une date.')
      return
    }

    onAdd({
      label: label.trim(),
      amount: Math.round(parsed),
      category,
      date,
    })

    setLabel('')
    setAmount('')
    setCategory('food')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium">Libellé</span>
          <input
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="Courses au marché"
            className="w-full rounded-xl border border-ink-900/15 bg-white px-3.5 py-2.5 outline-none transition focus:border-brand-500 dark:border-paper-100/15 dark:bg-night-800"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Montant (FCFA)</span>
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            inputMode="numeric"
            placeholder="15000"
            className="w-full rounded-xl border border-ink-900/15 bg-white px-3.5 py-2.5 font-mono outline-none transition focus:border-brand-500 dark:border-paper-100/15 dark:bg-night-800"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Catégorie</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as Category)}
            className="w-full rounded-xl border border-ink-900/15 bg-white px-3.5 py-2.5 outline-none transition focus:border-brand-500 dark:border-paper-100/15 dark:bg-night-800"
          >
            {CATEGORIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium">Date</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-xl border border-ink-900/15 bg-white px-3.5 py-2.5 outline-none transition focus:border-brand-500 dark:border-paper-100/15 dark:bg-night-800"
          />
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-coral-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 font-medium text-white transition hover:bg-brand-600"
      >
        <Plus className="size-4" aria-hidden="true" />
        Ajouter la dépense
      </button>
    </form>
  )
}`,
        },
        {
          type: 'callout',
          tone: 'info',
          title: '`as Category` est-il dangereux ?',
          text: "Ici non : les options du `select` sont générées depuis `CATEGORIES`, donc la valeur reçue est forcément valide. Ce cast documente une garantie que TypeScript ne peut pas déduire du DOM. Ne l'utilise pas sur une entrée libre.",
        },
      ],
    },
    {
      title: 'Afficher, filtrer et supprimer les dépenses',
      intro:
        "La liste est un composant purement présentationnel : il reçoit des données et des callbacks. Le filtre vit dans `App`, car il pilote aussi le graphique.",
      blocks: [
        {
          type: 'code',
          title: 'src/components/ExpenseList.tsx',
          lang: 'tsx',
          code: `import { Trash2 } from 'lucide-react'
import type { Expense } from '../types'
import { getCategory } from '../types'
import { formatCurrency, formatDate } from '../lib/format'

type Props = {
  expenses: Expense[]
  onRemove: (id: string) => void
}

export function ExpenseList({ expenses, onRemove }: Props) {
  if (expenses.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-ink-900/15 p-8 text-center text-sm text-ink-500 dark:border-paper-100/15 dark:text-paper-100/50">
        Aucune dépense pour ce filtre. Ajoute ta première dépense.
      </p>
    )
  }

  return (
    <ul className="divide-y divide-ink-900/10 dark:divide-paper-100/10">
      {expenses.map((expense) => {
        const category = getCategory(expense.category)

        return (
          <li key={expense.id} className="flex items-center gap-3 py-3">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: category.color }}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{expense.label}</p>
              <p className="text-xs text-ink-500 dark:text-paper-100/50">
                {category.label} · {formatDate(expense.date)}
              </p>
            </div>
            <span className="font-mono text-sm tabular-nums">
              {formatCurrency(expense.amount)}
            </span>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Supprimer « ' + expense.label + ' » ?')) {
                  onRemove(expense.id)
                }
              }}
              aria-label={'Supprimer ' + expense.label}
              className="rounded-lg p-2 text-ink-500 transition hover:bg-coral-500/10 hover:text-coral-500"
            >
              <Trash2 className="size-4" aria-hidden="true" />
            </button>
          </li>
        )
      })}
    </ul>
  )
}`,
        },
        {
          type: 'p',
          text: "Le filtre est une rangée de boutons avec `aria-pressed`. Il reste lisible sur mobile grâce à un défilement horizontal.",
        },
        {
          type: 'code',
          title: 'Le filtre (extrait de App.tsx)',
          lang: 'tsx',
          code: `const [filter, setFilter] = useState<Filter>('all')

const visible = useMemo(
  () => (filter === 'all' ? expenses : expenses.filter((expense) => expense.category === filter)),
  [expenses, filter],
)

<div className="flex gap-2 overflow-x-auto pb-1">
  <button
    type="button"
    onClick={() => setFilter('all')}
    aria-pressed={filter === 'all'}
    className="shrink-0 rounded-full border px-3.5 py-1.5 text-sm aria-pressed:border-brand-500 aria-pressed:bg-brand-500 aria-pressed:text-white"
  >
    Toutes
  </button>
  {CATEGORIES.map((category) => (
    <button
      key={category.id}
      type="button"
      onClick={() => setFilter(category.id)}
      aria-pressed={filter === category.id}
      className="shrink-0 rounded-full border border-ink-900/15 px-3.5 py-1.5 text-sm transition aria-pressed:border-brand-500 aria-pressed:bg-brand-500 aria-pressed:text-white dark:border-paper-100/15"
    >
      {category.label}
    </button>
  ))}
</div>`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: '`useMemo` ou pas ?',
          text: "Le filtrage est trivial et React est rapide : tu pourrais t'en passer. On le garde parce qu'il rend l'intention explicite et prépare le jour où la liste contiendra des milliers d'éléments. Ne mémoïse jamais par réflexe : mesure d'abord.",
        },
      ],
    },
    {
      title: 'Graphiques maison, anneau de budget et export CSV',
      intro:
        "Pas besoin de librairie de graphiques pour six catégories. Des barres HTML suffisent, avec un maximum normalisé. L'anneau du budget utilise un `conic-gradient` piloté par le ratio.",
      blocks: [
        {
          type: 'code',
          title: 'src/components/CategoryChart.tsx',
          lang: 'tsx',
          code: `import { formatCurrency } from '../lib/format'

type ChartItem = {
  label: string
  value: number
  color: string
}

export function CategoryChart({ data }: { data: ChartItem[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-ink-500 dark:text-paper-100/50">
        Ajoute des dépenses pour voir la répartition.
      </p>
    )
  }

  const max = Math.max(...data.map((item) => item.value))

  return (
    <ul className="space-y-4">
      {data.map((item) => (
        <li key={item.label}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 font-medium">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              {item.label}
            </span>
            <span className="font-mono text-xs text-ink-500 tabular-nums dark:text-paper-100/50">
              {formatCurrency(item.value)}
            </span>
          </div>
          <div
            className="h-2.5 overflow-hidden rounded-full bg-paper-200 dark:bg-night-700"
            role="img"
            aria-label={item.label + ' : ' + formatCurrency(item.value)}
          >
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: (item.value / max) * 100 + '%',
                backgroundColor: item.color,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}`,
        },
        {
          type: 'code',
          title: 'src/components/BudgetRing.tsx',
          lang: 'tsx',
          code: `import { formatCurrency } from '../lib/format'

type Props = {
  ratio: number
  total: number
  remaining: number
}

export function BudgetRing({ ratio, total, remaining }: Props) {
  const over = remaining < 0
  const color = over ? '#f45b39' : ratio > 0.8 ? '#f5a524' : '#3d5bf5'

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
      <div
        className="relative grid size-36 shrink-0 place-items-center rounded-full"
        style={{
          background:
            'conic-gradient(' +
            color +
            ' ' +
            ratio * 360 +
            'deg, rgba(16, 17, 26, 0.08) ' +
            ratio * 360 +
            'deg)',
        }}
        role="img"
        aria-label={'Budget consommé à ' + Math.round(ratio * 100) + ' pour cent'}
      >
        <div className="grid size-[calc(100%-1.5rem)] place-items-center rounded-full bg-white text-center dark:bg-night-800">
          <div>
            <p className="font-mono text-xl font-semibold tabular-nums">
              {Math.round(ratio * 100)} %
            </p>
            <p className="text-[11px] uppercase tracking-wide text-ink-500 dark:text-paper-100/50">
              consommé
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-1 text-center sm:text-left">
        <p className="text-sm text-ink-500 dark:text-paper-100/50">Dépensé ce mois-ci</p>
        <p className="font-mono text-2xl font-semibold tabular-nums">{formatCurrency(total)}</p>
        <p className={over ? 'text-sm text-coral-500' : 'text-sm text-ink-700 dark:text-paper-100/70'}>
          {over ? 'Dépassement de ' : 'Reste '}
          {formatCurrency(Math.abs(remaining))}
        </p>
      </div>
    </div>
  )
}`,
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Accessibilité des graphiques',
          text: "Un graphique purement visuel est inutilisable au lecteur d'écran. Chaque barre porte un `role=\"img\"` et un `aria-label` avec le libellé et le montant. C'est la version minimale correcte.",
        },
        {
          type: 'code',
          title: 'src/lib/csv.ts',
          lang: 'ts',
          code: `import type { Expense } from '../types'
import { getCategory } from '../types'

export function exportCsv(expenses: Expense[]) {
  const header = ['date', 'libelle', 'categorie', 'montant']
  const rows = expenses.map((expense) => [
    expense.date,
    expense.label,
    getCategory(expense.category).label,
    String(expense.amount),
  ])

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => '"' + cell.split('"').join('""') + '"').join(';'))
    .join('\\n')

  // Le BOM indique à Excel que le fichier est en UTF-8.
  const blob = new Blob(['\\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'budgetwise.csv'
  link.click()
  URL.revokeObjectURL(url)
}`,
        },
        {
          type: 'quote',
          text: 'Un tableur ouvre un CSV en supposant un séparateur. En locale française, c’est le point-virgule, pas la virgule. Le BOM évite les accents cassés.',
          author: 'À retenir pour tout export de données',
        },
      ],
    },
    {
      title: 'Assembler l’application et soigner les états',
      intro:
        "`App.tsx` relie tout : le hook métier, le filtre, le formulaire, les graphiques et la liste. Prévois l'état vide, l'état de dépassement et le changement de budget.",
      blocks: [
        {
          type: 'code',
          title: 'src/App.tsx',
          lang: 'tsx',
          code: `import { useMemo, useState } from 'react'
import { Download, Wallet } from 'lucide-react'
import { BudgetRing } from './components/BudgetRing'
import { CategoryChart } from './components/CategoryChart'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseList } from './components/ExpenseList'
import { useExpenses } from './hooks/useExpenses'
import { exportCsv } from './lib/csv'
import { formatCurrency } from './lib/format'
import { CATEGORIES } from './types'
import type { Filter } from './types'

export default function App() {
  const {
    expenses,
    budget,
    setBudget,
    add,
    remove,
    total,
    byCategory,
    remaining,
    ratio,
  } = useExpenses()
  const [filter, setFilter] = useState<Filter>('all')

  const visible = useMemo(
    () =>
      filter === 'all'
        ? expenses
        : expenses.filter((expense) => expense.category === filter),
    [expenses, filter],
  )

  const chartData = CATEGORIES.map((category) => ({
    label: category.label,
    color: category.color,
    value: byCategory.get(category.id) ?? 0,
  })).filter((item) => item.value > 0)

  return (
    <div className="min-h-screen">
      <header className="border-b border-ink-900/10 dark:border-paper-100/10">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-4">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-500 text-white">
            <Wallet className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold leading-tight">BudgetWise</p>
            <p className="text-xs text-ink-500 dark:text-paper-100/50">
              Suivi de dépenses personnelles
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-5 py-8">
        <section className="grid gap-6 rounded-3xl border border-ink-900/10 bg-white p-6 lg:grid-cols-[1.1fr_1fr] dark:border-paper-100/10 dark:bg-night-800">
          <BudgetRing ratio={ratio} total={total} remaining={remaining} />

          <div>
            <label className="mb-1.5 block text-sm font-medium" htmlFor="budget">
              Budget mensuel
            </label>
            <div className="flex items-center gap-2">
              <input
                id="budget"
                type="number"
                min={0}
                step={1000}
                value={budget}
                onChange={(event) => setBudget(Math.max(0, Number(event.target.value)))}
                className="w-full rounded-xl border border-ink-900/15 bg-paper-50 px-3.5 py-2.5 font-mono outline-none transition focus:border-brand-500 dark:border-paper-100/15 dark:bg-night-900"
              />
              <span className="font-mono text-sm text-ink-500 dark:text-paper-100/50">FCFA</span>
            </div>
            <p className="mt-2 text-xs text-ink-500 dark:text-paper-100/50">
              Total actuel : {formatCurrency(total)}
            </p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <section className="rounded-3xl border border-ink-900/10 bg-white p-6 dark:border-paper-100/10 dark:bg-night-800">
            <h2 className="mb-4 text-lg">Nouvelle dépense</h2>
            <ExpenseForm onAdd={add} />
          </section>

          <section className="rounded-3xl border border-ink-900/10 bg-white p-6 dark:border-paper-100/10 dark:bg-night-800">
            <h2 className="mb-4 text-lg">Répartition</h2>
            <CategoryChart data={chartData} />
          </section>
        </div>

        <section className="rounded-3xl border border-ink-900/10 bg-white p-6 dark:border-paper-100/10 dark:bg-night-800">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg">Dépenses ({visible.length})</h2>
            <button
              type="button"
              onClick={() => exportCsv(expenses)}
              disabled={expenses.length === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-ink-900/15 px-3 py-2 text-sm transition hover:bg-paper-100 disabled:opacity-40 dark:border-paper-100/15 dark:hover:bg-night-700"
            >
              <Download className="size-4" aria-hidden="true" />
              Exporter en CSV
            </button>
          </div>

          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setFilter('all')}
              aria-pressed={filter === 'all'}
              className="shrink-0 rounded-full border border-ink-900/15 px-3.5 py-1.5 text-sm transition aria-pressed:border-brand-500 aria-pressed:bg-brand-500 aria-pressed:text-white dark:border-paper-100/15"
            >
              Toutes
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilter(category.id)}
                aria-pressed={filter === category.id}
                className="shrink-0 rounded-full border border-ink-900/15 px-3.5 py-1.5 text-sm transition aria-pressed:border-brand-500 aria-pressed:bg-brand-500 aria-pressed:text-white dark:border-paper-100/15"
              >
                {category.label}
              </button>
            ))}
          </div>

          <ExpenseList expenses={visible} onRemove={remove} />
        </section>
      </main>
    </div>
  )
}`,
        },
        {
          type: 'list',
          items: [
            '**État vide** : la liste et le graphique affichent un message utile, jamais une zone blanche.',
            '**Dépassement** : l’anneau passe en corail et le texte affiche « Dépassement de … ».',
            '**Budget à zéro** : le ratio reste à 0 et aucun calcul ne divise par zéro.',
            '**Suppression** : `window.confirm` demande confirmation avant de retirer une ligne.',
            '**Responsive** : une seule colonne en dessous de `lg`, deux au-dessus.',
          ],
        },
      ],
    },
    {
      title: 'Finitions, accessibilité et déploiement',
      intro:
        "Une dernière passe sur les détails qui distinguent un exercice d'une application finie. Puis tu construis et tu déploies.",
      blocks: [
        {
          type: 'list',
          items: [
            'Chaque champ possède un `<label>` associé : pas de `placeholder` comme seul libellé.',
            'L’erreur du formulaire utilise `role="alert"` pour être annoncée.',
            'Les boutons de filtre exposent leur état avec `aria-pressed`.',
            'Les icônes décoratives portent `aria-hidden="true"`.',
            'Les boutons icône uniquement ont un `aria-label` explicite.',
            'Les montants utilisent `tabular-nums` pour ne pas danser quand ils changent.',
            'Les contrastes texte/fond respectent au moins le niveau AA.',
          ],
        },
        {
          type: 'code',
          title: 'Vérifier et déployer',
          lang: 'bash',
          code: `npm run build
npm run preview

# Déploiement Vercel
# Framework preset : Vite
# Build command : npm run build
# Output directory : dist`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'localStorage n’est pas une sauvegarde',
          text: "Les données vivent dans un seul navigateur. Vider le cache, changer d'appareil ou passer en navigation privée les efface. Prévois l'export CSV et explique-le dans l'interface : c'est la seule vraie sauvegarde de cette version.",
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Le test manuel en cinq minutes',
          text: "Ajoute une dépense, recharge la page : elle doit rester. Filtre par catégorie : le total ne doit pas changer. Passe le budget sous le total : l'anneau devient corail. Exporte : ouvre le CSV dans un tableur et vérifie les accents.",
        },
      ],
    },
  ],
  extensions: [
    'Ajouter des dépenses récurrentes (loyer, abonnements) générées chaque mois.',
    'Séparer les dépenses par mois avec un sélecteur de période.',
    'Ajouter un graphique en courbe des dépenses quotidiennes sur 30 jours.',
    'Permettre la modification d’une dépense existante dans une modale.',
    'Ajouter des objectifs d’épargne et un historique de budget par mois.',
    'Synchroniser les données avec Supabase ou une API maison.',
    'Écrire des tests unitaires sur `useExpenses` et `exportCsv`.',
  ],
}
