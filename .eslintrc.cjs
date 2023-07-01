/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/strict'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: false,
  rules: {
    "@typescript-eslint/no-floating-promises": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error"
  },
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: './',
  },
  globals: {
    "React": "readonly",
  }
}
