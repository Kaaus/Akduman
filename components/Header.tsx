"use client";

import { useEffect, useRef, useState } from "react";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  // Mobil menü: odak yönetimi + Escape + arka plan scroll kilidi + odak tuzağı
  useEffect(() => {
    if (!mobileOpen) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      // Basit odak tuzağı: Tab, panelin içinde döner
      if (e.key === "Tab" && mobilePanelRef.current) {
        const focusables = mobilePanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  // Masaüstü alt menü: Escape ile kapat + dışarı tıklamayı yakala
  useEffect(() => {
    if (!dropdownOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        dropdownButtonRef.current?.focus();
      }
    };
    const onMouseDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [dropdownOpen]);

  const isActive = (href: string, children?: { href: string }[]) =>
    samePath(pathname, href) ||
    (children?.some((c) => samePath(pathname, c.href)) ?? false);

  const navLinkClass = (active: boolean) =>
    `py-2 text-[15px] font-semibold text-navy-800 transition-colors hover:text-bronze-600 ${
      active ? "underline decoration-bronze-500 decoration-2 underline-offset-[6px]" : ""
    }`;

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
                <div key={item.href} ref={dropdownRef} className="group relative">
                  <div className="flex items-center gap-0.5">
                    <Link
                      href={item.href}
                      className={navLinkClass(isActive(item.href, item.children))}
                    >
                      {item.label}
                    </Link>
                    {/* Alt menü tetikleyicisi: klavye ve dokunmatik için ayrı buton */}
                    <button
                      ref={dropdownButtonRef}
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                      aria-controls="faaliyet-alt-menu"
                      aria-label="Faaliyet alanları alt menüsünü aç"
                      onClick={() => setDropdownOpen((v) => !v)}
                      className="p-1 text-bronze-500 hover:text-bronze-600"
                    >
                      <ChevronDown size={14} strokeWidth={1.5} aria-hidden="true" />
                    </button>
                  </div>
                  {/* Alt menü: buton durumu, hover veya klavye odağıyla açılır */}
                  <div
                    id="faaliyet-alt-menu"
                    className={`absolute left-0 top-full z-50 min-w-[240px] border border-line bg-white py-2 transition-opacity duration-150 ${
                      dropdownOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0 focus-within:pointer-events-auto focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100"
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setDropdownOpen(false)}
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
                  className={navLinkClass(isActive(item.href))}
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
            {/* İkon-only link: erişilebilir ad ASLA URL/numara değil, eylem adı */}
            <a
              href={SITE.telHref}
              aria-label="Telefonla arayın"
              className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-line text-navy-800"
            >
              <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <button
              ref={hamburgerRef}
              type="button"
              aria-label="Menüyü aç"
              aria-expanded={mobileOpen}
              aria-controls="mobil-menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-line text-navy-800"
            >
              <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menü: tam ekran navy-950 panel (modal) */}
      {mobileOpen && (
        <div
          ref={mobilePanelRef}
          id="mobil-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobil menü"
          className="fixed inset-0 z-[60] overflow-y-auto bg-navy-950 lg:hidden"
        >
          <div className="container-site flex items-center justify-between py-4">
            <Link
              href="/"
              aria-label="Akduman Hukuk Bürosu — Ana Sayfa"
              onClick={() => setMobileOpen(false)}
            >
              <Logo light />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => {
                setMobileOpen(false);
                hamburgerRef.current?.focus();
              }}
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
