/**
 * public/og-default.png üreticisi (tek seferlik; gerektiğinde yeniden çalıştırılır):
 *
 *   node scripts/generate-og.mjs
 *
 * Tasarım: 1200×630 · navy-950 zemin · bronz keyline çerçeve · ortada beyaz
 * serif "Akduman Hukuk Bürosu" + alt satır "Ankara • Avukatlık & Hukuki
 * Danışmanlık". Fontlar Google Fonts'tan indirilir (yalnızca gereken
 * karakterler, text= parametresiyle) ve satori metni glif yollarına
 * çevirdiği için çıktı, sistem fontlarından bağımsızdır.
 *
 * Not: app/opengraph-image.tsx (next/og) kaldırıldı çünkü @vercel/og'un
 * Node derlemesi, Türkçe karakter içeren Windows yollarında (ör. "Masaüstü")
 * fileURLToPath hatası veriyor ve edge runtime da route'un statik üretimini
 * engelliyordu. Statik PNG her iki sorunu da kökten çözer.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const TITLE = "Akduman Hukuk Bürosu";
const SUBTITLE = "ANKARA • AVUKATLIK & HUKUKİ DANIŞMANLIK";

/** Google Fonts'tan yalnızca gereken karakterleri kapsayan TTF indirir. */
async function loadGoogleFont(family, weight, text) {
  const cssUrl =
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}` +
    `:wght@${weight}&text=${encodeURIComponent(text)}`;
  // Tarayıcı UA'sı gönderilmediğinde css2 endpoint'i truetype URL döndürür.
  const css = await (await fetch(cssUrl)).text();
  const match = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/);
  if (!match) throw new Error(`${family} için TTF URL bulunamadı`);
  const res = await fetch(match[1]);
  if (!res.ok) throw new Error(`${family} indirilemedi: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

const [cormorant, sourceSans] = await Promise.all([
  loadGoogleFont("Cormorant Garamond", 700, TITLE),
  loadGoogleFont("Source Sans 3", 600, SUBTITLE),
]);

const element = {
  type: "div",
  props: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#081420", // navy-950
      padding: 48,
    },
    children: {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #B08D57", // bronz keyline
          gap: 28,
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                fontFamily: "Cormorant Garamond",
                fontSize: 84,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              },
              children: TITLE,
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                fontFamily: "Source Sans 3",
                fontSize: 26,
                fontWeight: 600,
                color: "#D9C29A", // bronze-300
                letterSpacing: "0.14em",
              },
              children: SUBTITLE,
            },
          },
        ],
      },
    },
  },
};

const svg = await satori(element, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Cormorant Garamond", data: cormorant, weight: 700, style: "normal" },
    { name: "Source Sans 3", data: sourceSans, weight: 600, style: "normal" },
  ],
});

const png = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
}).render().asPng();

const outPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "og-default.png"
);
fs.writeFileSync(outPath, png);
console.log(`✔ ${outPath} yazıldı (${(png.length / 1024).toFixed(1)} KB)`);
