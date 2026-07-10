import Link from "next/link";
import { Fragment } from "react";

export type Crumb = {
  label: string;
  /** Son öğede href verilmez (aktif sayfa). */
  href?: string;
};

/**
 * Tüm alt sayfalarda kullanılan içerik yolu: 13px, "Ana Sayfa / …",
 * ayraç "/", muted; son öğe navy-800.
 */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Sayfa yolu" className="text-[13px] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="transition-colors hover:text-navy-800">
            Ana Sayfa
          </Link>
        </li>
        {items.map((item, i) => (
          <Fragment key={`${item.label}-${i}`}>
            <li aria-hidden="true">/</li>
            <li>
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-navy-800">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-navy-800">
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
