import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FaqSlider from "@/components/FaqSlider";
import JsonLd from "@/components/JsonLd";
import PageHeading from "@/components/PageHeading";
import PhotoSurface from "@/components/PhotoSurface";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";
import { breadcrumbSchema, buildMetadata, contactPageSchema } from "@/lib/seo";
import { HOME_FAQ, IMAGES, PLACEHOLDERS, SITE } from "@/lib/site";

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
        <div className="container-site pt-8 pb-12 md:pb-16">
          <PageHeading crumbs={[{ label: "İletişim" }]} title="İletişim" />

          {/* Kompozisyon: sol %42 navy panel + sağ %58 beyaz form kartı.
              Üst boşluk PageHeading'in kendi pb-12'sinden gelir. */}
          <Reveal>
            <div className="overflow-hidden rounded-[2px] border border-line-strong shadow-card lg:grid lg:grid-cols-[42fr_58fr]">
              {/* Sol panel — düz navy-950 zemin, görsel arka plan YOK. */}
              <div className="relative overflow-hidden bg-navy-950 p-8 md:p-10">
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

      {/* Kompakt harita — yalnız {{HARITA_EMBED_URL}} doluysa SSS bölümünün
          ÜSTÜNDE render edilir; boşken bu blok hiç basılmaz, SSS bölümü
          kalıcı olarak altında durur. */}
      {PLACEHOLDERS.HARITA_EMBED_URL && (
        <section aria-label="Konum" className="border-t border-line">
          <iframe
            src={PLACEHOLDERS.HARITA_EMBED_URL}
            title="Akduman Hukuk Bürosu konumu"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[380px] w-full border-0"
          />
        </section>
      )}

      {/* SSS — kitaplik.jpg artık bölüm arka planı (cta varyantı: navy-900
          multiply + düz koyu, gradient scrim yok), "dev fotoğraf" görünümü
          bitti, yükseklik içerikten geliyor. Anasayfadaki 5 SSS birebir;
          FAQPage şeması burada TEKRAR basılmaz (anasayfada zaten var). */}
      <section
        aria-label="Sıkça sorulan sorular"
        className="relative overflow-hidden border-t border-line bg-navy-950 py-14 md:py-16"
      >
        <PhotoSurface image={IMAGES.kitaplik} variant="cta" fill sizes="100vw" />
        <div className="container-site relative z-10">
          <Reveal>
            <p className="kicker-dark mb-6">Sıkça Sorulan Sorular</p>
            <FaqSlider items={HOME_FAQ} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
