import type { Capstone } from '../types'
import { chapterSetup } from './01-setup'
import { chapterDesign } from './02-design'
import { chapterData } from './03-data'
import { chapterUi } from './04-ui'
import { chapterNavbar } from './05-navbar'
import { chapterHome } from './06-home'
import { chapterHomeSections } from './07-home-sections'
import { chapterAbout } from './08-about'
import { chapterBlog } from './09-blog'
import { chapterArticle } from './10-article'
import { chapterContact } from './11-contact'
import { chapterDeploy } from './12-deploy'

export const capstoneChapters = [
  chapterSetup,
  chapterDesign,
  chapterData,
  chapterUi,
  chapterNavbar,
  chapterHome,
  chapterHomeSections,
  chapterAbout,
  chapterBlog,
  chapterArticle,
  chapterContact,
  chapterDeploy,
]

export const capstone: Capstone = {
  slug: 'datasahel',
  title: 'DataSahel — le projet final',
  tagline: 'Reconstruis un vrai site de A à Z, avec sa charte, ses pages et sa mise en ligne.',
  description:
    "Le projet final du parcours : reproduire pas à pas le site DataSahel, un cabinet malien spécialisé en données et suivi-évaluation. Douze chapitres couvrent l'installation, le design system, les données, les composants, les six routes, l'accessibilité et le déploiement. À la fin, tu as une application React complète, déployable et présentable en portfolio.",
  level: 'Avancé',
  duration: '12 chapitres · environ 9 heures',
  demoUrl: 'https://datasahel.org',
  repoNote:
    "Le code de référence vit dans le dépôt DataSahel. Tu peux le consulter pour comparer, mais écris chaque fichier toi-même : c'est l'écriture qui fixe les réflexes.",
  stack: [
    'React 19',
    'TypeScript',
    'Vite 7',
    'Tailwind CSS 4',
    'React Router 7',
    'Framer Motion',
    'lucide-react',
  ],
  features: [
    'Six routes : accueil, à propos, blog, article, contact, 404',
    'Design system complet : sable, terre cuite, bleu nuit, motifs bogolan',
    'Composants réutilisables : Button, Reveal, Logo, PageHero, CtaBand',
    'Contenus typés : services, articles, chiffres, méthode, valeurs',
    'Blog filtrable et pages d’article avec articles liés',
    'Formulaire de contact validé côté client',
    'SEO par page, accessibilité clavier, prefers-reduced-motion',
    'Build de production et déploiement Vercel ou Netlify',
  ],
  outcomes: [
    'Concevoir et implémenter un design system Tailwind cohérent',
    'Structurer une application React multi-pages avec React Router',
    'Typer les contenus et séparer les données de la présentation',
    'Composer des animations sobres avec Framer Motion',
    'Construire des formulaires accessibles et validés',
    'Préparer un site pour la production et le déploiement',
  ],
  chapters: capstoneChapters,
}

export function getCapstoneChapter(slug: string) {
  return capstoneChapters.find((chapter) => chapter.slug === slug)
}

export function getCapstoneChapterByNumber(number: number) {
  return capstoneChapters.find((chapter) => chapter.number === number)
}

export const totalCapstoneChapters = capstoneChapters.length
