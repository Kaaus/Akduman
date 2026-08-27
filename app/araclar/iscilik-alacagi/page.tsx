import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import PageHeading from "@/components/PageHeading";
import Reveal from "@/components/Reveal";
import IscilikHesaplayici from "@/components/hesaplama/IscilikHesaplayici";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { INFO_NOTE, type FaqItem } from "@/lib/site";

/*
 * ═══════════════════════════════════════════════════════════════════
 *  AVUKAT ONAYI BEKLENIYOR
 *  Bu sayfadaki açıklayıcı içerik, yayına alınmadan önce
 *  Av. Samed Akduman tarafından gözden geçirilmelidir.
 * ═══════════════════════════════════════════════════════════════════
 */

export const metadata = buildMetadata({
  title: "İşçilik Alacağı Hesaplama 2026 | Kıdem, İhbar, Fazla Mesai",
  description:
    "Kıdem tazminatı, ihbar tazminatı, fazla mesai ve yıllık izin ücreti hesaplama aracı. 2026 kıdem tavanı ile güncel, bilgilendirme amaçlı hesaplama.",
  path: "/araclar/iscilik-alacagi/",
});

const FAQ: FaqItem[] = [
  {
    question: "Kıdem tazminatına kimler hak kazanır?",
    answer:
      "Kıdem tazminatı, aynı işverene bağlı olarak en az bir yıl çalışmış işçinin; işveren tarafından haklı neden olmaksızın işten çıkarılması, işçinin haklı nedenle feshi, emeklilik, askerlik veya kadın işçinin evlilik nedeniyle fesih gibi kanunda sayılan hâllerde gündeme gelmektedir. Bir yılını doldurmadan sona eren iş ilişkilerinde kıdem tazminatı doğmamaktadır.",
  },
  {
    question: "Giydirilmiş ücret ne demektir?",
    answer:
      "Kıdem tazminatı hesabında çıplak brüt ücrete ek olarak; ikramiye, yol, yemek, yakacak yardımı gibi süreklilik gösteren ödemelerin aylık karşılıkları da dikkate alınmaktadır. Bu toplam \"giydirilmiş ücret\" olarak adlandırılmakta ve hesap bu tutar üzerinden yapılmaktadır.",
  },
  {
    question: "Kıdem tavanı nedir?",
    answer:
      "Kıdem tazminatına esas ücret, her yıl Ocak ve Temmuz aylarında güncellenen kıdem tazminatı tavanı ile sınırlıdır. Giydirilmiş ücreti tavanın üzerinde olan işçinin kıdem tazminatı, tavan tutar üzerinden hesaplanmaktadır. 01.07.2026–31.12.2026 dönemi için tavan 73.729,87 TL'dir.",
  },
  {
    question: "Hesaplama sonuçları kesin midir?",
    answer:
      "Hayır. Bu araçtaki sonuçlar genel kabul görmüş formüllerle yapılan yaklaşık hesaplamalardır; somut dosyadaki ücret bordroları, ek ödemelerin niteliği, fesih şekli ve faiz gibi unsurlara göre nihai tutar farklılık gösterebilmektedir. Kesin değerlendirme için bir avukata danışılması uygun olur.",
  },
];

export default function IscilikAlacagiPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Araçlar", path: "/araclar/" },
          { name: "İşçilik Alacağı Hesaplama", path: "/araclar/iscilik-alacagi/" },
        ])}
      />

      <section className="bg-white">
        <div className="container-site pt-8 pb-12 md:pb-16">
          <PageHeading
            crumbs={[
              { label: "Araçlar", href: "/araclar/" },
              { label: "İşçilik Alacağı Hesaplama" },
            ]}
            title="İşçilik Alacağı Hesaplama"
          >
            Kıdem ve ihbar tazminatı, fazla mesai ve yıllık izin ücretinizi
            yaklaşık olarak hesaplayın.
          </PageHeading>
          <Reveal>
            <IscilikHesaplayici />
          </Reveal>
        </div>
      </section>

      {/* Açıklayıcı bölüm — bilgilendirme amaçlı, TBB reklam yasağına uygun dil */}
      <section className="border-t border-line bg-paper">
        <div className="container-site py-12 md:py-16">
          <div className="article-body min-w-0 max-w-[70ch]">
            <h2>Kıdem Tazminatı Nasıl Hesaplanır?</h2>
            <p>
              Kıdem tazminatı; işçinin son giydirilmiş brüt ücreti (çıplak
              ücret + süreklilik gösteren ek ödemelerin aylık karşılığı)
              üzerinden, her tam hizmet yılı için 30 günlük ücret tutarında
              hesaplanmaktadır. Bir yıldan artan süreler için de aynı oran
              üzerinden kıst hesap yapılmaktadır. Hesaba esas ücret, dönemsel
              olarak açıklanan kıdem tazminatı tavanı ile sınırlıdır. Kıdem
              tazminatı gelir vergisinden muaf olup yalnızca damga vergisi
              (binde 7,59) kesintisine tabidir.
            </p>

            <h2>İhbar Süreleri</h2>
            <p>
              İş sözleşmesinin bildirim şartına uyulmadan feshi hâlinde,
              bildirim süresine ilişkin ücret tutarında ihbar tazminatı
              gündeme gelmektedir. İş Kanunu&rsquo;ndaki bildirim süreleri
              hizmet süresine göre şöyledir:
            </p>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Hizmet Süresi</th>
                    <th>Bildirim (İhbar) Süresi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>6 aydan az</td>
                    <td>2 hafta</td>
                  </tr>
                  <tr>
                    <td>6 ay – 1,5 yıl</td>
                    <td>4 hafta</td>
                  </tr>
                  <tr>
                    <td>1,5 yıl – 3 yıl</td>
                    <td>6 hafta</td>
                  </tr>
                  <tr>
                    <td>3 yıldan fazla</td>
                    <td>8 hafta</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              İhbar tazminatı, kıdem tazminatından farklı olarak gelir
              vergisine tabidir; bu nedenle araçta brüt tutar olarak
              gösterilmektedir.
            </p>

            <h2>Sıkça Sorulan Sorular</h2>
            <Reveal>
              <FaqAccordion items={FAQ} idPrefix="iscilik-hesap-sss" />
            </Reveal>

            <p className="mt-12 border-t border-line-strong pt-6 text-[0.875rem] italic text-muted">
              {INFO_NOTE}
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
