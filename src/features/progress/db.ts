import * as SQLite from 'expo-sqlite';
import { localDay, yesterday } from './day';
import { LEGACY_IDS } from './legacy';
import type { VocabItem } from '../../types/scenario';

/** Local-first depo: ilerleme, tercihler, tekrar kuyruğu. Bulut senkronu sonraki aşama. */
let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

const SCHEMA_VERSION = 4;

async function migrate(db: SQLite.SQLiteDatabase) {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const v = row?.user_version ?? 0;
  if (v < 1) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS lesson_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        scenario_id TEXT NOT NULL,
        score REAL NOT NULL,
        xp INTEGER NOT NULL,
        completed_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS profile (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        total_xp INTEGER NOT NULL DEFAULT 0,
        streak INTEGER NOT NULL DEFAULT 0,
        last_active_day TEXT
      );
      INSERT OR IGNORE INTO profile (id) VALUES (1);
    `);
  }
  if (v < 2) {
    await db.execAsync(`
      ALTER TABLE lesson_results ADD COLUMN duration_sec INTEGER NOT NULL DEFAULT 0;
      ALTER TABLE lesson_results ADD COLUMN day TEXT;
      CREATE TABLE IF NOT EXISTS user_prefs (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        native_lang TEXT, target_lang TEXT, anxiety TEXT,
        interests TEXT NOT NULL DEFAULT '[]',
        daily_minutes INTEGER NOT NULL DEFAULT 5,
        reminder_time TEXT,
        speech_enabled INTEGER NOT NULL DEFAULT 1,
        onboarded_at TEXT
      );
      INSERT OR IGNORE INTO user_prefs (id) VALUES (1);
      CREATE TABLE IF NOT EXISTS review_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        scenario_id TEXT NOT NULL, step_id TEXT NOT NULL,
        user_text TEXT, suggestion TEXT, created_at TEXT NOT NULL
      );
    `);
  }
  if (v < 3) {
    // İlerleme artık dil bazında: "cafe-order-en-1" → "cafe-order:en"
    for (const [from, to] of Object.entries(LEGACY_IDS)) {
      await db.runAsync('UPDATE lesson_results SET scenario_id = ? WHERE scenario_id = ?', to, from);
      await db.runAsync('UPDATE review_queue SET scenario_id = ? WHERE scenario_id = ?', to, from);
    }
  }
  if (v < 4) {
    await db.execAsync(`
      ALTER TABLE lesson_results ADD COLUMN perfect INTEGER NOT NULL DEFAULT 0;
      CREATE TABLE IF NOT EXISTS word_cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lang TEXT NOT NULL, text TEXT NOT NULL, tr TEXT NOT NULL, roman TEXT,
        scenario_id TEXT NOT NULL, added_at TEXT NOT NULL,
        UNIQUE (lang, text)
      );
      CREATE TABLE IF NOT EXISTS badges (id TEXT PRIMARY KEY, earned_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS challenge_log (day TEXT PRIMARY KEY, scenario_id TEXT NOT NULL);
    `);
  }
  await db.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION}`);
}

export function getDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await SQLite.openDatabaseAsync('smalltalk.db');
      await db.execAsync('PRAGMA journal_mode = WAL;');
      await migrate(db);
      return db;
    })();
  }
  return dbPromise;
}

export { localDay } from './day';

/* ───────────── Profil ───────────── */
export type Profile = { total_xp: number; streak: number; last_active_day: string | null };

export async function getProfile(): Promise<Profile> {
  const d = await getDb();
  const p = (await d.getFirstAsync<Profile>('SELECT total_xp, streak, last_active_day FROM profile WHERE id = 1'))!;
  // Dün de bugün de pratik yoksa seri ekranda 0 görünür (veride korunur, dondurma hakkı için)
  const alive = p.last_active_day === localDay() || p.last_active_day === yesterday();
  return { ...p, streak: alive ? p.streak : 0 };
}

export async function getTodayMinutes(): Promise<number> {
  const d = await getDb();
  const r = await d.getFirstAsync<{ s: number | null }>('SELECT SUM(duration_sec) AS s FROM lesson_results WHERE day = ?', localDay());
  return Math.round((r?.s ?? 0) / 60);
}

export async function saveLessonResult(scenarioId: string, score: number, xp: number, durationSec: number, perfect = false) {
  const d = await getDb();
  const raw = (await d.getFirstAsync<Profile>('SELECT total_xp, streak, last_active_day FROM profile WHERE id = 1'))!;
  const t = localDay();
  const streak = raw.last_active_day === t ? raw.streak : raw.last_active_day === yesterday() ? raw.streak + 1 : 1;

  await d.withTransactionAsync(async () => {
    await d.runAsync(
      'INSERT INTO lesson_results (scenario_id, score, xp, completed_at, duration_sec, day, perfect) VALUES (?, ?, ?, ?, ?, ?, ?)',
      scenarioId, score, xp, new Date().toISOString(), Math.round(durationSec), t, perfect ? 1 : 0,
    );
    await d.runAsync('UPDATE profile SET total_xp = total_xp + ?, streak = ?, last_active_day = ? WHERE id = 1', xp, streak, t);
  });
  return { streak, totalXp: raw.total_xp + xp };
}

/* ───────────── Tercihler (onboarding) ───────────── */
export type Anxiety = 'panic' | 'blank' | 'pronunciation' | 'fast';
export type Interest = 'travel' | 'social' | 'work' | 'campus';

export interface Prefs {
  nativeLang: string | null;
  targetLang: string | null;
  anxiety: Anxiety | null;
  interests: Interest[];
  dailyMinutes: 5 | 10 | 15;
  reminderTime: string | null;
  speechEnabled: boolean;
  onboardedAt: string | null;
}

type PrefsRow = {
  native_lang: string | null; target_lang: string | null; anxiety: Anxiety | null; interests: string;
  daily_minutes: number; reminder_time: string | null; speech_enabled: number; onboarded_at: string | null;
};

export async function getPrefs(): Promise<Prefs> {
  const d = await getDb();
  const r = (await d.getFirstAsync<PrefsRow>('SELECT * FROM user_prefs WHERE id = 1'))!;
  return {
    nativeLang: r.native_lang, targetLang: r.target_lang, anxiety: r.anxiety,
    interests: JSON.parse(r.interests) as Interest[],
    dailyMinutes: ([5, 10, 15].includes(r.daily_minutes) ? r.daily_minutes : 5) as Prefs['dailyMinutes'],
    reminderTime: r.reminder_time, speechEnabled: !!r.speech_enabled, onboardedAt: r.onboarded_at,
  };
}

export async function savePrefs(p: Omit<Prefs, 'onboardedAt'>) {
  const d = await getDb();
  await d.runAsync(
    `UPDATE user_prefs SET native_lang = ?, target_lang = ?, anxiety = ?, interests = ?, daily_minutes = ?,
       reminder_time = ?, speech_enabled = ?, onboarded_at = COALESCE(onboarded_at, ?) WHERE id = 1`,
    p.nativeLang, p.targetLang, p.anxiety, JSON.stringify(p.interests), p.dailyMinutes,
    p.reminderTime, p.speechEnabled ? 1 : 0, new Date().toISOString(),
  );
}

/* ───────────── Tekrar kuyruğu ───────────── */
export async function addToReview(scenarioId: string, stepId: string, userText: string, suggestion: string) {
  const d = await getDb();
  await d.runAsync(
    'INSERT INTO review_queue (scenario_id, step_id, user_text, suggestion, created_at) VALUES (?, ?, ?, ?, ?)',
    scenarioId, stepId, userText, suggestion, new Date().toISOString(),
  );
}

/* ───────────── Kelime sandığı ───────────── */
export type WordCard = { lang: string; text: string; tr: string; roman: string | null; scenario_id: string; added_at: string };

/** Dersin kelimelerini sandığa ekler; zaten olanları atlar. Yeni eklenen sayısını döner. */
export async function addWords(lang: string, items: VocabItem[], scenarioKey: string): Promise<number> {
  const d = await getDb();
  let added = 0;
  for (const w of items) {
    const r = await d.runAsync(
      'INSERT OR IGNORE INTO word_cards (lang, text, tr, roman, scenario_id, added_at) VALUES (?, ?, ?, ?, ?, ?)',
      lang, w.text, w.tr, w.roman ?? null, scenarioKey, new Date().toISOString(),
    );
    added += r.changes;
  }
  return added;
}

export async function getWords(): Promise<WordCard[]> {
  const d = await getDb();
  return d.getAllAsync<WordCard>('SELECT lang, text, tr, roman, scenario_id, added_at FROM word_cards ORDER BY added_at DESC, id DESC');
}

/* ───────────── Rozetler ve günün meydan okuması ───────────── */
export async function getEarnedBadges(): Promise<{ id: string; earned_at: string }[]> {
  const d = await getDb();
  return d.getAllAsync('SELECT id, earned_at FROM badges ORDER BY earned_at');
}

export async function saveBadges(ids: string[]) {
  const d = await getDb();
  for (const id of ids) await d.runAsync('INSERT OR IGNORE INTO badges (id, earned_at) VALUES (?, ?)', id, new Date().toISOString());
}

export async function isChallengeDone(day: string) {
  const d = await getDb();
  return !!(await d.getFirstAsync('SELECT day FROM challenge_log WHERE day = ?', day));
}

export async function markChallengeDone(day: string, scenarioKey: string) {
  const d = await getDb();
  await d.runAsync('INSERT OR IGNORE INTO challenge_log (day, scenario_id) VALUES (?, ?)', day, scenarioKey);
}

/** Rozet kuralları için sayılar (src/features/engagement/badges.ts) */
export async function getStats() {
  const d = await getDb();
  const one = async (sql: string) => (await d.getFirstAsync<{ n: number }>(sql))?.n ?? 0;
  const keys = await d.getAllAsync<{ scenario_id: string }>('SELECT DISTINCT scenario_id FROM lesson_results');
  return {
    lessons: await one('SELECT COUNT(*) AS n FROM lesson_results'),
    streak: (await getProfile()).streak,
    perfectLessons: await one('SELECT COUNT(*) AS n FROM lesson_results WHERE perfect = 1'),
    languages: new Set(keys.map((k) => k.scenario_id.split(':')[1] ?? 'en')).size,
    words: await one('SELECT COUNT(*) AS n FROM word_cards'),
    challenges: await one('SELECT COUNT(*) AS n FROM challenge_log'),
  };
}
