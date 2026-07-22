// TODO: Tarihler GEÇİCİDİR — gerçek yayın tarihleri müşteriden alınıp güncellenecek.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Alan } from "@/lib/site";

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
  /**
   * İlk yayın tarihi (ISO). TARİH POLİTİKASI: boş ("") olduğu sürece
   * arayüzde tarih rozeti ve JSON-LD datePublished/dateModified HİÇ
   * basılmaz; gerçek tarih girildiğinde her şey otomatik görünür olur.
   * TODO: gerçek tarih eski siteden girilecek.
   */
  date: string;
  /** Son güncelleme tarihi (ISO). Aynı politika. TODO: gerçek tarih eski siteden girilecek. */
  dateModified: string;
  /** Faaliyet alanı etiketleri — hizmet sayfası ↔ makale eşleştirmesinde kullanılır. */
  alan: Alan[];
  /** Kapak görseli yolu; boşsa kart görselsiz basılır, og:image varsayılana düşer. */
  cover?: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "miras-paylasimi-nedir",
    title:
      "Miras Paylaşımı Nasıl Yapılır? Anlaşmalı ve Davalı Miras Paylaşımı",
    description:
      "Miras paylaşımı nasıl yapılır? Anlaşmalı ve davalı miras paylaşımı arasındaki farklar, süreçler ve hukuki yollar bu yazıda açıklanmıştır.",
    date: "2026-05-18",
    dateModified: "2026-05-18",
    alan: ["miras"],
  },
  {
    slug: "reddi-miras-nedir",
    title: "Reddi Miras (Mirasın Reddi) Nedir?",
    description:
      "Reddi miras nedir, borçlu miras nasıl reddedilir? Reddi miras süresi, şartları ve mirasın reddedilmesinin sonuçları bu yazıda.",
    date: "2026-04-02",
    dateModified: "2026-04-02",
    alan: ["miras"],
  },
  {
    slug: "ortakligin-giderilmesi-davasi-nedir",
    title:
      "Ortaklığın Giderilmesi (İzale-i Şuyu) Davası Nedir? Nasıl Açılır?",
    description:
      "Ortaklığın giderilmesi davası, ortak mülkiyetin sona erdirilerek herkesin payına düşeni almasını sağlayan bir hukuki yoldur.",
    date: "2026-02-24",
    dateModified: "2026-02-24",
    alan: ["miras", "gayrimenkul"],
  },
  {
    slug: "miras-kaldiginda-ilk-olarak-ne-yapilmali",
    title: "Miras Kaldığında İlk Olarak Ne Yapılmalı? (Adım Adım Rehber)",
    description:
      "Miras kaldığında ilk olarak ne yapılmalı? Ölüm sonrası miras işlemleri, veraset ilamı, borçlar, tapu ve banka işlemleri bu rehberde.",
    date: "2026-06-09",
    dateModified: "2026-06-09",
    alan: ["miras"],
  },
  {
    slug: "mirascilik-belgesi-nedir",
    title: "Mirasçılık Belgesi (Veraset İlamı) Nedir?",
    description:
      "Mirasçılık belgesi (veraset ilamı) nedir, nasıl ve nereden alınır? Kimler başvurabilir, noter ve mahkeme farkı, gerekli belgeler ve süreç.",
    date: "2026-01-13",
    dateModified: "2026-01-13",
    alan: ["miras"],
  },
  {
    slug: "sigorta-tahkim-komisyonu-nedir",
    title: "Sigorta Tahkim Komisyonu Nedir? Ne Zaman ve Nasıl Başvuru Yapılır?",
    description:
      "Sigorta Tahkim Komisyonu nedir, hangi uyuşmazlıklarda devreye girer? Başvuru şartları, gerekli belgeler ve süreç adımları bu rehberde.",
    date: "2025-12-02",
    dateModified: "2025-12-02",
    alan: ["sigorta"],
  },
  {
    slug: "trafik-kazalarinda-kusur-orani-nasil-belirlenir",
    title:
      "Trafik Kazalarında Kusur Oranı Nasıl Belirlenir? Hangi Kusur Ne Anlama Gelir?",
    description:
      "Trafik kazalarında kusur oranı nasıl belirlenir? Kusur türleri, değerlendirme kriterleri ve sürücülerin haklarını etkileyen süreçler.",
    date: "2025-11-28",
    dateModified: "2025-11-28",
    alan: ["sigorta"],
  },
  {
    slug: "kaza-tespit-tutanagi-nedir",
    title: "Kaza Tespit Tutanağı Nedir?",
    description:
      "Kaza tespit tutanağı, trafik kazasına karışan araç sürücülerinin kolluk kuvvetleri gelmeden kendi aralarında düzenlediği resmi belgedir.",
    date: "2025-11-28",
    dateModified: "2025-11-28",
    alan: ["sigorta"],
  },
  {
    slug: "arac-deger-kaybi-nedir",
    title: "Araç Değer Kaybı Nedir? Nasıl Talep Edilir?",
    description:
      "Araç değer kaybı, bir aracın kaza geçirmesi sonucunda tamir edilse bile ikinci el piyasasında oluşan değer düşüşüdür.",
    date: "2025-11-28",
    dateModified: "2025-11-28",
    alan: ["sigorta"],
  },
  {
    slug: "trafik-kazasi-sonrasi-yapilmasi-gerekenler",
    title: "Trafik Kazası Sonrası Yapılması Gerekenler",
    description:
      "Trafik kazası sonrası yapılması gerekenler: kaza tespit tutanağı, sigorta bildirimleri, ekspertiz ve değer kaybı süreçleri bu rehberde.",
    date: "2025-11-26",
    dateModified: "2025-11-26",
    alan: ["sigorta"],
  },
  {
    slug: "kira-tespit-davasi-nasil-acilir",
    title: "Kira Tespit Davası Nasıl Açılır?",
    description:
      "Kira tespit davası açma süreci ve koşulları hakkında güncel bilgiler. Kira artışı ve tespit davalarında izlenmesi gereken adımlar bu rehberde.",
    date: "2025-07-28",
    dateModified: "2025-07-28",
    alan: ["gayrimenkul"],
  },
  {
    slug: "yaralanmali-trafik-kazasi-sonrasi-sigorta-tahkimi-basvurusu",
    title: "Yaralanmalı Trafik Kazası Sonrası Sigorta Tahkimi Başvurusu",
    description:
      "Yaralanmalı trafik kazası sonrası sigortadan tazminat: Sigorta Tahkim Komisyonu başvuru şartları, belgeler, ücretler ve süreler.",
    date: "2025-07-28",
    dateModified: "2025-07-28",
    alan: ["sigorta"],
  },
  {
    slug: "ise-iade-davasi-nedir",
    title: "İşe İade Davası Nedir?",
    description:
      "Haksız ya da geçersiz nedenle işten çıkarılan işçilerin işe iade davası şartları, süreleri ve arabuluculuk zorunluluğu bu yazıda.",
    date: "2025-07-04",
    dateModified: "2025-07-04",
    alan: ["is"],
  },
];

/**
 * Arşiv/timeline listesi. Tüm makalelerde gerçek tarih varsa yeniden
 * eskiye sıralanır; tarihler henüz girilmemişse ARTICLES dizi sırası
 * aynen korunur (timeline sıralama kuralı).
 */
export function getAllArticles(): Article[] {
  const allDated = ARTICLES.every((a) => a.date);
  if (!allDated) return [...ARTICLES];
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Bir faaliyet alanına etiketli makaleler (hizmet sayfası "İlgili yazılarımız" bloğu). */
export function getArticlesByAlan(alan: Alan): Article[] {
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

/** Tarihleri Türkçe biçimde gösterir: "12 Ocak 2025". Boş girişte boş döner. */
export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // ISO tarih UTC gece yarısı olarak ayrıştırılır; build makinesinin
    // saat dilimine göre bir gün kaymasın diye UTC'de biçimlendirilir.
    timeZone: "UTC",
  });
}
