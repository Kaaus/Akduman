import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import PageHeading from "@/components/PageHeading";
import Reveal from "@/components/Reveal";
import InfazHesaplayici from "@/components/hesaplama/InfazHesaplayici";
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
  title: "İnfaz Hesaplama 2026 | Koşullu Salıverilme ve Denetimli Serbestlik",
  description:
    "Koşullu salıverilme ve denetimli serbestlik tarihlerini hesaplayın. 5275 sayılı kanun ve 7242 değişikliklerine göre yaklaşık, bilgilendirme amaçlı hesaplama.",
  path: "/araclar/infaz-hesaplama/",
});

const FAQ: FaqItem[] = [
  {
    question: "Koşullu salıverilme tarihi kesin tahliye tarihi midir?",
    answer:
      "Hayır. Koşullu salıverilme; cezanın kanunda öngörülen kısmının iyi hâlle geçirilmesi şartına bağlıdır ve infaz hâkimliği değerlendirmesiyle uygulanmaktadır. Disiplin cezaları, içtima ve dosyaya özgü diğer unsurlar tarihi değiştirebilmektedir. Bu araçtaki sonuç yalnızca genel kurallara göre bir tahmindir.",
  },
  {
    question: "Denetimli serbestlik ile koşullu salıverilme arasındaki fark nedir?",
    answer:
      "Koşullu salıverilme, cezanın belirli bir oranının infaz kurumunda geçirilmesinden sonra kalan sürenin dışarıda denetim altında geçirilmesidir. Denetimli serbestlik ise koşullu salıverilme tarihinden önceki son dönemin (kural olarak 1 yıl; 30.03.2020 öncesi genel suçlarda 3 yıl) yükümlülüklere uyularak cezaevi dışında geçirilebilmesine imkân veren infaz biçimidir.",
  },
  {
    question: "30 Mart 2020 tarihinin önemi nedir?",
    answer:
      "7242 sayılı kanunla yapılan değişiklikler, suç tarihi 30.03.2020'den önce olan dosyalar için geçici madde 6 ile daha lehe infaz oranları ve genel suçlarda 3 yıllık denetimli serbestlik süresi öngörmüştür. Cinsel suçlar, uyuşturucu ticareti ve terör suçları gibi istisna gruplar bu geçici hükümden yararlanamamaktadır.",
  },
  {
    question: "Tutuklulukta geçen süre hesaba katılır mı?",
    answer:
      "Evet. Gözaltında ve tutuklulukta geçen süreler, TCK m.63 uyarınca hükmedilen cezadan mahsup edilmektedir. Araçta bu süreyi gün olarak girerseniz sonuç tarihlerinden düşülür.",
  },
];

export default function InfazHesaplamaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Araçlar", path: "/araclar/" },
          { name: "İnfaz Hesaplama", path: "/araclar/infaz-hesaplama/" },
        ])}
      />

      <section className="bg-white">
        <div className="container-site pt-8 pb-12 md:pb-16">
          <PageHeading
            crumbs={[
              { label: "Araçlar", href: "/araclar/" },
              { label: "İnfaz Hesaplama" },
            ]}
            title="İnfaz Hesaplama"
          >
            Koşullu salıverilme ve denetimli serbestlik tarihlerinizi yaklaşık
            olarak hesaplayın.
          </PageHeading>
          <Reveal>
            <InfazHesaplayici />
          </Reveal>
        </div>
      </section>

      {/* Açıklayıcı bölüm — bilgilendirme amaçlı, TBB reklam yasağına uygun dil */}
      <section className="border-t border-line bg-paper">
        <div className="container-site py-12 md:py-16">
          <div className="article-body min-w-0 max-w-[70ch]">
            <h2>Koşullu Salıverilme Nedir?</h2>
            <p>
              Koşullu salıverilme; hükümlünün, cezasının kanunda öngörülen
              kısmını infaz kurumunda iyi hâlli olarak geçirmesi hâlinde,
              kalan sürenin denetim altında cezaevi dışında infaz edilmesine
              imkân veren kurumdur (5275 sayılı CGTİK m.107). Uygulanacak
              oran; suçun türüne, işlendiği tarihe ve tekerrür durumuna göre
              değişmektedir.
            </p>

            <h2>Denetimli Serbestlik Nedir?</h2>
            <p>
              Denetimli serbestlik; koşullu salıverilme tarihinden önceki son
              dönemin, belirlenen yükümlülüklere (imza, program, eğitim vb.)
              uyulması koşuluyla cezaevi dışında geçirilebilmesidir. Süre
              kural olarak 1 yıldır; suç tarihi 30.03.2020&rsquo;den önce olan
              genel suçlarda geçici madde 6 uyarınca 3 yıl uygulanmaktadır.
            </p>

            <h2>30 Mart 2020 Ayrımı</h2>
            <p>
              7242 sayılı kanun, infaz oranlarını suçun işlendiği tarihe göre
              farklılaştırmıştır: suç tarihi 30.03.2020 ve sonrası olan genel
              suçlarda koşullu salıverilme oranı 1/2; bu tarihten önceki genel
              suçlarda aynı oran geçici madde 6 ile birlikte 3 yıllık
              denetimli serbestlik imkânıyla uygulanmaktadır. Kasten öldürme
              ve katalog suçlarda 2/3; cinsel suçlar, uyuşturucu imal ve
              ticareti ile terör suçlarında 3/4 oranı geçerlidir ve bu gruplar
              geçici hükümden yararlanamamaktadır.
            </p>

            <h2>Sıkça Sorulan Sorular</h2>
            <Reveal>
              <FaqAccordion items={FAQ} idPrefix="infaz-hesap-sss" />
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
