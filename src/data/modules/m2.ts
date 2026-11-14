import type { CourseModule } from '../types'

export const module2: CourseModule = {
  slug: 'tailwind-css',
  number: 2,
  title: 'Tailwind CSS avec React',
  tagline: 'Construire des interfaces rapides, responsives et cohérentes.',
  description:
    "Tailwind n'est pas « du CSS dans le HTML » : c'est un système de design utilitaire. Tu apprends à l'installer avec Vite, à maîtriser les classes qui comptent vraiment, à gérer le responsive, les états, le mode sombre et à fabriquer tes propres composants stylés.",
  icon: 'palette',
  accent: 'lime',
  level: 'Débutant',
  duration: 390,
  outcomes: [
    'Installer Tailwind CSS 4 dans un projet Vite et vérifier que les styles sont générés',
    'Composer une mise en page avec flex, grid, espacements et tailles',
    'Rendre une interface responsive en mobile-first avec les breakpoints',
    'Styler les états hover, focus, disabled, dark, group et peer',
    'Définir des design tokens avec `@theme` et des utilitaires personnalisés',
    'Créer des composants réutilisables avec `cn()` et des variantes typées',
    'Éviter les pièges classiques : classes dynamiques, conflits, purge et surcharge',
  ],
  lessons: [
    {
      id: 'pourquoi-tailwind',
      title: 'Pourquoi Tailwind change ta façon de styler',
      duration: 25,
      summary:
        "Comprendre le utility-first, ses avantages réels et les cas où il n'est pas le bon choix.",
      blocks: [
        {
          type: 'p',
          text: "Avec du CSS classique, tu inventes des noms de classes, tu navigues entre deux fichiers et tu crains de casser un autre écran en modifiant un style. Tailwind propose l'inverse : **des classes petites et composables** (`flex`, `p-4`, `text-sm`) que tu assembles directement dans le JSX. Le style reste à côté de la structure qu'il décrit.",
        },
        {
          type: 'code',
          title: 'Le même bouton, deux approches',
          lang: 'tsx',
          code: `// CSS classique
<button className="btn btn-primary">Enregistrer</button>

// Tailwind
<button className="rounded-xl bg-brand-600 px-4 py-2.5 font-medium text-white
                   transition hover:bg-brand-700 focus-visible:ring-2
                   focus-visible:ring-brand-400 disabled:opacity-50">
  Enregistrer
</button>`,
        },
        {
          type: 'table',
          headers: ['Critère', 'CSS classique', 'Tailwind'],
          rows: [
            ['Vitesse de prototypage', 'Lente (nommer, structurer)', 'Très rapide'],
            ['Contexte', 'Deux fichiers à ouvrir', 'Tout est visible dans le JSX'],
            ['Cohérence', 'Dépend de la discipline', 'Échelle imposée par le framework'],
            ['CSS mort', 'Difficile à détecter', 'Généré à la demande, très léger'],
            ['Design system', 'À construire', 'Tokens intégrés (`@theme`)'],
            ['Courbe d’apprentissage', 'CSS pur', 'Nom des utilitaires à mémoriser'],
          ],
        },
        {
          type: 'h',
          text: 'Ce que Tailwind ne fait pas',
        },
        {
          type: 'list',
          items: [
            "Il n'implémente pas de composants prêts à l'emploi : ce n'est pas Bootstrap. Tu construis tes propres boutons, cartes et modales.",
            'Il ne remplace pas la connaissance du CSS. Pour animer, positionner ou construire une grille complexe, tu dois comprendre `flex`, `grid`, `position` et `z-index`.',
            "Il n'est pas idéal si ton équipe doit produire du HTML statique sans build. Dans ce cas, le CDN existe mais n'est pas recommandé en production.",
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Le vrai bénéfice : les contraintes',
          text: "Tailwind impose une échelle d'espacement, de tailles et de couleurs. Résultat : moins de décisions arbitraires, des interfaces plus cohérentes et un design system qui émerge naturellement. C'est particulièrement utile en équipe.",
        },
        {
          type: 'quote',
          text: "Les classes utilitaires ne sont pas une fin en soi. Elles sont un vocabulaire pour construire des composants réutilisables.",
        },
      ],
    },
    {
      id: 'installer-tailwind',
      title: 'Installer Tailwind CSS 4 avec Vite',
      duration: 35,
      summary:
        "L'installation exacte, la configuration Vite, le fichier CSS et la vérification que tout compile.",
      blocks: [
        {
          type: 'p',
          text: "Tailwind 4 simplifie radicalement l'installation : plus de fichier `tailwind.config.js` obligatoire, plus de `postcss.config.js`. Un plugin Vite et une ligne dans le CSS suffisent. C'est la version que nous utilisons dans tout le parcours.",
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Installe les deux paquets',
              text: "Dans le dossier du projet, exécute `npm install tailwindcss @tailwindcss/vite`. Le premier contient le moteur, le second l'intégration Vite.",
            },
            {
              title: 'Branche le plugin dans Vite',
              text: "Ouvre `vite.config.ts`, importe `tailwindcss` depuis `@tailwindcss/vite` et ajoute-le au tableau `plugins`, après React.",
            },
            {
              title: 'Importe Tailwind dans le CSS',
              text: "Remplace le contenu de `src/index.css` par `@import 'tailwindcss';`. C'est tout : Tailwind scanne tes fichiers et génère uniquement les classes utilisées.",
            },
            {
              title: 'Teste avec une classe',
              text: "Dans `App.tsx`, ajoute `className=\"bg-brand-500 p-8 text-white\"` sur un élément. Si le fond apparaît, l'installation est bonne. Si ce n'est pas le cas, redémarre `npm run dev`.",
            },
          ],
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

/* Tes tokens et styles globaux viendront ici */
@theme {
  --color-brand-500: #3d5bf5;
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

body {
  @apply bg-paper-50 text-ink-900 font-sans antialiased;
}`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Tu suis un tutoriel Tailwind 3 ?',
          text: "Les versions 3 et 4 ont des installations différentes. En v3 : `npm install -D tailwindcss postcss autoprefixer`, puis `npx tailwindcss init -p`, et tu ajoutes les directives `@tailwind base; @tailwind components; @tailwind utilities;`. Ne mélange pas les deux méthodes dans un même projet.",
        },
        {
          type: 'table',
          headers: ['Problème', 'Cause probable', 'Solution'],
          rows: [
            ['Aucun style ne s’applique', 'Plugin absent ou CSS non importé', 'Vérifier vite.config.ts et main.tsx'],
            ['Les couleurs custom échouent', 'Tokens mal nommés', 'Utiliser `--color-nom-500` dans `@theme`'],
            ['Le style marche en dev, pas en build', 'Classe construite dynamiquement', 'Écrire la classe complète dans le code'],
            ['Le serveur ne recharge pas', 'Version de Vite incompatible', 'Mettre à jour Vite et Tailwind'],
          ],
        },
      ],
    },
    {
      id: 'utilitaires-essentiels',
      title: 'Les utilitaires qui font 90 % du travail',
      duration: 45,
      summary:
        "Espacement, tailles, couleurs, typographie, flex, grid, bordures et ombres : l'essentiel à mémoriser.",
      blocks: [
        {
          type: 'p',
          text: "Tailwind compte des centaines de classes, mais une petite trentaine suffit pour construire presque toutes les interfaces. Apprends les familles, pas chaque valeur : `p-*` pour le padding, `m-*` pour la marge, `text-*` pour la typographie, etc.",
        },
        {
          type: 'table',
          headers: ['Famille', 'Exemples', 'À retenir'],
          rows: [
            ['Espacement', 'p-4, px-6, mt-2, gap-4', 'Échelle de 0.25rem par unité (p-4 = 1rem)'],
            ['Taille', 'w-full, max-w-md, h-screen, size-10', '`size-*` = largeur + hauteur'],
            ['Typographie', 'text-sm, font-semibold, leading-6, tracking-tight', 'Taille, graisse, interligne, espacement'],
            ['Couleurs', 'bg-brand-600, text-ink-700, border-ink/10', '`/10` applique une opacité'],
            ['Layout', 'flex, grid, items-center, justify-between', 'Le cœur de la mise en page'],
            ['Grid', 'grid-cols-3, col-span-2, gap-6', 'Colonnes et placement'],
            ['Bordures', 'rounded-xl, border, border-b', 'Rayons et côtés'],
            ['Ombres', 'shadow-sm, shadow-lg', 'Élévation'],
            ['Position', 'relative, absolute, sticky, inset-0', 'Pour superposer et coller'],
          ],
        },
        {
          type: 'code',
          title: 'Une carte complète en une seule classe',
          lang: 'tsx',
          code: `export function Card() {
  return (
    <article className="max-w-sm rounded-2xl border border-ink-900/10 bg-white p-6 shadow-sm">
      <span className="rounded-full bg-lime-300 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-widest">
        Nouveau
      </span>
      <h3 className="mt-4 text-xl font-semibold tracking-tight">Suivi des données</h3>
      <p className="mt-2 text-sm leading-6 text-ink-600">
        Collecte, analyse et visualisation pour les équipes terrain.
      </p>
      <div className="mt-5 flex items-center gap-3">
        <button className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white">
          Découvrir
        </button>
        <button className="rounded-xl border border-ink-900/15 px-4 py-2 text-sm font-medium">
          Plus tard
        </button>
      </div>
    </article>
  )
}`,
        },
        {
          type: 'h',
          text: 'Flexbox : les quatre propriétés à maîtriser',
        },
        {
          type: 'code',
          lang: 'tsx',
          code: `<div className="flex items-center justify-between gap-4">
  <div className="flex items-center gap-2">
    <span className="size-2 rounded-full bg-green-500" />
    <span>En ligne</span>
  </div>
  <button>Paramètres</button>
</div>`,
        },
        {
          type: 'list',
          items: [
            '`flex` active Flexbox ; `flex-col` empile verticalement.',
            "`items-*` aligne sur l'axe transversal (vertical par défaut).",
            "`justify-*` aligne sur l'axe principal (horizontal par défaut).",
            '`gap-*` remplace les marges entre enfants : plus propre et plus prévisible.',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Les unités Tailwind',
          text: "`p-1` = 0.25rem = 4px, `p-2` = 8px, `p-4` = 16px, `p-6` = 24px, `p-8` = 32px. Cette échelle de 4px est volontairement limitée : elle force la cohérence. Pour une valeur hors échelle, utilise `p-[18px]`.",
        },
      ],
    },
    {
      id: 'responsive',
      title: 'Responsive : mobile-first, sans douleur',
      duration: 40,
      summary:
        "Les breakpoints, la stratégie mobile-first et les patterns de grille qui s'adaptent vraiment.",
      blocks: [
        {
          type: 'p',
          text: "Tailwind est **mobile-first** : une classe sans préfixe s'applique à toutes les tailles. `md:text-xl` s'applique à partir de 768 px et au-delà. Tu écris donc le style mobile, puis tu ajoutes des surcharges pour les écrans plus grands.",
        },
        {
          type: 'table',
          headers: ['Préfixe', 'Largeur minimale', 'Cible typique'],
          rows: [
            ['(aucun)', '0 px', 'Mobile'],
            ['sm:', '640 px', 'Grand mobile / petite tablette'],
            ['md:', '768 px', 'Tablette'],
            ['lg:', '1024 px', 'Ordinateur portable'],
            ['xl:', '1280 px', 'Grand écran'],
            ['2xl:', '1536 px', 'Très grand écran'],
          ],
        },
        {
          type: 'code',
          title: 'Grille qui passe de 1 à 3 colonnes',
          lang: 'tsx',
          code: `<section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {projects.map((project) => (
      <article key={project.id} className="rounded-2xl border p-5">
        {project.title}
      </article>
    ))}
  </div>
</section>`,
        },
        {
          type: 'code',
          title: 'Navigation responsive : menu desktop, bouton mobile',
          lang: 'tsx',
          code: `<header className="flex items-center justify-between px-4 py-3">
  <span className="font-display text-lg font-semibold">Mon site</span>

  <nav className="hidden items-center gap-6 md:flex">
    <a href="#projets">Projets</a>
    <a href="#contact">Contact</a>
  </nav>

  <button className="rounded-lg border p-2 md:hidden" aria-label="Ouvrir le menu">
    <MenuIcon />
  </button>
</header>`,
        },
        {
          type: 'h',
          text: 'Trois patterns utiles',
        },
        {
          type: 'list',
          items: [
            '**Texte fluide** : `text-3xl md:text-5xl lg:text-6xl` pour un titre qui grandit avec l’écran.',
            '**Conteneur** : `mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8` sur chaque section.',
            '**Deux colonnes asymétriques** : `grid gap-8 lg:grid-cols-[1fr_380px]` pour un contenu + une sidebar.',
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ne cache pas le contenu important sur mobile',
          text: "`hidden md:block` est pratique pour un menu secondaire, pas pour le contenu principal. Teste chaque page à 375 px de large, avec le clavier ouvert sur les formulaires. Le mobile n'est pas une version dégradée : c'est souvent la version principale.",
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Les conteneurs de requête',
          text: "Tailwind 4 ajoute `@container` et les variantes `@sm:`, `@md:` : un composant s'adapte à la largeur de son parent, pas à celle de l'écran. Très utile pour des cartes réutilisées dans une sidebar ou une grille.",
        },
      ],
    },
    {
      id: 'etats-variants',
      title: 'États, variantes et mode sombre',
      duration: 40,
      summary:
        "Hover, focus, disabled, group, peer, dark, aria et data : donner vie à une interface accessible.",
      blocks: [
        {
          type: 'p',
          text: "Une interface n'est pas statique. Tailwind permet de préfixer presque n'importe quelle classe par une variante : `hover:bg-brand-700`, `focus-visible:ring-2`, `disabled:opacity-50`. Les variantes se combinent et se lisent de gauche à droite.",
        },
        {
          type: 'code',
          title: 'Un bouton qui gère tous ses états',
          lang: 'tsx',
          code: `<button
  type="button"
  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5
             text-sm font-medium text-white shadow-sm transition
             hover:bg-brand-700 hover:shadow-md
             active:translate-y-px
             focus-visible:outline-none focus-visible:ring-2
             focus-visible:ring-brand-400 focus-visible:ring-offset-2
             disabled:cursor-not-allowed disabled:opacity-50"
  disabled={isSaving}
>
  {isSaving ? 'Enregistrement…' : 'Enregistrer'}
</button>`,
        },
        {
          type: 'h',
          text: 'Group et peer : styler selon un voisin',
        },
        {
          type: 'code',
          lang: 'tsx',
          code: `// group : le parent contrôle le style de ses enfants
<a href="#" className="group flex items-center justify-between rounded-xl border p-4">
  <span>Voir le projet</span>
  <ArrowRight className="transition group-hover:translate-x-1" />
</a>

// peer : un champ contrôle le style d'un frère
<label className="block">
  <span className="text-sm">E-mail</span>
  <input
    type="email"
    className="peer mt-1 w-full rounded-lg border p-2 invalid:border-red-500"
    required
  />
  <span className="hidden text-xs text-red-600 peer-invalid:block">
    Adresse invalide
  </span>
</label>`,
        },
        {
          type: 'h',
          text: 'Mode sombre',
        },
        {
          type: 'p',
          text: "Avec Tailwind 4, le mode sombre se pilote par une classe sur `<html>` ou par la préférence système. Pour un thème contrôlable par l'utilisateur, définis la variante `dark` sur la classe `.dark` dans ton CSS, puis ajoute `dark:` à tes classes.",
        },
        {
          type: 'code',
          title: 'index.css et bascule de thème',
          lang: 'css',
          code: `@import 'tailwindcss';
@custom-variant dark (&:where(.dark, .dark *));`,
        },
        {
          type: 'code',
          title: 'Basculer la classe sur html',
          lang: 'tsx',
          code: `function toggleTheme() {
  const root = document.documentElement
  const isDark = root.classList.toggle('dark')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}

// Au démarrage (dans main.tsx, avant render)
const saved = localStorage.getItem('theme')
if (saved === 'dark') document.documentElement.classList.add('dark')`,
        },
        {
          type: 'table',
          headers: ['Variante', 'Quand l’utiliser'],
          rows: [
            ['hover:', 'Souris sur un élément interactif'],
            ['focus-visible:', 'Focus clavier uniquement (accessibilité)'],
            ['active:', 'Pendant le clic'],
            ['disabled:', 'Contrôle inactif'],
            ['group-hover:', 'Le parent survolé style l’enfant'],
            ['peer-checked:', 'Un input coché style un frère'],
            ['dark:', 'Thème sombre'],
            ['aria-expanded:', 'Style piloté par un attribut ARIA'],
            ['data-active:', 'Style piloté par un attribut data'],
          ],
        },
      ],
    },
    {
      id: 'design-tokens',
      title: 'Design tokens et utilitaires personnalisés',
      duration: 45,
      summary:
        "Centraliser couleurs, polices et espacements dans `@theme`, puis créer tes propres classes utilitaires.",
      blocks: [
        {
          type: 'p',
          text: "Les valeurs par défaut de Tailwind sont excellentes, mais chaque marque a ses couleurs et ses polices. Tailwind 4 utilise `@theme` pour déclarer des tokens qui génèrent automatiquement des classes utilitaires. C'est ton design system, en CSS, versionné avec le code.",
        },
        {
          type: 'code',
          title: 'Des tokens qui génèrent bg-sand-50, text-clay-600, etc.',
          lang: 'css',
          code: `@import 'tailwindcss';

@theme {
  /* Polices */
  --font-sans: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Fraunces', ui-serif, Georgia, serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;

  /* Couleurs de marque */
  --color-sand-50: #fbf7ef;
  --color-sand-100: #f5ecdb;
  --color-clay-500: #d9601f;
  --color-clay-600: #b94d15;
  --color-navy-900: #0c2a45;
  --color-ink: #0f2436;

  /* Courbe d'animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}`,
        },
        {
          type: 'code',
          title: 'Utiliser les tokens',
          lang: 'tsx',
          code: `<section className="bg-sand-50 text-ink">
  <h1 className="font-display text-4xl text-navy-900">DataSahel</h1>
  <p className="font-mono text-xs tracking-widest text-clay-600 uppercase">
    La donnée au service du Sahel
  </p>
  <button className="rounded-full bg-clay-600 px-5 py-3 text-sand-50
                     transition-colors duration-300 ease-out-expo hover:bg-navy-900">
    Nous contacter
  </button>
</section>`,
        },
        {
          type: 'h',
          text: 'Créer un utilitaire sur mesure',
        },
        {
          type: 'code',
          title: '@utility et @layer components',
          lang: 'css',
          code: `@utility shell {
  width: 100%;
  max-width: 78rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
  @media (min-width: 640px) { padding-inline: 2rem; }
  @media (min-width: 1024px) { padding-inline: 2.5rem; }
}

@layer components {
  .kicker {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
}`,
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Tokens vs classes arbitraires',
          text: "Une valeur utilisée une seule fois peut rester arbitraire (`mt-[18px]`). Une valeur utilisée partout doit devenir un token (`--spacing-section`, `--color-brand-500`). C'est ainsi qu'on garde un design cohérent sans surcharger la config.",
        },
        {
          type: 'list',
          items: [
            'Nomme les couleurs par usage (`brand`, `surface`, `muted`) plutôt que par teinte (`blue`, `gray`).',
            'Déclare deux polices maximum : une pour les titres, une pour le texte.',
            'Utilise `--color-nom-500` pour obtenir `bg-nom-500`, `text-nom-500`, `border-nom-500`.',
            'Les variables `@theme` sont aussi disponibles en CSS : `var(--color-brand-500)`.',
          ],
        },
      ],
    },
    {
      id: 'composants-tailwind',
      title: 'Composants réutilisables avec cn() et variantes',
      duration: 45,
      summary:
        "Arrêter de répéter 40 classes : fabriquer Button, Badge et Card avec des variantes typées.",
      blocks: [
        {
          type: 'p',
          text: "Tailwind devient vraiment puissant quand tu extrais les répétitions dans des composants. La règle : **répéter deux fois, extraire une fois**. Un bouton utilisé partout mérite un composant `Button` avec des variantes `primary`, `outline`, `ghost` et des tailles.",
        },
        {
          type: 'code',
          title: 'lib/cn.ts — fusionner des classes proprement',
          lang: 'ts',
          code: `export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Pour les projets sérieux : tailwind-merge',
          text: "Si un parent passe `px-8` à un bouton qui a déjà `px-4`, les deux classes coexistent et l'ordre CSS décide. `npm install tailwind-merge` puis `twMerge(clsx(...))` résout les conflits. Pour ce parcours, `cn()` simple suffit, mais garde cette option en tête.",
        },
        {
          type: 'code',
          title: 'components/Button.tsx — variantes typées',
          lang: 'tsx',
          code: `import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  outline: 'border border-ink-900/15 text-ink-900 hover:bg-ink-900/5',
  ghost: 'text-ink-700 hover:bg-ink-900/5',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition',
        'focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}`,
        },
        {
          type: 'code',
          title: 'Badge avec couleur sémantique',
          lang: 'tsx',
          code: `const tones = {
  success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  neutral: 'bg-ink-900/5 text-ink-700 dark:bg-white/10 dark:text-paper-200',
} as const

type Tone = keyof typeof tones

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span className={'inline-flex rounded-full px-2.5 py-1 text-xs font-medium ' + tones[tone]}>
      {children}
    </span>
  )
}`,
        },
        {
          type: 'table',
          headers: ['Situation', 'Approche'],
          rows: [
            ['Même style, contenu différent', 'Composant avec `children`'],
            ['Style variable (couleur, taille)', 'Variantes typées + map de classes'],
            ['Petite variante d’un composant', 'Prop booléenne (`fullWidth`, `compact`)'],
            ['HTML différent (lien vs bouton)', 'Prop `as` ou rendu conditionnel'],
            ['Surcharge locale', 'Prop `className` fusionnée en dernier'],
          ],
        },
      ],
    },
    {
      id: 'animations-pieges',
      title: 'Animations, transitions et pièges à éviter',
      duration: 35,
      summary:
        "Donner du mouvement sans nuire à la performance, et corriger les erreurs Tailwind les plus fréquentes.",
      blocks: [
        {
          type: 'p',
          text: "Une animation réussie est discrète et rapide : 150 à 300 ms pour une interaction, 500 à 700 ms pour une révélation. Tailwind fournit `transition`, `duration-*`, `ease-*`, `animate-*` et permet de définir ses propres keyframes.",
        },
        {
          type: 'code',
          title: 'Transition et keyframes personnalisées',
          lang: 'css',
          code: `@theme {
  --animate-float: float 7s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}`,
        },
        {
          type: 'code',
          title: 'Utilisation et respect de la préférence de mouvement',
          lang: 'tsx',
          code: `<div className="animate-float rounded-2xl bg-white p-6 shadow-lg">
  Carte flottante
</div>

/* Dans le CSS global */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`,
        },
        {
          type: 'h',
          text: 'Les cinq pièges classiques',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Les classes construites dynamiquement',
              text: "`'bg-' + color + '-500'` ne fonctionne pas : Tailwind analyse le code source à la compilation et ne peut pas deviner la classe. Écris les classes complètes dans une map : `{ blue: 'bg-blue-500', red: 'bg-red-500' }`.",
            },
            {
              title: 'Les conflits de classes',
              text: "`px-4 px-8` : l'ordre dans le CSS décide, pas l'ordre dans l'attribut. Utilise `tailwind-merge` ou ne passe pas deux valeurs du même groupe.",
            },
            {
              title: 'Oublier `min-w-0` dans une grille',
              text: "Un enfant de grille ou de flex refuse de rétrécir à cause de son contenu. Ajoute `min-w-0` sur l'enfant et `truncate` sur le texte.",
            },
            {
              title: 'Animer `width` ou `height`',
              text: "Ces propriétés déclenchent un recalcul de mise en page. Préfère `transform` et `opacity`, ou utilise `grid-template-rows` pour un accordéon.",
            },
            {
              title: 'Surcharger le CSS global',
              text: "Évite les `!important` et les sélecteurs trop larges. Si tu dois lutter contre Tailwind, c'est souvent que le composant n'est pas au bon niveau d'abstraction.",
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Le flash de thème sombre',
          text: "Si tu appliques la classe `dark` dans un `useEffect`, la page apparaît claire pendant une fraction de seconde. Ajoute un petit script inline dans `index.html` qui lit `localStorage` et pose la classe avant le premier rendu.",
        },
      ],
    },
  ],
  projects: [
    {
      id: 'm2-p1',
      moduleId: 'm2',
      title: 'Hero de landing page',
      level: 2,
      time: '35 min',
      summary:
        "Un hero avec titre XXL, sous-titre, deux boutons et un visuel abstrait en CSS.",
      skills: ['flex', 'typography', 'responsive', 'gradients'],
      steps: [
        'Crée une section `min-h-[80vh]` avec un conteneur `max-w-6xl mx-auto px-6`.',
        'Affiche un badge, un titre `text-5xl md:text-7xl`, un paragraphe `max-w-xl text-lg`.',
        'Ajoute deux boutons côte à côte, empilés sur mobile (`flex-col sm:flex-row`).',
        'Construis un visuel à droite avec des `div` arrondis et un `bg-gradient-to-br`.',
        'Teste à 375 px, 768 px et 1440 px ; vérifie que le titre ne déborde jamais.',
      ],
      starter: `<section className="relative overflow-hidden">
  <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
    <div>
      <span className="rounded-full bg-lime-300 px-3 py-1 text-xs font-medium">
        Nouveau parcours
      </span>
      <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
        Apprends React par la pratique
      </h1>
      <p className="mt-5 max-w-xl text-lg text-ink-600">
        60 projets, 5 applications guidées et un projet final professionnel.
      </p>
      {/* Boutons à ajouter */}
    </div>
    <div>{/* Visuel à ajouter */}</div>
  </div>
</section>`,
      bonus: [
        'Ajoute un motif de points en arrière-plan avec `page-dots` et un masque.',
        'Anime l’apparition du titre avec une keyframe `rise`.',
      ],
    },
    {
      id: 'm2-p2',
      moduleId: 'm2',
      title: 'Carte produit e-commerce',
      level: 2,
      time: '30 min',
      summary:
        "Une carte produit avec image, badge promo, prix barré, note et bouton d’ajout.",
      skills: ['cards', 'badges', 'group-hover', 'flex'],
      steps: [
        'Structure une `article` avec une zone image `aspect-square overflow-hidden rounded-xl`.',
        'Ajoute un badge `-20 %` en position absolue, et un cœur en haut à droite.',
        'Affiche le nom, la catégorie en majuscules, la note avec étoiles.',
        'Affiche le prix actuel en gras et l’ancien prix barré en gris.',
        'Au survol de la carte (`group`), zoome l’image (`group-hover:scale-105`) et change la couleur du bouton.',
      ],
      bonus: [
        'Ajoute une variante `compact` pour une liste horizontale.',
        'Gère l’état « ajouté au panier » avec un bouton qui change de texte.',
      ],
    },
    {
      id: 'm2-p3',
      moduleId: 'm2',
      title: 'Grille responsive de services',
      level: 2,
      time: '35 min',
      summary:
        "Six cartes de services en grille 1/2/3 colonnes avec icônes et liens.",
      skills: ['grid', 'breakpoints', 'espacement', 'cards'],
      steps: [
        'Crée un tableau de 6 services avec titre, description et icône.',
        'Utilise `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`.',
        'Ajoute un en-tête de section centré avec un kicker et un titre.',
        'Chaque carte a un effet `hover:-translate-y-1 hover:shadow-lg transition`.',
        'Ajoute un lien « En savoir plus » avec une flèche qui se déplace au survol.',
      ],
      bonus: [
        'Fais une carte mise en avant (`lg:col-span-2`) avec un fond sombre.',
        'Ajoute un décalage visuel sur la deuxième colonne en desktop.',
      ],
    },
    {
      id: 'm2-p4',
      moduleId: 'm2',
      title: 'Navbar responsive avec menu mobile',
      level: 3,
      time: '50 min',
      summary:
        "Une navigation sticky, un menu burger qui ouvre un panneau plein écran et des liens actifs.",
      skills: ['responsive', 'sticky', 'état', 'transitions'],
      steps: [
        'Crée un `header sticky top-0 z-50` avec un fond translucide et `backdrop-blur`.',
        'Affiche le logo à gauche, les liens au centre (`hidden lg:flex`) et un CTA à droite.',
        'Ajoute un bouton burger visible seulement sous `lg`.',
        'Au clic, affiche un panneau `fixed inset-0` avec les liens en grand.',
        'Change le fond du header au scroll avec un état `scrolled`.',
      ],
      bonus: [
        'Ajoute `aria-expanded` et `aria-controls` sur le bouton burger.',
        'Bloque le scroll du body quand le menu est ouvert.',
      ],
    },
    {
      id: 'm2-p5',
      moduleId: 'm2',
      title: 'Section de tarifs',
      level: 3,
      time: '45 min',
      summary:
        "Trois offres, une mise en avant, un toggle mensuel/annuel et des listes de fonctionnalités.",
      skills: ['grid', 'variantes', 'état', 'design'],
      steps: [
        'Crée trois plans : Découverte, Pro, Équipe, avec prix mensuel et annuel.',
        'Affiche-les en `grid gap-6 lg:grid-cols-3` avec le plan Pro surélevé (`lg:-mt-4 lg:scale-105`).',
        'Ajoute un toggle mensuel/annuel avec `useState` et recalcule les prix.',
        'Affiche une coche verte devant chaque fonctionnalité incluse.',
        'Ajoute un badge « Populaire » sur le plan Pro.',
      ],
      starter: `const plans = [
  { name: 'Découverte', monthly: 0, features: ['1 projet', 'Support communauté'] },
  { name: 'Pro', monthly: 15000, features: ['Projets illimités', 'Support prioritaire'] },
  { name: 'Équipe', monthly: 45000, features: ['5 membres', 'Facturation centralisée'] },
]`,
      bonus: [
        'Ajoute une remise de 20 % sur l’annuel.',
        'Affiche un tableau comparatif sous les cartes.',
      ],
    },
    {
      id: 'm2-p6',
      moduleId: 'm2',
      title: 'Dashboard shell',
      level: 4,
      time: '1 h',
      summary:
        "Un layout d’administration : sidebar fixe, topbar, zone de contenu et cartes KPI.",
      skills: ['layout', 'grid', 'sticky', 'responsive'],
      steps: [
        'Crée un layout `flex min-h-screen` avec une sidebar `w-64 hidden lg:flex` et un contenu `flex-1`.',
        'Ajoute une topbar sticky avec recherche, notifications et avatar.',
        'Dans le contenu, affiche une grille de 4 cartes KPI.',
        'Ajoute une section « Activité récente » et une section « Objectifs ».',
        'Sur mobile, remplace la sidebar par un drawer ouvert via un bouton.',
      ],
      bonus: [
        'Ajoute un état actif sur le lien de navigation courant.',
        'Implémente un mini graphique en barres avec des `div` et `h-[...]`.',
      ],
    },
    {
      id: 'm2-p7',
      moduleId: 'm2',
      title: 'Page de connexion split-screen',
      level: 4,
      time: '1 h',
      summary:
        "Un écran d’authentification avec panneau visuel à gauche et formulaire à droite.",
      skills: ['grid', 'forms', 'focus', 'responsive'],
      steps: [
        'Crée un `grid min-h-screen lg:grid-cols-2`.',
        'À gauche, un panneau sombre avec citation, motif et logo ; masqué sur mobile.',
        'À droite, un formulaire centré `max-w-sm` avec e-mail et mot de passe.',
        'Style les champs avec `focus:ring-2 focus:ring-brand-400`.',
        'Ajoute les états loading et erreur sur le bouton de connexion.',
      ],
      bonus: [
        'Ajoute un bouton « Afficher le mot de passe » avec une icône œil.',
        'Ajoute les boutons de connexion sociale (Google, GitHub).',
      ],
    },
    {
      id: 'm2-p8',
      moduleId: 'm2',
      title: 'Blog : cartes et filtres',
      level: 4,
      time: '1 h 15',
      summary:
        "Une page blog avec article vedette, grille de cartes, filtres par catégorie et pagination visuelle.",
      skills: ['grid', 'state', 'filter', 'typography'],
      steps: [
        'Crée un tableau d’articles avec slug, titre, extrait, catégorie, date et couleur.',
        'Affiche le premier article en carte vedette sur deux colonnes.',
        'Affiche les autres en grille `sm:grid-cols-2 lg:grid-cols-3`.',
        'Ajoute des boutons de catégorie qui filtrent la liste.',
        'Affiche un état vide quand aucun article ne correspond.',
      ],
      bonus: [
        'Ajoute un champ de recherche avec `useState`.',
        'Ajoute une pagination côté client (6 articles par page).',
      ],
    },
    {
      id: 'm2-p9',
      moduleId: 'm2',
      title: 'Landing SaaS complète',
      level: 4,
      time: '1 h 30',
      summary:
        "Hero, logos clients, fonctionnalités, témoignages, tarifs, FAQ et footer.",
      skills: ['sections', 'rythme', 'responsive', 'composition'],
      steps: [
        'Assemble 7 sections dans `App.tsx`, chacune avec un conteneur cohérent.',
        'Utilise un rythme vertical constant : `py-20 md:py-28` par section.',
        'Alterne les fonds (paper, blanc, sombre) pour créer des respirations.',
        'Ajoute un bandeau de logos en défilement infini (`animate-marquee`).',
        'Vérifie la hiérarchie : un seul `h1`, des `h2` par section.',
      ],
      bonus: [
        'Ajoute un header transparent qui devient opaque au scroll.',
        'Ajoute des ancres de navigation et un `scroll-mt-24` sur chaque section.',
      ],
    },
    {
      id: 'm2-p10',
      moduleId: 'm2',
      title: 'Design system miniature',
      level: 5,
      time: '2 h',
      summary:
        "Une page qui documente tes composants : boutons, badges, champs, cartes, alertes et couleurs.",
      skills: ['design system', 'tokens', 'variantes', 'documentation'],
      steps: [
        'Crée les composants `Button`, `Badge`, `Input`, `Card`, `Alert`.',
        'Définis des variantes typées et des tailles pour chacun.',
        'Construis une page `/design-system` qui affiche toutes les variantes.',
        'Ajoute une palette de couleurs générée depuis les tokens.',
        'Documente les props dans de petits tableaux et vérifie le contraste.',
      ],
      bonus: [
        'Ajoute un thème sombre complet et teste les contrastes.',
        'Ajoute un bouton « copier le code » à côté de chaque exemple.',
      ],
    },
  ],
}
