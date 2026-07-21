import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";
import type { ImageEntry } from "@/lib/site";

/**
 * Fotoğraf yerleşimlerinin ortak alt yapısı: next/image + duotone katmanı
 * (grayscale + navy-900 multiply) + opsiyonel scrim (metin okunabilirliği)
 * + "framed" varyantında flush pirinç çerçeve/hover.
 *
 * Varyant preset'leri --ph-o (duotone opaklığı) ve --ph-b (parlaklık) CSS
 * custom property'lerini besler; tüm hareketler prefers-reduced-motion'da
 * globals.css'teki genel kural (`* { animation/transition: none }`) ile
 * otomatik kapanır.
 */

type Variant = "hero" | "band" | "cta" | "framed" | "texture" | "map";

const VARIANT: Record<Variant, { o: number; b: number; scrim: boolean }> = {
  hero: { o: 0.55, b: 0.75, scrim: true },
  band: { o: 0.68, b: 0.6, scrim: true },
  cta: { o: 0.8, b: 0.55, scrim: false },
  framed: { o: 0.35, b: 0.95, scrim: false },
  texture: { o: 0.62, b: 0.68, scrim: false },
  /** Hafif duotone, çerçevesiz tam-genişlik bleed (örn. İletişim harita alanı). */
  map: { o: 0.35, b: 0.9, scrim: false },
};

/**
 * Scrim (metin okunabilirliği katmanı) varyanta göre değişir:
 * - hero: metin blok SOLDA olduğu için soldan-sağa açılan asimetrik scrim.
 * - band: hizmet sayfalarının başlık bloğu ORTALANDIĞINDAN scrim de
 *   simetriktir; iki kenar şeffaf, orta bant eşit koyulukta kalır.
 */
const SCRIM_GRADIENT: Record<"hero" | "band", string> = {
  hero: "linear-gradient(90deg, rgb(8 27 21 / .96) 0%, rgb(8 27 21 / .75) 38%, transparent 72%)",
  band: "linear-gradient(90deg, transparent 0%, rgb(8 27 21 / .88) 25%, rgb(8 27 21 / .88) 75%, transparent 100%)",
};

export default function PhotoSurface({
  image,
  variant,
  /** true: mutlak konumlu arka plan katmanı (üstteki içerik ayrı kardeş olarak eklenir). */
  fill = false,
  aspectRatio = "16/9",
  objectPosition,
  priority = false,
  /** Yalnız hero arka planında: çok yavaş transform tabanlı zoom. */
  kenBurns = false,
  sizes = "100vw",
  className = "",
}: {
  image: ImageEntry;
  variant: Variant;
  fill?: boolean;
  aspectRatio?: string;
  objectPosition?: string;
  priority?: boolean;
  kenBurns?: boolean;
  sizes?: string;
  className?: string;
}) {
  const preset = VARIANT[variant];
  const framed = variant === "framed";
  const wrapperClass = [fill ? "absolute inset-0" : "", framed ? "border-2 border-bronze-500" : "", className]
    .filter(Boolean)
    .join(" ");

  if (!image.ready) {
    return (
      <div className={wrapperClass}>
        <PlaceholderImage alt={image.alt} aspectRatio={aspectRatio} className={fill ? "h-full" : ""} />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <div
        className="group relative h-full w-full overflow-hidden"
        style={
          {
            aspectRatio: fill ? undefined : aspectRatio,
            "--ph-o": preset.o,
            "--ph-b": preset.b,
          } as React.CSSProperties
        }
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={objectPosition ? { objectPosition } : undefined}
          className={[
            "object-cover [filter:grayscale(.6)_brightness(var(--ph-b,1))]",
            "transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)]",
            kenBurns ? "ph-ken-burns" : "",
            framed ? "group-hover:scale-[1.04]" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-0 bg-navy-900 mix-blend-multiply opacity-[var(--ph-o)]",
            framed ? "transition-opacity duration-[600ms] group-hover:opacity-[.18]" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
        {preset.scrim && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: SCRIM_GRADIENT[variant === "band" ? "band" : "hero"],
            }}
          />
        )}
      </div>
    </div>
  );
}
