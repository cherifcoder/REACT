import type { CapstoneChapter } from '../types'

export const chapterContact: CapstoneChapter = {
  slug: 'page-contact',
  number: 11,
  title: 'Contact : formulaire validé, carte et FAQ',
  summary:
    "Le formulaire valide côté client puis prépare un e-mail prérempli. Aucun backend n'est nécessaire, mais chaque erreur est annoncée et chaque champ reste accessible.",
  duration: '90 min',
  blocks: [
    {
      type: 'p',
      text: "La page Contact a deux objectifs : rassurer et réduire la friction. On affiche les coordonnées réelles, les horaires, une carte stylisée, un formulaire court et quatre questions fréquentes. Le formulaire n'envoie rien à un serveur : il construit un lien `mailto:` avec un objet et un corps préremplis.",
    },
    {
      type: 'p',
      text: "Cette approche est parfaite pour un site vitrine sans backend. Elle a une limite : l'utilisateur doit avoir un client mail configuré. On l'explique donc clairement après l'envoi, en proposant l'adresse e-mail en clair comme solution de repli.",
    },
    {
      type: 'code',
      title: 'src/components/ContactForm.tsx — état, validation et mailto',
      lang: 'tsx',
      code: `import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Send } from 'lucide-react'
import { site } from '../data/site'
import { cn } from '../lib/utils'

type Fields = {
  name: string
  email: string
  organisation: string
  subject: string
  message: string
}

const initial: Fields = {
  name: '',
  email: '',
  organisation: '',
  subject: '',
  message: '',
}

const subjects = [
  'Demande de devis',
  'Formation ou atelier',
  'Collecte de données',
  'Analyse & visualisation',
  'Suivi-évaluation',
  'Autre demande',
]

const inputClass =
  'w-full rounded-xl border border-ink/15 bg-sand-50 px-4 py-3 text-[0.9rem] text-ink placeholder:text-ink/70 transition-colors focus:border-clay-500 focus:ring-2 focus:ring-clay-500/15 focus:outline-none'

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [sent, setSent] = useState(false)

  const update =
    (key: keyof Fields) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((prev) => ({ ...prev, [key]: event.target.value }))
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {}
    if (fields.name.trim().length < 2) next.name = 'Indiquez votre nom.'
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(fields.email.trim()))
      next.email = 'Indiquez une adresse e-mail valide.'
    if (!fields.subject) next.subject = 'Choisissez un objet.'
    if (fields.message.trim().length < 10)
      next.message = 'Décrivez votre besoin en quelques mots (10 caractères min.).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const mailtoHref = () => {
    const body = [
      'Nom : ' + fields.name,
      'E-mail : ' + fields.email,
      fields.organisation ? 'Organisation : ' + fields.organisation : '',
      '',
      fields.message,
    ]
      .filter(Boolean)
      .join('\\n')

    return (
      'mailto:' +
      site.email +
      '?subject=' +
      encodeURIComponent('[' + fields.subject + '] — ' + fields.name) +
      '&body=' +
      encodeURIComponent(body)
    )
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return
    setSent(true)
    window.location.href = mailtoHref()
  }

  return (
    <div className="relative rounded-2xl border border-ink/10 bg-sand-50 p-6 shadow-[0_30px_70px_-50px_rgba(12,42,69,0.4)] sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[26rem] flex-col items-center justify-center py-10 text-center"
          >
            <span className="grid size-14 place-items-center rounded-full bg-clay-500/10">
              <CheckCircle2 className="size-7 text-clay-600" strokeWidth={1.8} />
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
              Votre message est prêt !
            </h3>
            <p className="mt-3 max-w-sm text-[0.92rem] leading-relaxed text-ink/70">
              Votre logiciel de messagerie devrait s’ouvrir avec le message prérempli. Si ce n’est
              pas le cas, écrivez-nous directement :
            </p>
            <a
              href={mailtoHref()}
              className="mt-4 text-[0.92rem] font-medium text-clay-600 underline decoration-clay-500/40 underline-offset-4 transition hover:decoration-clay-500"
            >
              {site.email}
            </a>
            <button
              type="button"
              onClick={() => {
                setSent(false)
                setFields(initial)
              }}
              className="mt-8 text-[0.8rem] text-ink/70 underline underline-offset-4 transition hover:text-ink"
            >
              Rédiger un autre message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={false}
            onSubmit={onSubmit}
            noValidate
            className="space-y-5"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-semibold text-ink">Écrivez-nous</h2>
              <span className="font-mono text-[0.6rem] tracking-[0.14em] text-ink/70 uppercase">
                Réponse sous 24 h
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Votre nom" htmlFor="name" required error={errors.name}>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={fields.name}
                  onChange={update('name')}
                  placeholder="Aïssata Traoré"
                  className={cn(inputClass, errors.name && 'border-red-500/60')}
                />
              </Field>
              <Field label="Votre e-mail" htmlFor="email" required error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={update('email')}
                  placeholder="vous@organisation.org"
                  className={cn(inputClass, errors.email && 'border-red-500/60')}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Organisation" htmlFor="organisation">
                <input
                  id="organisation"
                  name="organisation"
                  autoComplete="organization"
                  value={fields.organisation}
                  onChange={update('organisation')}
                  placeholder="ONG, université, PME…"
                  className={inputClass}
                />
              </Field>
              <Field label="Objet" htmlFor="subject" required error={errors.subject}>
                <select
                  id="subject"
                  name="subject"
                  value={fields.subject}
                  onChange={update('subject')}
                  className={cn(
                    inputClass,
                    'appearance-none pr-10',
                    errors.subject && 'border-red-500/60',
                  )}
                >
                  <option value="" disabled>
                    Choisir un objet
                  </option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Votre message" htmlFor="message" required error={errors.message}>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={fields.message}
                onChange={update('message')}
                placeholder="Décrivez votre projet, vos données, vos échéances…"
                className={cn(inputClass, 'resize-y', errors.message && 'border-red-500/60')}
              />
            </Field>

            <p className="text-[0.72rem] leading-relaxed text-ink/70">
              En envoyant ce message, vous acceptez d’être contacté par DataSahel au sujet de votre
              demande. Vos informations ne sont jamais partagées.
            </p>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-clay-600 px-6 py-3.5 text-[0.92rem] font-medium text-sand-50 shadow-[0_14px_34px_-16px_rgba(185,77,21,0.8)] transition-all duration-300 hover:bg-navy-900"
            >
              Envoyer le message
              <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-center gap-1 text-[0.78rem] font-medium text-ink/70"
      >
        {label}
        {required && <span className="text-clay-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-[0.72rem] text-red-600">
          <AlertCircle className="size-3.5" /> {error}
        </p>
      )}
    </div>
  )
}`,
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'Échappe les expressions régulières',
      text: "Dans le code source, la regex s'écrit `/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/`. Si tu recopies cette leçon dans un fichier `.ts`, remplace les doubles barres obliques par des simples. C'est une particularité d'affichage de ce tutoriel, pas du JavaScript.",
    },
    {
      type: 'p',
      text: "La validation tient en quelques règles : nom d'au moins deux caractères, e-mail au format plausible, objet choisi, message d'au moins dix caractères. On ne valide pas l'existence réelle de l'adresse e-mail : cela demanderait un envoi serveur.",
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Validation au submit, pas à chaque frappe',
      text: "Afficher une erreur pendant que l'utilisateur tape est agressif. Ici, les erreurs apparaissent à la soumission, puis disparaissent dès que le champ concerné change. C'est le compromis le plus confortable.",
    },
    {
      type: 'code',
      title: 'src/pages/Contact.tsx — coordonnées et carte',
      lang: 'tsx',
      code: `import { ChevronDown, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { ContactForm } from '../components/ContactForm'
import { SocialLinks } from '../components/SocialLinks'
import { SectionLabel } from '../components/Patterns'
import { site } from '../data/site'

const faqs = [
  {
    q: 'Quels types de structures accompagnez-vous ?',
    a: 'Nous travaillons avec des ONG, des projets de développement, des universités et centres de recherche, des institutions publiques, des PME et des collectivités.',
  },
  {
    q: 'Proposez-vous des formations à distance ?',
    a: 'Oui. Nos ateliers sont proposés en présentiel à Bamako, en ligne ou en format hybride. Les contenus sont adaptés à votre niveau.',
  },
  {
    q: 'Comment se déroule une première collaboration ?',
    a: 'Nous commençons par un échange de cadrage gratuit. Nous proposons ensuite une note d’approche avec les livrables, le calendrier et le budget.',
  },
  {
    q: 'Travaillez-vous en dehors du Mali ?',
    a: 'Nous intervenons principalement au Mali et dans la sous-région. Pour les missions à distance, nous travaillons partout en Afrique francophone.',
  },
]

const mapsHref =
  'https://www.google.com/maps/search/?api=1&query=Kalaban+Coura+ACI+Bamako+Mali'

export function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Contactez DataSahel à Bamako, Mali : devis, formations, collecte de données, analyse statistique et suivi-évaluation. Réponse sous 24 heures."
      />

      <PageHero
        breadcrumb="Contact"
        kicker="Aides & support"
        title={
          <>
            Parlons de vos <span className="text-clay-600 italic">données</span>.
          </>
        }
        description="Une question, un projet, une formation à organiser ? Nous facilitons à nos partenaires la compréhension des effets de leurs actions et la valorisation des apprentissages."
      />

      <section className="shell py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div>
            <SectionLabel index="01">Nous joindre</SectionLabel>
            <h2 className="display-md mt-5">
              Une équipe joignable, à Bamako comme à distance.
            </h2>

            <div className="mt-8 space-y-3">
              <a
                href={'mailto:' + site.email}
                className="group flex items-start gap-4 rounded-2xl border border-ink/10 bg-sand-50 p-5 transition hover:border-clay-500/40 hover:bg-sand-100/50"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-clay-500/10 text-clay-600">
                  <Mail className="size-4.5" strokeWidth={1.7} />
                </span>
                <span>
                  <span className="block font-mono text-[0.6rem] tracking-[0.14em] text-ink/70 uppercase">
                    Écrivez-nous
                  </span>
                  <span className="mt-1 block text-[0.92rem] font-medium text-ink group-hover:text-clay-600">
                    {site.email}
                  </span>
                  <span className="block text-[0.85rem] text-ink/70">{site.emailAlt}</span>
                </span>
              </a>

              <a
                href={site.phoneHref}
                className="group flex items-start gap-4 rounded-2xl border border-ink/10 bg-sand-50 p-5 transition hover:border-clay-500/40 hover:bg-sand-100/50"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-clay-500/10 text-clay-600">
                  <Phone className="size-4.5" strokeWidth={1.7} />
                </span>
                <span>
                  <span className="block font-mono text-[0.6rem] tracking-[0.14em] text-ink/70 uppercase">
                    Appelez-nous
                  </span>
                  <span className="mt-1 block text-[0.92rem] font-medium text-ink group-hover:text-clay-600">
                    {site.phone}
                  </span>
                  <span className="flex items-center gap-1.5 text-[0.8rem] text-ink/70">
                    <Clock className="size-3" /> Lun – Sam · 8h – 18h GMT
                  </span>
                </span>
              </a>

              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-start gap-4 rounded-2xl border border-ink/10 bg-sand-50 p-5 transition hover:border-clay-500/40 hover:bg-sand-100/50"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-clay-500/10 text-clay-600">
                  <MapPin className="size-4.5" strokeWidth={1.7} />
                </span>
                <span>
                  <span className="block font-mono text-[0.6rem] tracking-[0.14em] text-ink/70 uppercase">
                    Rendez-nous visite
                  </span>
                  <span className="mt-1 block text-[0.92rem] font-medium text-ink group-hover:text-clay-600">
                    {site.address.street}
                  </span>
                  <span className="block text-[0.85rem] text-ink/70">
                    {site.address.city}, {site.address.country}
                  </span>
                </span>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-navy-900 p-5 text-sand-50">
              <div>
                <p className="flex items-center gap-2 font-medium">
                  <MessageCircle className="size-4 text-clay-400" /> Discuter avec nous
                </p>
                <p className="mt-1 font-mono text-[0.62rem] tracking-wide text-sand-100/65 uppercase">
                  Disponibilités 24/7
                </p>
              </div>
              <SocialLinks tone="light" />
            </div>

            <div className="relative mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-navy-900">
              <svg viewBox="0 0 400 180" className="h-44 w-full" aria-hidden="true">
                <rect width="400" height="180" fill="#0C2A45" />
                {[...Array(9)].map((_, i) => (
                  <line
                    key={'v' + i}
                    x1={i * 50}
                    y1="0"
                    x2={i * 50 - 20}
                    y2="180"
                    stroke="#F5ECDB"
                    strokeOpacity="0.07"
                  />
                ))}
                {[...Array(5)].map((_, i) => (
                  <line
                    key={'h' + i}
                    x1="0"
                    y1={i * 44}
                    x2="400"
                    y2={i * 44}
                    stroke="#F5ECDB"
                    strokeOpacity="0.07"
                  />
                ))}
                <path
                  d="M-10 128C60 118 120 150 190 138s130-42 220-18"
                  stroke="#2A6B99"
                  strokeWidth="10"
                  strokeOpacity="0.4"
                  fill="none"
                />
                <path
                  d="M-10 128C60 118 120 150 190 138s130-42 220-18"
                  stroke="#4A90BF"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                  fill="none"
                />
                <circle cx="205" cy="92" r="22" fill="#D9601F" fillOpacity="0.16" />
                <circle cx="205" cy="92" r="10" fill="#D9601F" fillOpacity="0.28" />
                <circle cx="205" cy="92" r="4.5" fill="#D9601F" />
                <text
                  x="224"
                  y="88"
                  fill="#FBF7EF"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="9"
                  letterSpacing="1.4"
                >
                  DATASAHEL
                </text>
                <text
                  x="224"
                  y="102"
                  fill="#FBF7EF"
                  fillOpacity="0.45"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="7.5"
                  letterSpacing="1.2"
                >
                  KALABAN COURA ACI
                </text>
              </svg>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-sand-100/10 bg-navy-950/60 px-4 py-2.5 backdrop-blur">
                <span className="font-mono text-[0.58rem] tracking-wide text-sand-100/65">
                  12.6392° N · 8.0029° W
                </span>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-[0.58rem] tracking-wide text-clay-300 transition hover:text-sand-50"
                >
                  Ouvrir dans Maps ↗
                </a>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-sand-100/40 py-16 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
          <div>
            <SectionLabel index="02">Questions fréquentes</SectionLabel>
            <h2 className="display-md mt-5">
              Tout ce qu’il faut savoir avant de démarrer.
            </h2>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/70">
              Une autre question ? Écrivez-nous à{' '}
              <a
                href={'mailto:' + site.email}
                className="text-clay-600 underline decoration-clay-500/40 underline-offset-4"
              >
                {site.email}
              </a>
              , nous répondons sous 24 heures.
            </p>
          </div>

          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.95rem] font-medium text-ink transition hover:text-clay-600 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-ink/15 transition group-open:rotate-180 group-open:border-clay-500/40 group-open:text-clay-600">
                    <ChevronDown className="size-3.5" />
                  </span>
                </summary>
                <p className="mt-3 max-w-xl pr-8 text-[0.88rem] leading-relaxed text-ink/70">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}`,
    },
    {
      type: 'callout',
      tone: 'tip',
      title: 'La FAQ native, sans JavaScript',
      text: "`<details>` et `<summary>` offrent un accordéon accessible et fonctionnel sans une ligne de JavaScript. `group-open:rotate-180` tourne le chevron quand la réponse est ouverte. C'est plus robuste qu'un accordéon maison.",
    },
    {
      type: 'p',
      text: "La carte est un SVG dessiné à la main, pas une iframe Google Maps. Elle charge instantanément, ne pose aucun problème de cookies et reste cohérente avec le design. Un lien « Ouvrir dans Maps » apporte la vraie fonctionnalité.",
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'Le mailto n’est pas une garantie de réception',
      text: "Le message est préparé dans le client mail de l'utilisateur. Il n'est envoyé que s'il clique sur « Envoyer ». Pour un vrai formulaire transactionnel, branche Formspree, Resend ou une fonction serverless, et conserve la validation côté client.",
    },
  ],
}
