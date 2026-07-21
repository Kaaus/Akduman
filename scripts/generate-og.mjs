/**
 * public/og-default.png üreticisi (tek seferlik; gerektiğinde yeniden çalıştırılır):
 *
 *   node scripts/generate-og.mjs
 *
 * Tasarım v2: 1200×630 · navy-950 zemin · bronz keyline çerçeve · ortada
 * monogram (public/images/logo-monogram.png, ~280px) · altında beyaz
 * Fraunces "Akduman Hukuk Bürosu" + bronze-300 "Ankara • Avukatlık &
 * Hukuki Danışmanlık". Fontlar sitenin GERÇEK tipografisiyle (Fraunces +
 * Hanken Grotesk) eşleşir — önceki sürüm yanlışlıkla Cormorant
 * Garamond/Source Sans 3 kullanıyordu (sitede hiç yer almayan fontlar).
 * Fontlar Google Fonts'tan indirilir (yalnızca gereken karakterler,
 * text= parametresiyle) ve satori metni glif yollarına çevirdiği için
 * çıktı, sistem fontlarından bağımsızdır.
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

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const monogramB64 = fs
  .readFileSync(path.join(ROOT, "public", "images", "logo-monogram.png"))
  .toString("base64");
const monogramSrc = `data:image/png;base64,${monogramB64}`;
const MONOGRAM_RATIO = 654 / 660; // kaynağın gerçek piksel oranı

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

const [fraunces, hanken] = await Promise.all([
  loadGoogleFont("Fraunces", 600, TITLE),
  loadGoogleFont("Hanken Grotesk", 600, SUBTITLE),
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
      backgroundColor: "#081B15", // navy-950
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
          border: "1px solid #BFA05C", // bronz keyline
          gap: 28,
        },
        children: [
          {
            type: "img",
            props: {
              src: monogramSrc,
              width: 280,
              height: Math.round(280 / MONOGRAM_RATIO),
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                fontFamily: "Fraunces",
                fontSize: 68,
                fontWeight: 600,
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
                fontFamily: "Hanken Grotesk",
                fontSize: 24,
                fontWeight: 600,
                color: "#DCC792", // bronze-300
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
    { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
    { name: "Hanken Grotesk", data: hanken, weight: 600, style: "normal" },
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
