import type { GuidedProject } from '../types'

export const meteo: GuidedProject = {
  slug: 'meteosahel',
  title: 'MétéoSahel',
  tagline: 'Une application météo connectée à une vraie API, sans clé.',
  description:
    "MétéoSahel interroge l'API gratuite Open-Meteo : recherche de ville, météo actuelle, prévisions sur 7 jours, favoris et bascule Celsius/Fahrenheit. C'est le projet idéal pour apprendre à consommer une API, gérer les états asynchrones et transformer des données brutes en interface lisible.",
  level: 'Intermédiaire',
  duration: '4 à 5 heures',
  stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'lucide-react', 'Open-Meteo'],
  features: [
    'Recherche de ville avec géocodage et suggestions',
    'Météo actuelle : température, ressenti, humidité, vent',
    'Prévisions sur 7 jours avec min/max',
    'Bascule Celsius / Fahrenheit',
    'Villes favorites persistées',
    'Gestion complète loading, erreur, vide et réseau lent',
    'Icônes météo mappées depuis les codes WMO',
  ],
  outcomes: [
    'Lire la documentation d’une API et typer ses réponses',
    'Écrire une couche API isolée et testable',
    'Gérer une recherche avec debounce et annulation de requête',
    'Construire des états asynchrones explicites',
    'Transformer des données en composants sans logique dispersée',
    'Persister des favoris et gérer les erreurs réseau',
  ],
  steps: [
    {
      title: 'Comprendre l’API et modéliser les réponses',
      intro:
        "On utilise deux endpoints publics d'Open-Meteo : le géocodage pour trouver une ville, et la prévision pour obtenir la météo. Aucune clé n'est nécessaire.",
      blocks: [
        {
          type: 'code',
          title: 'Les deux URLs à connaître',
          lang: 'text',
          code: `# 1. Trouver une ville (géocodage)
https://geocoding-api.open-meteo.com/v1/search?name=Bamako&count=5&language=fr&format=json

# 2. Météo actuelle + prévisions 7 jours
https://api.open-meteo.com/v1/forecast
  ?latitude=12.65
  &longitude=-8.0
  &current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m
  &daily=temperature_2m_max,temperature_2m_min,weather_code
  &timezone=auto
  &forecast_days=7`,
        },
        {
          type: 'code',
          title: 'src/types/weather.ts',
          lang: 'ts',
          code: `export type City = {
  id: number
  name: string
  country: string
  admin1?: string
  latitude: number
  longitude: number
}

export type CurrentWeather = {
  time: string
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  weather_code: number
  wind_speed_10m: number
}

export type DailyWeather = {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  weather_code: number[]
}

export type WeatherData = {
  latitude: number
  longitude: number
  timezone: string
  current: CurrentWeather
  daily: DailyWeather
}

export type Unit = 'celsius' | 'fahrenheit'`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Commence toujours par une requête dans le navigateur',
          text: "Colle l'URL dans un onglet avant d'écrire du code. Tu vois la forme exacte de la réponse, les champs disponibles et les erreurs. C'est plus rapide que de deviner, et cela t'évite de typer au hasard.",
        },
      ],
    },
    {
      title: 'Initialiser le projet et la couche API',
      intro:
        "Toute la communication réseau vit dans un fichier dédié. Les composants ne connaissent que des fonctions typées.",
      blocks: [
        {
          type: 'code',
          title: 'Installation',
          lang: 'bash',
          code: `npm create vite@latest meteosahel -- --template react-ts
cd meteosahel
npm install
npm install tailwindcss @tailwindcss/vite lucide-react
npm run dev`,
        },
        {
          type: 'code',
          title: 'src/lib/weatherApi.ts',
          lang: 'ts',
          code: `import type { City, WeatherData } from '../types/weather'

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

export async function searchCities(
  query: string,
  signal?: AbortSignal,
): Promise<City[]> {
  const url = new URL(GEO_URL)
  url.searchParams.set('name', query)
  url.searchParams.set('count', '5')
  url.searchParams.set('language', 'fr')
  url.searchParams.set('format', 'json')

  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error('La recherche a échoué.')

  const data = (await response.json()) as { results?: City[] }
  return data.results ?? []
}

export async function getWeather(
  city: City,
  signal?: AbortSignal,
): Promise<WeatherData> {
  const url = new URL(FORECAST_URL)
  url.searchParams.set('latitude', String(city.latitude))
  url.searchParams.set('longitude', String(city.longitude))
  url.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
  )
  url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,weather_code')
  url.searchParams.set('timezone', 'auto')
  url.searchParams.set('forecast_days', '7')

  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error('Les prévisions sont indisponibles.')
  return (await response.json()) as WeatherData
}`,
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'URL et URLSearchParams',
          text: "Construire l'URL avec `new URL()` et `searchParams` évite les erreurs d'encodage et les concaténations illisibles. Les espaces, accents et caractères spéciaux sont encodés automatiquement.",
        },
      ],
    },
    {
      title: 'Recherche avec debounce et annulation',
      intro:
        "On ne lance pas une requête à chaque frappe. On attend 400 ms, et on annule la requête précédente si l'utilisateur continue.",
      blocks: [
        {
          type: 'code',
          title: 'src/hooks/useDebounce.ts',
          lang: 'ts',
          code: `import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(id)
  }, [value, delay])

  return debounced
}`,
        },
        {
          type: 'code',
          title: 'src/hooks/useCitySearch.ts',
          lang: 'ts',
          code: `import { useEffect, useState } from 'react'
import { searchCities } from '../lib/weatherApi'
import type { City } from '../types/weather'
import { useDebounce } from './useDebounce'

export function useCitySearch(query: string) {
  const debouncedQuery = useDebounce(query, 400)
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setCities([])
      setError(null)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    searchCities(debouncedQuery.trim(), controller.signal)
      .then((results) => setCities(results))
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name === 'AbortError') return
        setError('Impossible de rechercher cette ville.')
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [debouncedQuery])

  return { cities, loading, error }
}`,
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Pourquoi `finally` peut poser problème',
          text: "Si la requête est annulée, le `finally` s'exécute quand même et met `loading` à `false` alors qu'une nouvelle requête est partie. Dans une version avancée, ajoute un booléen `active` ou utilise TanStack Query qui gère ce cycle correctement.",
        },
        {
          type: 'code',
          title: 'src/components/CitySearch.tsx',
          lang: 'tsx',
          code: `import { useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import type { City } from '../types/weather'
import { useCitySearch } from '../hooks/useCitySearch'

type CitySearchProps = {
  onSelect: (city: City) => void
}

export function CitySearch({ onSelect }: CitySearchProps) {
  const [query, setQuery] = useState('')
  const { cities, loading, error } = useCitySearch(query)

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-2xl border border-ink-900/10 bg-white px-4 py-3">
        <Search className="size-4 text-ink-400" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher une ville (Bamako, Dakar, Paris…)"
          className="w-full bg-transparent text-sm focus:outline-none"
          aria-label="Rechercher une ville"
        />
        {loading && <span className="text-xs text-ink-400">Recherche…</span>}
      </div>

      {error && <p role="alert" className="mt-2 text-xs text-red-600">{error}</p>}

      {cities.length > 0 && query.trim().length >= 2 && (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-ink-900/10 bg-white shadow-lg">
          {cities.map((city) => (
            <li key={city.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(city)
                  setQuery('')
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-brand-50"
              >
                <MapPin className="size-4 text-brand-500" aria-hidden="true" />
                <span>
                  <strong>{city.name}</strong>
                  <span className="text-ink-500">
                    {city.admin1 ? ' · ' + city.admin1 : ''} · {city.country}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}`,
        },
      ],
    },
    {
      title: 'Météo actuelle et code WMO',
      intro:
        "Open-Meteo renvoie un code météo numérique. On le transforme en libellé et en icône via un mapping exhaustif.",
      blocks: [
        {
          type: 'code',
          title: 'src/lib/weatherCodes.tsx',
          lang: 'tsx',
          code: `import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  type LucideIcon,
} from 'lucide-react'

type WeatherInfo = { label: string; Icon: LucideIcon }

const codeMap: Record<number, WeatherInfo> = {
  0: { label: 'Ciel dégagé', Icon: Sun },
  1: { label: 'Plutôt dégagé', Icon: CloudSun },
  2: { label: 'Partiellement nuageux', Icon: CloudSun },
  3: { label: 'Couvert', Icon: Cloud },
  45: { label: 'Brouillard', Icon: CloudFog },
  48: { label: 'Brouillard givrant', Icon: CloudFog },
  51: { label: 'Bruine légère', Icon: CloudRain },
  53: { label: 'Bruine', Icon: CloudRain },
  55: { label: 'Bruine dense', Icon: CloudRain },
  61: { label: 'Pluie légère', Icon: CloudRain },
  63: { label: 'Pluie', Icon: CloudRain },
  65: { label: 'Pluie forte', Icon: CloudRain },
  71: { label: 'Neige légère', Icon: CloudSnow },
  73: { label: 'Neige', Icon: CloudSnow },
  75: { label: 'Neige forte', Icon: CloudSnow },
  80: { label: 'Averses', Icon: CloudRain },
  81: { label: 'Averses modérées', Icon: CloudRain },
  82: { label: 'Averses violentes', Icon: CloudRain },
  95: { label: 'Orage', Icon: CloudLightning },
  96: { label: 'Orage avec grêle', Icon: CloudLightning },
  99: { label: 'Orage violent', Icon: CloudLightning },
}

export function getWeatherInfo(code: number): WeatherInfo {
  return codeMap[code] ?? { label: 'Conditions inconnues', Icon: Cloud }
}`,
        },
        {
          type: 'code',
          title: 'src/components/CurrentCard.tsx',
          lang: 'tsx',
          code: `import { Droplets, Wind } from 'lucide-react'
import type { CurrentWeather, Unit } from '../types/weather'
import { getWeatherInfo } from '../lib/weatherCodes'
import { formatTemp } from '../lib/format'

type CurrentCardProps = {
  current: CurrentWeather
  cityName: string
  unit: Unit
}

export function CurrentCard({ current, cityName, unit }: CurrentCardProps) {
  const { label, Icon } = getWeatherInfo(current.weather_code)

  return (
    <section className="relative overflow-hidden rounded-3xl bg-night-900 p-7 text-white">
      <div className="absolute -top-16 -right-10 size-48 rounded-full bg-brand-500/30 blur-3xl" />
      <div className="relative">
        <p className="font-mono text-[0.65rem] tracking-widest text-white/60 uppercase">
          Météo actuelle
        </p>
        <h2 className="mt-1 text-3xl font-semibold">{cityName}</h2>

        <div className="mt-6 flex items-center gap-5">
          <Icon className="size-14 text-lime-300" strokeWidth={1.4} aria-hidden="true" />
          <div>
            <p className="text-6xl font-semibold tracking-tighter">
              {formatTemp(current.temperature_2m, unit)}
            </p>
            <p className="mt-1 text-sm text-white/70">{label}</p>
          </div>
        </div>

        <dl className="mt-7 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-white/10 p-3">
            <dt className="text-[0.65rem] text-white/60 uppercase">Ressenti</dt>
            <dd className="mt-1 font-medium">{formatTemp(current.apparent_temperature, unit)}</dd>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <dt className="flex items-center gap-1 text-[0.65rem] text-white/60 uppercase">
              <Droplets className="size-3" aria-hidden="true" /> Humidité
            </dt>
            <dd className="mt-1 font-medium">{current.relative_humidity_2m} %</dd>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <dt className="flex items-center gap-1 text-[0.65rem] text-white/60 uppercase">
              <Wind className="size-3" aria-hidden="true" /> Vent
            </dt>
            <dd className="mt-1 font-medium">{Math.round(current.wind_speed_10m)} km/h</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}`,
        },
        {
          type: 'code',
          title: 'src/lib/format.ts',
          lang: 'ts',
          code: `import type { Unit } from '../types/weather'

export function formatTemp(celsius: number, unit: Unit) {
  const value = unit === 'celsius' ? celsius : celsius * 1.8 + 32
  return Math.round(value) + '°' + (unit === 'celsius' ? 'C' : 'F')
}

export function formatDay(isoDate: string, index: number) {
  if (index === 0) return "Aujourd'hui"
  return new Date(isoDate + 'T12:00:00').toLocaleDateString('fr-FR', {
    weekday: 'short',
  })
}`,
        },
      ],
    },
    {
      title: 'Prévisions 7 jours et bascule d’unité',
      intro:
        "On affiche les prévisions dans une grille scrollable, avec un bouton °C/°F et une unité mémorisée.",
      blocks: [
        {
          type: 'code',
          title: 'src/components/ForecastList.tsx',
          lang: 'tsx',
          code: `import type { DailyWeather, Unit } from '../types/weather'
import { getWeatherInfo } from '../lib/weatherCodes'
import { formatDay, formatTemp } from '../lib/format'

export function ForecastList({ daily, unit }: { daily: DailyWeather; unit: Unit }) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-sm font-semibold tracking-wide text-ink-600 uppercase">
        Prévisions 7 jours
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {daily.time.map((date, index) => {
          const code = daily.weather_code[index]
          const { label, Icon } = getWeatherInfo(code)

          return (
            <article
              key={date}
              className="rounded-2xl border border-ink-900/10 bg-white p-4 text-center"
              title={label}
            >
              <p className="text-xs font-medium text-ink-600">{formatDay(date, index)}</p>
              <Icon className="mx-auto my-3 size-6 text-brand-600" aria-hidden="true" />
              <p className="text-sm font-semibold">{formatTemp(daily.temperature_2m_max[index], unit)}</p>
              <p className="text-xs text-ink-500">{formatTemp(daily.temperature_2m_min[index], unit)}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}`,
        },
        {
          type: 'code',
          title: 'src/App.tsx — orchestration',
          lang: 'tsx',
          code: `import { useEffect, useState } from 'react'
import { CloudSun, Heart, LoaderCircle, MapPin, RefreshCw } from 'lucide-react'
import type { City, Unit, WeatherData } from './types/weather'
import { getWeather } from './lib/weatherApi'
import { useLocalStorage } from './hooks/useLocalStorage'
import { CitySearch } from './components/CitySearch'
import { CurrentCard } from './components/CurrentCard'
import { ForecastList } from './components/ForecastList'

const DEFAULT_CITY: City = {
  id: 1,
  name: 'Bamako',
  country: 'Mali',
  admin1: 'Bamako',
  latitude: 12.65,
  longitude: -8.0,
}

export default function App() {
  const [city, setCity] = useState<City>(DEFAULT_CITY)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState('')
  const [unit, setUnit] = useLocalStorage<Unit>('meteosahel.unit', 'celsius')
  const [favorites, setFavorites] = useLocalStorage<City[]>('meteosahel.favorites', [DEFAULT_CITY])

  async function load(target: City) {
    setStatus('loading')
    setError('')

    try {
      const data = await getWeather(target)
      setWeather(data)
      setStatus('ready')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Erreur réseau.')
      setStatus('error')
    }
  }

  useEffect(() => {
    const controller = new AbortController()

    setStatus('loading')
    getWeather(city, controller.signal)
      .then((data) => {
        setWeather(data)
        setStatus('ready')
      })
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name === 'AbortError') return
        setError(cause instanceof Error ? cause.message : 'Erreur réseau.')
        setStatus('error')
      })

    return () => controller.abort()
  }, [city])

  const isFavorite = favorites.some((entry) => entry.id === city.id)

  function toggleFavorite() {
    setFavorites((current) =>
      current.some((entry) => entry.id === city.id)
        ? current.filter((entry) => entry.id !== city.id)
        : [...current, city],
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-brand-600 text-white">
            <CloudSun className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-[0.65rem] tracking-widest text-brand-600 uppercase">Projet guidé 02</p>
            <h1 className="text-2xl font-semibold">MétéoSahel</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')}
            className="rounded-xl border border-ink-900/15 px-3 py-2 text-sm font-medium"
            aria-label="Changer d'unité de température"
          >
            {unit === 'celsius' ? '°C' : '°F'}
          </button>
          <button
            type="button"
            onClick={toggleFavorite}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            className="rounded-xl border border-ink-900/15 p-2"
          >
            <Heart className={'size-5 ' + (isFavorite ? 'fill-coral-500 text-coral-500' : 'text-ink-500')} />
          </button>
        </div>
      </header>

      <div className="mt-6">
        <CitySearch onSelect={(next) => setCity(next)} />
      </div>

      {favorites.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {favorites.map((favorite) => (
            <button
              key={favorite.id}
              type="button"
              onClick={() => setCity(favorite)}
              className="flex items-center gap-1 rounded-full bg-ink-900/5 px-3 py-1.5 text-xs hover:bg-brand-50"
            >
              <MapPin className="size-3" aria-hidden="true" />
              {favorite.name}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6">
        {status === 'loading' && (
          <div className="flex items-center justify-center rounded-3xl border border-dashed p-16 text-ink-500">
            <LoaderCircle className="mr-2 size-5 animate-spin" aria-hidden="true" />
            Chargement de la météo…
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
            <p role="alert">{error}</p>
            <button
              type="button"
              onClick={() => load(city)}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs text-white"
            >
              <RefreshCw className="size-3.5" aria-hidden="true" /> Réessayer
            </button>
          </div>
        )}

        {status === 'ready' && weather && (
          <>
            <CurrentCard current={weather.current} cityName={city.name} unit={unit} />
            <ForecastList daily={weather.daily} unit={unit} />
          </>
        )}
      </div>
    </div>
  )
}`,
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Le double chargement en StrictMode',
          text: "En développement, l'effet s'exécute deux fois. Le premier `getWeather` est annulé par le nettoyage, le second aboutit. C'est le comportement attendu. En production, il n'y a qu'un appel.",
        },
      ],
    },
    {
      title: 'Finitions, accessibilité et déploiement',
      intro:
        "Vérifie les états, les contrastes et le comportement hors ligne. Puis mets en ligne.",
      blocks: [
        {
          type: 'list',
          items: [
            'Chaque icône météo a un `title` ou un libellé : le sens ne repose pas uniquement sur l’image.',
            'Le bouton °C/°F a un `aria-label` explicite.',
            'Le champ de recherche a un `aria-label` et les suggestions sont cliquables au clavier.',
            'En cas d’erreur réseau, un bouton « Réessayer » est proposé.',
            'Le chargement affiche un état visible, pas un écran blanc.',
            'Les températures sont arrondies et l’unité est toujours affichée.',
          ],
        },
        {
          type: 'code',
          title: 'Déploiement Vercel',
          lang: 'bash',
          code: `npm run build
npm run preview

# Puis : importe le dépôt sur vercel.com
# Framework preset : Vite
# Build command : npm run build
# Output directory : dist`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Améliorations qui font la différence',
          text: "Ajoute la géolocalisation (`navigator.geolocation`) avec un bouton « Ma position », un cache des dernières prévisions pour un affichage hors ligne, et une recherche par coordonnées. Ce sont des fonctionnalités simples qui rendent l'application réellement utile.",
        },
      ],
    },
  ],
  extensions: [
    'Ajouter la géolocalisation et une ville « Ma position ».',
    'Afficher un graphique horaire des températures sur 24 h.',
    'Ajouter un cache localStorage des prévisions par ville.',
    'Remplacer les hooks maison par TanStack Query.',
    'Ajouter un mode sombre et une unité de vent configurable.',
    'Écrire des tests sur le mapping des codes météo et le formatage.',
  ],
}
