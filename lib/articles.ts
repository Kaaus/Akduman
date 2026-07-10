import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * lib/articles.ts — Makale kayıt defteri.
 *
 * ⚠️ Slug'lar canlı sitedeki URL'lerle BİREBİR aynıdır ve makaleler kök
 * dizinde yayımlanır: https://akduman.av.tr/{slug}/
 * Kart başlığı DAİMA kendi slug'ına linklenir; eski sitedeki yanlış link ve
 * başlığa bulaşan "| Akduman Hukuk Bürosu" ekleri bu veri modeliyle çözülür.
 *
 * Gövde metinleri content/makaleler/{slug}.mdx dosyalarındadır.
 */

export type Article = {
  slug: string;
  title: string;
  description: string;
  /** İlk yayın tarihi (ISO). TODO: eski sitedeki gerçek yayın tarihleriyle güncelle. */
  date: string;
  /** Son güncelleme tarihi (ISO). TODO: gerçek tarihlerle güncelle. */
  dateModified: string;
  /** Faaliyet alanı etiketleri — hizmet sayfası ↔ makale eşleştirmesinde kullanılır. */
  alan: string[];
  /** Kapak görseli yolu; boşsa kart görselsiz basılır, og:image varsayılana düşer. */
  cover?: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "miras-paylasimi-nasil-yapilir",
    title: "Miras Paylaşımı Nasıl Yapılır?",
    description:
      "Yasal mirasçılar arasında miras paylaşımının nasıl yapıldığı, paylaşma sözleşmesi ve paylaşma davası hakkında bilgilendirme.",
    date: "2025-01-01", // TODO: eski sitedeki gerçek yayın tarihi
    dateModified: "2025-01-01", // TODO: gerçek güncelleme tarihi
    alan: ["miras"],
  },
  {
    slug: "reddi-miras-nedir",
    title: "Reddi Miras Nedir?",
    description:
      "Mirasın reddi (reddi miras) kavramı, üç aylık ret süresi ve ret işleminin sonuçları hakkında bilgilendirme.",
    date: "2025-01-01", // TODO: gerçek yayın tarihi
    dateModified: "2025-01-01", // TODO: gerçek güncelleme tarihi
    alan: ["miras"],
  },
  {
    slug: "ortakligin-giderilmesi-davasi-nedir",
    title: "Ortaklığın Giderilmesi Davası Nedir?",
    description:
      "Ortaklığın giderilmesi (izale-i şüyu) davasının konusu, tarafları ve aynen taksim ile satış yoluyla paylaştırma usulleri.",
    date: "2025-01-01", // TODO: gerçek yayın tarihi
    dateModified: "2025-01-01", // TODO: gerçek güncelleme tarihi
    alan: ["miras", "gayrimenkul"],
  },
  {
    slug: "veraset-ilami-nedir",
    title: "Veraset İlamı Nedir?",
    description:
      "Veraset ilamının (mirasçılık belgesi) ne olduğu, nereden ve nasıl alındığı hakkında bilgilendirme.",
    date: "2025-01-01", // TODO: gerçek yayın tarihi
    dateModified: "2025-01-01", // TODO: gerçek güncelleme tarihi
    alan: ["miras"],
  },
  {
    slug: "sigorta-tahkim-komisyonu-basvurusu",
    title: "Sigorta Tahkim Komisyonu Başvurusu",
    description:
      "Sigorta uyuşmazlıklarında Sigorta Tahkim Komisyonu'na başvuru şartları ve sürecin işleyişi hakkında bilgilendirme.",
    date: "2025-01-01", // TODO: gerçek yayın tarihi
    dateModified: "2025-01-01", // TODO: gerçek güncelleme tarihi
    alan: ["sigorta"],
  },
  {
    slug: "kusur-oranina-itiraz",
    title: "Kusur Oranına İtiraz",
    description:
      "Trafik kazalarında belirlenen kusur oranına itiraz yolları ve itiraz sürecinde izlenecek adımlar hakkında bilgilendirme.",
    date: "2025-01-01", // TODO: gerçek yayın tarihi
    dateModified: "2025-01-01", // TODO: gerçek güncelleme tarihi
    alan: ["sigorta"],
  },
  {
    slug: "kaza-tespit-tutanagi-nedir",
    title: "Kaza Tespit Tutanağı Nedir?",
    description:
      "Maddi hasarlı trafik kazalarında kaza tespit tutanağının düzenlenmesi ve tutanağa itiraz hakkında bilgilendirme.",
    date: "2025-01-01", // TODO: gerçek yayın tarihi
    dateModified: "2025-01-01", // TODO: gerçek güncelleme tarihi
    alan: ["sigorta"],
  },
  {
    slug: "arac-deger-kaybi-nedir",
    title: "Araç Değer Kaybı Nedir? Nasıl Talep Edilir?",
    description:
      "Trafik kazası sonrası araç değer kaybı tazminatının şartları, hesaplanması ve başvuru süreci hakkında bilgilendirme.",
    date: "2025-01-01", // TODO: gerçek yayın tarihi
    dateModified: "2025-01-01", // TODO: gerçek güncelleme tarihi
    alan: ["sigorta"],
  },
  {
    slug: "kira-tespit-davasi-nedir",
    title: "Kira Tespit Davası Nedir?",
    description:
      "Kira bedelinin tespiti davasının şartları, beş yıllık süre kuralı ve emsal kira bedeli değerlendirmesi hakkında bilgilendirme.",
    date: "2025-01-01", // TODO: gerçek yayın tarihi
    dateModified: "2025-01-01", // TODO: gerçek güncelleme tarihi
    alan: ["gayrimenkul"],
  },
  {
    slug: "yaralanmali-trafik-kazasi-tazminati",
    title: "Yaralanmalı Trafik Kazası Tazminatı",
    description:
      "Yaralanmalı trafik kazalarında maddi ve manevi tazminat talepleri ile başvuru süreci hakkında bilgilendirme.",
    date: "2025-01-01", // TODO: gerçek yayın tarihi
    dateModified: "2025-01-01", // TODO: gerçek güncelleme tarihi
    alan: ["sigorta"],
  },
  {
    slug: "ise-iade-davasi-sartlari-nelerdir",
    title: "İşe İade Davası Şartları Nelerdir?",
    description:
      "İşe iade davasının şartları, zorunlu arabuluculuk aşaması ve dava süreci hakkında bilgilendirme.",
    date: "2025-01-01", // TODO: gerçek yayın tarihi
    dateModified: "2025-01-01", // TODO: gerçek güncelleme tarihi
    alan: ["is"],
  },
  // TODO: canlı arşivde burada olmayan bir makale varsa aynı şemayla ekle.
];

/** Tarihe göre yeniden eskiye sıralı liste (arşiv sayfası için). */
export function getAllArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Bir faaliyet alanına etiketli makaleler (hizmet sayfası "İlgili yazılarımız" bloğu). */
export function getArticlesByAlan(alan: string): Article[] {
  return ARTICLES.filter((a) => a.alan.includes(alan));
}

/** Aynı alan etiketini paylaşan diğer makaleler ("İlgili Makaleler" bloğu). */
export function getRelatedArticles(slug: string): Article[] {
  const current = getArticle(slug);
  if (!current) return [];
  return ARTICLES.filter(
    (a) => a.slug !== slug && a.alan.some((t) => current.alan.includes(t))
  );
}

/** MDX gövdesini ve frontmatter'ını okur. Dosya yoksa null döner. */
export function getArticleSource(
  slug: string
): { content: string; frontmatter: Record<string, unknown> } | null {
  const filePath = path.join(process.cwd(), "content", "makaleler", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  return { content, frontmatter: data };
}

/** Tarihleri Türkçe biçimde gösterir: "12 Ocak 2025". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // ISO tarih UTC gece yarısı olarak ayrıştırılır; build makinesinin
    // saat dilimine göre bir gün kaymasın diye UTC'de biçimlendirilir.
    timeZone: "UTC",
  });
}
