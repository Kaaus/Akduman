import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
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
        <div className="container-site py-12 md:py-16">
          <Breadcrumb items={[{ label: "Hakkımızda" }]} />
          <h1 className="mt-6">Hakkımızda</h1>

          <div className="mt-8 grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
            <PhotoSurface
              image={IMAGES.anitkabir}
              variant="framed"
              aspectRatio="3/4"
              sizes="(max-width: 1024px) 100vw, 280px"
            />
            {/* Gövde metni birebir — onaylı reklam yasağı düzeltmeleri uygulanmış hâli */}
            <div className="max-w-[70ch] space-y-5">
              <p>
                Akduman Hukuk Bürosu, Av. Samed Akduman tarafından
                Ankara&rsquo;da kurulmuştur. Büromuz; ceza hukuku, gayrimenkul
                hukuku, aile hukuku, iş hukuku, yabancılar hukuku, miras
                hukuku, sigorta hukuku ve idare hukuku alanlarında
                müvekkillerine özenli, hızlı ve çözüm odaklı hizmet sunma
                amacı gütmektedir.
              </p>
              <p>
                Büromuz, hukuk alanındaki bilgi ve deneyimi ile
                müvekkillerinin hak kayıplarına uğramaması için dava ve
                danışmanlık süreçlerini titizlikle yürütmektedir. Müvekkil
                memnuniyetini ve meslek kurallarına bağlılığı esas alan
                büromuz, süreçlerin her aşamasında müvekkillerini
                bilgilendirmektedir.
              </p>
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
