import { ClipboardList, Layers, Palette, Rocket, Shapes, Workflow, type LucideIcon } from 'lucide-react'
import type { ModuleIcon as ModuleIconName } from '../data/types'

const icons: Record<ModuleIconName, LucideIcon> = {
  rocket: Rocket,
  palette: Palette,
  shapes: Shapes,
  clipboard: ClipboardList,
  workflow: Workflow,
  layers: Layers,
}

export function ModuleIcon({
  name,
  className,
}: {
  name: ModuleIconName
  className?: string
}) {
  const Icon = icons[name]
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />
}
