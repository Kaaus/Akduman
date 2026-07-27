import { expect, test } from "@playwright/test";

/**
 * PAKET v16 Görev 1-2 kabul kanıtı — İletişim split akordeon SSS bölümü.
 * Yatay slider tamamen kaldırıldı; bu dosya slider'ın yerini alan Konsept A
 * (sol başlık + sağ akordeon) davranışını doğrular.
 */

test.describe("İletişim SSS — split akordeon (PAKET v16)", () => {
  test("bölümde yatay scrollbar/overflow yok", async ({ page }) => {
    await page.goto("/iletisim/");
    const section = page.locator('section[aria-label="Sıkça sorulan sorular"]');
    await expect(section).toBeVisible();

    const overflow = await section.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        overflowX: style.overflowX,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
      };
    });

    console.log("[Overflow Denetimi]", overflow);

    expect(["visible", "hidden"]).toContain(overflow.overflowX);
    // scrollWidth clientWidth'i aşmamalı — yatay kaydırma alanı yok demek.
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
  });

  test("5 soru render edilir, ilk soru varsayılan açık, tek-açık davranışı çalışır", async ({
    page,
  }) => {
    await page.goto("/iletisim/");
    const buttons = page.locator(
      'section[aria-label="Sıkça sorulan sorular"] h3 > button'
    );
    await expect(buttons).toHaveCount(5);

    // İlk soru varsayılan açık.
    await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "true");
    for (let i = 1; i < 5; i++) {
      await expect(buttons.nth(i)).toHaveAttribute("aria-expanded", "false");
    }

    // İkinci soruya tıklayınca: ikinci açılır, ilki kapanır (tek-açık).
    await buttons.nth(1).click();
    await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "true");
    await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "false");
  });

  test("klavye ile erişim çalışır (Tab + Enter)", async ({ page }) => {
    await page.goto("/iletisim/");
    const buttons = page.locator(
      'section[aria-label="Sıkça sorulan sorular"] h3 > button'
    );

    await buttons.nth(2).focus();
    await expect(buttons.nth(2)).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(buttons.nth(2)).toHaveAttribute("aria-expanded", "true");
    // Tek-açık: ilk soru (varsayılan açık) artık kapalı olmalı.
    await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "false");
  });

  test("mobilde tek sütun: başlık bloğu akordeonun üstünde", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/iletisim/");
    const heading = page.locator("h2", { hasText: "Aramadan Önce" });
    const firstButton = page
      .locator('section[aria-label="Sıkça sorulan sorular"] h3 > button')
      .first();

    const headingBox = await heading.boundingBox();
    const buttonBox = await firstButton.boundingBox();
    if (!headingBox || !buttonBox) throw new Error("Element bulunamadı");

    console.log("[Mobil Sıra Denetimi]", {
      headingY: headingBox.y,
      firstQuestionY: buttonBox.y,
    });

    expect(headingBox.y).toBeLessThan(buttonBox.y);
  });
});
