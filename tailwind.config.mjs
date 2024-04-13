/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'selector',
  theme: {
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
      serif: ['IBM Plex Serif', 'serif'],
    },
    extend: {},
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        h1: { fontFamily: theme('fontFamily.serif') },
        h2: { fontFamily: theme('fontFamily.serif') },
        h3: { fontFamily: theme('fontFamily.serif') },
        h4: { fontFamily: theme('fontFamily.serif') },
        h5: { fontFamily: theme('fontFamily.serif') },
        h6: { fontFamily: theme('fontFamily.serif') },
      });
    },
    require('@tailwindcss/typography'),
  ],
};
