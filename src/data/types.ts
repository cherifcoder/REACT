export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'code'; title?: string; lang?: string; code: string }
  | { type: 'callout'; tone: 'tip' | 'warn' | 'info' | 'danger'; title: string; text: string }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'quote'; text: string; author?: string }

export type Lesson = {
  id: string
  title: string
  duration: number
  summary: string
  blocks: Block[]
}

export type PracticeProject = {
  id: string
  moduleId: string
  title: string
  level: 1 | 2 | 3 | 4 | 5
  time: string
  summary: string
  skills: string[]
  steps: string[]
  starter?: string
  bonus: string[]
}

export type ModuleIcon = 'rocket' | 'palette' | 'shapes' | 'clipboard' | 'workflow' | 'layers'

export type Accent = 'brand' | 'lime' | 'coral' | 'violet' | 'sky' | 'amber'

export type CourseModule = {
  slug: string
  number: number
  title: string
  tagline: string
  description: string
  icon: ModuleIcon
  accent: Accent
  level: string
  duration: number
  outcomes: string[]
  lessons: Lesson[]
  projects: PracticeProject[]
}

export type GuidedStep = {
  title: string
  intro: string
  blocks: Block[]
}

export type GuidedProject = {
  slug: string
  title: string
  tagline: string
  description: string
  level: string
  duration: string
  stack: string[]
  features: string[]
  outcomes: string[]
  steps: GuidedStep[]
  extensions: string[]
}

export type CapstoneChapter = {
  slug: string
  number: number
  title: string
  summary: string
  duration: string
  blocks: Block[]
}

export type Capstone = {
  slug: string
  title: string
  tagline: string
  description: string
  level: string
  duration: string
  demoUrl: string
  repoNote: string
  stack: string[]
  features: string[]
  outcomes: string[]
  chapters: CapstoneChapter[]
}
