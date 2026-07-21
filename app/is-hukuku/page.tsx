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

const service = getService("is-hukuku")!;

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
    question: "İşe iade davasının şartları nelerdir?",
    answer:
      "İşe iade talebinde bulunulabilmesi için işçinin belirsiz süreli bir iş sözleşmesiyle çalışıyor olması, işyerinde en az altı aylık kıdeminin bulunması ve işyerinde otuz veya daha fazla işçi çalıştırılması gerekmektedir. Ayrıca iş sözleşmesinin işveren tarafından geçerli bir neden gösterilmeksizin feshedilmiş olması aranmaktadır. İşe iade talebi katı sürelere tabi olduğundan, fesih bildiriminin tebliğinden itibaren kanunda öngörülen süre içinde arabulucuya başvurulması gerekmektedir.",
  },
  {
    question: "Arabuluculuk zorunlu mu?",
    answer:
      "İşçilik alacakları, tazminat talepleri ve işe iade talepleri bakımından dava açmadan önce arabulucuya başvurulması bir dava şartıdır; arabulucuya başvurulmadan açılan davalar usulden reddedilmektedir. Buna karşılık iş kazası veya meslek hastalığından kaynaklanan maddi ve manevi tazminat davaları bu zorunluluğun kapsamı dışındadır. Arabuluculuk aşamasında anlaşma sağlanamazsa düzenlenen son tutanakla birlikte dava yoluna geçilebilmektedir.",
  },
  {
    question: "Kıdem tazminatına hangi hâllerde hak kazanılır?",
    answer:
      "Kıdem tazminatına hak kazanılabilmesi için kural olarak aynı işverene bağlı en az bir yıllık çalışmanın bulunması ve iş sözleşmesinin kanunda öngörülen hâllerden biriyle sona ermesi gerekmektedir. İş sözleşmesinin işveren tarafından haklı bir neden olmaksızın feshi, işçinin haklı nedenle feshi, emeklilik, erkek işçinin muvazzaf askerlik hizmeti ve kadın işçinin evlilik tarihinden itibaren bir yıl içinde sözleşmeyi sona erdirmesi bu hâller arasında sayılmaktadır. Her somut olayda hak kazanma koşullarının ayrıca değerlendirilmesi gerekmektedir.",
  },
];

export default function IsHukukuPage() {
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

      <ServiceHero
        service={service}
        image={IMAGES.adaletBakanligi}
        objectPosition="center 30%"
      >
        İş hukuku; işçi ile işveren arasındaki iş ilişkisini, tarafların
        karşılıklı hak ve yükümlülüklerini ve iş sözleşmesinin
        kurulmasından sona ermesine kadar geçen süreci düzenleyen hukuk
        dalıdır.
      </ServiceHero>

      {/* Gövde: 70ch + sağda TocRail */}
      <section className="bg-white">
        <div className="container-site flex gap-14 py-12 md:py-16">
          <div className="article-body min-w-0 max-w-[70ch]">
            {/* Giriş (kalan cümleler) — lead stili */}
            <p className="lead">
              Akduman Hukuk Bürosu; işçi ve işveren taraflarının karşı karşıya
              geldiği uyuşmazlıklarda dava ve arabuluculuk süreçlerinin takibi
              ile hukuki danışmanlık hizmeti sunmaktadır. İşçilik alacakları
              ve işe iade talepleri; katı sürelere, ispat kurallarına ve
              zorunlu arabuluculuk gibi usul koşullarına bağlı olduğundan,
              sürecin en başından itibaren deneyimli bir avukatla yürütülmesi
              hak kayıplarının önlenmesi bakımından önem taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2 id="hizmetler">İş Hukuku Kapsamında Verdiğimiz Hizmetler</h2>
            <p>
              Büromuz; iş sözleşmesinin hazırlanmasından feshin ardından doğan
              uyuşmazlıkların çözümüne kadar iş ilişkisinin tüm aşamalarında
              müvekkillerine hukuki destek sağlamaktadır. Bu kapsamda takip
              edilen başlıca konular şunlardır:
            </p>
            <ul>
              <li>
                <strong>Kıdem ve ihbar tazminatı:</strong> İş sözleşmesinin
                sona erme biçimine göre işçinin kıdem tazminatına, bildirim
                sürelerine uyulmaması hâlinde ise taraflardan birinin ihbar
                tazminatına hak kazanıp kazanmadığının değerlendirilmesi ve bu
                alacakların takibidir.
              </li>
              <li>
                <strong>İşe iade davaları:</strong> İş sözleşmesi geçerli bir
                neden gösterilmeksizin feshedilen ve iş güvencesi kapsamında
                bulunan işçinin işe iadesinin talep edilmesine ilişkin
                süreçlerdir; başvuru süreleri bakımından dikkat
                gerektirmektedir.
              </li>
              <li>
                <strong>İşçilik alacakları:</strong> Fazla mesai ücreti,
                kullanılmayan yıllık izin ücreti, ödenmeyen ücret ile ulusal
                bayram ve genel tatil çalışmalarından doğan alacakların
                hesaplanması ve tahsiline yönelik süreçlerdir.
              </li>
              <li>
                <strong>Mobbing (işyerinde psikolojik taciz):</strong> İşçinin
                işyerinde sistematik biçimde yıldırılmasına yönelik
                davranışlar; belirli koşullarda işçiye sözleşmeyi haklı
                nedenle feshetme ve tazminat talep etme imkânı
                tanıyabilmektedir.
              </li>
              <li>
                <strong>İş kazası:</strong> İş kazasından kaynaklanan maddi ve
                manevi tazminat talepleri ile kazaya bağlı sigorta ve kurum
                süreçlerinin takibidir.
              </li>
              <li>
                <strong>Zorunlu arabuluculuk süreçleri:</strong> İşçilik
                alacakları ve işe iade taleplerinde dava öncesinde yürütülmesi
                gereken arabuluculuk görüşmelerinde tarafların temsili ve
                sürecin takibidir.
              </li>
            </ul>
            <p>
              İşe iade talebinin koşulları ve süreleri hakkında ayrıntılı
              bilgiye{" "}
              <Link href="/ise-iade-davasi-nedir/">İşe İade Davası Nedir?</Link>{" "}
              başlıklı makalemizden ulaşabilirsiniz.
            </p>

            <h2 id="surec">İş Davaları Süreci Nasıl İşler?</h2>
            <p>
              İş uyuşmazlıkları, türüne göre farklılık göstermekle birlikte
              genellikle birbirini izleyen dört aşamada ilerlemektedir. Her
              aşamanın kendine özgü süreleri ve usul kuralları bulunduğundan,
              aşağıdaki akış genel bir çerçeve sunmakta olup somut dosyanın
              seyri olayın özelliklerine göre değişebilmektedir.
            </p>
            <ProcessSteps
              steps={[
                {
                  title: "Değerlendirme ve Belge Toplama",
                  body: (
                    <p>
                      Süreç, iş ilişkisinin ve fesih koşullarının hukuki
                      açıdan değerlendirilmesiyle başlamaktadır. Bu aşamada iş
                      sözleşmesi, ücret bordroları, fesih bildirimi, mesai
                      kayıtları ve yazışmalar gibi belgeler toplanmakta; talep
                      edilebilecek alacak kalemleri belirlenmektedir. İş
                      davalarında ispat büyük ölçüde belgeye ve tanık beyanına
                      dayandığından bu hazırlık, sürecin ilerleyen aşamalarını
                      doğrudan etkilemektedir.
                    </p>
                  ),
                },
                {
                  title: "Zorunlu Arabuluculuk Başvurusu",
                  body: (
                    <p>
                      İşçilik alacakları ve işe iade taleplerinde dava
                      açılmadan önce arabulucuya başvurulması bir dava
                      şartıdır. Arabuluculuk görüşmelerinde taraflar, bir
                      anlaşma zeminini tarafsız bir arabulucu eşliğinde
                      müzakere etmektedir. Anlaşma sağlanırsa düzenlenen belge
                      taraflar bakımından bağlayıcı olmakta; anlaşma
                      sağlanamazsa son tutanakla birlikte dava yolu
                      açılmaktadır.
                    </p>
                  ),
                },
                {
                  title: "Dava Aşaması",
                  body: (
                    <p>
                      Arabuluculukta anlaşma sağlanamaması hâlinde uyuşmazlık,
                      iş mahkemesi önüne taşınmaktadır. Yargılama sırasında
                      tanıklar dinlenmekte, işyeri kayıtları ve bordrolar
                      incelenmekte; alacak kalemleri genellikle bilirkişi
                      tarafından hazırlanan hesap raporuyla belirlenmektedir.
                      Taraflar, rapora karşı itirazlarını sunarak hesaplamanın
                      dosya kapsamına uygunluğunun denetlenmesini
                      isteyebilmektedir.
                    </p>
                  ),
                },
                {
                  title: "Karar ve Kanun Yolları",
                  body: (
                    <p>
                      Yargılamanın sonunda mahkeme, talepler hakkında kabul
                      veya ret yönünde karar vermektedir. Verilen karara karşı
                      kanunda öngörülen koşullarla istinaf yoluna, istinaf
                      incelemesinden geçen kararlara karşı ise belirli
                      hâllerde temyiz yoluna başvurulabilmektedir.
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

            {/* Zamanaşımı cümlesi mevcut metinden Callout'a taşındı */}
            <Callout variant="uyari">
              <p>
                İşçilik alacaklarının bir bölümü zamanaşımı sürelerine tabi
                olduğundan, uyuşmazlığın öğrenilmesinden itibaren vakit
                kaybetmeden hukuki değerlendirme yapılması önem taşımaktadır.
              </p>
            </Callout>

            <p>
              Büromuz; sürecin her aşamasında müvekkillerini dosyanın durumu,
              olası seçenekler ve izlenecek yol hakkında düzenli olarak
              bilgilendirmektedir.
            </p>

            <h2 id="sss">Sıkça Sorulan Sorular</h2>
            <Reveal>
              <FaqAccordion items={FAQ} idPrefix="is-sss" />
            </Reveal>

            {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
            <p className="mt-12 border-t border-line-strong pt-6 text-[14px] italic text-muted">
              {INFO_NOTE}
            </p>
          </div>

          <TocRail items={TOC} />
        </div>
      </section>

      {/* İlgili yazılarımız — "is" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
