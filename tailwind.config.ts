import type { Config } from "tailwindcss";

/**
 * Tasarım sistemi v2: "Lacivert & Bronz — Sessiz Otorite"
 * Palet: Orman Yeşili & Pirinç — isimler tarihsel (navy/bronze), değerler
 * yeşil/pirinç paletine geçti; yeniden adlandırma yapılmadı (riskli).
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
        "ink-strong": "#0D1713",
        ink: "#17221D",
        muted: "#55645C",
        navy: {
          700: "#275C48",
          800: "#1C4536",
          900: "#113026",
          950: "#081B15",
        },
        bronze: {
          300: "#DCC792",
          500: "#BFA05C",
          600: "#A0854A",
          // Onaylı #8A6D3B, paper zemininde küçük metin için 4.36:1 ile
          // WCAG AA (4.5:1) eşiğinin marjinal altında kalıyordu (kontrast
          // raporu). Aynı ton, %1 lightness azaltmasıyla (göz ile
          // ayırt edilemeyecek kadar yakın) 4.56:1'e çekildi. focus
          // token'ı BİLEREK aynı bırakıldı — metin değil, 3:1 yeterli olan
          // non-text/focus-indicator kontrastına tabi.
          700: "#866A39",
        },
        paper: "#F4F3EB",
        "paper-deep": "#EAE8DC",
        line: "#DFE0D2",
        "line-strong": "#C4C6B2",
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
