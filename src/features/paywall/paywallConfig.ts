import type { IconName } from '../../components/ui/Icon';

export type PlanId = 'yearly' | 'monthly';

export interface Plan {
  id: PlanId;
  title: string;
  /** Kartta büyük gösterilen aylık eşdeğer fiyat */
  pricePerMonth: string;
  /** Kartın altındaki açıklama */
  note: string;
  /** Deneme varsa gün sayısı */
  trialDays?: number;
  /** Kartın üstüne taşan etiket */
  badge?: string;
  /** CTA altındaki açık fiyat bildirimi (mağaza kuralı: ne zaman, ne kadar) */
  disclosure: string;
  cta: string;
}

/**
 * ÖNEMLİ: Canlıda fiyatları buraya elle yazma. RevenueCat/StoreKit'ten gelen
 * `product.priceString` ile doldur: ülke, vergi ve kur mağazaya göre değişir.
 * Aşağıdakiler tasarımdaki örnek TL fiyatları.
 */
export const plans: Plan[] = [
  {
    id: 'yearly',
    title: 'Yıllık Plan',
    pricePerMonth: '₺69,99',
    note: 'Yıllık ₺839,88 olarak faturalandırılır',
    trialDays: 7,
    badge: 'En popüler · %50 tasarruf',
    disclosure: 'Bugün ₺0. 7 gün sonra yıllık ₺839,88. Ondan önce iptal edersen hiç ücret ödemezsin.',
    cta: '7 Gün Ücretsiz Başla',
  },
  {
    id: 'monthly',
    title: 'Aylık Plan',
    pricePerMonth: '₺139,99',
    note: 'Dilediğin ay durdur veya iptal et',
    disclosure: 'Her ay ₺139,99 yenilenir. İstediğin an iptal edebilirsin.',
    cta: "Aylık Pro'yu Başlat",
  },
];

export type ProTone = 'coral' | 'amber' | 'text' | 'calm';

export interface FeatureRow {
  id: string;
  icon: IconName;
  title: string;
  free: string;
  pro: string;
  proTone: ProTone;
  detail?: string;
}

/**
 * Sadece uygulamanın GERÇEKTEN yapabildiği şeyleri vaat et.
 * Cihaz içi ses tanıma telaffuz/aksan puanlayamaz, o yüzden "Aksan koçu" yok.
 * Senaryo sayılarını yayındaki içerikle eşleştir.
 */
export const features: FeatureRow[] = [
  { id: 'time', icon: 'timer', title: 'Günlük Pratik Süresi', free: '5 dk / gün', pro: 'Sınırsız pratik', proTone: 'coral' },
  {
    id: 'library', icon: 'compass', title: 'Senaryo Kütüphanesi', free: '12 temel senaryo', pro: '20 senaryonun hepsi', proTone: 'amber',
    detail: 'Otel, havalimanı, iş mülakatı, doktor randevusu ve fazlası',
  },
  { id: 'review', icon: 'repeat', title: 'Kişisel Tekrar Kuyruğu', free: 'Son ders', pro: 'Zorlandığın her cümle', proTone: 'text' },
  { id: 'offline', icon: 'plane', title: 'Çevrimdışı Pratik Modu', free: '—', pro: 'Metro ve uçakta', proTone: 'calm' },
];

export interface Testimonial {
  quote: string;
  author: string;
  meta: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatarUri?: string;
}

/**
 * Yalnızca GERÇEK ve yayın izni alınmış kullanıcı yorumu koy (ör. beta testinden).
 * Uydurma yorum hem kullanıcıyı yanıltır hem de mağaza incelemesinde red sebebidir.
 * null iken kart canlıda hiç görünmez; geliştirme modunda "örnek" yer tutucu gösterilir.
 */
export const testimonial: Testimonial | null = null;
