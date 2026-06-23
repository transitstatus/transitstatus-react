import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import appManifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: { navigateFallback: "index.html" },
      workbox: { cleanupOutdatedCaches: false, sourcemap: true, navigateFallbackDenylist: [/store\.transitstat\.us/g] },
      injectManifest: true,
      manifest: appManifest
    })
  ]
});
