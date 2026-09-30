/**
 * Ücretsiz, cihaz içi cevap değerlendirme.
 * STT çıktısı platforma göre farklı olduğu için (noktalama, büyük harf,
 * "gonna" vs "going to") katı eşleşme yerine toleranslı puanlama yapar.
 */

export type Verdict = 'correct' | 'almost' | 'wrong';

export type MatchResult = {
  score: number; // 0..1
  verdict: Verdict;
  closest: string;
  /** Bilinen bir hata yakalandıysa ona özel kısa açıklama */
  tip?: string;
};

const CONTRACTIONS: Record<string, string> = {
  "i'd": 'i would',
  "i'm": 'i am',
  "i'll": 'i will',
  "it's": 'it is',
  "that's": 'that is',
  "can't": 'cannot',
  "don't": 'do not',
  wanna: 'want to',
  gonna: 'going to',
};

export function normalize(input: string): string {
  let s = input.toLowerCase().replace(/[’`]/g, "'");
  s = s.replace(/[^\p{L}\p{N}'\s]/gu, ' ');
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => CONTRACTIONS[w] ?? w)
    .join(' ');
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
}

const similarity = (a: string, b: string) =>
  1 - levenshtein(a, b) / Math.max(a.length, b.length, 1);

/**
 * Senaryoya yazılan "bilinen hata" kalıbı. `match` normalize edilmiş cevapta aranır
 * (küçük harf, noktalamasız). Eşleşirse sonuç en fazla "almost" olur ve `tip` gösterilir.
 * Örn: { match: 'turn (right|left) in the', tip: 'Dönülen noktalar için "at" kullanılır.' }
 */
export interface KnownMistake {
  match: string;
  tip: string;
}

export function matchAnswer(
  userInput: string,
  acceptedAnswers: string[],
  keywordGroups: string[][] = [],
  mistakes: KnownMistake[] = [],
): MatchResult {
  const input = normalize(userInput);
  if (!input) return { score: 0, verdict: 'wrong', closest: acceptedAnswers[0] ?? '' };
  const base = scoreAnswer(input, acceptedAnswers, keywordGroups);
  const hit = mistakes.find((m) => new RegExp(m.match, 'u').test(input));
  if (hit && base.verdict === 'correct') {
    return { ...base, score: Math.min(base.score, 0.79), verdict: 'almost', tip: hit.tip };
  }
  return hit ? { ...base, tip: hit.tip } : base;
}

function scoreAnswer(input: string, acceptedAnswers: string[], keywordGroups: string[][]): MatchResult {

  let best = 0;
  let closest = acceptedAnswers[0] ?? '';
  for (const ans of acceptedAnswers) {
    const sim = similarity(input, normalize(ans));
    if (sim > best) {
      best = sim;
      closest = ans;
    }
  }

  // Anahtar kelime grupları: her gruptan en az bir kelime geçmeli
  const padded = ` ${input} `;
  const kwHits = keywordGroups.filter((g) => g.some((k) => padded.includes(` ${normalize(k)} `))).length;
  const kwScore = keywordGroups.length ? kwHits / keywordGroups.length : best;

  const score = Math.max(best, 0.2 * best + 0.8 * kwScore);
  const verdict: Verdict = score >= 0.8 ? 'correct' : score >= 0.55 ? 'almost' : 'wrong';
  return { score: Math.round(score * 100) / 100, verdict, closest };
}
