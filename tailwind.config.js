/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./tabs/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}",
    "./popup.tsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f7ff",
          100: "#ebefff",
          200: "#d6deff",
          300: "#b8c5ff",
          400: "#96a3ff",
          500: "#667eea",
          600: "#5568d3",
          700: "#4553b8",
          800: "#3a4794",
          900: "#2f3a75"
        },
        secondary: {
          500: "#764ba2"
        }
      }
    }
  },
  plugins: []
}
