import type { FlagCode } from '../components/ui/Flag';
import type { TargetLang } from '../types/scenario';

export interface Language {
  /** ISO 639-1 dil kodu (kayıt için) */
  code: 'tr' | 'en' | 'de' | 'fr' | 'ru' | 'zh' | 'ko' | 'az';
  /** Türkçe adı */
  name: string;
  /** Dilin kendi dilindeki adı */
  endonym: string;
  flag: FlagCode;
  /** Kartta gösterilen kısa etiket (tasarımdaki gibi: CN, KR) */
  badge: string;
}

export const LANGUAGES: Record<Language['code'], Language> = {
  tr: { code: 'tr', name: 'Türkçe', endonym: 'Türkçe', flag: 'tr', badge: 'TR' },
  en: { code: 'en', name: 'İngilizce', endonym: 'UK & US', flag: 'gb', badge: 'EN' },
  de: { code: 'de', name: 'Almanca', endonym: 'Deutsch', flag: 'de', badge: 'DE' },
  fr: { code: 'fr', name: 'Fransızca', endonym: 'Français', flag: 'fr', badge: 'FR' },
  ru: { code: 'ru', name: 'Rusça', endonym: 'Русский', flag: 'ru', badge: 'RU' },
  zh: { code: 'zh', name: 'Çince', endonym: '中文', flag: 'cn', badge: 'CN' },
  ko: { code: 'ko', name: 'Korece', endonym: '한국어', flag: 'kr', badge: 'KR' },
  az: { code: 'az', name: 'Azərbaycan dili', endonym: 'Azərbaycanca', flag: 'az', badge: 'AZ' },
};

/** Tasarımdaki sırayla */
export const NATIVE_OPTIONS: Language['code'][] = ['tr', 'en', 'de', 'fr', 'ru', 'zh', 'ko'];
export const TARGET_OPTIONS: TargetLang[] = ['en', 'de', 'fr', 'ru', 'zh', 'ko'];

/** Kılavuz: bir dil 12 ücretsiz senaryosu hazır olunca "tam" sayılır; öncesinde "önizleme". */
export const FULL_CONTENT_FREE_SCENARIOS = 12;

export const isTargetLang = (code: string | null | undefined): code is TargetLang =>
  !!code && (TARGET_OPTIONS as string[]).includes(code);

/** Dilin varsayılan ses/tanıma yerel ayarı (senaryo kendi locale'ini de belirtebilir: en-GB) */
export const DEFAULT_LOCALE: Record<TargetLang, import('../types/scenario').LocaleCode> = {
  en: 'en-US', de: 'de-DE', fr: 'fr-FR', ru: 'ru-RU', zh: 'zh-CN', ko: 'ko-KR',
};

/** "Cevabını Almanca yaz" gibi yönlendirmeler için: "Almanca" */
export const langName = (lang: TargetLang) => LANGUAGES[lang].name;
