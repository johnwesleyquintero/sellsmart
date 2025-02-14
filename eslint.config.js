import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import jestPlugin from "eslint-plugin-jest";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import unicorn from "eslint-plugin-unicorn";

export default tseslint.config(
  { ignores: ["dist", "coverage"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      jest: jestPlugin,
      import: importPlugin,
      unicorn: unicorn,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/valid-expect": "error",
      
      // Additional God Mode rules for ultimate code supremacy
      "no-console": "warn",
      "no-debugger": "error",
      "prefer-const": "error",
      curly: "error",
      eqeqeq: ["error", "always"],
      "consistent-return": "error",
      "import/order": [
        "error",
        { 
          groups: [
            "builtin", 
            "external", 
            "internal", 
            "parent", 
            "sibling", 
            "index"
          ],
          "newlines-between": "always"
        }
      ],
      "unicorn/prefer-string-starts-ends-with": "error",
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
            pascalCase: true
          }
        }
      ]
    },
  }
);
