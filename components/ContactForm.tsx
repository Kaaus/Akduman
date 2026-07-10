"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error" | "unavailable";

// Not: outline kaldırılmaz — klavye odağında globals.css'teki bronz
// :focus-visible halkası görünür kalır (WCAG 2.4.7).
const inputClass =
  "w-full rounded-[2px] border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 focus:border-bronze-500";

const labelClass = "mb-1.5 block text-[14px] font-semibold text-navy-800";

/**
 * İletişim formu — anasayfa ve /iletisim/ sayfasında aynı komponent.
 * Gönderim /api/contact üzerinden yapılır; RESEND_API_KEY tanımlı değilse
 * API 503 döner ve kullanıcıya zarif bir alternatif gösterilir.
 * Başarıda sayfa yenilenmeden teşekkür durumu gösterilir.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLDivElement>(null);

  // Başarıda form DOM'dan kalktığı için odak teşekkür kutusuna taşınır.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

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
            E-posta <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-eposta"
            name="eposta"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cf-telefon" className={labelClass}>
            Telefon
          </label>
          <input
            id="cf-telefon"
            name="telefon"
            type="tel"
            maxLength={40}
            autoComplete="tel"
            className={inputClass}
          />
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

      {/* Honeypot — botlara görünür, insanlara görünmez. Doluysa API sessizce yok sayar. */}
      <div className="hidden" aria-hidden="true">
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
          className="mt-1.5 h-4 w-4 shrink-0 accent-bronze-500"
        />
        <label htmlFor="cf-kvkk" className="text-[14px] leading-relaxed text-muted">
          Kişisel verilerimin,{" "}
          <Link
            href="/kvkk-aydinlatma-metni/"
            className="font-semibold text-bronze-600 underline underline-offset-4 hover:text-navy-800"
          >
            KVKK Aydınlatma Metni
          </Link>{" "}
          kapsamında işlenmesini kabul ediyorum.
        </label>
      </div>

      {status === "unavailable" && (
        <p role="alert" className="mt-5 border border-line bg-paper px-4 py-3 text-[14px] text-ink">
          Form şu anda kullanılamıyor — bize telefonla veya{" "}
          <a href={SITE.mailHref} className="font-semibold text-bronze-600 underline underline-offset-4">
            {SITE.email}
          </a>{" "}
          adresinden ulaşabilirsiniz.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-5 border border-line bg-paper px-4 py-3 text-[14px] text-ink">
          Mesajınız gönderilemedi. Lütfen tekrar deneyin veya bize telefonla
          ulaşın.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary mt-7 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}
