# public/images — Yüklenecek Görseller

Aşağıdaki dosyaları bu klasöre koyduktan sonra `lib/site.ts` içindeki
`IMAGES` manifestinde ilgili girdinin `ready` değerini `true` yapın.
Dosya gelene kadar sitede zarif bir yer tutucu ("Görsel eklenecek") görünür.

| Dosya adı | Kaynak | Kullanım yeri |
|---|---|---|
| `logo-monogram.png` | Kare monogram (485×485, şeffaf) — hem açık hem koyu zeminde aynı dosya | Header/Footer/mobil menü (`BrandLockup`, dar alan) + JSON-LD + favicon/og |
| `logo-tam.png` | Yazılı tam logo (1435×486 ≈ 2.95:1, şeffaf) — monogram + "AKDUMAN HUKUK & DANIŞMANLIK" | `BrandLockup`, yalnız masaüstü (≥1024px) |
| `hero.webp` | Eski sitedeki `Slider-1.webp` | Anasayfa hero görseli |
| `av-samed-akduman.jpg` | Portre fotoğrafı | Hakkımızda avukat kartı + makale yazar kutusu |

## İsteğe bağlı

- **Makale kapakları**: kapak eklemek isterseniz görseli buraya koyup
  `lib/articles.ts` içindeki ilgili makalenin `cover` alanına yolunu yazın
  (örn. `/images/kapak-arac-deger-kaybi.jpg`). Kapaklı makalelerde og:image
  otomatik olarak kapağa döner.

Not: Tüm fotoğraflar sitede otomatik olarak lacivert duotone kaplamayla
(navy-900 %55 multiply) basılır — ayrıca düzenleme yapmanıza gerek yok.
