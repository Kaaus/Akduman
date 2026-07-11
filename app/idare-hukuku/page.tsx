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

const service = getService("idare-hukuku")!;

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
            İdare hukuku; devletin ve diğer kamu tüzel kişilerinin işleyişini
            düzenleyen, idarenin tesis ettiği işlem ve eylemlere karşı
            bireylerin korunmasını sağlayan hukuk dalıdır.
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
              Kamu gücü kullanılarak tesis edilen bir işlem; kişilerin çalışma
              hayatını, mülkiyetini ve gündelik yaşamını doğrudan
              etkileyebilmektedir. Akduman Hukuk Bürosu; iptal ve tam yargı
              davaları, idari başvurular, disiplin süreçleri ve kamulaştırma
              uyuşmazlıkları başta olmak üzere idare hukuku alanında
              müvekkillerine hukuki destek sağlamaktadır. İdari yargıda
              sürelerin hak düşürücü nitelik taşıması nedeniyle sürecin en
              başından itibaren deneyimli bir avukatla yürütülmesi hak
              kayıplarının önlenmesi bakımından önem taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2 id="hizmetler">İdare Hukuku Kapsamında Verdiğimiz Hizmetler</h2>
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

            <h2 id="surec">İdari Dava Süreci Nasıl İşler?</h2>
            <p>
              İdari yargılama; büyük ölçüde yazılı usule dayanan, dilekçeler
              ve dosya üzerinden yürüyen bir süreçtir. Sürecin başlıca
              aşamaları şu şekilde özetlenebilir:
            </p>

            {/* Hak-düşürücü süre cümlesi 1. adımın paragrafından Callout'a taşındı */}
            <Callout variant="uyari">
              <p>
                İdari yargıdaki süreler hak düşürücü nitelikte olduğundan,
                sürenin geçirilmesi dava hakkının yitirilmesine yol
                açabilmektedir.
              </p>
            </Callout>

            <ProcessSteps
              steps={[
                {
                  title: "İdari İşlemin Tebliği ve Süre Takibi",
                  body: (
                    <p>
                      Süreç, çoğu zaman idari işlemin ilgilisine tebliğ
                      edilmesiyle başlamaktadır. Tebliğ tarihi, dava açma
                      süresinin başlangıcını belirlediğinden bu tarihin doğru
                      tespit edilmesi ve belgelenmesi büyük önem taşımaktadır.
                    </p>
                  ),
                },
                {
                  title: "İdareye Başvuru",
                  body: (
                    <p>
                      Bazı uyuşmazlıklarda dava açılmadan önce idareye başvuru
                      yapılması gerekmekte, bazı hâllerde ise bu yol ilgilinin
                      tercihine bırakılmaktadır. Başvurunun içeriği, muhatabı
                      ve zamanlaması; dava açma süresinin işleyişini
                      etkileyebilmektedir. Bu nedenle başvuru aşamasının
                      hukuki destekle planlanması yerinde olmaktadır.
                    </p>
                  ),
                },
                {
                  title: "Dava Açılması ve Yürütmenin Durdurulması Talebi",
                  body: (
                    <p>
                      Dava, kanunda öngörülen süre içinde görevli ve yetkili
                      idari yargı merciinde açılmaktadır. İşlemin uygulanması
                      hâlinde telafisi güç veya imkânsız zararların doğması ve
                      işlemin açıkça hukuka aykırı olması koşullarının
                      birlikte değerlendirilmesi suretiyle yürütmenin
                      durdurulması talep edilebilmektedir. Yürütmenin
                      durdurulması kararı, dava sonuçlanıncaya kadar işlemin
                      etkilerini askıya alabilmektedir.
                    </p>
                  ),
                },
                {
                  title: "Karar ve Kanun Yolları",
                  body: (
                    <p>
                      Mahkeme; dosyadaki bilgi ve belgeleri değerlendirerek
                      iptal, ret veya tazminata ilişkin kararını vermektedir.
                      Verilen karara karşı kanunda öngörülen hâllerde istinaf,
                      istinaf incelemesinden geçen kararlara karşı ise belirli
                      koşullarla temyiz yoluna başvurulabilmektedir.
                    </p>
                  ),
                },
              ]}
            />

            {/* Kanun yolu süre cümlesi 4. adımın paragrafından Callout'a taşındı */}
            <Callout variant="uyari">
              <p>
                Kanun yolu başvuruları da süreye tabi olduğundan kararın
                tebliğinden itibaren sürelerin takibi önem taşımaktadır.
              </p>
            </Callout>

            <h2 id="sss">Sıkça Sorulan Sorular</h2>
            <Reveal>
              <FaqAccordion items={FAQ} idPrefix="idare-sss" />
            </Reveal>

            {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
            <p className="mt-12 border-t border-line-strong pt-6 text-[14px] italic text-muted">
              {INFO_NOTE}
            </p>
          </div>

          <TocRail items={TOC} />
        </div>
      </section>

      {/* İlgili yazılarımız — "idare" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
