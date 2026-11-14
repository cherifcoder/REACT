import type { CourseModule } from '../types'

export const module1: CourseModule = {
  slug: 'demarrer-avec-react',
  number: 1,
  title: 'Démarrer avec React',
  tagline: "Installation, JSX, composants, props et premiers écrans.",
  description:
    "Tu poses les fondations : comprendre React, installer un environnement propre avec Node et Vite, lire la structure d'un projet, écrire du JSX, découper une interface en composants et afficher des données dynamiques. À la fin, tu construis une première page complète sans copier-coller aveuglément.",
  icon: 'rocket',
  accent: 'brand',
  level: 'Débutant',
  duration: 420,
  outcomes: [
    'Installer Node.js, npm, VS Code et créer un projet React + TypeScript avec Vite',
    'Expliquer le rôle de index.html, main.tsx, App.tsx et du StrictMode',
    'Écrire du JSX propre : expressions, attributs, fragments, styles',
    'Créer des composants réutilisables typés avec des props et des children',
    'Afficher des listes, filtrer des données et gérer les clés correctement',
    'Brancher des événements et comprendre la différence entre passer et appeler une fonction',
  ],
  lessons: [
    {
      id: 'pourquoi-react',
      title: 'Pourquoi React, et comment il fonctionne',
      duration: 25,
      summary:
        "Comprendre le modèle mental de React avant d'écrire une ligne de code : composants, état, rendu déclaratif.",
      blocks: [
        {
          type: 'p',
          text: "React est une **bibliothèque JavaScript pour construire des interfaces**. Tu décris à quoi l'écran doit ressembler pour un état donné, et React se charge de mettre à jour le DOM le plus efficacement possible. Ce changement de posture — décrire le résultat plutôt que manipuler le DOM étape par étape — est la clé de tout le reste.",
        },
        {
          type: 'h',
          text: 'Déclaratif plutôt qu’impératif',
        },
        {
          type: 'p',
          text: "En JavaScript vanilla, tu dois trouver l'élément, écouter l'événement, modifier son texte, penser aux cas d'erreur. En React, tu stockes une valeur et tu l'affiches. Quand la valeur change, React re-rend le composant et met à jour le DOM. Tu ne touches presque jamais au DOM directement.",
        },
        {
          type: 'code',
          title: 'Le même compteur, deux approches',
          lang: 'tsx',
          code: `// Vanilla : on manipule le DOM à la main
const button = document.querySelector('#btn')
let count = 0
button.addEventListener('click', () => {
  count += 1
  button.textContent = 'Cliqué ' + count + ' fois'
})

// React : on décrit l'interface en fonction de l'état
function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Cliqué {count} fois
    </button>
  )
}`,
        },
        {
          type: 'table',
          headers: ['Approche', 'Ce que tu écris', 'Qui met à jour le DOM ?'],
          rows: [
            ['JavaScript vanilla', 'Les étapes de manipulation', 'Toi, manuellement'],
            ['React', 'Le résultat attendu pour un état', 'React'],
            ['Angular / Vue', 'Des templates + état', 'Le framework'],
          ],
        },
        {
          type: 'h',
          text: 'Les trois idées à retenir',
        },
        {
          type: 'list',
          items: [
            '**Composant** : une fonction qui retourne du JSX. C’est une brique d’interface réutilisable, comme une fonction réutilisable en JS.',
            '**État (state)** : une donnée que le composant mémorise entre deux rendus. Quand elle change, le composant se re-rend.',
            '**Props** : des données reçues du parent, en lecture seule. Elles permettent de configurer un composant.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'React n’est pas un framework complet',
          text: "React ne gère ni le routage, ni les appels API, ni les formulaires avancés. On lui ajoute des bibliothèques : React Router, TanStack Query, React Hook Form… C'est une force : tu choisis ton stack, mais tu dois apprendre à assembler les pièces.",
        },
        {
          type: 'quote',
          text: "L'interface est une fonction de l'état. Si l'état est correct, l'interface l'est aussi.",
          author: 'Le modèle mental de React',
        },
      ],
    },
    {
      id: 'installation',
      title: 'Installer Node.js, npm et VS Code',
      duration: 35,
      summary:
        "Préparer une machine Windows, macOS ou Linux avec les bons outils, puis vérifier que tout fonctionne.",
      blocks: [
        {
          type: 'p',
          text: "React s'exécute dans le navigateur, mais ton code a besoin d'outils pour être compilé et servi pendant le développement. Deux outils suffisent : **Node.js** (qui inclut npm) et un éditeur de code. On ajoute deux extensions VS Code pour le confort.",
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Installe Node.js LTS',
              text: "Va sur nodejs.org et télécharge la version **LTS** (20 ou 22+). Évite la version « Current » si tu débutes : la LTS est plus stable. Sur Windows, garde l'option « Add to PATH » cochée.",
            },
            {
              title: 'Vérifie dans un terminal',
              text: "Ouvre PowerShell (Windows) ou Terminal (macOS/Linux). Tape les deux commandes ci-dessous. Tu dois voir un numéro de version, pas « command not found ».",
            },
            {
              title: 'Installe VS Code',
              text: "Télécharge Visual Studio Code sur code.visualstudio.com. Ajoute les extensions **ES7+ React/Redux/React-Native snippets** et **Prettier - Code formatter**. TypeScript est déjà intégré.",
            },
            {
              title: 'Configure Prettier',
              text: "Dans VS Code : Ctrl+Shift+P → « Format Document With… » → Prettier. Active « Format On Save » dans les réglages. Tu auras un code homogène sans y penser.",
            },
          ],
        },
        {
          type: 'code',
          title: 'Vérifier les versions',
          lang: 'bash',
          code: `node --version    # v22.x.x (ou plus récent)
npm --version     # 10.x.x (ou plus récent)

# Si une commande échoue, ferme et rouvre le terminal
# avant de réinstaller quoi que ce soit.`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Windows : PowerShell et politiques d’exécution',
          text: "Si npm refuse de se lancer avec une erreur « scripts execution is disabled », ouvre PowerShell en administrateur et exécute : Set-ExecutionPolicy -Scope CurrentUser RemoteSigned. Relance ensuite ton terminal.",
        },
        {
          type: 'table',
          headers: ['Outil', 'Rôle', 'Commande de vérification'],
          rows: [
            ['Node.js', 'Exécute JavaScript hors navigateur, nécessaire à Vite', 'node -v'],
            ['npm', 'Gestionnaire de paquets livré avec Node', 'npm -v'],
            ['VS Code', 'Éditeur + TypeScript + terminal intégré', 'code -v'],
            ['Git (optionnel)', 'Versions et déploiement', 'git --version'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Le terminal intégré de VS Code',
          text: "Ouvre-le avec Ctrl+` (Windows/Linux) ou Cmd+` (macOS). C’est là que tu lanceras npm install et npm run dev. Un seul terminal suffit pour commencer.",
        },
      ],
    },
    {
      id: 'creer-projet-vite',
      title: 'Créer un projet React avec Vite',
      duration: 40,
      summary:
        "Générer un projet propre en TypeScript, lancer le serveur de développement et lire la structure des dossiers.",
      blocks: [
        {
          type: 'p',
          text: "Vite est l'outil de build recommandé aujourd'hui pour un nouveau projet React. Il démarre en une fraction de seconde, recharge le navigateur à chaud et produit un build optimisé. La commande officielle crée toute la structure dont tu as besoin.",
        },
        {
          type: 'code',
          title: 'Créer et lancer le projet',
          lang: 'bash',
          code: `# 1. Créer le projet (le double tiret est important)
npm create vite@latest mon-app -- --template react-ts

# 2. Entrer dans le dossier
cd mon-app

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev`,
        },
        {
          type: 'p',
          text: "Le terminal affiche une adresse locale, généralement **http://localhost:5173**. Ouvre-la dans ton navigateur. Tu vois la page d'accueil Vite + React. Garde le terminal ouvert : tant que le serveur tourne, chaque sauvegarde de fichier met l'interface à jour automatiquement (HMR).",
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'npm create, npx, npm init : quelle différence ?',
          text: "`npm create vite@latest` télécharge et exécute le générateur Vite sans l'installer globalement. `npx` fait la même chose pour un binaire. `npm init` initialise un package.json. Pour créer un projet Vite, utilise la commande `npm create vite@latest` : c'est la plus fiable.",
        },
        {
          type: 'code',
          title: 'Structure générée (les fichiers qui comptent)',
          lang: 'text',
          code: `mon-app/
├── public/               # fichiers servis tels quels (favicon, images)
├── src/
│   ├── assets/           # images importées par le code
│   ├── App.tsx           # composant racine de l'application
│   ├── App.css           # styles de démo (à supprimer)
│   ├── index.css         # styles globaux
│   ├── main.tsx          # point d'entrée : monte React dans le DOM
│   └── vite-env.d.ts     # types de Vite
├── index.html            # page HTML unique (SPA)
├── package.json          # dépendances et scripts
├── tsconfig.json         # configuration TypeScript
└── vite.config.ts        # configuration Vite`,
        },
        {
          type: 'table',
          headers: ['Script npm', 'Commande', 'Quand l’utiliser'],
          rows: [
            ['dev', 'npm run dev', 'Pendant le développement, avec rechargement à chaud'],
            ['build', 'npm run build', 'Avant de déployer : compile TypeScript et optimise'],
            ['preview', 'npm run preview', 'Tester localement le build de production'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Nettoie le projet de démo',
          text: "Supprime `src/App.css`, vide `src/index.css`, et remplace le contenu de `App.tsx` par un composant minimal. Tu repars d'une base propre au lieu de traîner le code de démonstration.",
        },
      ],
    },
    {
      id: 'anatomie-projet',
      title: 'Anatomie d’une application React',
      duration: 30,
      summary:
        "Comprendre comment index.html, main.tsx et App.tsx s'assemblent, et ce que fait réellement le StrictMode.",
      blocks: [
        {
          type: 'p',
          text: "Une application Vite + React n'a qu'une seule page HTML. React prend le contrôle d'une `div` vide et y injecte toute l'interface. C'est ce qu'on appelle une **SPA** (Single Page Application) : la navigation change l'URL et le contenu sans recharger la page.",
        },
        {
          type: 'code',
          title: 'index.html — le seul fichier HTML',
          lang: 'html',
          code: `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mon application React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
        },
        {
          type: 'code',
          title: 'src/main.tsx — le point d’entrée',
          lang: 'tsx',
          code: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error("L'élément #root est introuvable dans index.html")
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`,
        },
        {
          type: 'code',
          title: 'src/App.tsx — ton premier composant',
          lang: 'tsx',
          code: `export default function App() {
  return (
    <main className="page">
      <h1>Bonjour React</h1>
      <p>Mon premier écran est en ligne.</p>
    </main>
  )
}`,
        },
        {
          type: 'h',
          text: 'À quoi sert le StrictMode ?',
        },
        {
          type: 'p',
          text: "En développement, `StrictMode` active des vérifications supplémentaires. Il exécute notamment certains effets deux fois pour t'aider à repérer les effets de bord mal nettoyés. Ce double appel n'a pas lieu en production. Ne le supprime pas pour « corriger » un bug : c'est souvent lui qui révèle le vrai problème.",
        },
        {
          type: 'callout',
          tone: 'danger',
          title: 'Ne monte jamais deux fois React',
          text: "Si tu vois deux interfaces ou des erreurs bizarres, vérifie que `createRoot(...).render(...)` n'est appelé qu'une seule fois dans `main.tsx`. C'est une erreur fréquente quand on copie du code sans lire.",
        },
        {
          type: 'table',
          headers: ['Fichier', 'Rôle', 'À modifier souvent ?'],
          rows: [
            ['index.html', 'Titre, métadonnées, polices, favicon', 'Oui, pour le SEO'],
            ['main.tsx', 'Monte React et branche le routeur', 'Rarement'],
            ['App.tsx', 'Composant racine, layout et routes', 'Oui'],
            ['index.css', 'Styles globaux et design tokens', 'Oui'],
          ],
        },
      ],
    },
    {
      id: 'jsx',
      title: 'JSX : écrire du HTML dans JavaScript',
      duration: 35,
      summary:
        "Maîtriser les expressions, les attributs, les fragments et les règles qui évitent 90 % des erreurs de débutant.",
      blocks: [
        {
          type: 'p',
          text: "JSX ressemble à du HTML, mais c'est une syntaxe transformée en appels JavaScript. Deux conséquences : tu peux insérer n'importe quelle expression JavaScript avec `{}`, et certaines habitudes HTML doivent changer (`class` devient `className`, `for` devient `htmlFor`).",
        },
        {
          type: 'code',
          title: 'Expressions et attributs',
          lang: 'tsx',
          code: `const user = { name: 'Awa', age: 24 }
const isOnline = true

export function Profile() {
  return (
    <section className="card">
      <h2>{user.name}</h2>
      <p>Âge : {user.age} ans</p>
      <p>Statut : {isOnline ? 'En ligne' : 'Hors ligne'}</p>
      <img
        src="/avatar.jpg"
        alt={'Photo de ' + user.name}
        className="avatar"
      />
      <button disabled={!isOnline}>Envoyer un message</button>
    </section>
  )
}`,
        },
        {
          type: 'h',
          text: 'Les règles à connaître',
        },
        {
          type: 'list',
          items: [
            'Un composant doit retourner **un seul élément racine**. Pour plusieurs éléments sans wrapper inutile, utilise un fragment : `<>...</>`.',
            'Les accolades `{}` acceptent une **expression** (valeur, calcul, ternaire, map), pas une instruction comme `if` ou `for`.',
            'Les attributs sont en camelCase : `className`, `htmlFor`, `onClick`, `tabIndex`.',
            'Les balises sans contenu doivent être auto-fermées : `<img />`, `<input />`, `<br />`.',
            'Le style inline est un **objet** : `style={{ backgroundColor: "red" }}` (deux paires d’accolades).',
            'Les commentaires JSX s’écrivent `{/* ... */}` et non `<!-- -->`.',
          ],
        },
        {
          type: 'table',
          headers: ['HTML', 'JSX', 'Pourquoi'],
          rows: [
            ['class="card"', 'className="card"', 'class est un mot réservé JavaScript'],
            ['for="email"', 'htmlFor="email"', 'for est un mot réservé'],
            ['onclick="fn()"', 'onClick={fn}', 'On passe une fonction, pas une chaîne'],
            ['style="color: red"', 'style={{ color: "red" }}', 'Objet JavaScript'],
            ['<!-- note -->', '{/* note */}', 'Commentaire dans une expression'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'L’erreur « Adjacent JSX elements must be wrapped »',
          text: "Tu retournes deux balises voisines. Enveloppe-les dans un fragment `<>...</>` ou dans une `div` si tu as réellement besoin d'un conteneur. Le fragment ne crée aucun élément dans le DOM.",
        },
        {
          type: 'code',
          title: 'Fragment et rendu conditionnel',
          lang: 'tsx',
          code: `function Header() {
  const isLoggedIn = false

  return (
    <>
      <header>Mon site</header>
      <nav>
        {isLoggedIn ? <button>Déconnexion</button> : <button>Connexion</button>}
      </nav>
    </>
  )
}`,
        },
      ],
    },
    {
      id: 'composants-props',
      title: 'Composants, props et composition',
      duration: 45,
      summary:
        "Découper une interface en briques réutilisables, typer les props et utiliser children pour composer.",
      blocks: [
        {
          type: 'p',
          text: "Un composant est une fonction dont le nom commence par une majuscule et qui retourne du JSX. Il reçoit un objet de **props** en paramètre. Typer les props avec TypeScript documente le composant et fait apparaître les erreurs avant l'exécution.",
        },
        {
          type: 'code',
          title: 'Un composant typé avec des props',
          lang: 'tsx',
          code: `type ProfileCardProps = {
  name: string
  role: string
  avatar: string
  skills?: string[] // optionnel
  onContact: (name: string) => void
}

export function ProfileCard({
  name,
  role,
  avatar,
  skills = [],
  onContact,
}: ProfileCardProps) {
  return (
    <article className="rounded-2xl border p-5">
      <img src={avatar} alt={'Portrait de ' + name} className="size-16 rounded-full" />
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>

      {skills.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li key={skill} className="rounded-full bg-gray-100 px-2 py-1 text-xs">
              {skill}
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => onContact(name)} className="mt-4">
        Contacter {name}
      </button>
    </article>
  )
}`,
        },
        {
          type: 'code',
          title: 'Utiliser le composant depuis le parent',
          lang: 'tsx',
          code: `import { ProfileCard } from './components/ProfileCard'

export default function App() {
  return (
    <main className="grid gap-6 p-8 md:grid-cols-3">
      <ProfileCard
        name="Awa Diallo"
        role="Développeuse front-end"
        avatar="/awa.jpg"
        skills={['React', 'TypeScript', 'Tailwind']}
        onContact={(name) => alert('Message pour ' + name)}
      />
      <ProfileCard
        name="Moussa Traoré"
        role="Data analyst"
        avatar="/moussa.jpg"
        onContact={(name) => alert('Message pour ' + name)}
      />
    </main>
  )
}`,
        },
        {
          type: 'h',
          text: 'Children : composer autour d’un contenu',
        },
        {
          type: 'code',
          title: 'Un composant Card qui accepte n’importe quel contenu',
          lang: 'tsx',
          code: `import type { ReactNode } from 'react'

type CardProps = {
  title: string
  children: ReactNode
}

export function Card({ title, children }: CardProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

// Usage
<Card title="Chiffre d'affaires">
  <p className="text-3xl font-bold">4 250 000 FCFA</p>
  <p className="text-sm text-gray-500">+12 % ce mois-ci</p>
</Card>`,
        },
        {
          type: 'callout',
          tone: 'danger',
          title: 'Les props sont en lecture seule',
          text: "Ne fais jamais `props.name = 'autre chose'`. Si un composant doit modifier une valeur, le parent doit passer une fonction de rappel (callback) et posséder l'état. Ce principe s'appelle le **levant d'état** (lifting state up).",
        },
        {
          type: 'list',
          items: [
            'Un composant = une responsabilité claire. Si son nom contient « et », découpe.',
            'Les props optionnelles ont une valeur par défaut dans la déstructuration.',
            'Les callbacks se nomment `onQuelqueChose` côté composant, `handleQuelqueChose` côté parent.',
            'Un composant doit rester petit : au-delà de 150 lignes, extrais des sous-composants.',
          ],
        },
      ],
    },
    {
      id: 'conditions-listes',
      title: 'Rendu conditionnel et listes',
      duration: 40,
      summary:
        "Afficher un contenu selon une condition, parcourir un tableau avec map et éviter les bugs de clés.",
      blocks: [
        {
          type: 'p',
          text: "Deux opérations reviennent dans toutes les applications : afficher quelque chose **si** une condition est vraie, et afficher une **liste** d'éléments. En JSX, on utilise des expressions JavaScript, pas de directives spéciales.",
        },
        {
          type: 'table',
          headers: ['Besoin', 'Syntaxe', 'Exemple'],
          rows: [
            ['Si / sinon', 'ternaire', 'isAdmin ? <Admin /> : <User />'],
            ['Si seulement', '&&', 'items.length > 0 && <List />'],
            ['Sinon si', 'variable ou fonction', 'const content = ...'],
            ['Liste', 'map', 'items.map(item => <li key={item.id}>{item.name}</li>)'],
            ['Filtrer', 'filter avant map', 'items.filter(i => i.done).map(...)'],
          ],
        },
        {
          type: 'code',
          title: 'Liste filtrable avec clés stables',
          lang: 'tsx',
          code: `type Task = {
  id: string
  title: string
  done: boolean
  priority: 'basse' | 'normale' | 'haute'
}

const tasks: Task[] = [
  { id: 't1', title: 'Installer React', done: true, priority: 'haute' },
  { id: 't2', title: 'Créer un composant', done: false, priority: 'normale' },
  { id: 't3', title: 'Déployer le site', done: false, priority: 'basse' },
]

export function TaskList() {
  const remaining = tasks.filter((task) => !task.done)

  return (
    <section>
      <h2>À faire ({remaining.length})</h2>

      {remaining.length === 0 ? (
        <p>Tout est terminé. 🎉</p>
      ) : (
        <ul className="space-y-2">
          {remaining.map((task) => (
            <li key={task.id} className="flex items-center gap-3 rounded-lg border p-3">
              <span>{task.title}</span>
              <span className="ml-auto text-xs uppercase">{task.priority}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}`,
        },
        {
          type: 'h',
          text: 'La règle des clés',
        },
        {
          type: 'p',
          text: "`key` aide React à identifier chaque élément entre deux rendus. Elle doit être **unique parmi les frères** et **stable** : l'identifiant de la base de données est parfait. L'index du tableau est un mauvais choix dès que la liste peut être triée, filtrée ou modifiée.",
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Pourquoi l’index casse les listes',
          text: "Si tu supprimes le premier élément d'une liste indexée, React réutilise le composant de l'index 0 pour une autre donnée. Résultat : un champ de formulaire garde l'ancienne valeur, une animation se déclenche au mauvais endroit, une case cochée reste cochée. Utilise un id stable.",
        },
        {
          type: 'code',
          title: 'Le piège du 0 et de &&',
          lang: 'tsx',
          code: `// ⚠️ Affiche "0" quand la liste est vide
{items.length && <List items={items} />}

// ✅ Toujours convertir en booléen
{items.length > 0 && <List items={items} />}

// ✅ Ou utiliser un ternaire explicite
{items.length ? <List items={items} /> : <EmptyState />}`,
        },
      ],
    },
    {
      id: 'evenements',
      title: 'Événements et interactions',
      duration: 35,
      summary:
        "Réagir aux clics, à la saisie et à la soumission d'un formulaire, sans confondre appeler et passer une fonction.",
      blocks: [
        {
          type: 'p',
          text: "En React, on attache les événements directement dans le JSX avec une prop `onClick`, `onChange`, `onSubmit`… La valeur est une **fonction**, pas une chaîne de caractères. React normalise les événements pour qu'ils se comportent pareil dans tous les navigateurs.",
        },
        {
          type: 'code',
          title: 'Compteur et champ contrôlé',
          lang: 'tsx',
          code: `import { useState } from 'react'

export function Demo() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  function handleReset() {
    setCount(0)
    setName('')
  }

  return (
    <div className="space-y-4">
      <p>Compteur : {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount((value) => value - 1)}>-1</button>
      <button onClick={handleReset}>Réinitialiser</button>

      <label>
        Ton prénom
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Awa"
        />
      </label>
      <p>Bonjour {name || 'inconnu'} !</p>
    </div>
  )
}`,
        },
        {
          type: 'h',
          text: 'Passer une fonction ou l’appeler ?',
        },
        {
          type: 'code',
          title: 'La différence cruciale',
          lang: 'tsx',
          code: `// ✅ On passe une fonction : elle sera appelée au clic
<button onClick={handleClick}>Cliquer</button>
<button onClick={() => handleClick('Awa')}>Cliquer</button>

// ❌ On appelle la fonction immédiatement, au rendu
<button onClick={handleClick()}>Cliquer</button>

// ✅ Pour un formulaire, on empêche le rechargement
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  // traiter les données
}`,
        },
        {
          type: 'table',
          headers: ['Événement', 'Quand', 'Type TypeScript'],
          rows: [
            ['onClick', 'Clic sur un élément', 'React.MouseEvent<HTMLButtonElement>'],
            ['onChange', 'Saisie dans un champ', 'React.ChangeEvent<HTMLInputElement>'],
            ['onSubmit', 'Soumission de formulaire', 'React.FormEvent<HTMLFormElement>'],
            ['onKeyDown', 'Touche pressée', 'React.KeyboardEvent<HTMLInputElement>'],
            ['onFocus / onBlur', 'Entrée / sortie de champ', 'React.FocusEvent<HTMLInputElement>'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Nomme tes handlers',
          text: "`handleClick`, `handleSubmit`, `handleNameChange` : ces noms rendent le code lisible. Réserve `onClick`, `onSubmit` aux props de tes propres composants. C'est une convention largement suivie dans l'écosystème.",
        },
      ],
    },
  ],
  projects: [
    {
      id: 'm1-p1',
      moduleId: 'm1',
      title: 'Carte de profil',
      level: 1,
      time: '20 min',
      summary:
        "Affiche une carte avec avatar, nom, rôle et trois compétences. Le premier vrai composant, sans état.",
      skills: ['JSX', 'props', 'listes', 'Tailwind'],
      steps: [
        'Crée `src/components/ProfileCard.tsx` et définis un type `ProfileCardProps` avec `name`, `role`, `avatar`, `skills`.',
        'Retourne une `article` avec une image ronde, le nom en `h2`, le rôle en texte gris et une liste de badges pour les compétences.',
        'Dans `App.tsx`, importe le composant et passe des props réalistes pour deux profils différents.',
        'Ajoute une prop optionnelle `available` et affiche un point vert « Disponible » si elle vaut `true`.',
      ],
      starter: `type ProfileCardProps = {
  name: string
  role: string
  avatar: string
  skills: string[]
}

export function ProfileCard({ name, role, avatar, skills }: ProfileCardProps) {
  return (
    <article className="w-72 rounded-2xl border border-gray-200 bg-white p-6">
      {/* À compléter */}
    </article>
  )
}`,
      bonus: [
        'Ajoute un bouton « Voir le profil » qui appelle une prop `onView`.',
        'Affiche au maximum 3 compétences, puis un badge « +2 ».',
      ],
    },
    {
      id: 'm1-p2',
      moduleId: 'm1',
      title: 'Compteur à thème',
      level: 1,
      time: '20 min',
      summary:
        "Un compteur avec incrément, décrément, remise à zéro et message conditionnel. Le premier état.",
      skills: ['useState', 'événements', 'conditions'],
      steps: [
        'Déclare `const [count, setCount] = useState(0)`.',
        'Ajoute trois boutons : `+1`, `-1`, `Remettre à zéro`. Utilise la forme fonctionnelle `setCount(v => v + 1)`.',
        'Affiche un message conditionnel : négatif, nul, positif.',
        'Change la couleur du grand chiffre selon le signe (rouge, gris, vert).',
      ],
      bonus: [
        'Ajoute un bouton `+10` et un pas configurable via un champ numérique.',
        'Empêche le compteur de descendre sous 0.',
      ],
    },
    {
      id: 'm1-p3',
      moduleId: 'm1',
      title: 'Recette du jour',
      level: 2,
      time: '30 min',
      summary:
        "Une fiche recette avec ingrédients, étapes numérotées et temps de préparation.",
      skills: ['props', 'tableaux', 'JSX', 'Tailwind'],
      steps: [
        'Crée un objet `recipe` avec `title`, `image`, `time`, `servings`, `ingredients` et `steps`.',
        'Affiche l’image, le titre et deux badges (temps, portions).',
        'Mappe les ingrédients dans une liste à puces et les étapes dans une liste ordonnée.',
        'Ajoute un bouton « Afficher/Masquer les étapes » avec un état booléen.',
      ],
      starter: `const recipe = {
  title: 'Tô sauce gombo',
  time: 45,
  servings: 4,
  ingredients: ['Mil', 'Gombo', 'Poisson fumé', 'Tomate', 'Oignon'],
  steps: ['Préparer la pâte', 'Cuire la sauce', 'Servir chaud'],
}`,
      bonus: [
        'Ajoute un sélecteur de portions qui multiplie les quantités.',
        'Affiche une case à cocher devant chaque ingrédient.',
      ],
    },
    {
      id: 'm1-p4',
      moduleId: 'm1',
      title: 'Galerie de projets',
      level: 2,
      time: '35 min',
      summary:
        "Une grille responsive de cartes projet avec image, description, tags et lien.",
      skills: ['map', 'clés', 'grid', 'composants'],
      steps: [
        'Crée un tableau `projects` de 6 objets avec `id`, `title`, `description`, `tags`, `image`, `url`.',
        'Crée un composant `ProjectCard` réutilisable et passe chaque objet en props.',
        'Affiche la grille en `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`.',
        'Affiche les tags avec `map` et une `key={tag}` (les tags sont uniques ici).',
        'Ajoute un lien externe avec `target="_blank"` et `rel="noreferrer"`.',
      ],
      bonus: [
        'Ajoute un champ de recherche qui filtre les projets par titre.',
        'Ajoute un filtre par tag avec des boutons.',
      ],
    },
    {
      id: 'm1-p5',
      moduleId: 'm1',
      title: 'FAQ accordéon',
      level: 3,
      time: '40 min',
      summary:
        "Une liste de questions fréquentes dont une seule réponse est ouverte à la fois.",
      skills: ['useState', 'conditions', 'événements', 'accessibilité'],
      steps: [
        'Crée un tableau de 5 questions/réponses avec un `id`.',
        'Stocke l’id de la question ouverte dans `useState<string | null>(null)`.',
        'Au clic, ouvre la question ou referme-la si elle est déjà ouverte.',
        'Affiche une icône `+` ou `−` selon l’état.',
        'Ajoute `aria-expanded` et `aria-controls` sur le bouton.',
      ],
      bonus: [
        'Autorise plusieurs réponses ouvertes avec un `Set<string>`.',
        'Ajoute une transition de hauteur avec `grid-template-rows: 0fr → 1fr`.',
      ],
    },
    {
      id: 'm1-p6',
      moduleId: 'm1',
      title: 'Onglets de contenu',
      level: 3,
      time: '45 min',
      summary:
        "Un système d’onglets (Présentation, Projets, Contact) avec contenu conditionnel.",
      skills: ['état', 'tableaux', 'rendu conditionnel'],
      steps: [
        'Définis un tableau `tabs` avec `id`, `label` et `content` (du JSX ou une fonction).',
        'Stocke l’onglet actif dans un état initialisé au premier id.',
        'Affiche les boutons en `flex` et souligne l’onglet actif.',
        'Affiche uniquement le contenu de l’onglet actif.',
        'Ajoute la navigation clavier avec les flèches gauche/droite.',
      ],
      bonus: [
        'Ajoute `role="tablist"`, `role="tab"`, `role="tabpanel"` et `aria-selected`.',
        'Mémorise l’onglet actif dans l’URL avec un paramètre de requête.',
      ],
    },
    {
      id: 'm1-p7',
      moduleId: 'm1',
      title: 'Quiz express',
      level: 4,
      time: '1 h',
      summary:
        "Un quiz de 5 questions avec score final et écran de résultat.",
      skills: ['état', 'conditions', 'listes', 'logique'],
      steps: [
        'Crée un tableau de questions avec `question`, `options` et `answer`.',
        'Stocke l’index courant et le score dans deux états.',
        'Au clic sur une réponse, compare avec la bonne réponse, incrémente le score si besoin.',
        'Passe à la question suivante ; à la fin, affiche le score sur 5 et un message.',
        'Ajoute un bouton « Rejouer » qui remet tout à zéro.',
      ],
      bonus: [
        'Mélange les questions au démarrage avec `sort(() => Math.random() - 0.5)`.',
        'Affiche la bonne réponse en vert et la mauvaise en rouge après le clic.',
      ],
    },
    {
      id: 'm1-p8',
      moduleId: 'm1',
      title: 'Tableau de bord statique',
      level: 4,
      time: '1 h',
      summary:
        "Un dashboard avec cartes de statistiques, liste d’activités et barres de progression.",
      skills: ['composition', 'props', 'grid', 'tableaux'],
      steps: [
        'Crée un composant `StatCard` avec `label`, `value`, `delta`, `icon`.',
        'Affiche quatre cartes dans une grille responsive.',
        'Crée un composant `ActivityList` qui reçoit un tableau d’activités.',
        'Affiche une barre de progression par objectif avec une largeur en style inline.',
        'Ajoute un en-tête avec le nom de l’utilisateur et la date du jour.',
      ],
      bonus: [
        'Extrais les données dans `src/data/dashboard.ts`.',
        'Ajoute un bouton de bascule « Cette semaine / Ce mois » (données statiques).',
      ],
    },
    {
      id: 'm1-p9',
      moduleId: 'm1',
      title: 'Planning de la semaine',
      level: 4,
      time: '1 h 15',
      summary:
        "Un emploi du temps hebdomadaire en grille, avec créneaux colorés et vue mobile.",
      skills: ['tableaux imbriqués', 'map', 'responsive', 'conditions'],
      steps: [
        'Crée un tableau `days` (lundi à vendredi) et un objet `slots` par jour.',
        'Affiche une colonne par jour en `grid grid-cols-5` sur desktop.',
        'Sur mobile, passe en `grid-cols-1` et affiche le nom du jour en titre.',
        'Colorie chaque matière avec une couleur définie dans les données.',
        'Affiche « Libre » quand un créneau est vide.',
      ],
      bonus: [
        'Ajoute un sélecteur de semaine et des données différentes.',
        'Calcule le nombre total d’heures de cours par semaine.',
      ],
    },
    {
      id: 'm1-p10',
      moduleId: 'm1',
      title: 'Mini CV interactif',
      level: 5,
      time: '1 h 30',
      summary:
        "Une page CV complète : hero, expériences, compétences, projets et formulaire de contact visuel.",
      skills: ['composition', 'props', 'listes', 'design responsive'],
      steps: [
        'Crée quatre composants : `Hero`, `ExperienceList`, `SkillGrid`, `ContactBanner`.',
        'Centralise les données dans `src/data/cv.ts` avec un type `CV`.',
        'Assemble les sections dans `App.tsx` avec des ancres `#experience`, `#projets`.',
        'Ajoute une navigation interne sticky avec des liens vers les sections.',
        'Soigne la hiérarchie typographique et les espacements ; teste en 375 px et en 1440 px.',
      ],
      bonus: [
        'Ajoute un bouton « Télécharger en PDF » qui appelle `window.print()`.',
        'Ajoute un mode sombre simple avec un état et une classe sur `document.documentElement`.',
      ],
    },
  ],
}
