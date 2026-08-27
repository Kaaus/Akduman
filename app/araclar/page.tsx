import Link from "next/link";
import { ArrowRight, Calculator, CalendarClock, type LucideIcon } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PageHeading from "@/components/PageHeading";
import Reveal from "@/components/Reveal";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Araçlar | Akduman Hukuk ve Danışmanlık",
  description:
    "İşçilik alacağı ve infaz (koşullu salıverilme) hesaplama araçları. Sonuçlar bilgilendirme amaçlıdır; hukuki tavsiye niteliği taşımaz.",
  path: "/araclar/",
});

/**
 * Araç satırı — ServiceRow'un editoryal satır deseniyle birebir aynı dil
 * (ikon + serif başlık + açıklama + ok, hover'da paper-deep zemin); veri
 * modeli Service olmadığı için yerel, sade bir kopya.
 */
const TOOLS: { href: string; title: string; aciklama: string; Icon: LucideIcon }[] = [
  {
    href: "/araclar/iscilik-alacagi/",
    title: "İşçilik Alacağı Hesaplama",
    aciklama:
      "Kıdem ve ihbar tazminatı, fazla mesai ve yıllık izin ücreti hesaplayın.",
    Icon: Calculator,
  },
  {
    href: "/araclar/infaz-hesaplama/",
    title: "İnfaz Hesaplama",
    aciklama:
      "Koşullu salıverilme ve denetimli serbestlik tarihlerini yaklaşık olarak hesaplayın.",
    Icon: CalendarClock,
  },
];

export default function AraclarPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Araçlar", path: "/araclar/" },
        ])}
      />

      <section className="bg-white">
        <div className="container-site pt-8 pb-12 md:pb-16">
          <PageHeading crumbs={[{ label: "Araçlar" }]} title="Araçlar">
            Sık ihtiyaç duyulan hukuki hesaplamalar için hazırladığımız
            araçlar aşağıdadır. Sonuçlar bilgilendirme amaçlıdır; hukuki
            tavsiye niteliği taşımaz.
          </PageHeading>
          <div className="border-t border-line-strong">
            {TOOLS.map((tool, i) => (
              <Reveal key={tool.href} delay={i * 70}>
                <Link
                  href={tool.href}
                  className="group grid grid-cols-[24px_1fr_auto] items-center gap-x-5 border-b border-line-strong px-2 py-6 transition-colors duration-[260ms] ease-[cubic-bezier(.22,1,.36,1)] hover:border-navy-800 hover:bg-paper-deep sm:px-4 md:grid-cols-[24px_1fr_auto_auto]"
                >
                  <tool.Icon
                    size={24}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="col-start-1 row-start-1 shrink-0 text-navy-800"
                  />
                  <span className="col-start-2 row-start-1 min-w-0 font-serif text-[clamp(1.5rem,2.2vw,1.9rem)] font-[560] leading-snug text-ink-strong transition-transform duration-[260ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5">
                    {tool.title}
                  </span>
                  <span className="col-start-2 col-end-4 row-start-2 mt-1 block text-[0.9375rem] leading-relaxed text-ink md:col-start-3 md:col-end-4 md:row-start-1 md:mt-0 md:max-w-sm md:text-right">
                    {tool.aciklama}
                  </span>
                  <ArrowRight
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="col-start-3 row-start-1 shrink-0 text-navy-800 transition-[transform,color] duration-[260ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2 group-hover:text-bronze-600 md:col-start-4"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
