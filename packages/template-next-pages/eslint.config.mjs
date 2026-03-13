import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import picus from "@picus/eslint-plugin";
import tseslint from "typescript-eslint";

// Build Next.js recommended rules and an "off" map for overrides
const nextRecommended = nextPlugin.configs.recommended ?? { rules: {} };
const nextRecommendedRules = nextRecommended.rules ?? {};
const offNextRules = Object.fromEntries(
  Object.keys(nextRecommendedRules).map((k) => [k, "off"]),
);

export default [
  // Global ignores
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "deploy.mjs",
      "next.config.js",
    ],
  },
  // Base JS recommended
  js.configs.recommended,
  // TypeScript recommended (non type-checked for speed/simplicity)
  ...tseslint.configs.recommended,
  // Next.js recommended rules applied to app code
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextRecommendedRules,
    },
  },
  // Picus rules applied only to picus files
  {
    files: ["src/picus/**"],
    ...picus.flatPlugin,
    rules: {
      ...picus.flatPlugin.rules,
    },
  },
  // Disable all Next.js rules within picus files
  {
    files: ["src/picus/**"],
    rules: {
      ...offNextRules,
    },
  },
];
