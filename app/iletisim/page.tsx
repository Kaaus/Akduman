import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FaqAccordionDark from "@/components/FaqAccordionDark";
import JsonLd from "@/components/JsonLd";
import PageHeading from "@/components/PageHeading";
import PhotoSurface from "@/components/PhotoSurface";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";
import { breadcrumbSchema, buildMetadata, contactPageSchema } from "@/lib/seo";
import { GOOGLE_MAPS_URL, HOME_FAQ, IMAGES, PLACEHOLDERS, SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "İletişim | Akduman Hukuk ve Danışmanlık – Çankaya, Ankara",
  description:
    "Akduman Hukuk ve Danışmanlık iletişim bilgileri: adres, telefon ve iletişim formu. Çankaya/Ankara. ☎ +90 534 089 10 70",
  path: "/iletisim/",
});

/** Panel satırı: hover'da 4px kayar, ikon bronz parlar. */
function PanelRow({
  icon,
  label,
  children,
  href,
  ariaLabel,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  href?: string;
  ariaLabel?: string;
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
        <span className="block text-[0.875rem] font-semibold text-white">{label}</span>
        <span className="mt-1 block text-[0.9375rem] leading-relaxed text-[#F4F1EA]/[.88]">
          {children}
        </span>
      </span>
    </span>
  );

  const rowClass =
    "group block transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)] hover:translate-x-1";

  return href ? (
    <a
      href={href}
      className={rowClass}
      aria-label={ariaLabel}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
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
                <h2 className="relative z-10 mb-8 font-serif text-[1.625rem] font-semibold text-[#F4F1EA]">
                  İletişim Bilgileri
                </h2>
                <div className="relative z-10 space-y-7">
                  <PanelRow
                    icon={<MapPin size={24} strokeWidth={1.5} />}
                    label="Adres"
                    href={GOOGLE_MAPS_URL}
                    ariaLabel="Adresi Google Haritalar'da aç"
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
            title="Akduman Hukuk ve Danışmanlık konumu"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[380px] w-full border-0"
          />
        </section>
      )}

      {/* SSS — split akordeon (Konsept A): kitaplik.jpg bölüm arka planı
          (cta varyantı: navy-900 multiply + düz koyu ~%80, gradient scrim
          yok), yükseklik içerikten geliyor. Sol %38 başlık bloğu, sağ %56
          koyu-zemin akordeon (tek soru açık, ilk soru varsayılan açık).
          Anasayfadaki 5 SSS birebir; FAQPage şeması burada TEKRAR
          basılmaz (anasayfada zaten var). */}
      <section
        aria-label="Sıkça sorulan sorular"
        className="relative overflow-hidden border-t border-line bg-navy-950 py-14 md:py-20"
      >
        <PhotoSurface
          image={IMAGES.kitaplik}
          variant="cta"
          fill
          objectPosition="center"
          sizes="100vw"
        />
        <div className="container-site relative z-10">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-[38fr_56fr] md:gap-16">
              <div>
                <p className="kicker-dark mb-4">Sıkça Sorulan Sorular</p>
                <h2 className="font-serif text-[clamp(1.875rem,4vw,2.375rem)] font-semibold leading-tight text-[#F4F1EA]">
                  Aramadan Önce
                  <br />
                  Merak Edilenler
                </h2>
                <div className="mt-6 h-[3px] w-16 bg-bronze-500" />
              </div>
              <div>
                <FaqAccordionDark items={HOME_FAQ} idPrefix="iletisim-sss" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
