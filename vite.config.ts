import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Le contenu pédagogique est embarqué dans le bundle : ~250 kB gzip assumés.
    chunkSizeWarningLimit: 1000,
  },
})
