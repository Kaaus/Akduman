import { NextResponse } from "next/server";
import { isValidEmail, isValidTrPhone } from "@/lib/validation";

/**
 * İletişim formu API'si.
 * - Zorunlu alan doğrulaması: ad soyad, TELEFON (e-posta DEĞİL), mesaj,
 *   KVKK onayı — istemcideki (ContactForm.tsx) kuralla AYNI kaynaktan
 *   (lib/validation.ts) geldiği için üç katman (etiket/required, istemci,
 *   sunucu) birbirinden sapamaz.
 * - Honeypot: "website" alanı doluysa bot kabul edilir, 200 dönülür ama
 *   e-posta GÖNDERİLMEZ (bota başarısız olduğunu belli etmemek için).
 * - RESEND_API_KEY tanımlı değilse 503 döner; istemci zarif bir
 *   alternatif mesaj gösterir.
 */

type ContactPayload = {
  adSoyad?: string;
  eposta?: string;
  telefon?: string;
  konu?: string;
  mesaj?: string;
  kvkkOnay?: string;
  website?: string; // honeypot
};

/** Alan başına makul üst sınırlar (istemcideki maxLength ile uyumlu). */
const MAX_LEN = { adSoyad: 150, eposta: 200, telefon: 40, konu: 200, mesaj: 5000 };

/**
 * Basit istek sınırlayıcı — IP başına 10 dakikada en fazla 5 gönderim.
 * Not: serverless ortamda örnek (instance) başına çalışır; tam koruma değil,
 * kaba spam'e karşı en-iyi-çaba savunmasıdır.
 */
const rateWindow = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateWindow.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_LIMIT) {
    rateWindow.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateWindow.set(ip, hits);
  return false;
}

export async function POST(request: Request) {
  // Kaba spam savunması: IP başına pencere sınırı
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Çok fazla istek. Lütfen daha sonra tekrar deneyin." },
      { status: 429 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const { adSoyad, eposta, telefon, konu, mesaj, kvkkOnay, website } = body;

  // Honeypot dolu → bot. Sessizce başarılı gibi yanıtla, e-posta gönderme.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // Zorunlu alanlar — telefon zorunlu, e-posta OPSİYONEL
  if (!adSoyad?.trim() || !telefon?.trim() || !mesaj?.trim() || !kvkkOnay) {
    return NextResponse.json(
      { error: "Lütfen zorunlu alanları doldurun." },
      { status: 400 }
    );
  }

  // Uzunluk sınırları
  if (
    adSoyad.length > MAX_LEN.adSoyad ||
    (eposta?.length ?? 0) > MAX_LEN.eposta ||
    telefon.length > MAX_LEN.telefon ||
    (konu?.length ?? 0) > MAX_LEN.konu ||
    mesaj.length > MAX_LEN.mesaj
  ) {
    return NextResponse.json(
      { error: "Alan uzunluğu sınırı aşıldı." },
      { status: 400 }
    );
  }

  // Telefon biçim kontrolü (zorunlu)
  if (!isValidTrPhone(telefon)) {
    return NextResponse.json(
      { error: "Lütfen geçerli bir telefon numarası girin." },
      { status: 400 }
    );
  }

  // E-posta opsiyonel — doluysa biçim kontrolü
  if (eposta?.trim() && !isValidEmail(eposta)) {
    return NextResponse.json(
      { error: "Lütfen geçerli bir e-posta adresi girin." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Env tanımlı değil → istemci telefon/e-posta alternatifini gösterir.
    return NextResponse.json(
      { error: "Form şu anda kullanılamıyor." },
      { status: 503 }
    );
  }

  const to = process.env.CONTACT_TO || "info@akduman.av.tr";
  const from = process.env.CONTACT_FROM || "Akduman Hukuk <onboarding@resend.dev>";

  const text = [
    `Ad Soyad: ${adSoyad.trim()}`,
    `Telefon: ${telefon.trim()}`,
    // E-posta opsiyonel — doldurulmadıysa satır hiç eklenmez.
    eposta?.trim() ? `E-posta: ${eposta.trim()}` : null,
    konu?.trim() ? `Konu: ${konu.trim()}` : null,
    "",
    "Mesaj:",
    mesaj.trim(),
    "",
    "— akduman.av.tr iletişim formu (KVKK onayı alınmıştır)",
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // reply_to yalnızca e-posta doldurulduysa gönderilir; boşsa Resend
        // varsayılan olarak `from` adresini kullanır.
        ...(eposta?.trim() ? { reply_to: eposta.trim() } : {}),
        // Konu tek satıra indirgenir (başlık alanına satır sonu sızmasın)
        subject: konu?.trim()
          ? `İletişim formu: ${konu.trim().replace(/[\r\n]+/g, " ").slice(0, 150)}`
          : "İletişim formu mesajı",
        text,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Mesaj gönderilemedi." },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Mesaj gönderilemedi." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
