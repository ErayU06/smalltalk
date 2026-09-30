---
description: Gömülü karakter seslerini üret veya güncelle (bulut TTS, geliştirme sırasında bir kerelik)
---

1. `scripts/generate-audio.ts` yoksa ROADMAP Faz 1b'yi öner ve dur.
2. `.env.local` dosyasında `GOOGLE_APPLICATION_CREDENTIALS` tanımlı mı ve dosya var mı kontrol et. Anahtarın içeriğini veya değerini **asla** yazdırma, loglama, commit'leme. Yoksa bana Faz 1b'deki 🧑 adımları hatırlat ve dur.
3. Kuru çalıştırma: `npm run audio`. Bana özetle:
   - yeni veya değişen metin sayısı (dil ve karakter bazında)
   - toplam karakter
   - tahmini ücret (ücretsiz kota içinde mi?)
   - onayımı iste
4. Onaylarsam `npm run audio -- --confirm`. Kota, yetki veya ağ hatası olursa dur ve nedenini söyle; döngüde tekrar deneme.
5. Artık hiçbir metne ait olmayan ses dosyalarını listele; onaylarsam sil.
6. `npx jest` (ses manifesti testi) çalıştır. Dil başına toplam MB'ı raporla (40 MB sınırı için ROADMAP Faz 1b'ye bak).
7. Commit at: `audio: <n> yeni ses (<diller>)`.
8. Telefonda dinlemem için farklı karakter ve dillerden 3–5 replik öner.
