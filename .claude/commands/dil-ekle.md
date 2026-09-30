---
description: Yeni bir hedef dil ekle ve tüm senaryoların o dildeki varyantını yaz (ör. /dil-ekle de)
argument-hint: <de | fr | ru | zh | ko>
---

Dil: `$ARGUMENTS`

1. `docs/ICERIK-KILAVUZU.md`'yi (özellikle 4. bölümde bu dilin notlarını) ve `docs/ROADMAP.md` Faz 2'yi oku.
2. Altyapıyı kontrol et; eksik olanı önce plan + onayla yap:
   - `LocaleCode` ve konuşma tanıma kodu (`getSupportedLocales()` ile, Android'de Çince `cmn-Hans-CN` olabilir)
   - `matchAnswer` dil kuralları ve en az 4 test (doğru, neredeyse, yanlış, bilinen hata) + sayı normalizasyonu
   - zh/ko/ru için okunuş alanı ve "Okunuşu göster"
   - zh/ko için dokunarak cümle kurma
3. Karakter kadrosu: kılavuzdaki tablodan bu dilin isimlerini `src/data/cast.ts`'e yaz.
4. Ses kadrosu:
   - `npm run audio:voices -- <locale>` betiği varsa her karaktere cinsiyet ve yaşına uygun 2 ses öner
   - örneklerini `scripts/.samples/`'a üret ve bana dosya adlarını ver
   - seçimimi `src/data/voices.ts`'e yaz
   - betik yoksa bu adımı atla, sona not düş
5. Senaryolar: önce 12 ücretsiz, sonra 8 Pro. Her biri için `src/data/scenarios/<id>/$ARGUMENTS.ts` yaz (adım kimlikleri ve adım sayısı İngilizceyle aynı). Her 4 senaryoda bir `npx tsc --noEmit`, `npx expo lint`, `npx jest` çalıştır ve commit at.
6. `docs/inceleme/$ARGUMENTS.md` inceleme listesini oluştur.
7. 12 ücretsiz senaryo hazırsa dili `TARGETS_WITH_CONTENT`'e ekle ("Yakında" kalkar). Mikrofon izin metninin bu dildeki halini `app.json`'a ekle.
8. Sonunda bana hatırlat:
   - `/ses-uret`
   - anadili bu dil olan birine `docs/inceleme/$ARGUMENTS.md`'yi okutmam
   - telefonda bu dilin konuşma tanıma paketini kontrol etmem
