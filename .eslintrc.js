const { resolve } = require('node:path');

const createPattern = (packageName) => [
  {
    group: ['antd'],
    importNames: ['List'],
    message: 'Use import from @idle/component/List instead',
  },
  {
    group: ['**/dist', '**/dist/**'],
    message: 'Do not import from dist',
  },
  {
    group: ['**/src', '**/src/**'],
    message: 'Do not import from src',
  },
  {
    group: [`@idle/${packageName}`],
    message: 'Do not import package itself',
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
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': [
      'error',
      {
        custom: 'ignore',
      },
    ],
    'class-methods-use-this': 'off',
    'no-nested-ternary': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
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
    {
      files: [
        `${allPackages[1]}/src/**/*.ts`,
        `${allPackages[1]}/src/**/*.tsx`,
      ],
      parserOptions: {
        project: resolve(__dirname, './tsconfig.eslint.json'),
      },
      rules: {
        '@typescript-eslint/no-restricted-imports': [
          'error',
          {
            patterns: createPattern(allPackages[1]).slice(1),
          },
        ],
      },
    },
  ],
};
