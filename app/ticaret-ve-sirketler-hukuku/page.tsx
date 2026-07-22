import Callout from "@/components/Callout";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import ProcessSteps from "@/components/ProcessSteps";
import RelatedArticles from "@/components/RelatedArticles";
import Reveal from "@/components/Reveal";
import ServiceHero from "@/components/ServiceHero";
import TocRail from "@/components/TocRail";
import { breadcrumbSchema, buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";
import { getService, IMAGES, INFO_NOTE, type FaqItem } from "@/lib/site";

/*
 * ═══════════════════════════════════════════════════════════════════
 *  AVUKAT ONAYI BEKLENIYOR
 *  Bu sayfadaki yeni yazılan içerik, yayına alınmadan önce
 *  Av. Samed Akduman tarafından gözden geçirilmelidir.
 * ═══════════════════════════════════════════════════════════════════
 */

const service = getService("ticaret-ve-sirketler-hukuku")!;

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/${service.slug}/`,
});

const TOC = [
  { id: "hizmetler", label: "Verdiğimiz Hizmetler" },
  { id: "surec", label: "Süreç Nasıl İşler?" },
  { id: "sss", label: "Sıkça Sorulan Sorular" },
];

const FAQ: FaqItem[] = [
  {
    question: "Şirket kuruluşunda avukat desteği neden önemlidir?",
    answer:
      "Şirket kuruluşunda seçilen türün, sermaye yapısının ve ana sözleşme hükümlerinin şirketin ilerleyen dönemdeki işleyişine doğrudan etkisi bulunmaktadır. Ortaklar arasındaki hak ve yükümlülüklerin, karar alma usullerinin ve pay devrine ilişkin sınırlamaların kuruluş aşamasında doğru kurgulanması, ileride doğabilecek uyuşmazlıkların önüne geçilmesi bakımından önem taşımaktadır. Bu nedenle kuruluş sürecinin bir avukatla birlikte yürütülmesi önerilmektedir.",
  },
  {
    question: "Ortaklar arasında uyuşmazlık çıkarsa hangi yollar izlenir?",
    answer:
      "Ortaklar arası uyuşmazlıklarda öncelikle şirket ana sözleşmesindeki hükümler ve genel kurul kararları değerlendirilmektedir. Uyuşmazlığın niteliğine göre haklı sebeple fesih, ortaklıktan çıkma veya çıkarılma talebi, genel kurul kararlarının iptali gibi hukuki yollara başvurulabilmektedir. Hangi yolun somut olaya uygun olduğu, ortaklık yapısı ve uyuşmazlığın kaynağı özelinde değerlendirilmesi gereken bir husustur.",
  },
  {
    question: "Ticari davalarda arabuluculuk zorunlu mu?",
    answer:
      "Konusu belirli bir miktar veya değeri içeren ticari alacak ve tazminat talepli davalarda arabuluculuğa başvurulmuş olması dava şartı olarak aranmaktadır. Bu davalarda arabuluculuğa başvurmadan doğrudan dava açılması hâlinde, dava şartı yokluğu nedeniyle usulden ret kararı verilebilmektedir. Arabuluculuk sürecinde tarafların anlaşamaması durumunda dava açma hakkı saklı kalmaktadır.",
  },
];

export default function TicaretVeSirketlerHukukuPage() {
  return (
    <>
      <JsonLd data={serviceSchema(service.slug)} />
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Faaliyet Alanlarımız", path: "/faaliyet-alanlarimiz/" },
          { name: service.title, path: `/${service.slug}/` },
        ])}
      />

      <ServiceHero
        service={service}
        image={IMAGES.heroKitaplar}
        objectPosition="center 30%"
      >
        Ticaret ve şirketler hukuku; tacirler ile şirketlerin kuruluşunu,
        işleyişini ve aralarındaki ticari ilişkileri düzenleyen hukuk
        dalıdır.
      </ServiceHero>

      {/* Gövde: 70ch + sağda TocRail */}
      <section className="bg-white">
        <div className="container-site flex gap-14 py-12 md:py-16">
          <div className="article-body min-w-0 max-w-[70ch]">
            {/* Giriş (kalan cümleler) — lead stili */}
            <p className="lead">
              Akduman Hukuk Bürosu, ticaret ve şirketler hukuku alanında
              bireysel tacirlere, şirketlere ve ortaklarına kuruluştan
              günlük işleyişe, ortaklar arası uyuşmazlıklardan ticari
              alacağın takibine kadar geniş bir yelpazede hukuki destek
              sağlamaktadır. Ticari ilişkilerin çoğunlukla yazılı
              sözleşmelere ve süreye tabi başvuru yollarına dayanması
              nedeniyle sürecin bir avukatla yürütülmesi hak kayıplarının
              önlenmesi bakımından önem taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2 id="hizmetler">
              Ticaret ve Şirketler Hukuku Kapsamında Verdiğimiz Hizmetler
            </h2>
            <p>
              Büromuz, şirketler hukukunun kuruluş aşamasından ticari
              uyuşmazlıkların çözümüne kadar tüm süreçlerinde
              müvekkillerine hukuki destek sağlamaktadır. Bu kapsamda
              verilen başlıca hizmetler şunlardır:
            </p>
            <ul>
              <li>
                <strong>Şirket kuruluşu ve ana sözleşme:</strong> Şirket
                türünün belirlenmesi, sermaye yapısının kurgulanması ve ana
                sözleşmenin ortakların ihtiyaçlarına uygun şekilde
                hazırlanmasıdır.
              </li>
              <li>
                <strong>Genel kurul işlemleri:</strong> Olağan ve olağanüstü
                genel kurul toplantılarının gündeminin hazırlanması,
                toplantının usulüne uygun yapılması ve alınan kararların
                tescili sürecidir.
              </li>
              <li>
                <strong>Ortaklar arası uyuşmazlıklar:</strong> Ortaklar
                arasındaki anlaşmazlıklarda haklı sebeple fesih,
                ortaklıktan çıkma veya çıkarılma talepleri ile genel kurul
                kararlarının iptaline ilişkin süreçlerin yürütülmesidir.
              </li>
              <li>
                <strong>Ticari sözleşmelerin hazırlanması:</strong> Tedarik,
                distribütörlük, hizmet ve ortaklık sözleşmeleri başta olmak
                üzere ticari ilişkiyi düzenleyen sözleşmelerin taraf
                menfaatlerini gözeten şekilde hazırlanması ve
                müzakeresidir.
              </li>
              <li>
                <strong>Ticari alacak takibi:</strong> Fatura, çek, senet
                ve sözleşmeden doğan ticari alacakların icra takibi ve dava
                yoluyla tahsili sürecidir.
              </li>
              <li>
                <strong>Ticari davalarda arabuluculuk:</strong> Dava şartı
                olarak aranan arabuluculuk sürecinde müvekkillerin
                temsili ve müzakerelerin yürütülmesidir.
              </li>
            </ul>

            <h2 id="surec">Ticari Uyuşmazlıklarda Süreç Nasıl İşler?</h2>
            <p>
              Konusu belirli bir miktarı içeren ticari alacak ve tazminat
              talepli uyuşmazlıklarda dava açılmadan önce arabuluculuk
              sürecinin işletilmesi gerekmektedir. Sürecin başlıca aşamaları
              şu şekilde özetlenebilir:
            </p>
            <ProcessSteps
              steps={[
                {
                  title: "Arabuluculuk Başvurusu",
                  body: (
                    <p>
                      Süreç, yetkili arabuluculuk bürosuna yapılan başvuru
                      ile başlamaktadır. Başvuru üzerine bir arabulucu
                      görevlendirilmekte ve taraflar görüşmeye
                      çağrılmaktadır.
                    </p>
                  ),
                },
                {
                  title: "Görüşmeler",
                  body: (
                    <p>
                      Arabulucu eşliğinde taraflar bir araya gelerek
                      uyuşmazlığın çözümüne yönelik görüşmeler
                      yürütmektedir. Bu aşamada tarafların menfaatlerini
                      koruyacak şekilde müzakere edilmesi önem
                      taşımaktadır.
                    </p>
                  ),
                },
                {
                  title: "Anlaşma veya Anlaşmama Tutanağı",
                  body: (
                    <p>
                      Görüşmeler sonunda taraflar anlaşırsa bu durum bir
                      tutanakla belgelenmekte ve tutanak icra edilebilir
                      nitelik taşımaktadır. Anlaşma sağlanamazsa
                      anlaşmama tutanağı düzenlenmektedir.
                    </p>
                  ),
                },
                {
                  title: "Dava Açılması",
                  body: (
                    <p>
                      Anlaşmama tutanağının alınmasının ardından
                      uyuşmazlık, görevli ve yetkili mahkemede dava yoluyla
                      çözülebilmektedir. Dava şartı arabuluculuğun
                      işletilmemesi hâlinde dava usulden reddedilmektedir.
                    </p>
                  ),
                },
              ]}
            />

            <Callout variant="uyari">
              <p>
                Arabuluculuğa başvurmadan doğrudan açılan davalarda dava
                şartı yokluğu nedeniyle usulden ret kararı
                verilebilmektedir.
              </p>
            </Callout>

            <h2 id="sss">Sıkça Sorulan Sorular</h2>
            <Reveal>
              <FaqAccordion items={FAQ} idPrefix="ticaret-sss" />
            </Reveal>

            {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
            <p className="mt-12 border-t border-line-strong pt-6 text-[14px] italic text-muted">
              {INFO_NOTE}
            </p>
          </div>

          <TocRail items={TOC} />
        </div>
      </section>

      {/* İlgili yazılarımız — "ticaret" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
