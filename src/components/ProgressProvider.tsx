import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { totalCapstoneChapters } from '../data/capstone'
import { totalGuidedProjects } from '../data/guided'
import { totalLessons, totalProjects } from '../data/modules'

type DoneMap = Record<string, boolean>

type ProgressContextValue = {
  done: DoneMap
  isDone: (key: string) => boolean
  toggle: (key: string) => void
  markDone: (key: string) => void
  reset: () => void
  countDone: (prefix: string) => number
  totals: {
    lessons: number
    projects: number
    guided: number
    chapters: number
    items: number
  }
}

const ProgressContext = createContext<ProgressContextValue | null>(null)
const STORAGE_KEY = 'react-atelier-progress'

export const progressKeys = {
  lesson: (moduleSlug: string, lessonId: string) => `lesson:${moduleSlug}/${lessonId}`,
  project: (id: string) => `project:${id}`,
  guided: (slug: string) => `guided:${slug}`,
  chapter: (slug: string) => `chapter:${slug}`,
}

function readStored(): DoneMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).filter((entry) => entry[1] === true),
    ) as DoneMap
  } catch {
    return {}
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState<DoneMap>(readStored)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(done))
  }, [done])

  const isDone = useCallback((key: string) => Boolean(done[key]), [done])

  const toggle = useCallback((key: string) => {
    setDone((current) => {
      const next = { ...current }
      if (next[key]) delete next[key]
      else next[key] = true
      return next
    })
  }, [])

  const markDone = useCallback((key: string) => {
    setDone((current) => (current[key] ? current : { ...current, [key]: true }))
  }, [])

  const reset = useCallback(() => setDone({}), [])

  const countDone = useCallback(
    (prefix: string) => Object.keys(done).filter((key) => key.startsWith(prefix)).length,
    [done],
  )

  const totals = useMemo(
    () => ({
      lessons: totalLessons,
      projects: totalProjects,
      guided: totalGuidedProjects,
      chapters: totalCapstoneChapters,
      items: totalLessons + totalProjects + totalGuidedProjects + totalCapstoneChapters,
    }),
    [],
  )

  const value = useMemo(
    () => ({ done, isDone, toggle, markDone, reset, countDone, totals }),
    [done, isDone, toggle, markDone, reset, countDone, totals],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress doit être utilisé dans ProgressProvider')
  return context
}
