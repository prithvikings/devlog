import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// Change from object to function ({ mode }) to load env vars
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/auth": {
          // Use the variable from .env, fallback to localhost:8002 if missing
          target: env.BACKEND_BASE || "http://localhost:8002",
          changeOrigin: true,
          secure: false,
        },
        "/api": {
          target: env.BACKEND_BASE || "http://localhost:8002",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
  };
});
