/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: {
          primary: "#121212",
          secondary: "#1E1E1E",
          tertiary: "#2D2D2D",
        },

        gold: {
          light: "#FFD700",
          DEFAULT: "#DAA520",
          dark: "#B8860B",
        },

        text: {
          primary: "#FFFFFF",
          secondary: "#B3B3B3",
          gold: "#FFD700",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Poppins",
          fontWeight: "400",
          src: "url(/src/fonts/Poppins-Regular.ttf)",
        },
      });
      addBase({
        "@font-face": {
          fontFamily: "Poppins",
          fontWeight: "500",
          src: "url(/src/fonts/Poppins-Medium.ttf)",
        },
      });
      addBase({
        "@font-face": {
          fontFamily: "Poppins",
          fontWeight: "600",
          src: "url(/src/fonts/Poppins-SemiBold.ttf)",
        },
      });
      addBase({
        "@font-face": {
          fontFamily: "Poppins",
          fontWeight: "700",
          src: "url(/src/fonts/Poppins-Bold.ttf)",
        },
      });
      addBase({
        "@font-face": {
          fontFamily: "Poppins",
          fontWeight: "800",
          src: "url(/src/fonts/Poppins-Black.ttf)",
        },
      });
    }),
  ],
};
