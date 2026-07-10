import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import RelatedArticles from "@/components/RelatedArticles";
import { breadcrumbSchema, buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";
import { getService, INFO_NOTE, type FaqItem } from "@/lib/site";

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

      <section className="bg-white">
        <div className="container-site max-w-4xl py-12 md:py-16">
          <Breadcrumb
            items={[
              { label: "Faaliyet Alanlarımız", href: "/faaliyet-alanlarimiz/" },
              { label: service.title },
            ]}
          />
          <p className="kicker mt-8">Faaliyet Alanlarımız</p>
          <h1 className="mt-3 text-navy-800">{service.h1}</h1>

          <div className="article-body mt-8">
            {/* Giriş */}
            <p>
              Yabancılar hukuku; yabancı uyruklu kişilerin Türkiye&apos;ye
              girişini, ülkede kalışını, çalışmasını ve Türk vatandaşlığına
              geçiş süreçlerini düzenleyen kuralları kapsamaktadır. Bu alandaki
              iş ve işlemler ağırlıklı olarak idari başvurulara dayandığından;
              belge eksikliği, yanlış izin türü seçimi veya sürelerin
              kaçırılması gibi nedenler sürecin uzamasına ya da hak kaybına yol
              açabilmektedir. Akduman Hukuk Bürosu; ikamet izni, çalışma izni,
              vatandaşlık başvuruları, sınır dışı kararına itiraz ile tanıma ve
              tenfiz süreçlerinde yabancı uyruklu müvekkillerine ve yabancı
              personel istihdam eden işverenlere hukuki destek sağlamaktadır.
              Başvuruların doğru hazırlanması ve olumsuz kararlara karşı
              süresinde hukuki yollara başvurulması, sürecin sağlıklı
              yürütülmesi bakımından önem taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2>Yabancılar Hukuku Kapsamında Verdiğimiz Hizmetler</h2>
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

            <h2>Başvuru ve İtiraz Süreçleri Nasıl İşler?</h2>
            <p>
              Yabancılar hukukuna ilişkin talepler çoğunlukla idari makamlar
              nezdinde yürütülen başvurularla başlamakta; olumsuz karar
              verilmesi hâlinde ise itiraz ve dava yolları gündeme
              gelmektedir. Sürecin genel işleyişi aşağıdaki adımlar üzerinden
              özetlenebilir; her dosyanın kendine özgü koşulları
              bulunduğundan izlenecek yol somut duruma göre belirlenmektedir.
            </p>

            <h3>1. Durum Değerlendirmesi ve Belge Hazırlığı</h3>
            <p>
              Süreç, kişinin hukuki durumunun ve talebinin ayrıntılı biçimde
              değerlendirilmesiyle başlamaktadır. Bu aşamada hangi izin
              türünün veya başvuru yolunun uygun olduğu belirlenmekte;
              pasaport, gelir belgesi, sağlık sigortası gibi gerekli belgeler
              tespit edilerek eksiksiz şekilde hazırlanmaktadır. Belgelerdeki
              eksiklik veya tutarsızlıklar ret kararlarının başlıca nedenleri
              arasında yer aldığından bu aşama özenle yürütülmektedir.
            </p>

            <h3>2. İdari Başvurunun Yapılması</h3>
            <p>
              Hazırlanan başvuru; talebin niteliğine göre İl Göç İdaresi
              Müdürlüğü, ilgili bakanlık veya yurt dışındaki temsilcilikler
              nezdinde yapılmaktadır. Başvurunun usulüne uygun şekilde
              iletilmesi ve idare tarafından talep edilen ek bilgi ile
              belgelerin süresinde sunulması, değerlendirmenin sağlıklı
              ilerlemesi bakımından önem taşımaktadır.
            </p>

            <h3>3. Ret Hâlinde İtiraz ve İdari Yargı Yolu</h3>
            <p>
              Başvurunun reddedilmesi hâlinde kararın gerekçesi incelenmekte
              ve duruma göre yeniden başvuru, idari itiraz veya iptal davası
              seçeneklerinden uygun olanı belirlenmektedir. Sınır dışı
              kararlarında dava açma süresi kanunda öngörülen kısa süreyle
              sınırlı olduğundan, bu tür kararlarda vakit kaybetmeden hareket
              edilmesi gerekmektedir. İdari yargı sürecinde dilekçelerin
              hazırlanması ve duruşmaların takibi büromuzca yürütülmektedir.
            </p>

            <h3>4. Sürecin Takibi ve Sonuçlandırılması</h3>
            <p>
              Başvuru ve dava süreçleri boyunca dosyanın durumu düzenli olarak
              takip edilmekte ve müvekkile gelişmeler hakkında bilgi
              verilmektedir. Olumlu sonuçlanan başvurularda izin belgesinin
              teslim alınması, sürelerin takibi ve uzatma başvurularının
              zamanında yapılması gibi işlemler de sürecin bir parçası olarak
              yürütülmektedir.
            </p>
          </div>

          {/* Sıkça Sorulan Sorular */}
          <h2 className="mt-14 text-navy-800">Sıkça Sorulan Sorular</h2>
          <div className="mt-6">
            <FaqAccordion items={FAQ} idPrefix="yabancilar-sss" />
          </div>

          {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
          <p className="mt-12 border-t border-line pt-6 text-[14px] italic text-muted">
            {INFO_NOTE}
          </p>
        </div>
      </section>

      {/* İlgili yazılarımız — "yabancilar" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
