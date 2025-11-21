import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "import.meta.env.PROD": JSON.stringify(
      process.env.NODE_ENV === "production"
    ),
    "import.meta.env.DEV": JSON.stringify(
      process.env.NODE_ENV === "development"
    ),
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    // Force production environment during build
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
      },
    },
  },
});
