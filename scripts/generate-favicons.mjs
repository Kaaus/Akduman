/**
 * App Router favicon/icon üreticisi (tek seferlik; gerektiğinde yeniden çalıştırılır):
 *
 *   node scripts/generate-favicons.mjs
 *
 * Kaynak: public/images/logo-monogram.png (654×660, RGBA, hem açık hem koyu
 * zeminde okunur kare monogram). satori ile <img> data URI'si üzerinden
 * kare bir tuvale yerleştirilip resvg ile PNG'ye çevrilir (generate-og.mjs
 * ile aynı yöntem — sisteme yeni bir görsel-işleme bağımlılığı eklemez).
 *
 * Üretilenler, Next.js App Router dosya konvansiyonuyla otomatik bağlanır
 * (layout.tsx'te elle <link> eklemeye gerek yok):
 *   - app/favicon.ico   32×32, şeffaf zemin (ICO container: png-to-ico)
 *   - app/icon.png      512×512, şeffaf zemin
 *   - app/apple-icon.png 180×180, #081B15 zemin + %12 iç boşluk
 *     (iOS şeffaf apple-touch-icon'u siyaha boyayarak fallback yaptığından
 *     bu görselde OPAK zemin zorunludur)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const MONOGRAM_PATH = path.join(ROOT, "public", "images", "logo-monogram.png");
const monogramB64 = fs.readFileSync(MONOGRAM_PATH).toString("base64");
const monogramSrc = `data:image/png;base64,${monogramB64}`;
// Kaynak dosyanın gerçek piksel oranı (654×660 ≈ kare) — img'ye doğru
// width/height verilmezse satori oranı bozabilir.
const RATIO = 654 / 660;

/**
 * `size`×`size` bir kare üretir. `bg` verilirse opak zemin + `paddingPct`
 * kadar iç boşluk uygulanır; verilmezse şeffaf zeminde monogram tuvali
 * neredeyse doldurur (küçük favicon boyutlarında görünürlük için ~6% pay).
 */
async function renderSquarePng(size, { bg, paddingPct } = {}) {
  const pad = paddingPct ?? (bg ? 12 : 6);
  const innerSize = Math.round(size * (1 - (pad * 2) / 100));
  const monoW = innerSize;
  const monoH = Math.round(innerSize / RATIO);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bg ?? "transparent",
        },
        children: {
          type: "img",
          props: { src: monogramSrc, width: monoW, height: monoH },
        },
      },
    },
    { width: size, height: size, fonts: [] }
  );

  return new Resvg(svg, { fitTo: { mode: "width", value: size } }).render().asPng();
}

const appDir = path.join(ROOT, "app");

const icon512 = await renderSquarePng(512);
fs.writeFileSync(path.join(appDir, "icon.png"), icon512);
console.log(`✔ app/icon.png yazıldı (512×512, ${(icon512.length / 1024).toFixed(1)} KB)`);

const appleIcon = await renderSquarePng(180, { bg: "#081B15", paddingPct: 12 });
fs.writeFileSync(path.join(appDir, "apple-icon.png"), appleIcon);
console.log(`✔ app/apple-icon.png yazıldı (180×180, ${(appleIcon.length / 1024).toFixed(1)} KB)`);

const favicon32 = await renderSquarePng(32);
const icoBuffer = await pngToIco([favicon32]);
fs.writeFileSync(path.join(appDir, "favicon.ico"), icoBuffer);
console.log(`✔ app/favicon.ico yazıldı (32×32, ${(icoBuffer.length / 1024).toFixed(1)} KB)`);
