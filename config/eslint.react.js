module.exports = {
  plugins: ['react'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: ['plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: '16.8'
    }
  },
  rules: {
    'react/display-name': 'off', // Memo triggers false positive
    'react/self-closing-comp': 'error'
  }
};
