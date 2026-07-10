import type { Config } from "tailwindcss";

/**
 * Tasarım sistemi v2: "Lacivert & Bronz — Sessiz Otorite"
 * - Yüzey ritmi: white → paper → navy-950 → white…
 * - Bronz doktrini: açık zeminde asla <18px metin veya 1px çizgi olarak
 *   kullanılmaz (yalnız ≥2px dekor çizgisi, ≥24px ikon veya bronze-700 ile
 *   ≥15px/600 link). Bronzun asıl sahnesi koyu zeminlerdir.
 * - muted yalnızca ≥14px meta bilgide kullanılır.
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
        "ink-strong": "#0B1622",
        ink: "#16212E",
        muted: "#46586B",
        navy: {
          700: "#1E4066",
          800: "#14304D",
          900: "#0E2033",
          950: "#081420",
        },
        bronze: {
          300: "#D9C29A",
          500: "#B08D57",
          600: "#96773F",
          700: "#7E6234",
        },
        paper: "#F7F4EE",
        "paper-deep": "#EDE7DA",
        line: "#E3DCCF",
        "line-strong": "#C9BFA9",
        focus: "#8A6D3B",
      },
      fontFamily: {
        // next/font değişkenleri layout.tsx'te tanımlanır
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        kicker: "0.16em",
      },
      boxShadow: {
        // Yumuşak tekil gölgeler — "SaaS kart yığını" görünümü yasak
        card: "0 1px 2px rgb(11 22 34 / 0.05)",
        "card-hover": "0 10px 28px rgb(11 22 34 / 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
