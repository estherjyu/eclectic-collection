import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/eclectic-collection/pictures/', // Add this line
  build: {
    outDir: 'dist', // This is where the built files will go
  }
})
