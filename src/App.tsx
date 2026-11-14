import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { ThemeProvider } from './components/ThemeProvider'
import { ProgressProvider } from './components/ProgressProvider'
import { Home } from './pages/Home'
import { Modules } from './pages/Modules'
import { ModuleDetail } from './pages/ModuleDetail'
import { Lesson } from './pages/Lesson'
import { Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { Guided } from './pages/Guided'
import { GuidedDetail } from './pages/GuidedDetail'
import { CapstonePage } from './pages/Capstone'
import { CapstoneChapterPage } from './pages/CapstoneChapter'
import { Progress } from './pages/Progress'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="modules" element={<Modules />} />
            <Route path="modules/:slug" element={<ModuleDetail />} />
            <Route path="modules/:slug/lecons/:lessonId" element={<Lesson />} />
            <Route path="projets" element={<Projects />} />
            <Route path="projets/:id" element={<ProjectDetail />} />
            <Route path="projets-guedes" element={<Guided />} />
            <Route path="projets-guedes/:slug" element={<GuidedDetail />} />
            <Route path="projet-final" element={<CapstonePage />} />
            <Route path="projet-final/:slug" element={<CapstoneChapterPage />} />
            <Route path="progression" element={<Progress />} />
            <Route path="accueil" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ProgressProvider>
    </ThemeProvider>
  )
}
