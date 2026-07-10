import { ImageResponse } from "next/og";

/**
 * Varsayılan paylaşım görseli — build sırasında next/og ile statik üretilir
 * (1200×630): navy-950 zemin, bronz keyline çerçeve, ortada beyaz serif
 * "Akduman Hukuk Bürosu" + alt satır. Makalede kapak görseli varsa og:image
 * o sayfa özelinde kapağa döner.
 */

/*
 * Edge runtime zorunlu: @vercel/og'un Node derlemesi, Windows'ta Türkçe
 * karakter içeren proje yollarında (ör. "Masaüstü") fileURLToPath hatası
 * veriyor. Edge derlemesi varlıkları gömülü taşıdığı için bundan etkilenmez;
 * Vercel'de de doğal olarak edge'de çalışır.
 */
export const runtime = "edge";

export const alt =
  "Akduman Hukuk Bürosu — Ankara • Avukatlık & Hukuki Danışmanlık";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Google Fonts'tan TTF indirir (UA gönderilmediğinde css2 endpoint'i
 * truetype URL döndürür). Ağ erişimi yoksa null döner ve varsayılan
 * font kullanılır — build asla kırılmaz.
 */
async function loadGoogleFont(family: string, weight: number) {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family
    )}:wght@${weight}&subset=latin-ext`;
    const css = await (await fetch(cssUrl)).text();
    const match = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/);
    if (!match) return null;
    const res = await fetch(match[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const [cormorant, sourceSans] = await Promise.all([
    loadGoogleFont("Cormorant Garamond", 700),
    loadGoogleFont("Source Sans 3", 600),
  ]);

  const fonts = [
    cormorant
      ? { name: "Cormorant Garamond", data: cormorant, weight: 700 as const }
      : null,
    sourceSans
      ? { name: "Source Sans 3", data: sourceSans, weight: 600 as const }
      : null,
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 700 | 600 }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#081420",
          padding: 48,
        }}
      >
        {/* Bronz keyline çerçeve */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #B08D57",
            gap: 28,
          }}
        >
          <div
            style={{
              fontFamily: cormorant ? "Cormorant Garamond" : "sans-serif",
              fontSize: 84,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
            }}
          >
            Akduman Hukuk Bürosu
          </div>
          <div
            style={{
              fontFamily: sourceSans ? "Source Sans 3" : "sans-serif",
              fontSize: 26,
              fontWeight: 600,
              color: "#D9C29A",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Ankara • Avukatlık &amp; Hukuki Danışmanlık
          </div>
        </div>
      </div>
    ),
    { ...size, ...(fonts.length > 0 ? { fonts } : {}) }
  );
}
