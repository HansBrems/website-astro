/** @type {import("prettier").Config} */
export default {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
  ],
  importOrderParserPlugins: ['decorators-legacy', 'typescript'],
  importOrder: ['^~/', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  singleQuote: true,
};
