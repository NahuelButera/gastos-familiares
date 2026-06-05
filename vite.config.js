import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.png'],
      manifest: {
        name: 'Gastos Familiares',
        short_name: 'Gastos',
        description: 'Registro de gastos compartidos Nahuel y Florencia',
        theme_color: '#2D7D6F',
        background_color: '#F7F6F3',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.jsonbin\.io\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'jsonbin-cache', networkTimeoutSeconds: 5 }
          }
        ]
      }
    })
  ]
})
