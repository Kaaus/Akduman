import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { legalServiceSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

/**
 * Tipografi: Cormorant Garamond (başlıklar) + Source Sans 3 (gövde/UI).
 * latin-ext alt kümesi Türkçe karakterlerin (ğ, ş, İ, ı, ö, ü, ç)
 * kusursuz render edilmesi için zorunludur.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin-ext", "latin"],
  weight: ["600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin-ext", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // Varsayılan başlık — her sayfa kendi başlığını mutlak olarak tanımlar.
  title: { absolute: "Ankara Avukat | Akduman Hukuk Bürosu – Av. Samed Akduman" },
  description:
    "Ankara'da ceza, aile, miras, iş, sigorta, gayrimenkul, idare ve yabancılar hukuku alanlarında avukatlık ve hukuki danışmanlık. ☎ +90 534 089 10 70",
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${sourceSans.variable}`}>
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
