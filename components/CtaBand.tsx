import { ArrowRight, Phone } from "lucide-react";
import PhotoSurface from "@/components/PhotoSurface";
import { IMAGES, SITE } from "@/lib/site";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";

/**
 * Hizmet sayfaları ve makale altlarındaki çağrı bandı:
 * fotoğraf arka planı (cta varyantı, düz koyu duotone) üzerinde solda
 * başlık, sağda koyu zemin buton seti.
 */
export default function CtaBand() {
  return (
    <section aria-label="İletişime geçin" className="relative overflow-hidden bg-navy-950">
      <PhotoSurface image={IMAGES.adaletSarayi} variant="cta" fill sizes="100vw" />
      <div className="container-site relative z-10 flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <h2 className="!text-[#F4F1EA]">Hukuki desteğe mi ihtiyacınız var?</h2>
        <div className="flex flex-wrap gap-3">
          <a href={SITE.telHref} className="btn-primary-dark">
            <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
            Hemen Ara
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" className="btn-arrow" />
          </a>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-dark"
          >
            <WhatsAppIcon size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
