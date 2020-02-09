module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [2, 4, { "SwitchCase": 1 }],
        "prefer-const": ["error", {
            "ignoreReadBeforeAssign": false
        }],
        "no-var": "error"
    }
};
