// Copy the Emscripten artifacts into public/ — the loader fetches
// swisseph.data and swisseph.wasm relative to the page root. They are
// gitignored; this runs automatically before dev and build.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const wasmDir = join(dirname(require.resolve("swisseph-wasm/package.json")), "wasm");
const publicDir = join(here, "..", "public");

// The production bundle requests /wasm/swisseph.{wasm,data} (the package's
// relative layout survives bundling); dev serves them via /@fs directly.
const dest = join(publicDir, "wasm");
mkdirSync(dest, { recursive: true });
for (const f of ["swisseph.wasm", "swisseph.data"]) {
  copyFileSync(join(wasmDir, f), join(dest, f));
}
console.log("synced swisseph wasm assets to public/wasm/");
