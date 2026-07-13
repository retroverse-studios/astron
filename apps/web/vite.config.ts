import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The Emscripten loader fetches swisseph.data/.wasm relative to the page,
// so scripts/sync-wasm.mjs copies them into public/ before dev and build.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Emscripten resolves its .wasm/.data relative to the script URL; Vite's
  // dep pre-bundling would relocate the script and break those paths.
  optimizeDeps: { exclude: ["swisseph-wasm"] },
  server: { port: 5183 },
});
