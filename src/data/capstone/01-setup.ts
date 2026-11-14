import type { CapstoneChapter } from '../types'

export const chapterSetup: CapstoneChapter = {
  slug: 'preparer-le-projet',
  number: 1,
  title: 'Comprendre DataSahel et préparer le projet',
  summary:
    "Le projet final reconstruit le site DataSahel : un cabinet malien spécialisé en données et suivi-évaluation. On part du site existant, on inventorie les pages et on installe la stack.",
  duration: '45 min',
  blocks: [
    {
      type: 'p',
      text: "**DataSahel** accompagne les organisations, institutions et jeunes professionnels d'Afrique dans la collecte, l'analyse, la visualisation des données et le suivi-évaluation de projets. Le site existant sert de cahier des charges : chaque page, chaque texte et chaque intention graphique doivent être reproduits, mais dans une base React propre.",
    },
    {
      type: 'p',
      text: "Le parti pris graphique s'appuie sur le concept de la marque : **la donnée au service du Sahel**. Sable, terre cuite et bleu nuit, typographie éditoriale, motifs de grille et de bogolan, visualisations de données dessinées sur mesure. Tu ne recopies pas un template : tu reconstruis une identité.",
    },
    {
      type: 'table',
      headers: ['Route', 'Contenu', 'Difficulté'],
      rows: [
        ['`/`', 'Hero, mission, expertises, objectifs, valeurs, méthode, publics, blog, CTA', 'Élevée'],
        ['`/a-propos`', 'Histoire, fondateur, credo, mission, valeurs, engagements', 'Moyenne'],
        ['`/blog`', 'Journal filtrable par catégorie', 'Moyenne'],
        ['`/blog/:slug`', 'Article complet, partage, articles liés', 'Moyenne'],
        ['`/contact`', 'Coordonnées, carte stylisée, formulaire validé, FAQ', 'Élevée'],
        ['`*`', 'Page 404', 'Faible'],
      ],
    },
    {
      type: 'p',
      text: "Avant de coder, ouvre le site de référence et note les constantes : la navigation, les accroches, la place de la terre cuite, les sections sombres. Tu vas maintenant créer le projet avec les mêmes versions que DataSahel.",
    },
    {
      type: 'code',
      title: 'Terminal — créer le projet',
      lang: 'bash',
      code: `npm create vite@latest datasahel -- --template react-ts
cd datasahel
npm install
npm install react-router-dom framer-motion lucide-react
npm install -D tailwindcss @tailwindcss/vite
npm run dev`,
    },
    {
      type: 'code',
      title: 'package.json — dépendances finales',
      lang: 'json',
      code: `{
  "dependencies": {
    "framer-motion": "^12.23.0",
    "lucide-react": "^0.545.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.9.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.11",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "@vitejs/plugin-react": "^5.0.0",
    "tailwindcss": "^4.1.11",
    "typescript": "^5.8.0",
    "vite": "^7.0.0"
  }
}`,
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
      title: 'index.html — métadonnées et polices',
      lang: 'html',
      code: `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0C2A45" />
    <title>DataSahel — Collecte, analyse et valorisation des données</title>
    <meta
      name="description"
      content="DataSahel accompagne les organisations, institutions et jeunes professionnels d'Afrique dans la collecte, l'analyse, la visualisation des données et le suivi-évaluation de projets. Formations pratiques à Bamako, Mali."
    />
    <meta property="og:title" content="DataSahel — Former, Analyser, Innover" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_FR" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..800&family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Trois polices, trois rôles',
      text: "**Fraunces** pour les titres éditoriaux, **Plus Jakarta Sans** pour le texte courant, **IBM Plex Mono** pour les labels, les chiffres et les données. Cette combinaison crée la personnalité du site : ne la remplace pas par la police par défaut de Tailwind.",
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'Tailwind 4 ne lit pas tailwind.config.js',
      text: "Avec `@tailwindcss/vite`, les tokens se déclarent dans le CSS avec `@theme`. Si tu copies une configuration Tailwind 3, elle sera ignorée. Le chapitre suivant pose le thème complet.",
    },
  ],
}
