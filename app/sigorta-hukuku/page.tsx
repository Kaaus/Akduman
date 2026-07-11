import Link from "next/link";
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

const service = getService("sigorta-hukuku")!;

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
    question: "Araç değer kaybı kimden istenir?",
    answer:
      "Araç değer kaybı, kural olarak kazada kusurlu olan tarafın zorunlu mali sorumluluk (trafik) sigortasını düzenleyen sigorta şirketinden talep edilmektedir. Sigorta teminat limitini aşan bir zarar bulunması hâlinde, aşan kısım için kusurlu sürücüye ve aracın işletenine yönelmek de mümkündür. Talebin ileri sürülebilmesi için başvuranın kazada tam kusurlu olmaması gerekmekte; talep edilebilecek tutar, aracın niteliğine ve hasarın kapsamına göre dosya özelinde belirlenmektedir.",
  },
  {
    question: "Sigorta Tahkim Komisyonu'na mı başvurmalı, dava mı açmalı?",
    answer:
      "Her iki yol da hukuken mümkündür. Sigorta Tahkim Komisyonu, sigorta şirketiyle yaşanan uyuşmazlıklarda görece hızlı işleyen bir çözüm yolu sunmakta; mahkeme önünde dava açmak ise özellikle kapsamlı delil incelemesi gerektiren dosyalarda tercih edilebilmektedir. Hangi yolun izleneceği; talep tutarına, tarafların durumuna, delillerin niteliğine ve dosyanın kapsamına göre her somut olayda ayrıca değerlendirilmektedir.",
  },
  {
    question: "Kusur oranına nasıl itiraz edilir?",
    answer:
      "Kaza tespit tutanağında ya da sigorta şirketinin belirlediği kusur dağılımında isabetsizlik bulunduğu düşünülüyorsa, bu belirlemeye karşı itiraz yolları bulunmaktadır. Tutanağa karşı öngörülen usulde itiraz edilebileceği gibi, tahkim veya dava aşamasında kusur incelemesinin yeniden yapılması da talep edilebilmektedir. Kamera kayıtları, tanık beyanları ve bilirkişi incelemesi bu değerlendirmede belirleyici rol oynamaktadır.",
  },
];

export default function SigortaHukukuPage() {
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
            Sigorta hukuku; sigorta şirketi ile sigorta ettiren, sigortalı ve
            zarar gören üçüncü kişiler arasındaki ilişkileri düzenleyen hukuk
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
              Uygulamada bu alandaki uyuşmazlıkların önemli bir bölümünü,
              trafik kazalarından doğan maddi ve bedensel tazminat talepleri
              oluşturmaktadır. Akduman Hukuk Bürosu; trafik kazası tazminatı,
              araç değer kaybı, kasko ve zorunlu mali sorumluluk sigortası
              uyuşmazlıkları ile Sigorta Tahkim Komisyonu başvurularında
              müvekkillerine hukuki destek sağlamaktadır. Bu süreçlerin
              belirli usul ve sürelere tabi olması nedeniyle, işlemlerin en
              başından itibaren deneyimli bir avukatla yürütülmesi hak
              kayıplarının önlenmesi bakımından önem taşımaktadır.
            </p>

            {/* ESKİ METİN BURAYA: kullanıcı canlı siteden yapıştıracak — gelince girişle harmanla */}

            <h2 id="hizmetler">Sigorta Hukuku Kapsamında Verdiğimiz Hizmetler</h2>
            <p>
              Büromuz; kazanın hemen sonrasındaki belge toplama aşamasından
              sigorta şirketine başvuruya, tahkim ve dava süreçlerinden
              tahsilat aşamasına kadar sürecin bütününde hukuki destek
              sağlamaktadır. Bu kapsamda takip edilen başlıca konular
              şunlardır:
            </p>
            <ul>
              <li>
                <strong>Trafik kazası kaynaklı maddi ve bedensel tazminat:</strong>{" "}
                Kazada araçta ve eşyada meydana gelen zararlar ile yaralanma
                hâlinde gündeme gelen tedavi giderleri ve çalışma gücü kaybına
                ilişkin taleplerin takibidir. Yaralanmalı kazalarda talep
                edilebilecek kalemler{" "}
                <Link href="/yaralanmali-trafik-kazasi-tazminati/">
                  Yaralanmalı Trafik Kazası Tazminatı
                </Link>{" "}
                başlıklı yazımızda ayrıntılı olarak ele alınmaktadır.
              </li>
              <li>
                <strong>Araç değer kaybı:</strong> Kaza sonrasında onarılan
                aracın ikinci el piyasa değerinde meydana gelen azalmanın
                talep edilmesidir. Konunun ayrıntıları için{" "}
                <Link href="/arac-deger-kaybi-nedir/">
                  Araç Değer Kaybı Nedir? Nasıl Talep Edilir?
                </Link>{" "}
                başlıklı yazımız incelenebilir.
              </li>
              <li>
                <strong>Sigorta Tahkim Komisyonu başvuruları:</strong> Sigorta
                şirketinin başvuruyu reddetmesi ya da eksik ödeme yapması
                hâlinde Komisyon nezdinde uyuşmazlığın çözümü için başvuru
                hazırlanması ve sürecin takibidir; usul{" "}
                <Link href="/sigorta-tahkim-komisyonu-basvurusu/">
                  Sigorta Tahkim Komisyonu Başvurusu
                </Link>{" "}
                başlıklı yazımızda anlatılmaktadır.
              </li>
              <li>
                <strong>Kusur oranına itiraz:</strong> Tutanakta veya sigorta
                şirketinin değerlendirmesinde belirlenen kusur dağılımının
                somut olaya uygun olmadığı hâllerde itiraz süreçlerinin
                yürütülmesidir; ayrıntılar için{" "}
                <Link href="/kusur-oranina-itiraz/">Kusur Oranına İtiraz</Link>{" "}
                başlıklı yazımıza bakılabilir.
              </li>
              <li>
                <strong>
                  Kasko ve zorunlu mali sorumluluk sigortası (ZMSS)
                  uyuşmazlıkları:
                </strong>{" "}
                Poliçe kapsamındaki teminatların ödenmemesi, eksik ödenmesi
                veya teminat dışı bırakma gerekçelerinin hukuka uygun olmaması
                hâlinde ortaya çıkan uyuşmazlıkların takibidir. Bu tür
                dosyalarda poliçe hükümleri ile genel şartların birlikte
                değerlendirilmesi gerekmektedir.
              </li>
            </ul>
            <p>
              Sayılan konuların yanı sıra; ölümlü trafik kazalarında destekten
              yoksun kalma taleplerinin takibi ile sigorta şirketleriyle
              yürütülen görüşme süreçlerinde de hukuki destek verilmektedir.
            </p>

            {/* Zamanaşımı/hak-kaybı cümlesi mevcut metinden Callout'a taşındı */}
            <Callout variant="uyari">
              <p>
                Sigorta uyuşmazlıklarına ilişkin talepler zamanaşımı sürelerine
                tabi olduğundan, kazanın ardından vakit kaybetmeden hukuki
                değerlendirme yapılması hak kayıplarının önlenmesi bakımından
                önem taşımaktadır.
              </p>
            </Callout>

            <h2 id="surec">Tazminat Süreci Nasıl İşler?</h2>
            <ProcessSteps
              steps={[
                {
                  title: "Belge Toplama",
                  body: (
                    <p>
                      Sürecin sağlıklı ilerlemesi, dosyanın belgelerle doğru
                      biçimde kurulmasına bağlıdır. Kaza tespit tutanağı, hasar
                      ve ekspertiz raporları, araç fotoğrafları, poliçe örneği
                      ile yaralanmalı kazalarda hastane kayıtları bu aşamada
                      toplanmaktadır. Tutanağın niteliği ve düzenlenme biçimi
                      hakkında{" "}
                      <Link href="/kaza-tespit-tutanagi-nedir/">
                        Kaza Tespit Tutanağı Nedir?
                      </Link>{" "}
                      başlıklı yazımızda bilgi verilmektedir.
                    </p>
                  ),
                },
                {
                  title: "Sigorta Şirketine Zorunlu Başvuru",
                  body: (
                    <p>
                      Karayolları Trafik Kanunu (KTK) kapsamında, dava
                      açılmadan veya tahkim yoluna gidilmeden önce ilgili
                      sigorta şirketine yazılı başvuru yapılması gerekmektedir.
                      Sigorta şirketi, başvuruyu öngörülen süre içinde
                      değerlendirerek ödeme yapmakta, kısmen ödemekte ya da
                      reddetmektedir. Başvurunun eksiksiz belgelerle yapılması,
                      sonraki aşamaların seyri bakımından önem taşımaktadır.
                    </p>
                  ),
                },
                {
                  title: "Tahkim veya Dava Aşaması",
                  body: (
                    <p>
                      Sigorta şirketinin başvuruya olumsuz yanıt vermesi ya da
                      eksik ödeme yapması hâlinde, uyuşmazlık Sigorta Tahkim
                      Komisyonu'na taşınabilmekte veya mahkeme önünde dava
                      açılabilmektedir. Bu aşamada kusur ve zarar hesabına
                      ilişkin bilirkişi incelemeleri yapılmakta, taraflar iddia
                      ve savunmalarını sunmaktadır. Hangi yolun izleneceği
                      dosyanın özelliklerine göre değerlendirilmektedir.
                    </p>
                  ),
                },
                {
                  title: "Karar, Tahsilat ve Kanun Yolları",
                  body: (
                    <p>
                      Tahkim veya yargılama sonucunda verilen kararla
                      belirlenen tutarın tahsili için gerekli işlemler
                      yürütülmektedir. Karara karşı, tutara ve kararın
                      niteliğine göre itiraz ve kanun yolu başvuruları gündeme
                      gelebilmektedir.
                    </p>
                  ),
                },
              ]}
            />

            {/* Süre/hak-kaybı cümlesi mevcut metinden Callout'a taşındı */}
            <Callout variant="uyari">
              <p>
                Bu başvurular süreye tabi olduğundan sürelerin takibi önem
                taşımaktadır.
              </p>
            </Callout>

            <h2 id="sss">Sıkça Sorulan Sorular</h2>
            <Reveal>
              <FaqAccordion items={FAQ} idPrefix="sigorta-sss" />
            </Reveal>

            {/* Bilgilendirme notu — tüm hizmet sayfalarında aynı */}
            <p className="mt-12 border-t border-line-strong pt-6 text-[14px] italic text-muted">
              {INFO_NOTE}
            </p>
          </div>

          <TocRail items={TOC} />
        </div>
      </section>

      {/* İlgili yazılarımız — "sigorta" etiketli makale yoksa blok gizlenir */}
      <RelatedArticles alan={service.alan} />

      <CtaBand />
    </>
  );
}
