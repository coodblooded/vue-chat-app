module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/script-indent": ["error", 4, { "baseIndent": 1 }],
    'linebreak-style': 0,
    "comma-dangle":  ["error", "never"],
    "eslintindent": ["error", "tab"]

  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
