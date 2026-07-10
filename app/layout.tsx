import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { legalServiceSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

/**
 * Tipografi v2: Fraunces (display, variable — tek dosya; SOFT/WONK 0
 * "ciddi mod" ayarı globals.css'te) + Hanken Grotesk (gövde/UI, variable).
 * latin-ext alt kümesi Türkçe karakterlerin (İĞŞÇÖÜ ığşçöü) kusursuz
 * render edilmesi için zorunludur.
 */
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // Varsayılan başlık — her sayfa kendi başlığını mutlak olarak tanımlar.
  title: { absolute: "Ankara Avukat | Akduman Hukuk Bürosu – Av. Samed Akduman" },
  description:
    "Ankara'da ceza, aile, miras, iş, sigorta, gayrimenkul, idare ve yabancılar hukuku alanlarında avukatlık ve hukuki danışmanlık. ☎ +90 534 089 10 70",
  // Kendi metadata'sını tanımlamayan sayfalar (örn. 404) için varsayılan
  // paylaşım görseli; buildMetadata kullanan sayfalar kendi og set'ini kurar.
  openGraph: {
    siteName: SITE.name,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Akduman Hukuk Bürosu — Ankara • Avukatlık & Hukuki Danışmanlık",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${fraunces.variable} ${hanken.variable}`}>
      <body className="font-sans">
        {/* Global yapılandırılmış veri: LegalService (tüm sayfalarda) */}
        <JsonLd data={legalServiceSchema()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
