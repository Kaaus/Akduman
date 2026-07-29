/** @type {import('next').NextConfig} */
const nextConfig = {
  // Eski WordPress URL'leriyle birebir eşleşme için ZORUNLU:
  // tüm sayfalar sondaki eğik çizgiyle ("/ceza-hukuku/") sunulur.
  trailingSlash: true,
  reactStrictMode: true,

  // Eski WordPress adresleri Google'da hâlâ indeksli ve şu an 404 veriyor
  // (doğrulanmış örnekler: /category/makaleler/, /tag/izale-i-suyu/) — 301
  // ile yeni karşılıklarına yönlendirilir. trailingSlash:true incoming
  // isteği otomatik normalize etmiyor; her kural hem eğik çizgili hem
  // çizgisiz varyantla tanımlanır ki hangisi gelirse gelsin yakalansın.
  // SIRA ÖNEMLİ: özel eşleme (izale-i şuyu) genel /tag/:path*'tan ÖNCE
  // gelmeli, aksi hâlde genel kural onu da yakalar.
  async redirects() {
    return [
      // 1. Özel eşleme — izale-i şuyu, ortaklığın giderilmesi davasının eski
      //    adı; birebir içerik karşılığı bu makale.
      {
        source: "/tag/izale-i-suyu",
        destination: "/ortakligin-giderilmesi-davasi-nedir/",
        permanent: true,
      },
      {
        source: "/tag/izale-i-suyu/",
        destination: "/ortakligin-giderilmesi-davasi-nedir/",
        permanent: true,
      },

      // 2. Kategori arşivi → makale arşivi
      {
        source: "/category",
        destination: "/hukuki-makaleler/",
        permanent: true,
      },
      {
        source: "/category/",
        destination: "/hukuki-makaleler/",
        permanent: true,
      },
      {
        source: "/category/:path*",
        destination: "/hukuki-makaleler/",
        permanent: true,
      },

      // 3. Etiket arşivi (genel) → makale arşivi — 1. kuralda yakalanmayan
      //    tüm /tag/* adresleri.
      {
        source: "/tag",
        destination: "/hukuki-makaleler/",
        permanent: true,
      },
      {
        source: "/tag/",
        destination: "/hukuki-makaleler/",
        permanent: true,
      },
      {
        source: "/tag/:path*",
        destination: "/hukuki-makaleler/",
        permanent: true,
      },

      // 4. WordPress yazar arşivi kalıntısı → Hakkımızda
      {
        source: "/author",
        destination: "/hakkimizda/",
        permanent: true,
      },
      {
        source: "/author/",
        destination: "/hakkimizda/",
        permanent: true,
      },
      {
        source: "/author/:path*",
        destination: "/hakkimizda/",
        permanent: true,
      },

      // 5. Eski makale liste yolu ihtimaline karşı — /hukuki-makaleler'in
      //    kendisi bu kurallardan etkilenmez (farklı segment adı: "makaleler").
      {
        source: "/makaleler",
        destination: "/hukuki-makaleler/",
        permanent: true,
      },
      {
        source: "/makaleler/",
        destination: "/hukuki-makaleler/",
        permanent: true,
      },
      {
        source: "/makaleler/:path*",
        destination: "/hukuki-makaleler/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
