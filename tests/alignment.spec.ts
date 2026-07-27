import { expect, test, type Page } from "@playwright/test";

/**
 * PAKET v15 Görev 5 — sola yaslama sonrası hiza denetimi.
 * Ölçüm birimi: container'ın (kicker'ı taşıyan doğrudan üst div / .card)
 * sayfa görünümündeki SOL kenar x koordinatı (boundingBox().x), CSS
 * piksel cinsinden. Tolerans ±2px — spec'te istenen tam değer.
 */

const TOLERANCE = 2;

async function leftX(page: Page, locator: ReturnType<Page["locator"]>) {
  const box = await locator.boundingBox();
  if (!box) throw new Error("Element bulunamadı / görünmüyor");
  return box.x;
}

test.describe("Hiza denetimi — sola yaslama (PAKET v15 Görev 5)", () => {
  test("Anasayfa: hero, tanıtım bandı, Hizmetlerimiz aynı sol hizada", async ({
    page,
  }) => {
    await page.goto("/");

    // Hero içerik bloğu — kicker-dark'ın doğrudan üst div'i (padding/margin yok).
    const heroLeft = await leftX(
      page,
      page.locator("p.kicker-dark", { hasText: "Ankara" }).locator("..")
    );
    // Tanıtım bandı — kicker'ın (text="Ankara") doğrudan üst div'i (max-w-3xl).
    const tanitimLeft = await leftX(
      page,
      page
        .locator("#tanitim p.kicker", { hasText: "Ankara" })
        .locator("..")
    );
    // Hizmetlerimiz — SectionHeading kök div'i (kicker'ın doğrudan üstü).
    const hizmetlerLeft = await leftX(
      page,
      page
        .locator("p.kicker", { hasText: "Faaliyet Alanlarımız" })
        .locator("..")
    );

    console.log("[Hiza Raporu — Anasayfa]");
    console.log(`  hero sol kenar         : ${heroLeft.toFixed(2)}px`);
    console.log(`  tanıtım bandı sol kenar : ${tanitimLeft.toFixed(2)}px`);
    console.log(`  Hizmetlerimiz sol kenar : ${hizmetlerLeft.toFixed(2)}px`);
    console.log(
      `  fark (tanıtım-hero)     : ${(tanitimLeft - heroLeft).toFixed(2)}px`
    );
    console.log(
      `  fark (hizmetler-hero)   : ${(hizmetlerLeft - heroLeft).toFixed(2)}px`
    );

    expect(Math.abs(tanitimLeft - heroLeft)).toBeLessThanOrEqual(TOLERANCE);
    expect(Math.abs(hizmetlerLeft - heroLeft)).toBeLessThanOrEqual(TOLERANCE);
  });

  test("Hakkımızda: intro, Vizyon-Misyon, avukat kartı aynı sol hizada", async ({
    page,
  }) => {
    await page.goto("/hakkimizda/");

    // Intro — kicker'ın (text="Hakkımızda") doğrudan üst div'i (max-w-3xl).
    const introLeft = await leftX(
      page,
      page.locator("p.kicker", { hasText: "Hakkımızda" }).locator("..")
    );
    // Vizyon & Misyon — VİZYON kartının İKİ üstü (grid wrapper).
    const vizyonMisyonLeft = await leftX(
      page,
      page
        .locator("p", { hasText: "VİZYON" })
        .locator("..")
        .locator("..")
    );
    // Avukat kartı — .card elementinin kendisi (sayfada tek).
    const avukatLeft = await leftX(page, page.locator(".card"));

    console.log("[Hiza Raporu — Hakkımızda]");
    console.log(`  intro sol kenar          : ${introLeft.toFixed(2)}px`);
    console.log(`  Vizyon-Misyon sol kenar  : ${vizyonMisyonLeft.toFixed(2)}px`);
    console.log(`  avukat kartı sol kenar   : ${avukatLeft.toFixed(2)}px`);
    console.log(
      `  fark (vizyon-intro)      : ${(vizyonMisyonLeft - introLeft).toFixed(2)}px`
    );
    console.log(
      `  fark (avukat-intro)      : ${(avukatLeft - introLeft).toFixed(2)}px`
    );

    expect(Math.abs(vizyonMisyonLeft - introLeft)).toBeLessThanOrEqual(
      TOLERANCE
    );
    expect(Math.abs(avukatLeft - introLeft)).toBeLessThanOrEqual(TOLERANCE);
  });

  test("Sayfa H1 blokları (PageHeading) merkez hizalı KALDI", async ({
    page,
  }) => {
    await page.goto("/hakkimizda/");
    const viewport = page.viewportSize();
    if (!viewport) throw new Error("Viewport bilgisi yok");

    const h1Box = await page.locator("h1", { hasText: "Hakkımızda" }).boundingBox();
    if (!h1Box) throw new Error("H1 bulunamadı");
    const h1Center = h1Box.x + h1Box.width / 2;
    const viewportCenter = viewport.width / 2;

    console.log("[Hiza Raporu — PageHeading merkez kontrolü]");
    console.log(`  H1 merkezi        : ${h1Center.toFixed(2)}px`);
    console.log(`  viewport merkezi  : ${viewportCenter.toFixed(2)}px`);

    // Geniş tolerans (8px): H1 genişliği metne göre değiştiğinden tam
    // merkezleme ancak yaklaşık kontrol edilebilir; amaç, sola yaslamanın
    // PageHeading'e SIZMADIĞINI doğrulamak.
    expect(Math.abs(h1Center - viewportCenter)).toBeLessThanOrEqual(8);
  });
});
