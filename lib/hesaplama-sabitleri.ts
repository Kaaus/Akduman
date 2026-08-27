/**
 * lib/hesaplama-sabitleri.ts — Hesaplama araçlarının dönemsel sabitleri.
 *
 * ⚠️ BU SABİTLER DÖNEMSELDİR; HER YIL OCAK VE TEMMUZ AYLARINDA
 * GÜNCELLENMELİDİR. Güncel değerler Hazine ve Maliye Bakanlığı
 * genelgelerinden / Resmî Gazete'den teyit edilmelidir.
 */

/**
 * Kıdem tazminatı tavanı (brüt, TL) — 01.07.2026–31.12.2026 dönemi,
 * Hazine ve Maliye Bakanlığı genelgesi. Her Ocak ve Temmuz güncellenir.
 */
export const KIDEM_TAVANI = 73729.87;

/** Damga vergisi oranı (binde 7,59) — kıdem tazminatından kesilen tek vergi. */
export const DAMGA_VERGISI_ORANI = 0.00759;

/**
 * Aylık çalışma saati (fazla mesai saat ücreti paydası) — İş Kanunu
 * uygulamasında yerleşik 225 saat (haftalık 45 saat × 30/6).
 */
export const AYLIK_CALISMA_SAATI = 225;
