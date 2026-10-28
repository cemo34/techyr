import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
});

