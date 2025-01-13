const nx = require('@nx/eslint-plugin');
const tseslint = require('typescript-eslint');

const defaultDepConstraints = [
  {
    sourceTag: 'scope:shared',
    onlyDependOnLibsWithTags: ['scope:shared'],
  },
  {
    sourceTag: 'scope:backend',
    onlyDependOnLibsWithTags: ['scope:backend', 'scope:shared'],
  },
  {
    sourceTag: 'scope:frontend',
    onlyDependOnLibsWithTags: ['scope:frontend', 'scope:shared'],
  },
  {
    sourceTag: 'type:lib',
    onlyDependOnLibsWithTags: ['type:lib'],
  },
  {
    sourceTag: 'type:app',
    onlyDependOnLibsWithTags: ['type:lib', 'type:app'],
  },
];

/** @type {import("eslint").Linter.Config} */
module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    ignores: ['**/dist', 'node_modules', 'tmp', '*.config*.*{j,t}s'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      jest: require('eslint-plugin-jest'),
      'import-helpers': require('eslint-plugin-import-helpers'),
    },
    rules: {
      ...require('eslint-config-prettier').rules,
      'no-restricted-imports': [
        'error',
        {
          patterns: ['*.dev'],
        },
      ],
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        {
          ignorePrimitives: {
            bigint: true,
            number: true,
            string: true,
          },
        },
      ],
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'jest/unbound-method': ['error', { ignoreStatic: true }],
      '@typescript-eslint/no-explicit-any': [
        'error',
        {
          ignoreRestArgs: true,
        },
      ],
      '@typescript-eslint/no-empty-function': [
        'warn',
        {
          allow: ['constructors'],
        },
      ],
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
            arguments: false,
            returns: false,
          },
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: ['module', ['parent', 'sibling'], 'index'],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            ...defaultDepConstraints,
            {
              sourceTag: 'source:true',
              onlyDependOnLibsWithTags: ['source:true'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: defaultDepConstraints,
        },
      ],
    },
  },
  {
    files: ['**/*.dev.{ts, tsx, js, jsx}'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
];
