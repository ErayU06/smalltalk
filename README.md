# Talkwell

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

1. İlk açılışta onboarding: ana dilini, pratik dilini ve seni en çok zorlayan durumu seç, sonra günlük
   hedefi ve ilgi alanlarını belirle. İngilizce tam; Almanca, Fransızca, Rusça, Çince ve Korece
   "Önizleme" olarak seçilebilir (şimdilik kafe senaryosu).
2. **Pratik** sekmesi: **Günün Meydan Okuması** (+10 XP bonus) ve **Pratiğe Başla**.
3. Ders: çoktan seçmeli, yazılı ve sesli adımlar. NPC karakterin cinsiyet ve yaşına uygun cihaz sesiyle
   konuşur. Rusça, Çince ve Korecede **Okunuşu göster** ile okunuş açılır.
4. Ders sonunda XP, seri, yeni rozetler, kalıp rozeti ve kelime sandığına eklenen kartlar.
5. **İlerlemem**: rozet vitrini ve **Kelime Sandığı** (karta dokun → Türkçe anlamı, hoparlör → dinle).
6. **Profil → Tercihleri düzenle** ile pratik dilini değiştir; Pro senaryolar paywall'u açar
   (satın alma henüz bağlı değil).

## İçerik durumu

| Dil | Senaryo | Durum |
| --- | --- | --- |
| İngilizce | 20 (12 ücretsiz + 8 Pro) | Tam |
| Almanca, Fransızca, Rusça, Çince, Korece | 1 (kafe) | Önizleme |

Diğer dillerin varyantları `/dil-ekle <kod>` ile yazılır (`docs/ICERIK-KILAVUZU.md`). Her dil için
anadili o dil olan birinin incelemesi gerekir.

## İçerik ve veri nerede?

| Dosya | İçerik |
| --- | --- |
| `src/data/scenarios/<id>/` | Senaryo iskeleti (`index.ts`) ve dil varyantları (`en.ts`, `de.ts`…) |
| `src/data/cast.ts` | Karakter kadrosu: 17 rol × 6 dil, cinsiyet ve yaş |
| `src/features/lesson/matchAnswer.ts` | Dile duyarlı cevap değerlendirme (telaffuz puanı yok) |
| `src/features/speech/voice.ts` | Cihazdaki en doğal sesi karaktere göre seçme |
| `src/features/engagement/` | Rozetler, günün meydan okuması, hatırlatmalar, ders sonu |
| `src/features/progress/db.ts` | Telefonda ilerleme, kelime kartları, rozetler (SQLite) |
| `src/features/progress/db.web.ts` | Aynısının web'deki sahte deposu (localStorage) |
| `src/theme/tokens.ts` | Renk, yazı ve köşe token'ları |

## Geliştirme komutları

```bash
npx expo lint      # lint
npx tsc --noEmit   # tip kontrolü
npm test           # Jest: değerlendirme, içerik doğrulama, ses seçimi, rozetler
```

`tsc`, `expo-env.d.ts` ve rota tiplerine ihtiyaç duyar. Bunlar git'te tutulmaz ve ilk `npm start` /
`npm run web` çalıştırmasında oluşur; tip kontrolünden önce uygulamayı bir kez başlat.
