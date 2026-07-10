import Link from "next/link";
import { Fragment } from "react";

export type Crumb = {
  label: string;
  /** Son öğede href verilmez (aktif sayfa). */
  href?: string;
};

/**
 * İçerik yolu: 13px, "Ana Sayfa / …", ayraç "/" (aria-hidden).
 * variant="dark": koyu hero şeritleri üzerinde açık renkli sürüm.
 */
export default function Breadcrumb({
  items,
  variant = "light",
}: {
  items: Crumb[];
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  const linkClass = dark
    ? "text-white/70 transition-colors hover:text-white"
    : "text-muted transition-colors hover:text-ink-strong";
  const currentClass = dark
    ? "font-medium text-white"
    : "font-medium text-ink-strong";

  return (
    <nav
      aria-label="breadcrumb"
      className={`text-[13px] ${dark ? "text-white/70" : "text-muted"}`}
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className={linkClass}>
            Ana Sayfa
          </Link>
        </li>
        {items.map((item, i) => (
          <Fragment key={`${item.label}-${i}`}>
            <li aria-hidden="true">/</li>
            <li>
              {item.href ? (
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className={currentClass}>
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
