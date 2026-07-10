import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { formatDate, getAllArticles } from "@/lib/articles";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Hukuki Makaleler | Akduman Hukuk Bürosu",
  description:
    "Miras, trafik kazası, kira ve iş hukuku başta olmak üzere güncel hukuki bilgilendirme yazıları.",
  path: "/hukuki-makaleler/",
});

/**
 * TIMELINE arşiv: en üstte featured (dizinin ilk makalesi), altında ortadan
 * geçen dikey çizgi üzerinde kronoloji. Kartlar desktop'ta sağ-sol
 * alternatif, mobilde çizgi solda ve tek sütun. Tarih rozeti YALNIZ gerçek
 * tarih girildiğinde basılır (tarih politikası).
 */
export default function MakalelerPage() {
  const articles = getAllArticles();
  const [featured, ...rest] = articles;
  const featuredCategory = SERVICES.find((s) =>
    featured.alan.includes(s.alan)
  )?.title;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hukuki Makaleler", path: "/hukuki-makaleler/" },
        ])}
      />

      <section className="bg-white">
        <div className="container-site py-12 md:py-16">
          <Breadcrumb items={[{ label: "Hukuki Makaleler" }]} />
          <h1 className="mt-6">Hukuki Makaleler</h1>

          {/* Featured — tam genişlik kart */}
          <Reveal className="mt-12">
            <Link
              href={`/${featured.slug}/`}
              className="group block border border-line-strong bg-paper-deep p-8 shadow-card transition-shadow duration-[260ms] hover:shadow-card-hover md:p-12"
            >
              {featuredCategory && (
                <p className="text-[12px] font-semibold uppercase tracking-kicker text-bronze-700">
                  {featuredCategory}
                </p>
              )}
              {featured.date && (
                <p className="mt-2 text-[13px] text-muted">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                </p>
              )}
              <h2 className="mt-4 max-w-3xl">
                {/* Hover'da başlık altı bronz çizgi dolar */}
                <span className="link-slide">{featured.title}</span>
              </h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink">
                {featured.description}
              </p>
              <span
                aria-hidden="true"
                className="btn-tertiary pointer-events-none mt-6 text-[15px]"
              >
                Oku
                <ArrowRight size={16} strokeWidth={1.5} className="btn-arrow" />
              </span>
            </Link>
          </Reveal>

          {/* Kronoloji */}
          <div className="relative mt-16">
            {/* Dikey çizgi: mobilde solda 18px, desktop'ta ortada */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 top-0 left-[18px] w-[2px] bg-line-strong md:left-1/2 md:-translate-x-1/2"
            />
            <ol className="list-none space-y-12">
              {rest.map((article, i) => {
                const right = i % 2 === 1;
                return (
                  <li
                    key={article.slug}
                    className="timeline-node relative pl-12 md:grid md:grid-cols-2 md:gap-x-16 md:pl-0"
                  >
                    {/* Düğüm — hover'da tek sefer bronz halka nabzı */}
                    <span
                      aria-hidden="true"
                      className="node-dot absolute left-[18px] top-8 h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-bronze-500 md:left-1/2"
                    />
                    {/* Tarih rozeti — yalnız gerçek tarih varsa */}
                    {article.date && (
                      <span className="absolute left-8 top-[22px] rounded-[2px] bg-navy-900 px-2 py-0.5 text-[12px] font-semibold text-white md:left-[calc(50%+16px)]">
                        <time dateTime={article.date}>
                          {formatDate(article.date)}
                        </time>
                      </span>
                    )}
                    <div
                      className={
                        right
                          ? "md:col-start-2 md:pl-2"
                          : "md:col-start-1 md:pr-2"
                      }
                    >
                      <Reveal delay={Math.min(i, 3) * 70}>
                        <ArticleCard article={article} />
                      </Reveal>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
