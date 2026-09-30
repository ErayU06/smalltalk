---
description: Telefonda elle yapılacak test listesini ver, sonuçlara göre hataları düzelt
---

`docs/ROADMAP.md`'de `[x]` olan maddelere ve son commit'lere bak. Bana telefonda uygulayacağım bir kontrol listesi ver: en fazla 15 madde, her biri tek satır, beklenen sonuçla. Son değişikliklerle ilgili maddeleri öne al; henüz yapılmamış özellikleri listeye koyma.

Temel liste (yapıldıysa):

1. Uygulama açılıyor, yazı tipi Plus Jakarta Sans; Kiril/Çince/Korece metinler düzgün görünüyor (kutu/soru işareti yok)
2. Onboarding: bayraklar doğru, seçili kartta mercan çerçeve, içeriği olmayan diller "Yakında"
3. Mikrofon izni: reddedince konuşma adımları yazmaya dönüyor
4. Karakter sesleri: barista, turist, hoca farklı seslerde; uçak modunda da çalışıyor
5. Yavaş mod (0.8×) ve "tekrar dinle" çalışıyor; ses kesilmeden bitiyor
6. Her hedef dilde bir senaryo: konuşma tanıma o dilde yazıya döküyor; doğru cevap yeşil, küçük hata kehribar "Neredeyse"
7. Çince/Korece: "Okunuşu göster" çalışıyor; kelime çipleriyle cümle kurulabiliyor
8. Senaryo kartlarında gerçek görseller hızlı yükleniyor, yazı/logo yok
9. Günün sahnesi ve hatırlatma bildirimi seçilen saatte geliyor
10. Seri: gün atlayınca dondurma devreye giriyor
11. Koyu tema: tüm ekranlar okunaklı
12. Paywall: plan değişince buton metni ve fiyat açıklaması değişiyor

Sonuçları yazdığımda her başarısız madde için nedeni bul, düzelt, `npx tsc --noEmit`, `npx expo lint`, `npx jest` çalıştır ve commit at.
