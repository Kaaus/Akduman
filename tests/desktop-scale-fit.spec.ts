import { expect, test, type Page } from "@playwright/test";

/**
 * PAKET v17 Görev 2 — %110 masaüstü ölçek sonrası sığma denetimi.
 * html { font-size: 110% } yalnız ≥1024px'te devrede; bu dosya 1280 ve
 * 1366 genişliklerde header/hero/sayfa taşmalarını doğrular.
 */

const WIDTHS = [1280, 1366];
const PAGES_TO_CHECK = [
  "/",
  "/hakkimizda/",
  "/ceza-hukuku/",
  "/iletisim/",
  "/miras-kaldiginda-ilk-olarak-ne-yapilmali/",
];

async function noHorizontalOverflow(page: Page) {
  return page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
}

for (const width of WIDTHS) {
  test.describe(`Sığma denetimi @ ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test(`header tek satırda (logo + 5 menü + Hemen Ara) — ${width}px`, async ({
      page,
    }) => {
      await page.goto("/");
      const navItems = page.locator('nav[aria-label="Ana menü"] > *');
      const count = await navItems.count();
      expect(count).toBeGreaterThanOrEqual(6); // 5 menü öğesi + Hemen Ara

      const boxes = await Promise.all(
        Array.from({ length: count }, (_, i) => navItems.nth(i).boundingBox())
      );
      const ys = boxes.filter(Boolean).map((b) => b!.y);
      const maxDiff = Math.max(...ys) - Math.min(...ys);

      console.log(`[Header ${width}px] öğe y farkı: ${maxDiff.toFixed(2)}px`);
      // Aynı satırda ise tüm öğelerin y'si birbirine çok yakın olmalı.
      expect(maxDiff).toBeLessThanOrEqual(2);

      // Header genel genişlik taşması yok.
      const overflow = await noHorizontalOverflow(page);
      console.log(`[Header ${width}px] overflow:`, overflow);
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
    });

    test(`10 alanlı dropdown paneli viewport içinde — ${width}px`, async ({
      page,
    }) => {
      await page.goto("/");
      const trigger = page.locator('nav[aria-label="Ana menü"] a', {
        hasText: "Faaliyet Alanlarımız",
      });
      await trigger.hover();
      const panel = page.locator("#faaliyet-alt-menu");
      await expect(panel).toHaveClass(/opacity-100/);

      const panelBox = await panel.boundingBox();
      if (!panelBox) throw new Error("Panel bulunamadı");
      const childCount = await panel.locator("a").count();

      console.log(`[Dropdown ${width}px]`, {
        childCount,
        right: panelBox.x + panelBox.width,
        viewportWidth: width,
      });

      expect(childCount).toBe(10);
      expect(panelBox.x).toBeGreaterThanOrEqual(0);
      expect(panelBox.x + panelBox.width).toBeLessThanOrEqual(width + 1);
    });

    for (const path of PAGES_TO_CHECK) {
      test(`yatay scrollbar yok: ${path} — ${width}px`, async ({ page }) => {
        await page.goto(path);
        const overflow = await noHorizontalOverflow(page);
        console.log(`[Overflow ${width}px] ${path}:`, overflow);
        expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
      });
    }

    test(`İletişim SSS akordeonu + form ölçek sonrası düzgün — ${width}px`, async ({
      page,
    }) => {
      await page.goto("/iletisim/");
      const faqButtons = page.locator(
        'section[aria-label="Sıkça sorulan sorular"] h3 > button'
      );
      await expect(faqButtons).toHaveCount(5);
      await expect(faqButtons.nth(0)).toHaveAttribute("aria-expanded", "true");

      // #cf-website: anti-spam honeypot alanı, BİLEREK gizli (tabindex=-1) —
      // görünürlük kontrolüne dahil edilmez.
      const formFields = page.locator(
        'form input:not(#cf-website), form textarea, form button[type="submit"]'
      );
      const formCount = await formFields.count();
      expect(formCount).toBeGreaterThan(0);
      for (let i = 0; i < formCount; i++) {
        await expect(formFields.nth(i)).toBeVisible();
      }

      const overflow = await noHorizontalOverflow(page);
      console.log(`[İletişim ${width}px] overflow:`, overflow);
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
    });
  });
}

test.describe("Hero fold denetimi @ 1366×768 (PAKET v17 Görev 2.3)", () => {
  test.use({ viewport: { width: 1366, height: 768 } });

  test("H1 + butonlar + çerçeveli görsel fold üstünde kalıyor", async ({
    page,
  }) => {
    await page.goto("/");

    const h1 = page.locator("h1", { hasText: "Akduman" });
    const buttons = page.locator("a", { hasText: "Hemen Ara" }).first();
    const framedImage = page.locator("section.bg-navy-950 img").first();

    const h1Box = await h1.boundingBox();
    const buttonsBox = await buttons.boundingBox();
    const imageBox = await framedImage.boundingBox();
    if (!h1Box || !buttonsBox || !imageBox) throw new Error("Element bulunamadı");

    console.log("[Hero Fold 1366×768]", {
      h1Bottom: h1Box.y + h1Box.height,
      buttonsBottom: buttonsBox.y + buttonsBox.height,
      imageBottom: imageBox.y + imageBox.height,
      foldLine: 768,
    });

    expect(h1Box.y + h1Box.height).toBeLessThanOrEqual(768);
    expect(buttonsBox.y + buttonsBox.height).toBeLessThanOrEqual(768);
    expect(imageBox.y + imageBox.height).toBeLessThanOrEqual(768);
  });
});

test.describe("Ölçek doğrulaması: gövde font boyutu", () => {
  test("1024px altında değişmedi, 1280+ üstünde ~%10 büyüdü", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto("/");
    const narrow = await page.evaluate(
      () => getComputedStyle(document.documentElement).fontSize
    );

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const wide = await page.evaluate(
      () => getComputedStyle(document.documentElement).fontSize
    );

    console.log("[Ölçek Raporu]", { "768px (html font-size)": narrow, "1280px (html font-size)": wide });

    expect(narrow).toBe("16px");
    expect(wide).toBe("17.6px"); // 16px * 1.10
  });
});
