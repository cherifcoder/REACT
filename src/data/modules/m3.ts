import type { CourseModule } from '../types'

export const module3: CourseModule = {
  slug: 'icones-et-ui',
  number: 3,
  title: 'Icônes et micro-interfaces',
  tagline: 'Une iconographie cohérente, accessible et animée.',
  description:
    "Les icônes ne sont pas de la décoration : elles guident l'action, réduisent la charge cognitive et donnent du caractère à une interface. Tu apprends à choisir une bibliothèque, à l'installer, à construire des boutons accessibles, à piloter des icônes depuis des données et à créer tes propres SVG.",
  icon: 'shapes',
  accent: 'coral',
  level: 'Débutant',
  duration: 300,
  outcomes: [
    'Choisir la bonne bibliothèque d’icônes selon le projet et la licence',
    'Installer et utiliser lucide-react avec la bonne taille et le bon trait',
    'Construire des boutons-icônes accessibles avec label et tooltip',
    'Piloter des icônes depuis des données avec un mapping typé',
    'Animer des icônes sans dégrader la lisibilité ni l’accessibilité',
    'Créer et optimiser un SVG sur mesure avec `currentColor`',
  ],
  lessons: [
    {
      id: 'choisir-librairie',
      title: 'Choisir une bibliothèque d’icônes',
      duration: 25,
      summary:
        "Comparer lucide, react-icons, heroicons et SVG maison : cohérence, poids, licence et maintenance.",
      blocks: [
        {
          type: 'p',
          text: "Une interface qui mélange trois styles d'icônes paraît amateur. Choisis **une seule famille** et garde-la du début à la fin. Les critères réels : cohérence du trait, poids du paquet, licence, facilité d'import et qualité de la documentation.",
        },
        {
          type: 'table',
          headers: ['Bibliothèque', 'Style', 'Points forts', 'À savoir'],
          rows: [
            ['lucide-react', 'Trait fin, géométrique', 'Très cohérent, tree-shakable, TypeScript', 'Notre choix pour tout le parcours'],
            ['react-icons', 'Agrège plusieurs familles', 'Énorme catalogue (Font Awesome, Feather…)', 'Poids plus difficile à maîtriser'],
            ['@heroicons/react', 'Trait et plein', 'Créé par l’équipe Tailwind', 'Deux styles, catalogue plus restreint'],
            ['SVG maison', 'Sur mesure', 'Contrôle total, zéro dépendance', 'À maintenir et à optimiser'],
            ['Phosphor', 'Plusieurs épaisseurs', 'Très expressif', 'Bundle plus lourd si mal importé'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'La règle des 24 pixels',
          text: "La plupart des bibliothèques dessinent sur une grille de 24×24. Utilise `size-4` (16 px), `size-5` (20 px) ou `size-6` (24 px) et garde la même taille pour toutes les icônes d'un même niveau. Une icône qui change de taille sans raison casse le rythme visuel.",
        },
        {
          type: 'code',
          title: 'Le même concept, trois imports',
          lang: 'tsx',
          code: `// lucide-react
import { Search } from 'lucide-react'
<Search className="size-5" />

// heroicons
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
<MagnifyingGlassIcon className="size-5" />

// react-icons (Font Awesome)
import { FaSearch } from 'react-icons/fa'
<FaSearch className="size-5" />`,
        },
        {
          type: 'list',
          items: [
            '**Cohérence avant quantité** : 40 icônes bien choisies suffisent à un produit.',
            '**Licence** : vérifie si ton client impose une licence commerciale ou une attribution.',
            '**Poids** : préfère les paquets qui permettent des imports nommés et le tree-shaking.',
            '**Accessibilité** : une icône seule doit toujours avoir un nom accessible.',
          ],
        },
      ],
    },
    {
      id: 'installer-lucide',
      title: 'Installer et utiliser lucide-react',
      duration: 30,
      summary:
        "Installation, tailles, couleur héritée, épaisseur du trait et bonnes pratiques d'import.",
      blocks: [
        {
          type: 'p',
          text: "Lucide est une bibliothèque d'icônes open source, cohérente et légère. Chaque icône est un composant React qui accepte les props SVG : `size`, `strokeWidth`, `color`, `className`, `aria-label`. La couleur par défaut est `currentColor`, donc l'icône hérite de la couleur du texte.",
        },
        {
          type: 'code',
          title: 'Installation',
          lang: 'bash',
          code: `npm install lucide-react`,
        },
        {
          type: 'code',
          title: 'Utilisation de base',
          lang: 'tsx',
          code: `import { ArrowRight, Check, Search, TriangleAlert } from 'lucide-react'

export function Demo() {
  return (
    <div className="space-y-3 text-brand-600">
      <Search className="size-5" />
      <Check className="size-5 text-green-600" />
      <TriangleAlert className="size-5 text-amber-600" />
      <ArrowRight className="size-5" strokeWidth={2.5} />
      <button className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-white">
        Continuer
        <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  )
}`,
        },
        {
          type: 'table',
          headers: ['Prop', 'Effet', 'Valeurs conseillées'],
          rows: [
            ['size', 'Largeur et hauteur', '16, 20, 24, 32'],
            ['strokeWidth', 'Épaisseur du trait', '1.5 pour le texte, 2 pour les boutons'],
            ['color', 'Couleur explicite', 'Préférer `className` et `currentColor`'],
            ['className', 'Classes Tailwind', '`size-5 text-brand-600`'],
            ['aria-hidden', 'Cache aux lecteurs d’écran', '`true` si l’icône est décorative'],
            ['aria-label', 'Nom accessible', 'Obligatoire si l’icône porte le sens'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Icône décorative ou informative ?',
          text: "Si le texte à côté de l'icône dit déjà « Supprimer », l'icône est décorative : mets `aria-hidden=\"true\"`. Si l'icône est seule dans un bouton, elle doit avoir un `aria-label` ou un texte caché (`sr-only`). C'est la différence entre un bouton utilisable au lecteur d'écran et un bouton muet.",
        },
        {
          type: 'code',
          title: 'Les deux cas, correctement',
          lang: 'tsx',
          code: `// Cas 1 : l'icône accompagne un texte → décorative
<button className="flex items-center gap-2">
  <Trash2 className="size-4" aria-hidden="true" />
  Supprimer
</button>

// Cas 2 : l'icône est seule → nom accessible
<button aria-label="Supprimer la tâche" className="rounded-lg p-2 hover:bg-red-50">
  <Trash2 className="size-5 text-red-600" aria-hidden="true" />
</button>

// Variante avec texte visible pour les lecteurs d'écran
<button className="p-2">
  <X className="size-5" aria-hidden="true" />
  <span className="sr-only">Fermer</span>
</button>`,
        },
      ],
    },
    {
      id: 'boutons-icones',
      title: 'Boutons-icônes, labels et tooltips',
      duration: 35,
      summary:
        "Construire des actions icônes claires, avec zone de clic suffisante, focus visible et infobulle.",
      blocks: [
        {
          type: 'p',
          text: "Un bouton-icône doit être **reconnaissable**, **accessible** et **facile à cliquer**. Une croix, un crayon ou une corbeille sont compris universellement. Une icône abstraite a besoin d'un libellé visible ou d'une infobulle. La zone de clic minimale recommandée est de 44×44 px sur mobile.",
        },
        {
          type: 'code',
          title: 'IconButton réutilisable',
          lang: 'tsx',
          code: `import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  tone?: 'neutral' | 'danger'
}

export function IconButton({
  label,
  tone = 'neutral',
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'inline-grid size-10 place-items-center rounded-xl border transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
        'disabled:pointer-events-none disabled:opacity-40',
        tone === 'neutral'
          ? 'border-ink-900/10 text-ink-700 hover:bg-ink-900/5'
          : 'border-red-500/20 text-red-600 hover:bg-red-50',
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
          type: 'h',
          text: 'Une infobulle CSS simple',
        },
        {
          type: 'code',
          lang: 'tsx',
          code: `<div className="group relative inline-flex">
  <button aria-label="Copier le lien" className="rounded-lg p-2 hover:bg-ink-900/5">
    <LinkIcon className="size-5" />
  </button>
  <span
    role="tooltip"
    className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2
               rounded-md bg-ink-900 px-2 py-1 text-xs whitespace-nowrap text-white
               opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100"
  >
    Copier le lien
  </span>
</div>`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Tooltip ≠ label accessible',
          text: "Une infobulle visuelle ne remplace pas `aria-label`. Elle aide les utilisateurs souris, mais un lecteur d'écran ne la lira pas de façon fiable. Garde toujours un nom accessible sur le bouton.",
        },
        {
          type: 'list',
          items: [
            'Une seule action principale par zone : évite les rangées de cinq icônes sans hiérarchie.',
            'Utilise une couleur sémantique : rouge pour supprimer, vert pour valider, neutre pour le reste.',
            'Le focus clavier doit être visible : `focus-visible:ring-2`.',
            'Sur mobile, espace les icônes d’au moins 8 px pour éviter les clics accidentels.',
          ],
        },
      ],
    },
    {
      id: 'icones-dynamiques',
      title: 'Icônes pilotées par les données',
      duration: 35,
      summary:
        "Mapper des clés de données vers des composants lucide avec un typage sûr et un fallback.",
      blocks: [
        {
          type: 'p',
          text: "Dans un tableau de services, une sidebar ou un tableau de bord, les icônes viennent souvent de données. Tu ne peux pas écrire `<service.icon />` avec une chaîne. La solution : un **mapping** entre une clé stable et le composant importé, typé avec `LucideIcon`.",
        },
        {
          type: 'code',
          title: 'Mapping typé avec fallback',
          lang: 'tsx',
          code: `import {
  BarChart3,
  Database,
  GraduationCap,
  LineChart,
  MapPin,
  type LucideIcon,
} from 'lucide-react'

export const icons = {
  chart: BarChart3,
  database: Database,
  training: GraduationCap,
  analytics: LineChart,
  location: MapPin,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof icons

export function DynamicIcon({
  name,
  className,
}: {
  name: IconName
  className?: string
}) {
  const Icon = icons[name] ?? Database
  return <Icon className={className} aria-hidden="true" />
}`,
        },
        {
          type: 'code',
          title: 'Utilisation depuis des données',
          lang: 'tsx',
          code: `type Service = {
  title: string
  description: string
  icon: IconName
}

const services: Service[] = [
  { title: 'Collecte', description: 'KoboToolbox, ODK…', icon: 'database' },
  { title: 'Analyse', description: 'Python, R, Stata…', icon: 'analytics' },
  { title: 'Formation', description: 'Ateliers pratiques', icon: 'training' },
]

export function ServiceGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <article key={service.title} className="rounded-2xl border p-6">
          <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <DynamicIcon name={service.icon} className="size-5" />
          </span>
          <h3 className="mt-4 font-semibold">{service.title}</h3>
          <p className="mt-1 text-sm text-ink-600">{service.description}</p>
        </article>
      ))}
    </div>
  )
}`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'N’accepte pas n’importe quelle chaîne',
          text: "Si le nom vient d'une API, valide-le avant de le passer au mapping. Sinon, prévois un fallback et un type union. Ne fais jamais `import * as icons from 'lucide-react'` puis `icons[name]` : cela peut casser le tree-shaking et embarquer des centaines d'icônes.",
        },
        {
          type: 'table',
          headers: ['Besoin', 'Solution'],
          rows: [
            ['Icône fixe', 'Import direct du composant'],
            ['Icône depuis des données internes', 'Mapping typé `satisfies Record<string, LucideIcon>`'],
            ['Icône depuis une API', 'Valider la clé + fallback'],
            ['Icône avec couleur dynamique', 'Classe complète dans une map, pas de concaténation'],
          ],
        },
      ],
    },
    {
      id: 'animer-icones',
      title: 'Animer les icônes avec retenue',
      duration: 30,
      summary:
        "Transitions, rotations, micro-interactions et respect de prefers-reduced-motion.",
      blocks: [
        {
          type: 'p',
          text: "Une icône qui bouge au bon moment donne un retour immédiat : une flèche qui glisse, un chevron qui pivote, un cœur qui pulse. Une icône qui bouge tout le temps distrait. La règle : **animer sur interaction**, pas en permanence, et rester sous 300 ms.",
        },
        {
          type: 'code',
          title: 'Flèche, chevron et chargement',
          lang: 'tsx',
          code: `// Flèche qui avance au survol du bouton
<button className="group flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-white">
  Continuer
  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
</button>

// Chevron qui pivote quand l'accordéon est ouvert
<ChevronDown
  className={'size-5 transition-transform ' + (isOpen ? 'rotate-180' : '')}
/>

// Icône de chargement
<LoaderCircle className="size-5 animate-spin" aria-hidden="true" />`,
        },
        {
          type: 'code',
          title: 'Un cœur qui pulse au clic',
          lang: 'tsx',
          code: `import { Heart } from 'lucide-react'
import { useState } from 'react'

export function LikeButton() {
  const [liked, setLiked] = useState(false)

  return (
    <button
      onClick={() => setLiked((value) => !value)}
      aria-pressed={liked}
      className="flex items-center gap-2 rounded-full border px-4 py-2"
    >
      <Heart
        className={
          'size-5 transition ' +
          (liked ? 'scale-110 fill-coral-500 text-coral-500' : 'text-ink-500')
        }
      />
      {liked ? 'Aimé' : 'Aimer'}
    </button>
  )
}`,
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Accessibilité du mouvement',
          text: "Ajoute une media query `prefers-reduced-motion` globale dans ton CSS (nous l'avons fait dans `index.css`). Les animations deviennent alors quasi instantanées pour les personnes sensibles au mouvement, sans casser l'interface.",
        },
        {
          type: 'list',
          items: [
            '`transition` + `group-hover` pour les micro-interactions.',
            '`animate-spin` pour un chargement, jamais pour décorer.',
            '`rotate-180` pour un chevron d’accordéon.',
            '`fill-current` pour remplir une icône au clic (cœur, étoile).',
            'Pas plus d’une animation simultanée par zone.',
          ],
        },
      ],
    },
    {
      id: 'svg-sur-mesure',
      title: 'Créer un SVG sur mesure',
      duration: 30,
      summary:
        "Comprendre viewBox, currentColor et l'optimisation pour dessiner un logo ou une icône maison.",
      blocks: [
        {
          type: 'p',
          text: "Parfois, aucune bibliothèque ne correspond : logo de marque, pictogramme métier, motif décoratif. Un SVG inline est alors idéal : il hérite de la couleur du texte, reste net à toutes les tailles et se style avec Tailwind.",
        },
        {
          type: 'code',
          title: 'Un logo simple, accessible et coloriable',
          lang: 'tsx',
          code: `type LogoProps = {
  className?: string
  title?: string
}

export function Logo({ className, title = 'DataSahel' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
    >
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 25c4-8 12-10 16-10M12 20c3-5 9-7 14-7M15 29c3-5 7-7 11-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="27" cy="15" r="2.5" fill="var(--color-coral-500)" />
    </svg>
  )
}

// Usage : la couleur suit le texte
<Logo className="size-10 text-brand-600" />`,
        },
        {
          type: 'h',
          text: 'Les attributs à maîtriser',
        },
        {
          type: 'table',
          headers: ['Attribut', 'Rôle', 'Conseil'],
          rows: [
            ['viewBox', 'Définit le système de coordonnées', 'Toujours présent, souvent `0 0 24 24`'],
            ['fill / stroke', 'Remplissage et contour', '`currentColor` pour hériter de la couleur'],
            ['strokeWidth', 'Épaisseur du trait', 'Cohérent avec la bibliothèque choisie'],
            ['strokeLinecap', 'Extrémités du trait', '`round` pour un rendu doux'],
            ['role + aria-label', 'Accessibilité', '`role="img"` + label si le SVG porte du sens'],
            ['aria-hidden', 'Décoratif', '`true` si le texte voisin suffit'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Optimise tes SVG',
          text: "Passe les fichiers dans SVGO (ou svgoptimizer.com) avant de les intégrer. Supprime les métadonnées d'export, arrondis les coordonnées et nomme correctement `viewBox`. Un logo peut passer de 8 Ko à 1 Ko.",
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Ne mets pas un SVG complexe dans le JSX à la main',
          text: "Pour une illustration détaillée, place le fichier dans `public/` et utilise `<img src=\"/illustration.svg\" alt=\"...\" />`. Le SVG inline est réservé aux petites icônes que tu veux colorier ou animer.",
        },
      ],
    },
  ],
  projects: [
    {
      id: 'm3-p1',
      moduleId: 'm3',
      title: 'Galerie d’icônes',
      level: 2,
      time: '30 min',
      summary:
        "Une page qui affiche 24 icônes lucide avec leur nom et un bouton pour copier l’import.",
      skills: ['lucide-react', 'grid', 'clipboard', 'mapping'],
      steps: [
        'Importe 24 icônes nommées et place-les dans un tableau `{ name, Icon }`.',
        'Affiche une grille `grid-cols-3 sm:grid-cols-4 lg:grid-cols-6` de cartes.',
        'Chaque carte montre l’icône en `size-6`, son nom en `font-mono` et un bouton copier.',
        'Utilise `navigator.clipboard.writeText` et affiche « Copié ! » pendant 1,5 s.',
        'Ajoute un champ de recherche qui filtre les icônes par nom.',
      ],
      bonus: [
        'Ajoute un sélecteur de taille (16, 20, 24, 32) qui s’applique à toutes les icônes.',
        'Ajoute un mode « fond sombre » pour tester les contrastes.',
      ],
    },
    {
      id: 'm3-p2',
      moduleId: 'm3',
      title: 'Sidebar d’application',
      level: 2,
      time: '40 min',
      summary:
        "Une navigation latérale avec icônes, badge de notification et état actif.",
      skills: ['navigation', 'icônes', 'état actif', 'responsive'],
      steps: [
        'Crée un tableau de liens avec `label`, `icon`, `href` et un badge optionnel.',
        'Affiche le logo en haut, les liens au centre et le profil en bas.',
        'Style le lien actif avec un fond `bg-brand-50 text-brand-700`.',
        'Affiche les badges de notification en `ml-auto` avec un fond coral.',
        'Sur mobile, transforme la sidebar en barre inférieure fixe.',
      ],
      bonus: [
        'Ajoute un bouton de repli qui réduit la sidebar à 72 px.',
        'Ajoute un tooltip sur les icônes quand la sidebar est repliée.',
      ],
    },
    {
      id: 'm3-p3',
      moduleId: 'm3',
      title: 'Grille de fonctionnalités',
      level: 2,
      time: '35 min',
      summary:
        "Six fonctionnalités avec icônes dans des pastilles colorées et un lien d’action.",
      skills: ['données', 'icônes dynamiques', 'grid'],
      steps: [
        'Crée un tableau de 6 fonctionnalités avec `title`, `description`, `icon`, `tone`.',
        'Mappe les tons vers des classes de fond et de texte complètes.',
        'Affiche chaque icône dans une pastille `size-11 rounded-xl`.',
        'Ajoute une flèche `ArrowUpRight` qui se déplace au survol de la carte.',
        'Vérifie que les six pastilles ont des couleurs distinctes mais harmonieuses.',
      ],
      bonus: [
        'Ajoute une septième carte mise en avant avec un fond sombre.',
        'Ajoute un filtre par catégorie.',
      ],
    },
    {
      id: 'm3-p4',
      moduleId: 'm3',
      title: 'Footer avec réseaux sociaux',
      level: 2,
      time: '30 min',
      summary:
        "Un pied de page complet avec logo, colonnes de liens et icônes sociales accessibles.",
      skills: ['layout', 'svg', 'accessibilité', 'liens'],
      steps: [
        'Crée un footer en `grid gap-10 md:grid-cols-4`.',
        'Ajoute le logo et une phrase de présentation dans la première colonne.',
        'Ajoute trois colonnes de liens (Produit, Ressources, Entreprise).',
        'Ajoute les icônes Facebook, LinkedIn, X et Instagram avec `aria-label`.',
        'Ajoute une barre inférieure avec le copyright et les mentions légales.',
      ],
      bonus: [
        'Ajoute un formulaire d’inscription à la newsletter.',
        'Ajoute un lien « Retour en haut » avec une icône `ArrowUp`.',
      ],
    },
    {
      id: 'm3-p5',
      moduleId: 'm3',
      title: 'Toggle de thème animé',
      level: 3,
      time: '45 min',
      summary:
        "Un bouton soleil/lune qui bascule le mode sombre avec une transition soignée.",
      skills: ['thème', 'icônes', 'localStorage', 'animation'],
      steps: [
        'Crée un état `theme` initialisé depuis `localStorage` ou `prefers-color-scheme`.',
        'Applique ou retire la classe `dark` sur `document.documentElement`.',
        'Affiche `Sun` en mode sombre et `Moon` en mode clair.',
        'Ajoute une rotation et un changement d’opacité pendant la bascule.',
        'Persiste le choix et ajoute un script anti-flash dans `index.html`.',
      ],
      bonus: [
        'Ajoute un troisième mode « système » qui suit la préférence de l’OS.',
        'Synchronise le thème entre plusieurs onglets avec l’événement `storage`.',
      ],
    },
    {
      id: 'm3-p6',
      moduleId: 'm3',
      title: 'Badges de statut',
      level: 3,
      time: '35 min',
      summary:
        "Un système de badges avec icône, couleur et libellé pour des statuts métier.",
      skills: ['variantes', 'icônes', 'types', 'design system'],
      steps: [
        'Définis un union `Status = "actif" | "en_attente" | "suspendu" | "termine"`.',
        'Crée une configuration avec label, icône, classes de couleur.',
        'Construis un composant `StatusBadge` qui reçoit le statut.',
        'Affiche les quatre variantes dans une démo.',
        'Ajoute un point animé (`animate-pulse`) uniquement pour « actif ».',
      ],
      bonus: [
        'Ajoute un `title` explicatif sur chaque badge.',
        'Utilise le badge dans un tableau de commandes factices.',
      ],
    },
    {
      id: 'm3-p7',
      moduleId: 'm3',
      title: 'Notation par étoiles',
      level: 4,
      time: '50 min',
      summary:
        "Un composant de notation accessible au clavier, avec survol et demi-étoiles.",
      skills: ['état', 'icônes', 'accessibilité', 'clavier'],
      steps: [
        'Crée un composant `Rating` avec `value`, `onChange` et `max = 5`.',
        'Affiche cinq étoiles ; remplies si l’index est inférieur ou égal à la note.',
        'Au survol, prévisualise la note sans la valider.',
        'Au clic, appelle `onChange(index)`; au clavier, gère les flèches.',
        'Ajoute `role="radiogroup"` et des `aria-label` du type « Noter 3 sur 5 ».',
      ],
      bonus: [
        'Ajoute un mode lecture seule avec la note moyenne et le nombre d’avis.',
        'Ajoute une animation de scale sur l’étoile sélectionnée.',
      ],
    },
    {
      id: 'm3-p8',
      moduleId: 'm3',
      title: 'Explorateur de fichiers',
      level: 4,
      time: '1 h',
      summary:
        "Une arborescence de dossiers avec icônes, ouverture/fermeture et fichiers sélectionnés.",
      skills: ['récursion', 'icônes', 'état', 'arborescence'],
      steps: [
        'Définis un type `Node = { id, name, type: "folder" | "file", children? }`.',
        'Crée un composant récursif `TreeNode` qui affiche l’icône adaptée.',
        'Stocke les dossiers ouverts dans un `Set<string>`.',
        'Au clic sur un dossier, bascule son ouverture ; sur un fichier, sélectionne-le.',
        'Affiche le chemin du fichier sélectionné dans un panneau latéral.',
      ],
      bonus: [
        'Ajoute la recherche de fichier avec surlignage du résultat.',
        'Ajoute un compteur de fichiers par dossier.',
      ],
    },
    {
      id: 'm3-p9',
      moduleId: 'm3',
      title: 'Barre de recherche riche',
      level: 4,
      time: '1 h',
      summary:
        "Une recherche avec icône, raccourci clavier, suggestions et état vide.",
      skills: ['formulaires', 'icônes', 'clavier', 'filtrage'],
      steps: [
        'Crée une barre avec une icône `Search` à gauche et un raccourci `⌘K` à droite.',
        'Ajoute un `useRef` pour focus le champ au clavier (Ctrl/Cmd + K).',
        'Filtre une liste de commandes au fur et à mesure de la saisie.',
        'Affiche les suggestions dans un panneau absolu sous le champ.',
        'Affiche un état « Aucun résultat » avec une icône `SearchX`.',
      ],
      bonus: [
        'Ajoute la navigation dans les suggestions avec les flèches et Entrée.',
        'Ajoute un bouton pour effacer la recherche avec une icône `X`.',
      ],
    },
    {
      id: 'm3-p10',
      moduleId: 'm3',
      title: 'Centre de notifications',
      level: 5,
      time: '1 h 30',
      summary:
        "Un panneau de notifications avec types, icônes, non-lues, filtres et action « tout marquer comme lu ».",
      skills: ['état', 'icônes', 'filtres', 'composition'],
      steps: [
        'Crée un tableau de notifications avec `id`, `type`, `title`, `message`, `read`, `date`.',
        'Mappe chaque type vers une icône et une couleur : succès, alerte, info, message.',
        'Affiche un badge avec le nombre de non-lues sur la cloche.',
        'Ouvre un panneau au clic et liste les notifications triées par date.',
        'Ajoute les actions « marquer comme lu » et « tout marquer comme lu ».',
      ],
      bonus: [
        'Ajoute un filtre Toutes / Non lues.',
        'Ajoute une animation d’apparition et une fermeture au clic extérieur.',
      ],
    },
  ],
}
