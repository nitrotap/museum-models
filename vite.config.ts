import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Museum Kiosk',
        short_name: 'Museum',
        description: 'An interactive museum kiosk app',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/assets/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,gif,svg,json,glb,gltf}'], // Caches everything in /assets and subfolders
        maximumFileSizeToCacheInBytes: 100 * 1024 * 1024, // 100 MB

        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/assets/'), // Matches everything in /assets and subfolders
            handler: 'CacheFirst', // Loads from cache first, fallback to network
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 24 * 60 * 60, // Cache for 60 days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
        ],
      },
      registerType: 'autoUpdate'
    })
  ]
});
