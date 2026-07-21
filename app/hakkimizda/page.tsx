import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PageHeading from "@/components/PageHeading";
import PhotoSurface from "@/components/PhotoSurface";
import Reveal from "@/components/Reveal";
import SiteImage from "@/components/SiteImage";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { IMAGES, PLACEHOLDERS, SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Hakkımızda | Akduman Hukuk Bürosu – Ankara",
  description:
    "Akduman Hukuk Bürosu ve Av. Samed Akduman hakkında bilgi alın. Ankara Çankaya'da avukatlık ve hukuki danışmanlık hizmetleri.",
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

      <section className="bg-white">
        <div className="container-site pt-10 pb-12 md:pb-16">
          <PageHeading crumbs={[{ label: "Hakkımızda" }]} title="Hakkımızda" />

          {/* Onaylı düzen: SOLDA çerçeveli anitkabir görseli (dikey ~1:1.1),
              SAĞDA kicker + serif başlık + mevcut iki paragraf + imza bloğu.
              Mobilde görsel üstte, metin altta (grid akışı zaten böyle).
              Üst boşluk PageHeading'in kendi pb-12'sinden gelir. */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <PhotoSurface
              image={IMAGES.anitkabir}
              variant="framed"
              aspectRatio="1/1.1"
              sizes="(max-width: 768px) 90vw, 38vw"
            />
            {/* Gövde metni birebir — onaylı reklam yasağı düzeltmeleri uygulanmış hâli */}
            <div>
              <p className="kicker">Hakkımızda</p>
              <h2 className="mt-3">Akduman Hukuk Bürosu</h2>
              <div className="mt-6 max-w-[70ch] space-y-5">
                <p>
                  <strong>Akduman Hukuk Bürosu</strong>, Ankara&rsquo;da
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
                  Akduman Hukuk Bürosunun kurucusu olan{" "}
                  <strong>Av. Samed Akduman</strong> öncülüğünde
                  müvekkillerine özenli, hızlı ve çözüm odaklı hizmet sunma
                  amacı ile faaliyetlerini sürdürmektedir.
                </p>
              </div>

              {/* İmza bloğu — sol 3px bronz çizgi */}
              <div className="mt-8 border-l-[3px] border-bronze-500 pl-5">
                <p className="font-serif text-[20px] font-semibold text-ink-strong">
                  {SITE.lawyer}
                </p>
                <p className="mt-1 text-[15px] text-muted">
                  Ankara Barosu
                  {/* Sicil yalnızca {{BARO_SICIL_NO}} doluysa eklenir */}
                  {PLACEHOLDERS.BARO_SICIL_NO &&
                    ` — Sicil No: ${PLACEHOLDERS.BARO_SICIL_NO}`}
                </p>
                <p className="mt-3 text-ink">
                  Akduman Hukuk Bürosu, Ankara&rsquo;da siz değerli
                  müvekkiller için Ceza Hukuku, Gayrimenkul Hukuku, Sigorta
                  Hukuku ve diğer tüm hukuki alanlarda hukuki danışmanlık ve
                  avukatlık hizmeti vermektedir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avukat kartı */}
      <section className="border-t border-line bg-paper">
        <div className="container-site py-16">
          <Reveal>
            {/* Avukat kartı — v2 kart stili + duotone çerçeveli portre */}
            <div className="card grid max-w-4xl items-center gap-10 p-6 md:grid-cols-[280px_1fr] md:p-10">
              <SiteImage
                image={IMAGES.avukat}
                aspectRatio="3/4"
                keyline
                sizes="(max-width: 768px) 100vw, 280px"
                className="m-3"
              />
              <div>
                <h2>{SITE.lawyer}</h2>
                {/* Sicil satırı yalnızca {{BARO_SICIL_NO}} doluysa basılır */}
                {PLACEHOLDERS.BARO_SICIL_NO && (
                  <p className="mt-2 text-[15px] font-semibold text-bronze-700">
                    Ankara Barosu — Sicil No: {PLACEHOLDERS.BARO_SICIL_NO}
                  </p>
                )}
                <p className="mt-4 text-muted">
                  Ankara&rsquo;da avukatlık ve hukuki danışmanlık hizmeti
                  vermektedir.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
