import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/dist/**",
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.config.ts",
      "**/public/**",
      "**/.env*",
      "**/server.js", // Production server file
    ]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // React & Next.js Best Practices
      "react/no-unescaped-entities": "warn",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-target-blank": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // TypeScript
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true
      }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/prefer-for-of": "warn",
      "@typescript-eslint/no-array-constructor": "error",
      
      // Code Quality
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "eqeqeq": ["error", "always", { null: "ignore" }],
      "no-param-reassign": ["error", { props: false }],
      "prefer-template": "warn",
      "no-throw-literal": "error",
      "no-nested-ternary": "warn",
      "no-duplicate-imports": "error",
      "no-useless-return": "error",
      "no-else-return": ["warn", { allowElseIf: false }],
      "object-shorthand": ["warn", "always"],
      "prefer-destructuring": ["warn", { object: true, array: false }],
      "yoda": "error",
      "complexity": ["warn", { max: 15 }],
      "max-depth": ["warn", { max: 4 }],
      "max-lines-per-function": ["warn", { max: 150, skipBlankLines: true, skipComments: true }],
      
      // Next.js Specific
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",
      
      // Imports
      "import/no-anonymous-default-export": "warn",
      
      // Performance
      "react/jsx-no-bind": ["warn", {
        allowArrowFunctions: true,
        allowBind: false,
        ignoreRefs: true
      }],
    }
  }
];

export default eslintConfig;
