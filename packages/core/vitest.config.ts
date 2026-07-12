import { defineConfig } from "vitest/config";

// "**/._*" excludes macOS AppleDouble metadata files, which this project's
// exFAT volume litters everywhere and esbuild cannot parse.
export default defineConfig({
  test: {
    exclude: ["**/node_modules/**", "**/dist/**", "**/._*"],
  },
});
