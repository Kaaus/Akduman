import Image from "next/image";
import Link from "next/link";
import { formatDate, type Article } from "@/lib/articles";

/**
 * Makale kartı: üstte tarih (kicker stili, muted) → başlık (serif, 2 satır
 * clamp) → özet (2 satır) → ince alt çizgi. Kapak varsa üstte 16:9 duotone.
 * ⚠️ Başlık DAİMA makalenin KENDİ slug'ına linklenir.
 */
export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex h-full flex-col border-b border-line pb-6">
      {article.cover && (
        <Link
          href={`/${article.slug}/`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative mb-5 block aspect-video overflow-hidden"
        >
          <Image
            src={article.cover}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          {/* Duotone kaplama */}
          <span className="absolute inset-0 bg-navy-900/55 mix-blend-multiply" />
        </Link>
      )}
      {/* Tarih politikası: gerçek tarih girilmedikçe tarih satırı basılmaz */}
      {article.date && (
        <p className="text-[12px] font-semibold uppercase tracking-kicker text-muted">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
      )}
      <h3 className="mt-3 font-serif text-[22px] font-semibold leading-snug text-navy-800">
        <Link
          href={`/${article.slug}/`}
          className="line-clamp-2 transition-colors hover:text-bronze-600"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 flex-1 text-[15px] leading-relaxed text-muted">
        {article.description}
      </p>
    </article>
  );
}
