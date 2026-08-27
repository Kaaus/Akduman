"use client";

import Link from "next/link";
import { Scale } from "lucide-react";

/**
 * components/hesaplama/ortak.tsx — Hesaplama araçlarının paylaşılan
 * yapı taşları. İki panelli kalıp (sol açık form + 3px bronz üst şerit,
 * sağ navy-950 sonuç paneli), alt-çizgili minimal alanlar, boş durum,
 * detay/danışma/uyarı blokları burada tek kaynaktan gelir —
 * IscilikHesaplayici ve InfazHesaplayici aynı dili paylaşır.
 */

/** "85.000,50" / "85000.5" / "85000" biçimlerini sayıya çevirir. */
export function parseTutar(raw: string): number {
  const s = raw.trim().replace(/\s/g, "");
  if (!s) return NaN;
  const normalized = s.includes(",")
    ? s.replace(/\./g, "").replace(",", ".")
    : s;
  return Number(normalized);
}

/** İki panelli dış kabuk: sol form (paper + bronz şerit) / sağ sonuç (navy). */
export function HesapCerceve({
  baslik,
  sol,
  sag,
  sagRef,
}: {
  baslik: string;
  sol: React.ReactNode;
  sag: React.ReactNode;
  /** Mobilde sonuca yumuşak kaydırma için sağ panelin ref'i. */
  sagRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div className="overflow-hidden rounded-[2px] border border-line-strong shadow-card lg:grid lg:grid-cols-[54fr_46fr]">
      <div className="border-t-[3px] border-bronze-500 bg-paper p-6 sm:p-8">
        <h2 className="text-center font-serif text-[1.375rem] font-semibold text-ink-strong">
          {baslik}
        </h2>
        {sol}
      </div>
      <div ref={sagRef} className="bg-navy-950 p-6 sm:p-8">
        {sag}
      </div>
    </div>
  );
}

const ALAN_INPUT_CLASS = (hatali: boolean) =>
  `mt-1 w-full border-0 border-b-[1.5px] bg-transparent px-0 py-2 font-sans text-[1rem] text-ink outline-none transition-colors ${
    hatali ? "border-[#A33A2E]" : "border-line-strong focus:border-navy-800"
  }`;

function AlanKabuk({
  id,
  label,
  hata,
  yardim,
  children,
}: {
  id: string;
  label: string;
  hata?: string;
  yardim?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.8125rem] font-semibold text-ink-strong">
        {label}
      </label>
      {children}
      {yardim && !hata && (
        <p className="mt-1 text-[0.6875rem] leading-relaxed text-muted">{yardim}</p>
      )}
      {hata && (
        <p id={`${id}-hata`} role="alert" className="error-text mt-1 text-[0.6875rem]">
          {hata}
        </p>
      )}
    </div>
  );
}

/** Alt-çizgili minimal input alanı (+ 11px yardım notu + satır içi hata). */
export function HesapAlan({
  id,
  label,
  hata,
  yardim,
  inputProps,
}: {
  id: string;
  label: string;
  hata?: string;
  yardim?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <AlanKabuk id={id} label={label} hata={hata} yardim={yardim}>
      <input
        id={id}
        aria-invalid={hata ? true : undefined}
        aria-describedby={hata ? `${id}-hata` : undefined}
        className={ALAN_INPUT_CLASS(Boolean(hata))}
        {...inputProps}
      />
    </AlanKabuk>
  );
}

/** HesapAlan'ın select karşılığı — aynı alt-çizgili dil. */
export function HesapSecim({
  id,
  label,
  hata,
  yardim,
  value,
  onChange,
  secenekler,
}: {
  id: string;
  label: string;
  hata?: string;
  yardim?: string;
  value: string;
  onChange: (v: string) => void;
  secenekler: { value: string; label: string }[];
}) {
  return (
    <AlanKabuk id={id} label={label} hata={hata} yardim={yardim}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={hata ? true : undefined}
        aria-describedby={hata ? `${id}-hata` : undefined}
        className={`${ALAN_INPUT_CLASS(Boolean(hata))} cursor-pointer`}
      >
        {secenekler.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </AlanKabuk>
  );
}

/** Sağ panel boş durumu: terazi + yönlendirme cümlesi. */
export function BosDurum({ mesaj }: { mesaj: string }) {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 text-center">
      <Scale size={32} strokeWidth={1.5} className="text-bronze-500" aria-hidden="true" />
      <p className="max-w-[26ch] text-[0.9375rem] leading-relaxed text-[#F4F1EA]/[.75]">
        {mesaj}
      </p>
    </div>
  );
}

/** "Hesaplama Detayı ve Varsayımlar" açılır bölümü (koyu panel içinde). */
export function DetayBolumu({ children }: { children: React.ReactNode }) {
  return (
    <details className="mt-6 border-t border-white/[0.14] pt-4">
      <summary className="cursor-pointer text-[0.8125rem] font-semibold text-[#F4F1EA]/[.85] transition-colors hover:text-white">
        Hesaplama Detayı ve Varsayımlar
      </summary>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.75rem] leading-relaxed text-[#F4F1EA]/[.65]">
        {children}
      </ul>
    </details>
  );
}

/** Açık zeminli "Avukata Danışın" + altındaki küçük punto uyarı. */
export function AvukataDanis({ uyari }: { uyari: string }) {
  return (
    <>
      <Link
        href="/iletisim/"
        className="btn mt-6 w-full bg-paper text-ink-strong hover:bg-paper-deep"
      >
        Avukata Danışın
      </Link>
      <p className="mt-4 text-center text-[0.6875rem] leading-relaxed text-[#F4F1EA]/[.55]">
        {uyari}
      </p>
    </>
  );
}

/** Form altı gizlilik notu — hesap tamamen istemci tarafında. */
export function GizlilikNotu() {
  return (
    <p className="text-center text-[0.6875rem] text-muted">
      Hesaplama cihazınızda yapılır; bilgileriniz cihazınızdan ayrılmaz.
    </p>
  );
}

/** Sonuca yumuşak kaydırma (reduced-motion'da anında). */
export function sonucaKaydir(ref: React.RefObject<HTMLElement>) {
  requestAnimationFrame(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "nearest",
    });
  });
}
