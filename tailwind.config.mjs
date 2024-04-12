/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
      serif: ['IBM Plex Serif', 'serif'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
