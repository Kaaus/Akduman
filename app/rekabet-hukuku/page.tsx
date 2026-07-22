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

const service = getService("rekabet-hukuku")!;

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
    question: "Rekabet Kurumu soruşturması nasıl işler?",
    answer:
      "Rekabet Kurumu, bir ihbar, şikâyet veya kendiliğinden yaptığı tespit üzerine önce bir önaraştırma yürütmektedir. Önaraştırma sonucunda ihlal iddiasını destekleyen yeterli emare bulunursa soruşturma açılmasına karar verilmektedir. Soruşturma aşamasında ilgili teşebbüslerden bilgi ve belge talep edilmekte, yerinde incelemeler yapılabilmekte ve taraflara yazılı ve sözlü savunma hakkı tanınmaktadır. Süreç, Rekabet Kurulu'nun nihai kararıyla sonuçlanmaktadır.",
  },
  {
    question: "Rekabet ihlalinin yaptırımları nelerdir?",
    answer:
      "Rekabet ihlali tespit edilen teşebbüslere, kanunda öngörülen üst sınırlar çerçevesinde idari para cezası uygulanabilmektedir. Bunun yanında ihlale konu davranışın sona erdirilmesine ve ihlalin ortadan kaldırılmasına yönelik tedbirlere de karar verilebilmektedir. Ayrıca ihlalden zarar gören kişi ve teşebbüsler, ayrıca açacakları hukuk davasıyla tazminat talep edebilmektedir.",
  },
  {
    question: "Birleşme-devralma bildirimi ne zaman gerekir?",
    answer:
      "Belirli ciro eşiklerini aşan birleşme ve devralma işlemlerinin, hukuki geçerlilik kazanabilmesi için işlem gerçekleşmeden önce Rekabet Kurumuna bildirilmesi ve izin alınması gerekmektedir. Bildirim eşiklerinin aşılıp aşılmadığı ve işlemin bildirime tabi olup olmadığı, işlemin taraflarının ciroları ve pazar payları dikkate alınarak somut olay özelinde değerlendirilmektedir.",
  },
];

export default function RekabetHukukuPage() {
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
        image={IMAGES.adaletSarayi}
        objectPosition="center"
      >
        Rekabet hukuku; piyasada faaliyet gösteren teşebbüsler arasındaki
        rekabetin korunmasını amaçlayan, rekabeti sınırlayıcı anlaşma ve
        davranışları düzenleyen hukuk dalıdır.
      </ServiceHero>

      {/* Gövde: 70ch + sağda TocRail */}
      <section className="bg-white">
        <div className="container-site flex gap-14 py-12 md:py-16">
          <div className="article-body min-w-0 max-w-[70ch]">
            {/* Giriş (kalan cümleler) — lead stili */}
            <p className="lead">
              Akduman Hukuk Bürosu, rekabet hukuku alanında Rekabet Kurumu
              nezdindeki soruşturma ve savunma süreçlerinden birleşme
              devralma bildirimlerine, rekabet ihlalinden doğan tazminat
              taleplerine kadar müvekkillerine hukuki destek sağlamaktadır.
              Rekabet Kurumu süreçlerinin belirli sürelere ve usul
              kurallarına tabi olması nedeniyle sürecin en başından
              itibaren deneyimli bir avukatla yürütülmesi önem
              taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2 id="hizmetler">Rekabet Hukuku Kapsamında Verdiğimiz Hizmetler</h2>
            <p>
              Büromuz, 4054 sayılı Rekabetin Korunması Hakkında Kanun
              kapsamındaki uyuşmazlıkların tüm evrelerinde müvekkillerine
              hukuki destek sağlamaktadır. Bu kapsamda verilen başlıca
              hizmetler şunlardır:
            </p>
            <ul>
              <li>
                <strong>Rekabeti kısıtlayıcı anlaşmalar:</strong> Rakipler
                veya farklı seviyelerdeki teşebbüsler arasındaki
                anlaşmaların rekabet hukuku bakımından değerlendirilmesi ve
                bu kapsamdaki iddialara karşı savunma yapılmasıdır.
              </li>
              <li>
                <strong>Hâkim durumun kötüye kullanılması:</strong> Pazarda
                hâkim durumda bulunan teşebbüslerin davranışlarının rekabet
                hukuku bakımından değerlendirilmesi ve bu iddialara karşı
                savunma sürecinin yürütülmesidir.
              </li>
              <li>
                <strong>Rekabet Kurumu önsoruşturma ve soruşturma
                süreçleri:</strong> Kurum tarafından yürütülen
                önaraştırma ve soruşturma aşamalarında bilgi ve belge
                taleplerine yanıt verilmesi, yazılı ve sözlü savunmaların
                hazırlanmasıdır.
              </li>
              <li>
                <strong>Birleşme ve devralma bildirimleri:</strong> Bildirim
                yükümlülüğüne tabi işlemlerde Rekabet Kurumuna yapılacak
                bildirimin hazırlanması ve izin sürecinin takibidir.
              </li>
              <li>
                <strong>Muafiyet ve menfi tespit başvuruları:</strong>{" "}
                Belirli anlaşmaların kanun kapsamı dışında kaldığının veya
                muafiyetten yararlandığının tespiti için yapılan
                başvuruların hazırlanmasıdır.
              </li>
              <li>
                <strong>Rekabet ihlalinden doğan tazminat talepleri:</strong>{" "}
                Rekabet ihlali nedeniyle zarara uğrayan teşebbüs ve
                kişilerin tazminat taleplerinin takibidir.
              </li>
            </ul>

            <h2 id="surec">Rekabet Kurumu Soruşturması Nasıl İşler?</h2>
            <ProcessSteps
              steps={[
                {
                  title: "Önaraştırma",
                  body: (
                    <p>
                      Süreç; şikâyet, ihbar veya Rekabet Kurumunun
                      kendiliğinden yaptığı tespit üzerine başlayan bir
                      önaraştırma ile başlamaktadır. Bu aşamada ilgili
                      teşebbüslerden ön bilgi talep edilebilmektedir.
                    </p>
                  ),
                },
                {
                  title: "Soruşturma Açılması",
                  body: (
                    <p>
                      Önaraştırma sonucunda ihlal iddiasını destekleyen
                      yeterli emare bulunursa Rekabet Kurulu soruşturma
                      açılmasına karar vermektedir. Soruşturma açılan
                      teşebbüslere bildirim yapılmaktadır.
                    </p>
                  ),
                },
                {
                  title: "Bilgi Talebi ve Savunmalar",
                  body: (
                    <p>
                      Soruşturma aşamasında ilgili teşebbüslerden bilgi ve
                      belge talep edilmekte, yerinde incelemeler
                      yapılabilmekte ve taraflara yazılı savunma hakkı
                      tanınmaktadır. Kurul, gerekli görürse sözlü savunma
                      toplantısı da düzenlemektedir.
                    </p>
                  ),
                },
                {
                  title: "Rekabet Kurulu Kararı",
                  body: (
                    <p>
                      Soruşturma, Rekabet Kurulunun nihai kararıyla
                      sonuçlanmaktadır. Kurul; ihlal bulunmadığına, idari
                      para cezası uygulanmasına veya taahhüt kabulüne
                      karar verebilmektedir. Karara karşı yargı yoluna
                      başvurulabilmektedir.
                    </p>
                  ),
                },
              ]}
            />

            <Callout variant="uyari">
              <p>
                Rekabet Kurumu kararlarına karşı yargı yolu süreye tabi
                olduğundan tebliğ tarihinden itibaren sürelerin takibi
                önem taşımaktadır.
              </p>
            </Callout>

            <h2 id="sss">Sıkça Sorulan Sorular</h2>
            <Reveal>
              <FaqAccordion items={FAQ} idPrefix="rekabet-sss" />
            </Reveal>

            {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
            <p className="mt-12 border-t border-line-strong pt-6 text-[14px] italic text-muted">
              {INFO_NOTE}
            </p>
          </div>

          <TocRail items={TOC} />
        </div>
      </section>

      {/* İlgili yazılarımız — "rekabet" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
