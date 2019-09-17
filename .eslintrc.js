
module.exports = {
    extends: [
        './config/eslint.react.js',
        'prettier',
    ],
    plugins: ['babel', 'react-hooks', 'prettier'],
    
    rules: {
        'no-console': 'warn',
    }, 
};

  