/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: false,
  rules: {
    "@typescript-eslint/no-floating-promises": "error"
  },
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: './',
  },
};
