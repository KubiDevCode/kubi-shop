import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import boundaries from 'eslint-plugin-boundaries';
import { defineConfig, globalIgnores } from 'eslint/config';

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
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },

      'boundaries/include': ['src/**/*'],

      'boundaries/elements': [
        {
          type: 'app',
          pattern: 'src/app/**/*',
          mode: 'full',
        },
        {
          type: 'pages',
          pattern: 'src/pages/**/*',
          mode: 'full',
        },
        {
          type: 'widgets',
          pattern: 'src/widgets/**/*',
          mode: 'full',
        },
        {
          type: 'features',
          pattern: 'src/features/**/*',
          mode: 'full',
        },
        {
          type: 'entities',
          pattern: 'src/entities/**/*',
          mode: 'full',
        },
        {
          type: 'shared',
          pattern: 'src/shared/**/*',
          mode: 'full',
        },
      ],
    },
    rules: {
      'react/prop-types': 'off',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'boundaries/no-unknown': 'off',
      'boundaries/no-unknown-files': 'off',

      'boundaries/dependencies': [
        'warn',
        {
          default: 'allow',
          message:
            'Нарушение FSD-архитектуры: слой "{{from.type}}" не должен импортировать "{{to.type}}".',
          rules: [
            {
              from: { type: 'shared' },
              disallow: {
                to: {
                  type: ['entities', 'features', 'widgets', 'pages', 'app'],
                },
              },
            },
            {
              from: { type: 'entities' },
              disallow: {
                to: {
                  type: ['features', 'widgets', 'pages', 'app'],
                },
              },
            },
            {
              from: { type: 'features' },
              disallow: {
                to: {
                  type: ['widgets', 'pages', 'app'],
                },
              },
            },
            {
              from: { type: 'widgets' },
              disallow: {
                to: {
                  type: ['pages', 'app'],
                },
              },
            },
            {
              from: { type: 'pages' },
              disallow: {
                to: {
                  type: ['app'],
                },
              },
            },
          ],
        },
      ],
    },
  },
]);