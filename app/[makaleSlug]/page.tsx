import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import ReadingProgress from "@/components/ReadingProgress";
import SectionHeading from "@/components/SectionHeading";
import ServiceRow from "@/components/ServiceRow";
import SiteImage from "@/components/SiteImage";
import TocRail from "@/components/TocRail";
import {
  formatDate,
  getAllArticles,
  getArticle,
  getArticleSource,
  getRelatedArticles,
} from "@/lib/articles";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { slugifyHeading } from "@/lib/slugify";
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

/** React çocuklarını düz metne indirger (H2 id üretimi için). */
function flattenText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (typeof node === "object" && "props" in node) {
    return flattenText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

/** MDX H2'lerine TocRail ile aynı algoritmayla id verilir; tablolar dar
 * ekranda yatay taşma yapmasın diye kaydırılabilir bir sarmalayıcıya alınır. */
const mdxComponents = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={slugifyHeading(flattenText(children))}>{children}</h2>
  ),
  table: ({ children }: { children?: ReactNode }) => (
    <div className="table-scroll">
      <table>{children}</table>
    </div>
  ),
};

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

  // "Bu sayfada" rayı: MDX gövdesindeki H2 başlıklarından türetilir
  const toc = source
    ? Array.from(source.content.matchAll(/^##\s+(.+)$/gm)).map((m) => ({
        id: slugifyHeading(m[1].trim()),
        label: m[1].trim(),
      }))
    : [];

  return (
    <>
      <ReadingProgress />
      <JsonLd data={articleSchema(article)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hukuki Makaleler", path: "/hukuki-makaleler/" },
          { name: article.title, path: `/${article.slug}/` },
        ])}
      />

      <article className="bg-white">
        <div className="container-site flex gap-14 py-12 md:py-16">
          <div className="min-w-0 max-w-[70ch]">
            {/* Başlık bloğu ORTALI (site geneli kural); aşağıdaki gövde
                metni ve TocRail düzeni değişmeden sola hizalı kalır. */}
            <div className="flex flex-col items-center text-center">
              <Breadcrumb
                items={[
                  { label: "Hukuki Makaleler", href: "/hukuki-makaleler/" },
                  { label: article.title },
                ]}
              />

              {/* Başlık normal kapitalizasyonla basılır — ASLA tamamı büyük harf değil */}
              <h1 className="mt-6">{article.title}</h1>

              {/* Meta satırı — tarih politikası: tarih girilmedikçe yalnız yazar adı basılır */}
              <p className="mt-4 text-[14px] text-muted">
                {SITE.lawyer}
                {article.date && (
                  <>
                    {" "}
                    · Yayın:{" "}
                    <time dateTime={article.date}>
                      {formatDate(article.date)}
                    </time>
                  </>
                )}
                {article.dateModified && (
                  <>
                    {" "}
                    · Güncelleme:{" "}
                    <time dateTime={article.dateModified}>
                      {formatDate(article.dateModified)}
                    </time>
                  </>
                )}
              </p>
            </div>

            {/* Kapak görseli (varsa) — duotone v2 */}
            {article.cover && (
              <div className="group relative mt-8 aspect-video overflow-hidden">
                <Image
                  src={article.cover}
                  alt={article.title}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-navy-900 opacity-[0.45] mix-blend-multiply transition-opacity duration-[600ms] group-hover:opacity-25"
                />
              </div>
            )}

            {/* MDX gövde */}
            <div className="article-body mt-10">
              {source ? (
                <MDXRemote
                  source={source.content}
                  components={mdxComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              ) : (
                <p className="border border-line bg-paper px-5 py-4 text-muted">
                  Bu makalenin içeriği hazırlanmaktadır.
                </p>
              )}
            </div>

            {/* Yazar kutusu — kart stili */}
            <aside aria-label="Yazar" className="card mt-14 flex items-center gap-6 p-6">
              <div className="w-20 shrink-0">
                <SiteImage image={IMAGES.avukat} aspectRatio="1/1" sizes="80px" />
              </div>
              <div>
                <p className="font-serif text-[20px] font-semibold text-ink-strong">
                  {SITE.lawyer}
                </p>
                <p className="mt-1 text-[14px] text-muted">
                  Akduman Hukuk Bürosu, Ankara
                </p>
              </div>
            </aside>

            {/* Bilgilendirme notu */}
            <p className="mt-10 border-t border-line-strong pt-6 text-[14px] italic text-muted">
              {INFO_NOTE}
            </p>
          </div>

          <TocRail items={toc} />
        </div>
      </article>

      {/* İlgili Faaliyet Alanı — alan etiketinden otomatik */}
      {relatedServices.length > 0 && (
        <section aria-label="İlgili faaliyet alanı" className="border-t border-line bg-paper">
          <div className="container-site py-14">
            <SectionHeading kicker="Faaliyet Alanlarımız" title="İlgili Faaliyet Alanı" />
            <div className="mt-8 border-t border-line-strong">
              {relatedServices.map((s) => (
                <ServiceRow key={s.slug} service={s} />
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
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
