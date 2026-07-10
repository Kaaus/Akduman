import { Info, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Vurgu kutusu: sol 3px çizgi (uyari=bronz, bilgi=navy) + paper-deep zemin.
 * Hizmet sayfalarındaki süre/hak-kaybı CÜMLELERİ buraya taşınır —
 * cümleler mevcut metinden gelir, yeni yazım yapılmaz.
 */
export default function Callout({
  variant = "bilgi",
  children,
}: {
  variant?: "uyari" | "bilgi";
  children: ReactNode;
}) {
  const uyari = variant === "uyari";
  const Icon = uyari ? TriangleAlert : Info;

  return (
    <div
      className={`my-7 flex gap-3.5 bg-paper-deep px-5 py-4 ${
        uyari ? "border-l-[3px] border-bronze-500" : "border-l-[3px] border-navy-800"
      }`}
    >
      <Icon
        size={20}
        strokeWidth={1.5}
        aria-hidden="true"
        className="mt-1 shrink-0 text-navy-800"
      />
      <div className="text-[15.5px] leading-relaxed text-ink [&>p]:mb-0">
        {children}
      </div>
    </div>
  );
}
