import type { GuidedProject } from '../types'

export const taskflow: GuidedProject = {
  slug: 'taskflow',
  title: 'TaskFlow',
  tagline: 'Un gestionnaire de tâches complet, du state au localStorage.',
  description:
    "TaskFlow est le premier projet guidé : une application de tâches avec ajout, modification, suppression, filtres, priorités et persistance. Il rassemble les modules 1 à 5 dans un projet réaliste de taille humaine. Chaque fichier est fourni et expliqué dans l'ordre où tu dois l'écrire.",
  level: 'Débutant → Intermédiaire',
  duration: '3 à 4 heures',
  stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'lucide-react'],
  features: [
    'Ajouter une tâche avec titre, priorité et échéance',
    'Cocher une tâche comme terminée',
    'Modifier le titre en double-cliquant',
    'Supprimer une tâche avec confirmation',
    'Filtrer : toutes, actives, terminées',
    'Statistiques et barre de progression',
    'Persistance automatique dans localStorage',
    'Interface responsive et accessible au clavier',
  ],
  outcomes: [
    'Structurer une petite application en composants et hooks',
    'Écrire un reducer typé pour des transitions d’état complexes',
    'Créer un hook de persistance réutilisable',
    'Gérer un formulaire contrôlé avec validation',
    'Construire une interface Tailwind cohérente et responsive',
  ],
  steps: [
    {
      title: 'Cadrer le projet et modéliser les données',
      intro:
        "Avant d'écrire du code, définis ce que l'application doit faire et la forme des données. Un bon modèle de données évite la moitié des bugs.",
      blocks: [
        {
          type: 'list',
          items: [
            '**Créer** une tâche avec un titre obligatoire, une priorité (`basse`, `normale`, `haute`) et une échéance optionnelle.',
            '**Lire** les tâches, filtrées par statut.',
            '**Modifier** le titre et le statut terminé.',
            '**Supprimer** une tâche.',
            '**Persister** les tâches dans le navigateur.',
          ],
        },
        {
          type: 'code',
          title: 'Le modèle de données (src/types.ts)',
          lang: 'ts',
          code: `export type Priority = 'low' | 'normal' | 'high'

export type Task = {
  id: string
  title: string
  done: boolean
  priority: Priority
  dueDate: string | null // format YYYY-MM-DD
  createdAt: number
}

export type Filter = 'all' | 'active' | 'done'

export type TaskAction =
  | { type: 'add'; title: string; priority: Priority; dueDate: string | null }
  | { type: 'toggle'; id: string }
  | { type: 'rename'; id: string; title: string }
  | { type: 'remove'; id: string }
  | { type: 'clearDone' }
  | { type: 'hydrate'; tasks: Task[] }`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Pourquoi un id généré côté client ?',
          text: "`crypto.randomUUID()` est disponible dans tous les navigateurs modernes. Il produit un identifiant unique et stable, parfait pour les clés React. Évite `Date.now()` seul : deux tâches ajoutées la même milliseconde auraient le même id.",
        },
      ],
    },
    {
      title: 'Créer le projet et le hook de persistance',
      intro:
        "On initialise Vite, Tailwind et la structure. On isole la lecture/écriture dans localStorage dans un hook dédié.",
      blocks: [
        {
          type: 'code',
          title: 'Commandes',
          lang: 'bash',
          code: `npm create vite@latest taskflow -- --template react-ts
cd taskflow
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

@theme {
  --color-brand-50: #eef2ff;
  --color-brand-500: #3d5bf5;
  --color-brand-600: #2b45d6;
  --color-paper-50: #fbfaf6;
  --color-paper-100: #f4f1e8;
  --color-ink-900: #10111a;
  --color-ink-600: #4a5068;
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

body {
  @apply bg-paper-50 text-ink-900 font-sans antialiased;
}`,
        },
        {
          type: 'code',
          title: 'src/hooks/useLocalStorage.ts',
          lang: 'ts',
          code: `import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // quota dépassé ou navigation privée : on ignore silencieusement
    }
  }, [key, value])

  return [value, setValue] as const
}`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Le JSON invalide ne doit pas casser l’app',
          text: "Si `localStorage` contient autre chose que du JSON valide (ancienne version, manipulation manuelle), `JSON.parse` lève une erreur. Le `try/catch` renvoie la valeur initiale : l'application démarre quand même. C'est une différence importante entre un prototype et un produit.",
        },
      ],
    },
    {
      title: 'Écrire le reducer et le hook useTasks',
      intro:
        "Toutes les transitions passent par une fonction pure. Le composant ne manipule jamais le tableau directement.",
      blocks: [
        {
          type: 'code',
          title: 'src/features/tasks/tasksReducer.ts',
          lang: 'ts',
          code: `import type { Task, TaskAction } from '../../types'

export function tasksReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'hydrate':
      return action.tasks

    case 'add': {
      const title = action.title.trim()
      if (!title) return state

      const task: Task = {
        id: crypto.randomUUID(),
        title,
        done: false,
        priority: action.priority,
        dueDate: action.dueDate,
        createdAt: Date.now(),
      }

      return [task, ...state]
    }

    case 'toggle':
      return state.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task,
      )

    case 'rename': {
      const title = action.title.trim()
      if (!title) return state

      return state.map((task) =>
        task.id === action.id ? { ...task, title } : task,
      )
    }

    case 'remove':
      return state.filter((task) => task.id !== action.id)

    case 'clearDone':
      return state.filter((task) => !task.done)

    default:
      return state
  }
}`,
        },
        {
          type: 'code',
          title: 'src/features/tasks/useTasks.ts',
          lang: 'ts',
          code: `import { useEffect, useReducer } from 'react'
import type { Task } from '../../types'
import { tasksReducer } from './tasksReducer'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export function useTasks() {
  const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>('taskflow.tasks', [])
  const [tasks, dispatch] = useReducer(tasksReducer, storedTasks)

  // Une seule source de vérité : le reducer. On le synchronise au stockage.
  useEffect(() => {
    setStoredTasks(tasks)
  }, [tasks, setStoredTasks])

  return { tasks, dispatch }
}`,
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Pourquoi ne pas mettre localStorage dans le reducer ?',
          text: "Un reducer doit rester pur : même entrée, même sortie, aucun effet de bord. Écrire dans `localStorage` dans le reducer rend les tests imprévisibles et casse le mode strict. La synchronisation se fait dans un effet, après le calcul de l'état.",
        },
      ],
    },
    {
      title: 'Le formulaire d’ajout',
      intro:
        "Un formulaire contrôlé, validé, accessible, avec un choix de priorité et une échéance.",
      blocks: [
        {
          type: 'code',
          title: 'src/features/tasks/TaskForm.tsx',
          lang: 'tsx',
          code: `import { useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import type { Priority } from '../../types'

type TaskFormProps = {
  onAdd: (title: string, priority: Priority, dueDate: string | null) => void
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('normal')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (title.trim().length < 3) {
      setError('Le titre doit contenir au moins 3 caractères.')
      return
    }

    onAdd(title.trim(), priority, dueDate || null)
    setTitle('')
    setPriority('normal')
    setDueDate('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-900/10 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="task-title" className="sr-only">Titre de la tâche</label>
          <input
            id="task-title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              if (error) setError('')
            }}
            placeholder="Ex. Préparer la présentation client"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'task-error' : undefined}
            className="w-full rounded-xl border border-ink-900/15 px-4 py-3 text-sm
                       focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
          />
        </div>

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value as Priority)}
          aria-label="Priorité"
          className="rounded-xl border border-ink-900/15 px-3 py-3 text-sm"
        >
          <option value="low">Basse</option>
          <option value="normal">Normale</option>
          <option value="high">Haute</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          aria-label="Échéance"
          className="rounded-xl border border-ink-900/15 px-3 py-3 text-sm"
        />

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3
                     text-sm font-medium text-white transition hover:bg-brand-700"
        >
          <Plus className="size-4" aria-hidden="true" />
          Ajouter
        </button>
      </div>

      {error && (
        <p id="task-error" role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </form>
  )
}`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Le `sr-only` plutôt qu’un placeholder',
          text: "Le placeholder disparaît dès la saisie et n'est pas un label fiable. Un `label` caché avec `sr-only` donne un nom accessible au champ sans alourdir le design. C'est le pattern utilisé par les design systems sérieux.",
        },
      ],
    },
    {
      title: 'Afficher, filtrer et modifier les tâches',
      intro:
        "On crée TaskItem, TaskFilters et l'écran principal. Chaque composant a une seule responsabilité.",
      blocks: [
        {
          type: 'code',
          title: 'src/features/tasks/TaskItem.tsx',
          lang: 'tsx',
          code: `import { useState } from 'react'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import type { Task } from '../../types'

type TaskItemProps = {
  task: Task
  onToggle: (id: string) => void
  onRename: (id: string, title: string) => void
  onRemove: (id: string) => void
}

const priorityStyles = {
  low: 'bg-sky-100 text-sky-700',
  normal: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
} as const

const priorityLabels = { low: 'Basse', normal: 'Normale', high: 'Haute' } as const

export function TaskItem({ task, onToggle, onRename, onRemove }: TaskItemProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)
  const [confirming, setConfirming] = useState(false)

  function save() {
    if (draft.trim().length >= 3) onRename(task.id, draft)
    else setDraft(task.title)
    setEditing(false)
  }

  return (
    <li className="flex items-center gap-3 rounded-xl border border-ink-900/10 bg-white p-4">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={task.done ? 'Marquer comme à faire' : 'Marquer comme terminée'}
        className={
          'grid size-6 shrink-0 place-items-center rounded-full border transition ' +
          (task.done
            ? 'border-brand-600 bg-brand-600 text-white'
            : 'border-ink-900/25 text-transparent hover:border-brand-500')
        }
      >
        <Check className="size-4" aria-hidden="true" />
      </button>

      <div className="min-w-0 flex-1">
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={save}
            onKeyDown={(event) => {
              if (event.key === 'Enter') save()
              if (event.key === 'Escape') {
                setDraft(task.title)
                setEditing(false)
              }
            }}
            className="w-full rounded-lg border border-brand-500 px-2 py-1 text-sm"
          />
        ) : (
          <button
            type="button"
            onDoubleClick={() => setEditing(true)}
            className={
              'block w-full truncate text-left text-sm ' +
              (task.done ? 'text-ink-500 line-through' : 'text-ink-900')
            }
            title="Double-cliquer pour renommer"
          >
            {task.title}
          </button>
        )}

        <div className="mt-1 flex flex-wrap items-center gap-2 text-[0.7rem]">
          <span className={'rounded-full px-2 py-0.5 font-medium ' + priorityStyles[task.priority]}>
            {priorityLabels[task.priority]}
          </span>
          {task.dueDate && (
            <span className="text-ink-500">
              Échéance : {new Date(task.dueDate).toLocaleDateString('fr-FR')}
            </span>
          )}
        </div>
      </div>

      {confirming ? (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onRemove(task.id)}
            className="rounded-lg bg-red-600 px-2 py-1 text-xs text-white"
          >
            Confirmer
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            aria-label="Annuler la suppression"
            className="rounded-lg p-1.5 text-ink-500 hover:bg-ink-900/5"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label={'Renommer ' + task.title}
            className="rounded-lg p-1.5 text-ink-500 hover:bg-ink-900/5"
          >
            <Pencil className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setConfirming(true)}
            aria-label={'Supprimer ' + task.title}
            className="rounded-lg p-1.5 text-ink-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      )}
    </li>
  )
}`,
        },
        {
          type: 'code',
          title: 'src/features/tasks/TaskFilters.tsx',
          lang: 'tsx',
          code: `import type { Filter } from '../../types'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'active', label: 'À faire' },
  { value: 'done', label: 'Terminées' },
]

type TaskFiltersProps = {
  filter: Filter
  counts: Record<Filter, number>
  onChange: (filter: Filter) => void
}

export function TaskFilters({ filter, counts, onChange }: TaskFiltersProps) {
  return (
    <div role="tablist" aria-label="Filtrer les tâches" className="flex gap-1 rounded-xl bg-ink-900/5 p-1">
      {filters.map((entry) => (
        <button
          key={entry.value}
          type="button"
          role="tab"
          aria-selected={filter === entry.value}
          onClick={() => onChange(entry.value)}
          className={
            'flex-1 rounded-lg px-3 py-2 text-xs font-medium transition ' +
            (filter === entry.value
              ? 'bg-white text-ink-900 shadow-sm'
              : 'text-ink-600 hover:text-ink-900')
          }
        >
          {entry.label}
          <span className="ml-1.5 text-ink-400">{counts[entry.value]}</span>
        </button>
      ))}
    </div>
  )
}`,
        },
        {
          type: 'code',
          title: 'src/App.tsx',
          lang: 'tsx',
          code: `import { useMemo, useState } from 'react'
import { ClipboardList, Sparkles } from 'lucide-react'
import type { Filter } from './types'
import { useTasks } from './features/tasks/useTasks'
import { TaskForm } from './features/tasks/TaskForm'
import { TaskFilters } from './features/tasks/TaskFilters'
import { TaskItem } from './features/tasks/TaskItem'

export default function App() {
  const { tasks, dispatch } = useTasks()
  const [filter, setFilter] = useState<Filter>('all')

  const visibleTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((task) => !task.done)
    if (filter === 'done') return tasks.filter((task) => task.done)
    return tasks
  }, [tasks, filter])

  const counts = {
    all: tasks.length,
    active: tasks.filter((task) => !task.done).length,
    done: tasks.filter((task) => task.done).length,
  }

  const progress = tasks.length === 0 ? 0 : Math.round((counts.done / tasks.length) * 100)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="font-mono text-xs tracking-widest text-brand-600 uppercase">Projet guidé 01</p>
        <h1 className="mt-2 flex items-center gap-3 text-4xl font-semibold tracking-tight">
          <span className="grid size-11 place-items-center rounded-2xl bg-brand-600 text-white">
            <ClipboardList className="size-6" aria-hidden="true" />
          </span>
          TaskFlow
        </h1>
        <p className="mt-3 max-w-xl text-ink-600">
          Ajoute, organise et termine tes tâches. Tout est sauvegardé dans ce navigateur.
        </p>
      </header>

      <TaskForm
        onAdd={(title, priority, dueDate) =>
          dispatch({ type: 'add', title, priority, dueDate })
        }
      />

      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-ink-600">
              {counts.done} sur {tasks.length} terminées
            </p>
            <div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-ink-900/10">
              <div
                className="h-full rounded-full bg-brand-600 transition-all"
                style={{ width: progress + '%' }}
              />
            </div>
          </div>
          {counts.done > 0 && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'clearDone' })}
              className="text-xs text-ink-500 underline underline-offset-4 hover:text-red-600"
            >
              Effacer les terminées
            </button>
          )}
        </div>

        <TaskFilters filter={filter} counts={counts} onChange={setFilter} />

        <div className="mt-4">
          {visibleTasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-900/15 p-10 text-center">
              <Sparkles className="mx-auto size-6 text-brand-500" aria-hidden="true" />
              <p className="mt-3 text-sm font-medium">Aucune tâche ici.</p>
              <p className="mt-1 text-xs text-ink-500">
                {filter === 'all'
                  ? 'Ajoute ta première tâche avec le formulaire.'
                  : 'Change de filtre ou ajoute une nouvelle tâche.'}
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {visibleTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={(id) => dispatch({ type: 'toggle', id })}
                  onRename={(id, title) => dispatch({ type: 'rename', id, title })}
                  onRemove={(id) => dispatch({ type: 'remove', id })}
                />
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}`,
        },
      ],
    },
    {
      title: 'Finitions, tests manuels et déploiement',
      intro:
        "Une application fonctionnelle n'est pas encore une application finie. On vérifie les parcours, l'accessibilité et la persistance, puis on déploie.",
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Teste les cinq parcours',
              text: "Ajouter une tâche avec chaque priorité, cocher, renommer, supprimer, filtrer. Recharge la page et vérifie que tout est conservé. Ouvre deux onglets et observe : les données ne se synchronisent pas encore, c'est normal.",
            },
            {
              title: 'Navigue uniquement au clavier',
              text: "Tab pour atteindre le formulaire, Entrée pour ajouter, Tab jusqu'aux actions, Entrée pour cocher. Double-cliquer pour renommer n'est pas accessible au clavier : ajoute un bouton crayon, déjà présent.",
            },
            {
              title: 'Vérifie les états vides',
              text: "Supprime toutes les tâches, filtre sur « Terminées », recharge avec un localStorage vide. Aucun écran ne doit être blanc sans explication.",
            },
            {
              title: 'Teste le build',
              text: "`npm run build` puis `npm run preview`. Corrige les erreurs TypeScript avant de déployer. Sur Vercel, importe le dépôt et laisse les réglages par défaut (Vite est détecté).",
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Un bug connu : la synchronisation entre onglets',
          text: "Deux onglets ouverts écrivent chacun leur version de `localStorage` et se écrasent mutuellement. Pour corriger, écoute l'événement `storage` et hydrate le reducer quand un autre onglet modifie les tâches. C'est un excellent exercice bonus.",
        },
        {
          type: 'code',
          title: 'Bonus : synchronisation entre onglets',
          lang: 'ts',
          code: `useEffect(() => {
  function onStorage(event: StorageEvent) {
    if (event.key === 'taskflow.tasks' && event.newValue) {
      dispatch({ type: 'hydrate', tasks: JSON.parse(event.newValue) as Task[] })
    }
  }

  window.addEventListener('storage', onStorage)
  return () => window.removeEventListener('storage', onStorage)
}, [])`,
        },
      ],
    },
  ],
  extensions: [
    'Ajouter des sous-tâches et un pourcentage d’avancement.',
    'Ajouter un mode sombre complet avec persistance.',
    'Ajouter la recherche plein texte et un tri par échéance.',
    'Ajouter un glisser-déposer pour réordonner les tâches.',
    'Écrire des tests Vitest sur le reducer et le formulaire.',
    'Ajouter une synchronisation serveur avec TanStack Query.',
  ],
}
