import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { getAllArticles } from "@/lib/articles";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hukuki Makaleler | Akduman Hukuk Bürosu",
  description:
    "Miras, trafik kazası, kira ve iş hukuku başta olmak üzere güncel hukuki bilgilendirme yazıları.",
  path: "/hukuki-makaleler/",
});

/**
 * TIMELINE arşiv: H1 altında sakin bir giriş bandı, ardından ortadan geçen
 * dikey çizgi üzerinde kronoloji. Tüm makaleler EŞİT boyutlu kart olarak
 * yer alır — keyfî bir "öne çıkan" hiyerarşisi yoktur (elimizde bunu
 * gerekçelendirecek gerçek bir veri, tarih/popülerlik, olmadığından).
 * Dizinin ilk makalesi en üst düğüm olur. Kartlar desktop'ta sağ-sol
 * alternatif, mobilde çizgi solda ve tek sütun. Tarih rozeti YALNIZ gerçek
 * tarih girildiğinde basılır (tarih politikası).
 */
export default function MakalelerPage() {
  const articles = getAllArticles();

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

          {/* Giriş bandı */}
          <Reveal className="mt-8 max-w-[70ch]">
            <p className="kicker mb-3">Bilgi Merkezi</p>
            <p className="text-[17px] leading-relaxed text-ink md:text-[18px]">
              Miras, gayrimenkul, sigorta ve iş hukuku başta olmak üzere sık
              karşılaşılan hukuki konulara ilişkin bilgilendirme yazılarımızı
              aşağıda bulabilirsiniz. Yazılar genel bilgilendirme amaçlıdır;
              somut uyuşmazlığınıza ilişkin değerlendirme için avukatınıza
              danışmanız önerilir.
            </p>
          </Reveal>

          {/* Kronoloji */}
          <div className="relative mt-16">
            {/* Dikey çizgi: mobilde solda 18px, desktop'ta ortada */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 top-0 left-[18px] w-[2px] bg-line-strong md:left-1/2 md:-translate-x-1/2"
            />
            <ol className="list-none space-y-12">
              {articles.map((article, i) => {
                const right = i % 2 === 1;
                return (
                  <li
                    key={article.slug}
                    className="timeline-node relative pl-12 md:grid md:grid-cols-2 md:gap-x-16 md:pl-0"
                  >
                    {/* Düğüm — hover'da tek sefer bronz halka nabzı.
                        Tarih artık yalnız kartın içinde (kategori satırında)
                        basılır; çizgi üzerinde rozet tekrarı yok. */}
                    <span
                      aria-hidden="true"
                      className="node-dot absolute left-[18px] top-8 h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-bronze-500 md:left-1/2"
                    />
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
