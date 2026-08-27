/**
 * lib/infaz-hesap.ts — İnfaz (koşullu salıverilme) hesaplama çekirdeği.
 *
 * Kaynak: 5275 sayılı CGTİK m.107 ve geçici m.6 (7242 sayılı kanunla
 * değişik). Tümü SAF ve yan etkisiz fonksiyonlardır — birim testi
 * doğrudan yazılabilir.
 *
 * ⚠️ BİLİNÇLİ KAPSAM SINIRI: müebbet/ağırlaştırılmış müebbet yalnızca
 * "genel suç + tekerrür yok" kombinasyonunda hesaplanır; diğer tüm müebbet
 * kombinasyonları "kapsam dışı" döner. Bu güvenlik supabı özel infaz
 * rejimlerinin (3713, örgütlü suçlar vb.) tablo dışı istisnaları nedeniyle
 * bilinçlidir — GENİŞLETME.
 *
 * Sonuçlar YAKLAŞIKTIR; içtima, mahsup, disiplin, kesinleşme gibi dosyaya
 * özgü değişkenler hesaba katılmaz. Arayüz bu uyarıyı daima gösterir.
 */

export type CezaTuru = "sureli" | "muebbet" | "agirlastirilmis_muebbet";
export type SucGrubu =
  | "genel"
  | "katalog_2_3"
  | "cinsel"
  | "uyusturucu_ticareti"
  | "teror";
export type YasDurumu = "yetiskin" | "cocuk_15_18" | "cocuk_12_15";
export type Tekerrur = "yok" | "mukerrir" | "ikinci_mukerrir";

export type CezaSuresi = { yil: number; ay: number; gun: number };

export type InfazGirdi = {
  cezaTuru: CezaTuru;
  /** Süreli hapis için zorunlu. */
  cezaSuresi?: CezaSuresi;
  sucTarihi: Date;
  sucGrubu: SucGrubu;
  yasDurumu: YasDurumu;
  tekerrur: Tekerrur;
  infazBaslangic: Date;
  /** Tutuklulukta geçen gün (opsiyonel mahsup). */
  mahsupGun?: number;
};

export type InfazSonuc =
  /** İkinci kez mükerrir: koşullu salıverilme uygulanmaz. */
  | { tip: "kosulluYok" }
  /** Bilinçli güvenlik supabı — hesap yapılmaz. */
  | { tip: "kapsamDisi" }
  | {
      tip: "hesap";
      /** Uygulanan koşullu salıverilme oranı ("1/2" gibi görüntü metniyle). */
      oran: number;
      oranMetni: string;
      /** Denetimli serbestlik süresi (yıl) — müebbette null (uygulanmaz notu). */
      dsYil: number | null;
      /** İnfaz kurumunda geçecek süre (mahsup düşülmeden, gün). */
      yatarGun: number;
      yatarParcali: CezaSuresi;
      kosulluTarih: Date;
      /** dsYil null ise null. */
      dsTarih: Date | null;
      /** Çocuk hükümlü bilgi kutusu gösterilsin. */
      cocukNotu: boolean;
      /** cocuk_12_15: değerlerin yanında "±" gösterilsin. */
      yaklasik: boolean;
      /** 30.03.2020 öncesi genel suç → geçici m.6 (DS 3 yıl) uygulandı. */
      gecici6Uygulandi: boolean;
      /** Mükerrirlik nedeniyle oran yükseltildi / geçici 6 dışı bırakıldı. */
      tekerrurNotu: boolean;
    };

/** 7242 sayılı kanunun milat tarihi. */
export const MILAT_7242 = new Date(2020, 2, 30); // 30.03.2020

/** Suç gruplarının m.107 oranları (30.03.2020 sonrası rejim). */
const ORANLAR: Record<SucGrubu, { pay: number; payda: number }> = {
  genel: { pay: 1, payda: 2 },
  katalog_2_3: { pay: 2, payda: 3 },
  cinsel: { pay: 3, payda: 4 },
  uyusturucu_ticareti: { pay: 3, payda: 4 },
  teror: { pay: 3, payda: 4 },
};

/** Takvim bazlı süre ekleme (yıl/ay takvimle, gün gün olarak). */
function tarihEkle(base: Date, s: CezaSuresi): Date {
  const d = new Date(base.getTime());
  d.setFullYear(d.getFullYear() + s.yil);
  d.setMonth(d.getMonth() + s.ay);
  d.setDate(d.getDate() + s.gun);
  return d;
}

function gunEkle(base: Date, gun: number): Date {
  const d = new Date(base.getTime());
  d.setDate(d.getDate() + gun);
  return d;
}

/** Gün toplamını 365/30 kabulüyle yıl/ay/gün'e ayırır. */
export function gunParcala(toplamGun: number): CezaSuresi {
  const yil = Math.floor(toplamGun / 365);
  const kalan = toplamGun - yil * 365;
  const ay = Math.floor(kalan / 30);
  return { yil, ay, gun: kalan - ay * 30 };
}

/** "3 yıl", "2 yıl 3 ay", "45 gün" gibi okunur süre metni. */
export function sureYaz(s: CezaSuresi): string {
  const parca: string[] = [];
  if (s.yil > 0) parca.push(`${s.yil} yıl`);
  if (s.ay > 0) parca.push(`${s.ay} ay`);
  if (s.gun > 0 || parca.length === 0) parca.push(`${s.gun} gün`);
  return parca.join(" ");
}

/** dd.MM.yyyy biçiminde Türkçe tarih. */
export function formatTarih(d: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export function infazHesapla(girdi: InfazGirdi): InfazSonuc {
  const {
    cezaTuru,
    cezaSuresi,
    sucTarihi,
    sucGrubu,
    yasDurumu,
    tekerrur,
    infazBaslangic,
    mahsupGun = 0,
  } = girdi;

  // 3) İkinci kez mükerrir: koşullu salıverilme hiç uygulanmaz.
  if (tekerrur === "ikinci_mukerrir") return { tip: "kosulluYok" };

  const cocukNotu = yasDurumu !== "yetiskin";
  const yaklasik = yasDurumu === "cocuk_12_15";

  // 5) Müebbet türleri — yalnız genel + tekerrür yok kombinasyonu.
  if (cezaTuru !== "sureli") {
    if (sucGrubu !== "genel" || tekerrur !== "yok") {
      return { tip: "kapsamDisi" };
    }
    const ksYil = cezaTuru === "muebbet" ? 24 : 30;
    const kosulluTarih = gunEkle(
      tarihEkle(infazBaslangic, { yil: ksYil, ay: 0, gun: 0 }),
      -mahsupGun
    );
    return {
      tip: "hesap",
      oran: ksYil,
      oranMetni: `${ksYil} yıl (m.107)`,
      dsYil: null,
      yatarGun: ksYil * 365,
      yatarParcali: { yil: ksYil, ay: 0, gun: 0 },
      kosulluTarih,
      dsTarih: null,
      cocukNotu,
      yaklasik,
      gecici6Uygulandi: false,
      tekerrurNotu: false,
    };
  }

  // ── Süreli hapis ──
  const sure = cezaSuresi ?? { yil: 0, ay: 0, gun: 0 };
  const toplamCezaGun = sure.yil * 365 + sure.ay * 30 + sure.gun;

  const sonrasi = sucTarihi.getTime() >= MILAT_7242.getTime();
  let { pay, payda } = ORANLAR[sucGrubu];

  // 2) Geçici m.6: 30.03.2020 öncesi + genel suç → 1/2 ve DS 3 yıl.
  //    Diğer gruplar geçici 6'dan yararlanamaz (kendi oranı, DS 1 yıl).
  let dsYil = 1;
  let gecici6Uygulandi = false;
  if (!sonrasi && sucGrubu === "genel") {
    dsYil = 3;
    gecici6Uygulandi = true;
  }

  // 3) Mükerrir: oran 2/3'ün altına inmez; geçici 6'nın 3 yıllık DS
  //    avantajından yararlanamaz.
  let tekerrurNotu = false;
  if (tekerrur === "mukerrir") {
    tekerrurNotu = true;
    if (pay / payda < 2 / 3) {
      pay = 2;
      payda = 3;
    }
    dsYil = 1;
    gecici6Uygulandi = false;
  }

  const oran = pay / payda;
  const yatarGun = Math.round(toplamCezaGun * oran);
  const yatarParcali = gunParcala(yatarGun);

  // 6) Takvim bazlı ekleme (yıl/ay takvimle) — mahsup gün olarak düşülür.
  const kosulluTarih = gunEkle(tarihEkle(infazBaslangic, yatarParcali), -mahsupGun);
  const dsTarih = tarihEkle(kosulluTarih, { yil: -dsYil, ay: 0, gun: 0 });

  return {
    tip: "hesap",
    oran,
    oranMetni: `${pay}/${payda}`,
    dsYil,
    yatarGun,
    yatarParcali,
    kosulluTarih,
    dsTarih,
    cocukNotu,
    yaklasik,
    gecici6Uygulandi,
    tekerrurNotu,
  };
}
