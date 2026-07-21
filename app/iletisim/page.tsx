import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import PageHeading from "@/components/PageHeading";
import PhotoSurface from "@/components/PhotoSurface";
import PlaceholderImage from "@/components/PlaceholderImage";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";
import { breadcrumbSchema, buildMetadata, contactPageSchema } from "@/lib/seo";
import { IMAGES, PLACEHOLDERS, SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "İletişim | Akduman Hukuk Bürosu – Çankaya, Ankara",
  description:
    "Akduman Hukuk Bürosu iletişim bilgileri: adres, telefon ve iletişim formu. Çankaya/Ankara. ☎ +90 534 089 10 70",
  path: "/iletisim/",
});

/** Panel satırı: hover'da 4px kayar, ikon bronz parlar. */
function PanelRow({
  icon,
  label,
  children,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  href?: string;
}) {
  const inner = (
    <span className="flex gap-4">
      <span
        aria-hidden="true"
        className="mt-0.5 shrink-0 text-bronze-500 transition-colors duration-200 group-hover:text-bronze-300"
      >
        {icon}
      </span>
      <span>
        <span className="block text-[14px] font-semibold text-white">{label}</span>
        <span className="mt-1 block text-[15px] leading-relaxed text-[#F4F1EA]/[.88]">
          {children}
        </span>
      </span>
    </span>
  );

  const rowClass =
    "group block transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)] hover:translate-x-1";

  return href ? (
    <a href={href} className={rowClass} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
      {inner}
    </a>
  ) : (
    <div className={rowClass}>{inner}</div>
  );
}

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
          <PageHeading crumbs={[{ label: "İletişim" }]} title="İletişim" />

          {/* Kompozisyon: sol %42 navy panel + sağ %58 beyaz form kartı */}
          <Reveal className="mt-10">
            <div className="overflow-hidden rounded-[2px] border border-line-strong shadow-card lg:grid lg:grid-cols-[42fr_58fr]">
              {/* Sol panel — TBMM Genel Kurul Salonu arka planı (texture
                  varyantı); dekoratif kullanım, alt bilerek boş
                  (bkz. lib/site.ts IMAGES.meclis). objectPosition üst
                  bölgeyi (duvar yazısı + avizeler) odakta tutar. */}
              <div className="relative overflow-hidden bg-navy-950 p-8 md:p-10">
                <PhotoSurface
                  image={IMAGES.meclis}
                  variant="texture"
                  fill
                  objectPosition="center 20%"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <h2 className="relative z-10 mb-8 font-serif text-[26px] font-semibold text-[#F4F1EA]">
                  İletişim Bilgileri
                </h2>
                <div className="relative z-10 space-y-7">
                  <PanelRow
                    icon={<MapPin size={24} strokeWidth={1.5} />}
                    label="Adres"
                  >
                    {SITE.address.full}
                  </PanelRow>
                  <PanelRow
                    icon={<Phone size={24} strokeWidth={1.5} />}
                    label="Telefon"
                    href={SITE.telHref}
                  >
                    {SITE.phoneDisplay}
                  </PanelRow>
                  <PanelRow
                    icon={<Mail size={24} strokeWidth={1.5} />}
                    label="E-posta"
                    href={SITE.mailHref}
                  >
                    {SITE.email}
                  </PanelRow>
                  {/* Çalışma saatleri yalnızca {{CALISMA_SAATLERI}} doluysa basılır */}
                  {PLACEHOLDERS.CALISMA_SAATLERI && (
                    <PanelRow
                      icon={<Clock size={24} strokeWidth={1.5} />}
                      label="Çalışma Saatleri"
                    >
                      {PLACEHOLDERS.CALISMA_SAATLERI}
                    </PanelRow>
                  )}
                </div>

                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-dark relative z-10 mt-10"
                >
                  <WhatsAppIcon size={16} />
                  WhatsApp ile Yazın
                </a>
              </div>

              {/* Sağ: form kartı (anasayfadakiyle aynı komponent) */}
              <div className="bg-white p-8 md:p-10">
                <ContactForm />
              </div>
            </div>
          </Reveal>
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
