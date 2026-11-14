import type { CourseModule } from '../types'

export const module4: CourseModule = {
  slug: 'formulaires',
  number: 4,
  title: 'Formulaires React',
  tagline: 'Saisie, validation, accessibilité et envoi serveur.',
  description:
    "Un formulaire est le point de contact entre l'utilisateur et ton application. Tu apprends à le contrôler avec l'état React, à valider sans frustrer, à le rendre accessible au clavier et au lecteur d'écran, puis à passer à React Hook Form + Zod pour les formulaires complexes et à envoyer les données proprement.",
  icon: 'clipboard',
  accent: 'sky',
  level: 'Intermédiaire',
  duration: 480,
  outcomes: [
    'Différencier formulaire contrôlé et non contrôlé et choisir la bonne approche',
    'Gérer un objet de formulaire typé avec un seul état et des mises à jour génériques',
    'Écrire des règles de validation claires et afficher les erreurs au bon moment',
    'Rendre un formulaire accessible : labels, aria, focus, messages d’erreur',
    'Gérer select, checkbox, radio, fichiers et formulaires multi-étapes',
    'Construire un formulaire robuste avec React Hook Form, Zod et TypeScript',
    'Envoyer les données à une API avec états de chargement, erreurs serveur et annulation',
  ],
  lessons: [
    {
      id: 'formulaires-react',
      title: 'Contrôlé ou non contrôlé ?',
      duration: 30,
      summary:
        "Comprendre les deux modèles de formulaire et savoir lequel choisir selon le besoin.",
      blocks: [
        {
          type: 'p',
          text: "En HTML, un champ garde sa propre valeur. React peut soit **laisser le DOM gérer** (non contrôlé), soit **posséder la valeur** dans l'état (contrôlé). Les deux sont valides ; le choix dépend de ce que tu dois faire de la valeur pendant la saisie.",
        },
        {
          type: 'table',
          headers: ['Critère', 'Contrôlé', 'Non contrôlé'],
          rows: [
            ['Source de vérité', 'État React', 'DOM'],
            ['Validation en direct', 'Facile', 'Possible mais moins direct'],
            ['Champs dépendants', 'Naturel', 'Plus complexe'],
            ['Performance', 'Un rendu par frappe', 'Aucun rendu React'],
            ['Valeur initiale', '`value` + état', '`defaultValue`'],
            ['Récupération', 'Depuis l’état', '`FormData` ou `ref`'],
          ],
        },
        {
          type: 'code',
          title: 'Champ contrôlé',
          lang: 'tsx',
          code: `const [email, setEmail] = useState('')

<input
  value={email}
  onChange={(event) => setEmail(event.target.value)}
  type="email"
  name="email"
/>`,
        },
        {
          type: 'code',
          title: 'Champ non contrôlé + FormData',
          lang: 'tsx',
          code: `function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  const email = String(data.get('email') ?? '')
  console.log({ email })
}

<form onSubmit={handleSubmit}>
  <input name="email" type="email" defaultValue="" />
  <button type="submit">Envoyer</button>
</form>`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'La règle pratique',
          text: "Utilise un champ contrôlé dès que l'interface doit réagir à la saisie (compteur de caractères, aperçu, validation instantanée, dépendance entre champs). Pour un formulaire simple envoyé d'un bloc, `FormData` est plus léger. Pour un formulaire complexe, React Hook Form gère les deux mondes.",
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'value sans onChange = champ figé',
          text: "Si tu passes `value` sans `onChange`, React considère le champ comme contrôlé et lecture seule. Tu verras un avertissement dans la console. Ajoute le handler ou utilise `defaultValue`.",
        },
      ],
    },
    {
      id: 'state-formulaire',
      title: 'Un état typé pour tout le formulaire',
      duration: 40,
      summary:
        "Éviter cinq useState : centraliser les champs dans un objet avec une mise à jour générique.",
      blocks: [
        {
          type: 'p',
          text: "Un formulaire de contact a souvent cinq champs. Cinq `useState` séparés fonctionnent, mais deviennent vite ingérables dès qu'on ajoute la validation, la réinitialisation ou l'envoi. Un seul objet d'état, typé, est plus simple à raisonner.",
        },
        {
          type: 'code',
          title: 'État unique + mise à jour générique',
          lang: 'tsx',
          code: `import { useState, type ChangeEvent, type FormEvent } from 'react'

type ContactFields = {
  name: string
  email: string
  subject: string
  message: string
}

const initialFields: ContactFields = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(initialFields)

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target
    setFields((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(fields)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={fields.name}
        onChange={updateField}
        placeholder="Votre nom"
      />
      <input
        name="email"
        type="email"
        value={fields.email}
        onChange={updateField}
        placeholder="vous@exemple.com"
      />
      <select name="subject" value={fields.subject} onChange={updateField}>
        <option value="">Choisir un objet</option>
        <option value="devis">Demande de devis</option>
        <option value="formation">Formation</option>
      </select>
      <textarea
        name="message"
        value={fields.message}
        onChange={updateField}
        rows={5}
      />
      <button type="submit">Envoyer</button>
    </form>
  )
}`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Le piège du name manquant',
          text: "La mise à jour générique repose sur `event.target.name`. Si tu oublies l'attribut `name`, la clé devient une chaîne vide et l'état se corrompt. Ajoute `name` sur chaque champ, même quand tu utilises un composant maison.",
        },
        {
          type: 'h',
          text: 'Réinitialiser proprement',
        },
        {
          type: 'code',
          lang: 'tsx',
          code: `function reset() {
  setFields(initialFields)
  setErrors({})
  setStatus('idle')
}

// ⚠️ Ne fais pas setFields({ ...fields }) : ce n'est pas une remise à zéro.
// ✅ setFields(initialFields) remplace tout l'objet.`,
        },
        {
          type: 'list',
          items: [
            'Le nom des clés doit correspondre aux attributs `name` des champs.',
            'Utilise `setFields(previous => ...)` pour éviter les états obsolètes.',
            'Ne mute jamais l’objet : crée toujours un nouvel objet avec le spread.',
            'Garde les valeurs initiales dans une constante réutilisable.',
          ],
        },
      ],
    },
    {
      id: 'validation',
      title: 'Valider sans frustrer',
      duration: 45,
      summary:
        "Règles, regex, messages utiles, validation au submit et strategie de validation en direct.",
      blocks: [
        {
          type: 'p',
          text: "Une bonne validation empêche les erreurs **et** explique comment les corriger. Valide au moment de la soumission, puis en direct une fois que l'utilisateur a déjà quitté le champ (`onBlur`) ou tenté d'envoyer. Ne l'interromps pas à chaque frappe dès le premier caractère.",
        },
        {
          type: 'code',
          title: 'Un validateur qui retourne les erreurs',
          lang: 'tsx',
          code: `type Errors = Partial<Record<keyof ContactFields, string>>

function validate(fields: ContactFields): Errors {
  const errors: Errors = {}

  if (fields.name.trim().length < 2) {
    errors.name = 'Indique ton nom (2 caractères minimum).'
  }

  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Cette adresse e-mail ne semble pas valide.'
  }

  if (!fields.subject) {
    errors.subject = 'Choisis un objet.'
  }

  if (fields.message.trim().length < 20) {
    errors.message = 'Décris ton besoin en 20 caractères minimum.'
  }

  return errors
}`,
        },
        {
          type: 'code',
          title: 'Soumission : valider puis bloquer',
          lang: 'tsx',
          code: `const [errors, setErrors] = useState<Errors>({})

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const nextErrors = validate(fields)
  setErrors(nextErrors)

  if (Object.keys(nextErrors).length > 0) {
    const firstInvalid = Object.keys(nextErrors)[0]
    document.querySelector<HTMLElement>('[name="' + firstInvalid + '"]')?.focus()
    return
  }

  // envoyer
}`,
        },
        {
          type: 'table',
          headers: ['Règle', 'Message faible', 'Message utile'],
          rows: [
            ['Champ requis', 'Champ invalide', 'Indique ton nom pour continuer.'],
            ['E-mail', 'Erreur', 'Cette adresse e-mail ne semble pas valide.'],
            ['Mot de passe', 'Trop court', 'Utilise au moins 8 caractères, dont un chiffre.'],
            ['Longueur max', 'Erreur 400', 'Limite : 500 caractères (il te reste 42).'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Affiche les erreurs au bon endroit',
          text: "Le message doit être **sous le champ concerné**, avec un lien visuel (bordure rouge + icône). Un résumé en haut du formulaire est utile pour les longs formulaires, mais ne remplace pas les messages par champ. Et toujours : `aria-invalid` + `aria-describedby`.",
        },
        {
          type: 'callout',
          tone: 'danger',
          title: 'La validation client ne remplace jamais le serveur',
          text: "Tout ce qui s'exécute dans le navigateur peut être contourné. La validation côté client améliore l'expérience ; la validation côté serveur protège les données. Les deux sont nécessaires, surtout pour les montants, les rôles et les fichiers.",
        },
      ],
    },
    {
      id: 'accessibilite-formulaires',
      title: 'Des formulaires accessibles',
      duration: 40,
      summary:
        "Labels, aria-describedby, focus, contraste, messages d'erreur et navigation clavier.",
      blocks: [
        {
          type: 'p',
          text: "Un formulaire accessible se remplit au clavier, s'annonce correctement au lecteur d'écran et signale les erreurs sans dépendre uniquement de la couleur. La base est simple : **chaque champ a un label**, **chaque erreur est reliée au champ**, **le focus est visible**.",
        },
        {
          type: 'code',
          title: 'Le pattern Field complet',
          lang: 'tsx',
          code: `import type { ReactNode } from 'react'

type FieldProps = {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
}

export function Field({ id, label, error, hint, required, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1 text-sm font-medium">
        {label}
        {required && <span className="text-coral-500" aria-hidden="true">*</span>}
      </label>

      {children}

      {hint && !error && (
        <p id={id + '-hint'} className="mt-1.5 text-xs text-ink-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={id + '-error'} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}`,
        },
        {
          type: 'code',
          title: 'Le champ reçoit les attributs ARIA',
          lang: 'tsx',
          code: `<input
  id="email"
  name="email"
  type="email"
  autoComplete="email"
  aria-invalid={Boolean(errors.email)}
  aria-describedby={
    errors.email ? 'email-error' : 'email-hint'
  }
  className={
    'w-full rounded-xl border px-4 py-3 ' +
    (errors.email ? 'border-red-500' : 'border-ink-900/15')
  }
/>`,
        },
        {
          type: 'list',
          items: [
            '`label htmlFor` doit pointer vers l’`id` du champ. Un placeholder n’est pas un label.',
            '`aria-invalid` indique l’état d’erreur ; `aria-describedby` relie le message.',
            '`role="alert"` sur le message d’erreur le fait annoncer dès son apparition.',
            '`autoComplete` aide les gestionnaires de mots de passe et les utilisateurs.',
            'Ne bloque pas le collage dans les champs mot de passe.',
            'Le focus doit être visible et se déplacer vers le premier champ invalide.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Tester au clavier',
          text: "Parcours ton formulaire uniquement avec Tab, Maj+Tab, Espace et Entrée. Tu dois pouvoir atteindre chaque champ, voir où tu es, cocher les cases et soumettre. Si une étape est impossible, le formulaire n'est pas accessible.",
        },
      ],
    },
    {
      id: 'types-champs',
      title: 'Select, checkbox, radio, fichier',
      duration: 40,
      summary:
        "Gérer chaque type de champ avec le bon état, les bonnes props et les bons événements.",
      blocks: [
        {
          type: 'p',
          text: "Tous les champs ne se traitent pas comme un `input text`. Les cases à cocher utilisent `checked`, les groupes radio partagent un `name`, les fichiers utilisent `event.target.files`, et les selects peuvent être simples ou multiples.",
        },
        {
          type: 'code',
          title: 'Checkbox et radio contrôlés',
          lang: 'tsx',
          code: `const [newsletter, setNewsletter] = useState(false)
const [plan, setPlan] = useState<'starter' | 'pro' | 'team'>('starter')

<label className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={newsletter}
    onChange={(event) => setNewsletter(event.target.checked)}
  />
  Recevoir la newsletter
</label>

<fieldset>
  <legend>Choisis un plan</legend>
  {(['starter', 'pro', 'team'] as const).map((value) => (
    <label key={value} className="flex items-center gap-2">
      <input
        type="radio"
        name="plan"
        value={value}
        checked={plan === value}
        onChange={() => setPlan(value)}
      />
      {value}
    </label>
  ))}
</fieldset>`,
        },
        {
          type: 'code',
          title: 'Fichier : aperçu et validation',
          lang: 'tsx',
          code: `const [file, setFile] = useState<File | null>(null)
const [preview, setPreview] = useState<string | null>(null)

function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
  const selected = event.target.files?.[0] ?? null

  if (selected && selected.size > 2 * 1024 * 1024) {
    alert('Le fichier dépasse 2 Mo.')
    event.target.value = ''
    return
  }

  setFile(selected)
  setPreview(selected ? URL.createObjectURL(selected) : null)
}

<input type="file" accept="image/*" onChange={handleFile} />
{preview && <img src={preview} alt="Aperçu" className="mt-3 size-24 rounded-lg object-cover" />}`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Libère les URL d’aperçu',
          text: "`URL.createObjectURL` crée une référence qui reste en mémoire. Appelle `URL.revokeObjectURL(preview)` quand tu remplaces l'image ou démontes le composant, idéalement dans un `useEffect` de nettoyage.",
        },
        {
          type: 'table',
          headers: ['Champ', 'Prop de valeur', 'Événement', 'Détail'],
          rows: [
            ['text / email', 'value', 'onChange', '`event.target.value`'],
            ['checkbox', 'checked', 'onChange', '`event.target.checked`'],
            ['radio', 'checked', 'onChange', 'Partager `name` entre les options'],
            ['select', 'value', 'onChange', '`multiple` → tableau'],
            ['file', '— (non contrôlé)', 'onChange', '`event.target.files`'],
            ['textarea', 'value', 'onChange', '`rows` pour la hauteur'],
          ],
        },
      ],
    },
    {
      id: 'formulaire-multi-etapes',
      title: 'Formulaire multi-étapes',
      duration: 45,
      summary:
        "Découper un long formulaire en étapes, valider chaque étape et conserver les données.",
      blocks: [
        {
          type: 'p',
          text: "Un formulaire de 20 champs décourage. Découpe-le en 3 ou 4 étapes logiques. L'état global reste dans le parent ; chaque étape reçoit les valeurs et une fonction de mise à jour. On valide l'étape courante avant de passer à la suivante, et on peut revenir sans perdre la saisie.",
        },
        {
          type: 'code',
          title: 'Structure du wizard',
          lang: 'tsx',
          code: `type FormData = {
  firstName: string
  lastName: string
  email: string
  company: string
  plan: 'starter' | 'pro' | 'team' | ''
}

const steps = ['Identité', 'Entreprise', 'Confirmation'] as const

export function SignupWizard() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    plan: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: '' }))
  }

  function next() {
    const currentErrors = validateStep(step, data)
    setErrors(currentErrors)
    if (Object.keys(currentErrors).length === 0) setStep((value) => value + 1)
  }

  return (
    <div>
      <ol className="mb-8 flex gap-4">
        {steps.map((label, index) => (
          <li key={label} className={index <= step ? 'text-brand-600' : 'text-ink-400'}>
            {index + 1}. {label}
          </li>
        ))}
      </ol>

      {step === 0 && <IdentityStep data={data} update={update} errors={errors} />}
      {step === 1 && <CompanyStep data={data} update={update} errors={errors} />}
      {step === 2 && <ReviewStep data={data} />}

      <div className="mt-8 flex justify-between">
        <button type="button" disabled={step === 0} onClick={() => setStep((v) => v - 1)}>
          Retour
        </button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={next}>Continuer</button>
        ) : (
          <button type="button" onClick={() => submit(data)}>Créer le compte</button>
        )}
      </div>
    </div>
  )
}`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Valide par étape, pas tout à la fin',
          text: "L'utilisateur doit corriger ses erreurs au moment où il les crée. Valide les champs de l'étape courante avant de passer à la suivante. À la dernière étape, revalide tout avant l'envoi : une étape précédente a pu être modifiée.",
        },
        {
          type: 'list',
          items: [
            'Affiche une barre de progression et le nombre d’étapes restantes.',
            'Conserve les données quand on revient en arrière.',
            'Ne montre pas les erreurs des étapes non visitées.',
            'Désactive le bouton pendant l’envoi et empêche le double-clic.',
            'Sauvegarde un brouillon dans `localStorage` pour les formulaires longs.',
          ],
        },
      ],
    },
    {
      id: 'react-hook-form-zod',
      title: 'React Hook Form + Zod + TypeScript',
      duration: 55,
      summary:
        "Le stack professionnel : moins de rendus, validation déclarative, types inférés et erreurs fiables.",
      blocks: [
        {
          type: 'p',
          text: "Au-delà de 5 champs, gérer chaque rendu et chaque erreur à la main devient coûteux. **React Hook Form** gère les champs avec des refs (moins de rendus) et **Zod** décrit le schéma de validation en TypeScript. Les types du formulaire sont inférés du schéma : une seule source de vérité.",
        },
        {
          type: 'code',
          title: 'Installation',
          lang: 'bash',
          code: `npm install react-hook-form zod @hookform/resolvers`,
        },
        {
          type: 'code',
          title: 'Schéma Zod et formulaire complet',
          lang: 'tsx',
          code: `import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const signupSchema = z
  .object({
    name: z.string().min(2, 'Indique ton nom.'),
    email: z.string().email('Adresse e-mail invalide.'),
    password: z.string().min(8, '8 caractères minimum.'),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirm'],
  })

type SignupValues = z.infer<typeof signupSchema>

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', confirm: '' },
  })

  async function onSubmit(values: SignupValues) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name">Nom</label>
        <input id="name" {...register('name')} aria-invalid={Boolean(errors.name)} />
        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Mot de passe</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirm">Confirmation</label>
        <input id="confirm" type="password" {...register('confirm')} />
        {errors.confirm && <p role="alert">{errors.confirm.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Création…' : 'Créer le compte'}
      </button>
    </form>
  )
}`,
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Zod 3 ou Zod 4 ?',
          text: "Selon la version installée, `z.string().email()` peut être marqué comme déprécié au profit de `z.email()`. Les deux fonctionnent dans la majorité des projets. Vérifie la version dans `package.json` et consulte la documentation officielle si TypeScript se plaint.",
        },
        {
          type: 'table',
          headers: ['API', 'Rôle'],
          rows: [
            ['register("champ")', 'Relie un input au formulaire (ref, name, onChange)'],
            ['handleSubmit(fn)', 'Valide puis appelle `fn` avec les données typées'],
            ['formState.errors', 'Erreurs par champ, avec messages Zod'],
            ['formState.isSubmitting', 'État d’envoi asynchrone'],
            ['watch("champ")', 'Observe une valeur (rendu à chaque changement)'],
            ['setValue / reset', 'Modifie ou réinitialise le formulaire'],
            ['useFieldArray', 'Listes dynamiques de champs'],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: '`watch` peut ruiner la performance',
          text: "`watch()` sans argument re-rend le formulaire à chaque frappe. Préfère `watch('champ')` ciblé ou `useWatch({ control, name })`. Et ne mélange pas `value` contrôlé avec `register` : choisis un modèle.",
        },
      ],
    },
    {
      id: 'envoi-api',
      title: 'Envoyer à une API sans casser l’UX',
      duration: 45,
      summary:
        "États loading/success/error, gestion des erreurs serveur, double-clic et annulation.",
      blocks: [
        {
          type: 'p',
          text: "Un formulaire ne s'arrête pas à la validation : il faut envoyer, attendre, gérer l'erreur et informer l'utilisateur. Trois états suffisent souvent : `idle`, `loading`, `success` ou `error`. Le bouton doit refléter l'état et empêcher le double-envoi.",
        },
        {
          type: 'code',
          title: 'Soumission async robuste',
          lang: 'tsx',
          code: `type SubmitState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string }

export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ status: 'idle' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state.status === 'loading') return

    const data = new FormData(event.currentTarget)
    setState({ status: 'loading' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.message ?? 'Le serveur a refusé la demande.')
      }

      setState({ status: 'success', message: 'Message envoyé. Réponse sous 24 h.' })
      event.currentTarget.reset()
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Erreur réseau.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* champs */}
      <button type="submit" disabled={state.status === 'loading'}>
        {state.status === 'loading' ? 'Envoi…' : 'Envoyer'}
      </button>

      {state.status === 'success' && <p role="status">{state.message}</p>}
      {state.status === 'error' && <p role="alert">{state.message}</p>}
    </form>
  )
}`,
        },
        {
          type: 'callout',
          tone: 'danger',
          title: 'Ne montre jamais l’erreur brute du serveur',
          text: "Une stack trace ou un message SQL dans l'interface, c'est une fuite d'information. Affiche un message utilisateur clair et journalise les détails côté client ou serveur. Les erreurs 400 (validation) peuvent être associées aux champs ; les 500 restent génériques.",
        },
        {
          type: 'list',
          items: [
            'Désactive le bouton pendant l’envoi et ignore les soumissions multiples.',
            'Associe les erreurs de validation serveur aux champs concernés.',
            'Conserve les données saisies en cas d’échec : ne réinitialise jamais avant le succès.',
            'Utilise `AbortController` pour annuler une requête si le composant est démonté.',
            'Prévois un délai et un message si le réseau est lent.',
          ],
        },
        {
          type: 'code',
          title: 'Annuler une requête au démontage',
          lang: 'tsx',
          code: `useEffect(() => {
  const controller = new AbortController()

  fetch('/api/data', { signal: controller.signal }).catch((error) => {
    if (error.name !== 'AbortError') console.error(error)
  })

  return () => controller.abort()
}, [])`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'm4-p1',
      moduleId: 'm4',
      title: 'Formulaire de contact',
      level: 2,
      time: '45 min',
      summary:
        "Nom, e-mail, objet et message avec validation, compteur de caractères et écran de succès.",
      skills: ['état', 'validation', 'accessibilité', 'UX'],
      steps: [
        'Crée un état `fields` et un état `errors` typés.',
        'Valide le nom (2 caractères), l’e-mail (regex), l’objet (requis) et le message (20 caractères).',
        'Affiche les erreurs sous chaque champ avec `aria-invalid` et `aria-describedby`.',
        'Ajoute un compteur de caractères sous le message et bloque au-delà de 500.',
        'Après succès, affiche un écran de confirmation avec un bouton « Nouveau message ».',
      ],
      bonus: [
        'Pré-remplis l’objet via un paramètre d’URL (`?sujet=devis`).',
        'Sauvegarde un brouillon dans `localStorage` toutes les 5 secondes.',
      ],
    },
    {
      id: 'm4-p2',
      moduleId: 'm4',
      title: 'Inscription newsletter',
      level: 2,
      time: '30 min',
      summary:
        "Un champ e-mail compact avec validation instantanée et message de succès animé.",
      skills: ['contrôlé', 'validation', 'états'],
      steps: [
        'Crée un formulaire inline avec un champ e-mail et un bouton.',
        'Valide l’e-mail à la soumission et affiche une erreur sous le champ.',
        'Passe le bouton en état `loading` pendant 800 ms.',
        'Affiche un message de succès avec une icône `CheckCircle2`.',
        'Ajoute une case à cocher pour accepter la politique de confidentialité.',
      ],
      bonus: [
        'Ajoute un état « déjà inscrit » simulé pour `test@example.com`.',
        'Ajoute une animation de remplacement entre le formulaire et le succès.',
      ],
    },
    {
      id: 'm4-p3',
      moduleId: 'm4',
      title: 'Écran de connexion',
      level: 3,
      time: '1 h',
      summary:
        "Connexion e-mail/mot de passe avec affichage du mot de passe et erreurs serveur simulées.",
      skills: ['formulaires', 'loading', 'erreurs', 'accessibilité'],
      steps: [
        'Crée les champs e-mail et mot de passe avec un état unique.',
        'Ajoute un bouton œil pour basculer `type="password"` / `type="text"`.',
        'Simule un appel API : si l’e-mail est `demo@test.com` et le mot de passe `password123`, succès ; sinon erreur 401.',
        'Affiche l’erreur serveur au-dessus du bouton avec `role="alert"`.',
        'Désactive le bouton et affiche un spinner pendant la requête.',
      ],
      bonus: [
        'Ajoute « Se souvenir de moi » avec `localStorage`.',
        'Ajoute un lien « Mot de passe oublié » et un mini-formulaire de réinitialisation.',
      ],
    },
    {
      id: 'm4-p4',
      moduleId: 'm4',
      title: 'Inscription en 3 étapes',
      level: 4,
      time: '1 h 30',
      summary:
        "Un wizard identité → entreprise → confirmation, avec validation par étape et récapitulatif.",
      skills: ['wizard', 'validation', 'état', 'UX'],
      steps: [
        'Définis un état global `data` et un état `step`.',
        'Crée trois composants d’étape qui reçoivent `data`, `update` et `errors`.',
        'Valide uniquement les champs de l’étape courante avant de continuer.',
        'Affiche un indicateur de progression avec les étapes complétées.',
        'À la dernière étape, affiche un récapitulatif et un bouton « Modifier » par section.',
      ],
      bonus: [
        'Sauvegarde le brouillon dans `localStorage` et restaure-le au chargement.',
        'Ajoute une animation de transition entre les étapes.',
      ],
    },
    {
      id: 'm4-p5',
      moduleId: 'm4',
      title: 'Candidature avec CV',
      level: 4,
      time: '1 h 15',
      summary:
        "Un formulaire de candidature avec upload de CV, aperçu, validation de taille et lettre de motivation.",
      skills: ['fichiers', 'validation', 'aperçu', 'UX'],
      steps: [
        'Crée les champs nom, e-mail, poste, lettre et fichier CV.',
        'Accepte PDF et DOCX, limite à 5 Mo, affiche le nom et la taille du fichier.',
        'Affiche une erreur si le format ou la taille ne convient pas.',
        'Ajoute une barre de progression simulée pendant l’envoi.',
        'Affiche un récapitulatif avant l’envoi définitif.',
      ],
      bonus: [
        'Permets de supprimer le fichier sélectionné.',
        'Ajoute un glisser-déposer avec les événements `dragover` et `drop`.',
      ],
    },
    {
      id: 'm4-p6',
      moduleId: 'm4',
      title: 'Adresse de livraison',
      level: 4,
      time: '1 h',
      summary:
        "Un formulaire de checkout avec pays, ville, adresse, téléphone et options de livraison.",
      skills: ['select', 'radio', 'validation', 'récapitulatif'],
      steps: [
        'Crée les champs prénom, nom, téléphone, adresse, ville et pays.',
        'Adapte le format du téléphone au pays sélectionné (indicatif).',
        'Ajoute deux options de livraison en radio avec prix.',
        'Valide les champs et calcule le total (produit + livraison).',
        'Affiche un récapitulatif de commande à droite, sticky sur desktop.',
      ],
      bonus: [
        'Ajoute une case « facturation différente » qui révèle un second formulaire.',
        'Ajoute un code promo avec validation simulée.',
      ],
    },
    {
      id: 'm4-p7',
      moduleId: 'm4',
      title: 'Sondage dynamique',
      level: 4,
      time: '1 h',
      summary:
        "Un questionnaire généré depuis des données : questions texte, choix unique, choix multiple et note.",
      skills: ['données', 'types de champs', 'état', 'progression'],
      steps: [
        'Définis un type `Question` avec `id`, `label`, `type` et `options`.',
        'Crée un état `answers` indexé par id de question.',
        'Affiche le bon champ selon le type : radio, checkbox, textarea, range.',
        'Affiche une barre de progression basée sur les questions répondues.',
        'À la fin, affiche un récapitulatif et un bouton pour recommencer.',
      ],
      bonus: [
        'Ajoute une validation : impossible de soumettre sans répondre aux questions obligatoires.',
        'Ajoute une sauvegarde automatique des réponses.',
      ],
    },
    {
      id: 'm4-p8',
      moduleId: 'm4',
      title: 'Paramètres du compte',
      level: 5,
      time: '1 h 30',
      summary:
        "Un formulaire de profil avec sections, modifications détectées, annulation et sauvegarde.",
      skills: ['formulaires', 'diff', 'UX', 'validation'],
      steps: [
        'Crée trois sections : Profil, Notifications, Sécurité.',
        'Charge les valeurs initiales depuis un objet `user` simulé.',
        'Détecte si le formulaire est modifié par rapport aux valeurs initiales.',
        'Active le bouton « Enregistrer » uniquement s’il y a des changements.',
        'Ajoute un bouton « Annuler » qui restaure les valeurs initiales.',
      ],
      bonus: [
        'Ajoute une alerte `beforeunload` si des modifications ne sont pas sauvegardées.',
        'Ajoute une section « Supprimer le compte » avec confirmation par saisie du mot « SUPPRIMER ».',
      ],
    },
    {
      id: 'm4-p9',
      moduleId: 'm4',
      title: 'Recherche avancée',
      level: 5,
      time: '1 h 30',
      summary:
        "Un panneau de filtres avec prix min/max, catégories, note, disponibilité et réinitialisation.",
      skills: ['filtres', 'état', 'URL', 'UX'],
      steps: [
        'Crée un état `filters` avec recherche, catégorie, prix, note et stock.',
        'Affiche les filtres dans une sidebar et une barre de recherche en haut.',
        'Applique les filtres à une liste de produits avec `filter`.',
        'Affiche le nombre de résultats et un bouton « Réinitialiser ».',
        'Synchronise les filtres avec les paramètres d’URL (`useSearchParams`).',
      ],
      bonus: [
        'Ajoute des puces de filtres actifs, supprimables individuellement.',
        'Ajoute un tri (prix croissant, note, nouveauté).',
      ],
    },
    {
      id: 'm4-p10',
      moduleId: 'm4',
      title: 'Ticket support (RHF + Zod)',
      level: 5,
      time: '2 h',
      summary:
        "Un formulaire professionnel de ticket avec priorité, catégorie, pièce jointe et gestion d’erreurs serveur.",
      skills: ['React Hook Form', 'Zod', 'fichiers', 'API'],
      steps: [
        'Installe `react-hook-form`, `zod` et `@hookform/resolvers`.',
        'Définis un schéma : sujet (5 caractères), description (30), catégorie, priorité, e-mail.',
        'Construis le formulaire avec `register` et affiche les erreurs de chaque champ.',
        'Ajoute une pièce jointe optionnelle avec validation de type et de taille.',
        'Simule un envoi API et gère une erreur serveur qui cible le champ `email`.',
      ],
      bonus: [
        'Ajoute une sauvegarde automatique du brouillon avec `watch`.',
        'Ajoute un indicateur de force pour la description (longueur, détails).',
      ],
    },
  ],
}
