import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    eslint({
      fix: true,
      lintOnStart: true,
      failOnError: false,
      useEslintrc: false,
    })
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
});
