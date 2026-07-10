import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, type Article } from "@/lib/articles";
import { SERVICES } from "@/lib/site";

/**
 * Makale kartı v2: white kart + line-strong çerçeve + yumuşak gölge,
 * hover'da lift. Kategori etiketi alan etiketinden türetilir; başlık
 * DAİMA makalenin KENDİ slug'ına linklenir; "Oku →" tertiary çizgisi
 * kart hover'ında dolar.
 */
export default function ArticleCard({ article }: { article: Article }) {
  const category = SERVICES.find((s) => article.alan.includes(s.alan))?.title;

  return (
    <article className="card card-lift group flex h-full flex-col p-6">
      {article.cover && (
        <Link
          href={`/${article.slug}/`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative -mx-6 -mt-6 mb-5 block aspect-video overflow-hidden"
        >
          <Image
            src={article.cover}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
          />
          {/* Duotone v2 */}
          <span className="absolute inset-0 bg-navy-900 opacity-[0.45] mix-blend-multiply transition-opacity duration-[600ms] group-hover:opacity-25" />
        </Link>
      )}

      {/* Kategori etiketi (alan etiketinden) */}
      {category && (
        <p className="text-[12px] font-semibold uppercase tracking-kicker text-bronze-700">
          {category}
        </p>
      )}

      {/* Tarih politikası: gerçek tarih girilmedikçe tarih satırı basılmaz */}
      {article.date && (
        <p className="mt-1 text-[13px] text-muted">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
      )}

      <h3 className="!mt-3 font-serif !text-[1.4rem] leading-snug text-ink-strong">
        <Link
          href={`/${article.slug}/`}
          className="line-clamp-2 transition-colors duration-200 hover:text-navy-700"
        >
          {article.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-2 flex-1 text-[15px] leading-relaxed text-ink">
        {article.description}
      </p>

      {/* Görsel "Oku" ipucu — kartın linki başlıktadır, hover kartla tetiklenir */}
      <span aria-hidden="true" className="btn-tertiary pointer-events-none mt-4 self-start text-[14px]">
        Oku
        <ArrowRight size={15} strokeWidth={1.5} className="btn-arrow" />
      </span>
    </article>
  );
}
