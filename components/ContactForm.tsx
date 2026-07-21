"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/site";
import { isValidEmail, isValidTrPhone } from "@/lib/validation";

type Status = "idle" | "sending" | "success" | "error" | "unavailable";
type FieldErrors = { telefon?: string; eposta?: string };

// v2 form stilleri globals.css'te: .input-field (odakta navy çerçeve +
// 3px halka — WCAG 2.4.7 göstergesi), .label-field (14px/600/ink-strong).
const inputClass = "input-field";

const labelClass = "label-field";

/**
 * İletişim formu — anasayfa ve /iletisim/ sayfasında aynı komponent.
 * Gönderim /api/contact üzerinden yapılır; RESEND_API_KEY tanımlı değilse
 * API 503 döner ve kullanıcıya zarif bir alternatif gösterilir.
 * Başarıda sayfa yenilenmeden teşekkür durumu gösterilir.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const successRef = useRef<HTMLDivElement>(null);

  // Başarıda form DOM'dan kalktığı için odak teşekkür kutusuna taşınır.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // İstemci doğrulaması: telefon ZORUNLU + TR biçimi; e-posta opsiyonel,
    // doluysa biçim denetlenir. Sunucu (route.ts) AYNI kuralı tekrar
    // uygular (istemci JS'siz/atlatılmış istekler için).
    const nextErrors: FieldErrors = {};
    if (!isValidTrPhone(data.telefon ?? "")) {
      nextErrors.telefon = "Lütfen geçerli bir telefon numarası girin.";
    }
    if (data.eposta?.trim() && !isValidEmail(data.eposta)) {
      nextErrors.eposta = "Lütfen geçerli bir e-posta adresi girin.";
    }
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }
    setFieldErrors({});

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else if (res.status === 503) {
        setStatus("unavailable");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-center gap-4 rounded-[2px] border border-line bg-paper px-8 py-14 text-center"
      >
        <CheckCircle2 size={32} strokeWidth={1.5} className="text-bronze-500" aria-hidden="true" />
        <p className="font-serif text-2xl font-semibold text-navy-800">
          Mesajınız iletildi.
        </p>
        <p className="max-w-md text-muted">
          Talebiniz tarafımıza ulaşmıştır; en kısa sürede sizinle iletişime
          geçilecektir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-adsoyad" className={labelClass}>
            Ad Soyad <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-adsoyad"
            name="adSoyad"
            type="text"
            required
            maxLength={150}
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cf-eposta" className={labelClass}>
            E-posta
          </label>
          <input
            id="cf-eposta"
            name="eposta"
            // type="text" + inputMode="email" KASITLI: type="email" tarayıcı
            // yerel biçim doğrulamasını tetikler (boş olmasa da) ve
            // handleSubmit hiç çalışmadan kendi (Türkçe olmayan) balonunu
            // gösterir — "alan altında Türkçe mesaj" isteğini bozar.
            // inputMode mobil klavyede @ tuşunu yine de gösterir.
            type="text"
            inputMode="email"
            maxLength={200}
            autoComplete="email"
            aria-invalid={!!fieldErrors.eposta}
            aria-describedby={fieldErrors.eposta ? "cf-eposta-error" : undefined}
            onChange={() =>
              fieldErrors.eposta &&
              setFieldErrors((prev) => ({ ...prev, eposta: undefined }))
            }
            className={inputClass}
          />
          {fieldErrors.eposta && (
            <p id="cf-eposta-error" role="alert" className="error-text mt-1.5 text-[13px]">
              {fieldErrors.eposta}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-telefon" className={labelClass}>
            Telefon <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-telefon"
            name="telefon"
            type="tel"
            maxLength={40}
            autoComplete="tel"
            // native `required` KASITLI kullanılmadı: tarayıcı yerel
            // doğrulaması JS submit handler'ını hiç çalıştırmadan kendi
            // (İngilizce/lokale bağlı) balonunu gösterirdi — "alan altında
            // Türkçe mesaj" isteği bunu engeller. aria-required ekran
            // okuyucu için zorunluluğu korur; gerçek doğrulama aşağıdaki
            // handleSubmit'te (boş DAHİL) yapılır.
            aria-required="true"
            aria-invalid={!!fieldErrors.telefon}
            aria-describedby={fieldErrors.telefon ? "cf-telefon-error" : undefined}
            onChange={() =>
              fieldErrors.telefon &&
              setFieldErrors((prev) => ({ ...prev, telefon: undefined }))
            }
            className={inputClass}
          />
          {fieldErrors.telefon && (
            <p id="cf-telefon-error" role="alert" className="error-text mt-1.5 text-[13px]">
              {fieldErrors.telefon}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-konu" className={labelClass}>
            Konu
          </label>
          <input id="cf-konu" name="konu" type="text" maxLength={200} className={inputClass} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="cf-mesaj" className={labelClass}>
          Mesajınız <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-mesaj"
          name="mesaj"
          rows={6}
          required
          maxLength={5000}
          className={inputClass}
        />
      </div>

      {/* Honeypot — botlara görünür, insanlara görünmez. Doluysa API sessizce
          yok sayar. display:none (hidden attr + class) + tabIndex -1 +
          aria-hidden + autocomplete=off: ekran okuyucu ve klavye tamamen dışında. */}
      <div hidden className="hidden" aria-hidden="true">
        <label htmlFor="cf-website">Web sitesi</label>
        <input
          id="cf-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-5 flex items-start gap-3">
        <input
          id="cf-kvkk"
          name="kvkkOnay"
          type="checkbox"
          required
          value="evet"
          className="mt-1 h-[18px] w-[18px] shrink-0 accent-navy-900"
        />
        <label htmlFor="cf-kvkk" className="text-[14px] leading-relaxed text-muted">
          Kişisel verilerimin,{" "}
          <Link
            href="/kvkk-aydinlatma-metni/"
            className="font-semibold text-bronze-700 underline decoration-2 underline-offset-4 transition-colors hover:text-navy-800"
          >
            KVKK Aydınlatma Metni
          </Link>{" "}
          kapsamında işlenmesini kabul ediyorum.
        </label>
      </div>

      {status === "unavailable" && (
        <p role="alert" className="mt-5 border-l-[3px] border-[#A33A2E] bg-paper px-4 py-3 text-[14px] text-ink">
          Form şu anda kullanılamıyor — bize telefonla veya{" "}
          <a href={SITE.mailHref} className="font-semibold text-bronze-700 underline decoration-2 underline-offset-4">
            {SITE.email}
          </a>{" "}
          adresinden ulaşabilirsiniz.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="error-text mt-5 border-l-[3px] border-[#A33A2E] bg-paper px-4 py-3 text-[14px]">
          Mesajınız gönderilemedi. Lütfen tekrar deneyin veya bize telefonla
          ulaşın.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-7">
        {status === "sending" ? "Gönderiliyor…" : "Gönder"}
        <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" className="btn-arrow" />
      </button>
    </form>
  );
}
