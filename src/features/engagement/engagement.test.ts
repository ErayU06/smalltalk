import { describe, expect, it } from '@jest/globals';
import { getScenarios } from '../../data/scenarios';
import { BADGES, earnedBadgeIds, type EngagementStats } from './badges';
import { dailyChallenge } from './dailyChallenge';
import { stableOrder } from '../lesson/shuffle';
import { reminderPlan } from './reminderPlan';

const zero: EngagementStats = { lessons: 0, streak: 0, perfectLessons: 0, languages: 0, words: 0, challenges: 0 };

describe('rozetler', () => {
  it('hiç pratik yoksa rozet yok', () => expect(earnedBadgeIds(zero)).toEqual([]));
  it('ilk ders "İlk Adım" verir', () => expect(earnedBadgeIds({ ...zero, lessons: 1, languages: 1 })).toEqual(['first-step']));
  it('seri rozetleri eşiklere göre birikir', () => {
    const ids = earnedBadgeIds({ ...zero, lessons: 7, streak: 7, languages: 1 });
    expect(ids).toEqual(expect.arrayContaining(['streak-3', 'streak-7']));
    expect(ids).not.toContain('streak-30');
  });
  it('her rozetin başlığı, açıklaması ve benzersiz kimliği var', () => {
    expect(new Set(BADGES.map((b) => b.id)).size).toBe(BADGES.length);
    for (const b of BADGES) expect(b.title && b.desc).toBeTruthy();
  });
});

describe('günün meydan okuması', () => {
  const en = getScenarios('en');
  it('aynı gün için hep aynı senaryo', () => {
    expect(dailyChallenge('2026-10-01', en)?.id).toBe(dailyChallenge('2026-10-01', en)?.id);
  });
  it('Pro senaryo seçmez', () => {
    for (let d = 1; d <= 28; d++) expect(dailyChallenge(`2026-10-${String(d).padStart(2, '0')}`, en)?.isPremium).toBe(false);
  });
  it('ilgi alanına uyanı tercih eder', () => {
    const s = dailyChallenge('2026-10-02', en, ['campus']);
    expect(s?.setting).toBe('campus');
  });
  it('günler arasında çeşitlilik var', () => {
    const ids = new Set(Array.from({ length: 14 }, (_, i) => dailyChallenge(`2026-11-${String(i + 1).padStart(2, '0')}`, en)?.id));
    expect(ids.size).toBeGreaterThan(3);
  });
  it('içerik yoksa undefined', () => expect(dailyChallenge('2026-10-01', [])).toBeUndefined());
});

describe('hatırlatma planı', () => {
  const scene = (day: string) => `Sahne ${day}`;
  it('7 günlük plan, saati geçmiş bugünü atlar', () => {
    const plan = reminderPlan(new Date(2026, 9, 1, 21, 0), '20:00', 7, scene);
    expect(plan).toHaveLength(7);
    expect(plan[0].date.getDate()).toBe(2);
    expect(plan[0].date.getHours()).toBe(20);
    expect(plan[0].body).toContain('Sahne 2026-10-02');
  });
  it('saati gelmemişse bugün de hatırlatır', () => {
    expect(reminderPlan(new Date(2026, 9, 1, 9, 0), '20:00', 3, scene)[0].date.getDate()).toBe(1);
  });
  it('metinler suçlayıcı değil', () => {
    for (const r of reminderPlan(new Date(2026, 9, 1, 9, 0), '20:00', 7, scene)) {
      expect(`${r.title} ${r.body}`).not.toMatch(/kaçırdın|unuttun|kaybedeceksin|son şans/i);
    }
  });
});

describe('şık sırası', () => {
  it('kararlı ve doğru şık her zaman başta değil', () => {
    expect(stableOrder(3, 'cafe-order:s1')).toEqual(stableOrder(3, 'cafe-order:s1'));
    const firsts = new Set(Array.from({ length: 30 }, (_, i) => stableOrder(3, `x:s${i}`)[0]));
    expect(firsts.size).toBe(3);
  });
});
