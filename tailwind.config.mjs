/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    safelist: [
      {
        pattern: /^(?:bg|border|text)-(?:pink|stone|teal)-(?:50|[1-9]00|950)$/,
        variants: ['dark'],
      },
    ],
  },
  darkMode: 'selector',
  theme: {
    fontFamily: {
      sans: ['Inter Variable', 'sans-serif'],
    },
    extend: {
      animation: {
        jiggle: 'jiggleFrames 1s ease-in-out',
      },
      keyframes: {
        jiggleFrames: {
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
        // Keep for later
        // h1: { fontFamily: theme('fontFamily.serif') },
      });
    },
    require('@tailwindcss/typography'),
  ],
};
