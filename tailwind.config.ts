import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f1f8f3",
          100: "#dcecdf",
          200: "#bbd9c2",
          300: "#8fbf9c",
          400: "#5fa074",
          500: "#3e8559",
          600: "#2e6a47",
          700: "#26553a",
          800: "#214431",
          900: "#1c3829",
          950: "#0d1f15",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
