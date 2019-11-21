// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        "ecmaVersion": 6,
        parser: 'babel-eslint',
        "ecmaFeatures": {
            "jsx": true
        }
    },
    env: {
        browser: true,
        node: true,
        amd: true
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],

    // add your custom rules here
    // (https://cn.eslint.org/docs/rules/)
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "indent": ["error", 4],
        "comma-dangle": ["error", "always"],
        "array-bracket-spacing": ["error", "always", { "singleValue": true, "objectsInArrays": true, "arraysInArrays": true }],
        "semi" : ["error", "always"],
        "no-multiple-empty-lines": ["error", { "max": 3, "maxEOF": 1 }],
        "no-trailing-spaces": ["error", { "skipBlankLines": true }],
        'standard/object-curly-even-spacing': 0
    }
}
