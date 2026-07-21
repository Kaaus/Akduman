import { ArrowRight, Phone } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import PhotoSurface from "@/components/PhotoSurface";
import { SITE, type ImageEntry, type Service } from "@/lib/site";

/**
 * Hizmet sayfalarının dar koyu şerit-hero'su — 8 sayfanın TEK kaynağı.
 *
 * Daha önce bu blok sekiz sayfaya birebir kopyalanmıştı; sayfalar zamanla
 * birbirinden ayrışabildiği için (header/footer'da yaşanan soruna benzer
 * şekilde) tek bileşene indirildi. Sayfaya özgü olan yalnızca üç şeydir:
 * bant fotoğrafı, fotoğrafın kırpım noktası ve lead cümlesi.
 *
 * Başlık bloğu site geneli kurala uygun olarak MERKEZ hizalıdır (yalnız
 * anasayfa hero'su bu kuralın dışındadır); PhotoSurface'in "band" scrim'i
 * de buna eşlik edecek şekilde simetriktir (bkz. PhotoSurface).
 */
export default function ServiceHero({
  service,
  image,
  objectPosition,
  children,
}: {
  service: Service;
  image: ImageEntry;
  objectPosition?: string;
  /** Lead cümlesi — sayfa metinleri birebir korunduğu için dışarıdan gelir. */
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <PhotoSurface
        image={image}
        variant="band"
        fill
        objectPosition={objectPosition}
        sizes="100vw"
      />
      {/* Dikey py simetrik tutulur (top=bottom) → bant yüksekliği ne olursa
          olsun başlık bloğu kendiliğinden dikey ortalanır. Değer PageHeading
          diyetiyle aynı oranda ~%15 kısaltıldı (40/56px → 32/48px). */}
      <div className="container-site relative z-10 py-8 md:py-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Breadcrumb
            variant="dark"
            items={[
              { label: "Faaliyet Alanlarımız", href: "/faaliyet-alanlarimiz/" },
              { label: service.title },
            ]}
          />
          <h1 className="mt-5 !text-[#F4F1EA]">{service.h1}</h1>
          {/* Lead: mevcut giriş metninin ilk cümlesi */}
          <p className="mt-4 text-[20px] leading-relaxed text-[#F4F1EA]/85">
            {children}
          </p>
          <a href={SITE.telHref} className="btn-tertiary-dark mt-5">
            <Phone size={15} strokeWidth={1.5} aria-hidden="true" />
            Hemen Ara
            <ArrowRight
              size={15}
              strokeWidth={1.5}
              aria-hidden="true"
              className="btn-arrow"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
