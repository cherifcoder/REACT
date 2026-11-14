import type { CourseModule } from '../types'

export const module5: CourseModule = {
  slug: 'hooks',
  number: 5,
  title: 'Les Hooks en profondeur',
  tagline: 'État, effets, références, contexte et logique réutilisable.',
  description:
    "Les hooks sont le cœur de React. Tu apprends à les utiliser au bon endroit, à éviter les boucles d'effets, à mémoriser sans sur-optimiser, à partager un état avec le contexte, à structurer un état complexe avec un reducer et à écrire tes propres hooks réutilisables. Un dernier chapitre couvre les hooks React 19.",
  icon: 'workflow',
  accent: 'violet',
  level: 'Intermédiaire',
  duration: 540,
  outcomes: [
    'Appliquer les règles des hooks et comprendre leur ordre d’appel',
    'Mettre à jour des objets et tableaux sans mutation avec useState',
    'Maîtriser useEffect : dépendances, nettoyage, StrictMode, fetch annulable',
    'Utiliser useRef pour le DOM, les timers et les valeurs persistantes',
    'Savoir quand useMemo et useCallback sont réellement utiles',
    'Partager un état global simple avec useContext et un provider',
    'Structurer un état complexe avec useReducer',
    'Écrire des hooks personnalisés testables et réutilisables',
    'Découvrir useActionState, useOptimistic, useTransition et use()',
  ],
  lessons: [
    {
      id: 'regles-hooks',
      title: 'Les règles des hooks',
      duration: 25,
      summary:
        "Pourquoi les hooks ne peuvent pas être conditionnels, et comment React les suit entre les rendus.",
      blocks: [
        {
          type: 'p',
          text: "React ne sait pas quel `useState` correspond à quelle variable : il se fie à **l'ordre d'appel**. C'est pour cela que les hooks doivent être appelés au niveau racine du composant, toujours dans le même ordre, et jamais dans une condition, une boucle ou une fonction imbriquée.",
        },
        {
          type: 'code',
          title: 'Interdit et correct',
          lang: 'tsx',
          code: `// ❌ Le nombre de hooks change selon la condition
function Bad({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (isLoggedIn) {
    const [name, setName] = useState('')
  }
  const [age, setAge] = useState(0)
}

// ✅ Les hooks sont toujours appelés, la logique est à l'intérieur
function Good({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)

  if (!isLoggedIn) return <Login />
  return <p>{name} a {age} ans</p>
}`,
        },
        {
          type: 'list',
          items: [
            'Appelle les hooks uniquement dans un composant React ou un hook personnalisé.',
            'Appelle-les au niveau racine, pas dans une boucle, une condition ou un callback.',
            'Un hook personnalisé commence toujours par `use`.',
            'Le nom des hooks est une convention que React utilise pour les outils de lint.',
            'Installe `eslint-plugin-react-hooks` pour détecter les erreurs automatiquement.',
          ],
        },
        {
          type: 'code',
          title: 'Configuration ESLint minimale',
          lang: 'js',
          code: `// eslint.config.js
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
]`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Un hook dans un if, c’est un bug silencieux',
          text: "L'erreur « Rendered more hooks than during the previous render » est la conséquence directe d'un hook conditionnel. Si tu as besoin d'un état conditionnel, initialise-le avec une valeur par défaut et ignore-le dans le rendu.",
        },
      ],
    },
    {
      id: 'usestate',
      title: 'useState : état simple, objets et tableaux',
      duration: 45,
      summary:
        "Mises à jour fonctionnelles, immutabilité, initialisation paresseuse et pièges classiques.",
      blocks: [
        {
          type: 'p',
          text: "`useState` retourne une paire : la valeur actuelle et une fonction de mise à jour. React planifie un nouveau rendu après l'appel. La valeur ne change pas immédiatement dans la fonction en cours : c'est une photographie de l'état au moment du rendu.",
        },
        {
          type: 'code',
          title: 'Mise à jour fonctionnelle',
          lang: 'tsx',
          code: `const [count, setCount] = useState(0)

// ✅ Sûr même si plusieurs mises à jour sont planifiées
setCount((previous) => previous + 1)
setCount((previous) => previous + 1)

// ⚠️ Utilise la valeur du rendu courant
setCount(count + 1)
setCount(count + 1) // peut ne compter qu'une fois`,
        },
        {
          type: 'h',
          text: 'Objets et tableaux : jamais de mutation',
        },
        {
          type: 'code',
          lang: 'tsx',
          code: `const [user, setUser] = useState({ name: 'Awa', age: 24 })

// ❌ Mutation : React ne voit pas le changement
user.name = 'Moussa'
setUser(user)

// ✅ Nouvel objet
setUser((previous) => ({ ...previous, name: 'Moussa' }))

const [tasks, setTasks] = useState<Task[]>([])

// Ajouter
setTasks((previous) => [...previous, newTask])

// Supprimer
setTasks((previous) => previous.filter((task) => task.id !== id))

// Modifier un élément
setTasks((previous) =>
  previous.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task,
  ),
)

// Trier sans muter
setTasks((previous) => [...previous].sort((a, b) => a.title.localeCompare(b.title)))`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Initialisation paresseuse',
          text: "Si la valeur initiale coûte cher à calculer (lecture `localStorage`, gros tableau), passe une fonction : `useState(() => readFromStorage())`. React ne l'exécutera qu'au premier rendu, pas à chaque rendu.",
        },
        {
          type: 'table',
          headers: ['Besoin', 'Pattern'],
          rows: [
            ['Valeur simple', '`useState(0)`'],
            ['Objet', 'Spread + mise à jour fonctionnelle'],
            ['Tableau', '`[...prev, item]`, `filter`, `map`'],
            ['Valeur coûteuse', '`useState(() => calcul())`'],
            ['État lié à une prop', 'Clé (`key`) ou dérivation, pas de copie'],
            ['Beaucoup de champs liés', 'Objet ou `useReducer`'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ne stocke pas ce qui peut être calculé',
          text: "Pas besoin d'un état `total` si tu as `items` : `const total = items.reduce(...)`. Un état dérivé doit être calculé pendant le rendu, sinon il se désynchronise. Ne duplique l'état que si le calcul est réellement coûteux et mesuré.",
        },
      ],
    },
    {
      id: 'useeffect',
      title: 'useEffect : effets, dépendances et nettoyage',
      duration: 55,
      summary:
        "Synchroniser un composant avec l'extérieur sans boucle infinie, et nettoyer ce qui doit l'être.",
      blocks: [
        {
          type: 'p',
          text: "`useEffect` sert à **synchroniser** React avec un système extérieur : API, timer, événement navigateur, titre du document. Ce n'est pas un endroit pour calculer des données dérivées. Si tu peux faire sans, fais sans.",
        },
        {
          type: 'code',
          title: 'Les trois formes',
          lang: 'tsx',
          code: `// 1. À chaque rendu (rare, souvent une erreur)
useEffect(() => {
  console.log('rendu')
})

// 2. Au montage uniquement (tableau vide)
useEffect(() => {
  console.log('monté')
  return () => console.log('démonté')
}, [])

// 3. Quand une dépendance change
useEffect(() => {
  console.log('query changée :', query)
}, [query])`,
        },
        {
          type: 'h',
          text: 'Le nettoyage',
        },
        {
          type: 'p',
          text: "Une fonction retournée par l'effet est appelée avant le prochain effet et au démontage. Elle doit annuler ce que l'effet a créé : timer, abonnement, requête, écouteur. Sans elle, tu accumules les fuites.",
        },
        {
          type: 'code',
          title: 'Écouteur, timer et requête annulable',
          lang: 'tsx',
          code: `useEffect(() => {
  function onResize() {
    setWidth(window.innerWidth)
  }
  window.addEventListener('resize', onResize)
  return () => window.removeEventListener('resize', onResize)
}, [])

useEffect(() => {
  const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
  return () => window.clearInterval(id)
}, [])

useEffect(() => {
  const controller = new AbortController()

  async function load() {
    try {
      const response = await fetch('/api/posts?q=' + query, {
        signal: controller.signal,
      })
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setError(error.message)
      }
    }
  }

  load()
  return () => controller.abort()
}, [query])`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'StrictMode exécute les effets deux fois en développement',
          text: "C'est volontaire : React vérifie que ton nettoyage fonctionne. Si ton effet lance deux requêtes ou deux timers, c'est souvent que le nettoyage manque. Ne désactive pas StrictMode ; corrige l'effet.",
        },
        {
          type: 'h',
          text: 'Les trois boucles infinies classiques',
        },
        {
          type: 'list',
          items: [
            'Un effet sans tableau de dépendances qui met à jour un état → rendu infini.',
            'Un objet ou un tableau recréé à chaque rendu dans les dépendances → effet relancé en boucle. Stabilise avec `useMemo` ou sors la valeur du composant.',
            'Une fonction définie dans le composant et passée en dépendance sans `useCallback` → nouvelle fonction à chaque rendu.',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'La question à se poser',
          text: "« Est-ce que cet effet synchronise mon composant avec quelque chose d'extérieur ? » Si la réponse est non, tu n'as probablement pas besoin d'un effet. Un clic, un calcul, une dérivation n'ont pas besoin de `useEffect`.",
        },
      ],
    },
    {
      id: 'useref',
      title: 'useRef : DOM, timers et valeurs stables',
      duration: 35,
      summary:
        "Accéder à un élément, stocker une valeur sans re-rendu et référencer la valeur précédente.",
      blocks: [
        {
          type: 'p',
          text: "`useRef` retourne un objet `{ current }` qui persiste entre les rendus. Modifier `current` **ne déclenche pas de re-rendu**. On l'utilise pour le DOM, les identifiants de timer, les valeurs précédentes ou les compteurs internes.",
        },
        {
          type: 'code',
          title: 'Focus, timer et valeur précédente',
          lang: 'tsx',
          code: `// 1. Référencer un input
const inputRef = useRef<HTMLInputElement>(null)

function focusSearch() {
  inputRef.current?.focus()
}

<input ref={inputRef} type="search" />

// 2. Garder un timer sans re-rendu
const timerRef = useRef<number | null>(null)

function start() {
  if (timerRef.current !== null) return
  timerRef.current = window.setInterval(() => {
    console.log('tic')
  }, 1000)
}

function stop() {
  if (timerRef.current !== null) {
    window.clearInterval(timerRef.current)
    timerRef.current = null
  }
}

// 3. Mémoriser la valeur précédente
function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ne lis pas `.current` pendant le rendu',
          text: "La valeur de `ref.current` n'est pas suivie par React. La lire pendant le rendu peut produire une interface incohérente. Lis-la dans un effet, un gestionnaire d'événement ou après le montage.",
        },
        {
          type: 'table',
          headers: ['Usage', 'useState', 'useRef'],
          rows: [
            ['Déclenche un rendu', 'Oui', 'Non'],
            ['Valeur affichée dans le JSX', 'Oui', 'À éviter'],
            ['Timer, abonnement', 'Non conseillé', 'Idéal'],
            ['Élément DOM', 'Non', 'Idéal'],
            ['Valeur précédente', 'Possible', 'Idéal'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'useRef ne remplace pas un état',
          text: "Si la valeur doit apparaître à l'écran, c'est un état. Si elle sert uniquement à la logique interne (timer, flag, élément DOM), c'est une ref. Mélanger les deux crée des interfaces qui ne se mettent pas à jour.",
        },
      ],
    },
    {
      id: 'usememo-usecallback',
      title: 'useMemo et useCallback : sans excès',
      duration: 40,
      summary:
        "Comprendre la mémorisation, mesurer avant d'optimiser et éviter les dépendances instables.",
      blocks: [
        {
          type: 'p',
          text: "`useMemo` mémorise un **résultat de calcul**, `useCallback` mémorise une **fonction**. Les deux ne servent qu'à éviter un recalcul ou à stabiliser une référence passée à un composant mémorisé. Sur une application normale, ils sont rarement nécessaires.",
        },
        {
          type: 'code',
          title: 'Quand cela vaut la peine',
          lang: 'tsx',
          code: `// Calcul coûteux sur une grande liste
const visible = useMemo(
  () => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
  [products, query],
)

// Fonction passée à un enfant mémorisé
const handleSelect = useCallback((id: string) => {
  setSelectedId(id)
}, [])

const MemoRow = memo(function Row({
  item,
  onSelect,
}: {
  item: Item
  onSelect: (id: string) => void
}) {
  return <button onClick={() => onSelect(item.id)}>{item.name}</button>
})`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'La mémorisation a un coût',
          text: "Chaque `useMemo` et `useCallback` ajoute une comparaison de dépendances et de la mémoire. Mémoriser une addition de deux nombres ralentit le code. Mesure avec React DevTools Profiler avant d'ajouter une optimisation.",
        },
        {
          type: 'list',
          items: [
            'Ne mémorise pas les valeurs primitives ni les calculs triviaux.',
            '`useMemo` ne garantit pas la conservation : React peut le recalculer.',
            '`memo` compare les props superficiellement ; un objet recréé annule le gain.',
            'Le React Compiler (React 19) automatise une partie de ces optimisations : écris du code lisible d’abord.',
            'Une dépendance manquante est un bug ; une dépendance instable est une contre-performance.',
          ],
        },
        {
          type: 'table',
          headers: ['Situation', 'Outil'],
          rows: [
            ['Filtrer 10 000 lignes', '`useMemo`'],
            ['Passer un callback à `memo`', '`useCallback`'],
            ['Composant qui se re-rend trop', '`memo` + props stables'],
            ['Calcul d’un total simple', 'Rien'],
            ['Fonction appelée dans un effet', 'Souvent la définir dans l’effet'],
          ],
        },
      ],
    },
    {
      id: 'usecontext',
      title: 'useContext : partager sans prop drilling',
      duration: 45,
      summary:
        "Créer un contexte typé, un provider propre et un hook d'accès, puis éviter les re-rendus inutiles.",
      blocks: [
        {
          type: 'p',
          text: "Quand une valeur doit être accessible à plusieurs niveaux (thème, utilisateur connecté, panier), passer des props à chaque étage devient pénible. Le contexte permet de la rendre disponible à tout un sous-arbre. Ce n'est pas un gestionnaire d'état universel : c'est un **canal de distribution**.",
        },
        {
          type: 'code',
          title: 'Contexte de thème complet',
          lang: 'tsx',
          code: `import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider')
  }
  return context
}`,
        },
        {
          type: 'code',
          title: 'Utilisation',
          lang: 'tsx',
          code: `function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme} aria-label="Changer de thème">
      {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
    </button>
  )
}

// Dans main.tsx
<ThemeProvider>
  <App />
</ThemeProvider>`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Un contexte change → tout le sous-arbre se re-rend',
          text: "Si la valeur du contexte est un objet recréé à chaque rendu du provider, tous les consommateurs se re-rendent. Mémorise la valeur avec `useMemo` si elle est utilisée largement, ou sépare les contextes (Thème / Utilisateur / Panier).",
        },
        {
          type: 'list',
          items: [
            'Toujours fournir une valeur par défaut `null` et un hook qui vérifie sa présence.',
            'Découpe les contextes par domaine plutôt qu’un « AppContext » fourre-tout.',
            'Le provider doit être placé au-dessus de tous les consommateurs.',
            'Pour un état complexe et fréquent, préfère Zustand ou un store dédié.',
          ],
        },
      ],
    },
    {
      id: 'usereducer',
      title: 'useReducer : un état complexe, des actions claires',
      duration: 45,
      summary:
        "Remplacer cinq useState par un reducer typé : panier, formulaire, éditeur.",
      blocks: [
        {
          type: 'p',
          text: "Quand les transitions d'état sont nombreuses et liées, `useReducer` rend la logique explicite : un état, des actions nommées, une fonction pure qui calcule le prochain état. C'est le même modèle que Redux, sans la bibliothèque.",
        },
        {
          type: 'code',
          title: 'Panier avec reducer typé',
          lang: 'tsx',
          code: `type CartItem = { id: string; name: string; price: number; quantity: number }

type CartState = { items: CartItem[] }

type CartAction =
  | { type: 'add'; item: Omit<CartItem, 'quantity'> }
  | { type: 'remove'; id: string }
  | { type: 'increment'; id: string }
  | { type: 'decrement'; id: string }
  | { type: 'clear' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find((item) => item.id === action.item.id)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }
      return { items: [...state.items, { ...action.item, quantity: 1 }] }
    }
    case 'remove':
      return { items: state.items.filter((item) => item.id !== action.id) }
    case 'increment':
      return {
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      }
    case 'decrement':
      return {
        items: state.items
          .map((item) =>
            item.id === action.id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }
    case 'clear':
      return { items: [] }
  }
}

const [state, dispatch] = useReducer(cartReducer, { items: [] })

dispatch({ type: 'add', item: { id: 'p1', name: 'Sac', price: 15000 } })
dispatch({ type: 'increment', id: 'p1' })`,
        },
        {
          type: 'table',
          headers: ['Situation', 'useState', 'useReducer'],
          rows: [
            ['Un booléen, un texte', 'Idéal', 'Excessif'],
            ['Trois champs indépendants', 'Correct', 'Possible'],
            ['Panier, formulaire complexe', 'Vite limité', 'Idéal'],
            ['Transitions à tester', 'Difficile', 'Reducer pur, testable'],
            ['Logique partagée entre composants', 'Non', 'Oui, avec contexte'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Le reducer doit rester pur',
          text: "Pas de `fetch`, pas de `localStorage`, pas de `Date.now()` dans le reducer. Il reçoit un état et une action, et retourne un nouvel état. Les effets de bord restent dans le composant ou dans un effet.",
        },
        {
          type: 'callout',
          tone: 'info',
          title: '`useReducer` + contexte',
          text: "Le pattern classique : un provider contient le reducer, et expose séparément `state` et `dispatch` dans deux contextes. Les composants qui n'ont besoin que d'envoyer des actions ne se re-rendent pas quand l'état change.",
        },
      ],
    },
    {
      id: 'hooks-personnalises',
      title: 'Écrire ses propres hooks',
      duration: 45,
      summary:
        "Extraire une logique réutilisable : useLocalStorage, useDebounce, useFetch et useMediaQuery.",
      blocks: [
        {
          type: 'p',
          text: "Un hook personnalisé est une fonction qui commence par `use` et qui appelle d'autres hooks. Il ne partage pas d'état : il partage de la **logique**. Chaque appel crée un état indépendant. C'est l'outil idéal pour sortir la complexité d'un composant.",
        },
        {
          type: 'code',
          title: 'useLocalStorage',
          lang: 'tsx',
          code: `import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}`,
        },
        {
          type: 'code',
          title: 'useDebounce et useMediaQuery',
          lang: 'tsx',
          code: `export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(id)
  }, [value, delay])

  return debounced
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)

    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}`,
        },
        {
          type: 'code',
          title: 'useFetch avec états explicites',
          lang: 'tsx',
          code: `type FetchState<T> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string }

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    status: 'loading',
    data: null,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading', data: null, error: null })

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Erreur ' + response.status)
        return response.json() as Promise<T>
      })
      .then((data) => setState({ status: 'success', data, error: null }))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return
        setState({
          status: 'error',
          data: null,
          error: error instanceof Error ? error.message : 'Erreur inconnue',
        })
      })

    return () => controller.abort()
  }, [url])

  return state
}`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Un hook = une responsabilité',
          text: "`useFetch` ne doit pas aussi gérer un filtre, un formulaire et un thème. Si ton hook dépasse 60 lignes, découpe. Et nomme-le d'après ce qu'il fait : `useDebounce`, `useOnlineStatus`, `useClickOutside`.",
        },
        {
          type: 'list',
          items: [
            'Retourne un tuple `as const` pour des types précis (`[value, setValue]`).',
            'Documente les dépendances et les effets de bord.',
            'Teste les hooks avec `renderHook` de Testing Library.',
            'Ne crée pas un hook pour trois lignes utilisées une seule fois.',
          ],
        },
      ],
    },
    {
      id: 'react19-hooks',
      title: 'Les hooks React 19',
      duration: 50,
      summary:
        "useActionState, useOptimistic, useTransition, useDeferredValue et use() : les nouveaux réflexes.",
      blocks: [
        {
          type: 'p',
          text: "React 19 apporte des hooks pensés pour les formulaires et les mises à jour asynchrones. `useActionState` gère l'état d'une action de formulaire, `useOptimistic` affiche un résultat avant la réponse serveur, `useTransition` garde l'interface réactive pendant un calcul lourd. Ils ne remplacent pas les hooks classiques : ils couvrent des cas précis.",
        },
        {
          type: 'code',
          title: 'useActionState : formulaire + état + pending',
          lang: 'tsx',
          code: `import { useActionState } from 'react'

type State = { message: string; error: boolean }

async function subscribe(_previous: State, formData: FormData): Promise<State> {
  const email = String(formData.get('email') ?? '')

  if (!email.includes('@')) {
    return { message: 'Adresse invalide.', error: true }
  }

  await new Promise((resolve) => setTimeout(resolve, 700))
  return { message: 'Inscription confirmée !', error: false }
}

export function Newsletter() {
  const [state, formAction, isPending] = useActionState(subscribe, {
    message: '',
    error: false,
  })

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Envoi…' : "S'inscrire"}
      </button>
      {state.message && (
        <p role={state.error ? 'alert' : 'status'}>{state.message}</p>
      )}
    </form>
  )
}`,
        },
        {
          type: 'code',
          title: 'useOptimistic : aimer avant la réponse serveur',
          lang: 'tsx',
          code: `import { useOptimistic, useState } from 'react'

export function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current, amount: number) => current + amount,
  )

  async function like() {
    addOptimisticLike(1)
    try {
      const response = await fetch('/api/like', { method: 'POST' })
      const data = await response.json()
      setLikes(data.likes)
    } catch {
      // En cas d'échec, l'état optimiste disparaît au prochain rendu
    }
  }

  return <button onClick={like}>{optimisticLikes} ❤️</button>
}`,
        },
        {
          type: 'table',
          headers: ['Hook', 'Rôle', 'Quand l’utiliser'],
          rows: [
            ['useActionState', 'État d’une action de formulaire', 'Formulaires avec action serveur'],
            ['useOptimistic', 'Afficher un résultat provisoire', 'Likes, ajout de commentaire, todo'],
            ['useTransition', 'Marquer une mise à jour non urgente', 'Filtrage/rendu lourd'],
            ['useDeferredValue', 'Retarder une valeur dérivée', 'Recherche instantanée'],
            ['use()', 'Lire une promesse ou un contexte', 'Suspense, contexte conditionnel'],
            ['useFormStatus', 'Statut du formulaire parent', 'Bouton submit dans un enfant'],
          ],
        },
        {
          type: 'code',
          title: 'useTransition et useDeferredValue',
          lang: 'tsx',
          code: `const [isPending, startTransition] = useTransition()
const deferredQuery = useDeferredValue(query)

function onSearch(next: string) {
  setQuery(next)
  startTransition(() => {
    setResults(searchLargeIndex(next))
  })
}

<input value={query} onChange={(e) => onSearch(e.target.value)} />
{isPending && <span>Recherche…</span>}
<List items={filterBy(deferredQuery)} />`,
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Pas besoin de tout réécrire',
          text: "Ces hooks sont utiles quand tu as un serveur, des actions de formulaire ou des rendus coûteux. Une application simple avec `useState` + `fetch` reste parfaitement valide. Apprends-les quand le besoin apparaît, pas pour faire moderne.",
        },
      ],
    },
  ],
  projects: [
    {
      id: 'm5-p1',
      moduleId: 'm5',
      title: 'Préférences persistantes',
      level: 2,
      time: '40 min',
      summary:
        "Un hook useLocalStorage pour mémoriser un thème, une langue et des filtres entre les visites.",
      skills: ['useState', 'useEffect', 'localStorage', 'hook'],
      steps: [
        'Écris `useLocalStorage<T>(key, initialValue)` avec initialisation paresseuse.',
        'Synchronise la valeur dans `localStorage` via un `useEffect`.',
        'Utilise-le pour un thème clair/sombre et une langue FR/EN.',
        'Utilise-le pour mémoriser les filtres d’une liste.',
        'Ajoute un bouton « Réinitialiser les préférences ».',
      ],
      bonus: [
        'Synchronise entre onglets avec l’événement `storage`.',
        'Gère les erreurs de JSON invalide sans casser l’application.',
      ],
    },
    {
      id: 'm5-p2',
      moduleId: 'm5',
      title: 'Recherche avec debounce',
      level: 3,
      time: '45 min',
      summary:
        "Une recherche qui attend 300 ms après la dernière frappe avant de filtrer 500 éléments.",
      skills: ['useDebounce', 'useMemo', 'filtrage', 'perf'],
      steps: [
        'Crée un hook `useDebounce(value, 300)`.',
        'Génère une liste de 500 éléments et affiche-les.',
        'Filtre la liste avec la valeur debouncée, pas la valeur brute.',
        'Affiche « Recherche… » quand la valeur brute diffère de la valeur debouncée.',
        'Affiche le nombre de résultats et un état vide.',
      ],
      bonus: [
        'Ajoute un surlignage des correspondances.',
        'Ajoute un tri et une pagination côté client.',
      ],
    },
    {
      id: 'm5-p3',
      moduleId: 'm5',
      title: 'Cartes depuis une API',
      level: 3,
      time: '1 h',
      summary:
        "Charger des utilisateurs ou des articles avec useFetch, gérer loading, erreur et retry.",
      skills: ['useEffect', 'fetch', 'états', 'AbortController'],
      steps: [
        'Écris un hook `useFetch<T>(url)` avec états `loading`, `success`, `error`.',
        'Utilise `AbortController` pour annuler la requête au démontage.',
        'Affiche un squelette pendant le chargement.',
        'Affiche un message d’erreur avec un bouton « Réessayer ».',
        'Affiche les données dans une grille de cartes.',
      ],
      bonus: [
        'Ajoute un bouton pour changer d’endpoint et observe l’annulation.',
        'Ajoute un cache simple en mémoire pour éviter les requêtes répétées.',
      ],
    },
    {
      id: 'm5-p4',
      moduleId: 'm5',
      title: 'Pomodoro',
      level: 3,
      time: '1 h',
      summary:
        "Un minuteur 25/5 avec start, pause, reset et notification à la fin.",
      skills: ['useRef', 'useEffect', 'timer', 'état'],
      steps: [
        'Crée un état `secondsLeft`, `isRunning` et `mode` (travail/pause).',
        'Utilise `useEffect` avec `setInterval` et un nettoyage rigoureux.',
        'Affiche le temps au format `MM:SS`.',
        'Ajoute les boutons Démarrer, Pause, Réinitialiser.',
        'À zéro, change de mode et affiche une alerte visuelle.',
      ],
      bonus: [
        'Stocke l’identifiant du timer dans un `useRef` pour éviter les doubles intervalles.',
        'Ajoute un son ou une vibration à la fin.',
      ],
    },
    {
      id: 'm5-p5',
      moduleId: 'm5',
      title: 'Modale accessible',
      level: 4,
      time: '1 h',
      summary:
        "Une modale avec portail, focus trap, fermeture par Échap et clic extérieur.",
      skills: ['useRef', 'useEffect', 'createPortal', 'accessibilité'],
      steps: [
        'Crée un composant `Modal` rendu via `createPortal` dans `document.body`.',
        'Au montage, focus le premier élément interactif et mémorise l’élément précédemment focusé.',
        'Ferme avec Échap et au clic sur l’overlay.',
        'Empêche le scroll du body pendant l’ouverture.',
        'Restaure le focus à la fermeture.',
      ],
      bonus: [
        'Ajoute un focus trap complet avec Tab et Maj+Tab.',
        'Ajoute une animation d’entrée/sortie sans casser l’accessibilité.',
      ],
    },
    {
      id: 'm5-p6',
      moduleId: 'm5',
      title: 'Onglets avec useReducer',
      level: 4,
      time: '50 min',
      summary:
        "Un système d’onglets avec état, historique de navigation et clavier, piloté par reducer.",
      skills: ['useReducer', 'accessibilité', 'clavier'],
      steps: [
        'Définis un état `{ active: string; history: string[] }`.',
        'Crée les actions `select`, `back` et `reset`.',
        'Affiche les onglets et le contenu actif.',
        'Ajoute la navigation clavier gauche/droite avec les rôles ARIA.',
        'Ajoute un bouton « Revenir » qui utilise l’historique.',
      ],
      bonus: [
        'Synchronise l’onglet actif avec l’URL.',
        'Ajoute une animation de transition entre les panneaux.',
      ],
    },
    {
      id: 'm5-p7',
      moduleId: 'm5',
      title: 'Panier avec reducer',
      level: 4,
      time: '1 h 15',
      summary:
        "Ajout, suppression, quantités, total et remise, avec un reducer testable.",
      skills: ['useReducer', 'logique', 'types', 'panier'],
      steps: [
        'Définis `CartItem`, `CartState` et les actions `add`, `remove`, `increment`, `decrement`, `clear`.',
        'Implémente le reducer sans mutation.',
        'Affiche les articles, les quantités et le sous-total.',
        'Calcule le total avec une remise de 10 % au-delà de 50 000 FCFA.',
        'Ajoute un bouton « Vider le panier » avec confirmation.',
      ],
      bonus: [
        'Persiste le panier dans `localStorage`.',
        'Ajoute un code promo qui applique une remise supplémentaire.',
      ],
    },
    {
      id: 'm5-p8',
      moduleId: 'm5',
      title: 'Hook useMediaQuery',
      level: 4,
      time: '45 min',
      summary:
        "Adapter le rendu au responsive en JavaScript, avec un hook réutilisable et SSR-safe.",
      skills: ['hook', 'matchMedia', 'responsive', 'cleanup'],
      steps: [
        'Écris `useMediaQuery(query)` avec `window.matchMedia`.',
        'Abonne-toi à `change` et nettoie l’écouteur.',
        'Utilise-le pour afficher une sidebar ou un drawer selon `(min-width: 1024px)`.',
        'Affiche un badge « Mobile » / « Desktop » dans une démo.',
        'Prévois un fallback pour les environnements sans `window`.',
      ],
      bonus: [
        'Crée `useBreakpoint()` qui retourne `sm`, `md`, `lg` ou `xl`.',
        'Teste la préférence `(prefers-reduced-motion: reduce)` et désactive les animations.',
      ],
    },
    {
      id: 'm5-p9',
      moduleId: 'm5',
      title: 'Likes optimistes',
      level: 5,
      time: '1 h 15',
      summary:
        "Un feed avec likes instantanés, rollback en cas d’erreur et compteur global.",
      skills: ['useOptimistic', 'async', 'erreurs', 'UX'],
      steps: [
        'Affiche une liste de posts avec un compteur de likes.',
        'Au clic, incrémente immédiatement l’interface (état optimiste).',
        'Simule un appel API qui échoue une fois sur cinq.',
        'En cas d’échec, reviens au compteur précédent et affiche un toast.',
        'En cas de succès, synchronise avec la réponse serveur.',
      ],
      bonus: [
        'Désactive le bouton pendant la requête pour éviter le spam.',
        'Ajoute une animation de cœur et un compteur total.',
      ],
    },
    {
      id: 'm5-p10',
      moduleId: 'm5',
      title: 'Dashboard de données',
      level: 5,
      time: '2 h',
      summary:
        "Un tableau de bord qui charge des données, filtre, trie, pagine et calcule des statistiques.",
      skills: ['hooks', 'useMemo', 'fetch', 'filtres', 'pagination'],
      steps: [
        'Charge une liste d’utilisateurs depuis une API publique.',
        'Ajoute une recherche debouncée et un filtre par rôle.',
        'Calcule avec `useMemo` : total, actifs, moyenne d’âge.',
        'Ajoute un tri par colonne et une pagination de 10 lignes.',
        'Affiche les états loading, erreur et vide distinctement.',
      ],
      bonus: [
        'Ajoute une carte de répartition par rôle avec des barres.',
        'Extrais la logique de tableau dans un hook `useDataTable`.',
      ],
    },
  ],
}
