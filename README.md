# akduman.av.tr — Akduman Hukuk Bürosu

Next.js 14 (App Router) + TypeScript + Tailwind CSS ile geliştirilmiş kurumsal
web sitesi. Tasarım sistemi: **Lacivert & Bronz** — koyu, tipografi ağırlıklı,
gradyansız. Eski WordPress sitesinin URL yapısı birebir korunmuştur
(`trailingSlash: true`).

## Kurulum

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # üretim build'i (yayın öncesi kontrol için)
```

> Not: `app/opengraph-image.tsx` build sırasında Google Fonts'a erişerek
> paylaşım görselini üretir. Ağ erişimi yoksa build yine tamamlanır;
> görsel sistem fontuyla üretilir.

## Vercel'e Bağlama

1. Projeyi GitHub'a itin: `git remote add origin <repo-url> && git push -u origin main`
2. [vercel.com](https://vercel.com) → **Add New → Project** → GitHub reposunu seçin.
   Framework otomatik olarak Next.js algılanır; ek ayar gerekmez.
3. **Settings → Environment Variables** altına aşağıdaki değişkenleri ekleyin
   ve yeniden deploy edin.
4. **Settings → Domains** altından `akduman.av.tr` alan adını bağlayın
   (DNS'te Vercel'in verdiği A/CNAME kayıtları tanımlanır).

## Ortam Değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyalayıp doldurun:

| Değişken | Zorunlu mu | Açıklama |
|---|---|---|
| `RESEND_API_KEY` | Form için | Resend API anahtarı. Tanımlı değilse form zarif bir uyarıyla devre dışı kalır; site normal çalışır. |
| `CONTACT_TO` | Hayır | Form mesajlarının gideceği adres (varsayılan: `info@akduman.av.tr`) |
| `CONTACT_FROM` | Hayır | Gönderen adresi (varsayılan: Resend test göndericisi) |

### Resend Kurulumu (3 adım)

1. [resend.com](https://resend.com) üzerinde ücretsiz hesap açın ve
   **API Keys** bölümünden bir anahtar oluşturun → `RESEND_API_KEY`.
2. **Domains** bölümünden `akduman.av.tr` domainini ekleyip verilen DNS
   kayıtlarını (SPF/DKIM) tanımlayın. Doğrulama tamamlanınca `CONTACT_FROM`
   değerini `Akduman Hukuk <form@akduman.av.tr>` gibi bir adresle güncelleyin.
3. Değişkenleri hem `.env.local` dosyasına hem Vercel ortam değişkenlerine
   ekleyin. Form gönderimi `/api/contact` üzerinden çalışır (honeypot korumalı).

## Görseller

Dosyalar `public/images/` altına konur — ayrıntılı liste için
[public/images/README.md](public/images/README.md):

| Dosya | Kaynak |
|---|---|
| `public/images/logo.png` | Eski sitedeki logo (aynı logo korunuyor) |
| `public/images/hero.webp` | Eski sitedeki `Slider-1.webp` |
| `public/images/av-samed-akduman.jpg` | Portre fotoğrafı |

Dosyayı koyduktan sonra `lib/site.ts` → `IMAGES` manifestinde ilgili girdinin
`ready` değerini `true` yapın. `ready:false` kaldığı sürece sitede şık bir
yer tutucu görünür; hiçbir şey bozulmaz. Tüm fotoğraflar otomatik olarak
lacivert duotone kaplamayla basılır.

## `{{TOKEN}}` Doldurma Rehberi

Tüm placeholder'lar **tek yerde** durur: `lib/site.ts` → `PLACEHOLDERS`.
Değer boş (`""`) olduğu sürece ilgili blok sitede **hiç görünmez**;
doldurulduğu anda otomatik devreye girer.

| Token | Ne zaman doldurulur | Nerede görünür |
|---|---|---|
| `BARO_SICIL_NO` | Müşteriden gelince | Footer sicil satırı + Hakkımızda avukat kartı |
| `CALISMA_SAATLERI` | örn. `"Hafta içi 09.00–18.00"` | Footer + İletişim + LegalService şeması |
| `SOSYAL_FACEBOOK_URL` / `SOSYAL_INSTAGRAM_URL` / `SOSYAL_YOUTUBE_URL` | Hesap linkleri gelince | Footer sosyal ikonları |
| `LOGO_BEYAZ` | Beyaz logo dosyası gelirse (örn. `/images/logo-beyaz.png`) | Footer (yoksa normal logo CSS ile beyazlatılır) |
| `HARITA_EMBED_URL` | Google Maps → Paylaş → Harita yerleştir → iframe `src` değeri | İletişim sayfası haritası |

## Makale Gövdeleri

`content/makaleler/*.mdx` dosyalarında 11 makalenin iskeleti hazır
(frontmatter dolu). Her dosyadaki `🔁 TAŞINACAK` bloğunu silip eski sitedeki
gövde metnini birebir yapıştırın; başlık hiyerarşisini H2/H3'e oturtun.
Gerçek yayın tarihlerini `lib/articles.ts` içindeki `date`/`dateModified`
alanlarına işleyin (`// TODO` yorumlarıyla işaretli).

## Proje Yapısı

```
app/            sayfalar (App Router) — makaleler kök dizinde: /{slug}/
components/     Header, Footer, Hero, ServiceCard, FaqAccordion, ContactForm…
content/        makale MDX dosyaları
lib/            site.ts (tüm sabitler) · articles.ts · seo.ts
public/images/  kullanıcının yükleyeceği görseller
```

## Yayın Öncesi Kontrol Listesi

- [ ] Görseller yüklendi, `IMAGES` manifestinde `ready:true` yapıldı
- [ ] `PLACEHOLDERS` içindeki tokenlar dolduruldu
- [ ] Makale gövdeleri MDX dosyalarına taşındı, tarihler güncellendi
- [ ] Hizmet sayfalarındaki yeni içerikler avukat tarafından onaylandı
      (`AVUKAT ONAYI BEKLENIYOR` yorumları)
- [ ] Yasal sayfa taslakları (KVKK, Çerez, Yasal Uyarı) avukat tarafından
      gözden geçirildi
- [ ] `RESEND_API_KEY` Vercel'e eklendi, form test edildi
