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

const service = getService("idare-hukuku")!;

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/${service.slug}/`,
});

const FAQ: FaqItem[] = [
  {
    question: "İptal davası açma süresi ne kadardır?",
    answer:
      "İdari yargıda dava açma süreleri; uyuşmazlığın türüne, işlemin niteliğine ve tebliğ tarihine göre değişmektedir. İdari Yargılama Usulü Kanunu'nda (İYUK) öngörülen bu süreler hak düşürücü nitelikte olduğundan, sürenin geçirilmesi hâlinde dava açma imkânı kural olarak ortadan kalkmaktadır. Bu nedenle işlemin tebliğ edildiği tarihin belgelenmesi ve sürecin gecikmeden bir avukatla değerlendirilmesi önem taşımaktadır.",
  },
  {
    question: "Tam yargı davası nedir?",
    answer:
      "Tam yargı davası; idarenin işlem veya eylemleri nedeniyle kişisel hakları doğrudan zarar görenlerin, uğradıkları maddi ve manevi zararların tazminini idari yargıda talep ettikleri dava türüdür. İptal davasından farklı olarak bu davada işlemin ortadan kaldırılması değil, doğan zararın giderilmesi amaçlanmaktadır. Tam yargı davası; iptal davasıyla birlikte veya kanunda öngörülen koşullara göre ayrı olarak açılabilmektedir.",
  },
  {
    question: "Disiplin cezasına karşı hangi yollara başvurulabilir?",
    answer:
      "Kamu görevlisi hakkında verilen disiplin cezasına karşı, cezanın türüne göre ilgili idari mercilere itiraz edilebilmekte ve kanunda öngörülen süre içinde idari yargıda iptal davası açılabilmektedir. Yargılamada; disiplin soruşturmasının usulüne uygun yürütülüp yürütülmediği, savunma hakkının tanınıp tanınmadığı ve fiil ile ceza arasındaki denge değerlendirilmektedir. Başvuru yollarının süreye tabi olması nedeniyle tebliğ tarihinden itibaren sürecin dikkatle takip edilmesi gerekmektedir.",
  },
];

export default function IdareHukukuPage() {
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
              İdare hukuku; devletin ve diğer kamu tüzel kişilerinin işleyişini
              düzenleyen, idarenin tesis ettiği işlem ve eylemlere karşı
              bireylerin korunmasını sağlayan hukuk dalıdır. Kamu gücü
              kullanılarak tesis edilen bir işlem; kişilerin çalışma hayatını,
              mülkiyetini ve gündelik yaşamını doğrudan etkileyebilmektedir.
              Akduman Hukuk Bürosu; iptal ve tam yargı davaları, idari
              başvurular, disiplin süreçleri ve kamulaştırma uyuşmazlıkları
              başta olmak üzere idare hukuku alanında müvekkillerine hukuki
              destek sağlamaktadır. İdari yargıda sürelerin hak düşürücü
              nitelik taşıması nedeniyle sürecin en başından itibaren
              deneyimli bir avukatla yürütülmesi hak kayıplarının önlenmesi
              bakımından önem taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2>İdare Hukuku Kapsamında Verdiğimiz Hizmetler</h2>
            <p>
              Büromuz, idari işlemin tebliğinden kanun yolu aşamasına kadar
              idari uyuşmazlıkların tüm evrelerinde müvekkillerine hukuki
              destek sağlamaktadır. Bu kapsamda verilen başlıca hizmetler
              şunlardır:
            </p>
            <ul>
              <li>
                <strong>İptal davaları:</strong> İdarenin tesis ettiği bir
                işlemin hukuka aykırı olduğu iddiasıyla ortadan kaldırılmasına
                yönelik davalardır. Yargılamada işlem; yetki, şekil, sebep,
                konu ve amaç yönlerinden denetlenmektedir.
              </li>
              <li>
                <strong>Tam yargı (tazminat) davaları:</strong> İdarenin işlem
                veya eylemleri nedeniyle uğranılan maddi ve manevi zararların
                tazminine yönelik davalardır. İptal davasıyla birlikte veya
                ayrı olarak açılabilmektedir.
              </li>
              <li>
                <strong>İdari başvurular ve süreler:</strong> Dava öncesinde
                idareye yapılacak itiraz ve başvuruların hazırlanması ile hak
                düşürücü sürelerin takibini kapsamaktadır. Doğru merciye,
                doğru zamanda yapılan başvuru, sonraki dava sürecinin
                sağlıklı yürümesi bakımından belirleyicidir.
              </li>
              <li>
                <strong>Memur disiplin cezalarına itiraz:</strong> Kamu
                görevlileri hakkında verilen disiplin cezalarına karşı idari
                itiraz ve iptal davası süreçlerinin yürütülmesidir. Disiplin
                soruşturmasındaki usul eksiklikleri ve savunma hakkına ilişkin
                aykırılıklar bu davalarda öne çıkan denetim konularıdır.
              </li>
              <li>
                <strong>Kamulaştırma uyuşmazlıkları:</strong> Taşınmazı
                kamulaştırılan maliklerin bedele ve işleme ilişkin itirazları
                ile kamulaştırmasız el atma iddialarından doğan uyuşmazlıkların
                takibidir.
              </li>
            </ul>

            <h2>İdari Dava Süreci Nasıl İşler?</h2>
            <p>
              İdari yargılama; büyük ölçüde yazılı usule dayanan, dilekçeler
              ve dosya üzerinden yürüyen bir süreçtir. Sürecin başlıca
              aşamaları şu şekilde özetlenebilir:
            </p>

            <h3>1. İdari İşlemin Tebliği ve Süre Takibi</h3>
            <p>
              Süreç, çoğu zaman idari işlemin ilgilisine tebliğ edilmesiyle
              başlamaktadır. Tebliğ tarihi, dava açma süresinin başlangıcını
              belirlediğinden bu tarihin doğru tespit edilmesi ve
              belgelenmesi büyük önem taşımaktadır. İdari yargıdaki süreler
              hak düşürücü nitelikte olduğundan, sürenin geçirilmesi dava
              hakkının yitirilmesine yol açabilmektedir.
            </p>

            <h3>2. İdareye Başvuru</h3>
            <p>
              Bazı uyuşmazlıklarda dava açılmadan önce idareye başvuru
              yapılması gerekmekte, bazı hâllerde ise bu yol ilgilinin
              tercihine bırakılmaktadır. Başvurunun içeriği, muhatabı ve
              zamanlaması; dava açma süresinin işleyişini
              etkileyebilmektedir. Bu nedenle başvuru aşamasının hukuki
              destekle planlanması yerinde olmaktadır.
            </p>

            <h3>3. Dava Açılması ve Yürütmenin Durdurulması Talebi</h3>
            <p>
              Dava, kanunda öngörülen süre içinde görevli ve yetkili idari
              yargı merciinde açılmaktadır. İşlemin uygulanması hâlinde
              telafisi güç veya imkânsız zararların doğması ve işlemin açıkça
              hukuka aykırı olması koşullarının birlikte değerlendirilmesi
              suretiyle yürütmenin durdurulması talep edilebilmektedir.
              Yürütmenin durdurulması kararı, dava sonuçlanıncaya kadar
              işlemin etkilerini askıya alabilmektedir.
            </p>

            <h3>4. Karar ve Kanun Yolları</h3>
            <p>
              Mahkeme; dosyadaki bilgi ve belgeleri değerlendirerek iptal,
              ret veya tazminata ilişkin kararını vermektedir. Verilen karara
              karşı kanunda öngörülen hâllerde istinaf, istinaf incelemesinden
              geçen kararlara karşı ise belirli koşullarla temyiz yoluna
              başvurulabilmektedir. Kanun yolu başvuruları da süreye tabi
              olduğundan kararın tebliğinden itibaren sürelerin takibi önem
              taşımaktadır.
            </p>
          </div>

          {/* Sıkça Sorulan Sorular */}
          <h2 className="mt-14 text-navy-800">Sıkça Sorulan Sorular</h2>
          <div className="mt-6">
            <FaqAccordion items={FAQ} idPrefix="idare-sss" />
          </div>

          {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
          <p className="mt-12 border-t border-line pt-6 text-[14px] italic text-muted">
            {INFO_NOTE}
          </p>
        </div>
      </section>

      {/* İlgili yazılarımız — "idare" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
