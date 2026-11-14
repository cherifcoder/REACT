import type { CapstoneChapter } from '../types'

export const chapterDesign: CapstoneChapter = {
  slug: 'design-system',
  number: 2,
  title: 'Poser le design system sable, terre cuite et bleu nuit',
  summary:
    "Tous les tokens du site vivent dans src/index.css : couleurs, typographies, utilitaires et motifs. On construit une base réutilisable avant le premier composant.",
  duration: '60 min',
  blocks: [
    {
      type: 'p',
      text: "Un design system n'est pas une librairie de composants : c'est un vocabulaire commun. Ici, trois familles de couleurs (`sand`, `clay`, `navy`), une couleur de texte (`ink`) et trois polices. Chaque section du site réutilise ces tokens au lieu de choisir une couleur au hasard.",
    },
    {
      type: 'code',
      title: 'src/index.css — thème complet',
      lang: 'css',
      code: `@import 'tailwindcss';

@theme {
  --font-sans: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Fraunces', ui-serif, Georgia, serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;

  --color-sand-50: #fbf7ef;
  --color-sand-100: #f5ecdb;
  --color-sand-200: #ecdfc7;
  --color-sand-300: #ddc9a6;
  --color-sand-400: #c9ae83;

  --color-clay-300: #f0ab7c;
  --color-clay-400: #e9854d;
  --color-clay-500: #d9601f;
  --color-clay-600: #b94d15;
  --color-clay-700: #933b12;

  --color-navy-500: #2a6b99;
  --color-navy-600: #1d547c;
  --color-navy-700: #16405f;
  --color-navy-800: #123a5c;
  --color-navy-900: #0c2a45;
  --color-navy-950: #081d31;

  --color-ink: #0f2436;

  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}`,
    },
    {
      type: 'p',
      text: "Tailwind 4 accepte `ink` comme couleur unique : `text-ink`, `bg-ink`, `border-ink/10`. La syntaxe `/10` applique une opacité, ce qui permet de décliner toute la hiérarchie visuelle avec une seule couleur de texte.",
    },
    {
      type: 'code',
      title: 'src/index.css — base, typographie et focus',
      lang: 'css',
      code: `@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    @apply bg-sand-50 text-ink font-sans antialiased;
    font-feature-settings: 'ss01' on, 'cv01' on;
    overflow-x: hidden;
  }

  ::selection {
    background-color: var(--color-clay-500);
    color: var(--color-sand-50);
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: var(--font-display);
    font-weight: 500;
    font-variation-settings: 'SOFT' 20, 'WONK' 1;
    letter-spacing: -0.02em;
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }

  :focus-visible {
    outline: 2px solid var(--color-clay-500);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}`,
    },
    {
      type: 'callout',
      tone: 'info',
      title: '`font-variation-settings` sur une police variable',
      text: "Fraunces est une police variable avec des axes `SOFT` et `WONK`. Ils adoucissent les contours et activent les détails calligraphiques. C'est ce qui donne au site son côté éditorial plutôt que « SaaS générique ».",
    },
    {
      type: 'code',
      title: 'src/index.css — utilitaires maison',
      lang: 'css',
      code: `@utility shell {
  width: 100%;
  max-width: 78rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
  @media (min-width: 640px) {
    padding-inline: 2rem;
  }
  @media (min-width: 1024px) {
    padding-inline: 2.5rem;
  }
}

@utility display-xl {
  font-family: var(--font-display);
  font-size: clamp(2.65rem, 7.2vw, 5.4rem);
  line-height: 0.98;
  letter-spacing: -0.035em;
  font-weight: 500;
}

@utility display-lg {
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 4.6vw, 3.5rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
  font-weight: 500;
}

@utility display-md {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 2.6vw, 2.15rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-weight: 500;
}`,
    },
    {
      type: 'p',
      text: "Les motifs sont l'âme du site : pointillés de grille, arcs concentriques évoquant le soleil sahélien, bande bogolan. Ils sont déclarés une fois, puis posés en arrière-plan avec `absolute inset-0` et `pointer-events-none`.",
    },
    {
      type: 'code',
      title: 'src/index.css — motifs et animations',
      lang: 'css',
      code: `@layer utilities {
  .grain::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.05;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .dot-grid {
    background-image: radial-gradient(rgba(18, 58, 92, 0.16) 1px, transparent 1px);
    background-size: 22px 22px;
  }

  .dot-grid-light {
    background-image: radial-gradient(rgba(251, 247, 239, 0.18) 1px, transparent 1px);
    background-size: 26px 26px;
  }

  .bogolan {
    background-image:
      linear-gradient(135deg, rgba(217, 96, 31, 0.14) 25%, transparent 25%),
      linear-gradient(225deg, rgba(217, 96, 31, 0.14) 25%, transparent 25%),
      linear-gradient(45deg, rgba(18, 58, 92, 0.1) 25%, transparent 25%),
      linear-gradient(315deg, rgba(18, 58, 92, 0.1) 25%, transparent 25%);
    background-position: 0 0, 12px 0, 12px 0, 0 0;
    background-size: 24px 24px;
    background-repeat: repeat;
  }

  .marquee-track {
    animation: marquee 38s linear infinite;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }

  .float-slow {
    animation: float 7s ease-in-out infinite;
  }
  .float-slower {
    animation: float 10s ease-in-out infinite;
    animation-delay: -3s;
  }

  .mask-fade-x {
    mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@keyframes dash {
  to { stroke-dashoffset: -1000; }
}`,
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'La règle des 60-30-10',
      text: "**60 % de sable** (fonds), **30 % de bleu nuit** (textes et sections sombres), **10 % de terre cuite** (accents, boutons, soulignés). Si tu ajoutes une quatrième couleur dominante, l'identité se dilue. Les verts et les gris existent seulement à l'intérieur des visuels de données.",
    },
  ],
}
