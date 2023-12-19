module.exports = {
  env: {
    browser: true,
    //  commonjs: true,
    es2021: true,
  },
  extends: [
    "standard-with-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "module",
        project: "tsconfig.json",
        tsconfigRootDir: "./",
      },
    },
  ],
  ignorePatterns: ["src/**/*.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {},
};
