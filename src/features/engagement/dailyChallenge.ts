import type { Scenario, Setting } from '../../types/scenario';

/** Onboarding ilgi alanı → senaryo çizim ailesi */
const INTEREST_SETTINGS: Record<string, Setting[]> = {
  travel: ['street', 'hotel'],
  social: ['cafe', 'shop'],
  work: ['work'],
  campus: ['campus'],
};

export const CHALLENGE_BONUS_XP = 10;

/** Basit, kararlı dize özeti: aynı gün herkes için aynı sonucu verir */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Günün meydan okuması: o günün tarihinden kararlı biçimde seçilen tek bir ücretsiz senaryo.
 * İlgi alanlarına uyanlar önceliklidir; dün seçilenle aynı gelmesin diye bir sonrakine kayar.
 */
export function dailyChallenge(day: string, scenarios: Scenario[], interests: string[] = []): Scenario | undefined {
  const free = scenarios.filter((s) => !s.isPremium);
  if (!free.length) return undefined;
  const wanted = new Set(interests.flatMap((i) => INTEREST_SETTINGS[i] ?? []));
  const preferred = free.filter((s) => wanted.has(s.setting));
  const pool = preferred.length >= 2 ? preferred : free;
  return pool[hash(day) % pool.length];
}
