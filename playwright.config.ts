import { defineConfig } from "@playwright/test";

/**
 * Yalnız hiza/erişilebilirlik denetimi (tests/alignment.spec.ts) için minimal
 * konfigürasyon — üretim test paketi değil. `npm run build` sonrası
 * `npm run start`'ı otomatik ayağa kaldırır.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
