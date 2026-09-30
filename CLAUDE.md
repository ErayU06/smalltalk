# SmallTalk – Claude Code proje talimatları

## Ürün
Duolingo tarzı, günlük alışkanlık odaklı "small talk" pratiği uygulaması.
Senaryolar: kafede sipariş, yol sorma, hocayla konuşma vb. Freemium.
Ruh: kaygı azaltan "güvenli alan". Hata asla cezalandırılmaz.

## Kurulum
```
npm install --legacy-peer-deps
npx expo run:android   # veya: npx expo run:ios / eas build --profile development
```
Expo Go ÇALIŞMAZ (expo-speech-recognition native modül).

## Teknik kurallar (değiştirme)
- Expo SDK 57 + TypeScript strict + Expo Router.
- SIFIR sunucu/API maliyeti: ses için sadece cihaz motorları.
  - TTS: `expo-speech` · STT: `expo-speech-recognition`
- Local-first: `expo-sqlite` (src/features/progress/db.ts, PRAGMA user_version ile göç).
  - Web: `db.web.ts` aynı fonksiyonları localStorage'daki sahte depoyla sunar (expo-sqlite web'de COOP/COEP başlıkları ister). db.ts'ye fonksiyon eklersen db.web.ts'ye de ekle.
- Senaryolar veri: `src/data/scenarios/*.ts`.
- Ücretli bulut servisi (OpenAI, Google Cloud STT vb.) EKLEME.

## Tasarım kuralları (Stitch + paywall)
- Renk/yazı/köşe SADECE `src/theme/tokens.ts` üzerinden: `const { c, type, radius } = useTheme()`. Bileşende hex yazma.
- Yazı tipi: Plus Jakarta Sans (app/_layout.tsx'te yüklenir).
- Yazılı butonlar `Button` (buttonGradient). #FF6B4A (`c.brand`) üstüne beyaz yazı KOYMA: 2.8:1, okunmaz.
- Büyük harfli metin için `upperTR()` (src/theme/text.ts) kullan; `textTransform: 'uppercase'` "Dilim"i "DILIM" yapar.
- Bayraklar: `<Flag code="tr" />` (src/components/ui/Flag.tsx, SVG). Emoji bayrak kullanma (bazı Android/Windows'ta harf olarak görünür).
- Diller tek yerden: src/data/languages.ts. Yeni hedef dilin içeriği gelince TARGETS_WITH_CONTENT'e ekle, "Yakında" kalkar.
- Kırmızı/`error` rengi kullanma. Geri bildirim: correct = yeşil, almost = kehribar, wrong = mercan "Endişelenme!".
- Uygulamanın yapamadığı şeyi vaat eden metin yazma: telaffuz/aksan puanı, "yapay zekâ", ses kaydı yok.
- Uydurma kullanıcı yorumu ekleme (paywallConfig.testimonial yalnızca gerçek, izinli yorum).
- Yeni ekran önce mevcut bileşenlerle kurulur: ui/Primitives, ui/Button, lesson/*, home/*.
- Tasarım kaynağı: Claude Design "SmallTalk Ekran Akışı" tuvali (Tokens, Components, Handoff panoları).

## Klasör yapısı
- `src/app/` → sadece ekranlar/rotalar (ince tut)
- `src/features/<modül>/` → iş mantığı + hook'lar
- `src/components/{ui,lesson,home,paywall,illustrations}` → paylaşılan UI
- `src/data/` → içerik · `src/types/` → tipler · `src/theme/` → tokenlar

## Çalışma şekli
- Her modül için önce plan (plan mode), sonra küçük adımlar.
- Her değişiklikten sonra `npx tsc --noEmit`, `npx expo lint` ve `npx jest`.
- Saf mantık (ör. `matchAnswer`) için Jest testi yaz.
- Ses özelliklerini test edemezsin; kullanıcıdan gerçek cihazda test etmesini iste.

## Açık TODO'lar
- RevenueCat: app/paywall.tsx satın alma + geri yükleme; fiyatlar mağazadan.
- expo-notifications: onboarding'deki hatırlatma (prefs.reminderTime) için yerel bildirim.
- Koşullar/Gizlilik gerçek URL'leri.
- İlerlemem sekmesi: haftalık grafik + tekrar kuyruğu ekranı.
