# React Atelier

Une plateforme d'apprentissage **francophone** pour maîtriser React par la pratique : six modules détaillés, soixante projets progressifs, cinq applications guidées et la reconstruction complète du site **DataSahel** comme projet final.

Le site est lui-même une application React, pas un document statique : navigation, recherche globale, suivi de progression et thème clair/sombre.

## Stack

- **React 19** + **TypeScript**
- **Vite 7**
- **Tailwind CSS 4** via `@tailwindcss/vite` et `@import 'tailwindcss'`
- **React Router 7** pour les pages et la navigation
- **lucide-react** pour les icônes
- Aucune dépendance de surlignage : les blocs de code sont rendus avec un composant maison, copiable en un clic.

## Démarrer

```bash
npm install
npm run dev      # serveur de développement
npm run build    # vérification TypeScript + build de production
npm run preview  # prévisualiser le dossier dist/
```

Le build est généré dans `dist/`.

## Le parcours

| Module | Sujet | Leçons | Projets |
| ------ | ----- | ------ | ------- |
| 1 | Démarrer avec React | 8 | 10 |
| 2 | Tailwind CSS | 8 | 10 |
| 3 | Icônes et UI | 6 | 10 |
| 4 | Formulaires | 8 | 10 |
| 5 | Hooks | 9 | 10 |
| 6 | Architecture, routing et projet | 8 | 10 |

Chaque module se termine par **dix projets classés du plus simple au plus difficile**, avec compétences visées, étapes de construction, code de départ et prolongements.

### Projets guidés

1. **TaskFlow** — gestionnaire de tâches avec reducer et `localStorage`.
2. **MétéoSahel** — météo en temps réel avec l'API Open-Meteo.
3. **BoutiqueSahel** — catalogue, panier et tunnel de commande simplifié.
4. **DevBlog** — blog avec routing, articles, catégories et partage.
5. **BudgetWise** — budget personnel, graphiques SVG et export CSV.

### Projet final

**DataSahel**, reconstruit en douze chapitres : préparation, design system, données typées, composants, navbar, page d'accueil, à propos, blog, article, contact, SEO, accessibilité et déploiement. Le résultat est une application multi-pages prête pour Vercel ou Netlify.

## Structure

```
public/                  favicon, redirections Netlify
src/
  components/            layout, cartes, blocs de contenu, recherche, providers
  data/
    modules/             six modules + leçons + soixante projets
    guided/              cinq projets guidés complets
    capstone/            douze chapitres du projet final
    types.ts             schémas TypeScript du contenu
  lib/                   utilitaires (cn, slugify, accents, recherche)
  pages/                 une page par route
  index.css              tokens Tailwind, thème, utilitaires, animations
  main.tsx               point d'entrée
```

Tout le contenu éditorial vit dans `src/data`. Les pages ne font que le mettre en forme : pour corriger un texte ou ajouter un projet, on modifie un fichier de données, pas un composant.

## Routes

| Route | Contenu |
| ----- | ------- |
| `/` | Accueil et présentation du parcours |
| `/modules` | Liste des six modules |
| `/modules/:slug` | Détail d'un module, leçons et projets |
| `/modules/:slug/lecons/:lessonId` | Une leçon complète |
| `/projets` | Les soixante projets, filtrables |
| `/projets/:id` | Fiche d'un projet pratique |
| `/projets-guedes` | Les cinq projets guidés |
| `/projets-guedes/:slug` | Tutoriel complet d'un projet guidé |
| `/projet-final` | Présentation du projet final |
| `/projet-final/:slug` | Un chapitre du projet final |
| `/progression` | Tableau de bord de progression |
| `*` | Page 404 |

## Progression

La progression est stockée dans `localStorage` sous la clé `react-atelier-progress`. Quatre types d'éléments sont suivis :

- `lesson:<module>/<leçon>`
- `project:<id>`
- `guided:<slug>`
- `chapter:<slug>`

Aucun compte, aucun serveur. La page `/progression` permet de visualiser le détail par module et de réinitialiser les données. Le thème est mémorisé séparément sous `react-atelier-theme` et suit la préférence système au premier chargement.

## Recherche

La palette de recherche s'ouvre avec le bouton de l'en-tête ou **Ctrl/Cmd + K**. Elle indexe les modules, leçons, projets, projets guidés, chapitres et pages statiques. Navigation au clavier avec les flèches, ouverture avec Entrée, fermeture avec Échap.

## Design system

- **Couleurs** : papier crème, encre bleu nuit, bleu électrique (`brand`), lime, corail, violet, ciel et ambre pour les accents.
- **Typographies** : Space Grotesk (titres), Inter (texte), JetBrains Mono (code, labels, chiffres).
- **Motifs** : grille fine, pointillés, halos flous.
- **Thème** : clair et sombre, bascule dans l'en-tête, attribut `color-scheme`.
- **Accessibilité** : lien d'évitement, landmarks, focus visible, libellés ARIA, `prefers-reduced-motion` respecté.

## Déploiement

Le fichier `vercel.json` réécrit toutes les URL vers `index.html` pour que React Router gère les routes profondes. Sur Netlify, `public/_redirects` joue le même rôle.

```bash
npm run build
```

Publie le dossier `dist/` sur Vercel, Netlify ou tout hébergeur statique. Pense à vérifier qu'un rafraîchissement direct sur `/modules/...` ne renvoie pas une 404.

## Notes

- Le contenu est volontairement autonome : aucune vidéo, aucun CDN de code, aucune inscription.
- Les blocs de code peuvent contenir des caractères échappés (`\${`, `\``) : ils sont affichés tels quels, pas exécutés.
- Pour ajouter un module, crée un fichier dans `src/data/modules`, exporte un objet `CourseModule` conforme à `types.ts`, puis ajoute-le au tableau de `src/data/modules/index.ts`.
# REACT
