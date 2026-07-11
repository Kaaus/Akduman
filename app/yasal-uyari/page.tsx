import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

/*
 * İşbu metin genel şablondur; yayına almadan önce avukat tarafından
 * gözden geçirilmelidir.
 */

export const metadata = buildMetadata({
  title: "Yasal Uyarı | Akduman Hukuk Bürosu",
  description:
    "akduman.av.tr sitesindeki içeriklerin kullanımına ilişkin yasal uyarı ve sorumluluk kaydı.",
  path: "/yasal-uyari/",
});

export default function YasalUyariPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Yasal Uyarı", path: "/yasal-uyari/" },
        ])}
      />

      <section className="bg-white">
        <div className="container-site max-w-4xl py-12 md:py-16">
          <Breadcrumb items={[{ label: "Yasal Uyarı" }]} />
          <h1 className="mt-6">Yasal Uyarı</h1>

          <div className="article-body mt-8">
            <p>
              Bu internet sitesinde yer alan tüm içerikler yalnızca genel
              bilgilendirme amacı taşımaktadır. Site içerikleri, Türkiye
              Barolar Birliği&rsquo;nin ilgili mevzuatı uyarınca reklam, iş
              elde etmeye yönelik teklif veya hukuki danışmanlık niteliği
              taşımamaktadır.
            </p>

            <p>
              Sitedeki içeriklerin okunması veya iletişim formunun
              doldurulması, avukat-müvekkil ilişkisi doğurmamaktadır.
              Avukat-müvekkil ilişkisi; ancak tarafların karşılıklı
              mutabakatı ve usulüne uygun olarak düzenlenmiş vekâletname ile
              kurulmaktadır.
            </p>

            <p>
              Bu sitede yer alan yazılar, metinler ve diğer içerikler izinsiz
              olarak kopyalanamaz, çoğaltılamaz ve kaynak gösterilmeksizin
              kısmen dahi olsa kullanılamaz.
            </p>

            <p>
              İçeriklerin güncel tutulması için özen gösterilmekle birlikte,
              mevzuat ve yargı içtihatları zaman içinde değişebilmektedir. Bu
              nedenle, somut olaya ilişkin herhangi bir işlem yapmadan önce
              mutlaka bir avukata danışılması gerekmektedir. Sitedeki
              bilgilere dayanılarak yapılan işlemlerden doğabilecek
              sonuçlardan sorumluluk kabul edilmemektedir.
            </p>
          </div>
        </div>
      </section>

      {/* İşbu metin genel şablondur, yayına almadan önce avukat tarafından gözden geçirilmelidir. */}
    </>
  );
}
