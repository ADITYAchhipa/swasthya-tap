import { type LangCode, defaultLang } from './config';
import en from './locales/en.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import te from './locales/te.json';
import mr from './locales/mr.json';
import ta from './locales/ta.json';
import gu from './locales/gu.json';
import kn from './locales/kn.json';
import ml from './locales/ml.json';
import or from './locales/or.json';
import pa from './locales/pa.json';
import ur from './locales/ur.json';
import as from './locales/as.json';

type TranslationDict = Record<string, unknown>;

const translations: Record<LangCode, TranslationDict> = {
  en, hi, bn, te, mr, ta, gu, kn, ml, or, pa, ur, as,
};

/**
 * Look up a nested translation key like 'nav.features' or 'hero.title1'
 */
export function getTranslation(lang: LangCode, key: string): string {
  const dict = translations[lang] || translations[defaultLang];
  const parts = key.split('.');
  let result: unknown = dict;

  for (const part of parts) {
    if (result && typeof result === 'object' && part in (result as Record<string, unknown>)) {
      result = (result as Record<string, unknown>)[part];
    } else {
      // Fallback: try English, then return the key itself
      const fallback = translations[defaultLang];
      let fb: unknown = fallback;
      for (const p of parts) {
        if (fb && typeof fb === 'object' && p in (fb as Record<string, unknown>)) {
          fb = (fb as Record<string, unknown>)[p];
        } else {
          return key; // Key not found anywhere
        }
      }
      return typeof fb === 'string' ? fb : key;
    }
  }

  return typeof result === 'string' ? result : key;
}

/**
 * Get array translations (for hospital features etc.)
 */
export function getTranslationArray(lang: LangCode, key: string): string[] {
  const dict = translations[lang] || translations[defaultLang];
  const parts = key.split('.');
  let result: unknown = dict;

  for (const part of parts) {
    if (result && typeof result === 'object' && part in (result as Record<string, unknown>)) {
      result = (result as Record<string, unknown>)[part];
    } else {
      return [];
    }
  }

  return Array.isArray(result) ? result as string[] : [];
}
