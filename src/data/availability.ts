import type { TargetLang } from '../types/scenario';
import { FULL_CONTENT_FREE_SCENARIOS, isTargetLang } from './languages';
import { contentCount } from './scenarios';

export type Availability = 'full' | 'preview' | 'soon';

/** Dilin içerik durumu: tam (12+ ücretsiz senaryo), önizleme (en az 1), yakında (hiç yok) */
export function availability(lang: TargetLang): Availability {
  const { free, total } = contentCount(lang);
  if (free >= FULL_CONTENT_FREE_SCENARIOS) return 'full';
  return total > 0 ? 'preview' : 'soon';
}

/** Tercihteki pratik dili; içeriği yoksa İngilizce */
export function learningLang(target: string | null | undefined): TargetLang {
  return isTargetLang(target) && availability(target) !== 'soon' ? target : 'en';
}
