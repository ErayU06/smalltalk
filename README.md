# SmallTalk

Duolingo tarzı, günlük alışkanlık odaklı "small talk" pratiği uygulaması. Arayüz Türkçe, pratik dili
İngilizce. Kafede sipariş, yol sorma, hocadan ek süre isteme gibi kısa senaryolar; hata asla
cezalandırılmaz.

API anahtarı ya da sunucu gerekmez: seslendirme ve konuşma tanıma cihazın kendi motorlarıyla, ilerleme
cihazda (SQLite) tutulur. Proje kuralları ve tasarım ilkeleri için `CLAUDE.md` dosyasına bak.

## Yerelde çalıştırma

Gereken: Node.js 20.19.4+ (veya 22.13+ / 24.3+) ve npm.

```bash
npm install
```

### Tarayıcıda (arayüzü test etmenin en hızlı yolu)

```bash
npm run web
```

Tarayıcıda http://localhost:8081 adresini aç ve geliştirici araçlarından telefon görünümünü seç
(Chrome'da `Ctrl/Cmd + Shift + M`).

Web sürümü ilerlemeyi SQLite yerine tarayıcının localStorage'ındaki **sahte bir depoda** tutar
(`src/features/progress/db.web.ts`). Baştan başlamak, yani onboarding'i yeniden görmek için
geliştirici araçlarından site verilerini temizle. Konuşma tanıma ve seslendirme tarayıcının Web Speech
desteğine bağlıdır. Mikrofon adımını onboarding'de "Şimdilik yazarak devam et" ile geçersen sesli
adımlar yazarak cevaplanır.

### Telefonda

Konuşma tanıma (`expo-speech-recognition`) native bir modül olduğu için **Expo Go'da çalışmaz**;
bir development build gerekir:

```bash
npx expo run:ios       # macOS + Xcode
npx expo run:android   # Android Studio
# ya da bulutta: npx eas-cli@latest build --profile development
```

## Denenecek akış

1. İlk açılışta onboarding: dillerini ve seni en çok zorlayan durumu seç → günlük hedef → ilgi
   alanları.
2. **Pratik** sekmesinde **Pratiğe Başla** ile kafe senaryosunu aç. Üç adım var: çoktan seçmeli,
   yazılı (kelime bankasıyla) ve sesli.
3. Her cevaptan sonra alt panel "Harika!", "Küçük bir nüans var" ya da "Endişelenme!" der. Yanlışta
   **Tekrar dene** aynı adımı yeniden açar.
4. Ders sonunda XP, seri ve yeni kalıp rozeti. Ana sayfadaki seri ve XP güncellenir.
5. Kilitli (PRO) otel senaryosu ya da **Profil → SmallTalk Pro** paywall'u açar. Satın alma henüz
   bağlı değil.

## İçerik ve veri nerede?

| Dosya | İçerik |
| --- | --- |
| `src/data/scenarios/` | Senaryolar: NPC replikleri, seçenekler, kabul edilen cevaplar, ipuçları |
| `src/features/lesson/matchAnswer.ts` | Cevap değerlendirme (toleranslı eşleşme; telaffuz puanı yok) |
| `src/features/progress/db.ts` | Telefonda ilerleme, tercihler, tekrar kuyruğu (SQLite) |
| `src/features/progress/db.web.ts` | Aynısının web'deki sahte deposu (localStorage) |
| `src/features/paywall/paywallConfig.ts` | Planlar ve örnek fiyatlar (canlıda mağazadan gelecek) |
| `src/theme/tokens.ts` | Renk, yazı ve köşe token'ları; bileşenler yalnızca bunları kullanır |

## Geliştirme komutları

```bash
npx expo lint      # lint
npx tsc --noEmit   # tip kontrolü
npm test           # Jest (matchAnswer testleri)
```

`tsc`, `expo-env.d.ts` ve rota tiplerine ihtiyaç duyar. Bunlar git'te tutulmaz ve ilk `npm start` /
`npm run web` çalıştırmasında oluşur; tip kontrolünden önce uygulamayı bir kez başlat.
