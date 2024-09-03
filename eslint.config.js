module.exports = {
  // extends: [
  //   'next/core-web-vitals',
  //   'next/typescript',
  //   'plugin:prettier/recommended',
  // ],
  // plugins: ['prettier'],
  plugins: {
    prettier: 'prettier/recommended',
  },
  rules: {
    'prettier/prettier': ['error'],
  },
  ignorePatterns: ['node_modules'],
};
