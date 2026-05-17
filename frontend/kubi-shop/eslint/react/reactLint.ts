export const reactLint = {
  rules: {
    'react/prop-types': 'off',
    'react/jsx-key': 'error',
    'react/jsx-no-duplicate-props': 'error',

    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
}
