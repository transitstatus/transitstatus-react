import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    workbox: {
      cleanupOutdatedCaches: false,
      sourcemap: true
    },
    manifest: {
      "short_name": "Transitstat",
      "name": "Trasitstat.us | Transit Tracker",
      "description": "Transitstat.us is a free, open source, and easy to use transit tracker!",
      "lang": "en",
      "categories": [
        "travel",
        "navigation",
        "utilities"
      ],
      "related_applications": [],
      "screenshots": [],
      "protocol_handlers": [],
      "orientation": "portrait-primary",
      "icons": [
        {
          "src": "favicon.ico",
          "sizes": "64x64 32x32 24x24 16x16",
          "type": "image/x-icon"
        },
        {
          "src": "/icons/logo192.png",
          "type": "image/png",
          "sizes": "192x192"
        },
        {
          "src": "/icons/logo512.png",
          "type": "image/png",
          "sizes": "512x512"
        }
      ],
      "start_url": ".",
      "display": "standalone",
      "display_override": [
        "window-controls-overlay"
      ],
      "theme_color": "#111111",
      "background_color": "#111111",
      "shortcuts": []
    }
  })],
})
