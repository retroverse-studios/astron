import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/._*",
      "**/src-tauri/**",
      "**/public/wasm/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["landing/src/**/*.js", "apps/web/public/**/*.js"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/scripts/**/*.{js,mjs,ts}"],
    languageOptions: { globals: globals.node },
  },
);
