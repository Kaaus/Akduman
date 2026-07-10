"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { IMAGES, NAV, SITE } from "@/lib/site";

/** Trailing slash farklarını yok sayarak yol karşılaştırır. */
function samePath(a: string, b: string) {
  const norm = (p: string) => (p === "/" ? "/" : p.replace(/\/+$/, ""));
  return norm(a) === norm(b);
}

/**
 * Logo dosyası henüz yüklenmediyse (manifest ready:false) zarif bir
 * tipografik marka işareti basılır. Dosya gelince otomatik görsele döner.
 */
function Logo({ light = false }: { light?: boolean }) {
  if (IMAGES.logo.ready) {
    return (
      <span className="relative block h-11 w-44">
        <Image
          src={IMAGES.logo.src}
          alt={IMAGES.logo.alt}
          fill
          sizes="176px"
          priority
          className={`object-contain object-left ${light ? "brightness-0 invert" : ""}`}
        />
      </span>
    );
  }
  return (
    <span className="flex flex-col leading-none">
      <span
        className={`font-serif text-[26px] font-bold tracking-tight ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        Akduman
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-kicker text-bronze-600">
        Hukuk Bürosu
      </span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, children?: { href: string }[]) =>
    samePath(pathname, href) ||
    (children?.some((c) => samePath(pathname, c.href)) ?? false);

  return (
    <header>
      {/* Üst ince şerit — mobilde gizli */}
      <div className="hidden bg-navy-950 text-[13px] text-white/80 md:block">
        <div className="container-site flex items-center gap-6 py-1.5">
          <a
            href={SITE.telHref}
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Phone size={13} strokeWidth={1.5} aria-hidden="true" />
            {SITE.phoneDisplay}
          </a>
          <a
            href={SITE.mailHref}
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Mail size={13} strokeWidth={1.5} aria-hidden="true" />
            {SITE.email}
          </a>
        </div>
      </div>

      {/* Ana bar — beyaz, sticky, altta 1px line */}
      <div className="sticky top-0 z-50 border-b border-line bg-white">
        <div className="container-site flex items-center justify-between gap-6 py-3.5">
          <Link href="/" aria-label="Akduman Hukuk Bürosu — Ana Sayfa">
            <Logo />
          </Link>

          {/* Masaüstü menü */}
          <nav aria-label="Ana menü" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 py-2 text-[15px] font-semibold text-navy-800 transition-colors hover:text-bronze-600 ${
                      isActive(item.href, item.children)
                        ? "underline decoration-bronze-500 decoration-2 underline-offset-[6px]"
                        : ""
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="text-bronze-500 transition-transform group-hover:rotate-180"
                    />
                  </Link>
                  {/* Alt menü: hover ve klavye odağıyla açılır */}
                  <div className="pointer-events-none absolute left-0 top-full z-50 min-w-[240px] border border-line bg-white py-2 opacity-0 transition-opacity duration-150 focus-within:pointer-events-auto focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-5 py-2 text-[14px] font-medium transition-colors hover:bg-paper hover:text-bronze-600 ${
                          samePath(pathname, child.href)
                            ? "text-bronze-600"
                            : "text-navy-800"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-2 text-[15px] font-semibold text-navy-800 transition-colors hover:text-bronze-600 ${
                    isActive(item.href)
                      ? "underline decoration-bronze-500 decoration-2 underline-offset-[6px]"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            <a href={SITE.telHref} className="btn-primary !px-5 !py-2.5 text-[14px]">
              <Phone size={15} strokeWidth={1.5} aria-hidden="true" />
              Hemen Ara
            </a>
          </nav>

          {/* Mobil: telefon ikonu + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={SITE.telHref}
              aria-label={`Telefon: ${SITE.phoneDisplay}`}
              className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-line text-navy-800"
            >
              <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <button
              type="button"
              aria-label="Menüyü aç"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-line text-navy-800"
            >
              <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menü: tam ekran navy-950 panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-navy-950 lg:hidden">
          <div className="container-site flex items-center justify-between py-4">
            <Link
              href="/"
              aria-label="Akduman Hukuk Bürosu — Ana Sayfa"
              onClick={() => setMobileOpen(false)}
            >
              <Logo light />
            </Link>
            <button
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-white/20 text-white"
            >
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobil menü" className="container-site pb-10 pt-4">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 font-serif text-[24px] font-semibold ${
                      isActive(item.href, item.children)
                        ? "text-bronze-300"
                        : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mb-3 space-y-1 border-l border-white/15 pl-5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block py-1.5 text-[15px] font-medium ${
                              samePath(pathname, child.href)
                                ? "text-bronze-300"
                                : "text-white/75"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <a href={SITE.telHref} className="btn-primary mt-8 w-full">
              <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
              Hemen Ara
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
