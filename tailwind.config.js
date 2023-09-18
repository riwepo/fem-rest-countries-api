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
    colors: {
      clrTransparent: "transparent",
      clrCurrent: "currentColor",
      clrBg: "hsl(0, 0%, 98%)", // very light gray
      clrText: "hsl(200, 15%, 8%)", // very dark blue
      clrElements: "hsl(0, 0%, 100%)", // light mode elements
      clrInput: "hsl(0, 0%, 52%)", // dark gray
      clrDarkBg: "hsl(207, 26%, 17%)", // very dark blue
      clrDarkText: "hsl(0, 0%, 100%)", // white
      clrDarkElements: "hsl(209, 23%, 22%)", // dark blue
    },
    extend: {},
  },
  plugins: [],
};
