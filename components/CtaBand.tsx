import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";

/**
 * Her hizmet sayfasının ve makalenin altındaki çağrı bandı:
 * navy-900 zemin, solda serif başlık, sağda iki buton.
 */
export default function CtaBand() {
  return (
    <section aria-label="İletişime geçin" className="bg-navy-900">
      <div className="container-site flex flex-col items-start gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <h2 className="text-white">Hukuki desteğe mi ihtiyacınız var?</h2>
        <div className="flex flex-wrap gap-3">
          <a href={SITE.telHref} className="btn-primary">
            <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
            Hemen Ara
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
