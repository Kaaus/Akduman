# public/images — Yüklenecek Görseller

Aşağıdaki dosyaları bu klasöre koyduktan sonra `lib/site.ts` içindeki
`IMAGES` manifestinde ilgili girdinin `ready` değerini `true` yapın.
Dosya gelene kadar sitede zarif bir yer tutucu ("Görsel eklenecek") görünür.

| Dosya adı | Kaynak | Kullanım yeri |
|---|---|---|
| `logo.png` | Eski sitedeki logo (aynı logo korunuyor) | Header + Footer + JSON-LD |
| `hero.webp` | Eski sitedeki `Slider-1.webp` | Anasayfa hero görseli |
| `av-samed-akduman.jpg` | Portre fotoğrafı | Hakkımızda avukat kartı + makale yazar kutusu |

## İsteğe bağlı

- **Beyaz logo**: dosyayı buraya koyup `lib/site.ts` → `PLACEHOLDERS.LOGO_BEYAZ`
  değerine yolunu yazın (örn. `/images/logo-beyaz.png`). Boş bırakılırsa
  footer'da normal logo beyaza çevrilerek (CSS invert) kullanılır.
- **Makale kapakları**: kapak eklemek isterseniz görseli buraya koyup
  `lib/articles.ts` içindeki ilgili makalenin `cover` alanına yolunu yazın
  (örn. `/images/kapak-arac-deger-kaybi.jpg`). Kapaklı makalelerde og:image
  otomatik olarak kapağa döner.

Not: Tüm fotoğraflar sitede otomatik olarak lacivert duotone kaplamayla
(navy-900 %55 multiply) basılır — ayrıca düzenleme yapmanıza gerek yok.
