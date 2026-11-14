import type { CapstoneChapter } from '../types'

export const chapterHomeSections: CapstoneChapter = {
  slug: 'accueil-sections',
  number: 7,
  title: 'Accueil : mission, expertises, méthode et publics',
  summary:
    "Après le hero, la page déroule sept sections numérotées. On réutilise les mêmes composants, mais chaque section a un rythme et un fond différents pour éviter la monotonie.",
  duration: '90 min',
  blocks: [
    {
      type: 'p',
      text: "La page d'accueil est longue, mais elle n'est pas répétitive. Chaque section a un rôle : mission (pourquoi), expertises (quoi), objectifs (comment), valeurs (pourquoi nous), méthode (comment travailler), publics (pour qui), journal (preuve d'expertise), CTA (passage à l'action).",
    },
    {
      type: 'list',
      ordered: true,
      items: [
        '**Mission** : deux colonnes, un label collant à gauche, un texte éditorial à droite, trois piliers Former / Analyser / Innover.',
        '**Expertises** : fond sable plus soutenu, six cartes de services avec icône, index et puces.',
        '**Objectifs** : lignes larges numérotées I, II, III, sans cartes, pour changer le rythme.',
        '**Valeurs et chiffres** : section bleu nuit, quatre valeurs puis quatre statistiques animées.',
        '**Méthode** : cinq étapes reliées par une ligne pointillée, comme une frise.',
        '**Publics** : deux blocs côte à côte, l’un bleu nuit, l’autre terre cuite avec motif bogolan.',
        '**Journal** : trois cartes d’articles, puis un bandeau d’appel à l’action.',
      ],
    },
    {
      type: 'code',
      title: 'src/pages/Home.tsx — mission et expertises',
      lang: 'tsx',
      code: `<section className="relative overflow-hidden">
  <div className="shell grid gap-10 py-20 sm:py-28 lg:grid-cols-[0.38fr_0.62fr] lg:gap-16">
    <div>
      <div className="lg:sticky lg:top-28">
        <SectionLabel index="01">Notre mission</SectionLabel>
        <div className="relative mt-8 hidden lg:block">
          <Arcs className="size-56 text-clay-500/25" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[0.6rem] tracking-[0.2em] text-clay-600/70 uppercase">
            Sahel
          </span>
        </div>
        <Button to="/a-propos" variant="outline" size="md" className="mt-8">
          En savoir plus sur nous
        </Button>
      </div>
    </div>

    <div>
      <Reveal>
        <h2 className="font-display text-[clamp(1.65rem,3.1vw,2.55rem)] leading-[1.28] font-normal tracking-[-0.02em] text-ink">
          Renforcer les capacités des organisations et des jeunes professionnels en{' '}
          <span className="text-clay-600 italic">Afrique</span> à travers des services de
          gestion de données, des formations pratiques, des outils de visualisation
          impactants et un système de{' '}
          <span className="text-clay-600 italic">suivi-évaluation</span> rigoureux.
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-7 max-w-2xl leading-relaxed text-ink/70">
          Améliorer les performances des interventions, mesurer l’efficacité des actions et
          éclairer les prises de décision : c’est la finalité de chaque mission que nous
          menons, de la première collecte de terrain jusqu’au rapport d’impact.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
        {[
          { title: 'Former', text: 'Des ateliers pratiques qui laissent vos équipes autonomes.' },
          { title: 'Analyser', text: 'Des méthodes rigoureuses, des résultats vérifiables.' },
          { title: 'Innover', text: 'Des formats visuels qui rendent la donnée désirable.' },
        ].map((pillar, i) => (
          <Reveal key={pillar.title} delay={0.08 * i}>
            <p className="font-mono text-[0.6rem] tracking-[0.18em] text-clay-700 uppercase">
              0{i + 1}
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold">{pillar.title}</h3>
            <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink/70">{pillar.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </div>
</section>

<section
  id="expertises"
  className="scroll-mt-24 border-y border-ink/8 bg-sand-100/50 py-20 sm:py-28"
>
  <div className="shell">
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <SectionHeading
        index="02"
        kicker="Nos domaines d’expertise"
        title={
          <>
            De la donnée brute au <span className="text-clay-600 italic">récit</span> qui
            convainc.
          </>
        }
        description="Des approches méthodologiques rigoureuses et des outils adaptés pour suivre vos indicateurs clés, évaluer vos résultats et analyser votre impact."
      />
      <Link
        to="/contact"
        className="group inline-flex shrink-0 items-center gap-2 border-b border-ink/20 pb-1 text-[0.85rem] font-medium text-ink/70 transition hover:border-clay-500 hover:text-clay-600"
      >
        Un besoin spécifique ?
        <ArrowRight className="size-4 transition group-hover:translate-x-1" />
      </Link>
    </div>

    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <Reveal key={service.id} delay={0.05 * (i % 3)}>
          <ServiceCard service={service} />
        </Reveal>
      ))}
    </div>
  </div>
</section>`,
    },
    {
      type: 'p',
      text: "La carte de service est l'élément le plus répété du site. Elle doit être solide : hauteur égale dans la grille, icône qui change de couleur au survol, puces lisibles et index en mono. `h-full` et `flex-col` garantissent que toutes les cartes s'alignent même si les descriptions ont des longueurs différentes.",
    },
    {
      type: 'code',
      title: 'src/components/ServiceCard.tsx',
      lang: 'tsx',
      code: `import {
  ArrowUpRight,
  BarChart3,
  Database,
  GraduationCap,
  Megaphone,
  Smartphone,
  Target,
  type LucideIcon,
} from 'lucide-react'
import type { Service, ServiceIcon } from '../data/services'

const icons: Record<ServiceIcon, LucideIcon> = {
  database: Database,
  smartphone: Smartphone,
  target: Target,
  chart: BarChart3,
  megaphone: Megaphone,
  graduation: GraduationCap,
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon]

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-sand-100/40 p-6 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-clay-500/35 hover:bg-sand-50 hover:shadow-[0_34px_70px_-44px_rgba(12,42,69,0.55)] sm:p-7">
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-10 size-28 rounded-full bg-clay-500/[0.06] transition-transform duration-500 group-hover:scale-[1.6]"
      />
      <div className="relative flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-navy-900 text-sand-50 transition-colors duration-500 group-hover:bg-clay-500">
          <Icon className="size-5" strokeWidth={1.6} />
        </span>
        <span className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/70 transition-colors group-hover:text-clay-500">
          {service.index}
        </span>
      </div>

      <h3 className="relative mt-6 font-display text-[1.32rem] leading-tight font-semibold text-ink">
        {service.title}
      </h3>
      <p className="relative mt-3 text-[0.9rem] leading-relaxed text-ink/70">
        {service.description}
      </p>

      <ul className="relative mt-5 space-y-2 border-t border-ink/8 pt-5">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2.5 text-[0.8rem] leading-snug text-ink/70">
            <span aria-hidden="true" className="mt-[0.45em] size-1 shrink-0 rounded-full bg-clay-500/70" />
            {bullet}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto flex justify-end pt-6">
        <span className="grid size-9 place-items-center rounded-full border border-ink/12 text-ink/70 transition-all duration-300 group-hover:border-clay-500 group-hover:bg-clay-500 group-hover:text-sand-50">
          <ArrowUpRight className="size-4" strokeWidth={1.8} />
        </span>
      </div>
    </article>
  )
}`,
    },
    {
      type: 'p',
      text: "Les objectifs utilisent une grille à trois colonnes : l'index romain, le titre, les points. Au survol, la ligne entière change de fond. C'est plus sobre que six cartes de plus, et cela crée une respiration entre deux sections de cartes.",
    },
    {
      type: 'code',
      title: 'src/pages/Home.tsx — objectifs',
      lang: 'tsx',
      code: `<section className="shell py-20 sm:py-28">
  <SectionHeading
    index="03"
    kicker="Objectifs stratégiques & opérationnels"
    title="Trois axes, une même exigence de rigueur."
    description="Nous intervenons à chaque étape du cycle de vie de vos données, avec des livrables concrets et utilisables par vos équipes."
  />

  <div className="mt-12 border-t border-ink/10">
    {objectives.map((objective, i) => (
      <Reveal key={objective.index} delay={0.05 * i}>
        <div className="group grid gap-5 border-b border-ink/10 py-8 transition-colors duration-300 hover:bg-sand-100/50 sm:py-10 lg:grid-cols-[5rem_0.95fr_1.05fr] lg:gap-10 lg:px-4">
          <span className="font-display text-3xl font-semibold text-clay-500/50 transition-colors group-hover:text-clay-500 lg:text-4xl">
            {objective.index}
          </span>
          <h3 className="font-display text-xl leading-snug font-semibold text-ink sm:text-2xl">
            {objective.title}
          </h3>
          <ul className="space-y-2.5">
            {objective.points.map((point) => (
              <li key={point} className="flex gap-3 text-[0.9rem] leading-relaxed text-ink/70">
                <Check className="mt-0.5 size-4 shrink-0 text-clay-500" strokeWidth={2} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    ))}
  </div>
</section>`,
    },
    {
      type: 'p',
      text: "La section sombre est le moment fort de la page. Quatre valeurs dans une grille sans gouttière (les bordures créent les séparations), puis quatre statistiques animées. Le fond bleu nuit casse le rythme sable et donne envie de faire défiler jusqu'en bas.",
    },
    {
      type: 'code',
      title: 'src/pages/Home.tsx — valeurs, chiffres et méthode',
      lang: 'tsx',
      code: `<section className="relative overflow-hidden bg-navy-900 py-20 text-sand-50 sm:py-28">
  <div aria-hidden="true" className="absolute inset-0 dot-grid-light opacity-30" />
  <Arcs className="pointer-events-none absolute -top-32 -right-32 size-[36rem] text-clay-400/20" />
  <div className="shell relative">
    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading
          index="04"
          kicker="Notre valeur ajoutée"
          tone="light"
          title={
            <>
              Une expertise locale, des livrables qui{' '}
              <span className="text-clay-400 italic">parlent</span>.
            </>
          }
          description="Nous connaissons les réalités du terrain sahélien et les contraintes des projets de développement. C’est ce qui rend nos accompagnements pragmatiques."
        />
        <Button to="/a-propos" variant="light" size="md" className="mt-8">
          Découvrir notre approche
        </Button>
      </div>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-sand-100/12 bg-sand-100/12 sm:grid-cols-2">
        {values.map((value) => (
          <div
            key={value.title}
            className="group bg-navy-900 p-6 transition-colors duration-300 hover:bg-navy-800 sm:p-7"
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-clay-400/40 font-mono text-[0.6rem] text-clay-300">
              ✓
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-sand-50">
              {value.title}
            </h3>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-sand-100/65">{value.text}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-sand-100/12 bg-sand-100/12 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-navy-900 px-6 py-7">
          <p className="font-display text-4xl font-semibold text-sand-50 sm:text-5xl">
            <Counter value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="mt-2 text-[0.86rem] font-medium text-sand-100/80">{stat.label}</p>
          <p className="mt-1 font-mono text-[0.62rem] text-sand-100/65">{stat.note}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="shell py-20 sm:py-28">
  <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
    <SectionHeading
      index="05"
      kicker="Notre méthode"
      title="Cinq étapes, zéro angle mort."
      description="Un cadre de travail lisible, du cadrage initial à la restitution, pour des données fiables et des décisions assumées."
    />
    <p className="hidden max-w-[15rem] border-l border-ink/15 pl-5 font-mono text-[0.7rem] leading-relaxed text-ink/70 lg:block">
      Chaque étape se conclut par un livrable validé avec vos équipes.
    </p>
  </div>

  <div className="relative mt-14">
    <div
      aria-hidden="true"
      className="absolute top-6 right-0 left-0 hidden border-t border-dashed border-ink/20 lg:block"
    />
    <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
      {processSteps.map((step, i) => (
        <Reveal key={step.step} delay={0.06 * i}>
          <div className="relative">
            <span className="relative z-10 grid size-12 place-items-center rounded-full border border-clay-500/30 bg-sand-50 font-mono text-[0.72rem] text-clay-600 shadow-sm">
              {step.step}
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-[0.84rem] leading-relaxed text-ink/70">{step.text}</p>
            <p className="mt-3 font-mono text-[0.6rem] tracking-wide text-clay-600/80 uppercase">
              {step.tag}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>`,
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Le motif bogolan, avec parcimonie',
      text: "La bande bogolan apparaît une seule fois sur l'accueil, dans le bloc « credo » terre cuite. Répétée partout, elle deviendrait un bruit de fond. Un motif fort doit rester un accent, pas un habillage.",
    },
    {
      type: 'code',
      title: 'src/pages/Home.tsx — publics et journal',
      lang: 'tsx',
      code: `<section className="shell pb-20 sm:pb-28">
  <div className="grid gap-5 lg:grid-cols-2">
    <div className="relative overflow-hidden rounded-2xl bg-navy-900 p-8 text-sand-50 sm:p-10">
      <div aria-hidden="true" className="absolute inset-0 dot-grid-light opacity-30" />
      <div className="relative">
        <SectionLabel tone="light" index="06">Publics cibles</SectionLabel>
        <h2 className="display-md mt-5 text-sand-50">
          À qui s’adressent <br className="hidden sm:block" /> nos services ?
        </h2>
        <ul className="mt-8 space-y-3">
          {audiences.map((audience) => (
            <li
              key={audience}
              className="flex items-center justify-between gap-4 border-b border-sand-100/10 pb-3 text-[0.93rem] text-sand-100/75"
            >
              {audience}
              <ArrowUpRight className="size-4 shrink-0 text-clay-400" />
            </li>
          ))}
        </ul>
        <p className="mt-7 text-[0.85rem] leading-relaxed text-sand-100/65">
          Vous êtes une structure de taille modeste ? Nos tarifs sont pensés pour vous, sans
          compromis sur la qualité.
        </p>
      </div>
    </div>

    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-clay-600 p-8 text-sand-50 sm:p-10">
      <div aria-hidden="true" className="absolute inset-0 bogolan opacity-40" />
      <Arcs className="pointer-events-none absolute -right-24 -bottom-24 size-[24rem] text-sand-50/25" />
      <div className="relative">
        <span className="kicker text-sand-50/70">Notre credo</span>
        <p className="mt-5 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug font-medium">
          « Former, analyser, innover : nous ne livrons pas seulement des rapports, nous
          laissons des compétences. »
        </p>
      </div>
      <div className="relative mt-10">
        <Button to="/contact" variant="light" size="md">
          Demander un devis
        </Button>
      </div>
    </div>
  </div>
</section>

<section className="border-t border-ink/8 bg-sand-100/40 py-20 sm:py-28">
  <div className="shell">
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <SectionHeading
        index="07"
        kicker="Le journal"
        title="Idées, méthodes et actualités data."
      />
      <Link
        to="/blog"
        className="group inline-flex shrink-0 items-center gap-2 border-b border-ink/20 pb-1 text-[0.85rem] font-medium text-ink/70 transition hover:border-clay-500 hover:text-clay-600"
      >
        Tous les articles
        <ArrowRight className="size-4 transition group-hover:translate-x-1" />
      </Link>
    </div>

    <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
      {featured.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  </div>
</section>

<CtaBand
  title="Prêt à faire parler vos données ?"
  description="Un projet, une enquête, un tableau de bord à construire ou une équipe à former : parlons-en. Nous vous répondons sous 24 heures."
/>`,
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Alterner les fonds, pas les styles',
      text: "Sable clair, sable soutenu, bleu nuit, sable clair, terre cuite, sable : les fonds créent le rythme. Les composants, eux, restent cohérents. C'est beaucoup plus facile à maintenir que cinq styles de cartes différents.",
    },
  ],
}
