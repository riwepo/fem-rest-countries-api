/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      nunito: ["nunito", "sans-serif"],
    },
    fontWeight: {
      normal: "300",
      semibold: "600",
      bold: "800",
    },
    extend: {},
  },
  plugins: [],
};
