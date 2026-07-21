/**
 * İletişim formu doğrulama kuralları — istemci (ContactForm) ve sunucu
 * (app/api/contact/route.ts) TEK kaynaktan aynı kuralları kullanır ki üç
 * katman (etiket/required, istemci doğrulaması, sunucu doğrulaması)
 * birbirinden sapmasın.
 *
 * Telefon ZORUNLUDUR; e-posta opsiyoneldir (doluysa biçimi denetlenir).
 */

/** TR cep telefonu: 5XXXXXXXXX (10 hane), 0 veya +90 önekiyle de kabul edilir. */
const PHONE_REGEX = /^(\+90|0)?5\d{9}$/;

export function isValidTrPhone(raw: string): boolean {
  const normalized = raw.trim().replace(/[\s().-]/g, "");
  return PHONE_REGEX.test(normalized);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(raw: string): boolean {
  return EMAIL_REGEX.test(raw.trim());
}
