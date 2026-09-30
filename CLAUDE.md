@AGENTS.md

# SmallTalk – Claude Code proje talimatları

> **Yol haritası:** `docs/ROADMAP.md` · **İçerik kılavuzu:** `docs/ICERIK-KILAVUZU.md` · **Tasarım kaynakları:** `docs/design/`
> **Komutlar:** `/siradaki` · `/faz <n>` · `/senaryo-ekle <konu>` · `/dil-ekle <kod>` · `/ses-uret` · `/gorsel` · `/cihaz-testi`

## Ürün
Duolingo tarzı, günlük alışkanlık odaklı "small talk" pratiği uygulaması.
Senaryolar: kafede sipariş, yol sorma, hocayla konuşma vb. Freemium.
Hedef diller: İngilizce, Almanca, Fransızca, Rusça, Çince, Korece. Arayüz dili: Türkçe.
Ruh: kaygı azaltan "güvenli alan". Hata asla cezalandırılmaz.

## Kurulum
```
npm install --legacy-peer-deps
npx expo run:android   # veya: npx expo run:ios / eas build --profile development
```
Expo Go ÇALIŞMAZ (expo-speech-recognition native modül).

## Maliyet kuralı (değiştirme)
- **Uygulama çalışırken hiçbir bulut API'si çağrılmaz.** Kullanıcı başına sunucu/API maliyeti SIFIR.
  - Konuşma tanıma: cihaz motoru (`expo-speech-recognition`).
  - Karakter sesleri: geliştirme sırasında bir kez üretilip uygulamaya gömülen ses dosyaları (`assets/audio/`). Dosya yoksa yedek: cihaz TTS'i (`expo-speech`).
- **Geliştirme sırasında bir kerelik içerik üretimi serbesttir:** `scripts/` altındaki betikler bulut TTS / görsel API'lerini çağırabilir (ör. Google Cloud Text-to-Speech ücretsiz kotası).
  - API anahtarları sadece `.env.local` içinde (git'e girmez). Uygulama koduna, `app.json`'a veya `EXPO_PUBLIC_*` değişkenlerine ASLA anahtar koyma.
  - Betik, API'yi çağırmadan önce toplam karakter/görsel sayısını ve tahmini maliyeti yazdırsın; `--confirm` bayrağı olmadan çağırmasın.
  - Üretilen dosyalar önbelleklensin: değişmeyen metin için tekrar üretme.

## Teknik kurallar
- Expo SDK 57 + TypeScript strict + Expo Router.
- Local-first: `expo-sqlite` (src/features/progress/db.ts, PRAGMA user_version ile göç).
  - Web: `db.web.ts` aynı fonksiyonları localStorage'daki sahte depoyla sunar. db.ts'ye fonksiyon eklersen db.web.ts'ye de ekle.
- Senaryolar veri: `src/data/scenarios/`. Yazım kuralları: `docs/ICERIK-KILAVUZU.md`.
- Cevap değerlendirme `src/features/lesson/matchAnswer.ts` dile duyarlı olmalı (Çince boşluksuz, Korece ekler, aksanlar). Her dil için test.
  - `mistakes[].match` normalize edilmiş cevapta aranır: küçük harf, noktalamasız; EN kısaltmalar açık ("i'd" → "i would"), FR aksansız ve kesme işaretsiz, DE ä → ae / ß → ss, RU ё → е, ZH/KO boşluksuz; sayılar rakam (ZH 两 → 2, KO 한 잔 → 1잔).
- Çoktan seçmelide doğru şıkkı içerikte ilk yaz; ekranda kararlı biçimde karıştırılır.

## Tasarım kuralları (Stitch + paywall)
- Renk/yazı/köşe SADECE `src/theme/tokens.ts` üzerinden: `const { c, type, radius } = useTheme()`. Bileşende hex yazma.
- Yazı tipi: Plus Jakarta Sans (src/app/_layout.tsx'te yüklenir). Kiril ve CJK karakterlerde sistem fontuna düşer; bu metinlerde `fontFamily` zorlanmaz.
- Yazılı butonlar `Button` (buttonGradient). #FF6B4A (`c.brand`) üstüne beyaz yazı KOYMA: 2.8:1, okunmaz.
- Büyük harfli metin için `upperTR()` (src/theme/text.ts) kullan; `textTransform: 'uppercase'` "Dilim"i "DILIM" yapar.
- Bayraklar: `<Flag code="tr" />` (src/components/ui/Flag.tsx, SVG). Emoji bayrak kullanma.
- Diller tek yerden: src/data/languages.ts. Dil durumu içerikten otomatik hesaplanır (src/data/availability.ts): 12 ücretsiz senaryo → tam, en az 1 → "Önizleme", hiç yok → "Yakında".
- Kırmızı/`error` rengi kullanma. Geri bildirim: correct = yeşil, almost = kehribar, wrong = mercan "Endişelenme!".
- Uygulamanın yapamadığı şeyi vaat eden metin yazma: telaffuz/aksan puanı, "yapay zekâ ile sohbet", ses kaydı yok.
- Uydurma kullanıcı yorumu ekleme (paywallConfig.testimonial yalnızca gerçek, izinli yorum).
- Görseller: fotogerçekçi, yapay zekâ ile üretilmiş; logo, marka adı, okunabilir yazı ve tanınabilir gerçek kişi içermez (`docs/ICERIK-KILAVUZU.md` → Görseller).
- Yeni ekran önce mevcut bileşenlerle kurulur: ui/Primitives, ui/Button, lesson/*, home/*.
- Tasarım kaynağı: `docs/design/README.md` (öncelik sırası ve Stitch'ten bilerek değiştirilenler).

## Klasör yapısı
- `src/app/` → sadece ekranlar/rotalar (ince tut)
- `src/features/<modül>/` → iş mantığı + hook'lar (lesson, progress, speech, engagement: rozet, kelime sandığı, meydan okuma, hatırlatma)
- `src/components/{ui,lesson,home,paywall,onboarding,illustrations}` → paylaşılan UI
- `src/data/` → içerik · `src/types/` → tipler · `src/theme/` → tokenlar
- `scripts/` → geliştirme betikleri (ses/görsel üretimi) · `assets/audio/`, `assets/images/scenarios/` → üretilmiş içerik

## Çalışma şekli
- Her faz ayrı dalda; önce plan (plan mode), onaydan sonra küçük adımlar.
- Her adımdan sonra `npx tsc --noEmit`, `npx expo lint`, `npx jest`. Temizse `docs/ROADMAP.md`'deki kutuyu işaretle ve commit at.
- Saf mantık için Jest testi yaz (matchAnswer, seri, içerik doğrulama, ses manifesti).
- Ses/mikrofon/bildirimleri test edemezsin; sonunda kullanıcıya kısa bir telefon kontrol listesi ver.
- Paket eklerken `npx expo install <paket>`; peer uyarısında sonuna `-- --legacy-peer-deps`.
