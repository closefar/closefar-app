/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ysabeau: ["'Ysabeau',sans"],

        // sans: ["Ysabeau", "sans-serif"],
      },
      screens: {
        xs: { min: "440px" },
        sm: { min: "640px" },
      },
    },
    // screens: {
    //   xs: "440px",
    //   sm: [{ min: "440px", max: "640px" }, { min: "640px" }],
    //   // "min-[${s}]": "${s}px",
    //   ...defaultTheme.screens,
    // },
  },
  plugins: [],
});
