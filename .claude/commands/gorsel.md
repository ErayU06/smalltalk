---
description: Senaryo kapak görsellerini ve karakter portrelerini üret ya da hazır görselleri işle
argument-hint: [senaryo id'si | hepsi]
---

Hedef: `$ARGUMENTS` (boşsa: görseli eksik olan her şey)

1. `docs/ICERIK-KILAVUZU.md` → "Görseller" bölümünü ve `docs/gorsel-promptlari.md`'yi oku (yoksa kılavuzdaki kapak sahneleri ve kadro tablosundan oluştur).
2. ROADMAP Faz 4'teki kararı kontrol et: görseller (a) API betiğiyle mi, (b) dışarıda mı üretiliyor? Karar yoksa bana sor.
3. Üretim:
   - **(a)** `npm run images` kuru çalıştırması (kaç görsel, tahmini ücret) → onayım → `npm run images -- --confirm`. Anahtar sadece `.env.local`'da.
   - **(b)** `assets/images/**/raw/` içindeki yeni dosyaları bul. Eksik görsellerin listesini tam promptlarıyla ve beklenen dosya adlarıyla bana ver (`raw/<id>.png`, `raw/cast/<rol>-<dil>.png`).
4. `npm run images:optimize` çalıştır:
   - WebP, 1024 ve 512 px
   - blurhash
   - `src/data/images.ts` manifesti
5. Optimize edilmiş her görseli Read ile aç ve kontrol et:
   - okunabilir yazı, rakam, logo
   - bozuk el veya yüz
   - kapakta net NPC yüzü
   - kılavuza aykırı öğe
   Sorunluları gerekçesiyle listele (yeniden üretilecek).
6. `docs/gorsel-kaynaklari.md`'ye her görselin aracını/modelini, tarihini ve promptunu ekle.
7. `npx tsc --noEmit`, `npx expo lint`, `npx jest`. Temizse commit at: `images: <ne eklendi>`.
