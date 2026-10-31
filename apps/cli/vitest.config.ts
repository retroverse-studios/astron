import { defineConfig } from "vitest/config";

// "**/._*" excludes macOS AppleDouble metadata files on this exFAT volume.
export default defineConfig({
  test: {
    exclude: ["**/node_modules/**", "**/dist/**", "**/._*"],
  },
});
