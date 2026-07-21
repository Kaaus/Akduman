import PageHeading from "@/components/PageHeading";
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
        <div className="container-site max-w-4xl pt-10 pb-12 md:pb-16">
          <PageHeading
            crumbs={[{ label: "Yasal Uyarı" }]}
            title="Yasal Uyarı"
          />

          {/* Üst boşluk PageHeading'in kendi pb-12'sinden gelir. */}
          <div className="article-body">
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

            <p className="text-[13px] text-muted">
              Görsel kaynakları: TBMM Genel Kurul Salonu fotoğrafı —
              Wikimedia Commons.
            </p>
            {/* TODO: Wikimedia dosya sayfasındaki yazar adı ve lisans (CC BY-SA vb.)
                teyit edilip bu satıra eklenecek */}
          </div>
        </div>
      </section>

      {/* İşbu metin genel şablondur, yayına almadan önce avukat tarafından gözden geçirilmelidir. */}
    </>
  );
}
