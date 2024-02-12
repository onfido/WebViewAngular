module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:import/recommended',
  ],
  env: {
    browser: true,
    node: false,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      modules: true,
      jsx: false,
    },
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['@typescript-eslint', 'prettier'],
  globals: {
    expect: false,
  },
  rules: {
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'prefer-const': 'error',
    curly: 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports' },
    ],
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-constant-condition': 'off',
    'import/order': 'error',
  },
}
