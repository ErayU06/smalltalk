---
description: İçerik kılavuzuna göre bir senaryo yaz (ör. /senaryo-ekle pharmacy veya /senaryo-ekle berberde saç kestirme)
argument-hint: <senaryo id'si veya konu> [diller: en,de,fr,ru,zh,ko]
---

Girdi: `$ARGUMENTS`

1. `docs/ICERIK-KILAVUZU.md`'yi baştan sona oku. Mevcut bir senaryoyu (ör. `src/data/scenarios/cafe-order`) örnek olarak aç.
2. Girdi kılavuzdaki listede bir `id` ise o satırı kullan. Değilse listeye yeni bir satır öner (id, Türkçe başlık, karakter, seviye, erişim, kalıp, sürpriz soru), onayımı al ve kılavuza ekle.
3. "İskelet + dil varyantı" yapısı (ROADMAP Faz 3, ilk madde) henüz yoksa dur, önce onu yapmayı öner.
4. `src/data/scenarios/<id>/index.ts` iskeletini ve `en.ts`'yi yaz. Dil verildiyse o dillerin varyantlarını da yaz; verilmediyse `TARGETS_WITH_CONTENT`'teki diğer diller için yaz. Varyantlar çeviri değil: kılavuzun 4. bölümündeki şehir, para, kibarlık ve kültür notlarına göre uyarla.
5. Kılavuzun 2. bölümündeki kurallara uy:
   - 4–6 adım, türler karışık, son adım kapanış small talk'u
   - her adımda Türkçe `hint`
   - 3–6 `acceptedAnswers` (ilki kanonik)
   - o dilde Türkçe konuşanların gerçekten yaptığı 1–3 `mistakes`
   - çoktan seçmelide 1 doğru + 1 `near` + 1 yanlış, her şıkta nazik `feedback`
   - Çince/Korece/Rusça'da okunuş
   - 1–2 `curveballs`
6. Senaryoyu `src/data/scenarios/index.ts`'e kaydet. Yeni bir rol gerekiyorsa `src/data/cast.ts`'e ve kılavuzdaki kadro tablosuna ekle.
7. `docs/inceleme/<dil>.md` listelerine ekle. `docs/gorsel-promptlari.md`'ye kapak sahnesini (yeni karakter varsa portresini) ekle.
8. `npx tsc --noEmit`, `npx expo lint`, `npx jest` (içerik doğrulama testi her kabul edilen cevabın kendi adımında "doğru" çıktığını kontrol eder). Temizse commit at: `content: <id> (<diller>)`.
9. Sonunda:
   - ilk iki adımı İngilizce haliyle bana göster ki doğallığını kontrol edeyim
   - yeni replikler için `/ses-uret`, görsel için `/gorsel <id>` gerektiğini hatırlat
