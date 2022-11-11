module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "amd": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        'generator-star-spacing': 'off',
        'arrow-parens': 'off',
        'one-var': 'off',
        'no-explicit-any': 'off',
        'import/first': 'off',
        'import/named': 'error',
        'import/namespace': 'error',
        'import/default': 'error',
        'import/export': 'error',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'prefer-promise-reject-errors': 'off',
        'no-trailing-spaces':'error',
        'linebreak-style': [
            "error",
            "unix"
        ],
        "curly":[
            "error",
            "all"
        ],
        "indent": ["error", 4],
        "quotes": ["error", "single"],
        "semi": ["error", "never"]
    }
}
