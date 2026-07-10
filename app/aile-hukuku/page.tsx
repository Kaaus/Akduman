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

const service = getService("aile-hukuku")!;

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/${service.slug}/`,
});

const FAQ: FaqItem[] = [
  {
    question: "Anlaşmalı boşanmanın şartları nelerdir?",
    answer:
      "Anlaşmalı boşanma için evliliğin en az bir yıl sürmüş olması ve eşlerin mahkemeye birlikte başvurması ya da bir eşin açtığı davayı diğerinin kabul etmesi gerekmektedir. Tarafların boşanmanın malî sonuçları ve varsa çocukların durumu konusunda anlaşmaya varması gerekmekte; bu anlaşma genellikle bir protokolle mahkemeye sunulmaktadır. Hâkimin tarafları duruşmada bizzat dinleyerek iradelerini serbestçe açıkladıklarına kanaat getirmesi ve protokolü uygun bulması hâlinde boşanmaya karar verilebilmektedir.",
  },
  {
    question: "Velayet neye göre belirlenir?",
    answer:
      "Velayetin belirlenmesinde temel ölçüt çocuğun üstün yararıdır. Mahkeme; çocuğun yaşını, anne ve babayla olan ilişkisini, tarafların yaşam koşullarını ve çocuğun bakım ile eğitim ihtiyaçlarını birlikte değerlendirmektedir. İdrak çağındaki çocukların görüşü alınabilmekte, gerekli görülürse pedagog ve sosyal çalışmacı incelemesine dayanan sosyal inceleme raporu düzenlenmektedir. Velayet düzenlemesi kesin nitelikte olmayıp koşulların değişmesi hâlinde değiştirilmesi talep edilebilmektedir.",
  },
  {
    question: "Nafaka türleri nelerdir?",
    answer:
      "Uygulamada başlıca üç nafaka türüyle karşılaşılmaktadır. Tedbir nafakası, dava süresince eşin veya çocukların geçimini sağlamak amacıyla geçici olarak hükmedilen nafakadır. Yoksulluk nafakası, boşanma yüzünden yoksulluğa düşecek olan ve kusuru daha ağır olmayan taraf lehine koşulları varsa gündeme gelebilmektedir. İştirak nafakası ise velayet kendisine bırakılmayan tarafın, çocuğun bakım ve eğitim giderlerine gücü oranında katılmasını sağlamaktadır.",
  },
];

export default function AileHukukuPage() {
  return (
    <>
      <JsonLd data={serviceSchema(service.slug)!} />
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
              Aile hukuku; evlilik, boşanma, velayet, nafaka ve eşler
              arasındaki mal rejimi gibi aile ilişkilerinden doğan hak ve
              yükümlülükleri düzenleyen hukuk dalıdır. Akduman Hukuk Bürosu,
              aile hukukundan kaynaklanan uyuşmazlıklarda dava takibi ve
              hukuki danışmanlık hizmeti sunmaktadır. Bu alandaki
              uyuşmazlıklar; tarafların özel hayatını, çocukların geleceğini
              ve ekonomik dengeleri doğrudan etkileyen sonuçlar
              doğurabilmektedir. Bu nedenle sürecin en başından itibaren
              deneyimli bir avukatla ve özenle yürütülmesi, hak kayıplarının
              önlenmesi bakımından önem taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2>Aile Hukuku Kapsamında Verdiğimiz Hizmetler</h2>
            <p>
              Büromuz; boşanma davalarından velayet ve nafaka
              uyuşmazlıklarına, mal rejiminin tasfiyesinden aile içi şiddete
              karşı koruma tedbirlerine kadar aile hukukunun kapsamına giren
              konularda müvekkillerine hukuki destek sağlamaktadır. Dava
              takibinin yanı sıra protokol hazırlanması, sürece ilişkin
              danışmanlık ve kararların uygulanması aşamalarında da destek
              verilmektedir. Bu kapsamda verilen başlıca hizmetler şunlardır:
            </p>
            <ul>
              <li>
                <strong>Anlaşmalı boşanma:</strong> Tarafların boşanma,
                boşanmanın malî sonuçları ve varsa çocukların durumu üzerinde
                anlaşmaya vardığı davalardır. Anlaşma koşullarını içeren
                protokolün özenle hazırlanması, ileride yaşanabilecek
                uyuşmazlıkların önlenmesi bakımından önem taşımaktadır.
              </li>
              <li>
                <strong>Çekişmeli boşanma:</strong> Tarafların boşanma veya
                boşanmanın sonuçları üzerinde anlaşamadığı davalardır. Kusur
                durumu ile velayet, nafaka ve tazminat talepleri, yargılama
                sırasında delillerle ortaya konulmaktadır.
              </li>
              <li>
                <strong>Velayet davaları:</strong> Ortak çocuğun velayetinin
                belirlenmesine veya değiştirilmesine ilişkin davalardır;
                değerlendirmenin merkezinde çocuğun üstün yararı yer
                almaktadır. Velayet kendisine bırakılmayan taraf ile çocuk
                arasında kişisel ilişki kurulmasına dair düzenlemeler de bu
                davalarla birlikte ele alınmaktadır.
              </li>
              <li>
                <strong>Nafaka davaları:</strong> Dava sürecinde tedbir
                nafakası, boşanma sonrasında koşulları varsa yoksulluk
                nafakası, çocuğun giderleri bakımından ise iştirak nafakası
                gündeme gelebilmektedir. Nafakanın belirlenmesi, artırılması,
                azaltılması ve kaldırılması talepleri de bu kapsamdadır.
              </li>
              <li>
                <strong>Mal rejiminin tasfiyesi:</strong> Evlilik birliği
                içinde edinilen malvarlığının, eşlerin tabi olduğu mal
                rejimine göre paylaşılmasına ilişkin davalardır. Katılma
                alacağı ve katkı payı alacağı talepleri bu kapsamda
                değerlendirilmekte; tasfiye, boşanma davasından ayrı bir
                davanın konusunu oluşturmaktadır.
              </li>
              <li>
                <strong>Aile içi şiddette koruma tedbirleri:</strong> 6284
                sayılı Kanun kapsamında; şiddete maruz kalan veya şiddet
                tehlikesi altında bulunan kişiler lehine koruyucu ve önleyici
                tedbir kararları talep edilebilmektedir. Bu başvurular ivedi
                nitelikte olduğundan sürecin gecikmeksizin başlatılması önem
                taşımaktadır.
              </li>
            </ul>

            <h2>Boşanma Süreci Nasıl İşler?</h2>
            <p>
              Boşanma davaları, anlaşmalı veya çekişmeli olarak
              yürütülebilmektedir. Anlaşmalı boşanmada taraflar sonuçlar
              üzerinde uzlaştığından süreç genellikle kısa sürede
              tamamlanabilmekte; çekişmeli boşanmada ise aşağıdaki aşamalar
              izlenmektedir. Çekişmeli davalarda yargılamanın süresi;
              delillerin kapsamına, tanık sayısına ve mahkemenin iş yüküne
              göre değişebilmektedir.
            </p>

            <h3>1. Dava Öncesi Değerlendirme ve Dava Dilekçesi</h3>
            <p>
              Süreç, somut olayın hukuki açıdan değerlendirilmesiyle
              başlamaktadır. Bu aşamada boşanma sebebi, deliller ile velayet,
              nafaka ve tazminat talepleri belirlenmekte; talepleri ve
              dayanaklarını içeren dava dilekçesi hazırlanarak aile
              mahkemesine sunulmaktadır. Anlaşmalı boşanmada ise taraflarca
              imzalanan protokol, dava dilekçesiyle birlikte mahkemeye
              sunulmaktadır.
            </p>

            <h3>2. Dilekçeler Aşaması</h3>
            <p>
              Dava dilekçesinin davalı tarafa tebliğiyle dilekçeler aşaması
              başlamaktadır. Bu aşamada cevap, cevaba cevap ve ikinci cevap
              dilekçeleri sunulmakta; tarafların iddia ve savunmaları büyük
              ölçüde bu aşamada şekillenmektedir. Dilekçelerin süresi içinde
              ve eksiksiz sunulması, ilerleyen aşamalarda hak kaybı
              yaşanmaması bakımından önemlidir.
            </p>

            <h3>3. Ön İnceleme ve Tahkikat</h3>
            <p>
              Ön inceleme duruşmasında mahkeme, taraflar arasındaki
              uyuşmazlık konularını belirlemekte ve tarafları sulhe teşvik
              edebilmektedir. Tahkikat aşamasında tanıklar dinlenmekte,
              deliller toplanmakta ve gerekli görülürse sosyal inceleme
              raporu alınmaktadır. Dava süresince velayet, nafaka ve ortak
              konutun kullanımı gibi konularda geçici tedbir kararları
              verilebilmektedir.
            </p>

            <h3>4. Karar ve Kanun Yolları</h3>
            <p>
              Tahkikatın tamamlanmasının ardından sözlü yargılama yapılmakta
              ve mahkeme kararını açıklamaktadır. Verilen karara karşı süresi
              içinde istinaf yoluna, istinaf incelemesinden geçen kararlara
              karşı ise kanunda öngörülen hâllerde temyiz yoluna
              başvurulabilmektedir. Boşanma hükmü kesinleştikten sonra nüfus
              kaydına işlenmekte; mal rejiminin tasfiyesi ise ayrı bir
              davanın konusunu oluşturmaktadır.
            </p>
          </div>

          {/* Sıkça Sorulan Sorular */}
          <h2 className="mt-14 text-navy-800">Sıkça Sorulan Sorular</h2>
          <div className="mt-6">
            <FaqAccordion items={FAQ} idPrefix="aile-sss" />
          </div>

          {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
          <p className="mt-12 border-t border-line pt-6 text-[14px] italic text-muted">
            {INFO_NOTE}
          </p>
        </div>
      </section>

      {/* İlgili yazılarımız — "aile" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
