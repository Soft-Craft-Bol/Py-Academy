import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

export default [
  {
    ignores: [
      "dist",
      "**/*.config.js",
      "public",
      "node_modules",
      "package-lock.json",
      "yarn.lock"
    ]
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: "detect"
      },
      "import/resolver": {
        node: {
          paths: ["src"],
          extensions: [".js", ".jsx"]
        }
      }
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "import": importPlugin
    },
    rules: {
      // Reglas base de ESLint
      ...js.configs.recommended.rules,

      // Reglas de React
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,

      // Reglas personalizadas
      "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
      "react/prop-types": "warn",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      "react/function-component-definition": [
        "error",
        {
          "namedComponents": "function-declaration",
          "unnamedComponents": "arrow-function"
        }
      ],
      "react-refresh/only-export-components": "warn",

      // Reglas de imports
      "import/order": [
        "error",
        {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "pathGroups": [
            {
              "pattern": "react",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "@/app/**",
              "group": "internal",
              "position": "after"
            },
            {
              "pattern": "@/assets/**",
              "group": "internal"
            },
            {
              "pattern": "@/features/**",
              "group": "internal"
            },
            {
              "pattern": "@/shared/**",
              "group": "internal"
            },
            {
              "pattern": "@/pages/**",
              "group": "internal"
            }
          ],
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],
      "import/no-duplicates": "error",
      "import/newline-after-import": "error",

      // Otras reglas
      "no-param-reassign": [
        "error",
        {
          "props": true,
          "ignorePropertyModificationsFor": ["state", "acc", "e"]
        }
      ],
      "no-unused-vars": "warn",

      // Integración con Prettier (debe ir al final)
      ...eslintConfigPrettier.rules
    }
  }
];
