import { Mail, MapPin, Phone } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import PlaceholderImage from "@/components/PlaceholderImage";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";
import { breadcrumbSchema, buildMetadata, contactPageSchema } from "@/lib/seo";
import { PLACEHOLDERS, SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "İletişim | Akduman Hukuk Bürosu – Çankaya, Ankara",
  description:
    "Akduman Hukuk Bürosu iletişim bilgileri: adres, telefon ve iletişim formu. Çankaya/Ankara. ☎ +90 534 089 10 70",
  path: "/iletisim/",
});

export default function IletisimPage() {
  return (
    <>
      <JsonLd data={contactPageSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "İletişim", path: "/iletisim/" },
        ])}
      />

      <section className="bg-white">
        <div className="container-site py-12 md:py-16">
          <Breadcrumb items={[{ label: "İletişim" }]} />
          <h1 className="mt-6 text-navy-800">İletişim</h1>

          <div className="mt-10 grid gap-14 lg:grid-cols-[2fr_3fr]">
            {/* Sol sütun: iletişim bilgileri */}
            <div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <MapPin size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-bronze-500" aria-hidden="true" />
                  <div>
                    <p className="text-[14px] font-semibold text-navy-800">Adres</p>
                    <p className="mt-1 text-muted">{SITE.address.full}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-bronze-500" aria-hidden="true" />
                  <div>
                    <p className="text-[14px] font-semibold text-navy-800">Telefon</p>
                    <a
                      href={SITE.telHref}
                      className="mt-1 block text-muted transition-colors hover:text-bronze-600"
                    >
                      {SITE.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-bronze-500" aria-hidden="true" />
                  <div>
                    <p className="text-[14px] font-semibold text-navy-800">E-posta</p>
                    <a
                      href={SITE.mailHref}
                      className="mt-1 block text-muted transition-colors hover:text-bronze-600"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </li>
                {/* Çalışma saatleri yalnızca {{CALISMA_SAATLERI}} doluysa basılır */}
                {PLACEHOLDERS.CALISMA_SAATLERI && (
                  <li className="flex gap-4">
                    <span className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-[14px] font-semibold text-navy-800">
                        Çalışma Saatleri
                      </p>
                      <p className="mt-1 text-muted">
                        {PLACEHOLDERS.CALISMA_SAATLERI}
                      </p>
                    </div>
                  </li>
                )}
              </ul>

              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary mt-9"
              >
                <WhatsAppIcon size={16} />
                WhatsApp ile Yazın
              </a>
            </div>

            {/* Sağ sütun: form (anasayfadakiyle aynı komponent) */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Tam genişlik harita — {{HARITA_EMBED_URL}} boşsa placeholder */}
      <section aria-label="Konum" className="border-t border-line">
        {PLACEHOLDERS.HARITA_EMBED_URL ? (
          <iframe
            src={PLACEHOLDERS.HARITA_EMBED_URL}
            title="Akduman Hukuk Bürosu konumu"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[420px] w-full border-0"
          />
        ) : (
          <PlaceholderImage
            alt="Akduman Hukuk Bürosu konum haritası"
            aspectRatio="16/6"
            className="border-0"
          />
        )}
      </section>
    </>
  );
}
