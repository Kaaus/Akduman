import Link from "next/link";
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

const service = getService("miras-hukuku")!;

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
    question: "Reddi miras süresi ne kadardır?",
    answer:
      "Türk Medeni Kanunu'nda mirasın reddi için yerleşik olarak üç aylık bir süre öngörülmüştür. Bu süre kural olarak mirasçının, mirasçı olduğunu öğrendiği tarihten itibaren işlemeye başlamaktadır. Ret beyanı, sulh hukuk mahkemesine yapılmakta olup sürenin kaçırılması hâlinde miras kural olarak kabul edilmiş sayılmaktadır. Bu nedenle borca batık bir tereke söz konusuysa sürenin takibi büyük önem taşımaktadır.",
  },
  {
    question: "Veraset ilamı nereden alınır?",
    answer:
      "Veraset ilamı, diğer adıyla mirasçılık belgesi; noterden veya sulh hukuk mahkemesinden alınabilmektedir. Uyuşmazlık bulunmayan ve nüfus kayıtlarından mirasçılığın açıkça tespit edilebildiği durumlarda noter yoluyla alınması daha hızlı bir seçenektir. Yabancılık unsuru taşıyan veya kayıtların yeterli olmadığı durumlarda ise başvurunun sulh hukuk mahkemesine yapılması gerekebilmektedir.",
  },
  {
    question: "Saklı pay nedir?",
    answer:
      "Saklı pay; miras bırakanın ölüme bağlı tasarruflarıyla veya bazı sağlararası kazandırmalarıyla dahi ortadan kaldıramayacağı, kanunla korunan miras payıdır. Türk Medeni Kanunu'na göre altsoy, ana-baba ve sağ kalan eş saklı paylı mirasçılardandır. Saklı payın ihlal edilmesi hâlinde, saklı paylı mirasçılar tenkis davası yoluyla paylarının tamamlanmasını talep edebilmektedir.",
  },
];

export default function MirasHukukuPage() {
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
          image={IMAGES.kutuphaneKubbe}
          variant="band"
          fill
          objectPosition="center 30%"
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
            Miras hukuku; bir kimsenin ölümü hâlinde malvarlığının kimlere,
            hangi oranlarda ve hangi usulle geçeceğini düzenleyen hukuk
            dalıdır.
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
              Türk Medeni Kanunu'nda düzenlenen bu alan; mirasçılık sıfatının
              belirlenmesinden terekenin paylaşılmasına kadar uzanan geniş bir
              süreci kapsamaktadır. Akduman Hukuk Bürosu; mirasçılık belgesinin
              alınmasından miras paylaşımına, reddi mirastan tenkis ve muris
              muvazaası davalarına kadar miras hukukundan doğan uyuşmazlıklarda
              müvekkillerine hukuki destek sağlamaktadır. Miras süreçleri hem
              aile ilişkilerini hem de malvarlığı haklarını doğrudan
              etkilediğinden, sürecin deneyimli bir avukatla yürütülmesi hak
              kayıplarının önlenmesi bakımından önem taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2 id="hizmetler">Miras Hukuku Kapsamında Verdiğimiz Hizmetler</h2>
            <p>
              Büromuz; miras hukukunun çekişmesiz işlemlerinden çekişmeli dava
              süreçlerine kadar tüm aşamalarda müvekkillerine hukuki destek
              sağlamaktadır. Bu kapsamda verilen başlıca hizmetler şunlardır:
            </p>
            <ul>
              <li>
                <strong>Yasal mirasçılık ve saklı pay:</strong> Mirasçıların ve
                miras paylarının belirlenmesi ile kanunla korunan saklı payların
                tespitine ilişkin danışmanlık ve dava takibi hizmetidir.
              </li>
              <li>
                <strong>Miras paylaşımı:</strong> Terekenin mirasçılar arasında
                anlaşma yoluyla veya dava yoluyla paylaştırılmasına ilişkin
                süreçlerin yürütülmesidir. Konunun ayrıntıları için{" "}
                <Link href="/miras-paylasimi-nedir/">
                  Miras Paylaşımı Nasıl Yapılır? Anlaşmalı ve Davalı Miras
                  Paylaşımı
                </Link>{" "}
                başlıklı yazımızı inceleyebilirsiniz.
              </li>
              <li>
                <strong>Reddi miras:</strong> Özellikle borca batık terekelerde,
                mirasın kanunda öngörülen süre içinde reddedilmesine ilişkin
                başvuruların hazırlanması ve takibidir. Ayrıntılı bilgi için{" "}
                <Link href="/reddi-miras-nedir/">
                  Reddi Miras (Mirasın Reddi) Nedir?
                </Link>{" "}
                başlıklı yazımıza göz atabilirsiniz.
              </li>
              <li>
                <strong>Veraset ilamı (mirasçılık belgesi):</strong> Mirasçılık
                sıfatını ve payları gösteren belgenin noterden veya sulh hukuk
                mahkemesinden alınması sürecinin yürütülmesidir. Konuyu{" "}
                <Link href="/mirascilik-belgesi-nedir/">
                  Mirasçılık Belgesi (Veraset İlamı) Nedir?
                </Link>{" "}
                başlıklı yazımızda ayrıntılı olarak ele aldık.
              </li>
              <li>
                <strong>Muris muvazaası:</strong> Miras bırakanın, mirasçılardan
                mal kaçırmak amacıyla yaptığı görünüşte satış gibi işlemlere
                karşı tapu iptali ve tescil taleplerinin dava yoluyla ileri
                sürülmesidir. Bu davalarda miras bırakanın gerçek iradesinin
                ortaya konulması belirleyici olmaktadır.
              </li>
              <li>
                <strong>Tenkis davası:</strong> Miras bırakanın tasarruflarıyla
                saklı payları ihlal edilen mirasçıların, paylarının
                tamamlanmasını talep ettikleri davaların takibidir. Tenkis
                talebi kanunda öngörülen sürelere tabi olduğundan zamanında
                harekete geçilmesi önem taşımaktadır.
              </li>
              <li>
                <strong>Ortaklığın giderilmesi:</strong> Mirasçılar arasında
                paylaşılamayan taşınır ve taşınmaz mallardaki ortaklığın, aynen
                taksim veya satış yoluyla sona erdirilmesine ilişkin dava
                sürecidir. Ayrıntılar için{" "}
                <Link href="/ortakligin-giderilmesi-davasi-nedir/">
                  Ortaklığın Giderilmesi (İzale-i Şuyu) Davası Nedir? Nasıl
                  Açılır?
                </Link>{" "}
                başlıklı yazımızı okuyabilirsiniz.
              </li>
            </ul>

            <h2 id="surec">Miras Davaları Süreci Nasıl İşler?</h2>
            <p>
              Miras süreçleri; terekenin kapsamına, mirasçı sayısına ve
              taraflar arasında anlaşma bulunup bulunmadığına göre farklı
              şekillerde ilerleyebilmektedir. Bununla birlikte uygulamada
              süreç, genel hatlarıyla aşağıdaki aşamalardan geçmektedir.
            </p>
            <ProcessSteps
              steps={[
                {
                  title: "Mirasçılık Belgesinin Alınması",
                  body: (
                    <p>
                      Miras sürecinin ilk adımı, mirasçılık sıfatını ve miras
                      paylarını gösteren veraset ilamının alınmasıdır. Bu
                      belge; uyuşmazlık bulunmayan hâllerde noterden, gerekli
                      durumlarda ise sulh hukuk mahkemesinden
                      alınabilmektedir. Tapu, banka ve vergi dairesi gibi
                      kurumlar nezdindeki işlemlerin tamamı bu belgeye
                      dayanılarak yürütülmektedir.
                    </p>
                  ),
                },
                {
                  title: "Terekenin Tespiti",
                  body: (
                    <p>
                      İkinci aşamada; miras bırakanın taşınmazları, banka
                      hesapları, araçları, alacakları ve borçları
                      belirlenmektedir. Terekenin kapsamının doğru tespit
                      edilmesi, hem paylaşımın sağlıklı yürütülmesi hem de
                      borca batık terekelerde reddi miras kararının zamanında
                      verilebilmesi bakımından önem taşımaktadır. Gerektiğinde
                      mahkeme aracılığıyla tereke tespiti talep
                      edilebilmektedir.
                    </p>
                  ),
                },
                {
                  title: "Paylaşım: Anlaşma veya Dava",
                  body: (
                    <p>
                      Mirasçılar, tereke üzerinde anlaşarak miras paylaşım
                      sözleşmesi yapabilmektedir. Anlaşma sağlanamazsa
                      paylaşım; miras taksim davası veya ortaklığın
                      giderilmesi davası yoluyla mahkeme eliyle
                      gerçekleştirilmektedir. Bu aşamada saklı pay ihlali veya
                      mal kaçırma iddiası varsa tenkis ve muris muvazaasına
                      dayalı davalar da gündeme gelebilmektedir.
                    </p>
                  ),
                },
                {
                  title: "Karar ve Kanun Yolları",
                  body: (
                    <p>
                      Yargılamanın sonunda mahkeme, paylaşıma veya ileri
                      sürülen taleplere ilişkin kararını vermektedir. Karara
                      karşı istinaf yoluna, kanunda öngörülen hâllerde ise
                      temyiz yoluna başvurulabilmektedir. Kesinleşen kararın
                      ardından tapu devri, hesapların paylaştırılması gibi
                      infaz işlemleri gerçekleştirilmektedir.
                    </p>
                  ),
                },
              ]}
            />

            {/* Süre/hak-kaybı cümlesi mevcut metinden Callout'a taşındı */}
            <Callout variant="uyari">
              <p>
                Kanun yolu başvuruları süreye tabi olduğundan sürelerin takibi
                önem taşımaktadır.
              </p>
            </Callout>

            <p>
              Miras uyuşmazlıkları çoğu zaman aile bireyleri arasında
              yaşandığından, sürecin yalnızca hukuki değil kişisel yönü de
              bulunmaktadır. Büromuz; mümkün olan hâllerde tarafların anlaşma
              yoluyla sonuca ulaşmasını gözeten, anlaşmanın mümkün olmadığı
              durumlarda ise dava sürecini titizlikle yürüten bir yaklaşım
              benimsemektedir.
            </p>

            <h2 id="sss">Sıkça Sorulan Sorular</h2>
            <Reveal>
              <FaqAccordion items={FAQ} idPrefix="miras-sss" />
            </Reveal>

            {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
            <p className="mt-12 border-t border-line-strong pt-6 text-[14px] italic text-muted">
              {INFO_NOTE}
            </p>
          </div>

          <TocRail items={TOC} />
        </div>
      </section>

      {/* İlgili yazılarımız — "miras" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
