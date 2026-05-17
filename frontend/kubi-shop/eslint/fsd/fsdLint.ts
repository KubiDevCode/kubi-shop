import { Linter } from 'eslint'

export const fsdLint = {
  rules: {
    'boundaries/no-unknown': 'off',
    'boundaries/no-unknown-files': 'off',

    'boundaries/dependencies': [
      'warn',
      {
        default: 'allow',
        message: 'Нарушение FSD-архитектуры: слой "{{from.type}}" не должен импортировать "{{to.type}}".',
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
            from: { type: 'shared' },
            allow: {
              to: {
                type: 'app',
                path: 'src/app/providers/storeProvider/store.ts',
              },
              dependency: {
                kind: 'type',
                source: '@/app/providers/storeProvider/store',
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
  } satisfies Linter.Config['rules'],
  settings: {
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
  } satisfies Linter.Config['settings'],
}
