/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  // Optimize CSS output
  corePlugins: {
    // Disable unused features to reduce CSS size
    preflight: true,
  },
  theme: {
    extend: {
      colors: {
        // Legacy colors (keeping for compatibility)
        vblack: "#1F1F1F",
        vgray: "#BFBFBF",
        vwhite: "#F2F2F2",
        vlightblue: "#8FA5FF",
        vblue: "#0020A0",
        // New design colors
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        dark: {
          bg: "#0f172a",
          surface: "#1e293b",
          border: "#334155",
        },
      },
      fontFamily: {
        title: ["Krona One", "Arial", "sans-serif"],
        text: ["Kufam", "Arial", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
