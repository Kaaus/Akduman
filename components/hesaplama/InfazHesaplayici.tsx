"use client";

import { useRef, useState } from "react";
import {
  formatTarih,
  infazHesapla,
  sureYaz,
  type CezaTuru,
  type InfazSonuc,
  type SucGrubu,
  type Tekerrur,
  type YasDurumu,
} from "@/lib/infaz-hesap";
import {
  AvukataDanis,
  BosDurum,
  DetayBolumu,
  GizlilikNotu,
  HesapAlan,
  HesapCerceve,
  HesapSecim,
  parseTutar,
  sonucaKaydir,
} from "@/components/hesaplama/ortak";

/**
 * İnfaz (koşullu salıverilme) hesaplayıcısı — İşçilik aracıyla AYNI iki
 * panelli kalıp (ortak.tsx). Sekme yok; tek form. Hesaplama TAMAMEN
 * istemci tarafındadır; hiçbir veri gönderilmez veya saklanmaz.
 */

const GUCLU_UYARI =
  "İnfaz hesabı; içtima, mahsup, disiplin durumu, hükmün kesinleşmesi ve dosyaya özgü birçok değişkene bağlıdır. Bu sonuç yalnızca genel kurallara göre yaklaşık bir tahmindir ve hukuki tavsiye niteliği taşımaz.";

type Hatalar = Partial<Record<string, string>>;

export default function InfazHesaplayici() {
  const [hatalar, setHatalar] = useState<Hatalar>({});
  const [sonuc, setSonuc] = useState<InfazSonuc | null>(null);
  const [cocukNotu, setCocukNotu] = useState(false);
  const [yaklasik, setYaklasik] = useState(false);
  const sonucRef = useRef<HTMLDivElement>(null);

  const [cezaTuru, setCezaTuru] = useState<CezaTuru>("sureli");
  const [yil, setYil] = useState("");
  const [ay, setAy] = useState("");
  const [gun, setGun] = useState("");
  const [sucTarihi, setSucTarihi] = useState("");
  const [sucGrubu, setSucGrubu] = useState<SucGrubu>("genel");
  const [yasDurumu, setYasDurumu] = useState<YasDurumu>("yetiskin");
  const [tekerrur, setTekerrur] = useState<Tekerrur>("yok");
  const [infazBaslangic, setInfazBaslangic] = useState("");
  const [mahsup, setMahsup] = useState("");

  function hesapla() {
    const yeniHata: Hatalar = {};
    const sureli = cezaTuru === "sureli";

    let yilN = 0;
    let ayN = 0;
    let gunN = 0;
    if (sureli) {
      yilN = yil ? parseTutar(yil) : 0;
      ayN = ay ? parseTutar(ay) : 0;
      gunN = gun ? parseTutar(gun) : 0;
      const gecersiz = [yilN, ayN, gunN].some(
        (n) => !Number.isFinite(n) || n < 0 || !Number.isInteger(n)
      );
      if (gecersiz) yeniHata.sure = "Yıl/ay/gün alanlarına geçerli sayılar girin.";
      else if (yilN * 365 + ayN * 30 + gunN <= 0)
        yeniHata.sure = "Ceza süresini girin (en az bir alan sıfırdan büyük olmalı).";
    }
    if (!sucTarihi) yeniHata.sucTarihi = "Suçun işlendiği tarihi girin.";
    if (!infazBaslangic) yeniHata.infazBaslangic = "İnfaz başlangıç tarihini girin.";
    const mahsupN = mahsup ? parseTutar(mahsup) : 0;
    if (mahsup && (!Number.isFinite(mahsupN) || mahsupN < 0 || !Number.isInteger(mahsupN)))
      yeniHata.mahsup = "Geçerli bir gün sayısı girin.";

    setHatalar(yeniHata);
    if (Object.keys(yeniHata).length > 0) return;

    const s = infazHesapla({
      cezaTuru,
      cezaSuresi: sureli ? { yil: yilN, ay: ayN, gun: gunN } : undefined,
      sucTarihi: new Date(sucTarihi),
      sucGrubu,
      yasDurumu,
      tekerrur,
      infazBaslangic: new Date(infazBaslangic),
      mahsupGun: mahsupN,
    });

    setCocukNotu(yasDurumu !== "yetiskin");
    setYaklasik(yasDurumu === "cocuk_12_15");
    setSonuc(s);
    sonucaKaydir(sonucRef);
  }

  const bugun = new Date();
  const pm = yaklasik ? " ±" : "";

  const sol = (
    <form
      className="mt-7 space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        hesapla();
      }}
      noValidate
    >
      <HesapSecim
        id="inf-cezaTuru"
        label="Ceza Türü"
        value={cezaTuru}
        onChange={(v) => setCezaTuru(v as CezaTuru)}
        secenekler={[
          { value: "sureli", label: "Süreli hapis" },
          { value: "muebbet", label: "Müebbet hapis" },
          { value: "agirlastirilmis_muebbet", label: "Ağırlaştırılmış müebbet" },
        ]}
      />

      {cezaTuru === "sureli" && (
        <div>
          <span className="block text-[0.8125rem] font-semibold text-ink-strong">
            Ceza Süresi
          </span>
          <div className="mt-1 grid grid-cols-3 gap-4">
            {(
              [
                ["inf-yil", "Yıl", yil, setYil],
                ["inf-ay", "Ay", ay, setAy],
                ["inf-gun", "Gün", gun, setGun],
              ] as const
            ).map(([id, ph, deger, setDeger]) => (
              <div key={id}>
                <label htmlFor={id} className="sr-only">
                  Ceza süresi — {ph}
                </label>
                <input
                  id={id}
                  type="text"
                  inputMode="numeric"
                  placeholder={ph}
                  value={deger}
                  onChange={(e) => setDeger(e.target.value)}
                  aria-invalid={hatalar.sure ? true : undefined}
                  className={`w-full border-0 border-b-[1.5px] bg-transparent px-0 py-2 font-sans text-[1rem] text-ink outline-none transition-colors ${
                    hatalar.sure
                      ? "border-[#A33A2E]"
                      : "border-line-strong focus:border-navy-800"
                  }`}
                />
              </div>
            ))}
          </div>
          {!hatalar.sure && (
            <p className="mt-1 text-[0.6875rem] leading-relaxed text-muted">
              Mahkeme kararındaki toplam ceza (örn. 6 yıl → 6 / 0 / 0).
            </p>
          )}
          {hatalar.sure && (
            <p role="alert" className="error-text mt-1 text-[0.6875rem]">
              {hatalar.sure}
            </p>
          )}
        </div>
      )}

      <HesapAlan
        id="inf-sucTarihi"
        label="Suçun İşlendiği Tarih"
        hata={hatalar.sucTarihi}
        yardim="30.03.2020 öncesi/sonrası ayrımı (7242 sayılı kanun) otomatik uygulanır."
        inputProps={{
          type: "date",
          value: sucTarihi,
          onChange: (e) => setSucTarihi(e.target.value),
        }}
      />

      <HesapSecim
        id="inf-sucGrubu"
        label="Suç Grubu"
        value={sucGrubu}
        onChange={(v) => setSucGrubu(v as SucGrubu)}
        yardim="Dosyanızdaki suç vasfına en yakın grubu seçin."
        secenekler={[
          { value: "genel", label: "Genel suçlar" },
          { value: "katalog_2_3", label: "Kasten öldürme ve katalog suçlar" },
          { value: "cinsel", label: "Cinsel dokunulmazlığa karşı suçlar" },
          { value: "uyusturucu_ticareti", label: "Uyuşturucu imal ve ticareti" },
          { value: "teror", label: "Terör suçları" },
        ]}
      />

      <HesapSecim
        id="inf-yas"
        label="Yaş Durumu"
        value={yasDurumu}
        onChange={(v) => setYasDurumu(v as YasDurumu)}
        secenekler={[
          { value: "yetiskin", label: "18 yaş ve üzeri" },
          { value: "cocuk_15_18", label: "Suç tarihinde 15-18 yaş" },
          { value: "cocuk_12_15", label: "Suç tarihinde 12-15 yaş" },
        ]}
      />

      <HesapSecim
        id="inf-tekerrur"
        label="Tekerrür"
        value={tekerrur}
        onChange={(v) => setTekerrur(v as Tekerrur)}
        yardim="Önceki kesinleşmiş mahkûmiyet nedeniyle tekerrür hükümleri uygulandıysa."
        secenekler={[
          { value: "yok", label: "Yok" },
          { value: "mukerrir", label: "Mükerrir" },
          { value: "ikinci_mukerrir", label: "İkinci kez mükerrir" },
        ]}
      />

      <HesapAlan
        id="inf-baslangic"
        label="İnfaz Başlangıç / Cezaevine Giriş Tarihi"
        hata={hatalar.infazBaslangic}
        inputProps={{
          type: "date",
          value: infazBaslangic,
          onChange: (e) => setInfazBaslangic(e.target.value),
        }}
      />

      <HesapAlan
        id="inf-mahsup"
        label="Tutuklulukta Geçen Süre (Gün, Opsiyonel)"
        hata={hatalar.mahsup}
        yardim="Tutukluluk/gözaltında geçen ve cezadan mahsup edilecek gün sayısı."
        inputProps={{
          type: "text",
          inputMode: "numeric",
          placeholder: "Örn. 90",
          value: mahsup,
          onChange: (e) => setMahsup(e.target.value),
        }}
      />

      <div className="pt-2 text-center">
        <button type="submit" className="btn-primary">
          Hesapla
        </button>
      </div>
      <GizlilikNotu />
    </form>
  );

  let sag: React.ReactNode;
  if (!sonuc) {
    sag = <BosDurum mesaj="Bilgileri girin, sonucunuz burada görünsün." />;
  } else if (sonuc.tip === "kosulluYok") {
    sag = (
      <div aria-live="polite" className="flex h-full min-h-[280px] flex-col justify-center">
        <p className="kicker-dark">İkinci Kez Mükerrir</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#F4F1EA]/[.85]">
          İkinci kez tekerrür hükümleri uygulanan hükümlüler hakkında koşullu
          salıverilme hükümleri uygulanmaz; cezanın tamamı infaz kurumunda
          çektirilir. Denetimli serbestlik de söz konusu olmaz.
        </p>
        <AvukataDanis uyari={GUCLU_UYARI} />
      </div>
    );
  } else if (sonuc.tip === "kapsamDisi") {
    sag = (
      <div aria-live="polite" className="flex h-full min-h-[280px] flex-col justify-center">
        <p className="kicker-dark">Kapsam Dışı</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#F4F1EA]/[.85]">
          Bu kombinasyon aracın kapsamı dışındadır; müebbet ve ağırlaştırılmış
          müebbet cezalarında özel infaz rejimleri devreye girebildiğinden
          dosyanız için büromuza danışın.
        </p>
        <AvukataDanis uyari={GUCLU_UYARI} />
      </div>
    );
  } else {
    const h = sonuc;
    const gecmis = h.kosulluTarih.getTime() < bugun.getTime();
    sag = (
      <div aria-live="polite">
        <p className="kicker-dark">Koşullu Salıverilme Tarihi</p>
        <p className="mt-1 font-serif text-[clamp(1.9rem,3.4vw,2.5rem)] font-semibold leading-tight text-bronze-300">
          {formatTarih(h.kosulluTarih)}
          {pm}
        </p>

        <ul className="mt-6 space-y-4 border-t border-white/[0.14] pt-5">
          <li className="flex items-baseline justify-between gap-4">
            <span className="text-[0.875rem] font-semibold text-white">
              Denetimli Serbestlik Tarihi
            </span>
            <span className="shrink-0 text-[0.9375rem] font-semibold text-bronze-300">
              {h.dsTarih ? `${formatTarih(h.dsTarih)}${pm}` : "—"}
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-4">
            <span className="text-[0.875rem] font-semibold text-white">
              Yatar (İnfaz Kurumunda)
            </span>
            <span className="shrink-0 text-[0.9375rem] font-semibold text-bronze-300">
              {h.yatarGun} gün ({sureYaz(h.yatarParcali)}){pm}
            </span>
          </li>
        </ul>

        <p className="mt-3 text-[0.75rem] leading-relaxed text-[#F4F1EA]/[.65]">
          Uygulanan oran: {h.oranMetni} · Denetimli serbestlik:{" "}
          {h.dsYil === null ? "uygulanmaz (müebbet)" : `${h.dsYil} yıl`}
          {h.gecici6Uygulandi &&
            " · 30.03.2020 öncesi suç: geçici m.6 (3 yıl DS) uygulandı"}
          {h.tekerrurNotu && " · Mükerrirlik nedeniyle oran/DS sınırlandı"}
        </p>

        {h.dsTarih === null && (
          <p className="mt-2 text-[0.75rem] leading-relaxed text-[#F4F1EA]/[.65]">
            Müebbet cezalarda denetimli serbestlik uygulanmaz.
          </p>
        )}

        {gecmis && (
          <p className="mt-2 text-[0.75rem] leading-relaxed text-bronze-300">
            Hesaplanan tarih bugünden önce görünüyor; koşulları sağlıyor
            olabilirsiniz — dosyanızın güncel durumunu kontrol ettirin.
          </p>
        )}

        {cocukNotu && (
          <p className="mt-4 border-l-[3px] border-bronze-500 py-0.5 pl-4 text-[0.75rem] leading-relaxed text-[#F4F1EA]/[.85]">
            Çocuk hükümlülerde infaz rejimi (özellikle 15 yaş altı dönemde
            geçen sürelerin iki gün sayılması ve eğitimevi uygulamaları)
            dosya bazında önemli farklar yaratır; bu sonuç yalnızca genel
            orana göre tahmindir.
          </p>
        )}

        <DetayBolumu>
          <li>
            Yatar = toplam ceza (yıl 365, ay 30 gün sayılır) × koşullu
            salıverilme oranı; koşullu salıverilme tarihi, infaz
            başlangıcına bu sürenin takvim olarak eklenmesiyle bulunur.
          </li>
          <li>Tutuklulukta geçen günler sonuçtan gün olarak düşülür.</li>
          <li>
            Denetimli serbestlik tarihi, koşullu salıverilme tarihinden DS
            süresinin çıkarılmasıyla bulunur (30.03.2020 öncesi genel
            suçlarda geçici m.6 ile 3 yıl, diğer hâllerde 1 yıl).
          </li>
          <li>
            Mükerrirlerde oran 2/3&rsquo;ün altına inmez; geçici m.6&rsquo;nın
            3 yıllık DS avantajı uygulanmaz.
          </li>
          <li>
            İçtima, disiplin cezaları, hücre süreleri ve iyi hâl
            değerlendirmesi hesaba dahil değildir.
          </li>
        </DetayBolumu>

        <AvukataDanis uyari={GUCLU_UYARI} />
      </div>
    );
  }

  return (
    <HesapCerceve baslik="İnfaz Hesaplama" sol={sol} sag={sag} sagRef={sonucRef} />
  );
}
