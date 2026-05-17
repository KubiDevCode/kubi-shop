import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import unusedImports from 'eslint-plugin-unused-imports'
import boundaries from 'eslint-plugin-boundaries'
import { defineConfig, globalIgnores } from 'eslint/config'
import { fsdLint } from './eslint/fsd/fsdLint.ts'
import { unusedImportsimportLint } from './eslint/unuesd-imports/unuesedImportsLint.ts'
import { reactLint } from './eslint/react/reactLint.ts'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'coverage']),

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      boundaries.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'unused-imports': unusedImports,
      boundaries,
    },
    settings: {
      react: {
        version: 'detect',
      },

      'import/resolver': {
        './eslint/importResolver.cjs': {
          alias: '@',
          root: 'src',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },

      ...fsdLint.settings,
    },
    rules: {
      ...reactLint.rules,
      ...unusedImportsimportLint.rules,
      ...fsdLint.rules,
    },
  },
])
