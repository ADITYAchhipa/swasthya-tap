'use client';
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { type LangCode, defaultLang, languages, fontMap } from './config';
import { getTranslation, getTranslationArray } from './index';

interface LanguageContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
  dir: 'ltr' | 'rtl';
  fontFamily: string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = 'swasthyatap-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(defaultLang);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (saved && languages.some((l) => l.code === saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((newLang: LangCode) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    // Update dir attribute on html element
    const langConfig = languages.find((l) => l.code === newLang);
    if (langConfig) {
      document.documentElement.dir = langConfig.dir;
      document.documentElement.lang = newLang;
    }
  }, []);

  // Update dir and lang on mount
  useEffect(() => {
    if (!mounted) return;
    const langConfig = languages.find((l) => l.code === lang);
    if (langConfig) {
      document.documentElement.dir = langConfig.dir;
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);

  const t = useCallback(
    (key: string) => getTranslation(lang, key),
    [lang]
  );

  const tArray = useCallback(
    (key: string) => getTranslationArray(lang, key),
    [lang]
  );

  const langConfig = languages.find((l) => l.code === lang);
  const dir = langConfig?.dir ?? 'ltr';
  const fontFamily = fontMap[lang] ?? 'inherit';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tArray, dir, fontFamily }}>
      <div style={{ fontFamily, direction: dir }} className="min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
