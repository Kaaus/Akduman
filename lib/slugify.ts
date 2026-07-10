/**
 * Başlık → id dönüştürücü (TocRail bağlantıları için).
 * MDX gövdesindeki H2'lere ve "Bu sayfada" rayına AYNI algoritma uygulanır;
 * Türkçe karakterler ASCII'ye indirgenir.
 */
export function slugifyHeading(text: string): string {
  const map: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ı: "i",
    ö: "o",
    ş: "s",
    ü: "u",
    â: "a",
    î: "i",
    û: "u",
  };
  return text
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşüâîû]/g, (m) => map[m] ?? m)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
