'use client';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { languages, type LangCode } from '@/i18n/config';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === lang);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors text-sm font-medium text-secondary bg-white/80"
        aria-label="Select language"
      >
        <Globe size={16} />
        <span className="max-w-[80px] truncate">{current?.nativeName}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 max-h-72 overflow-y-auto">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code as LangCode);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/5 transition-colors flex items-center justify-between ${
                l.code === lang ? 'text-primary font-bold bg-primary/5' : 'text-secondary'
              }`}
            >
              <span>{l.nativeName}</span>
              <span className="text-xs text-secondary/50">{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
