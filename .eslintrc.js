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
    'linebreak-style': 0,
    'newline-after-var': 'error',
    'newline-before-return': 'error',
    'no-underscore-dangle': 0,
    'no-negated-condition': 'error',
    'keyword-spacing': 'error',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
