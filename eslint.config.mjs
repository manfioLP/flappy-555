import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"], // Apply to all TS/TSX files
    rules: {
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": false, // Allow `@ts-ignore`
          "ts-expect-error": true,
          "ts-nocheck": true,
          "ts-check": true,
        },
      ],
    },
  },
];

export default eslintConfig;
