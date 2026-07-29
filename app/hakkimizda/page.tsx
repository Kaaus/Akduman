import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PageHeading from "@/components/PageHeading";
import PhotoSurface from "@/components/PhotoSurface";
import Reveal from "@/components/Reveal";
import { breadcrumbSchema, buildMetadata, personSchema } from "@/lib/seo";
import { IMAGES, PLACEHOLDERS, SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Hakkımızda | Akduman Hukuk ve Danışmanlık – Ankara",
  description:
    "Akduman Hukuk ve Danışmanlık ile Av. Samed Akduman hakkında bilgi alın. Ankara Çankaya'da avukatlık ve hukuki danışmanlık hizmetleri.",
  path: "/hakkimizda/",
});

export default function HakkimizdaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hakkımızda", path: "/hakkimizda/" },
        ])}
      />
      <JsonLd data={personSchema()} />

      <section className="bg-white">
        <div className="container-site pt-8">
          <PageHeading crumbs={[{ label: "Hakkımızda" }]} title="Hakkımızda" />
        </div>
      </section>

      {/* Büro tanıtımı — sıralamada YUKARI taşındı (H1'in hemen ardından,
          avukat kartından ÖNCE). PageHeading'le aynı zeminde (bg-white)
          olduğundan aralarına border-t EKLENMEDİ (kod tabanındaki kural:
          border-t yalnız zemin rengi değişiminde kullanılır). */}
      <section className="bg-white">
        {/* pt YOK: PageHeading kendi pb-9'uyla H1→içerik boşluğunu zaten
            sağlıyor; iki ayrı üst boşluk üst üste binmesin diye yalnız
            pb-12 kaldı. */}
        <div className="container-site pb-12">
          {/* Fotosuz tek sütun düzeni: kicker+başlık+iki paragraf+imza bloğu
              sola yaslıdır — container-site'ın sol hizasından başlar (Vizyon
              & Misyon ve avukat kartı konteynerleriyle AYNI hiza); yalnız
              sayfanın üst BAŞLIK bloğu (PageHeading/H1) merkez hizalı kalır.
              Okunabilirlik için max-w-3xl korunur. */}
          <div className="max-w-3xl">
            {/* Gövde metni birebir — onaylı reklam yasağı düzeltmeleri uygulanmış hâli */}
            <p className="kicker">Hakkımızda</p>
            <h2 className="mt-2">Akduman Hukuk ve Danışmanlık</h2>
            <div className="mt-3 space-y-2">
              <p>
                <strong>Akduman Hukuk ve Danışmanlık</strong>, Ankara&rsquo;da
                faaliyet gösteren, hukukun temel ilkelerine bağlı ve
                müvekkil odaklı yaklaşımı benimseyen bir hukuk bürosudur.
                Bireysel ve kurumsal müvekkillerimize, dava takibi, hukuki
                danışmanlık ve sözleşme yönetimi gibi birçok alanda
                titizlikle hizmet vermekteyiz. Amacımız, her
                müvekkilimizin ihtiyacına özel, şeffaf ve güvenilir bir
                hukuk hizmeti sunarak haklarını en güçlü şekilde
                savunmaktır.
              </p>
              <p>
                Akduman Hukuk ve Danışmanlık&rsquo;ın kurucusu olan{" "}
                <strong>Av. Samed Akduman</strong> öncülüğünde
                müvekkillerine özenli, hızlı ve çözüm odaklı hizmet sunma
                amacı ile faaliyetlerini sürdürmektedir.
              </p>
            </div>

            {/* İmza bloğu — sol 3px bronz çizgi */}
            <div className="mt-3 border-l-[3px] border-bronze-500 pl-5">
              <p className="font-serif text-[1.25rem] font-semibold text-ink-strong">
                {SITE.lawyer}
              </p>
              <p className="mt-1 text-[0.9375rem] text-muted">
                Ankara Barosu
                {/* Sicil yalnızca {{BARO_SICIL_NO}} doluysa eklenir */}
                {PLACEHOLDERS.BARO_SICIL_NO &&
                  ` — Sicil No: ${PLACEHOLDERS.BARO_SICIL_NO}`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vizyon & Misyon — intro/imza bloğunun ALTINDA, avukat kartının
          ÜSTÜNDE. Aynı zeminde (bg-white) olduğundan üstteki bölümle
          arasına border-t eklenmedi; avukat kartı bölümü zemin
          değiştirdiğinden (paper) kendi border-t'sini korur. */}
      <section className="bg-white">
        <div className="container-site pb-16">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border border-line-strong border-l-[3px] border-l-bronze-500 bg-paper p-6 md:p-8">
                <p className="kicker text-bronze-700">VİZYON</p>
                <p className="mt-3 text-ink">
                  Hukuki bilgi ve deneyimi güven, şeffaflık ve etik değerlerle
                  birleştirerek ulusal ölçekte tercih edilen, saygın ve çözüm
                  odaklı bir hukuk bürosu olmak.
                </p>
              </div>
              <div className="border border-line-strong border-l-[3px] border-l-bronze-500 bg-paper p-6 md:p-8">
                <p className="kicker text-bronze-700">MİSYON</p>
                <p className="mt-3 text-ink">
                  Müvekkillerimizin hukuki ihtiyaçlarını doğru analiz ederek
                  etkin, sürdürülebilir ve sonuç odaklı çözümler üretmek;
                  hukukun üstünlüğü ve meslek etiği çerçevesinde yüksek
                  standartlarda avukatlık hizmeti sunmak.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Avukat kartı — sıralamada AŞAĞI taşındı (en altta, tanıtımdan
          sonra); scroll ile gelir, fold hedefine dahil değil. */}
      <section className="border-t border-line bg-paper">
        <div className="container-site py-12">
          <Reveal>
            {/* Avukat kartı — v2 kart stili + canlı (framed) çerçeveli portre.
                Kaynak fotoğrafın gerçek oranı (1167×993 ≈ 1.18:1) birebir
                kullanılır — kırpım yok. Görsel sütunu ~%45 pay alır, 560px'te
                sınırlanır (md:max-w-[560px]); kartın kendisi de genişledi
                (max-w-4xl → max-w-5xl). */}
            <div className="card grid items-center gap-10 p-6 md:grid-cols-[45fr_55fr] md:p-10 md:max-w-5xl">
              <PhotoSurface
                image={IMAGES.avukat}
                variant="framed"
                aspectRatio="1167/993"
                sizes="(max-width: 768px) 100vw, 560px"
                className="md:max-w-[560px]"
              />
              <div>
                <h2>{SITE.lawyer}</h2>
                {/* Sicil satırı yalnızca {{BARO_SICIL_NO}} doluysa basılır */}
                {PLACEHOLDERS.BARO_SICIL_NO && (
                  <p className="mt-2 text-[0.9375rem] font-semibold text-bronze-700">
                    Ankara Barosu — Sicil No: {PLACEHOLDERS.BARO_SICIL_NO}
                  </p>
                )}
                {/* Biyografi — birebir (müşteri onaylı) */}
                <div className="mt-4 space-y-3 text-muted">
                  <p>
                    Hacettepe Üniversitesi Hukuk Fakültesi mezunu olan Av.
                    Samed Akduman, Ankara&rsquo;da faaliyet gösteren Akduman
                    Hukuk ve Danışmanlık&rsquo;ın kurucusudur. Başta gayrimenkul
                    hukuku, ceza hukuku ve sigorta hukuku olmak üzere çeşitli
                    hukuk alanlarında bireysel ve kurumsal müvekkillerine
                    danışmanlık ve avukatlık hizmeti sunmaktadır.
                  </p>
                  <p>
                    İngilizce dilinde de hukuki iletişim kurabilen Av. Samed
                    Akduman, yerli ve yabancı gerçek kişiler ile şirketlere
                    danışmanlık ve dava takibi hizmeti sunmaktadır.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
