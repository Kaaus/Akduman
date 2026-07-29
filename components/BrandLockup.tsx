import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/site";

type Size = "lg" | "md" | "sm";
type Variant = "light" | "dark";

/**
 * Monogram + iki satır metin (dar alan: mobil header, mobil menü, footer)
 * ölçü ön ayarları — bkz. kabul tablosu:
 * lg=header (kırılıma göre 56→64px, "hideTiny" ile 360px altında metin
 * gizlenir) · md=footer (60px, sabit) · sm=mobil menü paneli (48px, sabit).
 * "lg" scroll sonrası MONO_COMPACT ile 52px'e sabitlenir (kırılımdan
 * bağımsız — header'ın eski Logo bileşeninde de aynı davranış vardı).
 */
const MONO_PRESET: Record<Size, { mono: string; text1: string; text2: string; hideTiny?: boolean }> = {
  lg: {
    mono: "h-[56px] lg:h-[64px]",
    text1: "text-[1.25rem] lg:text-[1.5rem]",
    text2: "text-[0.625rem] lg:text-[0.6875rem]",
    hideTiny: true,
  },
  md: { mono: "h-[60px]", text1: "text-[1.375rem]", text2: "text-[0.6875rem]" },
  sm: { mono: "h-[48px]", text1: "text-[1.125rem]", text2: "text-[0.625rem]" },
};

const MONO_COMPACT = { mono: "h-[52px]", text1: "text-[1.25rem]", text2: "text-[0.625rem]" };

const MONO_SIZES: Record<Size, string> = {
  lg: "(max-width: 1024px) 56px, 64px",
  md: "60px",
  sm: "48px",
};

/**
 * Yazılı tam logo (yalnız ≥1024px'te görünür) yükseklik ön ayarları —
 * gerçek dosya oranı 1435×486 ≈ 2.95:1 korunur (next/image intrinsic
 * width/height dosyayla birebir, yükseklik sabitlenince genişlik orana
 * göre otomatik hesaplanır). Monogramdan BİLEREK daha alçak tutulur ki
 * header'daki nav+buton tek satır sığması bozulmasın (genişlik oranla
 * birlikte büyüyor, monogramın ~1:1 oranından farklı).
 */
const FULL_HEIGHT: Record<Size, string> = {
  lg: "lg:h-[48px]",
  md: "h-[46px]",
  sm: "h-[40px]",
};
const FULL_COMPACT_HEIGHT = "lg:h-[40px]";
const FULL_SIZES: Record<Size, string> = {
  lg: "150px",
  md: "140px",
  sm: "120px",
};

/**
 * Marka kilidi — iki temsil, responsive olarak SALT CSS ile değişir (JS/
 * hydration riski yok):
 * - Masaüstü (≥1024px): logo-tam.png — monogram + "AKDUMAN HUKUK &
 *   DANIŞMANLIK" yazısı görselin içinde gömülü.
 * - Dar alan (<1024px + footer/mobil menü paneli her zaman): logo-
 *   monogram.png + yanında iki satır erişilebilir HTML metin (mevcut
 *   davranış — yalnızca ikon değil, okunabilir marka adı da var).
 * Her iki dosya da hem açık hem koyu zeminde AYNI dosyadır (altın tonları
 * her iki zeminde okunur); yalnızca monogram+metin temsilinde metnin rengi
 * `variant`e göre değişir (açık zemin: ink-strong/navy-700 — bronz
 * doktrini <18px bronz metni açık zeminde yasaklar, bkz. CLAUDE.md; koyu
 * zemin: #F4F1EA/bronze-300 — sitede yerleşik "koyu zeminde ivory" tonu,
 * bkz. Hero/CtaBand/SectionHeading).
 */
export default function BrandLockup({
  variant = "light",
  size = "lg",
  compact = false,
  onClick,
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  /** Yalnız header ana barında: scroll sonrası sabit küçük boyuta geçer. */
  compact?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const monoPreset = compact ? MONO_COMPACT : MONO_PRESET[size];
  const fullHeight = compact ? FULL_COMPACT_HEIGHT : FULL_HEIGHT[size];
  const text1Class = variant === "dark" ? "text-[#F4F1EA]" : "text-ink-strong";
  const text2Class = variant === "dark" ? "text-bronze-300" : "text-navy-700";

  return (
    <Link
      href="/"
      aria-label="Akduman Hukuk ve Danışmanlık — Ana Sayfa"
      onClick={onClick}
      className={`flex shrink-0 items-center ${className}`}
    >
      {/* Masaüstü (≥1024px) — yazılı tam logo */}
      <Image
        src={IMAGES.logoTam.src}
        alt=""
        width={1435}
        height={486}
        priority={size === "lg"}
        sizes={FULL_SIZES[size]}
        className={`hidden w-auto shrink-0 object-contain lg:block ${fullHeight}`}
      />
      {/* Dar alan — monogram + erişilebilir iki satır metin */}
      <span className="flex items-center gap-[14px] lg:hidden">
        <Image
          src={IMAGES.logoMonogram.src}
          alt=""
          width={485}
          height={485}
          priority={size === "lg"}
          sizes={MONO_SIZES[size]}
          className={`w-auto shrink-0 object-contain ${monoPreset.mono}`}
        />
        {/* 360px altı ekranlarda (yalnız "lg" — header ana barı) metin
            gizlenir, tek monogram kalır. */}
        <span
          className={`${
            MONO_PRESET[size].hideTiny ? "hidden min-[360px]:flex" : "flex"
          } flex-col justify-center leading-none`}
        >
          {/* "AKDUMAN" — kaynak metin "Akduman" kalır, büyük harf yalnız
              CSS'te (uppercase); ekran okuyucu harf-harf hecelemesin diye. */}
          <span
            className={`font-serif font-semibold uppercase leading-tight tracking-[0.04em] ${monoPreset.text1} ${text1Class}`}
          >
            Akduman
          </span>
          <span
            className={`mt-0.5 font-sans font-semibold uppercase tracking-[0.18em] leading-none ${monoPreset.text2} ${text2Class}`}
          >
            Hukuk ve Danışmanlık
          </span>
        </span>
      </span>
    </Link>
  );
}
