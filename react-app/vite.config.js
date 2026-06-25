import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base so the build works at any URL (e.g. https://user.github.io/repo/)
  base: './',
  server: { port: 5173, open: true },
})
