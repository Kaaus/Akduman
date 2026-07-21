import type { Metadata } from "next";
import { PLACEHOLDERS, SERVICES, SITE, type FaqItem } from "@/lib/site";
import type { Article } from "@/lib/articles";

/**
 * lib/seo.ts — Metadata ve JSON-LD üreticileri.
 * Title/description değerleri SEO tablosuyla birebir eşleşir; canonical
 * her sayfada trailing slash'li mutlak yola işaret eder.
 */

// ─── Metadata API ────────────────────────────────────────────────────────────

/** Varsayılan paylaşım görseli — scripts/generate-og.mjs ile üretilir. */
const OG_DEFAULT = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "Akduman Hukuk Bürosu — Ankara • Avukatlık & Hukuki Danışmanlık",
};

export function buildMetadata(opts: {
  title: string;
  description: string;
  /** Trailing slash'li yol, örn. "/ceza-hukuku/" — anasayfa için "/". */
  path: string;
  ogType?: "website" | "article";
  /** Sayfa özel görseli (örn. makale kapağı); yoksa varsayılan kullanılır. */
  ogImage?: string;
}): Metadata {
  const { title, description, path, ogType = "website", ogImage } = opts;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE.name,
      locale: "tr_TR",
      type: ogType,
      images: [ogImage ? { url: ogImage } : OG_DEFAULT],
    },
  };
}

// ─── JSON-LD üreticileri ─────────────────────────────────────────────────────

/** Global LegalService şeması — layout.tsx'te tüm sayfalara basılır. */
export function legalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE.url}/#legalservice`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/logo-monogram.png`,
    telephone: SITE.phoneE164,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      // Posta kodu teyitsizken şemaya girmez (adres tek-kaynak kuralı).
      ...(SITE.address.postalCode
        ? { postalCode: SITE.address.postalCode }
        : {}),
      addressCountry: SITE.address.country,
    },
    areaServed: "Ankara",
    founder: {
      "@type": "Person",
      name: SITE.lawyer,
      jobTitle: "Avukat",
    },
    // openingHours yalnızca {{CALISMA_SAATLERI}} doluysa şemaya girer.
    ...(PLACEHOLDERS.CALISMA_SAATLERI
      ? { openingHours: PLACEHOLDERS.CALISMA_SAATLERI }
      : {}),
  };
}

/** SSS içeren sayfalar için FAQPage şeması. */
export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Hizmet sayfaları için Service şeması (provider → LegalService). */
export function serviceSchema(slug: string) {
  const service = SERVICES.find((s) => s.slug === slug);
  // Slug'lar SERVICES kaydından gelir; bilinmeyen slug bir programlama hatasıdır.
  if (!service) throw new Error(`Bilinmeyen hizmet slug'ı: ${slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    url: `${SITE.url}/${service.slug}/`,
    serviceType: service.title,
    areaServed: "Ankara",
    provider: { "@id": `${SITE.url}/#legalservice` },
  };
}

/** Alt sayfalar için BreadcrumbList şeması. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

/** Makale detayları için Article şeması. */
export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    // Tarih politikası: placeholder/boş tarih şemaya HİÇ girmez;
    // gerçek tarih girildiğinde otomatik basılır.
    ...(article.date ? { datePublished: article.date } : {}),
    ...(article.dateModified ? { dateModified: article.dateModified } : {}),
    mainEntityOfPage: `${SITE.url}/${article.slug}/`,
    ...(article.cover ? { image: `${SITE.url}${article.cover}` } : {}),
    author: {
      "@type": "Person",
      name: SITE.lawyer,
      jobTitle: "Avukat",
    },
    publisher: {
      "@type": "LegalService",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/images/logo-monogram.png`,
      },
    },
  };
}

/** İletişim sayfası için ContactPage şeması. */
export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `İletişim | ${SITE.name}`,
    url: `${SITE.url}/iletisim/`,
    mainEntity: { "@id": `${SITE.url}/#legalservice` },
  };
}
