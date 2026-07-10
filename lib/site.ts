/**
 * lib/site.ts — Sitenin TEK gerçek kaynağı.
 * Tüm iletişim bilgileri, menü yapısı, hizmet envanteri, placeholder
 * sözleşmesi ve görsel manifesti burada tutulur. Sayfalar ve komponentler
 * bu dosyadan beslenir; sabit değer başka yerde TEKRAR TANIMLANMAZ.
 */

// ─── Kimlik & İletişim ───────────────────────────────────────────────────────

export const SITE = {
  name: "Akduman Hukuk Bürosu",
  lawyer: "Av. Samed Akduman",
  url: "https://akduman.av.tr",
  /** Görünen telefon metni — sitede HER yerde bu biçim kullanılır. */
  phoneDisplay: "+90 534 089 10 70",
  /** tel: linklerinin TAMAMI bu değeri kullanır (eski sitedeki hatalı link düzeltildi). */
  phoneE164: "+905340891070",
  telHref: "tel:+905340891070",
  email: "info@akduman.av.tr",
  mailHref: "mailto:info@akduman.av.tr",
  /**
   * WhatsApp numarası varsayılan olarak telefonla aynıdır.
   * TODO: müşteri farklı bir WhatsApp numarası verirse burayı güncelle.
   */
  whatsappNumber: "905340891070",
  whatsappHref: "https://wa.me/905340891070",
  address: {
    full: "Remzi Oğuz Arık, Bestekar Cd No:76/4, 06680 Çankaya/Ankara",
    street: "Remzi Oğuz Arık Mah. Bestekar Cd. No:76/4",
    locality: "Çankaya",
    region: "Ankara",
    postalCode: "06680",
    country: "TR",
  },
} as const;

// ─── Placeholder Sözleşmesi ──────────────────────────────────────────────────
// Kural: değer boş ("") ise ilgili UI bloğu ve schema alanı HİÇ basılmaz.
// Boş satır, "—" veya "yakında" gibi dolgu ASLA yazılmaz.

export const PLACEHOLDERS = {
  /** Ankara Barosu sicil numarası. */
  BARO_SICIL_NO: "", // TODO: müşteriden alınacak
  /** Örn: "Hafta içi 09.00–18.00" */
  CALISMA_SAATLERI: "", // TODO: müşteriden alınacak
  SOSYAL_FACEBOOK_URL: "", // TODO: müşteriden alınacak
  SOSYAL_INSTAGRAM_URL: "", // TODO: müşteriden alınacak
  SOSYAL_YOUTUBE_URL: "", // TODO: müşteriden alınacak
  /** Beyaz logo dosya yolu (örn. "/images/logo-beyaz.png"). */
  LOGO_BEYAZ: "", // TODO: beyaz logo dosyası gelirse yolu yaz
  /** Google Maps embed linki (iframe src). */
  HARITA_EMBED_URL: "", // TODO: müşteriden alınacak
} as const;

// ─── Görsel Manifesti ────────────────────────────────────────────────────────
// ready:false olan her görsel arayüzde PlaceholderImage olarak render edilir.
// Kullanıcı dosyayı public/images/ altına koyup ready:true yaptığında gerçek
// görsel (duotone kaplamayla) devreye girer. bkz. public/images/README.md

export type ImageEntry = {
  src: string;
  alt: string;
  ready: boolean;
};

export const IMAGES: Record<string, ImageEntry> = {
  logo: {
    src: "/images/logo.png",
    alt: "Akduman Hukuk Bürosu logosu",
    ready: false, // TODO: eski sitedeki logo dosyası public/images/logo.png olarak eklenince true yap
  },
  hero: {
    src: "/images/hero.webp",
    alt: "Ankara avukatlık ve hukuki danışmanlık — Akduman Hukuk Bürosu",
    ready: false, // TODO: eski sitedeki Slider-1.webp → public/images/hero.webp
  },
  avukat: {
    src: "/images/av-samed-akduman.jpg",
    alt: "Av. Samed Akduman",
    ready: false, // TODO: portre fotoğrafı eklenince true yap
  },
};

// ─── Menü ────────────────────────────────────────────────────────────────────

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

// ─── Hizmet Envanteri (8 faaliyet alanı) ─────────────────────────────────────

export type Service = {
  /** Kart sıra numarası: "01"–"08" */
  num: string;
  slug: string;
  /** Kart/menü başlığı */
  title: string;
  /** Endeks kartındaki tek cümle */
  oneLiner: string;
  /** Sayfadaki tek H1 */
  h1: string;
  /** <title> — SEO tablosuyla birebir */
  metaTitle: string;
  /** Meta description — SEO tablosuyla birebir */
  metaDescription: string;
  /** Makale eşleştirmede kullanılan alan etiketi */
  alan: string;
};

export const SERVICES: Service[] = [
  {
    num: "01",
    slug: "ceza-hukuku",
    title: "Ceza Hukuku",
    oneLiner: "Soruşturma ve kovuşturma aşamalarında savunma ve hak takibi.",
    h1: "Ankara Ceza Avukatı — Ceza Hukuku",
    metaTitle: "Ankara Ceza Avukatı | Akduman Hukuk Bürosu",
    metaDescription:
      "Ankara'da ceza hukuku: soruşturma ve kovuşturmada müdafilik, tutukluluğa itiraz, istinaf ve temyiz süreçlerinde hukuki destek.",
    alan: "ceza",
  },
  {
    num: "02",
    slug: "gayrimenkul-hukuku",
    title: "Gayrimenkul Hukuku",
    oneLiner: "Tapu, kira ve taşınmaz uyuşmazlıklarında hukuki destek.",
    h1: "Ankara Gayrimenkul Avukatı — Gayrimenkul Hukuku",
    metaTitle: "Ankara Gayrimenkul Avukatı | Akduman Hukuk Bürosu",
    metaDescription:
      "Tapu iptali ve tescil, ortaklığın giderilmesi, ecrimisil, kira ve tahliye uyuşmazlıklarında Ankara'da hukuki destek.",
    alan: "gayrimenkul",
  },
  {
    num: "03",
    slug: "aile-hukuku",
    title: "Aile Hukuku",
    oneLiner: "Boşanma, velayet, nafaka ve mal rejimi uyuşmazlıkları.",
    h1: "Ankara Boşanma ve Aile Hukuku Avukatı",
    metaTitle: "Ankara Boşanma ve Aile Avukatı | Akduman Hukuk Bürosu",
    metaDescription:
      "Anlaşmalı ve çekişmeli boşanma, velayet, nafaka ve mal rejimi davalarında Ankara'da avukatlık hizmeti.",
    alan: "aile",
  },
  {
    num: "04",
    slug: "is-hukuku",
    title: "İş Hukuku",
    oneLiner: "İşçi-işveren uyuşmazlıkları, tazminat ve işe iade süreçleri.",
    h1: "Ankara İş Hukuku Avukatı",
    metaTitle: "Ankara İş Hukuku Avukatı | Akduman Hukuk Bürosu",
    metaDescription:
      "Kıdem ve ihbar tazminatı, işe iade, işçilik alacakları ve arabuluculuk süreçlerinde Ankara'da hukuki destek.",
    alan: "is",
  },
  {
    num: "05",
    slug: "yabancilar-hukuku",
    title: "Yabancılar Hukuku",
    oneLiner: "Oturma izni, çalışma izni ve vatandaşlık başvuruları.",
    h1: "Ankara Yabancılar Hukuku Avukatı",
    metaTitle: "Ankara Yabancılar Hukuku Avukatı | Akduman Hukuk",
    metaDescription:
      "İkamet ve çalışma izni, vatandaşlık başvuruları ve sınır dışı kararına itiraz süreçlerinde hukuki destek.",
    alan: "yabancilar",
  },
  {
    num: "06",
    slug: "miras-hukuku",
    title: "Miras Hukuku",
    oneLiner: "Miras paylaşımı, reddi miras ve veraset işlemleri.",
    h1: "Ankara Miras Avukatı — Miras Hukuku",
    metaTitle: "Ankara Miras Avukatı | Akduman Hukuk Bürosu",
    metaDescription:
      "Miras paylaşımı, reddi miras, veraset ilamı, tenkis ve muris muvazaası davalarında Ankara'da avukatlık hizmeti.",
    alan: "miras",
  },
  {
    num: "07",
    slug: "sigorta-hukuku",
    title: "Sigorta Hukuku",
    oneLiner: "Trafik kazası tazminatları ve sigorta uyuşmazlıkları.",
    h1: "Ankara Sigorta ve Trafik Kazası Avukatı",
    metaTitle: "Ankara Sigorta ve Trafik Kazası Avukatı | Akduman Hukuk",
    metaDescription:
      "Trafik kazası tazminatı, araç değer kaybı ve Sigorta Tahkim Komisyonu başvurularında hukuki destek.",
    alan: "sigorta",
  },
  {
    num: "08",
    slug: "idare-hukuku",
    title: "İdare Hukuku",
    oneLiner: "İptal ve tam yargı davaları, idari başvurular.",
    h1: "Ankara İdare Hukuku Avukatı",
    metaTitle: "Ankara İdare Hukuku Avukatı | Akduman Hukuk Bürosu",
    metaDescription:
      "İptal ve tam yargı davaları, idari başvurular ve disiplin cezalarına itiraz süreçlerinde hukuki destek.",
    alan: "idare",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

// ─── Menü yapısı (hizmetlerden türetilir) ────────────────────────────────────

export const NAV: NavItem[] = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda/" },
  {
    label: "Faaliyet Alanlarımız",
    href: "/faaliyet-alanlarimiz/",
    children: SERVICES.map((s) => ({ label: s.title, href: `/${s.slug}/` })),
  },
  { label: "Hukuki Makaleler", href: "/hukuki-makaleler/" },
  { label: "İletişim", href: "/iletisim/" },
];

// ─── Anasayfa SSS (metinler birebir — DEĞİŞTİRME) ────────────────────────────

export type FaqItem = { question: string; answer: string };

export const HOME_FAQ: FaqItem[] = [
  {
    question: "Avukata vekaletname nasıl çıkarılır?",
    answer:
      "Vekaletname, noter aracılığıyla çıkarılmaktadır. Vekaletname çıkarılırken avukatın adı, soyadı, barosu ve baro sicil numarası noter tarafından talep edilmektedir. Boşanma ve tanıma-tenfiz davaları için çıkarılacak vekaletnamelerde iki adet vesikalık fotoğraf gerekmektedir. Yurt dışında bulunanlar, Türk konsoloslukları aracılığıyla vekaletname düzenletebilmektedir.",
  },
  {
    question: "Avukatlık ücreti nasıl belirlenmektedir?",
    answer:
      "Avukatlık ücreti; işin niteliğine, kapsamına ve harcanacak emek ile mesaiye göre belirlenmektedir. Ücret, Türkiye Barolar Birliği tarafından her yıl yayımlanan Avukatlık Asgari Ücret Tarifesi'nin altında olmamak kaydıyla serbestçe kararlaştırılmaktadır.",
  },
  {
    question: "Ankara dışından hukuki danışmanlık alabilir miyim?",
    answer:
      "Evet. Büromuz; telefon, WhatsApp ve çevrim içi görüntülü görüşme yoluyla şehir dışından ve yurt dışından da danışmanlık hizmeti vermektedir. Dava takibi için vekaletname düzenlenmesi yeterlidir.",
  },
  {
    question: "Hukuki danışmanlık ücretli midir?",
    answer:
      "Hukuki danışmanlık hizmeti ücretli olup, ücret bilgisi görüşme öncesinde tarafınıza iletilmektedir. Ödemenin ardından hukuki değerlendirme aşamasına geçilmektedir.",
  },
  {
    question: "Dava süreçleri ne kadar sürmektedir?",
    answer:
      "Dava süreleri; davanın türüne, mahkemelerin iş yüküne ve dosya kapsamına göre değişiklik göstermektedir. Süreç hakkında dosya özelinde bilgilendirme yapılmaktadır.",
  },
];

// ─── Ortak metinler ──────────────────────────────────────────────────────────

/** Footer 1. sütun büro tanımı (birebir). */
export const FOOTER_TAGLINE =
  "Akduman Hukuk Bürosu, Ankara'da müvekkillerine avukatlık ve hukuki danışmanlık hizmeti sunmaktadır.";

/** Footer alt şerit disclaimer'ı (zorunlu, birebir). */
export const DISCLAIMER =
  "Bu internet sitesinde yer alan bilgiler yalnızca bilgilendirme amaçlıdır; Türkiye Barolar Birliği'nin ilgili mevzuatı uyarınca reklam, teklif veya hukuki danışmanlık niteliği taşımaz.";

/** Tüm hizmet sayfalarının ve makalelerin sonundaki bilgilendirme notu. */
export const INFO_NOTE =
  "Bu sayfadaki bilgiler genel bilgilendirme amaçlıdır; somut olaya ilişkin hukuki değerlendirme için avukata başvurunuz.";
