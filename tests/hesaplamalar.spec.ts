import { expect, test } from "@playwright/test";

/**
 * Hesaplamalar bölümü smoke testleri — hub sayfası, araç sayfası ve
 * hesaplayıcının temel akışı (Kıdem & İhbar senaryosu, istemci tarafı).
 */

test.describe("Hesaplamalar — smoke", () => {
  test("hub sayfası render olur ve araca linkler", async ({ page }) => {
    await page.goto("/hesaplamalar/");
    await expect(page.locator("h1", { hasText: "Hesaplamalar" })).toBeVisible();
    const kart = page.locator('a[href="/hesaplamalar/iscilik-alacagi/"]');
    await expect(kart).toBeVisible();
    await kart.click();
    await expect(page).toHaveURL(/\/hesaplamalar\/iscilik-alacagi\/$/);
  });

  test("araç sayfası: hesaplayıcı + açıklayıcı bölüm render olur", async ({
    page,
  }) => {
    await page.goto("/hesaplamalar/iscilik-alacagi/");
    await expect(
      page.locator("h1", { hasText: "İşçilik Alacağı Hesaplama" })
    ).toBeVisible();
    // Üç sekme
    await expect(page.getByRole("tab", { name: "Kıdem & İhbar" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Fazla Mesai" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Yıllık İzin" })).toBeVisible();
    // Boş durum
    await expect(
      page.getByText("Bilgileri girin, sonucunuz burada görünsün.")
    ).toBeVisible();
    // Açıklayıcı bölüm
    await expect(
      page.locator("h2", { hasText: "Kıdem Tazminatı Nasıl Hesaplanır?" })
    ).toBeVisible();
  });

  test("kıdem & ihbar hesabı istemci tarafında çalışır", async ({ page }) => {
    await page.goto("/hesaplamalar/iscilik-alacagi/");
    await page.fill("#ih-giris", "2019-03-14");
    await page.fill("#ih-cikis", "2026-06-02");
    await page.fill("#ih-brut", "85000");
    await page.getByRole("button", { name: "Hesapla", exact: true }).click();

    await expect(page.getByText(/hizmet süreniz için hesaplamanız/)).toBeVisible();
    await expect(page.getByText("Toplam Alacak (Brüt)")).toBeVisible();
    // Tavan uygulanmalı (85.000 > 73.729,87) ve ihbar 8 hafta olmalı
    await expect(page.getByText(/Kıdem tavanı .* uygulanmıştır/)).toBeVisible();
    await expect(
      page.getByText(/8 haftalık bildirim süresi üzerinden/)
    ).toBeVisible();
  });

  test("geçersiz tarih aralığında satır içi hata görünür", async ({ page }) => {
    await page.goto("/hesaplamalar/iscilik-alacagi/");
    await page.fill("#ih-giris", "2026-06-02");
    await page.fill("#ih-cikis", "2019-03-14");
    await page.fill("#ih-brut", "85000");
    await page.getByRole("button", { name: "Hesapla", exact: true }).click();
    await expect(
      page.getByText("Ayrılış tarihi, giriş tarihinden sonra olmalıdır.")
    ).toBeVisible();
    // Sonuç paneli hâlâ boş durumda
    await expect(
      page.getByText("Bilgileri girin, sonucunuz burada görünsün.")
    ).toBeVisible();
  });
});
