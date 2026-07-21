import Link from "next/link";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import BrandLockup from "@/components/BrandLockup";
import { DISCLAIMER, FOOTER_TAGLINE, PLACEHOLDERS, SERVICES, SITE } from "@/lib/site";

/** Footer sütun başlığı — koyu zeminde bronze-300 kicker. */
function ColumnTitle({ children }: { children: string }) {
  return <p className="kicker-dark mb-5">{children}</p>;
}

export default function Footer() {
  const socials = [
    { url: PLACEHOLDERS.SOSYAL_FACEBOOK_URL, label: "Facebook", Icon: Facebook },
    { url: PLACEHOLDERS.SOSYAL_INSTAGRAM_URL, label: "Instagram", Icon: Instagram },
    { url: PLACEHOLDERS.SOSYAL_YOUTUBE_URL, label: "YouTube", Icon: Youtube },
  ].filter((s) => s.url); // boş {{SOSYAL_*}} → ikon HİÇ render edilmez

  return (
    <footer className="bg-navy-950 text-[15px] text-white/70">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* 1 — Logo + büro tanımı */}
        <div>
          <BrandLockup variant="dark" size="md" />
          <p className="mt-5 leading-relaxed">{FOOTER_TAGLINE}</p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socials.map(({ url, label, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-bronze-500 hover:text-bronze-300"
                >
                  <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* 2 — Hizmetlerimiz */}
        <nav aria-label="Hizmetlerimiz">
          <ColumnTitle>Hizmetlerimiz</ColumnTitle>
          <ul className="space-y-2.5">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}/`}
                  className="link-slide text-[#C7D2DE] hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3 — Kurumsal */}
        <nav aria-label="Kurumsal">
          <ColumnTitle>Kurumsal</ColumnTitle>
          <ul className="space-y-2.5">
            <li>
              <Link href="/hakkimizda/" className="link-slide text-[#C7D2DE] hover:text-white">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/hukuki-makaleler/" className="link-slide text-[#C7D2DE] hover:text-white">
                Hukuki Makaleler
              </Link>
            </li>
            <li>
              <Link href="/iletisim/" className="link-slide text-[#C7D2DE] hover:text-white">
                İletişim
              </Link>
            </li>
            <li>
              <Link href="/kvkk-aydinlatma-metni/" className="link-slide text-[#C7D2DE] hover:text-white">
                KVKK Aydınlatma Metni
              </Link>
            </li>
            <li>
              <Link href="/cerez-politikasi/" className="link-slide text-[#C7D2DE] hover:text-white">
                Çerez Politikası
              </Link>
            </li>
            <li>
              <Link href="/yasal-uyari/" className="link-slide text-[#C7D2DE] hover:text-white">
                Yasal Uyarı
              </Link>
            </li>
          </ul>
        </nav>

        {/* 4 — İletişim */}
        <div>
          <ColumnTitle>İletişim</ColumnTitle>
          <ul className="space-y-3.5">
            <li className="flex gap-2.5">
              <MapPin size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-bronze-500" aria-hidden="true" />
              <span>{SITE.address.full}</span>
            </li>
            <li>
              <a href={SITE.telHref} className="group flex items-center gap-2.5 text-[#C7D2DE] transition-colors hover:text-white">
                <Phone size={16} strokeWidth={1.5} className="shrink-0 text-bronze-500" aria-hidden="true" />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={SITE.mailHref} className="group flex items-center gap-2.5 text-[#C7D2DE] transition-colors hover:text-white">
                <Mail size={16} strokeWidth={1.5} className="shrink-0 text-bronze-500" aria-hidden="true" />
                {SITE.email}
              </a>
            </li>
            {/* Çalışma saatleri yalnızca {{CALISMA_SAATLERI}} doluysa basılır */}
            {PLACEHOLDERS.CALISMA_SAATLERI && (
              <li className="flex items-center gap-2.5">
                <Clock size={16} strokeWidth={1.5} className="shrink-0 text-bronze-500" aria-hidden="true" />
                {PLACEHOLDERS.CALISMA_SAATLERI}
              </li>
            )}
          </ul>
          {/* Sicil satırı yalnızca {{BARO_SICIL_NO}} doluysa basılır */}
          {PLACEHOLDERS.BARO_SICIL_NO && (
            <p className="mt-5 text-[13px] text-white/50">
              {SITE.lawyer} — Ankara Barosu, Sicil No: {PLACEHOLDERS.BARO_SICIL_NO}
            </p>
          )}
        </div>
      </div>

      {/* Alt şerit — üst 1px ayraç */}
      <div className="border-t border-white/[0.14]">
        <div className="container-site space-y-2 py-6 text-center text-[13px] text-white/50">
          <p>© 2026 Akduman Hukuk Bürosu — Tüm hakları saklıdır.</p>
          <p className="mx-auto max-w-4xl">{DISCLAIMER}</p>
        </div>
      </div>
    </footer>
  );
}
