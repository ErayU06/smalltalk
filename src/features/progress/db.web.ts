/**
 * Web için sahte (mock) depo. db.ts ile aynı fonksiyonları sunar.
 * expo-sqlite web'de SharedArrayBuffer ve COOP/COEP başlıkları istediği için tarayıcıda
 * arayüzü test ederken veriler localStorage'da tutulur (erişilemezse yalnızca bellekte).
 * Telefonda Metro bu dosyayı değil db.ts'yi (SQLite) kullanır.
 */
import { localDay, yesterday } from './day';
import { migrateId } from './legacy';
import type { VocabItem } from '../../types/scenario';
import type { Interest, Prefs, Profile, WordCard } from './db';

export type { Anxiety, Interest, Prefs, Profile, WordCard } from './db';
export { localDay } from './day';

type LessonRow = { scenario_id: string; score: number; xp: number; completed_at: string; duration_sec: number; day: string; perfect?: boolean };
type ReviewRow = { scenario_id: string; step_id: string; user_text: string; suggestion: string; created_at: string };

type Store = {
  profile: Omit<Profile, 'streak'> & { streak: number };
  prefs: Prefs;
  lessons: LessonRow[];
  review: ReviewRow[];
  words: WordCard[];
  badges: { id: string; earned_at: string }[];
  challenges: { day: string; scenario_id: string }[];
};

const KEY = 'talkwell.mock-db.v1';
/** Yeniden adlandırmadan önceki anahtar: tarayıcıdaki test ilerlemesi bir kez taşınır */
const LEGACY_KEY = 'smalltalk.mock-db.v1';

const fresh = (): Store => ({
  profile: { total_xp: 0, streak: 0, last_active_day: null },
  prefs: {
    nativeLang: null, targetLang: null, anxiety: null, interests: [] as Interest[],
    dailyMinutes: 5, reminderTime: null, speechEnabled: true, onboardedAt: null,
  },
  lessons: [],
  review: [],
  words: [],
  badges: [],
  challenges: [],
});

let memory: Store | null = null;

function load(): Store {
  if (memory) return memory;
  try {
    const raw = globalThis.localStorage?.getItem(KEY) ?? globalThis.localStorage?.getItem(LEGACY_KEY);
    const saved = raw ? { ...fresh(), ...(JSON.parse(raw) as Store) } : fresh();
    // db.ts'deki göç 3 ile aynı: eski senaryo kimlikleri dil bazlı anahtara
    saved.lessons = saved.lessons.map((l) => ({ ...l, scenario_id: migrateId(l.scenario_id) }));
    saved.review = saved.review.map((r) => ({ ...r, scenario_id: migrateId(r.scenario_id) }));
    memory = saved;
  } catch {
    memory = fresh();
  }
  return memory;
}

function save(s: Store) {
  memory = s;
  try {
    globalThis.localStorage?.setItem(KEY, JSON.stringify(s));
  } catch {
    // Özel pencere vb.: bellekte kalır
  }
}

/** db.ts ile uyum için; web'de açılacak bir veritabanı yok. */
export async function getDb() {
  return load();
}

/* ───────────── Profil ───────────── */
export async function getProfile(): Promise<Profile> {
  const p = load().profile;
  const alive = p.last_active_day === localDay() || p.last_active_day === yesterday();
  return { ...p, streak: alive ? p.streak : 0 };
}

export async function getTodayMinutes(): Promise<number> {
  const t = localDay();
  const sec = load().lessons.filter((l) => l.day === t).reduce((a, l) => a + l.duration_sec, 0);
  return Math.round(sec / 60);
}

export async function saveLessonResult(scenarioId: string, score: number, xp: number, durationSec: number, perfect = false) {
  const s = load();
  const raw = s.profile;
  const t = localDay();
  const streak = raw.last_active_day === t ? raw.streak : raw.last_active_day === yesterday() ? raw.streak + 1 : 1;
  save({
    ...s,
    lessons: [
      ...s.lessons,
      { scenario_id: scenarioId, score, xp, completed_at: new Date().toISOString(), duration_sec: Math.round(durationSec), day: t, perfect },
    ],
    profile: { total_xp: raw.total_xp + xp, streak, last_active_day: t },
  });
  return { streak, totalXp: raw.total_xp + xp };
}

/* ───────────── Tercihler (onboarding) ───────────── */
export async function getPrefs(): Promise<Prefs> {
  return { ...load().prefs };
}

export async function savePrefs(p: Omit<Prefs, 'onboardedAt'>) {
  const s = load();
  save({ ...s, prefs: { ...p, onboardedAt: s.prefs.onboardedAt ?? new Date().toISOString() } });
}

/* ───────────── Tekrar kuyruğu ───────────── */
export async function addToReview(scenarioId: string, stepId: string, userText: string, suggestion: string) {
  const s = load();
  save({
    ...s,
    review: [...s.review, { scenario_id: scenarioId, step_id: stepId, user_text: userText, suggestion, created_at: new Date().toISOString() }],
  });
}

/* ───────────── Kelime sandığı ───────────── */
export async function addWords(lang: string, items: VocabItem[], scenarioKey: string): Promise<number> {
  const s = load();
  const have = new Set(s.words.map((w) => `${w.lang}|${w.text}`));
  const fresh = items
    .filter((w) => !have.has(`${lang}|${w.text}`))
    .map((w) => ({ lang, text: w.text, tr: w.tr, roman: w.roman ?? null, scenario_id: scenarioKey, added_at: new Date().toISOString() }));
  save({ ...s, words: [...fresh.reverse(), ...s.words] });
  return fresh.length;
}

export async function getWords(): Promise<WordCard[]> {
  return [...load().words];
}

/* ───────────── Rozetler ve günün meydan okuması ───────────── */
export async function getEarnedBadges() {
  return [...load().badges];
}

export async function saveBadges(ids: string[]) {
  const s = load();
  const have = new Set(s.badges.map((b) => b.id));
  save({ ...s, badges: [...s.badges, ...ids.filter((id) => !have.has(id)).map((id) => ({ id, earned_at: new Date().toISOString() }))] });
}

export async function isChallengeDone(day: string) {
  return load().challenges.some((c) => c.day === day);
}

export async function markChallengeDone(day: string, scenarioKey: string) {
  const s = load();
  if (s.challenges.some((c) => c.day === day)) return;
  save({ ...s, challenges: [...s.challenges, { day, scenario_id: scenarioKey }] });
}

export async function getStats() {
  const s = load();
  return {
    lessons: s.lessons.length,
    streak: (await getProfile()).streak,
    perfectLessons: s.lessons.filter((l) => l.perfect).length,
    languages: new Set(s.lessons.map((l) => l.scenario_id.split(':')[1] ?? 'en')).size,
    words: s.words.length,
    challenges: s.challenges.length,
  };
}
