---
description: Yol haritasındaki bir fazı planla ve uygula (ör. /faz 1)
argument-hint: <faz numarası>
---

`docs/ROADMAP.md` dosyasında **Faz $ARGUMENTS** bölümünü oku. Önce `CLAUDE.md`'yi, faz içerik/ses/görselle ilgiliyse `docs/ICERIK-KILAVUZU.md`'yi de oku.

1. Güncel `main`'den `faz-$ARGUMENTS` dalı aç (varsa ona geç).
2. Fazdaki işaretlenmemiş 🤖 maddeleri listele. Bir 🤖 madde, bitmemiş bir 🧑 maddeye (hesap, anahtar, karar) bağlıysa bana 2–3 adımda ne yapmam gerektiğini söyle; o maddeyi atlayıp bağımsız maddelerle devam et.
3. Plan modunda kısa bir plan çıkar: değişecek dosyalar, yeniden kullanılacak bileşenler (`src/components/`), eklenecek paketler. Expo API'lerini SDK 57 belgelerinden doğrula (AGENTS.md). Onayımı bekle.
4. Onaydan sonra maddeleri tek tek yap. Her madde bitince:
   - `npx tsc --noEmit`, `npx expo lint`, `npx jest`
   - temizse ROADMAP'te kutuyu `[x]` yap
   - tek, anlamlı bir commit at
5. Ücretli bir API'yi çağıran bir betiği çalıştırman gerekirse önce kuru çalıştırmayla sayıları ve tahmini maliyeti göster, onayımı al, sonra `--confirm` ile çalıştır. Anahtarları asla yazdırma veya commit'leme.
6. Faz bitince: 5 satırlık özet, telefonda deneyeceğim kısa kontrol listesi, sıradaki faz.

CLAUDE.md'deki kurallara ve `docs/design/README.md`'deki "bilerek değiştirilenler" listesine uy.
