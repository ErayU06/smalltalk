# Tasarım kaynakları

| Dosya | Ne |
|---|---|
| `DESIGN.md` | Stitch'in tasarım sistemi (renkler, tipografi, bileşen tarifleri) |
| `stitch-ekranlar.html` | Stitch'ten dışa aktarılan 8 ekran, tek dosyada art arda (her biri `<!-- Ekran adı -->` yorumuyla başlar) |
| `stitch-onboarding-tanisma.html` | Onboarding 1. adımın (dil seçimi) güncel Stitch tasarımı |
| `onboarding-referans.png` | Dil seçimi referans görseli |
| `paywall-referans.png` | Paywall referans görseli |
| `onboarding-uygulama.png` | Kodun web sürümünden alınmış gerçek ekran görüntüsü (karşılaştırma için) |

Claude Design tuvali (16 pano: tüm ekranlar, tokenlar, bileşenler, handoff notları):
https://claude.ai/artifact/BohpGZJBHdnvTccBTYEtnB

## Öncelik sırası (çelişkide)

1. `CLAUDE.md` kuralları
2. Koddaki tokenlar (`src/theme/tokens.ts`) ve bileşenler
3. Bu klasördeki Stitch dosyaları

Stitch dosyalarında olup uygulamada **bilerek değiştirilenler** (geri getirme):

- **Telaffuz / aksan / "yerli tını" puanı:** Cihaz içi ses tanıma bunu ölçemez. Yerine "beklenen cevaba yakınlık" (matchAnswer skoru) ve "beklenen kalıbı yakaladık".
- **`#FF6B4A` üstünde beyaz yazı:** 2.8:1, okunmuyor. Yazılı butonlar `Button` bileşeni (buttonGradient).
- **Kırmızı `error` kartları:** Yok. Durumlar: Harika (yeşil), Neredeyse (kehribar), Endişelenme (mercan).
- **"Sesimi tekrar dinle":** Ses kaydı tutulmuyor. Yerine "Doğru halini dinle" (TTS).
- **"Uçtan uca gizli", "yapay zekâ":** Doğru değil. Kayıt yok; tanıma telefonun motoruyla.
- **Uydurma kullanıcı yorumu (paywall):** Sadece gerçek, izinli yorum.
- **Emoji ve uzak görseller:** SVG ikon/bayrak/çizim kullanılıyor. Stitch'teki `lh3.googleusercontent.com` görselleri geçici adresler.
