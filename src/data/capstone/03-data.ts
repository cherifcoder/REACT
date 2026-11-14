import type { CapstoneChapter } from '../types'

export const chapterData: CapstoneChapter = {
  slug: 'contenus-et-donnees',
  number: 3,
  title: 'Centraliser les contenus : coordonnées, services et articles',
  summary:
    "Aucun texte codé en dur dans les composants. Toutes les données du site vivent dans src/data et sont typées. C'est ce qui permet de modifier le site sans toucher au JSX.",
  duration: '50 min',
  blocks: [
    {
      type: 'p',
      text: "Le site contient beaucoup de contenu : coordonnées, six expertises, trois objectifs, quatre valeurs, cinq étapes de méthode, des articles. Si tu écris ces textes directement dans les pages, la moindre correction devient une chasse au trésor. On sépare donc **contenu** et **présentation**.",
    },
    {
      type: 'code',
      title: 'src/data/site.ts',
      lang: 'ts',
      code: `export const site = {
  name: 'DataSahel',
  tagline: 'Former, Analyser, Innover',
  baseline:
    "Une expertise locale adaptée aux réalités du terrain, au service de vos données.",
  email: 'contact@datasahel.org',
  emailAlt: 'cdiarra@datasahel.org',
  phone: '+223 69 50 50 62',
  phoneHref: 'tel:+22369505062',
  whatsapp: 'https://wa.me/22369505062',
  address: {
    street: 'Kalaban Coura ACI',
    city: 'Bamako',
    country: 'Mali',
  },
  socials: {
    facebook: 'https://web.facebook.com/profile.php?id=61579667091367',
    linkedin: 'https://www.linkedin.com/company/datasahel/about/',
  },
  founder: 'Chérif Soumaila Diarra',
} as const

export const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Expertises', to: '/#expertises' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
] as const

export const tools = [
  'Excel', 'Power BI', 'Python', 'R', 'Stata', 'SPSS', 'KoboToolbox',
  'ODK', 'SurveyCTO', 'NVivo', 'MAXQDA', 'Sphinx', 'Google Forms', 'Epi Info',
] as const

export const stats = [
  { value: 6, suffix: '', label: "domaines d'expertise", note: 'de la collecte à la décision' },
  { value: 14, suffix: '+', label: 'outils & logiciels', note: 'maîtrisés par notre équipe' },
  { value: 3, suffix: '', label: "formats d'intervention", note: 'présentiel, en ligne, hybride' },
  { value: 24, suffix: '/7', label: 'disponibilité', note: 'pour vos urgences terrain' },
] as const`,
    },
    {
      type: 'callout',
      tone: 'info',
      title: '`as const` sur un objet de configuration',
      text: "`as const` rend les propriétés en lecture seule et conserve les types littéraux. `site.email` reste une chaîne, mais TypeScript sait qu'elle n'est jamais réassignée. Combiné à l'export nommé, c'est un contrat clair pour toute l'application.",
    },
    {
      type: 'code',
      title: 'src/data/services.ts — le type et deux exemples',
      lang: 'ts',
      code: `export type ServiceIcon =
  | 'database'
  | 'smartphone'
  | 'target'
  | 'chart'
  | 'megaphone'
  | 'graduation'

export type Service = {
  id: string
  index: string
  title: string
  description: string
  bullets: string[]
  icon: ServiceIcon
}

export const services: Service[] = [
  {
    id: 'analyse',
    index: '01',
    title: 'Nettoyage & analyse statistique',
    description:
      'Nous transformons des données brutes et dispersées en résultats fiables, lisibles et actionnables.',
    bullets: [
      'Traitement, apurement et structuration des bases',
      'Analyses descriptives et modèles avancés',
      'STATA, R, Python, Excel, Power BI, NVivo, MAXQDA, Sphinx',
    ],
    icon: 'database',
  },
  {
    id: 'collecte',
    index: '02',
    title: 'Collecte de données digitale',
    description:
      'Des dispositifs de collecte robustes, pensés pour le terrain et supervisés de bout en bout.',
    bullets: [
      'Conception de formulaires et plan de sondage',
      'KoboToolbox, ODK, SurveyCTO, Survey Solutions, Epi Info, Google Forms',
      'Suivi terrain, contrôle qualité et audits de données',
    ],
    icon: 'smartphone',
  },
]`,
    },
    {
      type: 'p',
      text: "Le type `ServiceIcon` n'est pas décoratif : il garantit que chaque service référence une icône réellement gérée par la carte. Si tu ajoutes un service avec `icon: 'cloud'`, TypeScript refuse la compilation avant que l'interface ne casse.",
    },
    {
      type: 'code',
      title: 'src/data/services.ts — objectifs, valeurs et méthode',
      lang: 'ts',
      code: `export const objectives = [
  {
    index: 'I',
    title: 'Prestations techniques en gestion des données',
    points: [
      'Nettoyage, structuration et analyse statistique',
      'Mise en place de bases de données et tableaux de bord',
    ],
  },
  {
    index: 'II',
    title: 'Accompagnement et suivi-évaluation de projets',
    points: [
      'Systèmes de suivi-évaluation : indicateurs et reporting',
      'Collecte de terrain, évaluations d’impact et audits de données',
      'Rapports d’impact pour bailleurs et partenaires techniques',
    ],
  },
  {
    index: 'III',
    title: 'Formations spécialisées et ateliers pratiques',
    points: [
      'Excel, Power BI, Python, Stata, R, NVivo, MAXQDA, Sphinx',
      'Collecte mobile : KoboToolbox, ODK, Survey CTO, Survey Solutions',
      'Sessions adaptées aux ONG, PME et collectivités',
    ],
  },
]

export const values = [
  {
    title: 'Expertise locale',
    text: 'Une compréhension fine des réalités du terrain sahélien et des contraintes de vos projets.',
  },
  {
    title: 'Tarification accessible',
    text: 'Des prestations calibrées pour les petites structures, sans compromis sur la rigueur.',
  },
  {
    title: 'Approche pédagogique',
    text: 'Transférer les compétences, pas seulement livrer un rapport. Vos équipes gagnent en autonomie.',
  },
  {
    title: 'Communication visuelle',
    text: 'Des livrables professionnels qui donnent envie de lire, de comprendre et de décider.',
  },
]

export const processSteps = [
  {
    step: '01',
    title: 'Cadrage',
    text: 'Compréhension du contexte, des questions auxquelles les données doivent répondre et des contraintes du terrain.',
    tag: 'Objectifs & indicateurs',
  },
  {
    step: '02',
    title: 'Collecte',
    text: 'Conception des outils, plan de sondage, formulaires digitaux et supervision des équipes de terrain.',
    tag: 'Kobo · ODK · SurveyCTO',
  },
  {
    step: '03',
    title: 'Traitement',
    text: 'Nettoyage, apurement, documentation et structuration de bases de données fiables et réutilisables.',
    tag: 'Qualité des données',
  },
  {
    step: '04',
    title: 'Analyse',
    text: 'Statistiques descriptives et avancées, analyse d’impact et mise en perspective des résultats.',
    tag: 'R · Stata · Python',
  },
  {
    step: '05',
    title: 'Valorisation',
    text: 'Dashboards, infographies, rapports et ateliers de restitution pour transformer les résultats en décisions.',
    tag: 'Power BI · Dataviz',
  },
]`,
    },
    {
      type: 'p',
      text: "Les articles suivent le même principe, avec un type `Post` et un tableau. Le corps est un tableau de blocs typés, ce qui permet de le rendre sans `dangerouslySetInnerHTML` et sans dépendre d'un parseur Markdown.",
    },
    {
      type: 'code',
      title: 'src/data/posts.ts — structure',
      lang: 'ts',
      code: `export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'ul'; items: string[] }

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  dateISO: string
  readingTime: string
  cover: 'grid' | 'arcs' | 'bars' | 'rings'
  featured?: boolean
  body: Block[]
}

export const posts: Post[] = [
  {
    slug: 'stop-donnees',
    title: 'Stop ! Vos données sont un trésor endormi',
    excerpt:
      'Vos données d’entreprise peuvent révéler des opportunités insoupçonnées, optimiser vos processus et doper votre croissance. Encore faut-il savoir les réveiller.',
    category: 'Valorisation',
    date: '15 août 2025',
    dateISO: '2025-08-15',
    readingTime: '5 min',
    cover: 'grid',
    featured: true,
    body: [
      {
        type: 'p',
        text: 'Dans presque chaque organisation que nous accompagnons, la même scène se répète : des fichiers Excel empilés, des rapports jamais relus, des formulaires oubliés.',
      },
      { type: 'h2', text: 'Trois signaux qui montrent que vos données dorment' },
      {
        type: 'ul',
        items: [
          'Vous produisez des rapports dont personne ne se sert pour décider.',
          'Vos équipes ressaisissent plusieurs fois la même information.',
          'Vous ne savez pas répondre en moins de dix minutes à une question simple.',
        ],
      },
      {
        type: 'quote',
        text: 'Une donnée n’a de valeur que lorsqu’elle éclaire une décision.',
      },
    ],
  },
]`,
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Combien d’articles écrire ?',
      text: "Le site réel contient six articles, dont un article phare et cinq fiches méthodes. Commence par deux articles pour valider le rendu, puis complète. La qualité éditoriale compte plus que le volume : un blog avec quatre textes utiles inspire plus confiance qu'un blog avec vingt textes vides.",
    },
  ],
}
