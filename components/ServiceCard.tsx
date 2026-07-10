import Link from "next/link";
import type { Service } from "@/lib/site";

/**
 * "Endeks kartı" stili hizmet kartı — klişe shadow-card DEĞİL:
 * beyaz zemin, 1px line çerçeve, radius 2px, 28px iç boşluk.
 * Hover: çerçeve bronza döner + 2px yukarı kayar; gölge YOK.
 */
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/${service.slug}/`}
      className="group flex flex-col rounded-[2px] border border-line bg-white p-7 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-bronze-500"
    >
      {/* Bronz serif sıra numarası */}
      <span
        aria-hidden="true"
        className="font-serif text-[28px] font-bold leading-none text-bronze-500"
      >
        {service.num}
      </span>
      <h3 className="mt-4 font-serif text-[22px] font-semibold leading-snug text-navy-800">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">
        {service.oneLiner}
      </p>
      <span className="mt-5 text-[14px] font-semibold text-bronze-600">
        Detaylı Bilgi <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
