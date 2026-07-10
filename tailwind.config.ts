import type { Config } from "tailwindcss";

/**
 * Tasarım sistemi: "Lacivert & Bronz"
 * Zeminler yalnızca white / paper / navy-900 / navy-950.
 * Vurgu YALNIZCA bronz ailesi. Gradyan yok, tüm yüzeyler düz.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          700: "#1B3A5C",
          800: "#102A43",
          900: "#0A1B2A",
          950: "#081420",
        },
        bronze: {
          300: "#D9C29A",
          500: "#B08D57",
          600: "#997743",
        },
        paper: "#F8F6F1",
        ink: "#1C2733",
        muted: "#5C6B7A",
        line: "#E6E1D6",
      },
      fontFamily: {
        // next/font/google değişkenleri layout.tsx içinde tanımlanır
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        kicker: "0.14em",
      },
    },
  },
  plugins: [],
};

export default config;
