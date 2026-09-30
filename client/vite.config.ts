import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import vike from 'vike/plugin'
import { cloudflare } from '@cloudflare/vite-plugin'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [
    cloudflare({
      viteEnvironment: { name: 'ssr' }
    }),
    vike(),
    react(),
    tailwindcss()
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url))
    }
  },

  server: {
    port: 3000,

    proxy: {
      '/api': {
        target: process.env.API_PROXY_TARGET || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})