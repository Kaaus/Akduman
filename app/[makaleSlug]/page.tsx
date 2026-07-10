import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import SiteImage from "@/components/SiteImage";
import {
  formatDate,
  getAllArticles,
  getArticle,
  getArticleSource,
  getRelatedArticles,
} from "@/lib/articles";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { IMAGES, INFO_NOTE, SERVICES, SITE } from "@/lib/site";

/**
 * Makale detayları — makaleler KÖK dizinde yayımlanır: /{makale-slug}/
 * (eski WordPress URL'leri birebir korunur). Statik route'lar bu dinamik
 * segmentten her zaman önceliklidir.
 */

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ makaleSlug: a.slug }));
}

// Kayıt defterinde olmayan slug'lar 404'e düşer.
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { makaleSlug: string } }) {
  const article = getArticle(params.makaleSlug);
  if (!article) return {};
  return buildMetadata({
    title: `${article.title} | Akduman Hukuk Bürosu`,
    description: article.description,
    path: `/${article.slug}/`,
    ogType: "article",
    ...(article.cover ? { ogImage: article.cover } : {}),
  });
}

export default function MakalePage({
  params,
}: {
  params: { makaleSlug: string };
}) {
  const article = getArticle(params.makaleSlug);
  if (!article) notFound();

  const source = getArticleSource(article.slug);
  const related = getRelatedArticles(article.slug);
  const relatedServices = SERVICES.filter((s) => article.alan.includes(s.alan));

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hukuki Makaleler", path: "/hukuki-makaleler/" },
          { name: article.title, path: `/${article.slug}/` },
        ])}
      />

      <article className="bg-white">
        <div className="container-site max-w-4xl py-12 md:py-16">
          <Breadcrumb
            items={[
              { label: "Hukuki Makaleler", href: "/hukuki-makaleler/" },
              { label: article.title },
            ]}
          />

          {/* Başlık normal kapitalizasyonla basılır — ASLA tamamı büyük harf değil */}
          <h1 className="mt-6 text-navy-800">{article.title}</h1>

          {/* Meta satırı */}
          <p className="mt-4 text-[14px] text-muted">
            {SITE.lawyer} · Yayın:{" "}
            <time dateTime={article.date}>{formatDate(article.date)}</time> ·
            Güncelleme:{" "}
            <time dateTime={article.dateModified}>
              {formatDate(article.dateModified)}
            </time>
          </p>

          {/* Kapak görseli (varsa) — duotone kuralına tabi */}
          {article.cover && (
            <div className="relative mt-8 aspect-video overflow-hidden">
              <Image
                src={article.cover}
                alt={article.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                priority
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-navy-900/55 mix-blend-multiply"
              />
            </div>
          )}

          {/* MDX gövde */}
          <div className="article-body mt-10">
            {source ? (
              <MDXRemote source={source.content} />
            ) : (
              <p className="border border-line bg-paper px-5 py-4 text-muted">
                Bu makalenin içeriği hazırlanmaktadır.
              </p>
            )}
          </div>

          {/* Yazar kutusu */}
          <aside
            aria-label="Yazar"
            className="mt-14 flex items-center gap-6 border border-line bg-paper p-6"
          >
            <div className="w-20 shrink-0">
              <SiteImage image={IMAGES.avukat} aspectRatio="1/1" sizes="80px" />
            </div>
            <div>
              <p className="font-serif text-[20px] font-semibold text-navy-800">
                {SITE.lawyer}
              </p>
              <p className="mt-1 text-[14px] text-muted">
                Akduman Hukuk Bürosu, Ankara
              </p>
            </div>
          </aside>

          {/* Bilgilendirme notu */}
          <p className="mt-10 border-t border-line pt-6 text-[14px] italic text-muted">
            {INFO_NOTE}
          </p>
        </div>
      </article>

      {/* İlgili Faaliyet Alanı — alan etiketinden otomatik */}
      {relatedServices.length > 0 && (
        <section aria-label="İlgili faaliyet alanı" className="border-t border-line bg-paper">
          <div className="container-site py-14">
            <SectionHeading kicker="Faaliyet Alanlarımız" title="İlgili Faaliyet Alanı" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* İlgili Makaleler — aynı alan etiketini paylaşanlar */}
      {related.length > 0 && (
        <section aria-label="İlgili makaleler" className="border-t border-line bg-white">
          <div className="container-site py-14">
            <SectionHeading kicker="Hukuki Makaleler" title="İlgili Makaleler" />
            <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
