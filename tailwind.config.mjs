/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Noto Sans", "sans-serif"],
      serif: ["IBM Plex Serif", "serif"],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontFamily: "IBM Plex Serif",
            },
            h2: {
              fontFamily: "IBM Plex Serif",
            },
            h3: {
              fontFamily: "IBM Plex Serif",
            },
            h4: {
              fontFamily: "IBM Plex Serif",
            },
            h5: {
              fontFamily: "IBM Plex Serif",
            },
            h6: {
              fontFamily: "IBM Plex Serif",
            },
            a: {
              color: theme("colors.green.500"),
              "&:hover": {
                color: theme("colors.green.600"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
