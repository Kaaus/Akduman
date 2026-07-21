import Link from "next/link";
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

const service = getService("gayrimenkul-hukuku")!;

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
    question: "Tapu iptal davası kime karşı açılır?",
    answer:
      "Tapu iptali ve tescil davası, kural olarak tapu kaydında taşınmazın maliki olarak görünen kişiye karşı açılmaktadır. Kayıt maliki hayatta değilse dava, mirasçılarına yöneltilmektedir. Taşınmazın el değiştirdiği durumlarda davanın kime yöneltileceği, devrin niteliğine ve son malikin durumuna göre dosya özelinde değerlendirilmektedir.",
  },
  {
    question: "Ortaklığın giderilmesi nedir?",
    answer:
      "Ortaklığın giderilmesi (izale-i şüyu), paylı veya elbirliği mülkiyetine konu bir taşınmaz üzerindeki ortaklığın sona erdirilmesini sağlayan bir dava türüdür. Ortaklardan her biri bu davayı açabilmekte; mahkeme, koşullara göre taşınmazın aynen paylaştırılmasına veya satış yoluyla ortaklığın giderilmesine karar verebilmektedir. Satışa karar verilmesi hâlinde taşınmaz satılmakta ve bedel, payları oranında ortaklara dağıtılmaktadır.",
  },
  {
    question: "Kiracı hangi hallerde tahliye edilir?",
    answer:
      "Kiracının tahliyesi, kanunda sınırlı olarak sayılan sebeplere dayanmaktadır. Kiraya verenin veya yakınlarının konut ya da işyeri ihtiyacı, taşınmazın yeniden inşası veya esaslı onarımı, kiracının kira bedelini ödememesi, yazılı tahliye taahhüdü ve kanunda öngörülen diğer hâller bu sebepler arasındadır. Her tahliye sebebinin kendine özgü koşulları ve süreleri bulunduğundan, sürecin bu koşullara uygun yürütülmesi önem taşımaktadır.",
  },
];

export default function GayrimenkulHukukuPage() {
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
        objectPosition="center"
      >
        Gayrimenkul hukuku; taşınmazların mülkiyeti, devri, kullanımı ve
        taşınmazlar üzerindeki hakların korunmasına ilişkin uyuşmazlıkları
        düzenleyen hukuk dalıdır.
      </ServiceHero>

      {/* Gövde: 70ch + sağda TocRail */}
      <section className="bg-white">
        <div className="container-site flex gap-14 py-12 md:py-16">
          <div className="article-body min-w-0 max-w-[70ch]">
            {/* Giriş (kalan cümleler) — lead stili */}
            <p className="lead">
              Akduman Hukuk Bürosu; tapu iptali ve tescil, ortaklığın
              giderilmesi, ecrimisil, kira ve tahliye uyuşmazlıkları ile kat
              karşılığı inşaat sözleşmelerinden doğan ihtilaflarda
              müvekkillerine hukuki destek sağlamaktadır. Taşınmaz
              uyuşmazlıkları çoğu zaman yüksek ekonomik değer taşıdığından ve
              usul kurallarına sıkı biçimde bağlı olduğundan, sürecin en
              başından itibaren deneyimli bir avukatla yürütülmesi hak
              kayıplarının önlenmesi bakımından önem taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2 id="hizmetler">Gayrimenkul Hukuku Kapsamında Verdiğimiz Hizmetler</h2>
            <p>
              Büromuz, taşınmazlara ilişkin uyuşmazlıkların dava öncesi
              değerlendirme aşamasından kanun yolu incelemesine kadar tüm
              süreçlerinde müvekkillerine hukuki destek sağlamaktadır. Bu
              kapsamda takip edilen başlıca konular şunlardır. Uyuşmazlığın
              niteliğine göre dava yoluna başvurmadan önce sulh ile çözüm
              imkânları da müvekkille birlikte değerlendirilmektedir:
            </p>
            <ul>
              <li>
                <strong>Tapu iptali ve tescil davaları:</strong> Tapu kaydının
                gerçek hak durumunu yansıtmadığı hâllerde, kaydın düzeltilerek
                taşınmazın gerçek hak sahibi adına tesciline yönelik davalardır;
                muris muvazaası ve vekâlet görevinin kötüye kullanılması gibi
                iddialar bu davaların sık rastlanan dayanakları arasındadır.
              </li>
              <li>
                <strong>Ortaklığın giderilmesi (izale-i şüyu):</strong> Birden
                fazla kişinin ortak malik olduğu taşınmazlarda, ortaklığın aynen
                paylaştırma veya satış yoluyla sona erdirilmesine ilişkin
                davalardır. Konunun ayrıntıları için{" "}
                <Link href="/ortakligin-giderilmesi-davasi-nedir/">
                  Ortaklığın Giderilmesi (İzale-i Şuyu) Davası Nedir? Nasıl
                  Açılır?
                </Link>{" "}
                başlıklı makalemizi inceleyebilirsiniz.
              </li>
              <li>
                <strong>Ecrimisil (haksız işgal tazminatı):</strong> Bir
                taşınmazın, malikin rızası olmaksızın kullanılması hâlinde bu
                kullanım karşılığında talep edilebilen tazminata ilişkin
                dosyalardır; paydaşlar arasındaki kullanım uyuşmazlıklarında da
                gündeme gelebilmektedir. Talep edilebilecek dönem ve bedel,
                taşınmazın niteliğine ve kullanım biçimine göre
                belirlenmektedir.
              </li>
              <li>
                <strong>Kira uyuşmazlıkları:</strong> Kira bedelinin
                belirlenmesi ve uyarlanması, kira alacağının tahsili ve kira
                sözleşmesinden doğan diğer ihtilaflara ilişkin dosyalardır. Kira
                bedelinin mahkemece belirlenmesine ilişkin süreç hakkında{" "}
                <Link href="/kira-tespit-davasi-nasil-acilir/">
                  Kira Tespit Davası Nasıl Açılır?
                </Link>{" "}
                başlıklı makalemizde bilgi verilmektedir.
              </li>
              <li>
                <strong>Tahliye davaları:</strong> Kanunda sayılan sebeplerin
                varlığı hâlinde kiracının taşınmazdan tahliyesine yönelik
                davalardır; ihtiyaç, yeniden inşa, tahliye taahhüdü ve kira
                bedelinin ödenmemesi uygulamada öne çıkan sebeplerdendir.
              </li>
              <li>
                <strong>Kat karşılığı inşaat sözleşmeleri:</strong> Arsa sahibi
                ile yüklenici arasındaki sözleşmelerin hazırlanması,
                incelenmesi ve gecikme, ayıplı ifa ya da sözleşmeden dönme gibi
                uyuşmazlıkların takibine ilişkin işlerdir. Sözleşmenin
                kurulması aşamasında yapılacak hukuki inceleme, ileride
                doğabilecek uyuşmazlıkların önlenmesine katkı sağlamaktadır.
              </li>
            </ul>

            <h2 id="surec">Gayrimenkul Davaları Süreci Nasıl İşler?</h2>
            <p>
              Taşınmaz uyuşmazlıkları, türüne göre farklılık göstermekle
              birlikte genel olarak aşağıdaki aşamalardan geçmektedir:
            </p>
            <ProcessSteps
              steps={[
                {
                  title: "Hazırlık ve Belge İncelemesi",
                  body: (
                    <p>
                      Süreç; tapu kayıtları, kira sözleşmesi, tahliye taahhüdü,
                      proje ve sözleşme belgeleri gibi dayanakların toplanması
                      ve incelenmesiyle başlamaktadır. Bu aşamada uyuşmazlığın
                      hukuki niteliği belirlenmekte ve izlenecek yol haritası
                      oluşturulmaktadır. Eksik veya hatalı belgeyle yürütülen
                      süreçler zaman ve hak kaybına yol açabildiğinden hazırlık
                      aşaması özel önem taşımaktadır.
                    </p>
                  ),
                },
                {
                  title: "Dava Öncesi İhtar ve Arabuluculuk",
                  body: (
                    <p>
                      Bazı uyuşmazlıklarda dava açılmadan önce karşı tarafa
                      ihtarname gönderilmesi gerekmekte ya da bu yol tercih
                      edilmektedir; tahliye ve kira uyuşmazlıklarında ihtarın
                      içeriği ve süresi sonucu doğrudan etkileyebilmektedir.
                      Kira ilişkisinden kaynaklanan ve ortaklığın giderilmesine
                      ilişkin uyuşmazlıkların önemli bir bölümünde ise dava
                      şartı olarak arabulucuya başvuru öngörülmektedir. Bu
                      aşamanın usulüne uygun tamamlanması, davanın esasına
                      geçilebilmesi bakımından gereklidir.
                    </p>
                  ),
                },
                {
                  title: "Dava Aşaması, Keşif ve Bilirkişi İncelemesi",
                  body: (
                    <p>
                      Dava aşamasında taraflar iddia ve savunmalarını
                      dilekçelerle sunmakta, deliller mahkemece toplanmaktadır.
                      Taşınmaz davalarında mahkeme çoğu zaman taşınmaz başında
                      keşif yapmakta ve değer, kullanım durumu ya da imar
                      durumu gibi teknik konularda bilirkişi incelemesine
                      başvurmaktadır. Bilirkişi raporlarına karşı süresi içinde
                      beyan ve itiraz sunulması, dosyanın seyri bakımından önem
                      taşımaktadır.
                    </p>
                  ),
                },
                {
                  title: "Karar ve Kanun Yolları",
                  body: (
                    <p>
                      Yargılamanın sonunda mahkeme, toplanan delilleri
                      değerlendirerek kararını vermektedir. Verilen karara
                      karşı istinaf yoluna, istinaf incelemesinden geçen
                      kararlara karşı ise kanunda öngörülen hâllerde temyiz
                      yoluna başvurulabilmektedir.
                    </p>
                  ),
                },
              ]}
            />

            {/* Süre/hak-kaybı cümlesi mevcut metinden Callout'a taşındı */}
            <Callout variant="uyari">
              <p>
                Kanun yolu başvuruları süreye tabi olduğundan sürelerin takibi
                bu aşamada da önem taşımaktadır.
              </p>
            </Callout>

            <h2 id="sss">Sıkça Sorulan Sorular</h2>
            <Reveal>
              <FaqAccordion items={FAQ} idPrefix="gayrimenkul-sss" />
            </Reveal>

            {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
            <p className="mt-12 border-t border-line-strong pt-6 text-[14px] italic text-muted">
              {INFO_NOTE}
            </p>
          </div>

          <TocRail items={TOC} />
        </div>
      </section>

      {/* İlgili yazılarımız — "gayrimenkul" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
