/** @type {import('tailwindcss').Config} */
export default {
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
};
