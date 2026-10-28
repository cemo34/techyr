import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const buildTimestamp = Date.now().toString(36);

export default defineConfig({
  plugins: [
    react(),
    {
      name: "disable-rocket-loader-on-modules",
      transformIndexHtml(html) {
        return html.replace(/<script /g, '<script data-cfasync="false" ');
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash]-${buildTimestamp}.js`,
        chunkFileNames: `assets/[name]-[hash]-${buildTimestamp}.js`,
      },
    },
  },
});
