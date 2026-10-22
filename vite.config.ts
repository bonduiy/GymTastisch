import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves the app from /GymTastisch/, set via BASE_PATH in the deploy workflow.
const base = process.env.BASE_PATH ?? '/'

// Shown in Settings so the installed version can be checked.
const version = `${new Date().toISOString().slice(0, 10)} · ${process.env.GITHUB_SHA?.slice(0, 7) ?? 'dev'}`

export default defineConfig({
  base,
  define: { __APP_VERSION__: JSON.stringify(version) },
  build: { target: ['safari16', 'es2022'] },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'GymTastisch',
        short_name: 'GymTastisch',
        description: 'Track your gym workouts, sets and progress.',
        lang: 'de',
        start_url: base,
        scope: base,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0f1115',
        theme_color: '#0f1115',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,webp,woff2}'],
        globIgnores: ['**/*vietnamese*'],
      },
    }),
  ],
})
