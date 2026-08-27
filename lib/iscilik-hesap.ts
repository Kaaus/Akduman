import {
  AYLIK_CALISMA_SAATI,
  DAMGA_VERGISI_ORANI,
  KIDEM_TAVANI,
} from "@/lib/hesaplama-sabitleri";

/**
 * lib/iscilik-hesap.ts — İşçilik alacağı hesaplama çekirdeği.
 *
 * Tümü SAF ve yan etkisiz fonksiyonlardır: DOM/state/network yok, aynı
 * girdiye daima aynı çıktı — birim testi doğrudan yazılabilir. Parasal
 * çıktılar 2 ondalığa yuvarlanır; Türkçe görüntüleme için formatPara
 * kullanılır (hesap ara adımları yuvarlanmaz, yalnız sonuçlar).
 *
 * Sonuçlar YAKLAŞIKTIR ve hukuki tavsiye niteliği taşımaz — arayüzde bu
 * uyarı daima gösterilir (bkz. components/hesaplama/IscilikHesaplayici.tsx).
 */

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Parasal değeri 2 ondalığa yuvarlar (kayan nokta artıklarını temizler). */
function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/** 1.234.567,89 biçiminde Türkçe para biçimlendirme (kuruş daima 2 hane). */
export function formatPara(n: number): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

// ─── Hizmet süresi ───────────────────────────────────────────────────────────

export type HizmetSuresi = {
  yil: number;
  ay: number;
  gun: number;
  toplamGun: number;
};

export type HizmetSuresiSonuc =
  | { ok: true; sure: HizmetSuresi }
  | { ok: false; hata: "gecersizAralik" };

/**
 * Gün bazında hizmet süresi. cikis <= giris ise hata durumu döner.
 * yıl/ay/gün ayrıştırması 365 gün = 1 yıl, 30 gün = 1 ay kabulüyle yapılır
 * (kıdem hesabındaki artık-gün oranlamasıyla tutarlı olması için).
 */
export function hizmetSuresi(giris: Date, cikis: Date): HizmetSuresiSonuc {
  const toplamGun = Math.round((cikis.getTime() - giris.getTime()) / MS_PER_DAY);
  if (!Number.isFinite(toplamGun) || toplamGun <= 0) {
    return { ok: false, hata: "gecersizAralik" };
  }
  const yil = Math.floor(toplamGun / 365);
  const kalan = toplamGun - yil * 365;
  const ay = Math.floor(kalan / 30);
  const gun = kalan - ay * 30;
  return { ok: true, sure: { yil, ay, gun, toplamGun } };
}

// ─── Kıdem tazminatı ─────────────────────────────────────────────────────────

export type KidemSonuc =
  | { ok: false; hata: "gecersizAralik" }
  | {
      ok: true;
      sure: HizmetSuresi;
      /** Giydirilmiş brüt ücret (aylık) — brüt + ek ödemeler. */
      giydirilmis: number;
      /** Hesaba esas ücret — tavanla sınırlanmış giydirilmiş ücret. */
      esasUcret: number;
      tavanUygulandi: boolean;
      /** Toplam hizmet 365 günden azsa true; kıdem 0 olur. */
      birYilDolmadi: boolean;
      /** Brüt kıdem tazminatı. */
      kidem: number;
      /** Damga vergisi kesintisi (kıdem gelir vergisinden muaftır). */
      damga: number;
      netKidem: number;
    };

export function kidemHesapla(
  girisT: Date,
  cikisT: Date,
  brutAylik: number,
  ekOdemelerAylik: number
): KidemSonuc {
  const sonuc = hizmetSuresi(girisT, cikisT);
  if (!sonuc.ok) return { ok: false, hata: sonuc.hata };
  const { sure } = sonuc;

  const giydirilmis = round2(brutAylik + ekOdemelerAylik);
  const esasUcret = Math.min(giydirilmis, KIDEM_TAVANI);
  const tavanUygulandi = giydirilmis > KIDEM_TAVANI;

  if (sure.toplamGun < 365) {
    return {
      ok: true,
      sure,
      giydirilmis,
      esasUcret,
      tavanUygulandi,
      birYilDolmadi: true,
      kidem: 0,
      damga: 0,
      netKidem: 0,
    };
  }

  const tamYil = Math.floor(sure.toplamGun / 365);
  const artikGun = sure.toplamGun - tamYil * 365;
  const kidem = round2(esasUcret * tamYil + esasUcret * (artikGun / 365));
  const damga = round2(kidem * DAMGA_VERGISI_ORANI);
  const netKidem = round2(kidem - damga);

  return {
    ok: true,
    sure,
    giydirilmis,
    esasUcret,
    tavanUygulandi,
    birYilDolmadi: false,
    kidem,
    damga,
    netKidem,
  };
}

// ─── İhbar tazminatı ─────────────────────────────────────────────────────────

export type IhbarSonuc = {
  hafta: number;
  /** Brüt ihbar tazminatı — gelir vergisine TABİDİR, net gösterilmez. */
  ihbarBrut: number;
};

/**
 * İhbar süresi (İş K. m.17): <6 ay → 2 hafta · 6 ay–1,5 yıl → 4 hafta ·
 * 1,5–3 yıl → 6 hafta · 3 yıl+ → 8 hafta. Eşikler gün bazında:
 * 6 ay = 182 gün, 1,5 yıl = 547 gün, 3 yıl = 1095 gün.
 */
export function ihbarHesapla(
  hizmetToplamGun: number,
  giydirilmisAylik: number
): IhbarSonuc {
  let hafta: number;
  if (hizmetToplamGun < 182) hafta = 2;
  else if (hizmetToplamGun < 547) hafta = 4;
  else if (hizmetToplamGun < 1095) hafta = 6;
  else hafta = 8;

  const gunluk = giydirilmisAylik / 30;
  const ihbarBrut = round2(gunluk * 7 * hafta);
  return { hafta, ihbarBrut };
}

// ─── Fazla mesai ─────────────────────────────────────────────────────────────

export type FazlaMesaiSonuc = {
  saatUcreti: number;
  /** %50 zamlı saat ücreti. */
  zamliSaatUcreti: number;
  tutar: number;
};

export function fazlaMesaiHesapla(
  brutAylik: number,
  toplamSaat: number
): FazlaMesaiSonuc {
  const saatUcreti = brutAylik / AYLIK_CALISMA_SAATI;
  const zamliSaatUcreti = saatUcreti * 1.5;
  return {
    saatUcreti: round2(saatUcreti),
    zamliSaatUcreti: round2(zamliSaatUcreti),
    tutar: round2(zamliSaatUcreti * toplamSaat),
  };
}

// ─── Yıllık izin ─────────────────────────────────────────────────────────────

export type YillikIzinSonuc = {
  gunlukUcret: number;
  tutar: number;
};

export function yillikIzinHesapla(
  brutAylik: number,
  kullanilmayanGun: number
): YillikIzinSonuc {
  const gunlukUcret = brutAylik / 30;
  return {
    gunlukUcret: round2(gunlukUcret),
    tutar: round2(gunlukUcret * kullanilmayanGun),
  };
}
