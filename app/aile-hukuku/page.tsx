import { ArrowRight, Phone } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Callout from "@/components/Callout";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import PhotoSurface from "@/components/PhotoSurface";
import ProcessSteps from "@/components/ProcessSteps";
import RelatedArticles from "@/components/RelatedArticles";
import Reveal from "@/components/Reveal";
import TocRail from "@/components/TocRail";
import { breadcrumbSchema, buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";
import { getService, IMAGES, INFO_NOTE, SITE, type FaqItem } from "@/lib/site";

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

const TOC = [
  { id: "hizmetler", label: "Verdiğimiz Hizmetler" },
  { id: "surec", label: "Süreç Nasıl İşler?" },
  { id: "sss", label: "Sıkça Sorulan Sorular" },
];

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

      {/* Dar koyu şerit-hero */}
      <section className="relative overflow-hidden bg-navy-950">
        <PhotoSurface
          image={IMAGES.kutuphaneDikey}
          variant="band"
          fill
          objectPosition="center 20%"
          sizes="100vw"
        />
        <div className="container-site relative z-10 py-10 md:py-14">
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
            Aile hukuku; evlilik, boşanma, velayet, nafaka ve eşler arasındaki
            mal rejimi gibi aile ilişkilerinden doğan hak ve yükümlülükleri
            düzenleyen hukuk dalıdır.
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
              Akduman Hukuk Bürosu, aile hukukundan kaynaklanan
              uyuşmazlıklarda dava takibi ve hukuki danışmanlık hizmeti
              sunmaktadır. Bu alandaki uyuşmazlıklar; tarafların özel
              hayatını, çocukların geleceğini ve ekonomik dengeleri doğrudan
              etkileyen sonuçlar doğurabilmektedir. Bu nedenle sürecin en
              başından itibaren deneyimli bir avukatla ve özenle yürütülmesi,
              hak kayıplarının önlenmesi bakımından önem taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2 id="hizmetler">Aile Hukuku Kapsamında Verdiğimiz Hizmetler</h2>
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
                tedbir kararları talep edilebilmektedir.
              </li>
            </ul>

            {/* İvedilik cümlesi mevcut metinden (6284 maddesi) Callout'a taşındı */}
            <Callout variant="uyari">
              <p>
                Bu başvurular ivedi nitelikte olduğundan sürecin gecikmeksizin
                başlatılması önem taşımaktadır.
              </p>
            </Callout>

            <h2 id="surec">Boşanma Süreci Nasıl İşler?</h2>
            <p>
              Boşanma davaları, anlaşmalı veya çekişmeli olarak
              yürütülebilmektedir. Anlaşmalı boşanmada taraflar sonuçlar
              üzerinde uzlaştığından süreç genellikle kısa sürede
              tamamlanabilmekte; çekişmeli boşanmada ise aşağıdaki aşamalar
              izlenmektedir. Çekişmeli davalarda yargılamanın süresi;
              delillerin kapsamına, tanık sayısına ve mahkemenin iş yüküne
              göre değişebilmektedir.
            </p>
            <ProcessSteps
              steps={[
                {
                  title: "Dava Öncesi Değerlendirme ve Dava Dilekçesi",
                  body: (
                    <p>
                      Süreç, somut olayın hukuki açıdan değerlendirilmesiyle
                      başlamaktadır. Bu aşamada boşanma sebebi, deliller ile
                      velayet, nafaka ve tazminat talepleri belirlenmekte;
                      talepleri ve dayanaklarını içeren dava dilekçesi
                      hazırlanarak aile mahkemesine sunulmaktadır. Anlaşmalı
                      boşanmada ise taraflarca imzalanan protokol, dava
                      dilekçesiyle birlikte mahkemeye sunulmaktadır.
                    </p>
                  ),
                },
                {
                  title: "Dilekçeler Aşaması",
                  body: (
                    <p>
                      Dava dilekçesinin davalı tarafa tebliğiyle dilekçeler
                      aşaması başlamaktadır. Bu aşamada cevap, cevaba cevap ve
                      ikinci cevap dilekçeleri sunulmakta; tarafların iddia ve
                      savunmaları büyük ölçüde bu aşamada şekillenmektedir.
                    </p>
                  ),
                },
                {
                  title: "Ön İnceleme ve Tahkikat",
                  body: (
                    <p>
                      Ön inceleme duruşmasında mahkeme, taraflar arasındaki
                      uyuşmazlık konularını belirlemekte ve tarafları sulhe
                      teşvik edebilmektedir. Tahkikat aşamasında tanıklar
                      dinlenmekte, deliller toplanmakta ve gerekli görülürse
                      sosyal inceleme raporu alınmaktadır. Dava süresince
                      velayet, nafaka ve ortak konutun kullanımı gibi
                      konularda geçici tedbir kararları verilebilmektedir.
                    </p>
                  ),
                },
                {
                  title: "Karar ve Kanun Yolları",
                  body: (
                    <p>
                      Tahkikatın tamamlanmasının ardından sözlü yargılama
                      yapılmakta ve mahkeme kararını açıklamaktadır. Verilen
                      karara karşı süresi içinde istinaf yoluna, istinaf
                      incelemesinden geçen kararlara karşı ise kanunda
                      öngörülen hâllerde temyiz yoluna başvurulabilmektedir.
                      Boşanma hükmü kesinleştikten sonra nüfus kaydına
                      işlenmekte; mal rejiminin tasfiyesi ise ayrı bir davanın
                      konusunu oluşturmaktadır.
                    </p>
                  ),
                },
              ]}
            />

            {/* Süre/hak-kaybı cümlesi mevcut metinden (Dilekçeler Aşaması) Callout'a taşındı */}
            <Callout variant="uyari">
              <p>
                Dilekçelerin süresi içinde ve eksiksiz sunulması, ilerleyen
                aşamalarda hak kaybı yaşanmaması bakımından önemlidir.
              </p>
            </Callout>

            <h2 id="sss">Sıkça Sorulan Sorular</h2>
            <Reveal>
              <FaqAccordion items={FAQ} idPrefix="aile-sss" />
            </Reveal>

            {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
            <p className="mt-12 border-t border-line-strong pt-6 text-[14px] italic text-muted">
              {INFO_NOTE}
            </p>
          </div>

          <TocRail items={TOC} />
        </div>
      </section>

      {/* İlgili yazılarımız — "aile" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
