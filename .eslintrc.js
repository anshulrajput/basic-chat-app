module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:prettier/recommended",
    "plugin:import/typescript"
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "simple-import-sort"],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "": "never",
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "linebreak-style": 0,
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "prettier/prettier": "error"
  },
  ignorePatterns: ["vite.config.ts"]
};
