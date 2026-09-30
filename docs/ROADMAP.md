# SmallTalk yol haritası

Claude Code bu dosyayla çalışır. Her faz kendi dalında yapılır (`faz-1-ses` gibi), bitince `main`'e birleştirilir.

**İşaretler:** 🧑 = senin yapman gereken (hesap, ödeme, karar, telefonda deneme) · 🤖 = Claude Code

**Komutlar:** `/siradaki` (ilk açık iş) · `/faz 1` (fazı planla ve yap) · `/senaryo-ekle <konu>` · `/dil-ekle <kod>` · `/ses-uret` · `/gorsel` · `/cihaz-testi`

---

## Tamamlananlar

- [x] Expo SDK 57 + TypeScript + Expo Router (`src/app/`), web için `db.web.ts`
- [x] Tasarım sistemi: Stitch renkleri, Plus Jakarta Sans, açık/koyu tema tokenları
- [x] Onboarding 3 adım (SVG bayraklı dil seçimi), Pratik ana sayfası, 4 sekme
- [x] Ders: çoktan seçmeli, yazma, konuşma; 3 durumlu geri bildirim paneli; ders sonu
- [x] `matchAnswer` + bilinen hatalar + testler; SQLite ilerleme, seri, tercihler, tekrar kuyruğu
- [x] Paywall arayüzü (satın alma bağlı değil)

---

## Faz 0 · Kurulum ve telefonda ilk çalıştırma

- [ ] 🧑 Node 20+, Git; Android telefonda USB hata ayıklama (veya emülatör). iPhone için Mac + Xcode ya da EAS.
- [ ] 🧑 Ücretsiz Expo hesabı, `npx eas-cli@latest login`
- [ ] 🤖 `npx expo-doctor`, `npx expo install --fix`
- [ ] 🤖 `eas.json`: `development` (dev client), `preview` (APK), `production`
- [ ] 🤖 `app.json`: `com.anonymous.smalltalk` → gerçek paket adı (ör. `com.erayulusoy.smalltalk`), `expo-dev-client`
- [ ] 🤖 İlk geliştirme derlemesi (`npm run android` ya da `eas build --profile development --platform android`)
- [ ] 🧑 `/cihaz-testi` listesini telefonda uygula

---

## Faz 1 · Profesyonel karakter sesleri

**Sorun:** Cihazın kendi TTS sesi robotik; barista, turist, hoca hepsi aynı sesle konuşuyor.
**Çözüm:** Replikler sabit metin olduğu için sesleri **geliştirme sırasında bir kez** yüksek kaliteli sinirsel TTS ile üretip uygulamaya gömmek. Uygulama çalışırken API çağrısı yok, kullanıcı başına maliyet 0.

**Servis:** Google Cloud Text-to-Speech, **Chirp 3: HD** sesleri (ayda 1 milyon karakter ücretsiz; 20 senaryo × 6 dil ≈ 100–150 bin karakter). Yedek seçenek: Azure Neural TTS (ayda 500 bin karakter ücretsiz).

### 1a · Hemen (anahtar gerektirmez)
- [ ] 🤖 `useTTS`: platforma göre en iyi cihaz sesini seç (iOS: Premium > Enhanced > varsayılan; Android: yüksek kaliteli/ağ sesleri), karaktere göre farklı ses (kadın/erkek) ve perde/hız ayarı
- [ ] 🤖 Profil → "Sesler": cihazdaki sesleri listele, örnek cümleyle dinlet, "daha kaliteli ses indir" yönlendirmesi (iOS: Ayarlar › Erişilebilirlik › Seslendirilen İçerik › Sesler; Android: TTS ayarları intent'i)

### 1b · Gömülü profesyonel sesler
- [ ] 🧑 Google Cloud hesabı → yeni proje → "Cloud Text-to-Speech API"yi etkinleştir → hizmet hesabı anahtarı (JSON) indir. Faturalandırma hesabı ister; ücretsiz kota içinde ücret çıkmaz. **5 $ bütçe uyarısı kur.**
- [ ] 🧑 Anahtar dosyasının yolunu `.env.local`'a yaz: `GOOGLE_APPLICATION_CREDENTIALS=/tam/yol/anahtar.json` (git'e girmez)
- [ ] 🤖 `src/data/voices.ts`: **ses kadrosu**. Her karakter (Emma barista, Alex turist, Prof. Miller…) × her dil için bir Chirp 3: HD sesi. Aynı karakter tüm senaryolarda aynı sesle konuşur.
- [ ] 🤖 `scripts/list-voices.ts` (`npm run audio:voices -- de-DE`): dildeki Chirp 3: HD seslerini listeler ve her birinden örnek bir cümleyi `scripts/.samples/`'a üretir. Seçimi kullanıcıya dinletip yaptır.
- [ ] 🤖 `scripts/generate-audio.ts` (`npm run audio`):
  - tüm senaryolardan seslendirilecek metinleri topla: NPC replikleri, `acceptedAnswers[0]` (Doğru halini dinle), kalıp rozeti cümlesi, çoktan seçmelide doğru şık
  - her metin için `sha1(locale + voice + text)` → `assets/audio/<locale>/<hash>.m4a` (mono, 48 kbps AAC ya da Opus; ~10–15 KB/cümle)
  - var olan dosyayı atla; önce "N metin, M karakter, tahmini ücret $0 (kota içinde)" yaz, `--confirm` olmadan çağırma
  - `src/data/audio-manifest.ts` üret: `hash → require(...)` (Metro statik require ister)
- [ ] 🤖 `npx expo install expo-audio`; `useVoice()` hook'u: manifestte ses varsa `expo-audio` ile çal (yavaş mod = `playbackRate 0.8`, perde düzeltmeli), yoksa cihaz TTS'ine düş. `useTTS` çağıran her yer `useVoice`'a geçsin.
- [ ] 🤖 Jest testi: her NPC repliği ve her `acceptedAnswers[0]` için manifestte ses var (içerik değişip ses üretilmezse test kırılır)
- [ ] 🤖 Uygulama boyutu raporu: toplam ses MB. 40 MB'ı geçerse İngilizce gömülü kalsın, diğer diller "dil paketi" olarak ilk seçimde indirilsin (GitHub Releases / ücretsiz statik barındırma, `expo-file-system`)
- [ ] 🧑 Telefonda karakter seslerini dinle, beğenmediğin sesi `voices.ts`'te değiştirt, `/ses-uret`

**Bitti sayılır:** Her replik gömülü sinirsel sesle çalıyor; karakterler farklı seslerde; internet kapalıyken de çalışıyor.

---

## Faz 2 · Beş yeni dil: Almanca, Fransızca, Rusça, Çince, Korece

- [ ] 🤖 `LocaleCode`: `de-DE`, `fr-FR`, `ru-RU`, `zh-CN`, `ko-KR` (+ mevcut `en-US`, `en-GB`). Konuşma tanıma için platforma göre doğru kod (`getSupportedLocales()` ile kontrol; Android'de Çince `cmn-Hans-CN` olabilir).
- [ ] 🤖 **Dile duyarlı `matchAnswer`:**
  - ortak: Unicode NFC, noktalama (Çince/Korece tam genişlik `。，？！` dahil) temizleme
  - İngilizce: mevcut kısaltma tablosu
  - Fransızca: kesme işaretleri (`j'aimerais`), aksanları karşılaştırmada yok say (kullanıcı `cafe` yazarsa `café` sayılsın)
  - Almanca: `ß`→`ss`, `ä/ö/ü` hem kendisi hem `ae/oe/ue` kabul
  - Rusça: `ё`→`е`
  - Çince: kelime boşluğu yok → karakter tabanlı benzerlik, anahtar kelimede alt dize eşleşmesi
  - Korece: ekler kelimeye yapışık (`커피를`) → anahtar kelimede alt dize eşleşmesi
  - her dil için en az 4 test (doğru, neredeyse, yanlış, bilinen hata)
- [ ] 🤖 **Okunuş:** Çince (pinyin), Korece (romanizasyon), Rusça (Latin harfli okunuş) için `romanization` alanı; NPC balonunda "Okunuşu göster" düğmesi (varsayılan kapalı; kaygı "telaffuz" seçildiyse açık)
- [ ] 🤖 **Çince/Korece yazma adımları:** klavye zor olduğu için kelime bankası "dokunarak cümle kur" moduna geçer (çipler sırayla eklenir, sil düğmesi var); serbest yazma da açık kalır
- [ ] 🤖 Cihazda dil desteği kontrolü: seçilen hedef dil için konuşma tanıma veya TTS sesi yoksa kibar bir kart ("Telefonunda Korece konuşma paketi yok. İndirmek için…"), Android'de `androidTriggerOfflineModelDownload`
- [ ] 🧑 **Karar:** Arayüz şimdilik Türkçe. Ana dil olarak Türkçe dışı seçilirse ne olsun? (a) Seçenekleri şimdilik sadece Türkçe yap, (b) İngilizce arayüz çevirisi ekle (i18n, ayrı iş)
- [ ] 🤖 Her dil içeriği hazır oldukça `TARGETS_WITH_CONTENT`'e ekle (onboarding'deki "Yakında" kalkar)

**Bitti sayılır:** Altı dilde de en az bir senaryo baştan sona oynanıyor; konuşma tanıma ve değerlendirme her dilde doğru çalışıyor.

---

## Faz 3 · İçerik: 20 senaryo × 6 dil

Yazım kuralları, senaryo listesi ve dil bazında kibarlık/hata notları: **`docs/ICERIK-KILAVUZU.md`**

- [ ] 🤖 Senaryo yapısını "ortak iskelet + dil varyantı" olarak ayır: `src/data/scenarios/<id>/index.ts` (ayar, seviye, süre, görsel, karakter) + `en.ts`, `de.ts`, `fr.ts`, `ru.ts`, `zh.ts`, `ko.ts` (replikler, cevaplar, yer adları; kültüre uyarlanmış)
- [ ] 🤖 **İçerik doğrulama testi:** her `acceptedAnswers` kendi adımında `correct`; `mistakes` regex'leri derleniyor; çoktan seçmelide tam 1 doğru; her adımda Türkçe `hint`; her dilde aynı adım sayısı
- [ ] 🤖 Önce **İngilizce 20 senaryo** (kılavuzdaki liste), sonra her dil için kültüre uyarlanmış varyantlar (`/senaryo-ekle` ve `/dil-ekle` komutları)
- [ ] 🤖 `docs/inceleme/<dil>.md`: anadili o dil olan birinin kontrol etmesi için tüm replik ve cevapların düz listesi
- [ ] 🧑 Her dil için anadili o dil olan birine inceleme listesini okut (doğallık en önemli şey). Düzeltmeleri Claude Code'a ver.
- [ ] 🧑 Paywall'daki "12 temel / 150+ özel senaryo" iddiasını gerçek sayıyla değiştir (`src/features/paywall/paywallConfig.ts`)
- [ ] 🤖 İçerik bitince `/ses-uret` (Faz 1'deki betik yeni replikleri üretir)

**Bitti sayılır:** 20 senaryo (12 ücretsiz + 8 Pro) 6 dilde oynanabilir, doğrulama testi yeşil, her replik seslendirilmiş.

---

## Faz 4 · Gerçekçi görseller (yapay zekâ ile)

Stil kuralları, kapak sahneleri ve portre şablonu: `docs/ICERIK-KILAVUZU.md` → Görseller. Komut: `/gorsel`.

- [ ] 🧑 **Karar — nereden üretilecek:**
  - (a) Claude Code bir betikle bir görsel API'si üzerinden üretir (ör. OpenAI veya Google görsel modeli; senin API anahtarın, 20–40 görsel için birkaç dolar)
  - (b) Görselleri başka bir araçta (ör. Claude sohbeti, Midjourney, Higgsfield) üretip `assets/images/scenarios/raw/`'a koyarsın, Claude Code işler
  - Hangi araçla olursa olsun, ticari kullanım şartlarını kontrol et.
- [ ] 🤖 `docs/gorsel-promptlari.md`: her senaryo ve her karakter için hazır prompt (ortak stil + sahneye özel kısım)
- [ ] 🤖 (a) seçildiyse `scripts/generate-images.ts` (`npm run images`): promptları okur, `--confirm` ile üretir, `raw/`'a yazar, var olanı atlar
- [ ] 🤖 `scripts/optimize-images.ts`: `sharp` ile WebP'ye çevir, 1024 px ve 512 px iki boy, ~80–150 KB; `src/data/images.ts` manifesti (+ blurhash)
- [ ] 🤖 `npx expo install expo-image`; `ScenarioCard` (zaten `image` prop'u var), ders sahne başlığı ve `NpcAvatar` gerçek görselleri kullansın; yoksa mevcut SVG çizime düşsün
- [ ] 🤖 Karakter portreleri: her NPC için tutarlı tek portre (aynı kişi farklı senaryolarda aynı görünür)
- [ ] 🧑 Görselleri telefonda gözden geçir; logo/yazı/tuhaf el-yüz hatası olanları yeniden ürettir

**Bitti sayılır:** 20 senaryonun kapak görseli ve tüm karakter portreleri gerçekçi, tutarlı, uygulamada hızlı yükleniyor.

---

## Faz 5 · Her gün kullanılabilir olsun (alışkanlık döngüsü)

- [ ] 🤖 **Günün sahnesi:** her gün ilgi alanlarına ve seviyeye göre seçilen tek bir 3–5 dakikalık senaryo; ana sayfada en üstte
- [ ] 🤖 **Hatırlatma bildirimi** (`expo-notifications`, yerel, ücretsiz): onboarding'de seçilen saatte; izin ilk dersten sonra istenir; metinler nazik ve dönüşümlü, suçlayıcı değil
- [ ] 🤖 **Seri dondurma:** ücretsiz haftada 1, Pro 3; kaçırılan gün otomatik korunur
- [ ] 🤖 **Tekrar kuyruğu ekranı:** zorlanılan cümleler; 1, 3, 7 gün aralıklı tekrar
- [ ] 🤖 **Yarım kalan ders:** kaldığı yerden "Devam Et"
- [ ] 🤖 **İlerlemem:** son 7 günün dakika/XP grafiği, seri takvimi
- [ ] 🤖 Seri, dondurma ve tekrar aralığı mantığı için birim testleri (gün geçişi, saat dilimi)

---

## Faz 6 · İlgi çekici özellikler

Sıralama: etki / emek. Hepsi sunucusuz, ek maliyetsiz.

- [ ] 🤖 **Sürpriz soru:** NPC bazen senaryo dışı beklenmedik bir soru sorar ("Yulaf sütü bitti, soya olur mu?"). Gerçek hayattaki panik anını prova ettirir. Senaryoya `curveballs` alanı.
- [ ] 🤖 **Kaygı termometresi:** ders öncesi ve sonrası tek dokunuşla "Ne kadar gergindin? 1–5". İlerlemem'de "3 haftada 4'ten 2'ye" grafiği.
- [ ] 🤖 **Gerçek hayat görevi:** ders sonunda isteğe bağlı görev ("Bugün bir kafede siparişini İngilizce ver"). Ertesi gün "Yaptın mı?" → rozet.
- [ ] 🤖 **Seyahat modu:** şehir + tarih gir ("Paris, 12 gün sonra") → her gün o şehre uygun sahne, geri sayım. Pro için güçlü satış noktası.
- [ ] 🤖 **Kurtarıcı cümleler + ana ekran widget'ı:** "Tekrar eder misiniz, biraz yavaş?" gibi hayat kurtaran cümleler çevrimdışı cep kartında; widget'ta günün cümlesi (`expo-widgets`, iOS).
- [ ] 🤖 **Rolleri değiştir:** aynı sahnede sen barista olursun; aynı içerikle dinleyip anlama pratiği.
- [ ] 🤖 **Hız merdiveni:** NPC yavaş → normal → doğal hız (gömülü seslerin oynatma hızıyla); "doğal hızda anladın" rozeti.
- [ ] 🤖 **Kendini tanıt oluşturucu:** adın, işin, şehrin, hobilerinle sana özel tanıtım metni üret; mülakat, parti, derste ilk gün için prova et.
- [ ] 🤖 **Seri paylaşım kartı:** "14 günlük seri" görselini hikâyede paylaş (`react-native-view-shot` + paylaşım menüsü).
- [ ] 🧑 **Sonraya not (maliyet/cihaz sınırı olan):** Haftalık lig ve arkadaş sıralaması sunucu ister. Serbest sohbet için cihaz içi dil modelleri (iOS 26'da Apple'ın modeli, bazı Android'lerde Gemini Nano) sadece destekleyen telefonlarda çalışır; Pro'da deneysel olarak araştırılabilir.

---

## Faz 7 · Freemium (RevenueCat)

- [ ] 🧑 RevenueCat hesabı (ücretsiz katman), "pro" yetkisi; Play Console / App Store Connect'te yıllık (7 gün deneme) ve aylık abonelik; API anahtarları `.env.local`
- [ ] 🤖 `npx expo install react-native-purchases`, `usePro()` hook'u
- [ ] 🤖 Paywall: fiyatlar `offerings`'ten; satın al, geri yükle, hata/iptal
- [ ] 🤖 Pro kilitleri: Pro senaryolar, ücretsizde günlük 5 dk sınırı (nazik "bugünlük bu kadar" ekranı), seyahat modu
- [ ] 🤖 Koşullar ve Gizlilik sayfaları (GitHub Pages, ücretsiz)
- [ ] 🧑 Sandbox'ta satın alma, geri yükleme, iptal testi

---

## Faz 8 · Kalite

- [ ] 🤖 Koyu tema turu, erişilebilirlik (TalkBack/VoiceOver, büyük yazı), küçük ekran
- [ ] 🤖 Bileşen testleri (`@testing-library/react-native`), ErrorBoundary
- [ ] 🤖 GitHub Actions: typecheck + test + lint
- [ ] 🧑 Karar: çökme raporlama (ör. Sentry ücretsiz katmanı) ister misin?

---

## Faz 9 · Yayın

- [ ] 🧑 Google Play geliştirici hesabı (25 $, bir kez) · Apple Developer (99 $/yıl, iOS için)
- [ ] 🤖 İkon ve açılış ekranı (maskot), `app.json` meta, izin metinleri (6 dil için mikrofon açıklaması)
- [ ] 🤖 iOS gizlilik bildirimi, Android "Veri güvenliği" cevap taslağı (mikrofon kullanılıyor, ses kaydedilmiyor, veri cihazda)
- [ ] 🤖 Mağaza metni (TR + EN), ekran görüntüsü listesi
- [ ] 🤖 `eas build --profile production`, `eas submit`, iç test kanalı / TestFlight, EAS Update kanalı
- [ ] 🧑 5–10 kişiyle 1 hafta iç test; izinli gerçek bir kullanıcı yorumu al

---

## Maliyet özeti

| Ne | Ücret |
|---|---|
| Konuşma tanıma (cihaz) | 0 |
| Karakter sesleri (Google Chirp 3: HD, bir kerelik üretim) | 0 (ayda 1M karakter ücretsiz; bu proje ~150K) |
| Görseller (bir kerelik üretim) | Birkaç dolar (seçilen araca göre) |
| Expo/EAS, RevenueCat, GitHub Pages | 0 (ücretsiz katman) |
| Google Play geliştirici | 25 $ bir kez |
| Apple Developer | 99 $/yıl (iOS için) |
