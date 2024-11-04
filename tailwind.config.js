/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        vblack: "#1F1F1F",
        vgray: "#BFBFBF",
        vwhite: "#F2F2F2",
        vlightblue: "#8FA5FF",
        vblue: "#0020A0",
      },
      fontFamily: {
        title: ["Krona One", "Arial", "sans-serif"],
        text: ["Kufam", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
