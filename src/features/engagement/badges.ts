import type { IconName } from '../../components/ui/Icon';

export interface Badge {
  id: string;
  title: string;
  /** Nasıl kazanılır (Türkçe, kısa) */
  desc: string;
  icon: IconName;
}

/** Kazanım durumuna göre rozetleri hesaplamak için gereken sayılar */
export interface EngagementStats {
  lessons: number;
  streak: number;
  perfectLessons: number;
  languages: number;
  words: number;
  challenges: number;
}

type Rule = Badge & { earned: (s: EngagementStats) => boolean };

/** Sıra: kolaydan zora. Rozetler asla geri alınmaz. */
const RULES: Rule[] = [
  { id: 'first-step', title: 'İlk Adım', desc: 'İlk provanı tamamla', icon: 'sprout', earned: (s) => s.lessons >= 1 },
  { id: 'streak-3', title: '3 Günlük Seri', desc: '3 gün üst üste pratik yap', icon: 'flame', earned: (s) => s.streak >= 3 },
  { id: 'perfect', title: 'Kusursuz Prova', desc: 'Bir derste tüm cevapların doğal olsun', icon: 'star', earned: (s) => s.perfectLessons >= 1 },
  { id: 'challenger', title: 'Meydan Okuyucu', desc: '3 günün meydan okumasını tamamla', icon: 'target', earned: (s) => s.challenges >= 3 },
  { id: 'word-collector', title: 'Kelime Avcısı', desc: 'Kelime sandığında 25 kart topla', icon: 'bookmark', earned: (s) => s.words >= 25 },
  { id: 'brave', title: 'Cesur Konuşmacı', desc: '10 prova tamamla', icon: 'shieldFilled', earned: (s) => s.lessons >= 10 },
  { id: 'streak-7', title: 'Bir Haftalık Seri', desc: '7 gün üst üste pratik yap', icon: 'trophy', earned: (s) => s.streak >= 7 },
  { id: 'polyglot', title: 'Çok Dilli', desc: 'İki farklı dilde prova yap', icon: 'compass', earned: (s) => s.languages >= 2 },
  { id: 'streak-30', title: 'Bir Aylık Seri', desc: '30 gün üst üste pratik yap', icon: 'award', earned: (s) => s.streak >= 30 },
];

export const BADGES: Badge[] = RULES.map(({ earned: _e, ...b }) => b);

/** Şu an hak edilen tüm rozet kimlikleri */
export function earnedBadgeIds(stats: EngagementStats): string[] {
  return RULES.filter((r) => r.earned(stats)).map((r) => r.id);
}

export const badgeById = (id: string) => BADGES.find((b) => b.id === id);
