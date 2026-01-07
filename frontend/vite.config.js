import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // PROXY CONFIGURATION (The Fix)
  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:8002",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:8002",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
