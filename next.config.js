/** @type {import('next').NextConfig} */
const nextConfig = {
  // Eski WordPress URL'leriyle birebir eşleşme için ZORUNLU:
  // tüm sayfalar sondaki eğik çizgiyle ("/ceza-hukuku/") sunulur.
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
