import type { CapstoneChapter } from '../types'

export const chapterDeploy: CapstoneChapter = {
  slug: 'finitions-et-deploiement',
  number: 12,
  title: 'SEO, accessibilité, footer et mise en ligne',
  summary:
    "Dernière étape : donner au site une finition professionnelle. Métadonnées par page, footer complet, page 404, fichiers de réécriture pour l'hébergement, accessibilité, performance et déploiement sur Vercel ou Netlify.",
  duration: '50 min',
  blocks: [
    {
      type: 'p',
      text: "Le site fonctionne, toutes les pages sont écrites. Il reste ce qui distingue un exercice d'un **vrai site en production** : un titre et une description uniques par page, un footer qui prolonge la navigation, une 404 utile, des fichiers de réécriture pour que les URL profondes ne cassent pas au rafraîchissement, et une vérification systématique de l'accessibilité et des performances.",
    },
    {
      type: 'p',
      text: "Cette dernière étape se fait dans l'ordre : SEO, footer, 404, fichiers d'hébergement, checklist d'accessibilité, puis build et déploiement. Chaque point est court, mais aucun n'est optionnel si tu veux montrer ce projet dans un portfolio.",
    },
    { type: 'h', text: '1. Des métadonnées uniques par page' },
    {
      type: 'p',
      text: "Une application React n'a qu'un seul `index.html`. Sans intervention, toutes les pages partagent donc le même titre et la même description. Le composant `Seo` corrige cela à chaque changement de route : il met à jour `document.title` et la balise `meta[name=\"description\"]` dans un `useEffect`.",
    },
    {
      type: 'code',
      title: 'src/components/Seo.tsx',
      lang: 'tsx',
      code: `import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site'

type SeoProps = {
  title: string
  description?: string
}

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = \`\${title} — \${site.name}\`

    if (description) {
      const tag = document.querySelector('meta[name="description"]')
      if (tag) tag.setAttribute('content', description)
    }
  }, [title, description])

  return null
}`,
    },
    {
      type: 'p',
      text: "Chaque page appelle ensuite le composant avec ses propres valeurs : `<Seo title=\"À propos\" description=\"...\" />`. La page d'accueil garde le titre le plus important, les pages internes précisent leur sujet.",
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Ce que le SEO côté client ne fait pas',
      text: "Les robots de Google exécutent le JavaScript et voient donc ces balises, mais les aperçus de partage sur les réseaux sociaux (Open Graph) lisent le HTML brut. Pour un partage parfait, ajoute les balises `og:title`, `og:description` et `og:image` dans `index.html` avec des valeurs par défaut, ou passe à un framework avec rendu serveur. Pour un site vitrine, les valeurs par défaut suffisent.",
    },
    { type: 'h', text: '2. Le footer : refermer la page' },
    {
      type: 'p',
      text: "Le footer reprend le logo, la baseline, les réseaux sociaux, les liens de navigation, les expertises et les coordonnées. Il se termine par une signature typographique géante et une barre légale. C'est le dernier endroit où un visiteur hésitant trouve son chemin.",
    },
    {
      type: 'code',
      title: 'src/components/Footer.tsx',
      lang: 'tsx',
      code: `import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { navLinks, site } from '../data/site'
import { services } from '../data/services'
import { Logo } from './Logo'
import { SocialLinks } from './SocialLinks'
import { Arcs } from './Patterns'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-sand-100">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-clay-500/60 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 dot-grid-light opacity-40"
        aria-hidden="true"
      />
      <Arcs className="pointer-events-none absolute -top-40 -right-40 size-[34rem] text-sand-100/[0.06]" />

      <div className="shell relative grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Link to="/" aria-label="DataSahel — accueil">
            <Logo tone="light" />
          </Link>
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-sand-100/65">
            {site.baseline} Collecte, analyse, visualisation et valorisation des données
            pour les organisations, institutions et jeunes professionnels en Afrique.
          </p>
          <SocialLinks tone="light" className="mt-7" />
        </div>

        <div className="lg:col-span-2">
          <p className="kicker text-sand-100/65">Explorer</p>
          <ul className="mt-5 space-y-3 text-[0.92rem]">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="group inline-flex items-center gap-1.5 text-sand-100/70 transition hover:text-sand-50"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="kicker text-sand-100/65">Expertises</p>
          <ul className="mt-5 space-y-3 text-[0.92rem]">
            {services.slice(0, 5).map((service) => (
              <li key={service.id}>
                <Link
                  to="/#expertises"
                  className="text-sand-100/70 transition hover:text-sand-50"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="kicker text-sand-100/65">Nous joindre</p>
          <ul className="mt-5 space-y-4 text-[0.92rem]">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-clay-400" strokeWidth={1.7} />
              <span className="text-sand-100/70">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.country}
              </span>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 text-sand-100/70 transition hover:text-sand-50"
              >
                <Phone className="size-4 shrink-0 text-clay-400" strokeWidth={1.7} />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={\`mailto:\${site.email}\`}
                className="flex items-start gap-3 text-sand-100/70 transition hover:text-sand-50"
              >
                <Mail className="mt-0.5 size-4 shrink-0 text-clay-400" strokeWidth={1.7} />
                <span>
                  {site.email}
                  <br />
                  {site.emailAlt}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative select-none overflow-hidden" aria-hidden="true">
        <p className="shell -mb-[0.32em] font-display text-[19vw] leading-[0.75] font-semibold tracking-[-0.05em] text-sand-50/[0.045]">
          DataSahel
        </p>
      </div>

      <div className="relative border-t border-sand-100/10">
        <div className="shell flex flex-col gap-4 py-6 text-[0.78rem] text-sand-100/65 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name}. Tous droits réservés.</p>
          <p className="font-mono text-[0.68rem] tracking-[0.18em] uppercase">
            {site.tagline} — Bamako, Mali
          </p>
          <div className="flex gap-6">
            <Link to="/contact" className="transition hover:text-sand-50">
              Centre d'aide
            </Link>
            <Link to="/contact" className="transition hover:text-sand-50">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}`,
    },
    {
      type: 'p',
      text: "Le footer est monté une seule fois dans le `Layout`, sous le `<Outlet />`. Toutes les pages en héritent, et la navigation secondaire reste cohérente partout.",
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Les liens du footer sont de vrais liens',
      text: "On utilise `<Link>` pour les routes internes et `<a>` pour les liens externes, `tel:` et `mailto:`. Un `<div onClick>` ne serait ni accessible au clavier, ni indexable, ni ouvrable dans un nouvel onglet.",
    },
    { type: 'h', text: '3. Une page 404 vraiment utile' },
    {
      type: 'p',
      text: "La route `*` capture toutes les URL inconnues. Plutôt qu'un simple message d'erreur, la page propose de repartir vers l'accueil ou le contact, et conserve l'identité graphique du site. Un visiteur perdu ne doit jamais atterrir sur une impasse.",
    },
    {
      type: 'code',
      title: 'src/pages/NotFound.tsx',
      lang: 'tsx',
      code: `import { Seo } from '../components/Seo'
import { Button } from '../components/Button'
import { Arcs } from '../components/Patterns'

export function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-20">
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-30" />
      <Arcs className="pointer-events-none absolute -top-20 -right-20 size-[28rem] text-clay-500/20" />

      <div className="shell relative max-w-2xl">
        <p className="font-display text-[7rem] leading-none font-semibold text-clay-500/25 sm:text-[10rem]">
          404
        </p>
        <h1 className="display-lg mt-2">Cette page s'est perdue dans les données.</h1>
        <p className="mt-5 max-w-lg leading-relaxed text-ink/70">
          Le lien est peut-être obsolète, ou la page a été déplacée.
          Reprenons depuis un point connu.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/" size="lg">
            Retour à l'accueil
          </Button>
          <Button to="/contact" variant="outline" size="lg">
            Nous contacter
          </Button>
        </div>
      </div>

      <Seo title="Page introuvable" />
    </section>
  )
}`,
    },
    { type: 'h', text: "4. Les fichiers qui font fonctionner l'hébergement" },
    {
      type: 'p',
      text: "Une application React est une **single page application** : le serveur ne connaît que `index.html`. Si un visiteur ouvre directement `https://datasahel.org/blog/mon-article`, l'hébergeur cherche un fichier à ce chemin, ne le trouve pas et renvoie une 404 — avant même que React ne démarre. La solution est une règle de réécriture : toutes les URL inconnues renvoient `index.html`, et React Router prend le relais.",
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
      title: 'public/_redirects — pour Netlify',
      lang: 'text',
      code: `/*    /index.html   200`,
    },
    {
      type: 'p',
      text: "Sur Netlify, le fichier `_redirects` placé dans `public/` est copié tel quel dans `dist/` au build. Sur Vercel, `vercel.json` à la racine du projet joue le même rôle. Ces deux fichiers ne s'excluent pas : garde les deux si tu veux pouvoir changer d'hébergeur sans y penser.",
    },
    { type: 'h', text: '5. Sitemap et robots.txt' },
    {
      type: 'p',
      text: "Un sitemap liste les URL publiques pour aider les moteurs de recherche à découvrir le site. Il est statique ici, ce qui suffit pour cinq pages. Si le blog devient dynamique, génère-le au build à partir des articles.",
    },
    {
      type: 'code',
      title: 'public/sitemap.xml',
      lang: 'xml',
      code: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://datasahel.org/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://datasahel.org/a-propos</loc>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://datasahel.org/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://datasahel.org/contact</loc>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`,
    },
    {
      type: 'code',
      title: 'public/robots.txt',
      lang: 'text',
      code: `User-agent: *
Allow: /

Sitemap: https://datasahel.org/sitemap.xml`,
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'Remplace le domaine avant de publier',
      text: "Les URL du sitemap et de `robots.txt` sont en dur. Si le site est déployé sur `datasahel.vercel.app`, mets à jour ces fichiers, ou génère-les depuis une constante `site.url` au moment du build. Un sitemap qui pointe vers le mauvais domaine est pire que pas de sitemap.",
    },
    { type: 'h', text: "6. Checklist d'accessibilité" },
    {
      type: 'p',
      text: "L'accessibilité n'est pas une couche ajoutée à la fin : elle se vérifie. Passe cette liste page par page, au clavier uniquement, puis avec un lecteur d'écran si tu peux. Chaque ligne corrigée est un vrai progrès, pas une case cochée pour la forme.",
    },
    {
      type: 'table',
      headers: ['Point', 'Règle', 'Où le vérifier'],
      rows: [
        ['Contraste', 'Texte normal ≥ 4,5:1, grand texte ≥ 3:1', 'Texte sable sur bleu nuit, texte gris sur blanc cassé'],
        ['Focus', 'Chaque élément interactif a un anneau visible', 'Tab sur toute la page, menu ouvert'],
        ['Clavier', 'Menu, filtres, formulaire utilisables sans souris', 'Navigation complète au clavier'],
        ['Images', '`alt` utile ou `alt=""` si décoratif', 'Logo, cartes, visuels de hero'],
        ['Titres', 'Un seul `h1` par page, hiérarchie sans saut', 'Chaque page, chaque article'],
        ['Liens', 'Libellé compréhensible hors contexte', 'Éviter « cliquez ici »'],
        ['Formulaires', '`label` associé, erreurs annoncées', 'Formulaire de contact, champs invalides'],
        ['Mouvement', '`prefers-reduced-motion` respecté', 'Animations Framer Motion, marquee'],
        ['Langue', '`lang="fr"` sur `<html>`', '`index.html`'],
        ['Sémantique', '`header`, `nav`, `main`, `footer`, `section`', '`Layout`, pages'],
      ],
    },
    {
      type: 'p',
      text: "Le respect de `prefers-reduced-motion` se règle à deux endroits : la feuille de style globale coupe les animations CSS, et les composants Framer Motion lisent la préférence avec `useReducedMotion()` pour désactiver les déplacements les plus marqués.",
    },
    {
      type: 'code',
      title: 'src/components/Reveal.tsx — version réduite',
      lang: 'tsx',
      code: `import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}`,
    },
    { type: 'h', text: '7. Construire et contrôler avant de publier' },
    {
      type: 'p',
      text: "Le build de production est le premier vrai test : TypeScript strict, Tailwind qui purge les classes inutilisées, Vite qui découpe les bundles. Lance-le, puis prévisualise le résultat — c'est ce dossier `dist/` qui partira en ligne.",
    },
    {
      type: 'code',
      title: 'Terminal — build et prévisualisation',
      lang: 'bash',
      code: `npm run build
npm run preview`,
    },
    {
      type: 'p',
      text: "Ouvre ensuite l'URL de prévisualisation et fais le tour du site : chaque route, un rafraîchissement sur une URL profonde, le menu mobile, le formulaire, les liens du footer. Une erreur de build est facile à corriger ; une page blanche en production l'est beaucoup moins.",
    },
    {
      type: 'list',
      ordered: true,
      items: [
        "`npm run build` passe sans erreur TypeScript.",
        "`npm run preview` affiche le site et toutes les routes répondent.",
        "Un rafraîchissement sur `/blog/:slug` ne renvoie pas de 404 (réécriture active).",
        "Le menu mobile s'ouvre, se ferme avec Échap et piège le focus.",
        "Le formulaire affiche ses erreurs et prépare le mail.",
        "Les images ont un `alt` et les boutons icônes un `aria-label`.",
        "La page se navigue entièrement au clavier.",
        "Le titre de l'onglet change à chaque page.",
      ],
    },
    { type: 'h', text: '8. Déployer sur Vercel' },
    {
      type: 'p',
      text: "Vercel détecte Vite automatiquement. La seule vérification utile concerne les URL profondes : le fichier `vercel.json` doit être présent à la racine, sinon `/blog/mon-article` renverra une 404 au rechargement.",
    },
    {
      type: 'steps',
      items: [
        {
          title: 'Pousser le projet sur GitHub',
          text: "Crée un dépôt, puis `git add .`, `git commit -m \"DataSahel — site React\"`, `git remote add origin …` et `git push -u origin main`.",
        },
        {
          title: 'Importer sur Vercel',
          text: "Depuis le tableau de bord, « Add New Project », choisis le dépôt. Le framework est détecté comme Vite : build `npm run build`, dossier de sortie `dist`.",
        },
        {
          title: 'Vérifier les variables et le domaine',
          text: "Aucune variable n'est nécessaire ici. Ajoute le domaine personnalisé si tu en as un, puis attends la propagation DNS.",
        },
        {
          title: 'Tester la production',
          text: "Ouvre l'URL publique, recharge une page interne, vérifie le titre des onglets et le formulaire. Chaque nouveau `git push` redéploie automatiquement.",
        },
      ],
    },
    {
      type: 'p',
      text: "Sur Netlify, le principe est identique : build `npm run build`, dossier `dist`, et le fichier `public/_redirects` fait office de règle de réécriture. Sur GitHub Pages, il faut en plus configurer le `base` de Vite et une astuce de `404.html` : Vercel ou Netlify restent plus simples pour une SPA.",
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Le projet est terminé — et démontrable',
      text: "Tu as maintenant un site complet : six routes, un design system, des données typées, des animations sobres, un formulaire validé, un blog filtrable, une page 404 et un déploiement reproductible. C'est exactement le genre de projet à mettre en avant : il montre du React, du TypeScript, du Tailwind, du routing, de l'accessibilité et une vraie finition.",
    },
    { type: 'h', text: '9. Après la mise en ligne' },
    {
      type: 'p',
      text: "Un site n'est jamais figé. Les prolongements les plus utiles, par ordre de valeur : brancher un vrai envoi de formulaire (Resend, Formspree ou une fonction serverless), remplacer les articles statiques par un fichier Markdown ou un CMS headless, ajouter des balises Open Graph par page, puis instrumenter une mesure d'audience respectueuse de la vie privée. Chaque ajout se fait sans casser l'architecture : les données restent dans `src/data`, les composants restent réutilisables, et les types continuent de guider le travail.",
    },
    {
      type: 'quote',
      text: "Un site fini n'est pas un site parfait. C'est un site publié, mesuré, et prêt à évoluer.",
      author: 'React Atelier — projet final',
    },
  ],
}
