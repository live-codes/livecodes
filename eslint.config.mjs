/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsdoc from 'eslint-plugin-jsdoc';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/build',
      '**/coverage',
      '**/scripts',
      '**/.docusaurus',
      '**/.cache',
      '**/.jest',
      '**/.storybook',
      'docs/docs/api',
      'functions/vendors',
    ],
  },
  ...fixupConfigRules(
    // @ts-ignore
    compat.extends(
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'prettier',
    ),
  ),
  {
    files: ['**/*.{js,mjs,ts,jsx,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      jsdoc,
      'no-only-tests': noOnlyTests,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
      },
    },
    rules: {
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/member-delimiter-style': [
        'off',
        {
          multiline: {
            delimiter: 'none',
            requireLast: true,
          },

          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
        },
      ],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/quotes': 'off',
      '@typescript-eslint/semi': ['off', null],
      '@typescript-eslint/triple-slash-reference': [
        'error',
        {
          path: 'always',
          types: 'prefer-import',
          lib: 'always',
        },
      ],
      '@typescript-eslint/type-annotation-spacing': 'off',
      '@typescript-eslint/unified-signatures': 'error',
      'arrow-body-style': 'error',
      'arrow-parens': ['off', 'always'],
      'brace-style': ['off', 'off'],
      camelcase: 'off',
      'comma-dangle': 'off',
      complexity: 'off',
      'constructor-super': 'error',
      curly: ['error', 'multi-line'],
      'eol-last': 'off',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'id-blacklist': [
        'error',
        'any',
        'Number',
        'number',
        'String',
        'string',
        'Boolean',
        'boolean',
        'Undefined',
        'undefined',
      ],
      'id-match': 'error',
      'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
      'import/order': 'error',
      'import/named': 'off',
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-indentation': 'error',
      'linebreak-style': 'off',
      'max-classes-per-file': ['error', 1],
      'max-len': 'off',
      'new-parens': 'off',
      'newline-per-chained-call': 'off',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-cond-assign': 'error',
      'no-console': 'error',
      'no-debugger': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-empty': 'error',
      'no-eval': 'error',
      'no-extra-bind': 'error',
      'no-extra-semi': 'off',
      'no-fallthrough': 'off',
      'no-invalid-this': 'off',
      'no-irregular-whitespace': 'off',
      'no-multiple-empty-lines': 'off',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-only-tests/no-only-tests': 'error',
      'no-redeclare': 'error',
      'no-restricted-imports': ['error', { patterns: ['**/_modules'] }],
      'no-return-await': 'error',
      'no-sequences': 'error',
      'no-shadow': ['off', { hoist: 'all' }],
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-trailing-spaces': 'off',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'error',
      'no-unsafe-finally': 'error',
      'no-unused-labels': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'prefer-arrow/prefer-arrow-functions': 'off',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      'quote-props': 'off',
      radix: 'error',
      'space-before-function-paren': 'off',
      'space-in-parens': ['off', 'never'],
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      'use-isnan': 'error',
      'valid-typeof': 'off',
    },
  },
  {
    files: ['e2e/**/*.{js,ts}'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
