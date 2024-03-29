const { resolve } = require('node:path');

const createPattern = (packageName) => [
  {
    group: ['**/dist', '**/dist/**'],
    message: 'Do not import from dist',
    allowTypeImports: false,
  },
  {
    group: ['**/src', '**/src/**'],
    message: 'Do not import from src',
    allowTypeImports: false,
  },
  {
    group: [`@idle/${packageName}`],
    message: 'Do not import package itself',
    allowTypeImports: false,
  },
];

const allPackages = [
  'packages/backend/server',
  'packages/frontend/component',
  'packages/frontend/core',
  'packages/frontend/http',
  'packages/common/env',
];
/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: resolve(__dirname, './tsconfig.eslint.json'),
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/require-default-props': 'warn',
    'react/jsx-props-no-spreading': [
      'error',
      {
        custom: 'ignore',
      },
    ],
    'class-methods-use-this': 'off',
  },
  overrides: [
    ...allPackages.map((pkg) => ({
      files: [`${pkg}/src/**/*.ts`, `${pkg}/src/**/*.tsx`],
      parserOptions: {
        project: resolve(__dirname, './tsconfig.eslint.json'),
      },
      rules: {
        '@typescript-eslint/no-restricted-imports': [
          'error',
          {
            patterns: createPattern(pkg),
          },
        ],
      },
    })),
  ],
};
