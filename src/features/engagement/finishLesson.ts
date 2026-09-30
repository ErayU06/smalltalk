import type { Scenario } from '../../types/scenario';
import { progressKey } from '../../data/scenarios';
import { addWords, getStats, getEarnedBadges, isChallengeDone, localDay, markChallengeDone, saveBadges, saveLessonResult } from '../progress/db';
import { earnedBadgeIds } from './badges';
import { CHALLENGE_BONUS_XP } from './dailyChallenge';

/**
 * Ders sonu: sonucu kaydet, kelimeleri sandığa ekle, meydan okumayı işaretle, yeni rozetleri ver.
 * Hem SQLite (telefon) hem web sahte deposuyla çalışır.
 */
export async function finishLesson(s: Scenario, opts: { score: number; xp: number; durationSec: number; perfect: boolean; challenge: boolean }) {
  const key = progressKey(s.id, s.lang);
  const day = localDay();
  const challengeBonus = opts.challenge && !(await isChallengeDone(day)) ? CHALLENGE_BONUS_XP : 0;
  const xp = opts.xp + challengeBonus;
  const saved = await saveLessonResult(key, opts.score, xp, opts.durationSec, opts.perfect);
  if (challengeBonus) await markChallengeDone(day, key);
  const newWords = await addWords(s.lang, s.vocab, key);

  const had = new Set((await getEarnedBadges()).map((b) => b.id));
  const newBadges = earnedBadgeIds(await getStats()).filter((id) => !had.has(id));
  await saveBadges(newBadges);

  return { streak: saved.streak, xp, challengeBonus, newWords, newBadges };
}
