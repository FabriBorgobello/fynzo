import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import drizzle from "eslint-plugin-drizzle";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  eslintConfigPrettier,
  prettierPlugin, // Prettier should be last
  {
    plugins: { drizzle, "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^react-dom$"], // React and ReactDOM
            ["^@?\\w"], // External packages
            ["^@/"], // Aliased imports
            ["^\\."], // Relative imports
            ["^.+\\.?(css|scss|sass|less)$"], // Style imports
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      ...drizzle.configs.recommended.rules,
      "drizzle/enforce-delete-with-where": [
        "error",
        { drizzleObjectName: ["db"] },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
