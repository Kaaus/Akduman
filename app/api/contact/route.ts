import { NextResponse } from "next/server";

/**
 * İletişim formu API'si.
 * - Zorunlu alan doğrulaması: ad soyad, e-posta, mesaj, KVKK onayı
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

export async function POST(request: Request) {
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

  // Zorunlu alanlar
  if (!adSoyad?.trim() || !eposta?.trim() || !mesaj?.trim() || !kvkkOnay) {
    return NextResponse.json(
      { error: "Lütfen zorunlu alanları doldurun." },
      { status: 400 }
    );
  }

  // Basit e-posta biçim kontrolü
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta)) {
    return NextResponse.json(
      { error: "Geçerli bir e-posta adresi girin." },
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
    `E-posta: ${eposta.trim()}`,
    telefon?.trim() ? `Telefon: ${telefon.trim()}` : null,
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
        reply_to: eposta.trim(),
        subject: konu?.trim()
          ? `İletişim formu: ${konu.trim()}`
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
