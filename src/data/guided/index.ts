import type { GuidedProject } from '../types'
import { taskflow } from './taskflow'
import { meteo } from './meteo'
import { boutique } from './boutique'
import { devblog } from './devblog'
import { budget } from './budget'

export const guidedProjects: GuidedProject[] = [taskflow, meteo, boutique, devblog, budget]

export function getGuidedProject(slug: string) {
  return guidedProjects.find((project) => project.slug === slug)
}

export const totalGuidedProjects = guidedProjects.length
