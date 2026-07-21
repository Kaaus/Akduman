import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/site";

type Size = "lg" | "md" | "sm";
type Variant = "light" | "dark";

/**
 * Sabit ölçü ön ayarları — bkz. kabul tablosu:
 * lg=header (kırılıma göre 56→64px, "hideTiny" ile 360px altında metin
 * gizlenir) · md=footer (60px, sabit) · sm=mobil menü paneli (48px, sabit).
 * "lg" scroll sonrası COMPACT ile 52px'e sabitlenir (kırılımdan bağımsız —
 * header'ın eski Logo bileşeninde de aynı davranış vardı).
 */
const PRESET: Record<Size, { mono: string; text1: string; text2: string; hideTiny?: boolean }> = {
  lg: {
    mono: "h-[56px] lg:h-[64px]",
    text1: "text-[20px] lg:text-[24px]",
    text2: "text-[10px] lg:text-[11px]",
    hideTiny: true,
  },
  md: { mono: "h-[60px]", text1: "text-[22px]", text2: "text-[11px]" },
  sm: { mono: "h-[48px]", text1: "text-[18px]", text2: "text-[10px]" },
};

const COMPACT = { mono: "h-[52px]", text1: "text-[20px]", text2: "text-[10px]" };

const SIZES: Record<Size, string> = {
  lg: "(max-width: 1024px) 56px, 64px",
  md: "60px",
  sm: "48px",
};

/**
 * Marka kilidi: monogram + iki satır HTML metin, tek link.
 * Monogram (logo-monogram.png) hem açık hem koyu zeminde AYNI dosyadır —
 * altın+koyu yeşil tonları her iki zeminde de okunur; yalnızca yanındaki
 * metnin rengi `variant`e göre değişir (açık zemin: ink-strong/navy-700 —
 * bronz doktrini <18px bronz metni açık zeminde yasaklar, bkz. CLAUDE.md;
 * koyu zemin: #F4F1EA/bronze-300 — sitede yerleşik "koyu zeminde ivory"
 * tonu, bkz. Hero/CtaBand/SectionHeading).
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
  const preset = compact ? COMPACT : PRESET[size];
  const text1Class = variant === "dark" ? "text-[#F4F1EA]" : "text-ink-strong";
  const text2Class = variant === "dark" ? "text-bronze-300" : "text-navy-700";

  return (
    <Link
      href="/"
      aria-label="Akduman Hukuk Bürosu — Ana Sayfa"
      onClick={onClick}
      className={`flex shrink-0 items-center gap-[14px] ${className}`}
    >
      <Image
        src={IMAGES.logoMonogram.src}
        alt=""
        width={654}
        height={660}
        priority
        sizes={SIZES[size]}
        className={`w-auto shrink-0 object-contain ${preset.mono}`}
      />
      {/* 360px altı ekranlarda (yalnız "lg" — header ana barı) metin
          gizlenir, tek monogram kalır. */}
      <span
        className={`${
          PRESET[size].hideTiny ? "hidden min-[360px]:flex" : "flex"
        } flex-col justify-center leading-none`}
      >
        {/* "AKDUMAN" — kaynak metin "Akduman" kalır, büyük harf yalnız
            CSS'te (uppercase); ekran okuyucu harf-harf hecelemesin diye. */}
        <span
          className={`font-serif font-semibold uppercase leading-tight tracking-[0.04em] ${preset.text1} ${text1Class}`}
        >
          Akduman
        </span>
        <span
          className={`mt-0.5 font-sans font-semibold uppercase tracking-[0.18em] leading-none ${preset.text2} ${text2Class}`}
        >
          Hukuk Bürosu
        </span>
      </span>
    </Link>
  );
}
