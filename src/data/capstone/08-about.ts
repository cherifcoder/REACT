import type { CapstoneChapter } from '../types'

export const chapterAbout: CapstoneChapter = {
  slug: 'page-a-propos',
  number: 8,
  title: 'À propos : histoire, fondateur et engagements',
  summary:
    "La page À propos humanise l'entreprise. On y retrouve le hero de page, un portrait, le credo, la mission, quatre valeurs et trois engagements de travail.",
  duration: '60 min',
  blocks: [
    {
      type: 'p',
      text: "Une page À propos réussie ne récite pas un CV : elle relie une conviction à une méthode. Ici, l'histoire part du terrain sahélien, présente le fondateur, puis transforme la promesse en engagements vérifiables (écoute, rigueur, transmission).",
    },
    {
      type: 'code',
      title: 'src/components/PageHero.tsx — le hero des pages internes',
      lang: 'tsx',
      code: `import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Arcs } from './Patterns'

export function PageHero({
  kicker,
  title,
  description,
  children,
  breadcrumb,
}: {
  kicker: string
  title: ReactNode
  description?: string
  children?: ReactNode
  breadcrumb?: string
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink/8 bg-sand-100/45">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dot-grid opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <Arcs className="pointer-events-none absolute -top-24 -right-24 size-[26rem] text-clay-500/20" />

      <div className="shell relative py-14 sm:py-20">
        {breadcrumb && (
          <nav
            aria-label="Fil d’Ariane"
            className="mb-7 flex items-center gap-2 font-mono text-[0.66rem] text-ink/70"
          >
            <Link to="/" className="transition hover:text-clay-600">
              Accueil
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-ink/70">{breadcrumb}</span>
          </nav>
        )}

        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-clay-500" />
          <span className="kicker text-clay-600">{kicker}</span>
        </div>

        <h1 className="display-lg mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.1rem)]">
          {title}
        </h1>

        {description && (
          <p className="mt-6 max-w-2xl text-[1.03rem] leading-relaxed text-ink/65">
            {description}
          </p>
        )}

        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  )
}`,
    },
    {
      type: 'p',
      text: "Le portrait est cadré comme une pièce éditoriale : une bordure inclinée en arrière-plan, une image en 4/5, un dégradé bleu nuit pour lire le nom, et une pastille terre cuite « 100 % sur mesure ». L'image doit être locale, optimisée et décrite précisément.",
    },
    {
      type: 'code',
      title: 'src/pages/About.tsx — introduction et portrait',
      lang: 'tsx',
      code: `import { ArrowUpRight, Check, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { SectionHeading, SectionLabel, Arcs } from '../components/Patterns'
import { CtaBand } from '../components/CtaBand'
import { values, services } from '../data/services'
import { site } from '../data/site'

const engagements = [
  {
    number: '01',
    title: 'Écoute',
    text: 'Comprendre votre contexte, vos contraintes et les décisions que vous devez prendre avant de proposer un outil ou une méthode.',
  },
  {
    number: '02',
    title: 'Rigueur',
    text: 'Des protocoles documentés, des données vérifiées, des résultats reproductibles. La confiance se construit sur la preuve.',
  },
  {
    number: '03',
    title: 'Transmission',
    text: 'Vos équipes doivent pouvoir continuer sans nous. Chaque mission inclut un temps de formation et de documentation.',
  },
]

export function About() {
  return (
    <>
      <Seo
        title="À propos"
        description="DataSahel est un cabinet malien spécialisé dans la collecte, l’analyse, la visualisation et la valorisation des données, avec un volet suivi-évaluation."
      />

      <PageHero
        breadcrumb="À propos"
        kicker="Qui sommes-nous ?"
        title={
          <>
            Chaque organisation a le pouvoir de transformer ses données en{' '}
            <span className="text-clay-600 italic">véritable force</span>.
          </>
        }
        description="DataSahel est une entreprise spécialisée dans la collecte, l’analyse, la visualisation et la valorisation des données. Nous accompagnons les organisations, institutions et jeunes professionnels dans l’usage stratégique de leurs données."
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" size="lg">
            Écrivez-nous
          </Button>
          <Button to="/#expertises" variant="outline" size="lg">
            Découvrir nos expertises
          </Button>
        </div>
      </PageHero>

      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <SectionLabel index="01">Notre histoire</SectionLabel>
            <h2 className="display-lg mt-5">
              Une entreprise malienne, ancrée dans les réalités du{' '}
              <span className="text-clay-600 italic">Sahel</span>.
            </h2>

            <div className="prose-ds mt-7 max-w-xl">
              <p>
                DataSahel est née d’une conviction simple : les organisations les plus proches du
                terrain sont celles qui gagnent le plus à structurer et valoriser leurs données.
                Elles ont peu de marges d’erreur, et un besoin criant de preuves d’impact.
              </p>
              <p>
                De la collecte mobile à l’analyse statistique, du tableau de bord au rapport
                d’impact, nous intervenons sur toute la chaîne de valeur de la donnée.
              </p>
              <p>
                Basés à Bamako, nous travaillons avec des ONG, des projets de développement, des
                universités, des institutions publiques et des PME — avec une tarification
                accessible aux petites structures et une approche pédagogique assumée.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {['Expertise locale', 'Tarification accessible', 'Accompagnement sur mesure'].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2 text-[0.85rem] text-ink/65">
                    <Check className="size-4 text-clay-500" strokeWidth={2} />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <Reveal y={28}>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rotate-2 rounded-[1.7rem] border border-clay-500/25"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-sand-200">
                <img
                  src="/fondateur.jpg"
                  alt={site.founder + ', fondateur de DataSahel'}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent p-6 pt-24 text-sand-50">
                  <p className="font-display text-2xl font-semibold">{site.founder}</p>
                  <p className="mt-1 font-mono text-[0.6rem] tracking-[0.18em] text-sand-100/65 uppercase">
                    Fondateur · DataSahel
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-7 -left-5 hidden rounded-xl bg-clay-500 p-4 text-sand-50 shadow-[0_20px_40px_-20px_rgba(217,96,31,0.8)] sm:block">
                <p className="font-display text-3xl leading-none font-semibold">100%</p>
                <p className="mt-1.5 font-mono text-[0.55rem] tracking-[0.14em] uppercase">
                  Sur mesure
                </p>
              </div>

              <Arcs className="pointer-events-none absolute -top-10 -right-14 -z-10 size-40 text-clay-500/30" />
            </div>
          </Reveal>
        </div>
      </section>`,
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Un portrait, pas une photo d’illustration',
      text: "Ici, le portrait du fondateur est un contenu, pas une décoration. Il porte un nom, un rôle et un texte alternatif précis. Si l'image manque, la page doit rester compréhensible : c'est pour cela que le nom est aussi écrit dans le DOM.",
    },
    {
      type: 'code',
      title: 'src/pages/About.tsx — credo, mission et valeurs',
      lang: 'tsx',
      code: `<section className="relative overflow-hidden bg-navy-900 py-20 text-sand-50 sm:py-28">
  <div aria-hidden="true" className="absolute inset-0 dot-grid-light opacity-30" />
  <Arcs className="pointer-events-none absolute -top-40 -left-32 size-[32rem] text-clay-400/20" />
  <div className="shell relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
    <div>
      <SectionLabel tone="light" index="02">Notre credo</SectionLabel>
      <div className="relative mt-7">
        <Quote className="size-10 text-clay-400/60" strokeWidth={1.4} />
        <p className="mt-3 font-display text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.3] font-medium text-sand-50">
          Les données ne remplacent pas l’intuition. Elles la rendent vérifiable.
        </p>
      </div>
      <p className="mt-8 max-w-md text-[0.93rem] leading-relaxed text-sand-100/65">
        Nous croyons à une donnée utile, comprise et appropriée par ceux qui l’utilisent.
        C’est pourquoi nous privilégions toujours la clarté à la complexité, et le transfert
        de compétences à la dépendance.
      </p>
    </div>

    <div className="rounded-2xl border border-sand-100/12 bg-navy-950/40 p-7 sm:p-9">
      <p className="kicker text-clay-300">Notre mission</p>
      <p className="mt-4 text-[1.02rem] leading-relaxed text-sand-100/80">
        Renforcer les capacités des organisations et des jeunes professionnels en Afrique à
        travers des services de gestion de données, des formations pratiques, des outils de
        visualisation impactants et un système de suivi-évaluation rigoureux permettant de
        mesurer l’efficacité des interventions et d’améliorer continuellement les performances.
      </p>
      <div className="mt-7 grid gap-4 border-t border-sand-100/10 pt-6 sm:grid-cols-2">
        {[
          'Collecte de données de terrain',
          'Analyse statistique rigoureuse',
          'Tableaux de bord & dataviz',
          'Suivi-évaluation & impact',
        ].map((item) => (
          <p key={item} className="flex items-start gap-2.5 text-[0.84rem] text-sand-100/65">
            <Check className="mt-0.5 size-3.5 shrink-0 text-clay-400" strokeWidth={2.2} />
            {item}
          </p>
        ))}
      </div>
    </div>
  </div>
</section>

<section className="shell py-20 sm:py-28">
  <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
    <div>
      <SectionHeading
        index="03"
        kicker="Notre valeur ajoutée"
        title="Quatre raisons de nous confier vos données."
        description="Des engagements concrets, vérifiables à chaque étape de la collaboration."
      />
    </div>

    <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
      {values.map((value, i) => (
        <Reveal key={value.title} delay={0.04 * i}>
          <div className="group h-full bg-sand-50 p-6 transition-colors duration-300 hover:bg-sand-100/70 sm:p-7">
            <span className="font-mono text-[0.65rem] tracking-[0.16em] text-clay-500">
              0{i + 1}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{value.title}</h3>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-ink/70">{value.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>`,
    },
    {
      type: 'p',
      text: "Les engagements sont présentés comme une méthode de travail, pas comme des slogans. Chaque ligne commence par un verbe concret et se termine par une conséquence vérifiable. C'est la différence entre « nous sommes rigoureux » et « des protocoles documentés, des données vérifiées, des résultats reproductibles ».",
    },
    {
      type: 'code',
      title: 'src/pages/About.tsx — engagements et bandeau final',
      lang: 'tsx',
      code: `<section className="border-y border-ink/8 bg-sand-100/50 py-20 sm:py-24">
  <div className="shell grid gap-10 lg:grid-cols-[0.6fr_0.4fr] lg:gap-16">
    <div>
      <SectionLabel index="04">Notre façon de travailler</SectionLabel>
      <div className="mt-8 space-y-8">
        {engagements.map((item, i) => (
          <Reveal key={item.number} delay={0.05 * i}>
            <div className="grid gap-3 border-t border-ink/10 pt-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
              <span className="font-display text-2xl font-semibold text-clay-500/60">
                {item.number}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-ink/70">
                  {item.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>

    <div className="lg:pt-20">
      <div className="rounded-2xl border border-ink/10 bg-sand-50 p-7">
        <p className="kicker text-clay-600">Nos prestations</p>
        <ul className="mt-5 divide-y divide-ink/8">
          {services.map((service) => (
            <li key={service.id}>
              <Link
                to="/#expertises"
                className="group flex items-center justify-between gap-4 py-3 text-[0.88rem] text-ink/70 transition hover:text-clay-600"
              >
                {service.title}
                <ArrowUpRight className="size-4 shrink-0 text-ink/70 transition group-hover:-translate-y-0.5 group-hover:text-clay-500" />
              </Link>
            </li>
          ))}
        </ul>
        <Button to="/contact" size="md" className="mt-6 w-full">
          Discuter de votre projet
        </Button>
      </div>
    </div>
  </div>
</section>

<CtaBand
  title="Une expertise locale, un accompagnement sur mesure."
  description="Nous serions ravis d’échanger sur vos enjeux de données, vos évaluations ou vos besoins de formation."
  primaryLabel="Prendre contact"
/>`,
    },
    {
      type: 'code',
      title: 'src/components/CtaBand.tsx — le bandeau réutilisable',
      lang: 'tsx',
      code: `import { ArrowRight } from 'lucide-react'
import { Button } from './Button'
import { Arcs } from './Patterns'
import { site } from '../data/site'

export function CtaBand({
  title,
  description,
  primaryLabel = 'Demander un devis',
  primaryTo = '/contact',
}: {
  title: string
  description: string
  primaryLabel?: string
  primaryTo?: string
}) {
  return (
    <section className="shell py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-12 text-sand-50 sm:px-12 sm:py-16 lg:px-16">
        <div aria-hidden="true" className="absolute inset-0 dot-grid-light opacity-50" />
        <Arcs className="absolute -top-28 -right-24 size-[30rem] text-clay-400/25" />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-16 size-52 rounded-full bg-clay-500/20 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="kicker flex items-center gap-3 text-clay-300">
              <span className="size-1.5 rounded-full bg-clay-400" />
              Passons à l’action
            </p>
            <h2 className="display-lg mt-5 max-w-2xl text-sand-50">{title}</h2>
            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-sand-100/65">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <Button to={primaryTo} size="lg" variant="primary">
              {primaryLabel}
            </Button>
            <a
              href={'mailto:' + site.email}
              className="group inline-flex items-center gap-2 text-[0.86rem] text-sand-100/65 transition hover:text-sand-50 lg:pr-2"
            >
              Ou écrivez-nous à {site.email}
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}`,
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Un seul CTA, plusieurs pages',
      text: "Le même composant `CtaBand` termine l'accueil, la page À propos et les articles. Seuls le titre, la description et le libellé changent. C'est exactement le genre de répétition qu'un composant doit absorber.",
    },
  ],
}
