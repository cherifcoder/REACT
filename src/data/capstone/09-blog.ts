import type { CapstoneChapter } from '../types'

export const chapterBlog: CapstoneChapter = {
  slug: 'blog-liste',
  number: 9,
  title: 'Blog : liste filtrable, article à la une et couvertures générées',
  summary:
    "Le journal filtre par catégorie et met un article en avant. Les couvertures sont dessinées en CSS et en SVG, ce qui évite six images lourdes à charger.",
  duration: '75 min',
  blocks: [
    {
      type: 'p',
      text: "Le blog n'est pas un simple listing : il doit donner envie de lire. DataSahel met le premier article en grand, puis aligne les suivants en cartes. Un filtre par catégorie, des tags, un temps de lecture et une couverture graphique suffisent à créer une vraie expérience éditoriale.",
    },
    {
      type: 'code',
      title: 'src/pages/Blog.tsx',
      lang: 'tsx',
      code: `import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { PostCard } from '../components/PostCard'
import { PostCover } from '../components/PostCover'
import { CtaBand } from '../components/CtaBand'
import { SectionLabel } from '../components/Patterns'
import { posts } from '../data/posts'
import { cn } from '../lib/utils'

export function Blog() {
  const categories = useMemo(
    () => ['Tous', ...new Set(posts.map((post) => post.category))],
    [],
  )
  const [active, setActive] = useState('Tous')

  const filtered = active === 'Tous'
    ? posts
    : posts.filter((post) => post.category === active)
  const [lead, ...rest] = filtered

  return (
    <>
      <Seo
        title="Blog"
        description="Articles et méthodes DataSahel sur la collecte de données, l’analyse statistique, la visualisation et le suivi-évaluation de projets."
      />

      <PageHero
        breadcrumb="Blog"
        kicker="Le journal DataSahel"
        title={
          <>
            Comprendre la donnée,{' '}
            <span className="text-clay-600 italic">méthode</span> après méthode.
          </>
        }
        description="Des articles courts et concrets pour mieux collecter, analyser, visualiser et valoriser vos données — écrits par ceux qui les manipulent au quotidien."
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              className={cn(
                'rounded-full border px-4 py-2 font-mono text-[0.68rem] tracking-wide uppercase transition-all duration-300',
                active === category
                  ? 'border-navy-900 bg-navy-900 text-sand-50'
                  : 'border-ink/15 text-ink/70 hover:border-clay-500/50 hover:text-clay-600',
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="shell py-16 sm:py-20">
        {filtered.length === 0 ? (
          <p className="text-ink/70">Aucun article dans cette catégorie pour le moment.</p>
        ) : (
          <>
            {lead && (
              <Link
                to={'/blog/' + lead.slug}
                className="group grid gap-7 border-b border-ink/10 pb-12 sm:pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12"
              >
                <div className="overflow-hidden rounded-2xl">
                  <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]">
                    <PostCover variant={lead.cover} className="aspect-[16/10] lg:aspect-[4/3]" />
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-clay-500/10 px-3 py-1 font-mono text-[0.62rem] tracking-[0.1em] text-clay-700 uppercase">
                      À la une
                    </span>
                    <span className="font-mono text-[0.68rem] text-ink/70">{lead.category}</span>
                    <span className="size-1 rounded-full bg-ink/20" />
                    <span className="flex items-center gap-1.5 font-mono text-[0.68rem] text-ink/70">
                      <Clock className="size-3" /> {lead.readingTime}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.12] font-semibold text-ink transition-colors group-hover:text-clay-600">
                    {lead.title}
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-ink/70">{lead.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4">
                    <span className="inline-flex items-center gap-2 text-[0.85rem] font-medium text-navy-800 transition group-hover:text-clay-600">
                      Lire l’article
                      <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="font-mono text-[0.66rem] text-ink/70">{lead.date}</span>
                  </div>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className="mt-12">
                <SectionLabel index="02">Tous les articles</SectionLabel>
                <div className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <CtaBand
        title="Une question de méthode ? Écrivons-la ensemble."
        description="Vous souhaitez un article sur un sujet précis, ou un accompagnement sur vos données ? Notre équipe vous répond."
        primaryLabel="Nous contacter"
      />
    </>
  )
}`,
    },
    {
      type: 'callout',
      tone: 'info',
      title: '`new Set` pour les catégories',
      text: "`['Tous', ...new Set(posts.map((post) => post.category))]` déduplique les catégories sans écrire de boucle. L'ordre suit la première apparition dans le tableau. C'est suffisant ici, et cela évite une liste de catégories à maintenir manuellement.",
    },
    {
      type: 'p',
      text: "La carte d'article accepte une variante `large` pour l'article à la une. Elle n'affiche pas seulement une image : elle porte la catégorie, la date, le temps de lecture, le titre, l'extrait et une invitation. Chaque information est utile au choix de lecture.",
    },
    {
      type: 'code',
      title: 'src/components/PostCard.tsx',
      lang: 'tsx',
      code: `import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock } from 'lucide-react'
import type { Post } from '../data/posts'
import { PostCover } from './PostCover'
import { cn } from '../lib/utils'

export function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <Link
      to={'/blog/' + post.slug}
      className={cn(
        'group flex flex-col',
        large && 'sm:grid sm:grid-cols-2 sm:items-center sm:gap-8',
      )}
    >
      <div className="overflow-hidden rounded-2xl">
        <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.035]">
          <PostCover
            variant={post.cover}
            className={large ? 'aspect-[16/10] sm:aspect-[5/4]' : 'aspect-[16/10]'}
          />
        </div>
      </div>

      <div className={cn('flex flex-1 flex-col', large ? 'mt-6 sm:mt-0' : 'mt-5')}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-clay-500/10 px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.1em] text-clay-700 uppercase">
            {post.category}
          </span>
          <span className="font-mono text-[0.66rem] text-ink/70">{post.date}</span>
          <span className="flex items-center gap-1 font-mono text-[0.66rem] text-ink/70">
            <Clock className="size-3" /> {post.readingTime}
          </span>
        </div>

        <h3
          className={cn(
            'mt-3 font-display leading-snug font-semibold text-ink transition-colors duration-300 group-hover:text-clay-600',
            large ? 'text-2xl sm:text-[1.85rem]' : 'text-[1.24rem]',
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            'mt-2.5 leading-relaxed text-ink/70',
            large ? 'text-[0.98rem]' : 'text-[0.88rem]',
          )}
        >
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-navy-800 transition-colors group-hover:text-clay-600">
          Lire l’article
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}`,
    },
    {
      type: 'p',
      text: "Les couvertures sont l'astuce la plus rentable du projet : quatre variantes (`grid`, `arcs`, `bars`, `rings`), dessinées en CSS et en SVG. Le site reste léger, cohérent, et chaque article a une identité visuelle sans banque d'images.",
    },
    {
      type: 'code',
      title: 'src/components/PostCover.tsx — variantes',
      lang: 'tsx',
      code: `import { cn } from '../lib/utils'
import type { Post } from '../data/posts'

export function PostCover({
  variant,
  className,
}: {
  variant: Post['cover']
  className?: string
}) {
  return (
    <div
      className={cn('grain relative w-full overflow-hidden rounded-2xl', className)}
      aria-hidden="true"
    >
      {variant === 'grid' && (
        <div className="absolute inset-0 bg-navy-900">
          <div className="absolute inset-0 dot-grid-light opacity-60" />
          <div className="absolute -top-16 -right-14 size-56 rounded-full bg-clay-500" />
          <div className="absolute -top-6 -right-4 size-24 rounded-full border border-sand-100/25" />
          <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full">
            <path
              d="M-10 160 60 140 110 150 160 112 205 124 252 84 330 96"
              fill="none"
              stroke="#F5ECDB"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {[
              [60, 140],
              [110, 150],
              [160, 112],
              [205, 124],
              [252, 84],
            ].map(([x, y]) => (
              <circle
                key={x + '-' + y}
                cx={x}
                cy={y}
                r="4"
                fill="#FBF7EF"
                stroke="#0C2A45"
                strokeWidth="2"
              />
            ))}
          </svg>
          <div className="absolute bottom-5 left-5 flex items-end gap-2">
            {[18, 30, 24, 42, 36].map((h, i) => (
              <span
                key={i}
                className={cn('w-2.5 rounded-sm', i === 3 ? 'bg-clay-400' : 'bg-sand-100/35')}
                style={{ height: h }}
              />
            ))}
          </div>
          <span className="absolute bottom-6 left-1/3 font-mono text-[0.55rem] tracking-[0.22em] text-sand-100/65 uppercase">
            data / terrain
          </span>
        </div>
      )}

      {variant === 'arcs' && (
        <div className="absolute inset-0 bg-clay-500">
          <div className="absolute inset-0 bogolan opacity-45" />
          <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full">
            {[40, 64, 88, 112, 136, 160].map((r, i) => (
              <circle
                key={r}
                cx="252"
                cy="180"
                r={r}
                fill="none"
                stroke="#FBF7EF"
                strokeWidth={i === 2 ? 2 : 1}
                opacity={0.75 - i * 0.08}
              />
            ))}
            <circle cx="62" cy="56" r="26" fill="#FBF7EF" fillOpacity="0.16" />
            <circle cx="62" cy="56" r="26" fill="none" stroke="#FBF7EF" strokeWidth="1" />
          </svg>
          <span className="absolute bottom-6 left-6 font-mono text-[0.55rem] tracking-[0.22em] text-sand-50/60 uppercase">
            comprendre / décider
          </span>
        </div>
      )}

      {variant === 'bars' && (
        <div className="absolute inset-0 bg-sand-200">
          <div className="absolute inset-0 bogolan opacity-30" />
          <div className="absolute top-8 right-8 size-20 rounded-full bg-clay-500/90" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-4 px-8">
            {[34, 58, 46, 78, 62, 96, 72].map((h, i) => (
              <span
                key={i}
                className={cn('w-6 rounded-t-sm', i === 5 ? 'bg-clay-500' : 'bg-navy-900/80')}
                style={{ height: h }}
              />
            ))}
          </div>
          <div className="absolute top-8 left-8 font-mono text-[0.55rem] tracking-[0.22em] text-navy-900/45 uppercase">
            collecte · analyse
          </div>
        </div>
      )}

      {variant === 'rings' && (
        <div className="absolute inset-0 bg-navy-800">
          <div className="absolute inset-0 dot-grid-light opacity-40" />
          <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full">
            {[28, 52, 76, 100].map((r, i) => (
              <circle
                key={r}
                cx="170"
                cy="100"
                r={r}
                fill="none"
                stroke={i === 3 ? '#D9601F' : '#F5ECDB'}
                strokeOpacity={i === 3 ? 0.9 : 0.22}
                strokeWidth={i === 3 ? 2 : 1}
              />
            ))}
            <circle cx="170" cy="100" r="20" fill="#D9601F" />
            <path d="M170 100 242 128" stroke="#F5ECDB" strokeWidth="1.4" strokeDasharray="3 4" />
            <circle cx="242" cy="128" r="3.5" fill="#F5ECDB" />
          </svg>
          <span className="absolute bottom-6 left-6 font-mono text-[0.55rem] tracking-[0.22em] text-sand-100/65 uppercase">
            mesurer / apprendre
          </span>
        </div>
      )}
    </div>
  )
}`,
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'Un `aria-hidden` assumé',
      text: "La couverture est purement décorative : le titre et la catégorie portent déjà l'information. La masquer aux technologies d'assistance évite d'annoncer un contenu visuel inutile. En revanche, ne masque jamais une image qui apporte une information absente du texte.",
    },
  ],
}
