import type { CourseModule, PracticeProject } from '../types'
import { module1 } from './m1'
import { module2 } from './m2'
import { module3 } from './m3'
import { module4 } from './m4'
import { module5 } from './m5'
import { module6 } from './m6'

export const modules: CourseModule[] = [module1, module2, module3, module4, module5, module6]

export const allProjects: PracticeProject[] = modules.flatMap((module) => module.projects)

export const allLessons = modules.flatMap((module) =>
  module.lessons.map((lesson) => ({ ...lesson, module })),
)

export const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0)
export const totalProjects = allProjects.length
export const totalDuration = modules.reduce((total, module) => total + module.duration, 0)

export function getModule(slug: string) {
  return modules.find((module) => module.slug === slug)
}

export function getLesson(moduleSlug: string, lessonId: string) {
  const module = getModule(moduleSlug)
  const lesson = module?.lessons.find((entry) => entry.id === lessonId)
  return module && lesson ? { module, lesson } : null
}

export function getProject(id: string) {
  return allProjects.find((project) => project.id === id)
}

export function getModuleProjects(moduleId: string) {
  return allProjects.filter((project) => project.moduleId === moduleId)
}
