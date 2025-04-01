import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vitest from '@vitest/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Base configuration for all TypeScript files
export const baseTypeScriptConfig = {
  files: ['**/*.{ts,tsx}'],
  plugins: {
    '@typescript-eslint': tseslint,
    prettier: prettier,
    import: importPlugin,
  },
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: resolve(__dirname, 'tsconfig.base.json'),
      EXPERIMENTAL_useProjectService: true,
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      describe: 'readonly',
      it: 'readonly',
      expect: 'readonly',
      afterAll: 'readonly',
      console: 'readonly',
      setTimeout: 'readonly',
      process: 'readonly',
      alert: 'readonly',
      document: 'readonly',
      window: 'readonly',
      navigator: 'readonly',
      location: 'readonly',
      localStorage: 'readonly',
      sessionStorage: 'readonly',
      __dirname: 'readonly',
    },
  },
  rules: {
    // Import organization rules
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    // Restricted imports
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'lodash',
            message: 'Please import from "lodash/{module}" instead.',
          },
        ],
      },
    ],

    // TypeScript rules
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    'arrow-body-style': ['error', 'as-needed'],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/restrict-template-expressions': 'error',
    '@typescript-eslint/unbound-method': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'error',

    // Import rules
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'import/no-named-default': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',

    // General rules
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-duplicate-imports': 'error',
    'no-unused-vars': 'off', // Using TypeScript's no-unused-vars instead
    'prefer-const': 'error',
    'no-var': 'error',
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    'brace-style': ['error', '1tbs'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-trailing-spaces': 'error',
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'prettier/prettier': 'error',
  },
};

// Specific configuration for apps
export const appsConfig = {
  files: ['**/*.{ts,tsx}'],
  rules: {
    // Additional rules specific to apps
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'lodash',
            message: 'Please import from "lodash/{module}" instead.',
          },
        ],
        patterns: [
          {
            group: ['../*'],
            message: 'Please use absolute imports instead of relative imports',
          },
        ],
      },
    ],
  },
};

// Specific configuration for apps
const testConfig = {
  files: ['**/*.tests.ts'], // or any other pattern
  plugins: {
    vitest,
  },
  rules: {
    ...baseTypeScriptConfig.rules,
    ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
    'vitest/max-nested-describe': ['error', { max: 3 }], // you can also modify rules' behavior using option like this
  },
};

// Specific configuration for packages
const packagesConfig = {
  files: ['packages/**/*.{ts,tsx}'],
  rules: {
    ...baseTypeScriptConfig.rules,
    // Additional rules specific to packages
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/unified-signatures': 'error',
  },
};

export default [
  eslint.configs.recommended,
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/packages/storage/src/prisma/generated/client/**',
      '**/*.config.js',
      '**/*.config.ts',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
      '**/apps/frontend/src/components/ui/**',
    ],
  },
  baseTypeScriptConfig,
  appsConfig,
  testConfig,
  packagesConfig,
  testConfig,
];
