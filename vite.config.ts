import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api/': {
        //target: process.env.VITE_API_URL|| 'http://localhost:8080',  // L'adresse de votre backend
        target: 'http://localhost:8080',  // L'adresse de votre backend
        changeOrigin: true,
        //rewrite: (path) => path.replace(new RegExp(`^${process.env.VITE_API_PREFIX}`), ''),  // Utilisation de la variable d'environnement dans rewrite
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})
