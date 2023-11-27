import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import appManifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    workbox: {
      cleanupOutdatedCaches: false,
      sourcemap: true,
      navigateFallbackDenylist: [/store\.transitstat\.us/g]
    },
    manifest: appManifest
  })],
})
