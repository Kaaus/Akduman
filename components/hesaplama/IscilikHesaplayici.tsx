"use client";

import { useRef, useState } from "react";
import { KIDEM_TAVANI } from "@/lib/hesaplama-sabitleri";
import {
  fazlaMesaiHesapla,
  formatPara,
  ihbarHesapla,
  kidemHesapla,
  yillikIzinHesapla,
  type HizmetSuresi,
} from "@/lib/iscilik-hesap";
import {
  AvukataDanis,
  BosDurum,
  DetayBolumu,
  GizlilikNotu,
  HesapAlan,
  HesapCerceve,
  parseTutar,
  sonucaKaydir,
} from "@/components/hesaplama/ortak";

/**
 * İşçilik alacağı hesaplayıcısı — ortak iki panelli kalıp (bkz. ortak.tsx)
 * üzerinde üç sekmeli form. Hesaplama TAMAMEN istemci tarafındadır;
 * hiçbir veri gönderilmez veya saklanmaz.
 */

type Sekme = "kidem" | "mesai" | "izin";

const SEKMELER: { key: Sekme; label: string }[] = [
  { key: "kidem", label: "Kıdem & İhbar" },
  { key: "mesai", label: "Fazla Mesai" },
  { key: "izin", label: "Yıllık İzin" },
];

/** Hizmet süresini "7 yıl 2 ay 22 gün" biçiminde okunur yazar. */
function sureMetni(s: HizmetSuresi): string {
  const parca: string[] = [];
  if (s.yil > 0) parca.push(`${s.yil} yıl`);
  if (s.ay > 0) parca.push(`${s.ay} ay`);
  if (s.gun > 0 || parca.length === 0) parca.push(`${s.gun} gün`);
  return parca.join(" ");
}

type SonucSatiri = { etiket: string; deger: string; not?: string };

type Sonuc = {
  baglam: string;
  toplamEtiket: string;
  toplam: number;
  satirlar: SonucSatiri[];
  notlar: string[];
};

type Hatalar = Partial<Record<string, string>>;

export default function IscilikHesaplayici() {
  const [sekme, setSekme] = useState<Sekme>("kidem");
  const [hatalar, setHatalar] = useState<Hatalar>({});
  const [sonuc, setSonuc] = useState<Sonuc | null>(null);
  const sonucRef = useRef<HTMLDivElement>(null);

  // Form alanları (kontrollü — sekmeler arası geçişte değerler korunur)
  const [giris, setGiris] = useState("");
  const [cikis, setCikis] = useState("");
  const [brut, setBrut] = useState("");
  const [ek, setEk] = useState("");
  const [mesaiBrut, setMesaiBrut] = useState("");
  const [mesaiSaat, setMesaiSaat] = useState("");
  const [izinBrut, setIzinBrut] = useState("");
  const [izinGun, setIzinGun] = useState("");

  function hesaplaKidem() {
    const yeniHata: Hatalar = {};
    if (!giris) yeniHata.giris = "İşe giriş tarihini girin.";
    if (!cikis) yeniHata.cikis = "İşten ayrılış tarihini girin.";
    const brutN = parseTutar(brut);
    if (!brut || !Number.isFinite(brutN) || brutN <= 0)
      yeniHata.brut = "Geçerli bir brüt ücret girin.";
    const ekN = ek ? parseTutar(ek) : 0;
    if (ek && (!Number.isFinite(ekN) || ekN < 0))
      yeniHata.ek = "Geçerli bir tutar girin.";

    let girisT: Date | null = null;
    let cikisT: Date | null = null;
    if (giris && cikis) {
      girisT = new Date(giris);
      cikisT = new Date(cikis);
      if (cikisT.getTime() <= girisT.getTime()) {
        yeniHata.cikis = "Ayrılış tarihi, giriş tarihinden sonra olmalıdır.";
      }
    }

    setHatalar(yeniHata);
    if (Object.keys(yeniHata).length > 0 || !girisT || !cikisT) return;

    const k = kidemHesapla(girisT, cikisT, brutN, ekN);
    if (!k.ok) {
      setHatalar({ cikis: "Ayrılış tarihi, giriş tarihinden sonra olmalıdır." });
      return;
    }
    const ihbar = ihbarHesapla(k.sure.toplamGun, k.giydirilmis);

    const satirlar: SonucSatiri[] = [];
    const notlar: string[] = [];

    if (k.birYilDolmadi) {
      satirlar.push({
        etiket: "Kıdem Tazminatı",
        deger: "—",
        not: "Toplam hizmet süresi 1 yılı doldurmadığından kıdem tazminatı doğmamaktadır.",
      });
    } else {
      satirlar.push({
        etiket: "Kıdem Tazminatı (Brüt)",
        deger: `${formatPara(k.kidem)} TL`,
        not: k.tavanUygulandi
          ? `Kıdem tavanı (${formatPara(KIDEM_TAVANI)} TL) uygulanmıştır.`
          : undefined,
      });
      notlar.push(
        `Kıdem tazminatından yalnızca damga vergisi kesilir; kesinti ${formatPara(k.damga)} TL, net kıdem ${formatPara(k.netKidem)} TL.`
      );
    }

    satirlar.push({
      etiket: "İhbar Tazminatı (Brüt)",
      deger: `${formatPara(ihbar.ihbarBrut)} TL`,
      not: `${ihbar.hafta} haftalık bildirim süresi üzerinden. İhbar tazminatı gelir vergisine tabidir.`,
    });

    setSonuc({
      baglam: `${sureMetni(k.sure)} hizmet süreniz için hesaplamanız;`,
      toplamEtiket: "Toplam Alacak (Brüt)",
      toplam: k.kidem + ihbar.ihbarBrut,
      satirlar,
      notlar,
    });
    sonucaKaydir(sonucRef);
  }

  function hesaplaMesai() {
    const yeniHata: Hatalar = {};
    const brutN = parseTutar(mesaiBrut);
    if (!mesaiBrut || !Number.isFinite(brutN) || brutN <= 0)
      yeniHata.mesaiBrut = "Geçerli bir brüt ücret girin.";
    const saatN = parseTutar(mesaiSaat);
    if (!mesaiSaat || !Number.isFinite(saatN) || saatN <= 0)
      yeniHata.mesaiSaat = "Geçerli bir saat girin.";
    setHatalar(yeniHata);
    if (Object.keys(yeniHata).length > 0) return;

    const f = fazlaMesaiHesapla(brutN, saatN);
    setSonuc({
      baglam: `${formatPara(saatN)} saat fazla mesai için hesaplamanız;`,
      toplamEtiket: "Fazla Mesai Ücreti (Brüt)",
      toplam: f.tutar,
      satirlar: [
        { etiket: "Normal Saat Ücreti", deger: `${formatPara(f.saatUcreti)} TL` },
        {
          etiket: "Zamlı Saat Ücreti (%50)",
          deger: `${formatPara(f.zamliSaatUcreti)} TL`,
        },
      ],
      notlar: [],
    });
    sonucaKaydir(sonucRef);
  }

  function hesaplaIzin() {
    const yeniHata: Hatalar = {};
    const brutN = parseTutar(izinBrut);
    if (!izinBrut || !Number.isFinite(brutN) || brutN <= 0)
      yeniHata.izinBrut = "Geçerli bir brüt ücret girin.";
    const gunN = parseTutar(izinGun);
    if (!izinGun || !Number.isFinite(gunN) || gunN <= 0)
      yeniHata.izinGun = "Geçerli bir gün sayısı girin.";
    setHatalar(yeniHata);
    if (Object.keys(yeniHata).length > 0) return;

    const y = yillikIzinHesapla(brutN, gunN);
    setSonuc({
      baglam: `${formatPara(gunN)} gün kullanılmayan izin için hesaplamanız;`,
      toplamEtiket: "Yıllık İzin Ücreti (Brüt)",
      toplam: y.tutar,
      satirlar: [
        { etiket: "Günlük Ücret", deger: `${formatPara(y.gunlukUcret)} TL` },
      ],
      notlar: [],
    });
    sonucaKaydir(sonucRef);
  }

  function hesapla() {
    if (sekme === "kidem") hesaplaKidem();
    else if (sekme === "mesai") hesaplaMesai();
    else hesaplaIzin();
  }

  function sekmeDegistir(yeni: Sekme) {
    setSekme(yeni);
    setHatalar({});
    setSonuc(null);
  }

  const sol = (
    <>
      {/* Sekmeler — aktif sekme bronz alt çizgili */}
      <div role="tablist" aria-label="Hesap türü" className="mt-6 flex justify-center gap-1 border-b border-line-strong">
        {SEKMELER.map((s) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={sekme === s.key}
            onClick={() => sekmeDegistir(s.key)}
            className={`-mb-px border-b-2 px-3 py-2.5 text-[0.875rem] font-semibold transition-colors sm:px-4 ${
              sekme === s.key
                ? "border-bronze-500 text-ink-strong"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <form
        className="mt-7 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          hesapla();
        }}
        noValidate
      >
        {sekme === "kidem" && (
          <>
            <HesapAlan
              id="ih-giris"
              label="İşe Giriş Tarihi"
              hata={hatalar.giris}
              inputProps={{ type: "date", value: giris, onChange: (e) => setGiris(e.target.value) }}
            />
            <HesapAlan
              id="ih-cikis"
              label="İşten Ayrılış Tarihi"
              hata={hatalar.cikis}
              inputProps={{ type: "date", value: cikis, onChange: (e) => setCikis(e.target.value) }}
            />
            <HesapAlan
              id="ih-brut"
              label="Son Aylık Brüt Ücret (TL)"
              hata={hatalar.brut}
              yardim="Bordronuzdaki brüt tutar (net maaş değil)."
              inputProps={{
                type: "text",
                inputMode: "decimal",
                placeholder: "Örn. 85.000",
                value: brut,
                onChange: (e) => setBrut(e.target.value),
              }}
            />
            <HesapAlan
              id="ih-ek"
              label="Brüt Ek Ödemeler (Opsiyonel, TL)"
              hata={hatalar.ek}
              yardim="İkramiye, yol, yemek vb. aylık brüt toplamı."
              inputProps={{
                type: "text",
                inputMode: "decimal",
                placeholder: "Örn. 5.000",
                value: ek,
                onChange: (e) => setEk(e.target.value),
              }}
            />
          </>
        )}

        {sekme === "mesai" && (
          <>
            <HesapAlan
              id="ih-mesaiBrut"
              label="Son Aylık Brüt Ücret (TL)"
              hata={hatalar.mesaiBrut}
              yardim="Bordronuzdaki brüt tutar (net maaş değil)."
              inputProps={{
                type: "text",
                inputMode: "decimal",
                placeholder: "Örn. 45.000",
                value: mesaiBrut,
                onChange: (e) => setMesaiBrut(e.target.value),
              }}
            />
            <HesapAlan
              id="ih-mesaiSaat"
              label="Toplam Fazla Mesai Saati"
              hata={hatalar.mesaiSaat}
              yardim="Ücreti ödenmeyen toplam fazla çalışma saati."
              inputProps={{
                type: "text",
                inputMode: "decimal",
                placeholder: "Örn. 20",
                value: mesaiSaat,
                onChange: (e) => setMesaiSaat(e.target.value),
              }}
            />
          </>
        )}

        {sekme === "izin" && (
          <>
            <HesapAlan
              id="ih-izinBrut"
              label="Son Aylık Brüt Ücret (TL)"
              hata={hatalar.izinBrut}
              yardim="Bordronuzdaki brüt tutar (net maaş değil)."
              inputProps={{
                type: "text",
                inputMode: "decimal",
                placeholder: "Örn. 45.000",
                value: izinBrut,
                onChange: (e) => setIzinBrut(e.target.value),
              }}
            />
            <HesapAlan
              id="ih-izinGun"
              label="Kullanılmayan İzin Günü"
              hata={hatalar.izinGun}
              yardim="İş sözleşmesi sona ererken kullanılmamış yıllık izin günü sayısı."
              inputProps={{
                type: "text",
                inputMode: "numeric",
                placeholder: "Örn. 14",
                value: izinGun,
                onChange: (e) => setIzinGun(e.target.value),
              }}
            />
          </>
        )}

        <div className="pt-2 text-center">
          <button type="submit" className="btn-primary">
            Hesapla
          </button>
        </div>
        <GizlilikNotu />
      </form>
    </>
  );

  const sag = !sonuc ? (
    <BosDurum mesaj="Bilgileri girin, sonucunuz burada görünsün." />
  ) : (
    <div aria-live="polite">
      <p className="text-[0.9375rem] leading-relaxed text-[#F4F1EA]/[.85]">
        {sonuc.baglam}
      </p>

      <p className="kicker-dark mt-6">{sonuc.toplamEtiket}</p>
      <p className="mt-1 font-serif text-[clamp(1.9rem,3.4vw,2.5rem)] font-semibold leading-tight text-bronze-300">
        {formatPara(sonuc.toplam)} TL
      </p>

      <ul className="mt-6 space-y-4 border-t border-white/[0.14] pt-5">
        {sonuc.satirlar.map((satir) => (
          <li key={satir.etiket}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[0.875rem] font-semibold text-white">
                {satir.etiket}
              </span>
              <span className="shrink-0 text-[0.9375rem] font-semibold text-bronze-300">
                {satir.deger}
              </span>
            </div>
            {satir.not && (
              <p className="mt-1 text-[0.75rem] leading-relaxed text-[#F4F1EA]/[.65]">
                {satir.not}
              </p>
            )}
          </li>
        ))}
      </ul>

      {sonuc.notlar.map((not) => (
        <p key={not} className="mt-3 text-[0.75rem] leading-relaxed text-[#F4F1EA]/[.65]">
          {not}
        </p>
      ))}

      <DetayBolumu>
        <li>
          Kıdem: giydirilmiş brüt ücret × tam yıl + artık günler için kıst
          hesap (365 gün = 1 yıl). Esas ücret, kıdem tavanı
          ({formatPara(KIDEM_TAVANI)} TL, 01.07.2026–31.12.2026) ile
          sınırlıdır.
        </li>
        <li>
          Kıdem tazminatı gelir vergisinden muaftır; yalnızca binde 7,59
          damga vergisi kesilir.
        </li>
        <li>
          İhbar: hizmet süresine göre 2–8 haftalık bildirim süresi × günlük
          giydirilmiş ücret × 7. İhbar tazminatı gelir vergisine tabidir;
          tutar brüttür.
        </li>
        <li>Fazla mesai: aylık brüt ÷ 225 saat × 1,5 × saat.</li>
        <li>Yıllık izin: aylık brüt ÷ 30 × kullanılmayan gün.</li>
      </DetayBolumu>

      <AvukataDanis uyari="Sonuçlar yaklaşıktır; hukuki tavsiye niteliği taşımaz." />
    </div>
  );

  return (
    <HesapCerceve
      baslik="İşçilik Alacağı Hesaplama"
      sol={sol}
      sag={sag}
      sagRef={sonucRef}
    />
  );
}
