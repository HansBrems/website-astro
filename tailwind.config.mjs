/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  theme: {
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
