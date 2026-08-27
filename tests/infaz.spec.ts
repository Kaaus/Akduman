import { expect, test } from "@playwright/test";

/** İnfaz Hesaplama aracı smoke testleri. */

test.describe("İnfaz Hesaplama — smoke", () => {
  test("sayfa render olur; hub kartından ulaşılır", async ({ page }) => {
    await page.goto("/araclar/");
    const kart = page.locator('a[href="/araclar/infaz-hesaplama/"]');
    await expect(kart).toBeVisible();
    await kart.click();
    await expect(page).toHaveURL(/\/araclar\/infaz-hesaplama\/$/);
    await expect(
      page.locator("h1", { hasText: "İnfaz Hesaplama" })
    ).toBeVisible();
    await expect(
      page.getByText("Bilgileri girin, sonucunuz burada görünsün.")
    ).toBeVisible();
  });

  test("süreli genel suç hesabı: KS/DS tarihleri ve oran görünür", async ({
    page,
  }) => {
    await page.goto("/araclar/infaz-hesaplama/");
    await page.fill("#inf-yil", "6");
    await page.fill("#inf-sucTarihi", "2021-06-15");
    await page.fill("#inf-baslangic", "2024-01-01");
    await page.getByRole("button", { name: "Hesapla", exact: true }).click();

    await expect(
      page.getByText("Koşullu Salıverilme Tarihi", { exact: true })
    ).toBeVisible();
    await expect(page.getByText("01.01.2027")).toBeVisible();
    await expect(page.getByText("01.01.2026")).toBeVisible();
    await expect(page.getByText(/Uygulanan oran: 1\/2/)).toBeVisible();
  });

  test("ikinci mükerrir: koşullu salıverilme yok mesajı", async ({ page }) => {
    await page.goto("/araclar/infaz-hesaplama/");
    await page.fill("#inf-yil", "6");
    await page.fill("#inf-sucTarihi", "2021-06-15");
    await page.fill("#inf-baslangic", "2024-01-01");
    await page.selectOption("#inf-tekerrur", "ikinci_mukerrir");
    await page.getByRole("button", { name: "Hesapla", exact: true }).click();
    await expect(
      page.getByText(/koşullu salıverilme hükümleri uygulanmaz/)
    ).toBeVisible();
  });

  test("müebbet + terör: kapsam dışı mesajı", async ({ page }) => {
    await page.goto("/araclar/infaz-hesaplama/");
    await page.selectOption("#inf-cezaTuru", "muebbet");
    await page.selectOption("#inf-sucGrubu", "teror");
    await page.fill("#inf-sucTarihi", "2021-06-15");
    await page.fill("#inf-baslangic", "2024-01-01");
    await page.getByRole("button", { name: "Hesapla", exact: true }).click();
    await expect(
      page.getByText(/Bu kombinasyon aracın kapsamı dışındadır/)
    ).toBeVisible();
  });

  test("eksik alanlarda satır içi hatalar görünür", async ({ page }) => {
    await page.goto("/araclar/infaz-hesaplama/");
    await page.getByRole("button", { name: "Hesapla", exact: true }).click();
    await expect(page.getByText(/Ceza süresini girin/)).toBeVisible();
    await expect(page.getByText("Suçun işlendiği tarihi girin.")).toBeVisible();
    await expect(
      page.getByText("İnfaz başlangıç tarihini girin.")
    ).toBeVisible();
  });
});
