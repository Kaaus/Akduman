import { ArrowRight, Phone } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Callout from "@/components/Callout";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import ProcessSteps from "@/components/ProcessSteps";
import RelatedArticles from "@/components/RelatedArticles";
import Reveal from "@/components/Reveal";
import TocRail from "@/components/TocRail";
import { breadcrumbSchema, buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";
import { getService, INFO_NOTE, SITE, type FaqItem } from "@/lib/site";

/*
 * ═══════════════════════════════════════════════════════════════════
 *  AVUKAT ONAYI BEKLENIYOR
 *  Bu sayfadaki yeni yazılan içerik, yayına alınmadan önce
 *  Av. Samed Akduman tarafından gözden geçirilmelidir.
 * ═══════════════════════════════════════════════════════════════════
 */

const service = getService("yabancilar-hukuku")!;

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
    question: "İkamet izni başvurusu reddedilirse ne yapılabilir?",
    answer:
      "Ret kararına karşı öncelikle kararın gerekçesi incelenmekte ve eksikliğin niteliğine göre yol haritası belirlenmektedir. Duruma göre eksik belgeler tamamlanarak yeni bir başvuru yapılabilmekte ya da ret kararına karşı idari yargı yoluna başvurulabilmektedir. Dava açma süreleri sınırlı olduğundan, ret kararının tebliğinden sonra vakit kaybetmeden hukuki değerlendirme yapılması önem taşımaktadır.",
  },
  {
    question: "Türk vatandaşlığına başvuru yolları nelerdir?",
    answer:
      "Türk vatandaşlığı; genel yoldan kazanma, evlilik yoluyla kazanma ve mevzuatta öngörülen yatırım koşullarının sağlanması hâlinde istisnai yoldan kazanma gibi farklı yollarla edinilebilmektedir. Her yolun kendine özgü koşulları ve belge gereklilikleri bulunmaktadır. Hangi yolun kişinin durumuna uygun olduğu, ikamet süresi, medeni durum ve ekonomik koşullar gibi unsurlar birlikte değerlendirilerek belirlenmektedir.",
  },
  {
    question: "Sınır dışı (deport) kararı kaldırılabilir mi?",
    answer:
      "Sınır dışı kararına karşı idare mahkemesinde iptal davası açılması mümkündür. Bu davanın kanunda öngörülen kısa süre içinde açılması gerektiğinden, kararın tebliğinden hemen sonra harekete geçilmesi büyük önem taşımaktadır. Kural olarak dava süresi içinde ve yargılama sonuçlanıncaya kadar kişi sınır dışı edilmemekte; mahkeme, kararın hukuka aykırı olduğu sonucuna varırsa kararın iptaline hükmedebilmektedir.",
  },
];

export default function YabancilarHukukuPage() {
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

      {/* Dar koyu şerit-hero */}
      <section className="bg-navy-950">
        <div className="container-site py-10 md:py-14">
          <Breadcrumb
            variant="dark"
            items={[
              { label: "Faaliyet Alanlarımız", href: "/faaliyet-alanlarimiz/" },
              { label: service.title },
            ]}
          />
          <h1 className="mt-6 !text-[#F4F1EA]">{service.h1}</h1>
          {/* Lead: mevcut giriş metninin ilk cümlesi */}
          <p className="mt-5 max-w-3xl text-[20px] leading-relaxed text-[#F4F1EA]/85">
            Yabancılar hukuku; yabancı uyruklu kişilerin Türkiye&apos;ye
            girişini, ülkede kalışını, çalışmasını ve Türk vatandaşlığına
            geçiş süreçlerini düzenleyen kuralları kapsamaktadır.
          </p>
          <a href={SITE.telHref} className="btn-tertiary-dark mt-6">
            <Phone size={15} strokeWidth={1.5} aria-hidden="true" />
            Hemen Ara
            <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" className="btn-arrow" />
          </a>
        </div>
      </section>

      {/* Gövde: 70ch + sağda TocRail */}
      <section className="bg-white">
        <div className="container-site flex gap-14 py-12 md:py-16">
          <div className="article-body min-w-0 max-w-[70ch]">
            {/* Giriş (kalan cümleler) — lead stili */}
            <p className="lead">
              Bu alandaki iş ve işlemler ağırlıklı olarak idari başvurulara
              dayandığından; belge eksikliği, yanlış izin türü seçimi veya
              sürelerin kaçırılması gibi nedenler sürecin uzamasına ya da hak
              kaybına yol açabilmektedir. Akduman Hukuk Bürosu; ikamet izni,
              çalışma izni, vatandaşlık başvuruları, sınır dışı kararına
              itiraz ile tanıma ve tenfiz süreçlerinde yabancı uyruklu
              müvekkillerine ve yabancı personel istihdam eden işverenlere
              hukuki destek sağlamaktadır. Başvuruların doğru hazırlanması ve
              olumsuz kararlara karşı süresinde hukuki yollara başvurulması,
              sürecin sağlıklı yürütülmesi bakımından önem taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2 id="hizmetler">Yabancılar Hukuku Kapsamında Verdiğimiz Hizmetler</h2>
            <p>
              Büromuz, yabancı uyruklu kişilerin Türkiye&apos;deki hukuki
              durumlarına ilişkin başvuru, itiraz ve dava süreçlerinin
              tamamında hukuki destek sağlamaktadır. Hizmetlerimiz; bireysel
              müvekkillerin yanı sıra yabancı personel istihdam eden veya
              etmeyi planlayan şirketlere yönelik danışmanlığı da
              kapsamaktadır. Bu kapsamda verilen başlıca hizmetler şunlardır:
            </p>
            <ul>
              <li>
                <strong>İkamet izni başvuruları:</strong> Türkiye&apos;de yasal
                kalış hakkı sağlayan ikamet izinleri; kalış amacına göre kısa
                dönem, aile ve öğrenci ikamet izni gibi türlere ayrılmaktadır.
                Başvurunun kişinin durumuna uygun izin türü üzerinden ve
                eksiksiz belgelerle yapılması, sürecin seyri bakımından
                belirleyici olmaktadır.
              </li>
              <li>
                <strong>Çalışma izni başvuruları:</strong> Yabancıların
                Türkiye&apos;de çalışabilmesi kural olarak çalışma iznine
                bağlıdır. Hem çalışan hem de işveren tarafında yürütülen
                başvuru sürecinde koşulların doğru değerlendirilmesi ve
                belgelerin usulüne uygun hazırlanması önem taşımaktadır.
              </li>
              <li>
                <strong>Türk vatandaşlığı başvuruları:</strong> Genel yoldan,
                evlilik yoluyla veya mevzuatta öngörülen istisnai yollarla
                vatandaşlık kazanılması mümkündür. Her başvuru yolunun
                kendine özgü koşulları bulunduğundan, sürece başlamadan önce
                kişinin durumuna uygun yolun belirlenmesi gerekmektedir.
              </li>
              <li>
                <strong>Sınır dışı (deport) kararına itiraz:</strong> Hakkında
                sınır dışı kararı verilen yabancılar, bu karara karşı idari
                yargı yoluna başvurabilmektedir. Dava açma süresi kısa
                olduğundan kararın tebliğinden hemen sonra hukuki
                değerlendirme yapılması gerekmektedir.
              </li>
              <li>
                <strong>Tanıma ve tenfiz davaları:</strong> Yabancı ülke
                mahkemelerince verilen kararların Türkiye&apos;de hüküm
                doğurabilmesi için tanıma veya tenfiz kararı alınması
                gerekmektedir. Özellikle yurt dışında alınan boşanma
                kararlarının nüfus kayıtlarına işlenmesi bu yolla mümkün
                olmaktadır.
              </li>
            </ul>

            <h2 id="surec">Başvuru ve İtiraz Süreçleri Nasıl İşler?</h2>
            <p>
              Yabancılar hukukuna ilişkin talepler çoğunlukla idari makamlar
              nezdinde yürütülen başvurularla başlamakta; olumsuz karar
              verilmesi hâlinde ise itiraz ve dava yolları gündeme
              gelmektedir. Sürecin genel işleyişi aşağıdaki adımlar üzerinden
              özetlenebilir; her dosyanın kendine özgü koşulları
              bulunduğundan izlenecek yol somut duruma göre belirlenmektedir.
            </p>
            <ProcessSteps
              steps={[
                {
                  title: "Durum Değerlendirmesi ve Belge Hazırlığı",
                  body: (
                    <p>
                      Süreç, kişinin hukuki durumunun ve talebinin ayrıntılı
                      biçimde değerlendirilmesiyle başlamaktadır. Bu aşamada
                      hangi izin türünün veya başvuru yolunun uygun olduğu
                      belirlenmekte; pasaport, gelir belgesi, sağlık sigortası
                      gibi gerekli belgeler tespit edilerek eksiksiz şekilde
                      hazırlanmaktadır. Belgelerdeki eksiklik veya
                      tutarsızlıklar ret kararlarının başlıca nedenleri
                      arasında yer aldığından bu aşama özenle yürütülmektedir.
                    </p>
                  ),
                },
                {
                  title: "İdari Başvurunun Yapılması",
                  body: (
                    <p>
                      Hazırlanan başvuru; talebin niteliğine göre İl Göç
                      İdaresi Müdürlüğü, ilgili bakanlık veya yurt dışındaki
                      temsilcilikler nezdinde yapılmaktadır. Başvurunun
                      usulüne uygun şekilde iletilmesi ve idare tarafından
                      talep edilen ek bilgi ile belgelerin süresinde
                      sunulması, değerlendirmenin sağlıklı ilerlemesi
                      bakımından önem taşımaktadır.
                    </p>
                  ),
                },
                {
                  title: "Ret Hâlinde İtiraz ve İdari Yargı Yolu",
                  body: (
                    <p>
                      Başvurunun reddedilmesi hâlinde kararın gerekçesi
                      incelenmekte ve duruma göre yeniden başvuru, idari
                      itiraz veya iptal davası seçeneklerinden uygun olanı
                      belirlenmektedir. İdari yargı sürecinde dilekçelerin
                      hazırlanması ve duruşmaların takibi büromuzca
                      yürütülmektedir.
                    </p>
                  ),
                },
                {
                  title: "Sürecin Takibi ve Sonuçlandırılması",
                  body: (
                    <p>
                      Başvuru ve dava süreçleri boyunca dosyanın durumu
                      düzenli olarak takip edilmekte ve müvekkile gelişmeler
                      hakkında bilgi verilmektedir. Olumlu sonuçlanan
                      başvurularda izin belgesinin teslim alınması, sürelerin
                      takibi ve uzatma başvurularının zamanında yapılması
                      gibi işlemler de sürecin bir parçası olarak
                      yürütülmektedir.
                    </p>
                  ),
                },
              ]}
            />

            {/* Süre/hak-kaybı cümlesi mevcut metinden Callout'a taşındı */}
            <Callout variant="uyari">
              <p>
                Sınır dışı kararlarında dava açma süresi kanunda öngörülen
                kısa süreyle sınırlı olduğundan, bu tür kararlarda vakit
                kaybetmeden hareket edilmesi gerekmektedir.
              </p>
            </Callout>

            <h2 id="sss">Sıkça Sorulan Sorular</h2>
            <Reveal>
              <FaqAccordion items={FAQ} idPrefix="yabancilar-sss" />
            </Reveal>

            {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
            <p className="mt-12 border-t border-line-strong pt-6 text-[14px] italic text-muted">
              {INFO_NOTE}
            </p>
          </div>

          <TocRail items={TOC} />
        </div>
      </section>

      {/* İlgili yazılarımız — "yabancilar" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
