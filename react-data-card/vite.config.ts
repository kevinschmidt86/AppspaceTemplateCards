import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Appspace devices may run cached cards from local files, where ES-module scripts
// can fail to load. Stock Appspace cards ship classic deferred scripts, so emit one
// classic IIFE bundle and strip type="module"/crossorigin from index.html.
const classicScript = (): Plugin => ({
  name: "appspace-classic-script",
  enforce: "post",
  transformIndexHtml: (html) =>
    html.replace(/<script type="module" crossorigin/g, "<script defer").replace(
      /<link rel="stylesheet" crossorigin/g,
      '<link rel="stylesheet"',
    ),
});

export default defineConfig({
  plugins: [react(), classicScript()],
  base: "./",
  build: {
    outDir: "build",
    emptyOutDir: true,
    assetsDir: "assets",
    target: "es2017",
    modulePreload: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: { format: "iife", inlineDynamicImports: true },
    },
  },
});
