/**
 * Ücretsiz, cihaz içi cevap değerlendirme.
 * STT çıktısı platforma göre farklı olduğu için (noktalama, büyük harf, "gonna" vs "going to",
 * "two" vs "2") katı eşleşme yerine toleranslı puanlama yapar. Kurallar dile duyarlıdır
 * (docs/ICERIK-KILAVUZU.md §4 "Değerlendirme" notları).
 */
import type { TargetLang } from '../../types/scenario';

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
  "i've": 'i have',
  "it's": 'it is',
  "that's": 'that is',
  "there's": 'there is',
  "we'll": 'we will',
  "we're": 'we are',
  "you're": 'you are',
  "can't": 'cannot',
  "don't": 'do not',
  "didn't": 'did not',
  "doesn't": 'does not',
  "isn't": 'is not',
  wanna: 'want to',
  gonna: 'going to',
};

/** Konuşma tanıma sayıları rakam ya da yazı olarak döndürebilir; ikisini de rakama çevir. */
const NUMBERS: Record<TargetLang, Record<string, string>> = {
  en: { one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: '10', twelve: '12', fifteen: '15', twenty: '20', thirty: '30' },
  // de/fr: ein/eine/un/une artikeldir, sayıya çevrilmez ("ein Kaffee" hatası yakalanabilsin)
  de: { eins: '1', zwei: '2', drei: '3', vier: '4', fuenf: '5', sechs: '6', sieben: '7', acht: '8', neun: '9', zehn: '10', zwoelf: '12', zwanzig: '20', dreissig: '30' },
  fr: { deux: '2', trois: '3', quatre: '4', cinq: '5', six: '6', sept: '7', huit: '8', neuf: '9', dix: '10', douze: '12', vingt: '20', trente: '30' },
  ru: { один: '1', одна: '1', одно: '1', два: '2', две: '2', три: '3', четыре: '4', пять: '5', шесть: '6', семь: '7', восемь: '8', девять: '9', десять: '10', двенадцать: '12', двадцать: '20', тридцать: '30' },
  // zh: karakter bazlı
  zh: { 两: '2', 一: '1', 二: '2', 三: '3', 四: '4', 五: '5', 六: '6', 七: '7', 八: '8', 九: '9', 十: '10' },
  // ko: yalnızca sayma sözcüğünden önce (한 잔 / 한잔 → 1잔), bkz. normalize
  ko: { 한: '1', 두: '2', 세: '3', 네: '4', 다섯: '5' },
};

/** Boşluksuz yazılan diller: karşılaştırma karakter bazlı, anahtar kelimeler alt dize */
const isCjk = (lang: TargetLang) => lang === 'zh' || lang === 'ko';

function foldLatin(s: string, lang: TargetLang) {
  if (lang === 'de') {
    return s.replace(/ß/g, 'ss').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue');
  }
  if (lang === 'fr') {
    // Aksanları yok say: café = cafe; kesme işaretini bitiştir: j'aimerais = jaimerais
    return s.normalize('NFD').replace(/\p{M}/gu, '').replace(/'/g, '');
  }
  return s;
}

export function normalize(input: string, lang: TargetLang = 'en'): string {
  let s = input.normalize('NFC').toLowerCase().replace(/[’`´]/g, "'");
  if (lang === 'ru') s = s.replace(/ё/g, 'е');
  s = foldLatin(s, lang);
  // Noktalama (tam genişlik 。，？！ dahil) boşluğa dönüşür; harf, rakam ve kesme işareti kalır
  s = s.replace(/[^\p{L}\p{N}'\s]/gu, ' ');

  if (lang === 'zh') {
    return [...s.replace(/\s+/g, '')].map((ch) => NUMBERS.zh[ch] ?? ch).join('');
  }
  if (lang === 'ko') {
    const counted = s.replace(/(다섯|한|두|세|네)(?=\s*(잔|개|명|장|병|시|번|분))/g, (w) => NUMBERS.ko[w]);
    return counted.replace(/\s+/g, '');
  }
  const nums = NUMBERS[lang];
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => (lang === 'en' ? (CONTRACTIONS[w] ?? w) : w))
    .flatMap((w) => (lang === 'en' ? w.split(' ') : [w]))
    .map((w) => nums[w] ?? w)
    .join(' ');
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const A = [...a];
  const B = [...b];
  const prev = Array.from({ length: B.length + 1 }, (_, i) => i);
  for (let i = 1; i <= A.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= B.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (A[i - 1] === B[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[B.length];
}

const similarity = (a: string, b: string) => 1 - levenshtein(a, b) / Math.max([...a].length, [...b].length, 1);

/** Normalize edilmiş cevapta anahtar kelime geçiyor mu? */
export function hasKeyword(normalizedInput: string, keyword: string, lang: TargetLang = 'en') {
  const k = normalize(keyword, lang);
  if (!k) return false;
  return isCjk(lang) ? normalizedInput.includes(k) : ` ${normalizedInput} `.includes(` ${k} `);
}

/**
 * Senaryoya yazılan "bilinen hata" kalıbı. `match` normalize edilmiş cevapta aranır
 * (küçük harf, noktalamasız, İngilizcede kısaltmalar açılmış: "i'd" → "i would",
 * Fransızcada aksansız, Almancada ä → ae). Eşleşirse sonuç en fazla "almost" olur ve `tip` gösterilir.
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
  lang: TargetLang = 'en',
): MatchResult {
  const input = normalize(userInput, lang);
  if (!input) return { score: 0, verdict: 'wrong', closest: acceptedAnswers[0] ?? '' };
  const base = scoreAnswer(input, acceptedAnswers, keywordGroups, lang);
  const hit = mistakes.find((m) => new RegExp(m.match, 'u').test(input));
  if (hit && base.verdict === 'correct') {
    return { ...base, score: Math.min(base.score, 0.79), verdict: 'almost', tip: hit.tip };
  }
  return hit ? { ...base, tip: hit.tip } : base;
}

function scoreAnswer(input: string, acceptedAnswers: string[], keywordGroups: string[][], lang: TargetLang): MatchResult {
  let best = 0;
  let closest = acceptedAnswers[0] ?? '';
  for (const ans of acceptedAnswers) {
    const sim = similarity(input, normalize(ans, lang));
    if (sim > best) {
      best = sim;
      closest = ans;
    }
  }

  // Anahtar kelime grupları: her gruptan en az bir kelime geçmeli
  const kwHits = keywordGroups.filter((g) => g.some((k) => hasKeyword(input, k, lang))).length;
  const kwScore = keywordGroups.length ? kwHits / keywordGroups.length : best;

  // Rusça ve CJK'de sözcük sırası/ekler esnek: anahtar kelimelerin ağırlığı biraz daha yüksek
  const kwWeight = lang === 'ru' || isCjk(lang) ? 0.85 : 0.8;
  const score = Math.max(best, (1 - kwWeight) * best + kwWeight * kwScore);
  const verdict: Verdict = score >= 0.8 ? 'correct' : score >= 0.55 ? 'almost' : 'wrong';
  return { score: Math.round(score * 100) / 100, verdict, closest };
}
