import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/layouts': path.resolve(__dirname, './src/layouts'),

      '@/primitives': path.resolve(__dirname, './src/components/primitives'),
      '@/composed': path.resolve(__dirname, './src/components/composed'),
      '@/core': path.resolve(__dirname, './src/core'),
    },
  },
})


