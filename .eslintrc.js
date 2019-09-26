module.exports = {
    extends: ['./config/eslint.react.js', 'eslint:recommended', 'prettier', 'prettier/react'],
    plugins: ['babel', 'react-hooks', 'prettier'],

    rules: {
        'no-console': 'warn',
        'no-debugger': 'warn',
        'no-unused-vars': 'off'
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src']
            }
        }
    }
};
