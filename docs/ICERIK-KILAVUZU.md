# Talkwell içerik kılavuzu

Senaryo yazarken, yeni dil eklerken, ses ve görsel üretirken bu dosya esas alınır. `/senaryo-ekle`, `/dil-ekle`, `/ses-uret` ve `/gorsel` komutları önce bunu okur.

**Altın kural:** Her replik, o ülkede gerçekten duyulacak bir cümle olmalı. Ders kitabı cümlesi değil. Diğer dillerdeki varyant çeviri değildir, o kültüre uyarlanmış aynı sahnedir.

---

## 1. Senaryo listesi (20 senaryo: 12 ücretsiz + 8 Pro)

Karakter sütunundaki kimlikler 3. bölümdeki kadroya bağlanır. Aynı karakter farklı senaryolarda tekrar görünebilir (ör. Leo ilk gün tanışılan kişi, sonra partide ve grup ödevinde çıkıyor). Bu süreklilik, kullanıcının "tanıdık yüz" hissini artırır.

| # | id | Başlık (arayüzde, Türkçe) | Karakter | Seviye | Erişim | Kalıp (EN) | Sürpriz soru fikri |
|---|---|---|---|---|---|---|---|
| 1 | `cafe-order` | Kafede sipariş ver, ismini söyle | barista | Başlangıç | Ücretsiz | Could I get…? | "Yulaf sütü bitti, badem sütü olur mu?" |
| 2 | `self-intro` | İlk gün: kendini tanıt | new-friend | Başlangıç | Ücretsiz | Nice to meet you, I'm… | "Adını doğru mu söylüyorum?" |
| 3 | `neighbor-elevator` | Asansörde yeni komşunla tanış | neighbor | Başlangıç | Ücretsiz | Lovely day, isn't it? | "Hangi kata taşındınız?" |
| 4 | `street-directions` | Metroyu sor, kestirme yol iste | tourist | Orta | Ücretsiz | Could you tell me the way to…? | "Yürüyerek mi gidilir, otobüs mü?" |
| 5 | `supermarket` | Markette ürün bul, kasada öde | cashier | Başlangıç | Ücretsiz | Excuse me, where can I find…? | "Poşet ister misiniz?" |
| 6 | `restaurant-order` | Masa iste, sipariş ver, hesabı öde | waiter | Başlangıç | Ücretsiz | Could we have the bill, please? | "Bu yemek biraz acı, sorun olur mu?" |
| 7 | `transit-ticket` | Bilet al, doğru hattı sor | ticket-agent | Başlangıç | Ücretsiz | Which line goes to…? | "Bu kart burada geçmiyor." |
| 8 | `campus-extension` | Ödev için ek süre iste | professor | Akademik | Ücretsiz | I was wondering if… | "Neden daha önce haber vermedin?" |
| 9 | `pharmacy` | Eczanede baş ağrısı için bir şey iste | pharmacist | Orta | Ücretsiz | Do you have anything for…? | "Başka ilaç kullanıyor musunuz?" |
| 10 | `clothes-shop` | Beden sor, dene, değiştir | shop-assistant | Orta | Ücretsiz | Do you have this in a medium? | "İndirimli ürünlerde iade yok." |
| 11 | `phone-appointment` | Telefonla randevu al | phone-receptionist | Orta | Ücretsiz | I'd like to book an appointment for… | "Hat kötü, tekrar eder misiniz?" |
| 12 | `group-project` | Grup ödevini planla | new-friend | Orta | Ücretsiz | How about we split it up? | "Ben o gün gelemiyorum." |
| 13 | `hotel-late-checkout` | Oda kartı sorunu ve geç çıkış isteği | receptionist | İleri | Pro | Would it be possible to…? | "Geç çıkış ücretli, yine de ister misiniz?" |
| 14 | `airport-checkin` | Check-in yap, koltuk ve bagaj sor | airline-agent | Orta | Pro | Could I get a window seat? | "Bagajınız 2 kilo fazla." |
| 15 | `office-small-talk` | Mutfakta "Hafta sonun nasıldı?" | colleague | Orta | Pro | How was your weekend? | "Öğle yemeğine sen de geliyor musun?" |
| 16 | `job-interview` | Mülakatta kendinden bahset | interviewer | İleri | Pro | I've been working as… for… | "En büyük zayıf yönün ne?" |
| 17 | `doctor-visit` | Doktora şikâyetini anlat | doctor | İleri | Pro | It started… and it hurts when… | "Alerjiniz var mı?" |
| 18 | `polite-complaint` | Yanlış gelen siparişi kibarca düzelttir | waiter | İleri | Pro | Sorry, I think there's been a mix-up. | "Mutfak kapanıyor, başka bir şey getirelim mi?" |
| 19 | `party-mingle` | Partide sohbete katıl, kibarca ayrıl | new-friend | İleri | Pro | Anyway, it was great talking to you! | "Buradan kimi tanıyorsun?" |
| 20 | `flat-viewing` | Kiralık ev görmeye git, soru sor | landlord | İleri | Pro | Are the bills included? | "Bu hafta karar vermeniz lazım." |

- **Mevcut kimlikler:** `street-directions-en-1` ve `campus-extension-en-1` ilerleme veritabanında kayıtlı olabilir. Yeni yapıya geçerken eski kimliği yeniye eşleyen bir veritabanı göçü yaz.
- **İlerleme anahtarı:** Artık dil bazında tutulur: `<senaryo-id>:<dil>` (ör. `cafe-order:de`).
- **Paywall:** "12 temel senaryo" doğru kalır. Pro tarafındaki "150+ özel senaryo" yazısını gerçek sayıyla değiştir (ör. "20 senaryo, 6 dil").
- **Yeni senaryo fikirleri (sonra):**
  - Berberde saç kestirme
  - Kargo/postane
  - Banka hesabı açma
  - Spor salonu üyeliği
  - Taksi/araç çağırma
  - Doğum günü tebriği
  - Bir yabancıya iltifat edip sohbet açma
  - Kayboldum, telefonum şarjsız

---

## 2. Senaryo ve adım yazım kuralları

### Senaryo
- **Uzunluk:** 4–6 adım, 3–5 dakika.
- **XP:** Başlangıç 20 · Orta 25 · Akademik 30 · İleri 35.
- **Seviye karşılığı:** Başlangıç A1–A2 · Orta A2–B1 · Akademik B1–B2 · İleri B2.
- **Akış:**
  1. Kolay açılış (çoktan seçmeli).
  2. Asıl istek (yazma).
  3. Ayrıntı (konuşma).
  4. Küçük bir engel (çoktan seçmeli veya yazma).
  5. **Kapanış small talk'u** (konuşma).
- **Kapanış şart:** Her senaryonun son adımı küçük bir sohbet anı içerir: iltifat, hava, "iyi günler", "görüşürüz". Uygulamayı rakiplerinden ayıran şey bu.
- **Sürpriz sorular:** Her senaryoya 1–2 tane (`curveballs`, Faz 6). Bunlar ana akışa girmez, rastgele araya girer.
- **Kalıp rozeti:** Senaryodan akılda kalacak tek bir kalıp ve Türkçe kısa not (seviye etiketiyle).

### NPC replikleri
- **Kısa tut:** İngilizcede ≤ 15 kelime, diğer dillerde benzer uzunluk.
- **Doğal konuşma:** Kısaltmalar ve dolgu sözcükler olsun ("Sure thing!", "Alles klar!", "D'accord.", "Хорошо.", "好的。", "네~").
- **Sabit metin:** Replikler sabittir (sesler bir kez üretilir). Kullanıcının adı gibi değişken metin **seslendirilen replik içine girmez**; gerekirse ayrı bir ekran yazısı olur.

### İpucu (`hint`)
- Türkçe yazılır. Ne yapılacağını söyler, çeviri vermez: "Boyunu ve süt tercihini söyle."
- `example`, hedef dilde yarım bir taslak cümledir: "Could I get a medium…"

### Açık uçlu adımlar (yazma/konuşma)
- **`acceptedAnswers`:** 3–6 değişken yaz.
  - **İlki kanonik cevaptır.** "Doğru halini dinle" sesi bundan üretilir; en doğal ve en sık kullanılan hali olsun.
  - Diğerleri: resmî/gündelik varyantlar, kısaltmalı hali, farklı sözcük sırası.
- **`keywords`:** Anlamı taşıyan sözcük grupları, küçük harfle. Her gruptan en az biri geçmeli.
  - Çince/Korece: grup içindeki öğeler alt dize olarak aranır; ekler ve boşluklar önemsiz.
- **`mistakes`:** 1–3 tane, **o dilde Türkçe konuşanların gerçekten yaptığı** hatalardan (4. bölüm).
  - `match` bir düzenli ifadedir.
  - `tip` Türkçedir, tek cümledir, nedenini açıklar ve azarlamaz.
- **`why`:** "Neredeyse" durumunda gösterilecek tek cümlelik açıklama.
- **`wordBank`:** 4–6 çip, kanonik cevabın parçaları ve 1–2 işe yarar kalıp.
  - Çince/Korece'de dokunarak cümle kurmaya yetecek kadar parça olmalı.

### Çoktan seçmeli adımlar
- **Üç şık:**
  - Bir doğru.
  - Bir **"neredeyse"** (`near: true`): anlam doğru, üslup sorunlu (fazla direkt, fazla resmî, yanlış hitap).
  - Bir yanlış anlama.
- **Geri bildirim:** Her şıkta Türkçe `feedback` olsun. Yanlışta bile nazik: "Bu, 'burada mı içeceksiniz' sorusuna cevap olurdu."

### Geri bildirim dili (güvenli alan)
- **Asla yazma:** "Yanlış!", "Hata!", ünlem yağmuru.
- **Kullan:** "Neredeyse!", "Şöyle daha doğal olur:", "Endişelenme!"
- **Açıklama:** Tek cümle, en fazla 120 karakter. Kural adı yerine örnek ver.

### Hassas konular
- **Eczane ve doktor:** İlaç adı, doz ya da tanı yok. Genel şikâyetler kullan (baş ağrısı, boğaz ağrısı, alerji); cevap "eczacınıza/doktorunuza danışın" çizgisinde kalır.
- **Genel:** Alkol, siyaset ve din konuları yok. Parti sahnesinde içecek belirtilmez.

---

## 3. Karakter kadrosu

- **Yerelleştirme:** Her rol her dilde o kültüre uygun bir isimle yer alır.
- **Tek kaynak:** Kadro `src/data/cast.ts` dosyasında tutulur.
- **Ses:** Cinsiyet ve yaş, ses seçiminde kullanılır (`voices.ts`, Faz 1b).
- **Portre:** Her dildeki karakterin kendi portresi vardır (Faz 4).
- **İllüstrasyon:** Mevcut `NpcLook` SVG çizimleri 4 rolü kapsıyor. Yeni roller için genel bir avatar kullanılır; gerçek portre gelince o gösterilir.

| Rol (`id`) | Cinsiyet, yaş | EN | DE | FR | RU | ZH | KO |
|---|---|---|---|---|---|---|---|
| `barista` | K, 20'ler | Emma | Lena | Camille | Аня (Ánya) | 小林 (Xiǎo Lín) | 지우 (Jiu) |
| `tourist` | E, 30'lar | Alex | Jonas | Hugo | Дима (Díma) | 小王 (Xiǎo Wáng) | 민수 (Minsu) |
| `professor` | K, 50'ler | Prof. Miller | Prof. Wagner | Mme Laurent | Анна Сергеевна (Ánna Sergéyevna) | 陈老师 (Chén lǎoshī) | 김 교수님 (Kim gyosunim) |
| `receptionist` | E, 30'lar | Daniel | Herr Becker | Julien | Максим (Maksím) | 小周 (Xiǎo Zhōu) | 준호 (Junho) |
| `cashier` | K, 40'lar | Linda | Frau Schulz | Nathalie | Татьяна (Tatyána) | 刘阿姨 (Liú āyí) | 은정 (Eunjeong) |
| `waiter` | E, 20'ler | Tom | Felix | Lucas | Артём (Artyóm) | 小张 (Xiǎo Zhāng) | 현우 (Hyeonu) |
| `neighbor` | K, 60'lar | Mrs. Carter | Frau Richter | Mme Dubois | Галина Петровна (Galína Petróvna) | 王阿姨 (Wáng āyí) | 박 여사님 (Park yeosanim) |
| `pharmacist` | E, 40'lar | Mr. Patel | Herr Neumann | M. Moreau | Сергей (Sergéy) | 赵先生 (Zhào xiānsheng) | 성민 (Seongmin) |
| `doctor` | K, 40'lar | Dr. Nguyen | Dr. Hoffmann | Dr Petit | Елена Викторовна (Yeléna Víktorovna) | 周医生 (Zhōu yīshēng) | 한 선생님 (Han seonsaengnim) |
| `colleague` | K, 20'ler | Maya | Sarah | Léa | Катя (Kátya) | 小陈 (Xiǎo Chén) | 수아 (Sua) |
| `interviewer` | E, 40'lar | Mr. Brooks | Herr Krüger | M. Garnier | Игорь Викторович (Ígor Víktoroviç) | 黄经理 (Huáng jīnglǐ) | 최 팀장님 (Choi timjangnim) |
| `landlord` | K, 50'ler | Mrs. Evans | Frau Weber | Mme Bernard | Ирина Николаевна (Irína Nikoláyevna) | 孙阿姨 (Sūn āyí) | 윤 사장님 (Yun sajangnim) |
| `shop-assistant` | K, 20'ler | Chloe | Mia | Inès | Настя (Nástya) | 小杨 (Xiǎo Yáng) | 하은 (Haeun) |
| `ticket-agent` | E, 50'ler | Gary | Herr Vogel | M. Girard | Николай (Nikoláy) | 老马 (Lǎo Mǎ) | 상훈 (Sanghun) |
| `airline-agent` | K, 30'lar | Rachel | Julia | Manon | Алина (Alína) | 小许 (Xiǎo Xǔ) | 유나 (Yuna) |
| `new-friend` | E, 20'ler | Leo | Max | Théo | Кирилл (Kiríll) | 李明 (Lǐ Míng) | 도윤 (Doyun) |
| `phone-receptionist` | K, 30'lar | Jess | Frau Braun | Mme Lefèvre | Марина (Marína) | 小何 (Xiǎo Hé) | 민지 (Minji) |

`phone-receptionist` telefonda konuştuğu için portresi yoktur; derste telefon simgesi gösterilir.

---

## 4. Dil notları

### Şehirler ve para birimleri

| Dil | Kod | Şehirler | Para | Konuşma tanıma notu |
|---|---|---|---|---|
| İngilizce | `en-US`, `en-GB` | New York, Londra | $, £ | Londra sahneleri `en-GB`: `street-directions`, `transit-ticket`, `flat-viewing` |
| Almanca | `de-DE` | Berlin, München | € | |
| Fransızca | `fr-FR` | Paris, Lyon | € | |
| Rusça | `ru-RU` | Moskova, St. Petersburg | ₽ | Tanıma `ё` yerine `е` döndürebilir |
| Çince (Mandarin, basitleştirilmiş) | `zh-CN` | Pekin, Şanghay | 元 (konuşmada 块) | Android'de kod `cmn-Hans-CN` olabilir |
| Korece | `ko-KR` | Seul, Busan | ₩ (원) | |

**Hepsi için:**
- **Sayılar:** Konuşma tanıma rakam da yazı da döndürebilir ("two"/"2", "zwei"/"2", "两"/"2"). `matchAnswer` sayıları dil bazında normalize etmeli.
- **Marka adı yok:** Ulaşım kartı, ödeme uygulaması, kafe zinciri adı geçmez. "Kart", "telefonla öde", "QR kodu okut" gibi genel ifadeler kullan.

### Kültüre uyarlama örneği: `cafe-order`

| Dil | Sahnede farklı olan |
|---|---|
| EN | "For here or to go?", bardağa isim yazılır, "What name should I put?" |
| DE | "Zum Hiertrinken oder zum Mitnehmen?", isim sorulmaz, "Mit Karte, bitte." |
| FR | Önce mutlaka "Bonjour". "Sur place ou à emporter ?" "Un café" = espresso. |
| RU | "Здесь или с собой?" Adın sorulması yaygın değil; "Пакет нужен?" sorulabilir. |
| ZH | "在这儿喝还是带走？", "大杯/中杯", QR kodla ödeme ("扫码"). |
| KO | "드시고 가세요? 포장이세요?", "진동벨 드릴게요" (titreşimli çağrı cihazı), kışın bile "아이스 아메리카노". Sürpriz soru: "적립하시겠어요?" (puan kartı). |

### İngilizce (EN)
- **Kibarlık:** "Could I get / I'd like / Would it be possible to…". "I want / Give me" fazla direkt; `near` şık için ideal.
- **Kültür:**
  - ABD'de restoranda bahşiş (%15–20) ve "Can I get you started with something to drink?"
  - İngiltere'de "Cheers" (teşekkür anlamında), "queue", "flat", "the Tube".
- **Türkçe konuşanların tipik hataları:**
  - `turn right in the corner` → **at** the corner
  - `I am agree` → I agree
  - `How can I go to…?` → How do I get to…? (neredeyse)
  - `I'm 25 years` → I'm 25
  - Tekil sayılabilir isimde artikel unutmak: `I'd like coffee` yerine `a coffee`
  - `make a photo` → take a photo

### Almanca (DE)
- **Sie/du:**
  - Görevli, yabancı, hoca, doktor, ev sahibi için **Sie**.
  - Aynı yaştaki tanıdık, iş arkadaşı (çoğu yerde) ve parti için **du**.
  - Karıştırmak `near` (neredeyse) olur.
- **Kibarlık:** "Ich hätte gern…", "Könnten Sie…?", "Ich möchte…". "Ich will…" fazla direkt.
- **Kültür:**
  - Restoranda "Zusammen oder getrennt?" (hesap ayrı mı?).
  - Bahşiş yuvarlanarak verilir: "Stimmt so."
- **Tipik hatalar:**
  - Fiil ikinci sırada (V2): `Dann ich nehme` → Dann **nehme ich**.
  - Akkusativ: `Ich möchte ein Kaffee` → **einen** Kaffee.
  - `Ich bin 25 Jahre` → … Jahre **alt**.
  - Görevliye "du" demek.
- **Artikel hataları** (der/die/das) anlamı bozmaz: "neredeyse" ve ipucu, asla "yanlış" değil.
- **Değerlendirme:** `ß`=`ss`; `ä/ö/ü` = `ae/oe/ue`.

### Fransızca (FR)
- **Vous/tu:**
  - Görevli ve yabancılara **vous**.
  - Genç tanıdık ve partide **tu**.
- **Kibarlık:**
  - Her etkileşim "Bonjour" ile başlar; söylemeden istek yapmak kaba sayılır. İlk adıma `^(?!.*\bbonjour\b)` gibi bir "bilinen hata" konabilir.
  - "Je voudrais…", "Je vais prendre…". "Je veux" fazla direkt.
- **Kültür:**
  - Garsona "Garçon!" denmez; "Excusez-moi" ya da "Monsieur/Madame" denir.
  - "L'addition, s'il vous plaît."
- **Tipik hatalar:**
  - `Je suis 25 ans` → **J'ai** 25 ans.
  - Cinsiyet: `un baguette` → **une** baguette.
  - Görevliye "tu" demek.
- **Konuşma dili:** "Je sais pas" (ne düşmüş hali) konuşmada doğaldır; kabul et.
- **Değerlendirme:** Aksanlar ve kesme işaretleri yok sayılır (`cafe` = `café`, `jaimerais` = `j'aimerais`).

### Rusça (RU)
- **Вы/ты:**
  - Görevli ve yabancılara **вы**.
  - Genç tanıdıkla **ты**.
  - Yaşlı ve profesyonel kişilere isim-baba adıyla hitap edilir ("Анна Сергеевна").
- **Kibarlık:**
  - "Можно…?", "Будьте добры…", "Скажите, пожалуйста…".
  - **"Дайте, пожалуйста…" Rusçada normal ve kibardır.** İngilizcedeki "Give me" kuralını buraya taşıma.
- **Kültür:**
  - Selam: resmî "Здравствуйте", samimi "Привет".
  - Kasada "Пакет нужен?" sık sorulur.
- **Tipik hatalar:**
  - "пожалуйста"yı unutmak.
  - Sayı + hâl: "две чашки", "два кофе" (кофе çekimlenmez, eril).
  - в/на karışıklığı: "на метро", "в кафе".
  - Yabancıya "ты" demek.
- **Değerlendirme:** `ё` = `е`; sözcük sırası esnek olduğu için anahtar kelime ağırlığı yüksek tutulur.

### Çince (ZH)
- **Hitap:**
  - Hoca, doktor ve yaşlılara **您**; diğerlerine 你.
  - Unvanlar: 老师, 医生, 师傅 (şoför/usta), 阿姨 (orta yaş kadın).
- **Kibarlık:**
  - Soru "请问…" ile açılır; rica için "麻烦你…".
  - **Siparişte "我要…" doğaldır, kaba değildir.** İngilizce kuralını taşıma.
- **Kültür:**
  - Ödeme QR kodla ("扫码"); marka adı geçmez.
  - Restoranda "服务员" diye seslenilir, hesap için "买单".
- **Tipik hatalar:**
  - Ölçü sözcüğü: `一个咖啡` → 一**杯**咖啡.
  - `二杯` → **两**杯.
  - Zaman fiilden önce gelir: `我去明天` → 我**明天**去.
  - Evet/hayır cevabında 是 yerine fiili tekrarla: "要" / "有".
- **Değerlendirme:** Karakter tabanlı benzerlik; noktalama `。，？！` temizlenir; anahtar kelimeler alt dize olarak aranır.
- **Yazma:** Klavye zor olduğundan adımlar "dokunarak cümle kur" ile gelir; serbest yazma da açık kalır.

### Korece (KO)
- **Konuşma düzeyi:**
  - Görevli ve yabancılarla **해요체** (…요).
  - Mülakat, havalimanı ve doktorda **합쇼체** (…습니다) daha uygun.
  - **반말 yok**; tek istisna partide yaşıtın "말 놓을까요?" demesinden sonrası.
- **Unvanlar:** Meslek + 님: 교수님, 약사님, 선생님 (doktor), 사장님. Garsona "저기요".
- **Kültür:**
  - Restoranda masadaki zile basılır, hesap kasada ödenir.
  - Kafede "진동벨".
  - Puan kartı sorusu: "적립하시겠어요?"
- **Türkçe konuşanlar için avantaj:**
  - Sözcük sırası Türkçe gibi (fiil sonda) ve ekler Türkçedeki eklere benzer.
  - Derste bunu cesaretlendirici bir not olarak kullan: "Türkçedeki gibi fiil sonda!"
- **Tipik hatalar:**
  - Sayma sözcüğü: yerli sayılar kullanılır (커피 **한 잔**, **두** 명); `이 잔` yanlış olur.
  - Görevliye 반말 konuşmak.
  - Hocaya -시- onur ekini unutmak ("괜찮으**세**요?").
- **Konuşmada ek düşürmek doğaldır:** "커피 주세요" ile "커피를 주세요" ikisi de **doğru** sayılır; cezalandırma.
- **Değerlendirme:** Karşılaştırmada boşluklar yok sayılır; anahtar kelimeler alt dize olarak aranır.

---

## 5. Okunuş (romanizasyon)

Okunuş Çince, Korece ve Rusça replik ve cevaplarda gösterilir. NPC balonundaki "Okunuşu göster" düğmesiyle açılır.

| Dil | Sistem | Örnek |
|---|---|---|
| Çince | Pinyin, ton işaretli, sözcük sözcük | 我要一杯拿铁。→ Wǒ yào yì bēi nátiě. |
| Korece | Revize Romanizasyon (resmî sistem) | 아이스 아메리카노 한 잔 주세요 → aiseu amerikano han jan juseyo |
| Rusça | **Türkçe okunuşa göre**, vurgulu hece işaretli | Здравствуйте → zdrástvuyte · Спасибо → spasíba · Хорошо → haraşó |

- **Çince tonlar:**
  - 一 ve 不 için değişmiş ton yazılır (yí ge, bú yào); ders kitapları da böyle yapar.
  - Üçüncü ton değişimi işaretlenmez.
- **Rusça harf eşlemesi:**
  - ш → ş, ч → ç, ж → j, щ → şç, ы → ı, х → h, й → y, ц → ts
  - Vurgusuz "о" "a" gibi okunur (akanye): хорошо → haraşó.
- **Yazım ve kontrol:** Okunuşlar elle yazılır ve inceleme listesinde anadili konuşan kişi tarafından kontrol edilir.
  - Çince taslak için `pinyin-pro` gibi bir kütüphane yardımcı olabilir, ama çok okunuşlu karakterler için sonuç mutlaka elle kontrol edilir.
  - İçerik doğrulama testi, bu üç dilde her NPC repliği ve kanonik cevap için okunuş alanının dolu olduğunu kontrol eder.

---

## 6. Dosya yapısı

```
src/data/scenarios/<id>/
  index.ts   # dil bağımsız iskelet: id, setting, level, minutes, xp, isPremium, cast (rol id), image
  en.ts      # dil varyantı: locale, title/description (Türkçe), placeLabel, place, pattern, steps, curveballs
  de.ts  fr.ts  ru.ts  zh.ts  ko.ts
src/data/cast.ts       # rol → dil → { name, gender, age, portrait? }
```

- **Adım kimlikleri tüm dillerde aynıdır** (`s1`…`s5`). Tekrar kuyruğu ve ilerleme bu kimliklere dayanır.
- **Tür sırası:** Bir adımın türü (choice/text/speech) dillere göre değişebilir, ama adım sayısı aynı kalır.
- **Senaryo başlığı:** Türkçedir ve varyanta göre renklenebilir ("Paris'te bir kafede kruvasan iste").

---

## 7. Anadili konuşan kişi incelemesi

Her dil için `docs/inceleme/<dil>.md` dosyası tutulur. Her senaryoda şu bilgiler yer alır:
- Adım kimliği.
- NPC repliği.
- Kabul edilen cevaplar (ilki kalın).
- Çoktan seçmeli şıklar.
- Okunuş.

Her satırın sonunda `[ ] doğal` kutusu ve boş bir "öneri" alanı olur.

Kontrol edecek kişiye sorulacaklar:
1. Bu ülkede biri gerçekten böyle der mi?
2. Kibarlık düzeyi sahneye uygun mu?
3. Okunuş doğru mu?

---

## 8. Sesler (Faz 1)

- **Karakter başına sabit ses:** Her karakter, her dilde tek bir sese sahiptir (`src/data/voices.ts`) ve tüm senaryolarda aynı sesle konuşur.
- **Ne seslendirilir:**
  - NPC replikleri.
  - Kanonik cevap (`acceptedAnswers[0]`).
  - Kalıp rozeti cümlesi.
  - Çoktan seçmelide doğru şık.
  - Sürpriz sorular.
- **Kimin sesiyle:** Kullanıcının cevapları (kanonik cevap, doğru şık) ayrı bir "anlatıcı" sesiyle üretilir. Kullanıcı kendi cümlesini NPC'nin sesinden duymaz.
- **Metin değişirse:** Sesin karması (hash) da değişir. `/ses-uret` yalnızca değişenleri üretir.

---

## 9. Görseller (Faz 4)

### Genel stil (tüm görseller)
- **Görünüm:** Fotogerçekçi, **doğal ve sahnelenmemiş** (candid).
- **Işık ve renk:** Sıcak doğal ışık, sığ alan derinliği. Renk tonu uygulamanın krem-mercan paletine yakın, doygunluğu düşük.
- **Ruh hali:** Sakin ve davetkâr; kaygı uyandıran kalabalık ya da gergin yüz yok.
- **Kesinlikle yok:**
  - Okunabilir yazı, tabela, rakam, logo, marka.
  - Filigran.
  - Ünlü veya tanınabilir gerçek kişi.
  - Çocuk.
  - Alkol.
  - Bozuk el ve parmak.
- **Çeşitlilik:** Karakterler o şehrin gerçek çeşitliliğini yansıtır. Stereotip kıyafet ya da aksesuar kullanılmaz.

### Kapak görselleri (senaryo başına 1, dil bağımsız)
- **Oran:** 4:3. Ana öğe ortada; alt %20'de önemli bir şey olmasın (kartta yazı alanı).
- **Yüz yok:** Kapakta NPC'nin yüzü net görünmez. Karakter her dilde farklı kişi olduğu için kapak **mekânı ve anı** anlatır: kullanıcının gözünden sahne, eller, nesneler, bulanık arka plan figürleri. Kimliği portreler taşır.
- **Dil bağımsız:** Tek kapak tüm dillerde kullanılır. Sonraki adım (isteğe bağlı): en popüler 5 senaryo için şehre özel kapak.

### Karakter portreleri (rol × dil)
- **Kadraj:** 1:1, baş ve omuz, kameraya bakan doğal hafif gülümseme.
- **Arka plan:** Yumuşak pencere ışığı; rolün mekânını ima eden bulanık arka plan.
- **Tutarlılık:** Aynı karakter tüm senaryolarda aynı portreyle görünür. Önce karakteri tek portreyle üret, sonra gerekirse o görseli referans vererek türevler üret.
- **Öncelik:** İngilizce kadro (16 portre). Diğer diller eklendikçe o dilin kadrosu.

### Ortak prompt (İngilizce, araçtan bağımsız)
```
Photorealistic candid photo, {SCENE}. Warm natural light, soft shallow depth of field,
35mm lens, eye-level, calm and inviting mood, subtle warm color grade with cream and
soft coral tones. No text, no letters, no numbers, no signage, no logos, no brand names,
no watermark. Aspect ratio 4:3.
```
Olumsuz prompt (destekleyen araçlarda):
```
text, letters, typography, signage, logo, brand, watermark, celebrity, child, alcohol,
distorted hands, extra fingers, deformed face, oversaturated, cartoon, illustration
```
Portre şablonu:
```
Photorealistic head-and-shoulders portrait of {PERSON: age, gender, appearance},
{ROLE CLOTHING}, natural friendly smile, looking at the camera, soft window light,
softly blurred {PLACE} background, 85mm lens. No text, no logos. Aspect ratio 1:1.
```

### Kapak sahneleri
| id | {SCENE} |
|---|---|
| `cafe-order` | the counter of a cozy specialty coffee shop seen from the customer's point of view, a barista's hands placing a latte with latte art on the counter, espresso machine and pastries softly blurred, morning window light |
| `self-intro` | a bright classroom before the first session, two people shaking hands shown from the chest down, notebooks and coffee cups on the table |
| `neighbor-elevator` | a modern apartment building lobby with elevator doors opening, a potted plant and a paper bag of groceries in the foreground, warm evening light, no people in focus |
| `street-directions` | a city street corner at a pedestrian crossing, a hand holding an unfolded paper map in the foreground, blurred pedestrians, golden hour |
| `supermarket` | a neighborhood supermarket aisle with fresh fruit and vegetables, a shopping basket in the foreground, plain unbranded packaging, soft daylight |
| `restaurant-order` | a table for two in a casual neighborhood restaurant, closed menus, a waiter's hand holding a small notepad, warm evening light |
| `transit-ticket` | a clean metro station concourse with ticket machines and a staffed service window, all signs blurred, a hand holding a plain transit card |
| `campus-extension` | a professor's office during office hours, a wooden desk with stacks of papers and books, a student's laptop and notebook in the foreground, afternoon light |
| `pharmacy` | a clean bright pharmacy counter seen from the customer side, shelves of plain unbranded boxes softly blurred, a pharmacist in a white coat shown from the shoulders down |
| `clothes-shop` | a small clothing boutique, a rack of sweaters in warm colors, a fitting room curtain, a hand holding a folded sweater, soft light |
| `phone-appointment` | a cozy desk at home, a hand holding a smartphone to the ear with only the shoulder and jaw visible, a paper planner and a cup of tea on the desk, morning light |
| `group-project` | a university library study table with laptops, sticky notes and coffee cups, three students' hands pointing at a shared plan, warm light |
| `hotel-late-checkout` | a boutique hotel reception desk, a key card and a small bell on the counter, a suitcase in the foreground, soft lobby lighting |
| `airport-checkin` | an airport check-in counter with a suitcase on the scale, a passport and a boarding pass lying face down, a bright departure hall softly blurred |
| `office-small-talk` | a bright office kitchen, two coffee mugs on the counter, two colleagues chatting seen from behind, plants and morning light |
| `job-interview` | a bright modern meeting room, a printed resume face down and a glass of water on the table, the interviewer's hands holding a pen across the table |
| `doctor-visit` | a calm doctor's consultation room, a desk with a stethoscope and a notepad, an examination bed in soft focus, daylight |
| `polite-complaint` | a restaurant table with a plate that clearly isn't what was ordered, a waiter's hand reaching toward it apologetically, warm light |
| `party-mingle` | a relaxed house party in a living room with string lights, small groups chatting in soft focus, glasses of juice and sparkling water, warm bokeh |
| `flat-viewing` | a bright empty living room of a rental flat with large windows and wooden floors, a set of keys on the windowsill, afternoon light |

### Kayıt ve lisans
- **Kaynak kaydı:** Her görsel için `docs/gorsel-kaynaklari.md` dosyasına araç/model, tarih ve prompt yazılır. Mağaza incelemesi ve lisans soruları için gerekir.
- **Kullanım şartları:** Kullanılan aracın ticari kullanım şartları kontrol edilir.
- **Ham dosyalar:** `assets/images/**/raw/` git'e girmez; yedeğini (ör. Google Drive) sen tutarsın. Uygulamaya yalnızca optimize edilmiş WebP'ler girer.
