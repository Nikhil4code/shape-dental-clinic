import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#b9dcff",
          300: "#88c6ff",
          400: "#50a5ff",
          500: "#247ee8",
          600: "#1260c5",
          700: "#0b4a9f",
          800: "#0c3f84",
          900: "#0b3470",
          950: "#071f45"
        },
        pearl: "#f8fbff",
        ink: "#071936"
      },
      boxShadow: {
        premium: "0 24px 80px rgba(7, 31, 69, 0.16)",
        soft: "0 18px 45px rgba(18, 96, 197, 0.12)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "Aptos",
          "Segoe UI",
          "system-ui",
          "sans-serif"
        ],
        display: [
          "Cormorant Garamond",
          "Georgia",
          "Times New Roman",
          "serif"
        ]
      },
      backgroundImage: {
        "royal-glow":
          "radial-gradient(circle at top left, rgba(36, 126, 232, 0.2), transparent 34%), radial-gradient(circle at 80% 20%, rgba(80, 165, 255, 0.16), transparent 30%)"
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
