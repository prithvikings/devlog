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
  // PROXY CONFIGURATION
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
  // OPTIMIZATION CONFIGURATION
  build: {
    // Esbuild is 20-40x faster than terser for minification
    minify: "esbuild",
    rollupOptions: {
      output: {
        // Separate vendor libraries from app code for better caching
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
