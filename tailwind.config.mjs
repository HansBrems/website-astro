/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    safelist: [
      {
        pattern:
          /^(bg|border|text|from|to|via)-(pink|stone|teal)-(50|100|200|300|400|500|600|700|800|900)$/,
        variants: ['dark'],
      },
    ],
  },
  darkMode: 'selector',
  theme: {
    fontFamily: {
      sans: ['Inter Variable', 'sans-serif'],
      // serif: ['IBM Plex Serif', 'serif'],
    },
    extend: {
      animation: {
        jiggle: 'jiggle 0.3s ease-in-out',
      },
      keyframes: {
        jiggle: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        // h1: { fontFamily: theme('fontFamily.serif') },
        // h2: { fontFamily: theme('fontFamily.serif') },
        // h3: { fontFamily: theme('fontFamily.serif') },
        // h4: { fontFamily: theme('fontFamily.serif') },
        // h5: { fontFamily: theme('fontFamily.serif') },
        // h6: { fontFamily: theme('fontFamily.serif') },
      });
    },
    require('@tailwindcss/typography'),
  ],
};
