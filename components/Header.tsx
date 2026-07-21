"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import BrandLockup from "@/components/BrandLockup";
import { HEADER_SOCIAL, NAV, SITE } from "@/lib/site";

/** Üst şerit + mobil menüde paylaşılan sosyal ikon üçlüsü. */
const SOCIAL_LINKS = [
  { href: HEADER_SOCIAL.instagram, label: "Instagram sayfamız", Icon: Instagram },
  { href: HEADER_SOCIAL.facebook, label: "Facebook sayfamız", Icon: Facebook },
  { href: HEADER_SOCIAL.linkedin, label: "LinkedIn sayfamız", Icon: Linkedin },
];

/** Trailing slash farklarını yok sayarak yol karşılaştırır. */
function samePath(a: string, b: string) {
  const norm = (p: string) => (p === "/" ? "/" : p.replace(/\/+$/, ""));
  return norm(a) === norm(b);
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const dropdownCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearDropdownCloseTimeout() {
    if (dropdownCloseTimeout.current) {
      clearTimeout(dropdownCloseTimeout.current);
      dropdownCloseTimeout.current = null;
    }
  }

  /** Hover ile açma — bekleyen gecikmeli kapatmayı iptal eder. */
  function openDropdown() {
    clearDropdownCloseTimeout();
    setDropdownOpen(true);
  }

  /** Mouse ayrılınca ~180ms gecikmeli kapatma — tekrar girilirse iptal olur, titreme önlenir. */
  function scheduleDropdownClose() {
    clearDropdownCloseTimeout();
    dropdownCloseTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
      dropdownCloseTimeout.current = null;
    }, 180);
  }

  useEffect(() => clearDropdownCloseTimeout, []);

  // Rota değişiminde dropdown ve mobil menü kapanır (link tıklamaları zaten
  // kapatıyor; bu, tarayıcı geri/ileri veya programatik gezinmeyi de kapsar).
  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 80px scroll sonrası bar küçülür + hairline + hafif gölge
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil menü: odak yönetimi + Escape + scroll kilidi + odak tuzağı
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

  // Masaüstü alt menü: Escape + dışarı tıklama
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

  /** Nav linki: altında bronz "slider" çizgi; aktif sayfada kalıcı dolu. */
  const navLinkClass = (active: boolean) =>
    `link-slide ${active ? "link-slide-active" : ""} py-2 text-[15px] font-semibold ${
      active ? "text-ink-strong" : "text-ink hover:text-ink-strong"
    }`;

  return (
    <header>
      {/* Üst ince şerit — mobilde gizli */}
      <div className="hidden bg-navy-950 text-[13px] text-white/80 md:block">
        <div className="container-site flex items-center justify-between gap-6 py-1.5">
          <div className="flex items-center gap-6">
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
          {/* Sosyal ikonlar — daima görünür (bkz. lib/site.ts HEADER_SOCIAL) */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#F4F1EA]/75 transition-colors duration-150 hover:text-bronze-300"
              >
                <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Ana bar — beyaz, sticky; scroll'da küçülür */}
      <div
        className={`sticky top-0 z-50 border-b bg-white transition-[box-shadow,border-color] duration-200 ${
          scrolled ? "border-line-strong shadow-card" : "border-line"
        }`}
      >
        <div
          className={`container-site flex items-center justify-between gap-6 transition-[padding] duration-200 ${
            scrolled ? "py-2" : "py-3.5"
          }`}
        >
          {/* Yükseklik — mobil 56px / masaüstü 64px; scroll'da (her iki
              kırılımda da) 52px'e küçülür (compact). Mobilde üst şerit
              zaten gizli olduğundan büyütülen logo taşma yapmaz. 360px
              altı ekranlarda metin gizlenir, yalnız monogram kalır. */}
          <BrandLockup compact={scrolled} />

          {/* Masaüstü menü */}
          <nav aria-label="Ana menü" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={scheduleDropdownClose}
                >
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
                      aria-haspopup="menu"
                      aria-expanded={dropdownOpen}
                      aria-controls="faaliyet-alt-menu"
                      aria-label="Faaliyet alanları alt menüsünü aç"
                      onClick={() => {
                        clearDropdownCloseTimeout();
                        setDropdownOpen((v) => !v);
                      }}
                      className="p-1 text-navy-800 transition-colors hover:text-ink-strong"
                    >
                      <ChevronDown size={14} strokeWidth={1.5} aria-hidden="true" />
                    </button>
                  </div>
                  {/* Alt menü: 8px aşağıdan fade+rise (220ms). Görünürlük tek
                      kaynaktan (dropdownOpen state) yönetilir; focus-within
                      yalnızca klavyeyle doğrudan panele Tab'lanan kullanıcı
                      için ek bir görünürlük yoludur (state'i etkilemez). */}
                  <div
                    id="faaliyet-alt-menu"
                    className={`absolute left-0 top-full z-50 min-w-[250px] border border-line-strong bg-white py-2 shadow-card transition-[opacity,transform] duration-[220ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                      dropdownOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-2 opacity-0 focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:opacity-100"
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setDropdownOpen(false)}
                        className={`relative block px-5 py-2 text-[14px] font-medium transition-colors duration-200 before:absolute before:left-0 before:top-1/2 before:h-[60%] before:w-[2px] before:-translate-y-1/2 before:bg-bronze-500 before:opacity-0 before:transition-opacity before:duration-200 hover:bg-paper hover:before:opacity-100 ${
                          samePath(pathname, child.href)
                            ? "text-ink-strong before:opacity-100"
                            : "text-ink hover:text-ink-strong"
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
              className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-line-strong text-navy-800"
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
              className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-line-strong text-navy-800"
            >
              <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menü: tam ekran navy-950 panel (modal); öğeler 60ms kademeli */}
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
            <BrandLockup
              variant="dark"
              size="sm"
              onClick={() => setMobileOpen(false)}
            />
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => {
                setMobileOpen(false);
                hamburgerRef.current?.focus();
              }}
              className="group flex h-10 w-10 items-center justify-center rounded-[2px] border border-white/20 text-white"
            >
              <X
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:rotate-90"
              />
            </button>
          </div>
          <nav aria-label="Mobil menü" className="container-site pb-10 pt-4">
            <ul className="space-y-1">
              {NAV.map((item, i) => (
                <li
                  key={item.href}
                  className="hero-line"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
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
                                : "text-white/80"
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
            <a
              href={SITE.telHref}
              className="btn-primary-dark hero-line mt-8 w-full"
              style={{ animationDelay: `${NAV.length * 60}ms` }}
            >
              <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
              Hemen Ara
            </a>
            {/* Sosyal ikonlar — üst şeritle aynı üçlü, mobilde şerit gizli olduğu için burada tekrar edilir */}
            <div
              className="hero-line mt-8 flex items-center gap-5"
              style={{ animationDelay: `${(NAV.length + 1) * 60}ms` }}
            >
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#F4F1EA]/75 transition-colors duration-150 hover:text-bronze-300"
                >
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
