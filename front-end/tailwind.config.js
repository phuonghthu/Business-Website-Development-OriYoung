/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#84BC4E",
        "secondary-color": "#F9FBF6",
        "gray-color": "#D9D9D9",
        "primary-t": "#80A657",
        "primary-t-black": "#040415",
        "secondary-t-black": "#333342",
        "t-white": "#FFFFFF",
        "t-red": "#F1692F",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/typography")],
};
