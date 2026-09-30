/**
 * Cihazdaki en doğal sesi seçen saf mantık (Faz 1a). Platform sesleri çok farklı adlarla gelir:
 * iOS "com.apple.voice.premium.en-US.Zoe", Android "en-us-x-tpf-local", web "Microsoft Aria Online (Natural)".
 * Sesin kalitesini ve (biliniyorsa) cinsiyetini addan/kimlikten çıkarıp karaktere en uygun olanı seçer.
 */

export interface DeviceVoice {
  identifier: string;
  name: string;
  language: string;
  quality?: string;
}

export interface Speaker {
  gender: 'f' | 'm';
  age: number;
}

/** Robotik ya da eğlence amaçlı sesler (iOS Eloquence ve "novelty" sesleri): asla seçilmez */
const NOVELTY = /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|hysterical|junior|kathy|ralph|fred|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley|espeak)\b/i;

const FEMALE = /\b(samantha|karen|moira|tessa|allison|ava|susan|victoria|zoe|nicky|serena|kate|fiona|veena|aria|jenny|emma|libby|sonia|natasha|anna|petra|helena|marlene|vicki|katja|amelie|amélie|audrey|aurelie|aurélie|marie|virginie|denise|milena|katya|svetlana|dariya|tingting|ting-ting|lili|lilian|meijia|sinji|xiaoxiao|xiaoyi|yuna|sora|sun-hi|sunhi|jiyeon|google us english|google uk english female)\b/i;
const MALE = /\b(alex|daniel|tom|aaron|arthur|oliver|evan|nathan|rishi|gordon|guy|ryan|davis|andrew|brian|christopher|markus|yannick|martin|conrad|killian|thomas|nicolas|henri|remy|yuri|maxim|dmitry|li-mu|yunxi|yunyang|injoon|hyunsu|google uk english male)\b/i;

/** Android Google TTS kimliklerinde bilinen ses kodları (en-US) */
const ANDROID_FEMALE = /-x-(iob|iog|sfg|tpc|tpf)-/i;
const ANDROID_MALE = /-x-(iol|iom|tpd)-/i;

export function voiceGender(v: DeviceVoice): 'f' | 'm' | undefined {
  const key = `${v.name} ${v.identifier}`;
  if (ANDROID_FEMALE.test(v.identifier) || FEMALE.test(key)) return 'f';
  if (ANDROID_MALE.test(v.identifier) || MALE.test(key)) return 'm';
  return undefined;
}

/** Kaba kalite puanı: yüksek = daha doğal */
export function voiceQuality(v: DeviceVoice): number {
  const key = `${v.name} ${v.identifier}`.toLowerCase();
  if (NOVELTY.test(key)) return -10;
  if (/premium|neural|natural|wavenet|studio/.test(key)) return 4;
  if (v.quality === 'Enhanced' || /enhanced|siri/.test(key)) return 3;
  if (/network|online/.test(key)) return 2.5;
  if (/compact/.test(key)) return 0.5;
  return 1;
}

const norm = (tag: string) => tag.replace(/_/g, '-').toLowerCase();

/** Dilin sesleri: önce tam eşleşme (en-GB), yoksa aynı dil (en-*) */
export function voicesFor(voices: DeviceVoice[], locale: string) {
  const exact = voices.filter((v) => norm(v.language) === norm(locale));
  if (exact.length) return exact;
  const lang = norm(locale).split('-')[0];
  return voices.filter((v) => norm(v.language).split('-')[0] === lang);
}

/**
 * Karaktere en uygun sesi seçer. `avoid` verilirse (ör. anlatıcı için NPC'nin sesi) o ses
 * mümkünse atlanır. Uygun ses yoksa undefined döner; motor sistem varsayılanını kullanır.
 */
export function pickVoice(voices: DeviceVoice[], locale: string, speaker?: Speaker, avoid?: string): DeviceVoice | undefined {
  const pool = voicesFor(voices, locale).filter((v) => voiceQuality(v) > 0);
  const candidates = pool.length > 1 && avoid ? pool.filter((v) => v.identifier !== avoid) : pool;
  const score = (v: DeviceVoice) => {
    const g = voiceGender(v);
    // Cinsiyet uyumu bir kalite basamağından (10) biraz ağır: erkek karaktere kadın sesi, sadece çok daha iyiyse
    const genderScore = !speaker ? 0 : g === speaker.gender ? 12 : g === undefined ? 4 : 0;
    return voiceQuality(v) * 10 + genderScore;
  };
  return [...candidates].sort((a, b) => score(b) - score(a) || a.identifier.localeCompare(b.identifier))[0];
}

/**
 * Aynı sesi paylaşan karakterleri ayırt etmek için perde/hız. Seçilen sesin cinsiyeti
 * karakterle uyuşmuyorsa perde biraz daha kaydırılır.
 */
export function prosody(speaker: Speaker | undefined, voice: DeviceVoice | undefined, slow = false) {
  let pitch = 1;
  let rate = 0.95;
  if (speaker) {
    const young = speaker.age < 35;
    pitch = speaker.gender === 'f' ? (young ? 1.08 : 1.0) : young ? 0.96 : 0.9;
    const vg = voice && voiceGender(voice);
    if (vg && vg !== speaker.gender) pitch += speaker.gender === 'f' ? 0.12 : -0.12;
    if (speaker.age >= 55) rate = 0.88;
  }
  if (slow) rate *= 0.75;
  return { pitch: Math.round(pitch * 100) / 100, rate: Math.round(rate * 100) / 100 };
}
