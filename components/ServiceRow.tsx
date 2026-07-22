import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Globe,
  Handshake,
  Landmark,
  Scale,
  ScrollText,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/lib/site";

/** Faaliyet alanı → ikon eşlemesi (lucide, 1.5 stroke). */
const ICONS: Record<string, LucideIcon> = {
  ceza: Scale,
  gayrimenkul: Building2,
  aile: Users,
  is: Briefcase,
  yabancilar: Globe,
  miras: ScrollText,
  sigorta: ShieldCheck,
  idare: Landmark,
  ticaret: Handshake,
};

/**
 * Numarasız editoryal hizmet satırı ("sessiz otorite" dili) —
 * eski ServiceCard'ın yerini alır. Tam satır tıklanabilir link;
 * hover: zemin paper-deep, başlık 6px sağa, ok 8px sağa + bronz,
 * ayraç çizgisi navy'ye koyulaşır (260ms).
 */
export default function ServiceRow({
  service,
  showDescriptionOnMobile = false,
}: {
  service: Service;
  /** Hub sayfasında açıklama mobilde de görünür. */
  showDescriptionOnMobile?: boolean;
}) {
  const Icon = ICONS[service.alan] ?? Scale;

  return (
    <Link
      href={`/${service.slug}/`}
      className="group grid grid-cols-[24px_1fr_auto] items-center gap-x-5 border-b border-line-strong px-2 py-6 transition-colors duration-[260ms] ease-[cubic-bezier(.22,1,.36,1)] hover:border-navy-800 hover:bg-paper-deep sm:px-4 md:grid-cols-[24px_1fr_auto_auto]"
    >
      <Icon
        size={24}
        strokeWidth={1.5}
        aria-hidden="true"
        className="col-start-1 row-start-1 shrink-0 text-navy-800"
      />
      <span className="col-start-2 row-start-1 min-w-0 font-serif text-[clamp(1.5rem,2.2vw,1.9rem)] font-[560] leading-snug text-ink-strong transition-transform duration-[260ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5">
        {service.title}
      </span>
      {/* Açıklama TEK span'dir: mobilde başlığın altındaki 2. satıra, md ve
          üzerinde başlıkla ok arasındaki sütuna grid yerleşimiyle taşınır.
          Eskiden aynı cümle mobil/masaüstü için iki ayrı span olarak DOM'a
          iki kez basılıyordu (biri daima gizli) — artık tek kopya var. */}
      <span
        className={`${
          showDescriptionOnMobile ? "block" : "hidden"
        } col-start-2 col-end-4 row-start-2 mt-1 text-[15px] leading-relaxed text-ink md:col-start-3 md:col-end-4 md:row-start-1 md:mt-0 md:block md:max-w-sm md:text-right`}
      >
        {service.oneLiner}
      </span>
      <ArrowRight
        size={20}
        strokeWidth={1.5}
        aria-hidden="true"
        className="col-start-3 row-start-1 shrink-0 text-navy-800 transition-[transform,color] duration-[260ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2 group-hover:text-bronze-600 md:col-start-4"
      />
    </Link>
  );
}
