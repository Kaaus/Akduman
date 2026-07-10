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

const service = getService("ceza-hukuku")!;

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/${service.slug}/`,
});

const FAQ: FaqItem[] = [
  {
    question: "İfadeye çağrıldım, ne yapmalıyım?",
    answer:
      "İfade, soruşturmanın önemli bir aşamasıdır ve burada verilen beyanlar dosyanın ilerleyen aşamalarını etkileyebilmektedir. Ceza Muhakemesi Kanunu kapsamında ifade öncesinde bir avukatla görüşme ve ifade sırasında müdafi bulundurulmasını talep etme hakkınız bulunmaktadır. Çağrı kâğıdında belirtilen tarihte ilgili birime gitmeniz, gitmeden önce ise bir avukata danışmanız hak kaybı yaşamamanız bakımından önem taşımaktadır.",
  },
  {
    question: "Tutuklama kararına itiraz edilebilir mi?",
    answer:
      "Evet. Tutuklama kararına karşı kanunda öngörülen süre içinde itiraz edilebilmektedir. İtiraz incelemesinde tutuklamanın koşullarının bulunup bulunmadığı değerlendirilmekte; koşulların oluşmadığı sonucuna varılırsa serbest bırakma veya tutuklamaya alternatif olan adli kontrol tedbirlerinin uygulanması gündeme gelebilmektedir.",
  },
  {
    question: "HAGB nedir?",
    answer:
      "Hükmün açıklanmasının geri bırakılması (HAGB); sanık hakkında kurulan hükmün belirli koşulların varlığı hâlinde açıklanmamasını öngören bir ceza muhakemesi kurumudur. Sanığın öngörülen denetim süresini yükümlülüklere uygun şekilde geçirmesi hâlinde hüküm sonuç doğurmamakta ve dava düşmektedir. Kurumun uygulanma koşulları dosya özelinde değerlendirilmektedir.",
  },
  {
    question: "Ceza dosyalarında avukat zorunlu mu?",
    answer:
      "Ceza Muhakemesi Kanunu'nda sayılan hâllerde — örneğin çocuklar, kendisini savunamayacak durumda olan kişiler ve alt sınırı belirli bir süreyi aşan hapis cezası gerektiren suçlar bakımından — müdafi görevlendirilmesi zorunludur. Bunun dışındaki dosyalarda avukat bulundurmak zorunlu olmamakla birlikte, ceza yargılamasının kişi özgürlüğüne etkileri dikkate alındığında sürecin bir avukatla yürütülmesi hak kayıplarının önlenmesi bakımından önem taşımaktadır.",
  },
];

export default function CezaHukukuPage() {
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
            {/* Giriş — orijinal metin korunarak */}
            <p>
              Ceza hukuku; suç teşkil eden fiilleri, bu fiillere uygulanacak
              yaptırımları ve yargılama sürecini düzenleyen hukuk dalıdır.
              Akduman Hukuk Bürosu, ceza hukuku alanında şüpheli, sanık,
              müşteki ve mağdur konumundaki müvekkillerine soruşturma ve
              kovuşturma aşamalarında hukuki destek sağlamaktadır. Ceza
              yargılaması, kişi özgürlüğünü doğrudan etkileyen sonuçlar
              doğurabildiğinden sürecin en başından itibaren deneyimli bir
              avukatla yürütülmesi hak kayıplarının önlenmesi bakımından önem
              taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2>Ceza Hukuku Kapsamında Verdiğimiz Hizmetler</h2>
            <p>
              Büromuz, ceza yargılamasının soruşturma evresinden infaz
              aşamasına kadar tüm süreçlerinde müvekkillerine hukuki destek
              sağlamaktadır. Bu kapsamda verilen başlıca hizmetler şunlardır:
            </p>
            <ul>
              <li>Soruşturma aşamasında ifade ve sorguda müdafilik</li>
              <li>Tutuklama ve adli kontrol kararlarına itiraz</li>
              <li>Kovuşturma aşamasında sanık müdafiliği</li>
              <li>Müşteki ve katılan vekilliği</li>
              <li>İstinaf ve temyiz kanun yollarına başvuru</li>
              <li>İnfaz hukuku işlemleri</li>
            </ul>

            <h3>Sık Karşılaşılan Dosya Türleri</h3>
            <p>
              Büromuzun ceza hukuku alanında takip ettiği dosyalar arasında şu
              suç türleri öne çıkmaktadır:
            </p>
            <ul>
              <li>
                <strong>Dolandırıcılık:</strong> Hileli davranışlarla bir
                kimsenin aldatılarak zarara uğratılmasına ilişkin dosyalardır;
                basit ve nitelikli hâlleri farklı yaptırımlara tabidir.
              </li>
              <li>
                <strong>Hırsızlık:</strong> Başkasına ait taşınır bir malın
                rızası olmaksızın alınmasına ilişkin dosyalardır; suçun
                işleniş biçimi cezayı etkilemektedir.
              </li>
              <li>
                <strong>Kasten ve taksirle yaralama:</strong> Bir kimsenin
                vücut bütünlüğüne kasten ya da dikkat ve özen yükümlülüğüne
                aykırılıkla zarar verilmesine ilişkin dosyalardır.
              </li>
              <li>
                <strong>Tehdit ve hakaret:</strong> Kişilerin huzuruna, şeref
                ve saygınlığına yönelik fiillere ilişkin dosyalardır; şikâyet
                süreleri bakımından dikkat gerektirmektedir.
              </li>
              <li>
                <strong>Uyuşturucu madde suçları:</strong> Kullanma ile ticaret
                arasındaki nitelendirme farkı, dosyanın seyrini önemli ölçüde
                etkilemektedir.
              </li>
              <li>
                <strong>Bilişim suçları:</strong> Bilişim sistemlerine hukuka
                aykırı erişim, banka ve kredi kartlarının kötüye kullanılması
                gibi fiillere ilişkin dosyalardır.
              </li>
              <li>
                <strong>Trafik kazalarına ilişkin taksirli suçlar:</strong>{" "}
                Yaralanma veya ölümle sonuçlanan kazalarda sürücüler hakkında
                yürütülen taksirle yaralama ve taksirle öldürme dosyalarıdır.
              </li>
            </ul>

            <h2>Ceza Yargılaması Süreci Nasıl İşler?</h2>

            <h3>1. Soruşturma</h3>
            <p>
              Süreç; şikâyet, ihbar veya suçun başka biçimde öğrenilmesiyle
              başlamaktadır. Cumhuriyet savcılığı tarafından yürütülen bu
              evrede ifadeler alınmakta ve deliller toplanmaktadır. Bu
              aşamadaki beyan ve işlemler, dosyanın ilerleyen evrelerini
              doğrudan etkileyebilmektedir.
            </p>

            <h3>2. İddianame ve Kovuşturmaya Geçiş</h3>
            <p>
              Soruşturma sonunda yeterli şüphe oluşursa iddianame düzenlenerek
              mahkemeye sunulmaktadır. İddianamenin kabulüyle kamu davası
              açılmakta ve kovuşturma evresine geçilmektedir. Yeterli şüphe
              oluşmazsa kovuşturmaya yer olmadığına dair karar
              verilebilmektedir.
            </p>

            <h3>3. Kovuşturma</h3>
            <p>
              Kovuşturma evresinde duruşmalar yapılmakta, deliller mahkeme
              önünde tartışılmakta ve savunma sunulmaktadır. Yargılamanın
              sonunda mahkeme; beraat, mahkûmiyet veya kanunda öngörülen diğer
              kararlardan birini vermektedir.
            </p>

            <h3>4. Kanun Yolları</h3>
            <p>
              Verilen hükme karşı istinaf yoluna, istinaf incelemesinden geçen
              kararlara karşı ise kanunda öngörülen hâllerde temyiz yoluna
              başvurulabilmektedir. Kanun yolu başvuruları süreye tabi
              olduğundan sürelerin takibi önem taşımaktadır.
            </p>

            <h2>Sık Kullanılan Kavramlar</h2>

            <h3>Hükmün Açıklanmasının Geri Bırakılması (HAGB)</h3>
            <p>
              Sanık hakkında kurulan hükmün, belirli koşulların varlığı hâlinde
              açıklanmamasını öngören kurumdur. Denetim süresinin
              yükümlülüklere uygun geçirilmesi hâlinde hüküm sonuç doğurmamakta
              ve dava düşmektedir.
            </p>

            <h3>Hapis Cezasının Ertelenmesi</h3>
            <p>
              Kanunda öngörülen koşulların bulunması hâlinde, hükmedilen hapis
              cezasının infazının cezaevinde çektirilmemesine karar
              verilebilmesidir. Erteleme hâlinde hükümlü için bir denetim
              süresi belirlenmektedir.
            </p>

            <h3>Uzlaştırma</h3>
            <p>
              Kanunda sayılan suçlarda; şüpheli veya sanık ile mağdurun,
              tarafsız bir uzlaştırmacı aracılığıyla anlaşmasını sağlamaya
              yönelik bir usuldür. Uzlaşmanın sağlanması hâlinde dosya, evresine
              göre kovuşturmaya yer olmadığı veya düşme kararıyla
              sonuçlanabilmektedir.
            </p>

            <h3>Adli Kontrol</h3>
            <p>
              Tutuklamaya alternatif olarak uygulanabilen; imza yükümlülüğü,
              yurt dışına çıkış yasağı gibi tedbirleri içeren bir koruma
              tedbiridir. Adli kontrol kararlarına karşı da itiraz yolu
              açıktır.
            </p>
          </div>

          {/* Sıkça Sorulan Sorular */}
          <h2 className="mt-14 text-navy-800">Sıkça Sorulan Sorular</h2>
          <div className="mt-6">
            <FaqAccordion items={FAQ} idPrefix="ceza-sss" />
          </div>

          {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
          <p className="mt-12 border-t border-line pt-6 text-[14px] italic text-muted">
            {INFO_NOTE}
          </p>
        </div>
      </section>

      {/* İlgili yazılarımız — "ceza" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
