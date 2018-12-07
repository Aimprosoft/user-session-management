module.exports = {
    extends: [
        "plugin:flowtype/recommended",
        "airbnb",
        "prettier",
        "prettier/react",
        "eslint:recommended"
    ],
    plugins: ["flowtype", "prettier", "react", "import", "jsx-a11y"],
    parser: "babel-eslint",
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2016,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        es6: true,
        jest: true,
        browser: true,
        node: true
    },
    settings: { "import/core-modules": ["styled-jsx/css"] },
    globals: {
        DEBUG: false
    },
    rules: {
        "react/forbid-prop-types": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/jsx-curly-brace-presence": "off",
        "react/prefer-stateless-function": "off",
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/label-has-for": [2, {
            "components": ["Label"],
            "required": {
                "some": ["nesting", "id"]
            },
            "allowChildren": false
        }],
        //"jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
        "react/jsx-filename-extension": "off",
        "react/no-children-prop": "off",
        "react/prop-types": "off",
        "import/no-unresolved": "off",
        "import/no-extraneous-dependencies": "off",
        "import/prefer-default-export": "off",
        "import/extensions": "off",
        "no-console": "off",
        "no-alert": "off",
        "no-case-declarations": "off",
        "prettier/prettier": [
            "error",
            {
                singleQuote: true,
                trailingComma: "all",
                bracketSpacing: false,
                jsxBracketSameLine: true,
                parser: "flow"
            }
        ]
    }
};