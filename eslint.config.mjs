import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  // Generated / build output / vendored — never lint these.
  {
    ignores: [
      "dist/",
      ".astro/",
      "node_modules/",
      "public/admin/",
      "public/md/",
      "tina/__generated__/",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,

  // Browser globals for client-side code (Astro islands, inline scripts).
  {
    files: ["**/*.{astro,ts,tsx,js,jsx,mjs}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // Node scripts and config files run in Node, not the browser.
  {
    files: ["scripts/**/*.{js,mjs}", "*.config.{js,mjs,ts}"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  // Astro generates env.d.ts with a triple-slash reference — that's the
  // framework convention, not something to rewrite.
  {
    files: ["**/*.d.ts"],
    rules: { "@typescript-eslint/triple-slash-reference": "off" },
  },

  // Project-wide rule tuning. Real bugs stay errors; stylistic nits are
  // warnings so `npm run lint` stays green and they can be tidied over time.
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-useless-assignment": "warn",
    },
  },

  // Keep ESLint out of Prettier's lane (formatting is Prettier's job).
  prettier,
);
