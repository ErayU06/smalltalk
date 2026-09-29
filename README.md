# smalltalk

İngilizce small talk pratiği için Expo (React Native) uygulaması. Arayüz Türkçe, pratik dili İngilizce.

Uygulama şu an **tamamen sahte verilerle (mock data)** çalışır: API anahtarı, sunucu ya da yapay zekâ
entegrasyonu gerekmez. Tüm içerik uygulamanın içinde tanımlı; uygulama hiçbir sunucuya istek atmaz.

## Yerelde çalıştırma

Gereken: Node.js 20.19.4+ (veya 22.13+ / 24.3+) ve npm.

```bash
npm install
```

### Tarayıcıda (en hızlı yol)

```bash
npm run web
```

Tarayıcıda http://localhost:8081 adresini aç. Mobil görünümü test etmek için tarayıcının geliştirici
araçlarındaki cihaz modunu (Chrome'da `Ctrl/Cmd + Shift + M`) kullanabilirsin. Web'de sekmeler sayfanın
üstünde, telefonda altta görünür.

### Telefonda veya simülatörde

```bash
npm start
```

- **Telefon:** App Store / Google Play'den Expo Go'yu yükle ve terminalde çıkan QR kodunu tara. Telefon
  ile bilgisayar aynı Wi-Fi ağında olmalı. Expo Go, projenin Expo SDK sürümünü (57) desteklemeli.
- **iOS Simülatörü** (macOS + Xcode): terminalde `i` tuşuna bas.
- **Android Emülatörü** (Android Studio): terminalde `a` tuşuna bas.

## Denenecek akış

1. **Pratik** sekmesinde seviye filtresini değiştir, bir senaryo seç.
2. Sohbette önerilen cevaplardan birine dokun ya da kendi cevabını yazıp gönder. Karşı taraf yaklaşık bir
   saniye sonra cevap verir.
3. Sohbet bitince **Geri bildirimi gör** → puan, ipuçları ve kullanışlı kalıplar. **Tekrar dene** aynı
   senaryoyu baştan açar, **Bitir** ana sayfaya döner.
4. **İlerleme** ve **Profil** sekmelerine göz at.

## Sahte veriler nerede?

| Dosya | İçerik |
| --- | --- |
| `src/data/scenarios.ts` | Senaryolar: karşı tarafın replikleri, önerilen cevaplar, ipuçları |
| `src/data/progress.ts` | Profil, günlük seri, haftalık süre, son pratikler |
| `src/hooks/use-practice-session.ts` | Sohbet motoru: senaryodaki sıradaki repliği oynatır; kullanıcının ne yazdığına bakmaz |
| `src/app/feedback/[id].tsx` (`mockScore`) | Puan: cevap başına kelime sayısına göre hesaplanır, dil analizi yapmaz |

Yapay zekâ entegrasyonu eklendiğinde değişmesi gereken yerler bu dosyalar; ekranlar aynı kalabilir.

## Geliştirme komutları

```bash
npx expo lint      # lint
npx tsc --noEmit   # tip kontrolü
```

`tsc`, `expo-env.d.ts` dosyasına ihtiyaç duyar. Bu dosya git'te tutulmaz ve ilk `npm start` /
`npm run web` çalıştırmasında otomatik oluşur; tip kontrolünden önce uygulamayı bir kez başlat.

## Proje yapısı

- `src/app/` — Expo Router ekranları (her dosya bir rota; `_layout.tsx` dosyaları gezinmeyi tanımlar)
- `src/components/` — ortak bileşenler (`*.web.tsx` dosyaları web'e özel sürümlerdir)
- `src/data/` — sahte veriler
- `src/hooks/`, `src/constants/` — hook'lar, tema ve boşluk değerleri
