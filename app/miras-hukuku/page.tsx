import Link from "next/link";
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

const service = getService("miras-hukuku")!;

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/${service.slug}/`,
});

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
              Miras hukuku; bir kimsenin ölümü hâlinde malvarlığının kimlere,
              hangi oranlarda ve hangi usulle geçeceğini düzenleyen hukuk
              dalıdır. Türk Medeni Kanunu'nda düzenlenen bu alan; mirasçılık
              sıfatının belirlenmesinden terekenin paylaşılmasına kadar uzanan
              geniş bir süreci kapsamaktadır. Akduman Hukuk Bürosu; mirasçılık
              belgesinin alınmasından miras paylaşımına, reddi mirastan tenkis
              ve muris muvazaası davalarına kadar miras hukukundan doğan
              uyuşmazlıklarda müvekkillerine hukuki destek sağlamaktadır. Miras
              süreçleri hem aile ilişkilerini hem de malvarlığı haklarını
              doğrudan etkilediğinden, sürecin deneyimli bir avukatla
              yürütülmesi hak kayıplarının önlenmesi bakımından önem
              taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2>Miras Hukuku Kapsamında Verdiğimiz Hizmetler</h2>
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
                <Link href="/miras-paylasimi-nasil-yapilir/">
                  Miras Paylaşımı Nasıl Yapılır?
                </Link>{" "}
                başlıklı yazımızı inceleyebilirsiniz.
              </li>
              <li>
                <strong>Reddi miras:</strong> Özellikle borca batık terekelerde,
                mirasın kanunda öngörülen süre içinde reddedilmesine ilişkin
                başvuruların hazırlanması ve takibidir. Ayrıntılı bilgi için{" "}
                <Link href="/reddi-miras-nedir/">Reddi Miras Nedir?</Link>{" "}
                başlıklı yazımıza göz atabilirsiniz.
              </li>
              <li>
                <strong>Veraset ilamı (mirasçılık belgesi):</strong> Mirasçılık
                sıfatını ve payları gösteren belgenin noterden veya sulh hukuk
                mahkemesinden alınması sürecinin yürütülmesidir. Konuyu{" "}
                <Link href="/veraset-ilami-nedir/">Veraset İlamı Nedir?</Link>{" "}
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
                  Ortaklığın Giderilmesi Davası Nedir?
                </Link>{" "}
                başlıklı yazımızı okuyabilirsiniz.
              </li>
            </ul>

            <h2>Miras Davaları Süreci Nasıl İşler?</h2>
            <p>
              Miras süreçleri; terekenin kapsamına, mirasçı sayısına ve
              taraflar arasında anlaşma bulunup bulunmadığına göre farklı
              şekillerde ilerleyebilmektedir. Bununla birlikte uygulamada
              süreç, genel hatlarıyla aşağıdaki aşamalardan geçmektedir.
            </p>

            <h3>1. Mirasçılık Belgesinin Alınması</h3>
            <p>
              Miras sürecinin ilk adımı, mirasçılık sıfatını ve miras paylarını
              gösteren veraset ilamının alınmasıdır. Bu belge; uyuşmazlık
              bulunmayan hâllerde noterden, gerekli durumlarda ise sulh hukuk
              mahkemesinden alınabilmektedir. Tapu, banka ve vergi dairesi gibi
              kurumlar nezdindeki işlemlerin tamamı bu belgeye dayanılarak
              yürütülmektedir.
            </p>

            <h3>2. Terekenin Tespiti</h3>
            <p>
              İkinci aşamada; miras bırakanın taşınmazları, banka hesapları,
              araçları, alacakları ve borçları belirlenmektedir. Terekenin
              kapsamının doğru tespit edilmesi, hem paylaşımın sağlıklı
              yürütülmesi hem de borca batık terekelerde reddi miras kararının
              zamanında verilebilmesi bakımından önem taşımaktadır. Gerektiğinde
              mahkeme aracılığıyla tereke tespiti talep edilebilmektedir.
            </p>

            <h3>3. Paylaşım: Anlaşma veya Dava</h3>
            <p>
              Mirasçılar, tereke üzerinde anlaşarak miras paylaşım sözleşmesi
              yapabilmektedir. Anlaşma sağlanamazsa paylaşım; miras taksim
              davası veya ortaklığın giderilmesi davası yoluyla mahkeme
              eliyle gerçekleştirilmektedir. Bu aşamada saklı pay ihlali veya
              mal kaçırma iddiası varsa tenkis ve muris muvazaasına dayalı
              davalar da gündeme gelebilmektedir.
            </p>

            <h3>4. Karar ve Kanun Yolları</h3>
            <p>
              Yargılamanın sonunda mahkeme, paylaşıma veya ileri sürülen
              taleplere ilişkin kararını vermektedir. Karara karşı istinaf
              yoluna, kanunda öngörülen hâllerde ise temyiz yoluna
              başvurulabilmektedir. Kanun yolu başvuruları süreye tabi
              olduğundan sürelerin takibi önem taşımaktadır. Kesinleşen
              kararın ardından tapu devri, hesapların paylaştırılması gibi
              infaz işlemleri gerçekleştirilmektedir.
            </p>

            <p>
              Miras uyuşmazlıkları çoğu zaman aile bireyleri arasında
              yaşandığından, sürecin yalnızca hukuki değil kişisel yönü de
              bulunmaktadır. Büromuz; mümkün olan hâllerde tarafların anlaşma
              yoluyla sonuca ulaşmasını gözeten, anlaşmanın mümkün olmadığı
              durumlarda ise dava sürecini titizlikle yürüten bir yaklaşım
              benimsemektedir.
            </p>
          </div>

          {/* Sıkça Sorulan Sorular */}
          <h2 className="mt-14 text-navy-800">Sıkça Sorulan Sorular</h2>
          <div className="mt-6">
            <FaqAccordion items={FAQ} idPrefix="miras-sss" />
          </div>

          {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
          <p className="mt-12 border-t border-line pt-6 text-[14px] italic text-muted">
            {INFO_NOTE}
          </p>
        </div>
      </section>

      {/* İlgili yazılarımız — "miras" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
