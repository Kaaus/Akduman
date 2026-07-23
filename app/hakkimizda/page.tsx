import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PageHeading from "@/components/PageHeading";
import PhotoSurface from "@/components/PhotoSurface";
import Reveal from "@/components/Reveal";
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
        <div className="container-site pt-8">
          <PageHeading crumbs={[{ label: "Hakkımızda" }]} title="Hakkımızda" />
        </div>
      </section>

      {/* Avukat kartı — sıralamada YUKARI taşındı (H1'in hemen ardından) */}
      <section className="border-t border-line bg-paper">
        <div className="container-site py-12">
          <Reveal>
            {/* Avukat kartı — v2 kart stili + canlı (framed) çerçeveli portre.
                Kaynak fotoğrafın gerçek oranı (1402×1122 ≈ 5:4) birebir
                kullanılır — kırpım yok. Görsel sütunu ~%45 pay alır, 560px'te
                sınırlanır (md:max-w-[560px]); kartın kendisi de genişledi
                (max-w-4xl → max-w-5xl). */}
            <div className="card grid items-center gap-10 p-6 md:grid-cols-[45fr_55fr] md:p-10 md:max-w-5xl">
              <PhotoSurface
                image={IMAGES.avukat}
                variant="framed"
                aspectRatio="5/4"
                sizes="(max-width: 768px) 100vw, 560px"
                className="md:max-w-[560px]"
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
                  Akduman Hukuk Bürosu, Ankara&rsquo;da siz değerli
                  müvekkiller için Ceza Hukuku, Gayrimenkul Hukuku, Sigorta
                  Hukuku, Ticaret ve Şirketler Hukuku, Rekabet Hukuku ve diğer
                  tüm hukuki alanlarda hukuki danışmanlık ve avukatlık
                  hizmeti vermektedir.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Büro tanıtımı — sıralamada AŞAĞI taşındı (avukat kartından sonra) */}
      <section className="border-t border-line bg-white">
        <div className="container-site py-12">
          {/* Fotosuz tek sütun düzeni: kicker+başlık+iki paragraf+imza bloğu
              mx-auto max-w-3xl içinde ortalanmış bir blok olarak durur,
              ama İÇERİK (metin) her zamanki gibi sola hizalıdır — yalnız
              sayfanın üst BAŞLIK bloğu (PageHeading/H1) merkez hizalı kalır. */}
          <div className="mx-auto max-w-3xl">
            {/* Gövde metni birebir — onaylı reklam yasağı düzeltmeleri uygulanmış hâli */}
            <p className="kicker">Hakkımızda</p>
            <h2 className="mt-2">Akduman Hukuk Bürosu</h2>
            <div className="mt-3 space-y-2">
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
            <div className="mt-3 border-l-[3px] border-bronze-500 pl-5">
              <p className="font-serif text-[20px] font-semibold text-ink-strong">
                {SITE.lawyer}
              </p>
              <p className="mt-1 text-[15px] text-muted">
                Ankara Barosu
                {/* Sicil yalnızca {{BARO_SICIL_NO}} doluysa eklenir */}
                {PLACEHOLDERS.BARO_SICIL_NO &&
                  ` — Sicil No: ${PLACEHOLDERS.BARO_SICIL_NO}`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
