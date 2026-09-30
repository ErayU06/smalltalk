import type { FlagCode } from '../components/ui/Flag';

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
export const TARGET_OPTIONS: Language['code'][] = ['en', 'de', 'fr', 'ru', 'zh', 'ko'];

/** Şu an senaryo içeriği olan hedef diller. Yeni dil içeriği eklendikçe buraya ekle. */
export const TARGETS_WITH_CONTENT: Language['code'][] = ['en'];
