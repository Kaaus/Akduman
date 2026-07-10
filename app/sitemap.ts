import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { SERVICES, SITE } from "@/lib/site";

/** Tüm statik sayfalar + articles.ts'den makaleler. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/hakkimizda/",
    "/faaliyet-alanlarimiz/",
    ...SERVICES.map((s) => `/${s.slug}/`),
    "/hukuki-makaleler/",
    "/iletisim/",
    "/kvkk-aydinlatma-metni/",
    "/cerez-politikasi/",
    "/yasal-uyari/",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE.url}/${a.slug}/`,
    // Tarih politikası: gerçek tarih girilmedikçe lastModified basılmaz.
    ...(a.dateModified ? { lastModified: new Date(a.dateModified) } : {}),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
