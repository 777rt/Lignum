// @ts-check
import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'src/env.d.ts'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: { extraFileExtensions: ['.astro'] },
      globals: { ...globals.browser },
    },
    rules: {
      'astro/no-unused-css-selector': 'warn',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['*.config.*', 'astro.config.ts'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];
