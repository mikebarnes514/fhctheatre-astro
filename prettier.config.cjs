/** @type {import("prettier").Config} */

module.exports = {
  pluginSearchDirs: [__dirname],
  plugins: [require.resolve("prettier-plugin-astro")],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  trailingComma: "all",
  singleQuote: true,
  printWidth: 200,
  tabWidth: 2,
  useTabs: false,
  semi: true,
};
